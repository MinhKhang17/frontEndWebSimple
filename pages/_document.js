import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head>
          {/* Essential Meta Tags */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
          <meta name="theme-color" content="#059669" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          
          {/* SEO Meta Tags - Global defaults */}
          <meta name="description" content="Phong Hòa Phát cung cấp vật tư khai thác mủ cao su: chén, máng chắn mưa, phụ kiện. Chất lượng kiểm định, giao nhanh." />
          <meta name="keywords" content="vật tư cao su, chén hứng mủ, máng chắn mưa, phụ kiện cao su, khai thác mủ" />
          <meta property="og:site_name" content="Phong Hòa Phát" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="vi_VN" />
          <link rel="alternate" hrefLang="vi" href="https://phonghoaphat.com" />
          
          {/* Canonical & Manifest */}
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          
          {/* Font Optimization - Preconnect & Preload */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* Preload font - speeds up font delivery */}
          <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" media="print" onLoad="this.media='all'" />
          {/* Fallback for JS disabled */}
          <noscript>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
          </noscript>
          
          {/* DNS Prefetch for external resources */}
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          
          {/* Critical Inline CSS to prevent FOUC */}
          <style dangerouslySetInnerHTML={{__html: `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              background-color: #f9fafb; 
              color: #1f2937; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
              -webkit-font-smoothing: antialiased;
            }
            main, header, footer { visibility: visible; }
          `}} />
        </Head>
        <body>
          <Main />
          <NextScript />
          
          {/* Script to ensure fonts load properly */}
          <script dangerouslySetInnerHTML={{__html: `
            if ('fonts' in document) {
              document.fonts.ready.then(() => {
                document.body.style.fontFamily = "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
              });
            }
          `}} />
        </body>
      </Html>
    )
  }
}

export default MyDocument
