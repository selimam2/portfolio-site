import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="max-w-3xl mx-auto px-6 py-8 border-t border-zinc-100">
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} Sami El-Imam
        </p>
      </footer>
    </>
  );
}
