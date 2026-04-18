#!/usr/bin/env node
/**
 * Génère public/site.html à partir de sauva.html
 * en remplaçant toutes les URLs distantes par des chemins locaux.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

let html = readFileSync(join(ROOT, 'sauva.html'), 'utf-8');

// --- Remplacements des images ---
const imageMapping = JSON.parse(
  readFileSync(join(__dirname, 'image-mapping.json'), 'utf-8')
);

for (const [remoteUrl, localPath] of Object.entries(imageMapping)) {
  const httpVariant = remoteUrl.replace(/^https?:\/\//, 'http://');
  const httpsVariant = remoteUrl.replace(/^https?:\/\//, 'https://');
  html = html.split(httpVariant).join(localPath);
  html = html.split(httpsVariant).join(localPath);
}

// --- Remplacements des fonts Entypo-Fontello ---
const fontBase = 'https://tym-events.com/wp-content/themes/enfold/config-templatebuilder/avia-template-builder/assets/fonts';
for (const ext of ['eot', 'woff', 'woff2', 'ttf', 'svg']) {
  html = html.split(`${fontBase}/entypo-fontello.${ext}`).join(`/fonts/entypo-fontello.${ext}`);
}

// --- Patch CSS: forcer visibilité des éléments animés qui restent cachés sans JS ---
const animationFix = `
<style id="av-animation-fix">
  /* Forcer la visibilité des éléments pop-up Avia qui restent cachés sans initialisation JS */
  .av-animated-generic.pop-up,
  .avia_animated_image.pop-up {
    opacity: 1 !important;
    transform: none !important;
    visibility: visible !important;
  }
</style>
`;
// Injecter juste avant </head>
html = html.replace('</head>', animationFix + '</head>');

// --- Écriture du fichier ---
const outputPath = join(ROOT, 'public', 'site.html');
writeFileSync(outputPath, html);
console.log(`✅  Fichier statique généré: public/site.html`);
console.log(`🌐  Accessible sur: http://localhost:3000/site.html`);
