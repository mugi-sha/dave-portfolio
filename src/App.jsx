import { useEffect } from "react";
import { Nav } from "./components/nav"
import { Hero } from "./components/Hero"
import TechMarquee from "./components/TechMarquee";
import AboutMe from "./components/about-me";
import Projects from "./components/projects";
import Services from "./components/services";
import Resume from "./components/Resume";
import Contacts from "./components/MyContact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import "./App.css";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("js-ready");

    const sections = document.querySelectorAll("section[id], div#home");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.18 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollProgress />
      <main>
        <div className="w-full min-h-screen hero">
          <Nav />
          <Hero />
          <TechMarquee />

          <AboutMe />
          <Services />
          <Resume />
          <Projects />
          <Contacts />
          <Footer />
      </div>
      </main>
      <BackToTop />
    </>
  );
}
