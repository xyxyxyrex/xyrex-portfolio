import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

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
  expect(screen.getByRole('heading', { name: /Xyrex Kyle Salazar — Developer & Creative/i })).toBeInTheDocument();
  expect(screen.getByAltText(/Xyrex Kyle Salazar wearing/)).toHaveAttribute('src', '/assets/hero-cutout-halftone.png');
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
