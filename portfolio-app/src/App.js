import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Skills from "./Pages/Skills";
import Contact from "./Pages/Contact";
import { getRandomColor } from "./utils/randomColors";

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
      {sections.map((section, index) => (
        <div
          key={index}
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
      ))}
    </div>
  );
}
