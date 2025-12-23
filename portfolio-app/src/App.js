import { AnimatePresence } from "framer-motion";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Skills from "./Pages/Skills";
import Contact from "./Pages/Contact";
import { SectionWrapper } from "./Components/PageTransition";

export default function App() {
  const sections = [
    { id: "home", component: <Home key="home" /> },
    { id: "about", component: <About key="about" /> },
    { id: "projects", component: <Projects key="projects" /> },
    { id: "skills", component: <Skills key="skills" /> },
    { id: "contact", component: <Contact key="contact" /> },
  ];

  return (
    <div
      data-scroll-container
      style={{
        scrollSnapType: "y mandatory",
        overflowY: "scroll",
        height: "100vh",
        scrollBehavior: "smooth",
      }}
    >
      <Navbar />
      <AnimatePresence mode="wait">
        {sections.map((section, index) => (
          <SectionWrapper key={index} className="section-container">
            <div
              id={section.id}
              style={{
                height: "100vh",
                scrollSnapAlign: "start",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                color: "#000",
              }}
            >
              {section.component}
            </div>
          </SectionWrapper>
        ))}
      </AnimatePresence>
    </div>
  );
}
