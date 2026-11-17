import { act, fireEvent, render, screen, within } from "@testing-library/react";
import Projects from "./Projects";
import { projects } from "../data/projects";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

afterEach(() => { jest.useRealTimers(); });

function animationEnd(element, name) {
  const event = new Event("animationend", { bubbles: true });
  Object.defineProperty(event, "animationName", { value: name });
  fireEvent(element, event);
}

function finishSlide() {
  animationEnd(document.querySelector(".project-detail .project-links"), "code-project-card-in");
}

function finishExit() {
  animationEnd(document.querySelector(".project-directory [data-project='parity']"), "code-project-sign-return");
}

function openAndFinish(title) {
  fireEvent.click(screen.getByRole("button", { name: `Open ${title}` }));
  finishSlide();
}

test("sweeps first, overlaps the staggered grids, then reveals details without moving focus", () => {
  jest.useFakeTimers();
  const { container } = render(<Projects />);
  const shell = container.querySelector(".project-board-shell");
  fireEvent.mouseEnter(screen.getByRole("button", { name: "Open Parity" }));
  expect(shell.closest(".code-projects")).toHaveStyle("--project-hover-duration: 700ms");
  const sweep = container.querySelector(".sign-hover-sweep");
  expect(sweep).toBeInTheDocument();
  act(() => { jest.advanceTimersByTime(699); });
  expect(screen.queryByRole("heading", { name: "Parity" })).not.toBeInTheDocument();
  act(() => { jest.advanceTimersByTime(1); });
  expect(screen.queryByRole("heading", { name: "Parity" })).not.toBeInTheDocument();
  fireEvent.animationEnd(sweep);
  const details = container.querySelector(".project-detail");
  expect(shell).toHaveAttribute("aria-busy", "true");
  expect(container.querySelector(".project-directory")).toHaveClass("is-leaving");
  expect(details).toHaveClass("is-entering");
  expect(details).toHaveAttribute("inert");
  expect(container.querySelectorAll(".project-sign-slot")).toHaveLength(projects.length);
  expect(details.querySelectorAll(".project-cell-slot")).toHaveLength(5);
  expect(screen.queryByRole("heading", { name: "Parity" })).not.toBeInTheDocument();
  fireEvent.animationEnd(details.querySelector(".project-links > span"));
  expect(shell).toHaveAttribute("aria-busy", "true");
  finishSlide();
  expect(shell).toHaveAttribute("aria-busy", "false");
  expect(container.querySelector(".project-directory")).not.toBeInTheDocument();
  expect(container.querySelector(".project-detail")).toBe(details);
  expect(details).not.toHaveAttribute("inert");
  expect(screen.getByRole("heading", { name: "Parity" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Parity" })).not.toHaveFocus();
  expect(container.querySelector(".project-board-shell")).toBe(shell);
  fireEvent.mouseLeave(shell, { relatedTarget: screen.getByRole("heading", { name: "</projects>" }) });
  expect(shell).toHaveAttribute("aria-busy", "true");
  expect(container.querySelector(".project-detail")).toBe(details);
  expect(details).toHaveClass("is-leaving");
  expect(container.querySelector(".project-directory")).toHaveClass("is-returning");
  // Late entry events must not finish the newly started exit phase.
  finishSlide();
  animationEnd(container.querySelector("[data-project='parity']"), "code-project-card-out");
  expect(shell).toHaveAttribute("aria-busy", "true");
  finishExit();
  expect(container.querySelector(".project-detail")).not.toBeInTheDocument();
  expect(screen.getAllByRole("button", { name: /^Open / })).toHaveLength(projects.length);
  expect(container.querySelector(".project-board-shell")).toBe(shell);
});

test("closes focused details when leaving the grid and restores focus to its sign", () => {
  const { container } = render(<Projects />);
  openAndFinish("Parity");
  expect(screen.getByRole("heading", { name: "Parity" })).toHaveFocus();
  fireEvent.mouseLeave(container.querySelector(".project-board-shell"), {
    relatedTarget: screen.getByRole("heading", { name: "</projects>" }),
  });
  expect(screen.queryByRole("heading", { name: "Parity" })).not.toBeInTheDocument();
  expect(container.querySelector(".project-board-shell")).toHaveFocus();
  finishExit();
  expect(screen.getByRole("button", { name: "Open Parity" })).toHaveFocus();
});

test("leaving during a slide cancels it without reopening an old project", () => {
  jest.useFakeTimers();
  const { container } = render(<Projects />);
  const shell = container.querySelector(".project-board-shell");
  fireEvent.mouseEnter(screen.getByRole("button", { name: "Open Parity" }));
  fireEvent.animationEnd(container.querySelector(".sign-hover-sweep"));
  expect(shell).toHaveAttribute("aria-busy", "true");
  fireEvent.mouseLeave(shell);
  act(() => { jest.advanceTimersByTime(1000); });
  expect(shell).toHaveAttribute("aria-busy", "false");
  expect(container.querySelector(".project-detail")).not.toBeInTheDocument();
  expect(screen.getAllByRole("button", { name: /^Open / })).toHaveLength(projects.length);
  fireEvent.mouseEnter(screen.getByRole("button", { name: "Open Caltris" }));
  fireEvent.animationEnd(container.querySelector(".sign-hover-sweep"));
  finishSlide();
  expect(screen.getByRole("heading", { name: "Caltris" })).toBeInTheDocument();
});

test("supports Escape during entry and completes if animation events are unavailable", () => {
  jest.useFakeTimers();
  render(<Projects />);
  const shell = screen.getByRole("group", { name: "Project preview" });
  fireEvent.click(screen.getByRole("button", { name: "Open Parity" }));
  expect(shell).toHaveFocus();
  fireEvent.keyDown(shell, { key: "Escape" });
  expect(shell).toHaveAttribute("aria-busy", "true");
  act(() => { jest.advanceTimersByTime(1000); });
  expect(screen.getByRole("button", { name: "Open Parity" })).toHaveFocus();
  expect(screen.queryByRole("heading", { name: "Parity" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Open lune" }));
  expect(shell).toHaveAttribute("aria-busy", "true");
  act(() => { jest.advanceTimersByTime(1000); });
  expect(shell).toHaveAttribute("aria-busy", "false");
  expect(screen.getByRole("heading", { name: "lune" })).toHaveFocus();
});

test("reverses interrupted entry from current positions and ignores hover until exit completes", () => {
  jest.useFakeTimers();
  const { container } = render(<Projects />);
  const shell = container.querySelector(".project-board-shell");
  fireEvent.click(screen.getByRole("button", { name: "Open Parity" }));
  const sign = container.querySelector("[data-project='parity']");
  const panel = container.querySelector(".project-main-media");
  const originalGetStyle = window.getComputedStyle;
  const styleSpy = jest.spyOn(window, "getComputedStyle").mockImplementation((element, ...args) => {
    if (element === sign) return { transform: "matrix(1, 0, 0, 1, 0, -30)" };
    if (element === panel) return { transform: "matrix(1, 0, 0, 1, 0, 75)" };
    return originalGetStyle.call(window, element, ...args);
  });
  try {
    fireEvent.mouseLeave(shell);
  } finally {
    styleSpy.mockRestore();
  }
  expect(sign.style.getPropertyValue("--reverse-start")).toBe("matrix(1, 0, 0, 1, 0, -30)");
  expect(panel.style.getPropertyValue("--reverse-start")).toBe("matrix(1, 0, 0, 1, 0, 75)");
  expect(container.querySelector(".project-detail")).toHaveClass("is-leaving");
  fireEvent.mouseEnter(container.querySelector("[data-project='caltris']"));
  expect(container.querySelector(".sign-hover-sweep")).not.toBeInTheDocument();
  act(() => { jest.advanceTimersByTime(400); });
  expect(shell).toHaveAttribute("aria-busy", "true");
  act(() => { jest.advanceTimersByTime(1000); });
  expect(shell).toHaveAttribute("aria-busy", "false");
  expect(container.querySelector(".project-detail")).not.toBeInTheDocument();
  expect(screen.getAllByRole("button", { name: /^Open / })).toHaveLength(projects.length);
  openAndFinish("Caltris");
  expect(screen.getByRole("heading", { name: "Caltris" })).toHaveFocus();
});

test("cancels previews when the pointer passes over a sign briefly", () => {
  jest.useFakeTimers();
  render(<Projects />);
  const sign = screen.getByRole("button", { name: "Open CareFind" });
  fireEvent.mouseEnter(sign);
  act(() => { jest.advanceTimersByTime(100); });
  fireEvent.mouseLeave(sign);
  expect(sign.querySelector(".sign-hover-sweep")).not.toBeInTheDocument();
  act(() => { jest.advanceTimersByTime(1000); });
  expect(screen.queryByRole("heading", { name: "CareFind" })).not.toBeInTheDocument();
  expect(screen.getAllByRole("button", { name: /^Open / })).toHaveLength(projects.length);
});

test("reduced motion retains the 700 ms delay and supports cancellation", () => {
  jest.useFakeTimers();
  const originalMatchMedia = window.matchMedia;
  window.matchMedia = () => ({ matches: true });
  try {
    render(<Projects />);
    const sign = screen.getByRole("button", { name: "Open Caltris" });
    fireEvent.mouseEnter(sign);
    act(() => { jest.advanceTimersByTime(400); });
    fireEvent.mouseLeave(sign);
    act(() => { jest.advanceTimersByTime(700); });
    expect(screen.queryByRole("heading", { name: "Caltris" })).not.toBeInTheDocument();
    fireEvent.mouseEnter(sign);
    act(() => { jest.advanceTimersByTime(699); });
    expect(screen.queryByRole("heading", { name: "Caltris" })).not.toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(1); });
    expect(screen.getByRole("heading", { name: "Caltris" })).toBeInTheDocument();
    expect(document.querySelector(".project-directory.is-leaving")).not.toBeInTheDocument();
    expect(document.querySelector(".project-detail.is-entering")).not.toBeInTheDocument();
    fireEvent.mouseLeave(document.querySelector(".project-board-shell"));
    expect(screen.getAllByRole("button", { name: /^Open / })).toHaveLength(projects.length);
    expect(document.querySelector(".project-directory.is-returning")).not.toBeInTheDocument();
  } finally {
    window.matchMedia = originalMatchMedia;
  }
});

test("replaces the directory with a project and restores focus when returning", () => {
  render(<Projects />);
  expect(screen.getAllByRole("button", { name: /^Open / })).toHaveLength(projects.length);
  openAndFinish("Parity");
  expect(screen.queryByRole("button", { name: "Open lune" })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Parity" })).toHaveFocus();
  expect(screen.getByText("The project I’m most proud of.")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Desktop releases/ })).toHaveAttribute("href", "https://github.com/xyxyxyrex/parity-releases/releases/latest");
  expect(screen.queryByRole("link", { name: "View on GitHub" })).not.toBeInTheDocument();

  fireEvent.mouseEnter(screen.getByRole("button", { name: "Show Crawl investigation" }));
  expect(within(screen.getByRole("button", { name: "Enlarge Crawl investigation" })).getByRole("img")).toHaveAttribute("src", "/assets/projects/parity-crawl.png");
  fireEvent.keyDown(screen.getByRole("button", { name: "Show Crawl investigation" }), { key: "Escape" });
  finishExit();
  expect(screen.getByRole("button", { name: "Open Parity" })).toHaveFocus();
  expect(screen.getAllByRole("button", { name: /^Open / })).toHaveLength(projects.length);
});

test("every project has working details, a preview, and a path back", () => {
  render(<Projects />);
  projects.forEach((project) => {
    openAndFinish(project.title);
    expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
    const stage = screen.getByRole("button", { name: `Enlarge ${project.images[0].label}` });
    expect(within(stage).getByRole("img")).toHaveAttribute("src", project.images[0].src);
    expect(screen.getByText(project.description)).toBeInTheDocument();
    if (!project.privateSource) expect(screen.getByRole("link", { name: /View on GitHub/ })).toHaveAttribute("href", project.github);
    fireEvent.click(screen.getByRole("button", { name: "All projects" }));
    finishExit();
  });
});

test("Cléa uses its scribble mark and original renders while keeping its source private", () => {
  const { container } = render(<Projects />);
  const sign = screen.getByRole("button", { name: "Open Cléa" });
  expect(sign.querySelector(".sign-logo")).toHaveAttribute("src", "/assets/projects/clea/clea-mark-light.svg");
  openAndFinish("Cléa");
  expect(screen.getByRole("heading", { name: "Cléa" })).toBeInTheDocument();
  expect(screen.getByText("Tone.js")).toBeInTheDocument();
  expect(screen.getByText("PixiJS")).toBeInTheDocument();
  expect(screen.getByText("Application source is private.")).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /View on GitHub/ })).not.toBeInTheDocument();
  expect(container.querySelector(".project-main-media")).toHaveClass("is-render");
  expect(within(screen.getByRole("button", { name: "Enlarge Figure — offline render" })).getByRole("img")).toHaveAttribute("src", "/assets/projects/clea/figure.webp");
  fireEvent.mouseEnter(screen.getByRole("button", { name: "Show Orbit — MIDI render" }));
  expect(screen.getByRole("button", { name: "Enlarge Orbit — MIDI render" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "All projects" }));
  finishExit();
  expect(screen.getByRole("button", { name: "Open Cléa" })).toHaveFocus();
});

