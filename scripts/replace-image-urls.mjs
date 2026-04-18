#!/usr/bin/env node
/**
 * Replaces all WordPress image URLs in page.tsx and layout.tsx
 * with local paths from public/images/
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const mapping = JSON.parse(
  readFileSync(join(__dirname, 'image-mapping.json'), 'utf-8')
);

const FILES = [
  join(ROOT, 'src', 'app', 'page.tsx'),
  join(ROOT, 'src', 'app', 'layout.tsx'),
];

for (const filePath of FILES) {
  let content = readFileSync(filePath, 'utf-8');
  let replacements = 0;

  for (const [remoteUrl, localPath] of Object.entries(mapping)) {
    // Also handle http:// variant
    const httpVariant = remoteUrl.replace(/^https?:\/\//, 'http://');
    const httpsVariant = remoteUrl.replace(/^https?:\/\//, 'https://');

    if (content.includes(httpVariant)) {
      content = content.split(httpVariant).join(localPath);
      replacements++;
    }
    if (content.includes(httpsVariant)) {
      content = content.split(httpsVariant).join(localPath);
      replacements++;
    }
  }

  writeFileSync(filePath, content);
  const name = filePath.split('/').slice(-3).join('/');
  console.log(`✅  ${name}: ${replacements} URL(s) replaced`);
}

console.log('\nDone! All image URLs are now pointing to /images/');
