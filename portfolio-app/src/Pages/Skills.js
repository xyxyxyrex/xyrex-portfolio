import { useEffect, useRef, useState } from "react";
import Icon from "../Components/Icon";
import { designCategories } from "../data/design";
import "./Skills.css";

const PORTFOLIO_URL = "https://drive.google.com/drive/folders/1mg1usUSq29rV00za4jLQhAkAqXmmBWvR?usp=sharing";

function Artwork({ work, enlarged = false, sizes }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="design-image-error">Preview unavailable. Explore this work in the full portfolio.</span>;
  return (
    <img
      src={enlarged ? work.viewer : work.variants[0].src}
      srcSet={enlarged ? undefined : work.variants.map(({ src, width }) => `${src} ${width}w`).join(", ")}
      sizes={enlarged ? undefined : sizes}
      width={work.width}
      height={work.height}
      alt={work.alt}
      loading={enlarged ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export default function Skills() {
  const [categoryId, setCategoryId] = useState("posters");
  const [selectedId, setSelectedId] = useState(null);
  const [isTitleSelected, setIsTitleSelected] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const dialogRef = useRef(null);
  const lastTrigger = useRef(null);
  const category = designCategories.find(({ id }) => id === categoryId);
  const works = category.groups.flatMap((group) => group.works);
  const selectedIndex = works.findIndex(({ id }) => id === selectedId);
  const selected = works[selectedIndex];

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setIsTitleSelected(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIsTitleSelected(entry.isIntersecting && entry.intersectionRatio >= 0.6);
    }, {
      root: document.querySelector("[data-scroll-container]"),
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.6,
    });
    observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedId && !dialog.open) dialog.showModal();
    if (!selectedId && dialog.open) dialog.close();
  }, [selectedId]);

  const closeViewer = () => setSelectedId(null);
  const move = (step) => setSelectedId(works[(selectedIndex + step + works.length) % works.length].id);
  const selectCategory = (id) => {
    setSelectedId(null);
    setCategoryId(id);
  };
  const onTabKeyDown = (event, index) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % designCategories.length;
    if (event.key === "ArrowLeft") next = (index + designCategories.length - 1) % designCategories.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = designCategories.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    const id = designCategories[next].id;
    selectCategory(id);
    sectionRef.current.querySelector(`#design-tab-${id}`).focus();
  };

  return (
    <section className="design-projects" ref={sectionRef} aria-labelledby="design-projects-title">
      <header className="design-header">
        <div className="design-eyebrow"><span>DESIGN / SELECTED WORK</span><span>04</span></div>
        <div className="design-title-row">
          <h2 id="design-projects-title" ref={titleRef} className={isTitleSelected ? "is-selected" : undefined}>
            <span className="design-heading-text">Design Projects
              <span className="design-heading-selection" aria-hidden="true">
                {["top-left", "top-center", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-center", "bottom-right"].map((position) => <span key={position} className={`design-heading-handle ${position}`} />)}
              </span>
            </span>
          </h2>
          <div className="design-filters" role="tablist" aria-label="Design disciplines">
            {designCategories.map((item, index) => (
              <button key={item.id} type="button" role="tab" id={`design-tab-${item.id}`} aria-selected={item.id === categoryId} aria-controls="design-gallery-panel" tabIndex={item.id === categoryId ? 0 : -1} onClick={() => selectCategory(item.id)} onKeyDown={(event) => onTabKeyDown(event, index)}>{item.label}</button>
            ))}
          </div>
        </div>
      </header>

      <div id="design-gallery-panel" role="tabpanel" aria-labelledby={`design-tab-${categoryId}`} tabIndex={0}>
        {category.groups.map((group, groupIndex) => (
          <section className="design-group" key={group.id} aria-labelledby={`design-group-${group.id}`}>
            <div className="design-group-heading">
              <h3 id={`design-group-${group.id}`}><span>{String(groupIndex + 1).padStart(2, "0")} /</span> {group.title}</h3>
              <p>{group.mood}</p>
            </div>
            <div className={`design-wall design-wall-${categoryId}`} data-count={group.works.length}>
              {group.works.map((work, index) => {
                const number = works.findIndex(({ id }) => id === work.id) + 1;
                const sizes = categoryId === "posters"
                  ? index === 0
                    ? `(max-width: 650px) calc((100vw - 58px) / 2), (max-width: 950px) 46vw, ${group.works.length === 3 ? "35vw" : "30vw"}`
                    : `(max-width: 650px) calc((100vw - 58px) / 2), (max-width: 950px) 46vw, ${group.works.length === 3 ? "30vw" : "23vw"}`
                  : "(max-width: 650px) 90vw, 46vw";
                return (
                  <figure className="design-sheet" key={work.id}>
                    <button className="design-artwork" type="button" aria-label={`View ${work.title}`} style={{ aspectRatio: `${work.width} / ${work.height}` }} onClick={(event) => {
                      lastTrigger.current = event.currentTarget;
                      setSelectedId(work.id);
                    }}>
                      <Artwork work={work} sizes={sizes} />
                      <span className="design-sheet-open" aria-hidden="true"><Icon name="arrow-up-right" size={20} /></span>
                    </button>
                    <figcaption><span>{String(number).padStart(2, "0")} / {work.title}</span><span>{work.medium}</span></figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <footer className="design-footer"><span>{String(works.length).padStart(2, "0")} WORKS / {category.label.toUpperCase()}</span><a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">View full portfolio <Icon name="arrow-up-right" size={14} /></a></footer>

      <dialog className="design-viewer" ref={dialogRef} aria-label="Design artwork viewer" aria-labelledby={selected ? "design-viewer-title" : undefined} onCancel={(event) => { event.preventDefault(); closeViewer(); }} onClose={() => {
        setSelectedId(null);
        lastTrigger.current?.focus({ preventScroll: true });
      }} onClick={(event) => { if (event.target === event.currentTarget) closeViewer(); }} onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      }}>
        {selected && <div className="design-viewer-content">
          <header className="design-viewer-header"><div><span>{selected.medium}</span><h3 id="design-viewer-title">{selected.title}</h3></div><button type="button" className="design-viewer-close" aria-label="Close artwork viewer" onClick={closeViewer}><Icon name="close" size={22} /></button></header>
          <div className="design-viewer-stage"><Artwork key={selected.id} work={selected} enlarged /></div>
          <footer className="design-viewer-controls"><button type="button" aria-label="Previous artwork" onClick={() => move(-1)}><Icon name="arrow-left" size={20} /></button><span>{String(selectedIndex + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}</span><button type="button" aria-label="Next artwork" onClick={() => move(1)}><Icon name="arrow-right" size={20} /></button></footer>
        </div>}
      </dialog>
    </section>
  );
}
