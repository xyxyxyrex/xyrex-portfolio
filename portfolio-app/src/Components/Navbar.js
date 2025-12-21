import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [letterEffects, setLetterEffects] = useState({});

  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");

    const handleScroll = () => {
      if (scrollContainer) {
        // Check if scrolled past the home section (first viewport height)
        setIsScrolled(scrollContainer.scrollTop > window.innerHeight * 0.5);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseMove = (e, linkId, label) => {
    const linkElement = e.currentTarget;
    const letters = linkElement.querySelectorAll(".nav-letter");
    const newEffects = {};

    letters.forEach((letter, index) => {
      const rect = letter.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2;
      const letterCenterY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - letterCenterX, 2) +
          Math.pow(e.clientY - letterCenterY, 2)
      );

      // Max effect radius
      const maxDistance = 80;
      const effect = Math.max(0, 1 - distance / maxDistance);

      newEffects[`${linkId}-${index}`] = effect;
    });

    setLetterEffects(newEffects);
  };

  const handleMouseLeave = (linkId) => {
    setHoveredLink(null);
    setLetterEffects({});
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Code" },
    { id: "skills", label: "Media" },
    { id: "contact", label: "Contact" },
  ];

  const getLetterStyle = (linkId, index, effect) => {
    const scale = 1 + effect * 0.35;
    const translateY = -effect * 1;

    return {
      display: "inline-block",
      transform: `scale(${scale}) translateY(${translateY}px)`,
      textShadow:
        effect > 0.2
          ? `${-2 * effect}px 0 0 rgba(255, 0, 0, ${effect * 0.4}), 
           ${2 * effect}px 0 0 rgba(0, 255, 255, ${effect * 0.4}),
           0 0 ${8 * effect}px rgba(255, 255, 255, ${effect * 0.6})`
          : "none",
      transition: "transform 0.15s ease-out, text-shadow 0.15s ease-out",
    };
  };

  return (
    <>
      <nav className="fixed bottom-4 left-4 md:bottom-20 md:left-20 m-2 md:m-4 z-50">
        <ul
          className={`flex flex-col p-2 md:p-4 rounded-lg text-black transition-all duration-500 ease-out ${
            isScrolled ? "space-y-0.5 md:space-y-1" : "space-y-2 md:space-y-7"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.id} className="relative">
              <a
                className={`nav-link font-bold transition-all duration-300 ease-out inline-block origin-left relative z-10 ${
                  isScrolled
                    ? "text-base md:text-2xl scale-75"
                    : "text-xl md:text-5xl scale-100"
                } ${hoveredLink === link.id ? "nav-link-hovered" : ""}`}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseMove={(e) => handleMouseMove(e, link.id, link.label)}
                onMouseLeave={() => handleMouseLeave(link.id)}
              >
                <span className="nav-link-text">
                  {link.label.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="nav-letter"
                      style={getLetterStyle(
                        link.id,
                        index,
                        letterEffects[`${link.id}-${index}`] || 0
                      )}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <span className="nav-link-bg"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <style>{`
        .nav-link {
          position: relative;
          cursor: pointer;
        }

        .nav-link-text {
          position: relative;
          z-index: 3;
          display: flex;
        }

        .nav-letter {
          transform-origin: center bottom;
          will-change: transform, color, text-shadow;
        }

        .nav-link-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: calc(100% + 32px);
          height: calc(100% + 16px);
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 1px rgba(255, 255, 255, 0.6),
            inset 0 -1px 1px rgba(0, 0, 0, 0.05);
          opacity: 0;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
                      opacity 0.3s ease;
          z-index: 1;
        }

        .nav-link-hovered .nav-link-bg {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      `}</style>
    </>
  );
}
