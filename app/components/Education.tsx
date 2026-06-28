export default function Education() {
  return (
    <section id="education" className="max-w-3xl mx-auto px-6 py-20 border-t border-zinc-100 dark:border-zinc-800">
      <h2 className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-12">
        Education
      </h2>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">University of Waterloo</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Bachelor of Computer Engineering</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
              GPA 3.5 / 4.0
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              5 co-op terms
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              Waterloo, ON
            </span>
          </div>
        </div>
        <span className="text-sm text-zinc-400 font-mono shrink-0">2021 – 2025</span>
      </div>
    </section>
  );
}
