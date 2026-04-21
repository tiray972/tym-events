import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const HTML_FILE = join(ROOT, 'sauva.html');
const PUBLIC_DIR = join(ROOT, 'public');

const html = readFileSync(HTML_FILE, 'utf-8');

// Extract all URLs pointing to tym-events.com
// We look for anything that looks like a URL in src, href, or url()
const urlRegex = /https:\/\/tym-events\.com\/[^\s"'>)]+/gi;
const allUrls = [...html.matchAll(urlRegex)].map(match => match[0]);
const uniqueUrls = [...new Set(allUrls)].filter(url => {
    // Exclude canonical and other non-asset links if necessary
    // But for safety, we'll download everything except the root page itself
    return url !== 'https://tym-events.com/' && url !== 'https://tym-events.com';
});

console.log(`Found ${uniqueUrls.size} unique URLs to localize...`);

async function downloadAsset(url) {
    // Remove query params for local path
    const cleanUrl = url.split('?')[0];
    const urlPath = new URL(cleanUrl).pathname;
    
    // Determine local path within public/
    // If it's a wp-content or wp-includes path, we mirror it
    const localPath = join(PUBLIC_DIR, urlPath);
    const localDir = dirname(localPath);

    if (existsSync(localPath)) {
        return { url, localPath: urlPath, status: 'skipped' };
    }

    try {
        mkdirSync(localDir, { recursive: true });
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const buffer = await response.arrayBuffer();
        writeFileSync(localPath, Buffer.from(buffer));
        console.log(`  ✅ ${urlPath}`);
        return { url, localPath: urlPath, status: 'ok' };
    } catch (err) {
        console.error(`  ❌ ${urlPath} : ${err.message}`);
        return { url, localPath: urlPath, status: 'failed' };
    }
}

async function run(urls) {
    const results = [];
    for (const url of urls) {
        results.push(await downloadAsset(url));
    }
    return results;
}

run(uniqueUrls).then(results => {
    const ok = results.filter(r => r.status === 'ok').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    const failed = results.filter(r => r.status === 'failed').length;
    console.log(`\nLocalisation complète: ${ok} téléchargés, ${skipped} déjà présents, ${failed} erreurs.`);
});
