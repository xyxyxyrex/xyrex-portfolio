import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Icon from "../Components/Icon";
import { projects } from "../data/projects";
import "./Projects.css";

const PREVIEW_DELAY = 700;
const CARD_DURATION = 360;
const CARD_STAGGER = 32;
const ENTER_LEAD = 80;
const TRANSITION_TIMEOUT = ENTER_LEAD + 4 * CARD_STAGGER + CARD_DURATION + 80;
const RETURN_DURATION = 300;
const RETURN_STAGGER = 16;
const EXIT_TIMEOUT = ENTER_LEAD + (projects.length - 1) * RETURN_STAGGER + RETURN_DURATION + 80;
const prefersReducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
const panelStyle = (area, order) => ({ gridArea: area, "--card-order": order, "--cell-enter-delay": `${ENTER_LEAD + order * CARD_STAGGER + 80}ms` });

function TypedText({ text, delay = 0, duration = 360 }) {
  const characters = Array.from(text);
  return (
    <span className="project-typing">
      <span className="project-text-accessible">{text}</span>
      <span aria-hidden="true">{characters.map((character, index) => (
        <span key={index} className="project-typing-character" style={{ "--character-delay": `${delay + index / characters.length * duration}ms` }}>{character}</span>
      ))}</span>
    </span>
  );
}

