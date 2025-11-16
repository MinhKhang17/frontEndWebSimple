// js/main.js - File JavaScript chung cho toàn bộ website

// ========== ROBUST PARTIAL LOADER ==========
async function loadPartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    el.innerHTML = await res.text();
    
    // Khởi tạo header sau khi load xong
    if (selector === '#site-header') initializeHeader();
  } catch (err) {
    console.error('Failed to load', url, err);
    
    // Fallback: hiển thị header/footer tối thiểu để trang vẫn dùng được
    if (selector === '#site-header') {
      el.innerHTML = `<header class="bg-white p-4 shadow"><div class="max-w-6xl mx-auto">Phong Hòa Phát</div></header>`;
      initializeHeader();
    }
    if (selector === '#site-footer') {
      el.innerHTML = `<footer class="bg-gray-800 text-white p-4 text-center">© 2025 Phong Hòa Phát</footer>`;
    }
  }
}

// ========== INITIALIZE HEADER ==========
function initializeHeader() {
  
  /* --- Làm nổi bật link trang hiện tại --- */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(el => {
    try {
      const href = el.getAttribute('href');
      if (!href) return;
      
      if (href === current || (current === 'product-detail.html' && href === 'product.html')) {
        el.classList.add('font-bold', 'text-teal-600');
      } else {
        el.classList.remove('font-bold', 'text-teal-600');
      }
    } catch(e) {}
  });

  /* --- Dropdown menu danh mục (desktop) --- */
  const catToggle = document.getElementById('catToggle');
  const catMenu = document.getElementById('catMenu');
  
  if (catToggle && catMenu) {
    catToggle.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const shown = !catMenu.classList.contains('hidden');
      catMenu.classList.toggle('hidden');
      catToggle.setAttribute('aria-expanded', String(!shown));
      catMenu.setAttribute('aria-hidden', String(shown));
    });
    
    // Đóng khi click bên ngoài
    document.addEventListener('click', (e) => {
      if (!catMenu.contains(e.target) && !catToggle.contains(e.target)) {
        catMenu.classList.add('hidden');
        catToggle.setAttribute('aria-expanded', 'false');
        catMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* --- Mobile off-canvas menu --- */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobilePanel = document.getElementById('mobilePanel');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');

  function openMobile() {
    if (!mobileMenu || !mobileBackdrop || !mobilePanel) return;
    mobileMenu.style.pointerEvents = 'auto';
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileBackdrop.classList.add('opacity-100');
    mobilePanel.classList.remove('-translate-x-full');
    document.body.classList.add('overflow-hidden');
    menuBtn?.setAttribute('aria-expanded', 'true');
    mobileCloseBtn?.focus();
  }

  function closeMobile() {
    if (!mobileMenu || !mobileBackdrop || !mobilePanel) return;
    mobileBackdrop.classList.remove('opacity-100');
    mobilePanel.classList.add('-translate-x-full');
    document.body.classList.remove('overflow-hidden');
    menuBtn?.setAttribute('aria-expanded', 'false');
    
    // Tắt pointer events sau khi animation kết thúc
    setTimeout(() => {
      if (mobileMenu) {
        mobileMenu.style.pointerEvents = 'none';
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    }, 300);
    menuBtn?.focus();
  }

  // Gắn sự kiện
  if (menuBtn) menuBtn.addEventListener('click', openMobile);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobile);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobile);

  // Đóng menu khi nhấn ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.style.pointerEvents !== 'none') {
      closeMobile();
    }
  });

  // Đóng mobile menu khi click vào link
  mobileMenu && mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      closeMobile();
    });
  });
}

// ========== PAGE LOAD & NAVIGATION OVERLAY ==========
document.addEventListener('DOMContentLoaded', function() {
  // Load header và footer
  loadPartial('#site-header', 'header.html');
  loadPartial('#site-footer', 'footer.html');

  // Tạo overlay chuyển trang mượt mà
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

  function navigateWithOverlay(href) {
    if (navigateWithOverlay._navigating) return;
    navigateWithOverlay._navigating = true;
    navOverlay.style.pointerEvents = 'auto';
    navOverlay.style.opacity = '1';
    const main = document.querySelector('main');
    if (main) main.classList.remove('loaded');
    setTimeout(() => window.location.href = href, 280);
  }

  // Chặn click vào link nội bộ để thêm hiệu ứng chuyển trang
  document.addEventListener('click', function(e) {
    if (e.defaultPrevented) return;
    const a = e.target.closest('a');
    if (!a) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    
    let href;
    try {
      href = new URL(a.href, window.location.href);
    } catch {
      return;
    }
    
    if (href.origin !== window.location.origin) return;
    if (href.protocol === 'mailto:' || href.protocol === 'tel:') return;
    if (href.pathname === window.location.pathname && href.hash) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (a.closest('button')) return;
    
    e.preventDefault();
    navigateWithOverlay(a.href);
  }, { passive: false });

  // Prefetch trang khi hover/touch vào link (tăng tốc độ load)
  const prefetched = new Set();
  
  function prefetch(href) {
    try {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || prefetched.has(url.href)) return;
      prefetched.add(url.href);
      fetch(url.href, { cache: 'no-cache' }).then(r => r.text()).catch(() => {});
    } catch {}
  }
  
  document.addEventListener('mouseover', e => {
    const a = e.target.closest('a');
    if (a) prefetch(a.href);
  }, { passive: true });
  
  document.addEventListener('touchstart', e => {
    const a = e.target.closest('a');
    if (a) prefetch(a.href);
  }, { passive: true });
});