import { ArrowUpRight, GitHub, Star } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { githubActivity, links } from "@/content/site";
import { cn, githubUsername } from "@/lib/utils";

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  pushed_at: string;
}

const REVALIDATE = 60 * 60 * 24;

async function getContributions(user: string) {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { total?: { lastYear?: number }; contributions?: Day[] };
    const days = data.contributions ?? [];
    if (!days.length) return null;

    // Columns of weeks, Sunday first; pad the first week so weekdays line up.
    const weeks: (Day | null)[][] = [];
    let week: (Day | null)[] = Array(new Date(`${days[0].date}T00:00:00Z`).getUTCDay()).fill(null);
    for (const day of days) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length) weeks.push(week);

    return { total: data.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0), weeks };
  } catch {
    return null;
  }
}

async function getRepos(user: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
      },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return [];
    const repos = (await res.json()) as Repo[];
    const wanted = githubActivity.featuredRepos.map((n) => n.toLowerCase());
    if (wanted.length) {
      return wanted.map((name) => repos.find((r) => r.name.toLowerCase() === name)).filter((r): r is Repo => !!r);
    }
    return repos
      .filter((r) => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
      .slice(0, 4);
  } catch {
    return [];
  }
}

const levels = ["bg-white/[0.05]", "bg-accent/25", "bg-accent/45", "bg-accent/70", "bg-accent"];

/** Hidden entirely unless a GitHub URL is configured and GitHub returns real data. */
export async function GitHubActivity() {
  const user = githubActivity.enabled ? githubUsername(links.github) : "";
  if (!user) return null;

  const [contributions, repos] = await Promise.all([getContributions(user), getRepos(user)]);
  if (!contributions && !repos.length) return null;

  return (
    <section id="github" aria-labelledby="github-title" className="py-28 sm:py-36">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeader id="github-title" eyebrow="Open source" title="Developer activity" />
          <div data-reveal>
            <ButtonLink href={links.github} variant="secondary" size="sm" arrow="up-right" icon={<GitHub className="size-4" />}>
              @{user}
            </ButtonLink>
          </div>
        </div>

        {contributions && (
          <div data-reveal className="panel mt-12 p-5 sm:p-7">
            <p className="text-sm text-muted">
              <span className="font-medium text-fg">{contributions.total.toLocaleString("en-US")}</span> contributions in the last year
            </p>
            <div className="mt-5 overflow-x-auto pb-1">
              <div className="flex w-max gap-[3px]" role="img" aria-label={`${contributions.total} contributions in the last year`}>
                {contributions.weeks.map((week, w) => (
                  <div key={w} className="flex flex-col gap-[3px]">
                    {week.map((day, d) =>
                      day ? (
                        <span
                          key={day.date}
                          title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                          className={cn("size-[11px] rounded-[3px]", levels[day.level] ?? levels[0])}
                        />
                      ) : (
                        <span key={`pad-${d}`} className="size-[11px]" />
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!!repos.length && (
          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
            {repos.map((repo) => (
              <li key={repo.name} data-reveal>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group spotlight panel flex h-full flex-col p-6 transition-transform duration-500 hover:-translate-y-1"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="truncate font-mono text-sm text-fg">{repo.name}</span>
                    <ArrowUpRight className="size-4 shrink-0 text-subtle transition group-hover:text-fg" />
                  </span>
                  {repo.description && <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{repo.description}</span>}
                  <span className="mt-auto flex items-center gap-4 pt-5 font-mono text-xs text-subtle">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3.5" />
                      {repo.stargazers_count}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
