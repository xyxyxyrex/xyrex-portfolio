import { act, fireEvent, render, screen, within } from "@testing-library/react";
import Skills from "./Skills";
import { designCategories } from "../data/design";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

test("reveals the heading selection when scrolled into view and resets on leaving", () => {
  const originalObserver = window.IntersectionObserver;
  let onIntersection;
  const disconnect = jest.fn();
  const observe = jest.fn();
  window.IntersectionObserver = jest.fn((callback) => {
    onIntersection = callback;
    return { observe, disconnect };
  });
  try {
    const { unmount } = render(<Skills />);
    const title = screen.getByRole("heading", { name: "Design Projects" });
    expect(observe).toHaveBeenCalledWith(title);
    expect(title).not.toHaveClass("is-selected");
    act(() => onIntersection([{ isIntersecting: true, intersectionRatio: 0.3 }]));
    expect(title).not.toHaveClass("is-selected");
    act(() => onIntersection([{ isIntersecting: true, intersectionRatio: 0.8 }]));
    expect(title).toHaveClass("is-selected");
    expect(title.querySelectorAll(".design-heading-handle")).toHaveLength(8);
    act(() => onIntersection([{ isIntersecting: false, intersectionRatio: 0 }]));
    expect(title).not.toHaveClass("is-selected");
    act(() => onIntersection([{ isIntersecting: true, intersectionRatio: 1 }]));
    expect(title).toHaveClass("is-selected");
    unmount();
    expect(disconnect).toHaveBeenCalled();
  } finally {
    window.IntersectionObserver = originalObserver;
  }
});

test("groups the posters by mood and renders one responsive preview per artwork", () => {
  render(<Skills />);
  expect(screen.getByRole("heading", { name: "Design Projects" })).toBeInTheDocument();
  const paper = screen.getByRole("region", { name: /Paper & form/ });
  ["BLANC", "Midsommar", "The Ruins", "Bauhaus"].forEach((title) => {
    expect(within(paper).getByRole("button", { name: `View ${title}` })).toBeInTheDocument();
  });
  const noise = screen.getByRole("region", { name: /Noise & sound/ });
  expect(within(noise).getAllByRole("button", { name: /^View / })).toHaveLength(4);
  const images = screen.getAllByRole("img");
  const posters = designCategories[0].groups.flatMap((group) => group.works);
  expect(images).toHaveLength(posters.length);
  posters.forEach((work) => {
    const image = screen.getByRole("img", { name: work.alt });
    expect(image.getAttribute("src")).toMatch(/optimized\/.+-400\.webp$/);
    expect(image).toHaveAttribute("srcset", expect.stringContaining("800w"));
    expect(image).toHaveAttribute("sizes");
    expect(image).toHaveAttribute("width", String(work.width));
    expect(image).toHaveAttribute("height", String(work.height));
    expect(image).toHaveAttribute("loading", "lazy");
  });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("includes all 14 new images in their visual groups and preserves square artwork", () => {
  render(<Skills />);
  const groups = {
    "Quiet details": ["Camera", "Middle", "Kataomoi", "Mirror"],
    "Noise & sound": ["Russian Roulette", "Obsession"],
    "Green frequencies": ["Fade", "Ouroborus", "Cyberpunk"],
    "Cold light": ["Glass", "08"],
    "Dark fragments": ["Prisms", "Past Wont Leave My Bed", "Poetic Justice"],
  };
  Object.entries(groups).forEach(([group, titles]) => {
    const region = screen.getByRole("region", { name: new RegExp(group) });
    titles.forEach((title) => expect(within(region).getByRole("button", { name: `View ${title}` })).toBeInTheDocument());
  });
  expect(screen.getAllByRole("img")).toHaveLength(22);
  ["Mirror", "Cyberpunk"].forEach((title) => {
    const image = within(screen.getByRole("button", { name: `View ${title}` })).getByRole("img");
    expect(image.getAttribute("width")).toBe(image.getAttribute("height"));
  });
  fireEvent.click(screen.getByRole("button", { name: "View Cyberpunk" }));
  const viewer = screen.getByRole("dialog", { name: "Cyberpunk" });
  expect(within(viewer).getByRole("img")).toHaveAttribute("src", expect.stringContaining("cyberpunk-viewer.webp"));
  fireEvent.keyDown(viewer, { key: "ArrowRight" });
  expect(within(viewer).getByRole("heading", { name: "Glass" })).toBeInTheDocument();
});

test("filters disciplines and supports arrow-key and Home tab navigation", () => {
  render(<Skills />);
  fireEvent.click(screen.getByRole("tab", { name: "Composites" }));
  expect(screen.getByRole("tab", { name: "Composites" })).toHaveAttribute("aria-selected", "true");
  expect(screen.getAllByRole("img")).toHaveLength(4);
  expect(screen.getByRole("region", { name: /After dark/ })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "View BLANC" })).not.toBeInTheDocument();
  fireEvent.keyDown(screen.getByRole("tab", { name: "Composites" }), { key: "ArrowRight" });
  expect(screen.getByRole("tab", { name: "Interfaces" })).toHaveFocus();
  expect(screen.getByRole("tabpanel", { name: "Interfaces" })).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(4);
  fireEvent.keyDown(screen.getByRole("tab", { name: "Interfaces" }), { key: "Home" });
  expect(screen.getByRole("tab", { name: "Posters" })).toHaveFocus();
  expect(screen.getAllByRole("img")).toHaveLength(designCategories[0].groups.flatMap((group) => group.works).length);
});

test("loads a large copy only after opening, navigates artwork, and restores focus on close", () => {
  const { container } = render(<Skills />);
  expect(container.querySelector('img[src$="-viewer.webp"]')).not.toBeInTheDocument();
  const trigger = screen.getByRole("button", { name: "View BLANC" });
  fireEvent.click(trigger);
  const viewer = screen.getByRole("dialog", { name: "BLANC" });
  expect(within(viewer).getByRole("img")).toHaveAttribute("src", designCategories[0].groups[0].works[0].viewer);
  expect(within(viewer).getByRole("img")).not.toHaveAttribute("srcset");
  fireEvent.keyDown(viewer, { key: "ArrowRight" });
  expect(within(viewer).getByRole("heading", { name: "Midsommar" })).toBeInTheDocument();
  fireEvent.click(within(viewer).getByRole("button", { name: "Previous artwork" }));
  expect(within(viewer).getByRole("heading", { name: "BLANC" })).toBeInTheDocument();
  fireEvent(viewer, new Event("cancel", { cancelable: true }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(container.querySelector('img[src$="-viewer.webp"]')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

test("keeps captions, controls, and the portfolio link available if a preview fails", () => {
  render(<Skills />);
  const trigger = screen.getByRole("button", { name: "View BLANC" });
  fireEvent.error(within(trigger).getByRole("img"));
  expect(within(trigger).getByText(/Preview unavailable/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /View full portfolio/i })).toHaveAttribute("href", expect.stringContaining("drive.google.com"));
  fireEvent.click(trigger);
  expect(within(screen.getByRole("dialog", { name: "BLANC" })).getByRole("img")).toHaveAttribute("src", expect.stringContaining("blanc-viewer.webp"));
});
