"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Nav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-100 dark:border-zinc-800">
      <nav className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">
          Sami El-Imam
        </span>
        <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <a href="/game" className="text-yellow-500 font-medium hover:text-yellow-400 transition-colors duration-150">
            ⚡ Play
          </a>
          <a href="#experience" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150">
            Work
          </a>
          <a href="#education" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150">
            Education
          </a>
          <a href="#projects" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150">
            Projects
          </a>
          <a href="#skills" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150">
            Skills
          </a>
          <a href="#contact" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150">
            Contact
          </a>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
