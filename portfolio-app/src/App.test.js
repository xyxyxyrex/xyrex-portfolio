import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
import { hydrateRoot } from 'react-dom/client';

beforeAll(() => {
  window.matchMedia = () => ({
    matches: false, addListener: jest.fn(), removeListener: jest.fn(),
    addEventListener: jest.fn(), removeEventListener: jest.fn(),
  });
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('renders the portrait hero and all five accessible icon destinations', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: 'Xyrex Kyle Salazar' })).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('main')).toContainElement(screen.getByRole('heading', { name: 'Design Projects' }));
  expect(screen.getByAltText(/Xyrex Kyle Salazar wearing/)).toHaveAttribute('src', '/assets/hero-cutout-halftone-1100.webp');
  const nav = screen.getByRole('navigation', { name: 'Main navigation' });
  ['Home', 'About', 'Code', 'Media', 'Contact'].forEach((label, index) => {
    expect(within(nav).getByRole('link', { name: label })).toHaveAttribute('href', `#${['home', 'about', 'projects', 'skills', 'contact'][index]}`);
  });
});

test('navigates to a section and contracts the dock as its scroll container moves', () => {
  jest.useFakeTimers();
  const { container } = render(<App />);
  const scrollContainer = container.querySelector('[data-scroll-container]');
  const sectionIds = ['home', 'about', 'projects', 'skills', 'contact'];
  Object.defineProperty(scrollContainer, 'clientHeight', { value: 800 });
  scrollContainer.getBoundingClientRect = () => ({ top: 0 });
  sectionIds.forEach((id, index) => {
    document.getElementById(id).getBoundingClientRect = () => ({ top: index * 800 - scrollContainer.scrollTop });
  });
  const projects = document.getElementById('projects');
  projects.scrollIntoView = jest.fn();
  const nav = screen.getByRole('navigation', { name: 'Main navigation' });
  fireEvent.click(within(nav).getByRole('link', { name: 'Code' }));
  expect(projects.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  scrollContainer.scrollTop = 1600;
  fireEvent.scroll(scrollContainer);
  act(() => { jest.advanceTimersByTime(100); });
  expect(nav).toHaveClass('is-compact');
  expect(within(nav).getByRole('link', { name: 'Code' })).toHaveAttribute('aria-current', 'location');
  scrollContainer.scrollTop = 0;
  fireEvent.scroll(scrollContainer);
  act(() => { jest.advanceTimersByTime(100); });
  expect(nav).not.toHaveClass('is-compact');
  expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'location');
  jest.useRealTimers();
});

test('hydrates the pre-rendered portfolio without replacing its content and attaches navigation', async () => {
  const { renderToString } = require('react-dom/server.node');
  const host = document.createElement('div');
  document.body.appendChild(host);
  host.innerHTML = renderToString(<App />);
  const originalHeading = host.querySelector('h1');
  const originalPortrait = host.querySelector('.hero-portrait img');
  const recoverableErrors = [];
  let root;
  try {
    await act(async () => {
      root = hydrateRoot(host, <App />, { onRecoverableError: (error) => recoverableErrors.push(error) });
    });
    expect(recoverableErrors).toEqual([]);
    expect(host.querySelector('h1')).toBe(originalHeading);
    expect(host.querySelector('.hero-portrait img')).toBe(originalPortrait);
    const projects = host.querySelector('#projects');
    projects.scrollIntoView = jest.fn();
    fireEvent.click(within(host.querySelector('nav')).getByRole('link', { name: 'Code' }));
    expect(projects.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  } finally {
    if (root) await act(async () => { root.unmount(); });
    host.remove();
  }
});
