const skillGroups = [
  {
    label: "AI & LLM",
    color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    labelColor: "text-violet-600 dark:text-violet-400",
    items: ["Claude API", "Prompt Engineering", "OpenAI API", "Google Gemma", "LLM Integration", "AI-Assisted Development"],
  },
  {
    label: "Languages",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    labelColor: "text-blue-600 dark:text-blue-400",
    items: ["C#", "TypeScript", "Python", "JavaScript", "Java", "SQL", "C++", "HTML5", "CSS3"],
  },
  {
    label: "Frameworks & Tools",
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    labelColor: "text-indigo-600 dark:text-indigo-400",
    items: ["React", "Node.js", "ASP.NET", "Express.js", "Redux", "Docker", "Terraform", "Git", "Jest", "Selenium"],
  },
  {
    label: "Cloud & Data",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    labelColor: "text-orange-600 dark:text-orange-400",
    items: ["AWS (ECS Fargate, SQS, S3, RDS, Lambda)", "Azure DevOps", "PostgreSQL", "MongoDB", "MySQL", "DynamoDB", "CI/CD"],
  },
  {
    label: "Practices",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    labelColor: "text-emerald-600 dark:text-emerald-400",
    items: ["Agile / Scrum", "Kanban", "REST APIs", "System Design"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-3xl mx-auto px-6 py-20 border-t border-zinc-100 dark:border-zinc-800">
      <h2 className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-12">
        Skills
      </h2>

      <div className="space-y-8">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <span className={`text-xs font-semibold uppercase tracking-widest ${group.labelColor} mb-3 block`}>
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className={`text-sm font-medium px-3 py-1 rounded-full ${group.color}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
