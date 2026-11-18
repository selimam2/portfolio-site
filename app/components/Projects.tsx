import { ArrowUpRight } from "lucide-react";

// Tag colour palette, so the same tech always gets the same chip colour.
const tag = {
  ai: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  llm: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  openai: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  zinc: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  todo: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};

type Project = {
  name: string;
  year: string | null;
  url: string | null;
  urlLabel: string | null;
  github: string | null;
  featured: boolean;
  description: string;
  highlights: string[];
  tags: { label: string; color: string }[];
};

// Ordered most recent and most AI/backend-heavy first.
const projects: Project[] = [
  {
    name: "DebutPage",
    year: "2026",
    url: "https://debutpage.com",
    urlLabel: "debutpage.com",
    github: null,
    featured: true,
    description:
      "Upload a resume and the Claude API turns it into a hosted portfolio site. DebutPage is a SaaS I designed, built and run solo. The LLM pipeline is the core of the product: it reads an unstructured PDF resume and produces a structured, publishable site from it.",
    highlights: [
      "Claude API pipelines parse uploaded PDF resumes into structured data, then generate a hosted personal site from it.",
      "Multi-turn conversational theme editor: users restyle their site by describing the change in plain language.",
      "Custom domain search, registration, and TLS provisioning on AWS (Route 53, ACM), with Stripe subscription billing and usage quotas.",
      "CI/CD deployment to AWS via GitHub Actions; Drizzle ORM on PostgreSQL, tested with Vitest.",
    ],
    tags: [
      { label: "Claude API", color: tag.ai },
      { label: "LLM", color: tag.llm },
      { label: "TypeScript", color: tag.blue },
      { label: "Next.js", color: tag.zinc },
      { label: "React", color: tag.cyan },
      { label: "PostgreSQL", color: tag.sky },
      { label: "AWS", color: tag.orange },
      { label: "Stripe", color: tag.indigo },
    ],
  },
  {
    name: "NorthShift Jobs",
    year: "2026",
    url: "https://northshift.ca",
    urlLabel: "northshift.ca",
    github: "https://github.com/selimam2/northshift-jobs",
    featured: true,
    description:
      "Contract nursing in rural Canada is a broken market — positions go unfilled for months while nurses scroll through outdated boards or work through expensive staffing agencies. I built NorthShift to cut out the middleman: a fully bilingual (English/French) direct-hire platform where employers post and nurses apply, with no agency taking a cut. Took it from zero to live, solo, end-to-end.",
    highlights: [
      "Provisioned the full AWS infrastructure as code with Terraform. Launched on ECS Fargate, RDS and an ALB, then measured where the spend went and consolidated onto a single Dockerized EC2 host behind Caddy, cutting infrastructure cost from ~$104 to ~$27 per month (~74%).",
      "Kept the move reversible: Terraform manages the VPC, EC2, ECR, S3, Route 53 and security groups, with Postgres backed up to S3. The trade-offs (single point of failure, vertical scaling, brief-downtime deploys) were a deliberate call for a pre-revenue product.",
      "Automated Stripe billing — checkout sessions, webhook handling, trial periods, and tier-based feature gating integrated with role-based JWT auth across three permission levels.",
    ],
    tags: [
      { label: "AWS", color: tag.orange },
      { label: "Terraform", color: tag.ai },
      { label: "Docker", color: tag.blue },
      { label: "C#", color: tag.indigo },
      { label: "ASP.NET Core", color: tag.indigo },
      { label: "TypeScript", color: tag.blue },
      { label: "Next.js", color: tag.zinc },
      { label: "PostgreSQL", color: tag.sky },
      { label: "Stripe", color: tag.indigo },
    ],
  },
  {
    name: "TongueTip",
    year: "May – Aug 2024",
    url: null,
    urlLabel: null,
    // Repo is private (github.com/selimam2/ToungeTip returns 404), so no link.
    github: null,
    featured: false,
    description:
      "Everyone knows the tip-of-the-tongue feeling — a word you know but can't pull up on demand. For people with aphasia, that feeling is constant. Our team built TongueTip to help: speak naturally and the Android app listens for gaps, then surfaces the word you were reaching for in real time.",
    highlights: [
      "Two-model LLM architecture: Google Gemma runs on-device, so speech never leaves the phone; GPT-4o runs in the cloud for more accurate suggestions. Users choose which one to use, trading privacy against accuracy.",
      "I built the LLM integration, including prompt design and routing between the two models, tuned for low-latency suggestions.",
    ],
    tags: [
      { label: "Google Gemma", color: tag.ai },
      { label: "GPT-4o", color: tag.openai },
      { label: "LLM", color: tag.llm },
      { label: "Android", color: tag.green },
      { label: "Kotlin", color: tag.orange },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-3xl mx-auto px-6 py-20 border-t border-zinc-100 dark:border-zinc-800">
      <h2 className="text-xs font-mono text-zinc-500 dark:text-zinc-400 tracking-widest uppercase mb-12">
        Projects
      </h2>

      <div className="space-y-10">
        {projects.map((project) => (
          <article
            key={project.name}
            className={
              project.featured
                ? "p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/60 to-violet-50/40 dark:from-indigo-950/40 dark:to-violet-950/30"
                : ""
            }
          >
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{project.name}</h3>
                {project.year && (
                  <>
                    <span className="sr-only"> · </span>
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{project.year}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-150"
                  >
                    {project.urlLabel}
                    <ArrowUpRight size={12} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150"
                  >
                    GitHub
                    <span className="sr-only"> repository for {project.name} (opens in a new tab)</span>
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {project.description}
            </p>

            {project.highlights.length > 0 && (
              <ul className="space-y-2 mb-4">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-zinc-300 dark:before:text-zinc-600"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <ul className="flex flex-wrap gap-1.5" aria-label={`${project.name} tech stack`}>
              {project.tags.map((t) => (
                <li
                  key={t.label}
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${t.color}`}
                >
                  {t.label}{" "}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
