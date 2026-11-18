// Code-native branding, rendered from the same SVG sources on every platform.
const fs = require('node:fs');
const path = require('node:path');
const { Resvg } = require('@resvg/resvg-js');
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const mark = '<rect width="64" height="64" rx="14" fill="#242522"/><g fill="none" stroke="#eeede8" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 24l15 19m0-19L13 43M36 24l8 17m8-17L40 51"/></g>';
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${mark}</svg>`;
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), icon);
const render = (svg, width) => new Resvg(svg, {
  fitTo: { mode: 'width', value: width },
  font: { loadSystemFonts: false, fontFiles: [path.join(publicDir, 'fonts/sf-pro-display-bold.otf')], defaultFontFamily: 'SF Pro Display' },
}).render().asPng();
for (const [file, size] of [['logo192.png', 192], ['logo512.png', 512], ['apple-touch-icon.png', 180]]) {
  fs.writeFileSync(path.join(publicDir, file), render(icon, size));
}
// ICO supports PNG frames, preserving crisp edges at common search-icon sizes.
const frames = [16, 32, 48].map((size) => ({ size, png: render(icon, size) }));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach(({ size, png }, index) => {
  const start = 6 + index * 16;
  header[start] = size;
  header[start + 1] = size;
  header.writeUInt16LE(1, start + 4);
  header.writeUInt16LE(32, start + 6);
  header.writeUInt32LE(png.length, start + 8);
  header.writeUInt32LE(offset, start + 12);
  offset += png.length;
});
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), Buffer.concat([header, ...frames.map(({ png }) => png)]));
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#eae9e4"/>
  <path d="M56 105h1088M56 524h1088" stroke="#242522" stroke-opacity=".22"/>
  <g transform="translate(56 30) scale(.8)">${mark}</g>
  <g font-family="SF Pro Display" fill="#242522">
    <text x="1144" y="66" text-anchor="end" font-size="18" letter-spacing="2">THE PORTFOLIO OF XYREX KYLE SALAZAR</text>
    <text x="49" y="345" font-size="220" font-weight="700" letter-spacing="-12">Xyrex.</text>
    <text x="60" y="415" font-size="32" letter-spacing="4">WEB DEVELOPER &amp; CREATIVE</text>
    <text x="60" y="476" font-size="23" fill="#62645b">Web apps. Desktop tools. Visual design.</text>
    <text x="60" y="576" font-size="18" fill="#62645b">BACOLOD, PHILIPPINES</text>
    <text x="1144" y="576" text-anchor="end" font-size="18">xyrex-portfolio.vercel.app ↗</text>
  </g>
  <g transform="translate(999 238)" stroke="#7c876e" stroke-width="10"><path d="M0 0h100M0 0v100M0 0l100 100" fill="none" transform="translate(100 0) rotate(90)"/></g>
</svg>`;
fs.writeFileSync(path.join(publicDir, 'assets/xyrex-social.svg'), social);
fs.writeFileSync(path.join(publicDir, 'assets/xyrex-social.png'), render(social, 1200));
console.log('Generated Xyrex SVG/ICO/PNG icons and 1200 × 630 social card.');
