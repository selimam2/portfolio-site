import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import FadeIn from "./components/FadeIn";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* Not wrapped in FadeIn: the hero is the first thing on screen
            (the LCP element), and fading it in from opacity 0 delays LCP
            until JS has hydrated. */}
        <Hero />
        <FadeIn delay={50}>
          <Experience />
        </FadeIn>
        <FadeIn delay={50}>
          <Education />
        </FadeIn>
        <FadeIn delay={50}>
          <Projects />
        </FadeIn>
        <FadeIn delay={50}>
          <Skills />
        </FadeIn>
        <FadeIn delay={50}>
          <Contact />
        </FadeIn>
      </main>
      <footer className="max-w-3xl mx-auto px-6 py-8 border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Sami El-Imam
        </p>
      </footer>
    </>
  );
}
