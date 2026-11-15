/**
 * A tiny stand-in for the parts of Supabase the journal uses, for local testing
 * only (it keeps everything in memory). It mirrors the real rules: anyone can
 * read, only the owner's login can write, and responses are capped at 1,000 rows.
 * Login: owner@test.dev / pw.   Start it with:  node scripts/journal-e2e/fake-supabase.mjs
 */
import http from "node:http";
import { randomUUID } from "node:crypto";

const PORT = Number(process.env.PORT ?? 54321);
const OWNER = "owner@test.dev";
const CAP = 1000;

const categories = [
  "Artificial Intelligence", "Generative AI & LLMs", "RAG & AI Agents", "System Design", "Software Architecture",
  "Backend Engineering", "Java & Spring Boot", "Distributed Systems", "Database & SQL", "Computer Science Fundamentals", "Other",
].map((name, i) => ({ id: randomUUID(), name, sort_order: i + 1, created_at: new Date().toISOString() }));
const entries = [];
const files = new Map();
const log = [];

const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const makeJwt = (email) => `${b64({ alg: "HS256", typ: "JWT" })}.${b64({ sub: randomUUID(), email, role: "authenticated", aud: "authenticated", exp: Math.floor(Date.now() / 1000) + 3600 })}.sig`;
const emailOf = (req) => {
  const token = (req.headers.authorization ?? "").replace(/^Bearer /, "");
  try { return JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString()).email ?? null; } catch { return null; }
};
const isOwner = (req) => emailOf(req) === OWNER;

