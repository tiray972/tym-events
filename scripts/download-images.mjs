#!/usr/bin/env node
/**
 * Script to extract all image URLs from sauva.html and download them to public/images/
 * Usage: node scripts/download-images.mjs
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const HTML_FILE = join(ROOT, 'sauva.html');
const OUTPUT_DIR = join(ROOT, 'public', 'images');

// Create output directory
mkdirSync(OUTPUT_DIR, { recursive: true });

const html = readFileSync(HTML_FILE, 'utf-8');

// Extract all image URLs from the HTML
const urlPatterns = [
  // src="..." attributes
  /src=["']([^"']*tym-events\.com[^"']*\.(png|jpg|jpeg|gif|svg|webp|ico))["']/gi,
  // background-image: url(...)
  /background-image:\s*url\(["']?([^"')]*tym-events\.com[^"')]*\.(png|jpg|jpeg|gif|svg|webp|ico))["']?\)/gi,
  // url(...) in style attributes
  /url\(["']?([^"')]*tym-events\.com[^"')]*\.(png|jpg|jpeg|gif|svg|webp|ico))["']?\)/gi,
  // href="..." for favicons/icons
  /href=["']([^"']*tym-events\.com[^"']*\.(png|jpg|jpeg|gif|svg|webp|ico))["']/gi,
];

const foundUrls = new Set();

for (const pattern of urlPatterns) {
  let match;
  const regex = new RegExp(pattern.source, pattern.flags);
  while ((match = regex.exec(html)) !== null) {
    const url = match[1];
    if (url && url.startsWith('http')) {
      foundUrls.add(url);
    }
  }
}

console.log(`Found ${foundUrls.size} unique image URLs\n`);

// Helper to get a safe local filename
function getSafeFilename(url) {
  // Remove query strings
  const cleanUrl = url.split('?')[0];
  return basename(cleanUrl);
}

// Download images
async function downloadImage(url) {
  const filename = getSafeFilename(url);
  const outputPath = join(OUTPUT_DIR, filename);

  if (existsSync(outputPath)) {
    console.log(`  ⏭  Already exists: ${filename}`);
    return { url, filename, status: 'skipped' };
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TYM-Migration-Bot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    writeFileSync(outputPath, Buffer.from(buffer));
    console.log(`  ✅  Downloaded: ${filename} (${Math.round(buffer.byteLength / 1024)} KB)`);
    return { url, filename, status: 'ok' };
  } catch (err) {
    console.error(`  ❌  Failed: ${filename} — ${err.message}`);
    return { url, filename, status: 'failed', error: err.message };
  }
}

// Run all downloads with concurrency limit
async function downloadAll(urls, concurrency = 4) {
  const urlArray = [...urls];
  const results = [];
  let index = 0;

  async function worker() {
    while (index < urlArray.length) {
      const url = urlArray[index++];
      const result = await downloadImage(url);
      results.push(result);
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  return results;
}

const results = await downloadAll(foundUrls);

// Summary
const ok = results.filter(r => r.status === 'ok').length;
const skipped = results.filter(r => r.status === 'skipped').length;
const failed = results.filter(r => r.status === 'failed').length;

console.log('\n========== SUMMARY ==========');
console.log(`✅  Downloaded: ${ok}`);
console.log(`⏭  Skipped:    ${skipped}`);
console.log(`❌  Failed:     ${failed}`);
console.log(`📁  Output:     ${OUTPUT_DIR}`);

// Generate a mapping file for easy reference
const mapping = {};
for (const r of results) {
  if (r.status !== 'failed') {
    mapping[r.url] = `/images/${r.filename}`;
  }
}
writeFileSync(join(ROOT, 'scripts', 'image-mapping.json'), JSON.stringify(mapping, null, 2));
console.log(`🗺   Mapping:    scripts/image-mapping.json`);
