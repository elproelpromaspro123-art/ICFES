const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'src');
const exts = new Set(['.ts', '.tsx', '.css', '.md']);
const suspectPattern = /Ã|Â|â€™|â€œ|â€|â€“|â€”|Ã¡|Ã©|Ã­|Ã³|Ãº|Ã±/;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (exts.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function scoreMojibake(text) {
  const matches = text.match(/Ã|Â|â€™|â€œ|â€|â€“|â€”/g);
  return matches ? matches.length : 0;
}

const files = walk(root);
let changed = 0;
for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  if (!suspectPattern.test(original)) continue;
  const fixed = Buffer.from(original, 'latin1').toString('utf8');
  if (fixed === original) continue;
  const before = scoreMojibake(original);
  const after = scoreMojibake(fixed);
  if (after <= before) {
    fs.writeFileSync(file, fixed, 'utf8');
    changed += 1;
  }
}

console.log(`Archivos corregidos: ${changed}`);
