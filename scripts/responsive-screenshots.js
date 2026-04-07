const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const base = process.argv[2] || 'http://localhost:3000';
  const outDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const pages = [
    { path: '/', name: 'home' },
    { path: '/about', name: 'about' },
    { path: '/product', name: 'product' },
    { path: '/product-detail?product=chenMu', name: 'product-detail' }
  ];

  const viewports = [
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'tablet', width: 1024, height: 768 },
    { name: 'mobile', width: 375, height: 812 }
  ];

  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const delay = (ms) => new Promise(res => setTimeout(res, ms));
  const saved = [];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    for (const p of pages) {
      const url = base + p.path;
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        await delay(400);
        const filename = `${p.name}-${vp.name}.png`;
        const filepath = path.join(outDir, filename);
        await page.screenshot({ path: filepath, fullPage: true });
        saved.push(filepath);
        console.log('Saved', filepath);
      } catch (e) {
        console.error('Failed to capture', url, '->', e && e.message);
      }
    }
  }

  await browser.close();
  console.log('All screenshots saved:', saved);
  process.exit(0);
})();