function ProjectImage({ image, className = "", loading = "lazy" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="project-image-error">This preview is unavailable. You can still explore the project through its links.</span>;
  return <img className={className} src={image.src} alt={image.label} loading={loading} decoding="async" onError={() => setFailed(true)} />;
}

function SignTitle({ project }) {
  return (
    <span className={`sign-identity sign-identity-${project.id}`}>
      {project.id === "parity" && <span className="sign-equals" aria-hidden="true"><i /><i /></span>}
      {project.logo && <img className="sign-logo" src={`/assets/projects/${project.logo}`} alt="" width="48" height="48" loading="lazy" decoding="async" />}
      <span className="sign-wordmark">{project.id === "caltris" ? <><span className="sign-title-accent">CAL</span>TRIS</> : project.displayTitle || project.title}</span>
      {project.id === "lune" && <span className="sign-orbit" aria-hidden="true"><i /><i /><i /><i /><i /></span>}
    </span>
  );
}

export default function Projects() {
  const [activeId, setActiveId] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [previewId, setPreviewId] = useState(null);
  const [transition, setTransition] = useState(null);
  const isTransitioning = transition !== null;
  const sectionRef = useRef(null);
  const boardRef = useRef(null);
  const headingRef = useRef(null);
  const dialogRef = useRef(null);
  const lastProject = useRef(null);
  const navigated = useRef(false);
  const previewTimer = useRef(null);
  const transitionTimer = useRef(null);
  const focusOnOpen = useRef(false);
  const project = projects.find(({ id }) => id === activeId);
  const image = project?.images[imageIndex];

  useLayoutEffect(() => {
    if (!navigated.current || (activeId && transition !== "exit" && !focusOnOpen.current)) return;
    const target = activeId ? (isTransitioning ? boardRef.current : headingRef.current) : sectionRef.current?.querySelector(`[data-project="${lastProject.current}"]`);
    target?.focus({ preventScroll: true });
  }, [activeId, isTransitioning, transition]);

  useEffect(() => () => {
    clearTimeout(previewTimer.current);
    clearTimeout(transitionTimer.current);
  }, []);

  useEffect(() => {
    if (!transition) return;
    // Safety completion if animation events are suppressed or motion preferences change.
    transitionTimer.current = setTimeout(() => {
      if (transition === "exit") setActiveId(null);
      setTransition(null);
    }, transition === "exit" ? EXIT_TIMEOUT : TRANSITION_TIMEOUT);
    return () => clearTimeout(transitionTimer.current);
  }, [transition]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (expanded && !dialog.open) dialog.showModal();
    if (!expanded && dialog.open) dialog.close();
  }, [expanded]);

  const cancelPreview = () => {
    clearTimeout(previewTimer.current);
    setPreviewId(null);
  };
  const openProject = (id, fromHover = false) => {
    if (activeId) return;
    cancelPreview();
    navigated.current = true;
    focusOnOpen.current = !fromHover;
    lastProject.current = id;
    setImageIndex(0);
    setTransition(prefersReducedMotion() ? null : "enter");
    setActiveId(id);
  };
  const closeProject = ({ restoreFocus = true } = {}) => {
    cancelPreview();
    if (!activeId) return;
    navigated.current = restoreFocus;
    if (transition === "exit") return;
    clearTimeout(transitionTimer.current);
    setExpanded(false);
    if (prefersReducedMotion()) {
      setTransition(null);
      setActiveId(null);
      return;
    }
    if (transition === "enter") {
      // Read once before writing: interrupted slides reverse from their actual
      // compositor positions without layout measurements or a per-frame loop.
      const positions = Array.from(boardRef.current.querySelectorAll(".project-sign, .project-cell"), (card) => ({
        card, transform: window.getComputedStyle(card).transform || "none",
      }));
      positions.forEach(({ card, transform }) => card.style.setProperty("--reverse-start", transform));
    }
    setTransition("exit");
  };
  const finishTransition = (phase) => {
    if (transition !== phase) return;
    clearTimeout(transitionTimer.current);
    if (phase === "exit") setActiveId(null);
    setTransition(null);
  };
  const queuePreview = (id) => {
    if (activeId) return;
    clearTimeout(previewTimer.current);
    setPreviewId(id);
    // Animation completion normally opens the preview. Keep a fallback for
    // disabled animations, with the exact hover delay for reduced motion.
    previewTimer.current = setTimeout(() => openProject(id, true), PREVIEW_DELAY + (prefersReducedMotion() ? 0 : 100));
  };
  const moveImage = (step) => {
    if (project) setImageIndex((current) => (current + step + project.images.length) % project.images.length);
  };

  return (
    <section className="code-projects" style={{ "--project-hover-duration": `${PREVIEW_DELAY}ms`, "--project-card-duration": `${CARD_DURATION}ms`, "--project-card-step": `${CARD_STAGGER}ms`, "--project-enter-lead": `${ENTER_LEAD}ms`, "--project-return-duration": `${RETURN_DURATION}ms`, "--project-return-step": `${RETURN_STAGGER}ms`, "--project-last-sign": projects.length - 1 }} ref={sectionRef} aria-labelledby="code-projects-title" onKeyDown={(event) => {
      if (event.key === "Escape" && activeId && !expanded) {
        event.preventDefault();
        closeProject();
      }
    }}>
      <header className="code-header">
        <div className="code-section-label"><span>CODE / SELECTED WORK</span><span>{String(projects.length).padStart(2, "0")} PROJECTS</span></div>
        <div className="code-title-row">
          <h2 id="code-projects-title">&lt;/projects&gt;</h2>
          {project ? <button type="button" className="code-back" onClick={() => closeProject()}><Icon name="arrow-left" size={17} /> All projects</button> : <p>A few things I’ve built.<br /><span>Hover to explore. Tap on mobile.</span></p>}
        </div>
      </header>

      <div className="project-board-shell" ref={boardRef} role="group" aria-label="Project preview" aria-busy={isTransitioning} tabIndex={-1} onMouseLeave={(event) => {
        cancelPreview();
        if (activeId && !expanded) {
          closeProject({ restoreFocus: event.currentTarget.contains(document.activeElement) });
        }
      }}>
      {(!project || isTransitioning) && (
        <div className={`project-board project-directory${transition === "enter" ? " is-leaving" : transition === "exit" ? " is-returning" : ""}`} aria-label="Project directory" aria-hidden={!!project} inert={!!project}>
          {projects.map((item, index) => (
            <div className="project-sign-slot" key={item.id} style={{ gridArea: item.id, "--card-order": index }}>
            <button type="button" data-project={item.id} aria-label={`Open ${item.title}`} className={`project-sign project-sign-${item.id}${activeId === item.id ? " is-current" : ""}`} style={{ "--brand-bg": item.background, "--brand-fg": item.foreground, "--brand-accent": item.accent, "--brand-secondary": item.secondary }} onMouseEnter={() => queuePreview(item.id)} onMouseLeave={cancelPreview} onClick={() => openProject(item.id)} onAnimationEnd={(event) => {
              if (index === 0 && event.target === event.currentTarget && event.animationName === "code-project-sign-return") finishTransition("exit");
            }}>
              {previewId === item.id && <span className="sign-hover-sweep" aria-hidden="true" onAnimationEnd={() => {
                if (previewId === item.id) openProject(item.id, true);
              }} />}
              <span className="sign-meta"><span>{String(index + 1).padStart(2, "0")} / {item.category.split(" / ")[0]}</span><Icon name="arrow-up-right" size={18} /></span>
              <SignTitle project={item} />
              <span className="sign-footer"><span>{item.tagline}</span>{item.id === "parity" && <span className="sign-favorite">Personal favorite</span>}</span>
            </button>
            </div>
          ))}
        </div>
      )}
      {project && (
        <div key={project.id} className={`project-board project-detail${transition === "enter" ? " is-entering" : transition === "exit" ? " is-leaving" : ""}`} style={{ "--brand-bg": project.background, "--brand-fg": project.foreground, "--brand-accent": project.accent, "--brand-secondary": project.secondary }} aria-label={`${project.title} project details`} aria-hidden={isTransitioning} inert={isTransitioning}>
          <div className="project-cell-slot" style={panelStyle("hero", 0)}>
          <figure className={`project-cell project-main-media ${image.kind === "Artwork" ? "is-artwork" : ""}`}>
            <button type="button" className="project-media-stage" aria-label={`Enlarge ${image.label}`} onClick={() => setExpanded(true)}>
              <ProjectImage key={image.src} image={image} className="project-media-image" loading="eager" />
              <span className="project-expand"><Icon name="expand" size={16} /></span>
            </button>
            <figcaption><span>{image.label}</span><span>{image.kind} / {String(imageIndex + 1).padStart(2, "0")}</span></figcaption>
          </figure>
          </div>

          <div className="project-cell-slot" style={panelStyle("overview", 1)}>
          <article className="project-cell project-overview">
            <span className="project-cell-label"><TypedText text={project.category} duration={120} /></span>
            <h3 ref={headingRef} tabIndex={-1}><TypedText text={project.title} delay={30} duration={140} /></h3>
            {project.note && <p className="project-personal-note"><TypedText text={project.note} delay={90} duration={180} /></p>}
            <p className="project-description"><TypedText text={project.description} delay={120} duration={400} /></p>
            <ul className="project-features">{project.features.map((feature, index) => <li key={feature}><TypedText text={feature} delay={300 + index * 65} duration={180} /></li>)}</ul>
          </article>
          </div>

          <div className="project-cell-slot" style={panelStyle("gallery", 2)}>
          <div className="project-cell project-gallery">
            <div className="project-cell-heading"><span className="project-cell-label">{project.images[0].kind === "Artwork" ? "Project artwork" : "A closer look"}</span><span className="project-cell-label">{String(imageIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}</span></div>
            <div className="project-thumbnails" aria-label={`${project.title} previews`}>
              {project.images.map((preview, index) => (
                <button key={preview.src} type="button" className={`project-thumbnail ${preview.kind === "Artwork" ? "is-artwork" : ""}`} aria-label={`Show ${preview.label}`} aria-pressed={index === imageIndex} onMouseEnter={() => setImageIndex(index)} onFocus={() => setImageIndex(index)} onClick={() => setImageIndex(index)}>
                  <ProjectImage image={preview} />
                  <span>{String(index + 1).padStart(2, "0")} / {preview.label}</span>
                </button>
              ))}
            </div>
          </div>
          </div>

          <div className="project-cell-slot" style={panelStyle("stack", 3)}>
          <div className="project-cell project-stack"><span className="project-cell-label">Built with</span><ul>{project.stack.map((tech, index) => <li key={tech}><TypedText text={tech} delay={100 + index * 45} duration={160} /></li>)}</ul></div>
          </div>
          <div className="project-cell-slot" style={panelStyle("links", 4)}>
          <div className="project-cell project-links" onAnimationEnd={(event) => {
            if (event.target === event.currentTarget && event.animationName === "code-project-card-in") finishTransition("enter");
          }}>
            <span className="project-cell-label">Explore {project.title}</span>
            {project.website && <a href={project.website} target="_blank" rel="noopener noreferrer">Visit website <Icon name="arrow-up-right" size={16} /></a>}
            {project.releases && <a href={project.releases} target="_blank" rel="noopener noreferrer">Desktop releases <Icon name="arrow-up-right" size={16} /></a>}
            {!project.privateSource && <a href={project.github} target="_blank" rel="noopener noreferrer">View on GitHub <Icon name="arrow-up-right" size={16} /></a>}
            {project.privateSource && <span className="project-private-note">Application source is private.</span>}
          </div>
          </div>
        </div>
      )}
      </div>
      <footer className="code-footer"><span>{project ? "ESC TO RETURN / SELECT A PREVIEW TO EXPLORE" : "A PROJECT DIRECTORY / WEB, MOBILE & DESKTOP"}</span><span>{project ? project.title : "DESIGNED & BUILT BY XYREX"}</span></footer>

      <dialog className="project-lightbox" ref={dialogRef} aria-label={`${project?.title || "Project"} image viewer`} onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)} onClick={(event) => { if (event.target === event.currentTarget) setExpanded(false); }} onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); moveImage(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); moveImage(-1); }
      }}>
        {image && <div className="project-lightbox-inner">
          <div className="project-lightbox-toolbar"><span>{project.title} / {image.label}</span><button type="button" aria-label="Close image viewer" onClick={() => setExpanded(false)}><Icon name="close" size={22} /></button></div>
          <div className={`project-lightbox-stage ${image.kind === "Artwork" ? "is-artwork" : ""}`}><ProjectImage key={image.src} image={image} loading="eager" /></div>
          {project.images.length > 1 && <div className="project-lightbox-controls"><button type="button" onClick={() => moveImage(-1)} aria-label="Previous image"><Icon name="arrow-left" size={20} /></button><span>{imageIndex + 1} / {project.images.length}</span><button type="button" onClick={() => moveImage(1)} aria-label="Next image"><Icon name="arrow-right" size={20} /></button></div>}
        </div>}
      </dialog>
    </section>
  );
}
