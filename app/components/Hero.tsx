import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-24 pb-20">
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-mono text-indigo-500 tracking-widest uppercase font-medium">
            Software Engineer
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Sami El-Imam.
            </span>
          </h1>
        </div>

        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
          Computer Engineering graduate from the{" "}
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">University of Waterloo</span>.
          I build production systems end&#8209;to&#8209;end — infrastructure, backend,
          and UI. I&apos;m also deeply into{" "}
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">AI &amp; LLM engineering</span>
          {" "}— prompt design, Claude API integration, and shipping AI-powered features
          into real products. Currently at{" "}
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Shoplogix</span>{" "}
          and the sole architect behind{" "}
          <a
            href="https://northshift.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-2 decoration-indigo-300 hover:decoration-indigo-600 transition-colors duration-150"
          >
            NorthShift Jobs ↗
          </a>
          .
        </p>

        <div className="flex items-center flex-wrap gap-4 pt-1">
          <a
            href="https://github.com/selimam2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors duration-150"
          >
            <GithubIcon />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sami-el-imam-b4bb33a6/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors duration-150"
          >
            <LinkedinIcon />
            LinkedIn
          </a>
          <a
            href="mailto:samielimam@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors duration-150"
          >
            <MailIcon />
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
