import { motion, useReducedMotion } from "framer-motion";
import Icon from "../Components/Icon";
import "./Home.css";

export default function Home() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  });
  return (
    <section className="hero" aria-labelledby="hero-title">
      <header className="hero-header">
        <a href="#home" className="hero-monogram" aria-label="Xyrex, home">xy<span>✳</span></a>
        <span className="hero-header-note">A little logic. A little imagination.</span>
        <a className="hero-resume" href="/assets/files/new-resume.pdf" download><span>Resume</span><Icon name="download" size={16} /></a>
      </header>
      <motion.div className="hero-intro" {...reveal(0.1)}>
        <span className="hero-eyebrow"><span className="hero-dot" /> THE PORTFOLIO OF</span>
        <p>Xyrex Kyle Salazar</p>
      </motion.div>
      <h1 id="hero-title" className="sr-only">Xyrex Kyle Salazar — Developer &amp; Creative</h1>
      <motion.div className="hero-type hero-type-back" aria-hidden="true" {...reveal(0.2)}>DEVELOPER</motion.div>
      <motion.div className="hero-side hero-side-left" {...reveal(0.4)}>
        <span className="hero-small-label">A MIND FOR BOTH</span>
        <p>Thoughtful code.<br />Expressive design.</p>
        <a href="#projects" className="hero-work-link">Explore my work <Icon name="arrow-up-right" size={17} /></a>
      </motion.div>
      <motion.div className="hero-portrait" {...reveal(0.25)}>
        <img src="/assets/hero-cutout-halftone.png" alt="Halftone portrait of Xyrex Kyle Salazar wearing a black shirt and blazer, with a warm gray outline" width="1098" height="1433" fetchPriority="high" decoding="async" />
      </motion.div>
      <motion.div className="hero-side hero-side-right" {...reveal(0.5)}>
        <span className="hero-small-label">BASED IN</span>
        <p>Bacolod, Philippines</p>
        <span className="hero-specialties">Web / Mobile / Multimedia</span>
      </motion.div>
      <motion.div className="hero-type hero-type-front" aria-hidden="true" {...reveal(0.4)}>&amp; CREATIVE.</motion.div>
      <footer className="hero-footer">
        <a href="#about" className="hero-scroll"><Icon name="arrow-down" size={17} /><span>There’s more below</span></a>
        <span className="hero-edition">SELECTED WORK · {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}
