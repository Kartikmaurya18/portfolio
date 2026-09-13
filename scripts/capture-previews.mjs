/**
 * Captures desktop + mobile screenshots of each case study's live site with a
 * locally installed Chrome/Edge, converts them to WebP and writes a manifest.
 *
 *   npm run previews                 # every case study
 *   npm run previews -- supriyapa    # only the given slugs
 *
 * Needs Node >= 22.18 (imports the TypeScript project list directly) and Chrome,
 * Edge or Chromium. Set CHROME_PATH if the browser isn't found automatically.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { projects } from "../src/content/projects.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "projects");
const manifestPath = path.join(root, "src", "content", "previews.generated.json");

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, scale: 1, ua: null },
  mobile: {
    width: 390,
    height: 844,
    scale: 2,
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  },
};

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error("No Chrome/Edge/Chromium found. Set CHROME_PATH.");
  return found;
}

async function isReachable(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
      headers: { "user-agent": "Mozilla/5.0 (preview-capture)" },
    });
    return res.ok;
  } catch {
    return false;
  }
}

function run(bin, args, timeoutMs) {
  return new Promise((resolve) => {
    const child = spawn(bin, args, { stdio: "ignore" });
    const timer = setTimeout(() => child.kill(), timeoutMs);
    child.on("exit", (code) => {
      clearTimeout(timer);
      resolve(code);
    });
  });
}

async function capture(browser, url, viewport, file) {
  const profile = await mkdtemp(path.join(os.tmpdir(), "preview-"));
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--mute-audio",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${profile}`,
    `--window-size=${viewport.width},${viewport.height}`,
    `--force-device-scale-factor=${viewport.scale}`,
    "--virtual-time-budget=15000",
    `--screenshot=${file}`,
  ];
  if (viewport.ua) args.push(`--user-agent=${viewport.ua}`);
  args.push(url);
  await run(browser, args, 90_000);
  await rm(profile, { recursive: true, force: true }).catch(() => {});
  return existsSync(file);
}

async function processProject(browser, project, tmp) {
  if (!(await isReachable(project.url))) {
    console.warn(`✗ ${project.slug}: ${project.url} is unreachable, skipped`);
    return null;
  }
  const entry = {};
  await mkdir(outDir, { recursive: true });
  for (const [kind, viewport] of Object.entries(VIEWPORTS)) {
    const raw = path.join(tmp, `${project.slug}-${kind}.png`);
    if (!(await capture(browser, project.url, viewport, raw))) {
      console.warn(`✗ ${project.slug} (${kind}): capture failed`);
      continue;
    }
    const target = `${project.slug}-${kind}.webp`;
    const info = await sharp(raw)
      .resize({ width: viewport.width * Math.min(viewport.scale, 2), withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(outDir, target));
    const blur = await sharp(raw).resize(16).webp({ quality: 40 }).toBuffer();
    entry[kind] = {
      src: `/projects/${target}`,
      width: info.width,
      height: info.height,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    };
  }
  console.log(`✓ ${project.slug}`);
  return Object.keys(entry).length ? entry : null;
}

async function main() {
  const only = process.argv.slice(2);
  const targets = only.length ? projects.filter((p) => only.includes(p.slug)) : projects;
  if (!targets.length) throw new Error(`No projects match: ${only.join(", ")}`);

  const browser = findBrowser();
  const tmp = await mkdtemp(path.join(os.tmpdir(), "previews-"));
  const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, "utf8")) : {};

  const queue = [...targets];
  const worker = async () => {
    for (let p = queue.shift(); p; p = queue.shift()) {
      const entry = await processProject(browser, p, tmp);
      if (entry) manifest[p.slug] = entry;
    }
  };
  await Promise.all(Array.from({ length: 3 }, worker));

  const slugs = new Set(projects.map((p) => p.slug));
  const kept = Object.entries(manifest)
    .filter(([slug]) => slugs.has(slug))
    .sort(([a], [b]) => a.localeCompare(b));
  await writeFile(manifestPath, JSON.stringify(Object.fromEntries(kept), null, 2) + "\n");
  await rm(tmp, { recursive: true, force: true });
  console.log(`Manifest written: ${path.relative(root, manifestPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