test("opens the image viewer and supports gallery navigation without leaving details", () => {
  const { container } = render(<Projects />);
  openAndFinish("Parity");
  fireEvent.click(screen.getByRole("button", { name: "Enlarge Home workspace" }));
  const viewer = screen.getByRole("dialog", { name: "Parity image viewer" });
  fireEvent.mouseLeave(container.querySelector(".project-board-shell"));
  expect(within(viewer).getByRole("img", { name: "Home workspace" })).toBeInTheDocument();
  fireEvent.keyDown(viewer, { key: "ArrowRight" });
  expect(within(viewer).getByRole("img", { name: "Crawl investigation" })).toBeInTheDocument();
  fireEvent.click(within(viewer).getByRole("button", { name: "Previous image" }));
  expect(within(viewer).getByRole("img", { name: "Home workspace" })).toBeInTheDocument();
  fireEvent.click(within(viewer).getByRole("button", { name: "Close image viewer" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Parity" })).toBeInTheDocument();
});

test("keeps project information available if an image fails to load", () => {
  render(<Projects />);
  openAndFinish("SpotiTauri");
  const stage = screen.getByRole("button", { name: "Enlarge Repository application mark" });
  fireEvent.error(within(stage).getByRole("img"));
  expect(within(stage).getByText(/This preview is unavailable/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /View on GitHub/ })).toBeInTheDocument();
});
