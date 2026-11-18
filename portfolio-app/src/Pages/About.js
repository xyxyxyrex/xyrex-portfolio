import { useState } from "react";
import Icon from "../Components/Icon";
import "./About.css";

const disciplines = [
  {
    id: "development", label: "Development", number: "01", icon: "code",
    headline: "Built with intention.",
    description: "I bring ideas to life through web, mobile, and desktop development, with a toolkit that connects interfaces, systems, and hardware.",
    tools: [
      { name: "React", image: "react.png", description: "Building interactive, component-based interfaces for the web." },
      { name: "Flutter", image: "flutter.webp", description: "Creating mobile interfaces and applications with a shared codebase." },
      { name: "PHP", image: "php.png", description: "Connecting interfaces to server-side logic and application data." },
      { name: "Python", image: "python.png", description: "Writing scripts, exploring ideas, and automating repetitive tasks." },
      { name: "Android", image: "android.png", description: "Building applications and experiences for Android devices." },
      { name: "Arduino", image: "arduino.png", description: "Bringing software into the physical world through hardware experiments." },
      { name: "Rust", image: "rust.svg", description: "Working with Rust for systems-oriented development and native application logic." },
      { name: "Electron", image: "electron.svg", description: "Bringing web interfaces to the desktop with Electron." },
      { name: "Agentic Development", images: ["claude-code.svg", "codex.svg"], detail: "Claude Code / Codex", description: "Working with Claude Code and Codex to explore code, implement ideas, and iterate on software." },
    ],
  },
  {
    id: "design", label: "Design", number: "02", icon: "media",
    headline: "Designed to feel right.",
    description: "My background in multimedia shapes the way I work with layout, imagery, and visual identity, from an early concept to the final detail.",
    tools: [
      { name: "Figma", image: "figma.png", description: "Exploring interface layouts, visual systems, and interactive prototypes." },
      { name: "Photoshop", image: "photoshop.png", description: "Editing images and creating layered compositions and visual artwork." },
      { name: "Illustrator", image: "illustrator.png", description: "Creating vector artwork, graphic elements, and identity explorations." },
      { name: "Canva", image: "canva.webp", description: "Putting together visual content and quick design explorations." },
    ],
  },
  {
    id: "motion", label: "Motion", number: "03", icon: "play",
    headline: "Made to move.",
    description: "I work with rhythm, pacing, and movement to turn footage and graphics into visual stories.",
    tools: [
      { name: "Premiere Pro", image: "premiere.png", description: "Shaping footage into stories through editing, pacing, and sound." },
      { name: "After Effects", image: "aftereffects.png", description: "Adding motion to graphics and combining visual elements through compositing." },
      { name: "TouchDesigner", image: "touchdesigner.ico", description: "Exploring real-time visuals, generative graphics, and interactive experiences." },
      { name: "Hyperframes", image: "hyperframes.svg", description: "Creating motion graphics and video with HTML, CSS, and code." },
    ],
  },
];

const designLetters = [
  { letter: "D", x: 8, y: 270, rotation: -12, alignedX: 0, width: 190 },
  { letter: "E", x: 180, y: 180, rotation: 9, alignedX: 190, width: 165 },
  { letter: "S", x: 345, y: 320, rotation: -7, alignedX: 355, width: 170 },
  { letter: "I", x: 525, y: 190, rotation: 15, alignedX: 525, width: 95 },
  { letter: "G", x: 625, y: 355, rotation: -11, alignedX: 620, width: 190 },
  { letter: "N", x: 820, y: 260, rotation: 9, alignedX: 810, width: 190 },
];

function DisciplineTitle({ id }) {
  return (
    <span className={`about-column-name about-title-${id}`} aria-hidden="true">
      {id === "development" ? (
        <svg className="about-stylized-title about-code-title" viewBox="0 0 1000 400" focusable="false">
          <text className="about-code-line about-code-line-first" x="0" y="160" textLength="860" lengthAdjust="spacingAndGlyphs"><tspan className="about-code-punctuation">{"</"}</tspan><tspan>devel</tspan></text>
          <text className="about-code-line about-code-line-second" x="65" y="345" textLength="935" lengthAdjust="spacingAndGlyphs"><tspan>opment</tspan><tspan className="about-code-punctuation">{">"}</tspan></text>
        </svg>
      ) : id === "design" ? (
        <svg className="about-stylized-title about-design-title" viewBox="0 0 1000 400" focusable="false">
          {designLetters.map(({ letter, x, y, rotation, alignedX, width }, index) => (
            <g key={letter} className="about-design-position" style={{ "--letter-index": index, "--scatter-x": `${x}px`, "--scatter-y": `${y}px`, "--aligned-x": `${alignedX}px`, "--rotation": `${rotation}deg` }}>
              <text className="about-design-letter" textLength={width} lengthAdjust="spacingAndGlyphs">{letter}</text>
            </g>
          ))}
          <g className="about-design-selection">
            <rect className="about-selection-border" x="-10" y="150" width="1020" height="208" />
            {[[ -10, 150 ], [ 500, 150 ], [ 1010, 150 ], [ -10, 254 ], [ 1010, 254 ], [ -10, 358 ], [ 500, 358 ], [ 1010, 358 ]].map(([x, y]) => (
              <rect key={`${x}-${y}`} className="about-selection-handle" x={x - 6} y={y - 6} width="12" height="12" />
            ))}
          </g>
        </svg>
      ) : (
        <svg className="about-stylized-title about-motion-title" viewBox="0 0 1000 400" focusable="false">
          {[1, 2, 3, 4].map((echo) => (
            <text key={echo} className="about-motion-outline" style={{ "--echo": echo }} x="0" y="387" textLength="1000" lengthAdjust="spacingAndGlyphs">MOTION</text>
          ))}
          <text className="about-motion-fill" x="0" y="387" textLength="1000" lengthAdjust="spacingAndGlyphs">MOTION</text>
        </svg>
      )}
    </span>
  );
}

