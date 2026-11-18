// Render the same React tree delivered to browsers. No crawler-only markup.
process.env.NODE_ENV = 'production';
const fs = require('node:fs');
const path = require('node:path');
const { buildSync } = require('esbuild');
const React = require('react');
const { renderToString } = require('react-dom/server');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'build', '.prerender.cjs');
try {
  buildSync({
    absWorkingDir: root,
    entryPoints: ['src/App.js'],
    outfile: output,
    bundle: true,
    platform: 'node',
    format: 'cjs',
    packages: 'external',
    jsx: 'automatic',
    loader: { '.js': 'jsx', '.css': 'empty' },
    define: { 'process.env.NODE_ENV': '"production"' },
    logLevel: 'warning',
  });
  const App = require(output).default;
  const markup = renderToString(React.createElement(React.StrictMode, null, React.createElement(App)));
  const htmlPath = path.join(root, 'build', 'index.html');
  const template = fs.readFileSync(htmlPath, 'utf8');
  const placeholder = '<div id="root"></div>';
  if (!template.includes(placeholder)) throw new Error('Expected one empty React root in the build template.');
  // A replacement callback preserves literal $ characters in project content.
  fs.writeFileSync(htmlPath, template.replace(placeholder, () => `<div id="root" data-prerendered="true">${markup}</div>`));
  console.log(`Pre-rendered portfolio: ${Math.round(Buffer.byteLength(markup) / 1024)} KB of crawlable HTML.`);
} finally {
  if (fs.existsSync(output)) fs.unlinkSync(output);
}
