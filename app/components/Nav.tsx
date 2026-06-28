"use client";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-zinc-100">
      <nav className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-900 tracking-tight">
          Sami El-Imam
        </span>
        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <a href="/game" className="text-yellow-500 font-medium hover:text-yellow-400 transition-colors duration-150">
            ⚡ Play
          </a>
          <a href="#experience" className="hover:text-zinc-900 transition-colors duration-150">
            Work
          </a>
          <a href="#education" className="hover:text-zinc-900 transition-colors duration-150">
            Education
          </a>
          <a href="#projects" className="hover:text-zinc-900 transition-colors duration-150">
            Projects
          </a>
          <a href="#skills" className="hover:text-zinc-900 transition-colors duration-150">
            Skills
          </a>
          <a
            href="#contact"
            className="hover:text-zinc-900 transition-colors duration-150"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
