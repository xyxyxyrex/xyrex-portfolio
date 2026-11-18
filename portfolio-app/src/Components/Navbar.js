import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LiquidGlass from "liquid-glass-react";
import Icon from "./Icon";
import "./Navbar.css";

const links = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about", label: "About", icon: "about" },
  { id: "projects", label: "Code", icon: "code" },
  { id: "skills", label: "Media", icon: "media" },
  { id: "contact", label: "Contact", icon: "contact" },
];

// Match the server and first client pass, then enhance the usable dock.
function DockGlass({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="dock-glass dock-glass-static"><div className="glass">{children}</div></div>;
  return <LiquidGlass className="dock-glass" cornerRadius={18} padding="6px" displacementScale={12} blurAmount={0.24} saturation={0} aberrationIntensity={0} elasticity={0} mode="standard" style={{ position: "absolute", top: "50%", left: "50%" }}>{children}</LiquidGlass>;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const container = document.querySelector("[data-scroll-container]");
    if (!container) return;
    let frame;
    const update = () => {
      const bounds = container.getBoundingClientRect();
      setIsScrolled(container.scrollTop > container.clientHeight * 0.2);
      const midpoint = bounds.top + container.clientHeight * 0.45;
      let current = "home";
      links.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= midpoint) current = id;
      });
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <nav aria-label="Main navigation" className={`portfolio-dock ${isScrolled ? "is-compact" : ""}`}>
      <motion.div className="dock-enter" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
        <div className="dock-surface">
        <DockGlass>
          <ul className="dock-links">
            {links.map((link, index) => (
              <li key={link.id}>
                <a href={`#${link.id}`} aria-label={link.label} aria-current={active === link.id ? "location" : undefined} className={`dock-link ${active === link.id ? "is-active" : ""}`} onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  const section = document.getElementById(link.id);
                  if (!section) return;
                  event.preventDefault();
                  section.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "start" });
                }}>
                  <Icon name={link.icon} size={21} />
                  <span className="dock-tooltip" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span>{link.label}</span>
                  <span className="dock-active-dot" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </DockGlass>
        </div>
      </motion.div>
    </nav>
  );
}
