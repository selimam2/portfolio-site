const jobs = [
  {
    company: "Shoplogix Inc.",
    location: "Oakville, ON",
    roles: [
      {
        title: "Software Engineer",
        period: "Sept 2025 – Present",
        bullets: [
          "Built 3 ERP integrations and actively maintaining 20+ using Iguana, automating bidirectional work order and production data exchange between customer systems and the Shoplogix platform.",
          "Serving as primary dev contact for 5+ enterprise accounts across textile, automotive, and confectionery verticals — supporting onboarding and ongoing reliability.",
          "Leveraged AI-assisted development to quickly understand legacy and third-party integration code, enabling faster diagnosis across 20+ live integrations.",
        ],
      },
      {
        title: "Software Engineer Co-op",
        period: "Sept 2024 – Dec 2024",
        bullets: [
          "Built data pipelines using SQS, C#, and REST APIs to aggregate analytics from 10 endpoints across 100+ SaaS servers, improving data flow efficiency across distributed systems.",
          "Optimized PostgreSQL table organization with targeted indexing to centralize distributed data and support scalable query performance.",
          "Improved React application stability by redesigning state management to eliminate data inconsistencies during import operations.",
          "Built automated repair processes for servers stuck in corrupted update states, cutting recovery time by 90%.",
        ],
      },
      {
        title: "Software Engineer Co-op",
        period: "Jan 2023 – Apr 2023",
        bullets: [
          "Refactored a legacy BI plugin using jQuery and optimized DOM manipulation, enabling multilingual support for 7+ languages.",
          "Integrated historical speed data into real-time machine views via REST APIs and Redux, enabling trend-based performance analysis.",
          "Developed unit and integration tests for the frontend (Jest) and backend APIs (MOQ) to catch regressions and stabilize core workflows.",
        ],
      },
    ],
  },
  {
    company: "Cineplex Entertainment",
    location: "Toronto, ON",
    roles: [
      {
        title: "Software Engineer Co-op",
        period: "May 2022 – Sept 2022",
        bullets: [
          "Secured API infrastructure by implementing role-based access controls, request validation, and logging in Azure API Manager.",
          "Automated payroll data transfers to Workday by scripting API calls with PowerAutomate, cutting manual processing time by 50%.",
          "Centralized 300+ engineering documents by parsing HTML from OneNote into structured Azure DevOps wiki articles via Python.",
        ],
      },
    ],
  },
  {
    company: "University of Waterloo",
    location: "Waterloo, ON",
    roles: [
      {
        title: "Teaching Assistant",
        period: "Sept 2021 – Dec 2021",
        bullets: [
          "Developed automated grading scripts and Selenium-based web scraping tools to streamline code submission review for 400+ students.",
        ],
      },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="max-w-3xl mx-auto px-6 py-20 border-t border-zinc-100 dark:border-zinc-800">
      <h2 className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-12">
        Work Experience
      </h2>

      <div className="space-y-14">
        {jobs.map((job) => (
          <div key={job.company}>
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{job.company}</h3>
              <span className="text-sm text-zinc-400">{job.location}</span>
            </div>

            <div className="space-y-8">
              {job.roles.map((role) => (
                <div key={role.title + role.period}>
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{role.title}</span>
                    <span className="text-sm text-zinc-400 font-mono">{role.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {role.bullets.map((bullet, i) => (
                      <li key={i} className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-zinc-300 dark:before:text-zinc-600">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
