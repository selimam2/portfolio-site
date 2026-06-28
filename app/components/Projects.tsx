import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "NorthShift Jobs",
    year: "2026",
    url: "https://northshift.ca",
    urlLabel: "northshift.ca",
    github: null,
    featured: true,
    description:
      "Contract nursing in rural Canada is a broken market — positions go unfilled for months while nurses scroll through outdated boards or work through expensive staffing agencies. I built NorthShift to cut out the middleman: a direct-hire platform where employers post and nurses apply, fully bilingual, with no middleman taking a cut. Took it from zero to live, solo, end-to-end.",
    highlights: [
      "Automated Stripe billing — checkout sessions, webhook handling, trial periods, and tier-based feature gating integrated with role-based JWT auth across three permission levels.",
      "Provisioned full AWS infrastructure as code with Terraform: ECS Fargate for zero-downtime deploys, RDS (PostgreSQL), ALB, ACM, Route 53, ECR, and S3.",
    ],
    tags: [
      { label: "TypeScript", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
      { label: "React", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" },
      { label: "Node.js", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
      { label: "PostgreSQL", color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400" },
      { label: "AWS", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
      { label: "Terraform", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" },
      { label: "Stripe", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
      { label: "Docker", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    ],
  },
  {
    name: "TongueTip",
    year: "May – Aug 2024",
    url: null,
    urlLabel: null,
    github: "https://github.com/selimam2/TongueTip",
    featured: false,
    description:
      "Everyone knows the tip-of-the-tongue feeling — a word you know but can't pull up on demand. For people with aphasia, that feeling is constant. We built TongueTip to help: speak naturally and the app listens for gaps, then surfaces what you were reaching for in real time. We paired on-device Gemma for privacy with GPT-4o for accuracy, letting users choose their own trade-off.",
    highlights: [],
    tags: [
      { label: "Android", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
      { label: "Google Gemma", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" },
      { label: "GPT-4o", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
      { label: "LLM", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
      { label: "Java", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
    ],
  },
  {
    name: "Message Scheduler",
    year: null,
    url: null,
    urlLabel: null,
    github: "https://github.com/selimam2/Message-Scheduler",
    featured: false,
    description:
      "MERN-stack app to schedule and send text messages at a specified time.",
    highlights: [],
    tags: [
      { label: "MongoDB", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
      { label: "Express.js", color: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400" },
      { label: "React", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" },
      { label: "Node.js", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-3xl mx-auto px-6 py-20 border-t border-zinc-100 dark:border-zinc-800">
      <h2 className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-12">
        Projects
      </h2>

      <div className="space-y-10">
        {projects.map((project) => (
          <div
            key={project.name}
            className={
              project.featured
                ? "p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/60 to-violet-50/40 dark:from-indigo-950/40 dark:to-violet-950/30"
                : ""
            }
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{project.name}</h3>
                {project.year && (
                  <span className="text-xs font-mono text-zinc-400">{project.year}</span>
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
                    <ArrowUpRight size={12} />
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
                    <ArrowUpRight size={12} />
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

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tag.color}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
