"use client";

import { useState } from "react";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-20 border-t border-zinc-100">
      <h2 className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-12">
        Contact
      </h2>

      <div className="grid sm:grid-cols-2 gap-12">
        <div className="space-y-5">
          <p className="text-lg text-zinc-600 leading-relaxed">
            Open to new opportunities and interesting problems. Feel free to reach out.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:samielimam@gmail.com"
              className="inline-flex items-center gap-3 text-sm text-zinc-700 hover:text-indigo-600 transition-colors duration-150 w-fit"
            >
              <span className="text-zinc-400"><MailIcon /></span>
              samielimam@gmail.com
            </a>
            <a
              href="https://github.com/selimam2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-zinc-700 hover:text-indigo-600 transition-colors duration-150 w-fit"
            >
              <span className="text-zinc-400"><GithubIcon /></span>
              github.com/selimam2
            </a>
            <a
              href="https://www.linkedin.com/in/sami-el-imam-b4bb33a6/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-zinc-700 hover:text-indigo-600 transition-colors duration-150 w-fit"
            >
              <span className="text-zinc-400"><LinkedinIcon /></span>
              linkedin.com/in/sami-el-imam-b4bb33a6
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What's on your mind?"
              className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {status === "sending" ? "Sending…" : status === "success" ? "Sent ✓" : "Send message"}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-500">Something went wrong. Try emailing directly.</p>
          )}
        </form>
      </div>
    </section>
  );
}