function splitTop(s) {
  const out = []; let depth = 0, cur = "";
  for (const ch of s) {
    if (ch === "{") depth++; if (ch === "}") depth--;
    if (ch === "," && depth === 0) { out.push(cur); cur = ""; } else cur += ch;
  }
  out.push(cur); return out;
}
const arr = (v) => v.replace(/^\{|\}$/g, "").split(",").map((x) => x.replace(/^"|"$/g, "")).filter(Boolean);
function test(row, col, op, value) {
  const cell = row[col];
  switch (op) {
    case "eq": return String(cell) === value;
    case "neq": return String(cell) !== value;
    case "gte": return String(cell) >= value;
    case "lte": return String(cell) <= value;
    case "ilike": return new RegExp("^" + value.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$", "i").test(String(cell ?? ""));
    case "cs": return arr(value).every((v) => (cell ?? []).includes(v));
    case "ov": return arr(value).some((v) => (cell ?? []).includes(v));
    default: throw new Error("unsupported op " + op);
  }
}
const cond = (row, expr) => { const m = expr.match(/^([a-z_]+)\.([a-z]+)\.(.*)$/s); return test(row, m[1], m[2], m[3]); };

function query(table, url) {
  let rows = table === "categories" ? [...categories] : [...entries];
  for (const [key, val] of url.searchParams) {
    if (["select", "order", "limit", "offset"].includes(key)) continue;
    if (key === "or") rows = rows.filter((r) => splitTop(val.replace(/^\(|\)$/g, "")).some((e) => cond(r, e)));
    else { const m = val.match(/^([a-z]+)\.(.*)$/s); rows = rows.filter((r) => test(r, key, m[1], m[2])); }
  }
  const order = url.searchParams.get("order");
  if (order) {
    const keys = order.split(",").map((o) => { const [c, d] = o.split("."); return [c, d === "desc" ? -1 : 1]; });
    rows.sort((a, b) => { for (const [c, d] of keys) { if (a[c] < b[c]) return -d; if (a[c] > b[c]) return d; } return 0; });
  }
  const offset = Number(url.searchParams.get("offset") ?? 0);
  const limit = Math.min(CAP, Number(url.searchParams.get("limit") ?? CAP));
  rows = rows.slice(offset, offset + limit);
  return shape(rows, url.searchParams.get("select") ?? "*");
}

function shape(rows, select) {
  return rows.map((r) => {
    if (select === "entry_date") return { entry_date: r.entry_date };
    if (select === "id") return { id: r.id };
    const out = { ...r };
    if (select.includes("categories(name)")) { const c = categories.find((x) => x.id === r.category_id); out.categories = c ? { name: c.name } : null; }
    return out;
  });
}

const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS", "access-control-expose-headers": "*" };
const send = (res, status, body, extra = {}) => {
  res.writeHead(status, { ...cors, "content-type": "application/json", ...extra });
  res.end(body === undefined ? "" : JSON.stringify(body));
};
const readBody = (req) => new Promise((resolve) => { const chunks = []; req.on("data", (c) => chunks.push(c)); req.on("end", () => resolve(Buffer.concat(chunks))); });

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (req.method === "OPTIONS") { res.writeHead(204, cors); return res.end(); }
  const raw = await readBody(req);
  log.push(`${req.method} ${url.pathname}${url.search.slice(0, 120)}`);

  if (url.pathname === "/__log") return send(res, 200, log.slice(-200));
  if (url.pathname === "/__count") return send(res, 200, { entries: entries.length });

  if (url.pathname === "/auth/v1/token") {
    const body = JSON.parse(raw.toString() || "{}");
    if (url.searchParams.get("grant_type") === "refresh_token" || (body.email === OWNER && body.password === "pw")) {
      const access_token = makeJwt(OWNER);
      return send(res, 200, { access_token, token_type: "bearer", expires_in: 3600, refresh_token: randomUUID(), user: { id: randomUUID(), email: OWNER, aud: "authenticated", role: "authenticated", app_metadata: {}, user_metadata: {}, created_at: new Date().toISOString() } });
    }
    return send(res, 400, { error: "invalid_grant", error_description: "Invalid login credentials", code: 400, msg: "Invalid login credentials" });
  }
  if (url.pathname === "/auth/v1/logout") return send(res, 204);

  const storage = url.pathname.match(/^\/storage\/v1\/object\/(?:public\/)?([^/]+)\/(.+)$/);
  if (storage) {
    if (req.method === "GET") { const f = files.get(storage[2]); if (!f) return send(res, 404, { message: "not found" }); res.writeHead(200, { ...cors, "content-type": f.type }); return res.end(f.data); }
    if (!isOwner(req)) return send(res, 403, { message: "new row violates row-level security policy", error: "Unauthorized", statusCode: "403" });
    files.set(storage[2], { type: "image/png", data: raw }); return send(res, 200, { Key: `${storage[1]}/${storage[2]}` });
  }

  const m = url.pathname.match(/^\/rest\/v1\/(categories|learning_entries)$/);
  if (!m) return send(res, 404, { message: "not found" });
  const table = m[1];
  const objectWanted = (req.headers.accept ?? "").includes("vnd.pgrst.object");
  const wantsRows = (req.headers.prefer ?? "").includes("return=representation");
  const reply = (rows, status = 200) => {
    if (objectWanted) return rows.length === 1 ? send(res, status, rows[0]) : send(res, 406, { code: "PGRST116", message: "JSON object requested, multiple (or no) rows returned", details: `The result contains ${rows.length} rows` });
    return send(res, status, rows);
  };

  if (req.method === "GET") return reply(query(table, url));

  if (!isOwner(req)) {
    if (req.method === "POST") return send(res, 403, { code: "42501", message: `new row violates row-level security policy for table "${table}"` });
    return reply([]); // update/delete a row you cannot see: RLS filters it out
  }
  if (req.method === "POST") {
    const body = JSON.parse(raw.toString());
    if (table === "categories") {
      if (categories.some((c) => c.name === body.name)) return send(res, 409, { code: "23505", message: "duplicate key value violates unique constraint" });
      const row = { id: randomUUID(), sort_order: 100, created_at: new Date().toISOString(), ...body }; categories.push(row); return wantsRows ? reply([row], 201) : send(res, 201);
    }
    if (!body.title) return send(res, 400, { code: "23502", message: "null value in column title" });
    const now = new Date().toISOString();
    const row = { id: randomUUID(), tags: [], summary: "", explanation: "", takeaways: [], examples: "", links: [], category_id: null, created_at: now, updated_at: now, ...body };
    entries.push(row);
    return wantsRows ? reply(shape([row], url.searchParams.get("select") ?? "*"), 201) : send(res, 201);
  }
  const target = query(table, new URL(url.href.replace(/([?&])(limit|offset)=[^&]*/g, "$1")));
  const ids = new Set(target.map((r) => r.id));
  if (req.method === "PATCH") {
    const body = JSON.parse(raw.toString());
    for (const row of entries) if (ids.has(row.id)) Object.assign(row, body, { updated_at: new Date().toISOString() });
    return wantsRows ? reply(shape(entries.filter((r) => ids.has(r.id)), url.searchParams.get("select") ?? "*")) : send(res, 204);
  }
  if (req.method === "DELETE") {
    for (let i = entries.length - 1; i >= 0; i--) if (ids.has(entries[i].id)) entries.splice(i, 1);
    return wantsRows ? reply(target) : send(res, 204);
  }
  send(res, 405, { message: "method not allowed" });
}).listen(PORT, () => console.log(`fake supabase on ${PORT}`));