export default function About() {
  const [activeId, setActiveId] = useState(null);
  const [activeTool, setActiveTool] = useState(null);
  const activeDiscipline = disciplines.find(({ id }) => id === activeId);
  const headline = activeTool?.name || activeDiscipline?.headline || "A little logic. A little imagination.";
  const description = activeTool?.description || activeDiscipline?.description || "I’m Xyrex Kyle Salazar, a web developer and creative based in Bacolod, Philippines. I started web development in 2021 with a background in multimedia arts. As Xyrex Dev, I build web and desktop applications, design visuals, and make things move.";

  const activate = (id) => {
    setActiveId(id);
    setActiveTool(null);
  };
  const deactivate = () => {
    setActiveId(null);
    setActiveTool(null);
  };

  return (
    <section className={`about-triptych ${activeId ? "has-selection" : ""}`} aria-labelledby="about-title" onKeyDown={(event) => {
      if (event.key === "Escape") {
        const trigger = event.currentTarget.querySelector(`[data-discipline="${activeId}"]`);
        trigger?.focus();
        deactivate();
      }
    }}>
      <header className="about-header">
        <span className="about-eyebrow">ABOUT / MY PRACTICE</span>
        <h2 id="about-title">Three ways I create.</h2>
        <span className="about-hint"><span className="about-hover-hint">Hover to explore</span><span className="about-tap-hint">Tap to explore</span><Icon name="arrow-down" size={14} /></span>
      </header>

      <div className="about-columns">
        {disciplines.map((discipline) => {
          const isActive = activeId === discipline.id;
          return (
            <div key={discipline.id} className={`about-column ${isActive ? "is-active" : ""}`} onMouseEnter={() => activate(discipline.id)} onMouseLeave={(event) => {
              if (!event.currentTarget.contains(document.activeElement)) deactivate();
            }} onFocus={() => setActiveId(discipline.id)} onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) deactivate();
            }}>
              <button type="button" className="about-column-trigger" data-discipline={discipline.id} aria-label={discipline.label} aria-expanded={isActive} aria-controls={`tools-${discipline.id}`} onClick={() => activate(discipline.id)}>
                <span className="about-column-meta"><span>{discipline.number}</span><Icon name={discipline.icon} size={20} /></span>
                <DisciplineTitle id={discipline.id} />
              </button>
              <ul id={`tools-${discipline.id}`} aria-label={`${discipline.label} tools`} aria-hidden={!isActive} inert={!isActive} className={`about-tools about-tools-${discipline.id}`}>
                {discipline.tools.map((tool) => (
                  <li key={tool.name}>
                    <button type="button" className={`about-tool ${activeTool?.name === tool.name && isActive ? "is-selected" : ""}`} tabIndex={isActive ? 0 : -1} aria-label={tool.detail ? `${tool.name}: ${tool.detail}` : tool.name} onMouseEnter={() => setActiveTool(tool)} onMouseLeave={(event) => {
                      if (document.activeElement !== event.currentTarget) setActiveTool(null);
                    }} onFocus={() => setActiveTool(tool)} onBlur={() => setActiveTool(null)} onClick={() => setActiveTool(tool)}>
                      <span className={`about-tool-mark ${tool.images ? "about-tool-mark-pair" : ""}`} aria-hidden="true">
                        {(tool.images || [tool.image]).map((image) => <img key={image} src={`/assets/icons/${image}`} alt="" width="30" height="30" loading="lazy" />)}
                      </span>
                      <span className="about-tool-name">{tool.name}</span>
                      {tool.detail && <span className="about-tool-detail">{tool.detail}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="about-caption" role="status" aria-live="polite" aria-atomic="true">
        <span className="about-caption-label">{activeDiscipline ? `${activeDiscipline.number} / ${activeDiscipline.label}` : "THE PERSON BEHIND THE WORK"}</span>
        <div className="about-caption-copy" key={`${activeId}-${activeTool?.name || "intro"}`}>
          <h3>{headline}</h3>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
