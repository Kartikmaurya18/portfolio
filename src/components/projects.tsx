import Link from "next/link";
import { ExternalLink } from "@/components/external-link";
import type { FeaturedProject } from "@/content/types";
import { hidden, shown } from "@/lib/todo";

/** "https://github.com/Kartikmaurya18/Stocks" -> "Stocks" */
const repoName = (url: string) => url.replace(/\/$/, "").split("/").pop() ?? url;

function Links({ project }: { project: FeaturedProject }) {
  return (
    <div className="project-links">
      {project.demo && (
        <ExternalLink href={project.demo} className="project-link">Live Demo <span aria-hidden="true">↗</span></ExternalLink>
      )}
      {project.code && (
        <ExternalLink href={project.code} className="project-link">
          Source Code <span className="repo-name">· {repoName(project.code)}</span> <span aria-hidden="true">↗</span>
        </ExternalLink>
      )}
      {project.caseStudy && (
        <Link href={`/work/${project.caseStudy}`} className="project-link">Case study <span aria-hidden="true">↗</span></Link>
      )}
    </div>
  );
}

function Stack({ project }: { project: FeaturedProject }) {
  return (
    <ul className="tag-list" aria-label={`${project.name} tech stack`}>
      {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
    </ul>
  );
}

/** The large card: problem, what I built, how it fits together, numbers, contribution and links. */
export function LeadProject({ project }: { project: FeaturedProject }) {
  const problem = shown(project.problem);
  const metrics = (project.metrics ?? []).filter((m) => !hidden(m.value) && !hidden(m.label));
  return (
    <article className="lead-project">
      <div className="lead-main">
        <p className="lead-tag">Featured</p>
        <h3>{project.name}</h3>
        <p className="lead-desc">{project.description}</p>
        {problem && (
          <>
            <h4 className="lead-h">The problem</h4>
            <p>{problem}</p>
          </>
        )}
        {project.built && (
          <>
            <h4 className="lead-h">What I built</h4>
            <ul className="tl-bullets">
              {project.built.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </>
        )}
        <p className="project-contribution"><strong>My contribution:</strong> {project.contribution}</p>
      </div>

      <div className="lead-side">
        {project.flow && (
          <>
            <h4 className="lead-h">How it fits together</h4>
            <ol className="flow">
              {project.flow.map((node) => <li key={node}>{node}</li>)}
            </ol>
            {project.flowNote && <p className="flow-note">{project.flowNote}</p>}
          </>
        )}
        {project.deployment && <p className="deploy-note">{project.deployment}</p>}
        <Stack project={project} />
        {metrics.length > 0 && (
          <dl className="metrics">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <Links project={project} />
      </div>
    </article>
  );
}

/** The small card used for every other project. */
export function ProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <article className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p className="project-contribution"><strong>My contribution:</strong> {project.contribution}</p>
      <Stack project={project} />
      <Links project={project} />
    </article>
  );
}
