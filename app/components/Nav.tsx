"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

const links = [
  { href: "#experience", label: "Work" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-100 dark:border-zinc-800">
      <nav className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">
          Sami El-Imam
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <a href="/game" className="text-yellow-500 font-medium hover:text-yellow-400 transition-colors duration-150">
            ⚡ Play
          </a>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
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

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-1.5 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 py-4 flex flex-col gap-4">
          <a
            href="/game"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-yellow-500 hover:text-yellow-400 transition-colors duration-150"
          >
            ⚡ Play
          </a>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
