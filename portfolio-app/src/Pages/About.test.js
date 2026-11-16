import { act, fireEvent, render, screen, within } from "@testing-library/react";
import About from "./About";

test("reveals a discipline and updates the description for its tools", () => {
  render(<About />);
  const development = screen.getByRole("button", { name: /Development/ });
  expect(development).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("button", { name: "Rust" })).not.toBeInTheDocument();

  fireEvent.mouseEnter(development.parentElement);
  expect(development).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("status")).toHaveTextContent("Built with intention.");
  const devTools = screen.getByRole("list", { name: "Development tools" });
  expect(within(devTools).getByRole("button", { name: "Rust" })).toBeInTheDocument();
  expect(within(devTools).getByRole("button", { name: /Agentic Development: Claude Code \/ Codex/ })).toBeInTheDocument();

  const electron = within(devTools).getByRole("button", { name: "Electron" });
  fireEvent.mouseEnter(electron);
  expect(screen.getByRole("status")).toHaveTextContent("Bringing web interfaces to the desktop with Electron.");
  fireEvent.mouseLeave(electron, { relatedTarget: devTools });
  expect(screen.getByRole("status")).toHaveTextContent("Built with intention.");
  fireEvent.mouseLeave(development.parentElement);
  expect(development).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByRole("status")).toHaveTextContent("A little logic. A little imagination.");
});

test("supports tapping categories, focusing tools, and closing with Escape", () => {
  render(<About />);
  const design = screen.getByRole("button", { name: /Design/ });
  fireEvent.click(design);
  expect(design).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("status")).toHaveTextContent("Designed to feel right.");

  const motion = screen.getByRole("button", { name: /Motion/ });
  act(() => { motion.focus(); });
  expect(motion).toHaveAttribute("aria-expanded", "true");
  expect(design).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByRole("button", { name: "TouchDesigner" })).toBeInTheDocument();
  const hyperframes = screen.getByRole("button", { name: "Hyperframes" });
  fireEvent.mouseEnter(hyperframes);
  expect(screen.getByRole("status")).toHaveTextContent("Creating motion graphics and video with HTML, CSS, and code.");
  const premiere = screen.getByRole("button", { name: "Premiere Pro" });
  act(() => { premiere.focus(); });
  expect(screen.getByRole("status")).toHaveTextContent("Shaping footage into stories");

  fireEvent.keyDown(premiere, { key: "Escape" });
  expect(motion).toHaveFocus();
  expect(motion).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("button", { name: "Premiere Pro" })).not.toBeInTheDocument();
});
