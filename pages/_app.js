import React, { useEffect } from 'react'
import Script from 'next/script'
import Head from 'next/head'
import { useRouter } from 'next/router'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://phonghoaphat.com';
  const canonicalUrl = (typeof window === 'undefined')
    ? siteUrl + (router.asPath || '/')
    : siteUrl + (router.asPath || '/').split('?')[0];

  useEffect(() => {
    function handleRouteChange() {
      // Re-run small legacy lifecycle hooks if present
      try { if (window.initializeHeader) window.initializeHeader(); } catch(e) {}
      try { if (window.initVideos) window.initVideos(); } catch(e) {}
    }

    // Run on first load
    handleRouteChange();

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  useEffect(() => {
    // Create or reuse nav overlay (page transition)
    let navOverlay = document.getElementById('navOverlay');
    if (!navOverlay) {
      navOverlay = document.createElement('div');
      navOverlay.id = 'navOverlay';
      Object.assign(navOverlay.style, {
        position: 'fixed',
        inset: '0',
        background: '#fff',
        pointerEvents: 'none',
        opacity: '0',
        transition: 'opacity 280ms ease',
        zIndex: '9998'
      });
      document.body.appendChild(navOverlay);
    }

    function showOverlay() {
      if (!navOverlay) return;
      navOverlay.style.pointerEvents = 'auto';
      navOverlay.style.opacity = '1';
      const main = document.querySelector('main');
      if (main) main.classList.remove('loaded');
    }
    function hideOverlay() {
      if (!navOverlay) return;
      navOverlay.style.opacity = '0';
      navOverlay.style.pointerEvents = 'none';
      const main = document.querySelector('main');
      if (main) setTimeout(() => main.classList.add('loaded'), 280);
    }

    router.events.on('routeChangeStart', showOverlay);
    router.events.on('routeChangeComplete', hideOverlay);
    router.events.on('routeChangeError', hideOverlay);

    // Prefetch on hover/touch for internal links (lightweight)
    const prefetched = new Set();
    function maybePrefetchHref(href) {
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (prefetched.has(url.pathname)) return;
        prefetched.add(url.pathname);
        router.prefetch(url.pathname).catch(() => {});
      } catch {}
    }
    const onHover = (e) => { const a = e.target.closest && e.target.closest('a'); if (a && a.href) maybePrefetchHref(a.href); };
    const onTouch = (e) => { const a = e.target.closest && e.target.closest('a'); if (a && a.href) maybePrefetchHref(a.href); };
    document.addEventListener('mouseover', onHover, { passive: true });
    document.addEventListener('touchstart', onTouch, { passive: true });

    // pageshow handler (bfcache): refresh font links if restored from bfcache
    function onPageShow(e) {
      if (e.persisted) {
        document.querySelectorAll('link[href*="fonts.googleapis"]').forEach(link => {
          link.href = link.href.split('?')[0] + '?r=' + Date.now();
        });
      }
    }
    window.addEventListener('pageshow', onPageShow);

    return () => {
      router.events.off('routeChangeStart', showOverlay);
      router.events.off('routeChangeComplete', hideOverlay);
      router.events.off('routeChangeError', hideOverlay);
      document.removeEventListener('mouseover', onHover);
      document.removeEventListener('touchstart', onTouch);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Phong Hòa Phát - Vật tư & giải pháp khai thác mủ. Sản phẩm: chén cao su, máng chắn mưa và nhiều thiết bị khác." />
        <meta name="robots" content="index,follow" />
        <meta property="og:site_name" content="Phong Hòa Phát" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Phong Hòa Phát — Vật tư ngành cao su" />
        <meta property="og:description" content="Phong Hòa Phát - Vật tư & giải pháp khai thác mủ. Sản phẩm: chén cao su, máng chắn mưa và nhiều thiết bị khác." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${siteUrl}/images/page/logo/favicon-96x96.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/images/page/logo/favicon-96x96.png" />
      </Head>
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      {/* Global lightbox used by legacy scripts */}
      <div id="img-lightbox" className="img-lightbox" role="dialog" aria-modal="true" aria-hidden="true">
        <button className="close-btn" aria-label="Đóng">X</button>
        <img src={undefined} alt="" />
      </div>

      <a href="#main-content" className="skip-link">Bỏ qua tới nội dung</a>
      <Component {...pageProps} />
    </>
  )
}
