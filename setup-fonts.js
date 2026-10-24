// Copia las fuentes (subconjunto latino, woff2) desde node_modules a www/fonts con los nombres que usa fonts.css
const fs = require('fs'), path = require('path');
const WANTED = {
  'outfit': [300,400,500,600,700,800,900],
  'jetbrains-mono': [400,600,700],
  'ibm-plex-mono': [500,600],
  'inter': [400,500,600,700],
};
const out = path.join(__dirname, '..', 'www', 'fonts');
fs.mkdirSync(out, { recursive: true });
let missing = [];
for (const [family, weights] of Object.entries(WANTED)) {
  const dir = path.join(__dirname, '..', 'node_modules', '@fontsource', family, 'files');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  for (const w of weights) {
    const re = new RegExp(`-latin-${w}-normal\\.woff2$`);
    const hit = files.find(f => re.test(f));
    if (!hit) { missing.push(`${family} ${w}`); continue; }
    fs.copyFileSync(path.join(dir, hit), path.join(out, `${family}-${w}.woff2`));
  }
}
if (missing.length) { console.error('Faltan fuentes:', missing.join(', ')); process.exit(1); }
console.log('Fuentes copiadas a www/fonts');
