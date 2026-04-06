const puppeteer = require('puppeteer');

(async () => {
  const results = {};
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  try {
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    // Mobile menu (small viewport)
    await page.setViewport({ width: 375, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await delay(300);
    const menuBtn = await page.$('#menuBtn');
    if (menuBtn) {
      await menuBtn.click();
      await delay(300);
      results.mobileMenuVisible = await page.evaluate(() => {
        const m = document.getElementById('mobileMenu');
        return !!m && m.getAttribute('aria-hidden') === 'false';
      });
    } else {
      results.mobileMenuVisible = false;
    }

    // Lightbox test
    await page.goto('http://localhost:3000/product', { waitUntil: 'networkidle2' });
    await delay(300);
    const imgs = await page.$$('img[data-lightbox]');
    if (imgs && imgs.length) {
      await imgs[0].click();
      await delay(400);
      results.lightboxActive = await page.evaluate(() => {
        const lb = document.getElementById('img-lightbox');
        const img = lb && lb.querySelector('img');
        return { active: !!lb && lb.classList.contains('active'), src: img ? img.src : '' };
      });
    } else {
      results.lightboxActive = { active: false };
    }

    // Video test
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
    await delay(300);
    const vb = await page.$('.video-block');
    if (vb) {
      const poster = await vb.$('.video-poster');
      if (poster) {
        await poster.click();
        await delay(1000);
        results.videoPlaying = await page.evaluate(() => {
          const b = document.querySelector('.video-block');
          const iframe = b && b.querySelector('iframe');
          return { playing: !!b && b.classList.contains('playing'), iframeSrc: iframe ? iframe.src : '' };
        });
      } else {
        results.videoPlaying = { playing: false };
      }
    } else {
      results.videoPlaying = { playing: false };
    }

    // Product card navigation
    await page.goto('http://localhost:3000/product', { waitUntil: 'networkidle2' });
    await delay(300);
    const firstCard = await page.$('.product-card');
    if (firstCard) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 5000 }).catch(() => {}),
        firstCard.click()
      ]);
      results.afterCardNav = page.url();
    } else {
      results.afterCardNav = null;
    }

    console.log('QA_RESULTS', JSON.stringify(results, null, 2));
  } catch (e) {
    console.error('QA_ERROR', e && e.stack ? e.stack : e);
  } finally {
    await browser.close();
  }

  process.exit(0);
})();
