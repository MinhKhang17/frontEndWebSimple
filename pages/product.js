import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect } from 'react'

export default function Product() {
  useEffect(() => {
    // Re-run legacy init if present
    if (typeof window !== 'undefined') {
      try { if (window.initializeHeader) window.initializeHeader(); } catch(e){}

      // Card click behavior
      function onCardClick(e) {
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('img[data-lightbox]')) return;
        const id = this.dataset.product;
        if (id) window.location.href = `/product-detail?product=${id}`;
      }

      const cards = Array.from(document.querySelectorAll('.product-card'));
      cards.forEach(c => c.addEventListener('click', onCardClick));

      // Lightbox setup with keyboard navigation and lazy thumbnails
      const lightbox = document.getElementById('img-lightbox');
      const lightboxImg = lightbox?.querySelector('img');
      const closeBtn = lightbox?.querySelector('.close-btn');
      let gallery = [];
      let currentIdx = -1;
      const thumbHandlers = [];

      function showAt(index) {
        if (!lightbox || !lightboxImg) return;
        if (!gallery || gallery.length === 0) return;
        if (index < 0) index = gallery.length - 1;
        if (index >= gallery.length) index = 0;
        currentIdx = index;
        const src = gallery[index];
        lightboxImg.src = src;
        const thumb = document.querySelectorAll('img[data-lightbox]')[index];
        lightboxImg.alt = (thumb && thumb.alt) ? thumb.alt : '';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
        closeBtn?.focus();
      }

      function open(e) {
        e.stopPropagation();
        const src = e.currentTarget.dataset.lightbox || e.currentTarget.src;
        gallery = Array.from(document.querySelectorAll('img[data-lightbox]')).map(n => n.dataset.lightbox || n.src);
        currentIdx = gallery.indexOf(src);
        if (currentIdx === -1) currentIdx = 0;
        showAt(currentIdx);
      }

    function closeLightbox() {
      if (!lightbox || !lightboxImg) return;
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
      lightboxImg.src = '';
      currentIdx = -1;
    }

    function keyHandler(e) {
      if (!lightbox || !lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') { closeLightbox(); return; }
      if (e.key === 'ArrowLeft') { showAt(currentIdx - 1); return; }
      if (e.key === 'ArrowRight') { showAt(currentIdx + 1); return; }
    }

    const thumbs = Array.from(document.querySelectorAll('img[data-lightbox]'));
    thumbs.forEach((img, i) => {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', `Mở hình ${i + 1} / ${thumbs.length}: ${img.alt || ''}`);
      img.setAttribute('loading', 'lazy');
      const onClick = (e) => open(e);
      const onKey = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(e); } };
      img.addEventListener('click', onClick);
      img.addEventListener('keydown', onKey);
      thumbHandlers.push({ el: img, onClick, onKey });
    });

    closeBtn?.addEventListener('click', closeLightbox);
    function handleLightboxClick(e) { if (e.target === lightbox) closeLightbox(); }
    lightbox?.addEventListener('click', handleLightboxClick);
    document.addEventListener('keydown', keyHandler);

    return () => {
      cards.forEach(c => c.removeEventListener('click', onCardClick));
      thumbHandlers.forEach(h => { h.el.removeEventListener('click', h.onClick); h.el.removeEventListener('keydown', h.onKey); });
      closeBtn?.removeEventListener('click', closeLightbox);
      lightbox?.removeEventListener('click', handleLightboxClick);
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Sản phẩm - Phong Hòa Phát</title>
      </Head>

      <Header />

      <main id="main-content" className="max-w-6xl mx-auto px-4 py-8 page-transition">
        <nav className="text-sm text-gray-600 mb-4">
          <a href="/">Trang chủ</a> / <span className="font-semibold">Sản phẩm</span>
        </nav>

        <div className="grid sm:grid-cols-2 gap-6">
          <article className="product-card card overflow-hidden" data-product="chenMu">
            <div className="hero-media">
              <img src="/images/product/chenMu/chenMu1.jpg" alt="Chén cao su hứng mủ" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Chén cao su hứng mủ</h2>
              <p className="text-sm text-gray-600 mb-3">Chén cao su bền, thiết kế chuẩn giúp tối ưu lượng mủ hứng.</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li><strong>Chất liệu:</strong> Nhựa tổng hợp (dẻo)</li>
                <li><strong>Dung tích:</strong> 1.5 L</li>
              </ul>
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 mb-2">Hình ảnh thực tế:</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <img src="/images/product/chenMu/chenMu1.jpg" alt="Chén cao su - góc chính" loading="lazy" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/product/chenMu/chenMu1.jpg" />
                  <img src="/images/product/chenMu/chenCaoSu2.jpg" alt="Chén cao su - góc nghiêng" loading="lazy" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/product/chenMu/chenCaoSu2.jpg" />
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <a href="/product-detail?product=chenMu" className="btn-primary flex-1 text-center">Chi tiết</a>
                <a href="/contact?product=chenMu" className="btn-outline flex-1 text-center">Báo giá</a>
              </div>
            </div>
          </article>

          <article className="product-card card overflow-hidden" data-product="mangChanMua">
            <div className="hero-media">
              <img src="/images/product/mangChanMua/mangChanMuaNgang.jpg" alt="Máng chắn mưa PE" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Máng chắn mưa PE</h2>
              <p className="text-sm text-gray-600 mb-3">Máng nhựa PE nhẹ, bền, chống thấm tốt, bảo vệ mủ cao su trong mùa mưa hiệu quả.</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li><strong>Chất liệu:</strong> Nhựa PE</li>
                <li><strong>Kích thước chuẩn:</strong> 450 × 80 mm / 550 × 80 mm / 600 × 80 mm</li>
              </ul>
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 mb-2">Hình ảnh thực tế:</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <img src="/images/product/mangChanMua/mangChanMuaNgang.jpg" alt="Máng chắn mưa - góc ngang" loading="lazy" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/product/mangChanMua/mangChanMuaNgang.jpg" />
                  <img src="/images/product/mangChanMua/mangChanMua.jpg" alt="Máng chắn mưa - góc dọc" loading="lazy" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/product/mangChanMua/mangChanMua.jpg" />
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <a href="/product-detail?product=mangChanMua" className="btn-primary flex-1 text-center">Chi tiết</a>
                <a href="/contact?product=mangChanMua" className="btn-outline flex-1 text-center">Báo giá</a>
              </div>
            </div>
          </article>

          {/* Sản phẩm thương mại */}
          
          <article className="product-card card overflow-hidden" data-product="mangDanMu">
            <div className="hero-media">
              <img src="/images/thuongmai/mangdanmu/mangdanmu1.jpg" alt="Máng dẫn mủ" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Máng dẫn mủ</h2>
              <p className="text-sm text-gray-600 mb-3">Máng dẫn mủ cao su chuyên dụng, giúp dẫn mủ vào thùng chứa hiệu quả.</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li><strong>Chất liệu:</strong> Nhựa PVC</li>
                <li><strong>Chiều dài:</strong> Tùy tính</li>
              </ul>
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 mb-2">Hình ảnh:</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <img src="/images/thuongmai/mangdanmu/mangdanmu1.jpg" alt="Máng dẫn mủ" loading="lazy" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/thuongmai/mangdanmu/mangdanmu1.jpg" />
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <a href="/product-detail?product=mangDanMu" className="btn-primary flex-1 text-center">Chi tiết</a>
                <a href="/contact?product=mangDanMu" className="btn-outline flex-1 text-center">Báo giá</a>
              </div>
            </div>
          </article>

          <article className="product-card card overflow-hidden" data-product="keo">
            <div className="hero-media">
              <img src="/images/thuongmai/keo/keo.jpg" alt="Keo cao su" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Keo</h2>
              <p className="text-sm text-gray-600 mb-3">Keo chuyên dụng dùng trong quá trình sản xuất và sửa chữa sản phẩm cao su.</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li><strong>Loại:</strong> Keo dán chuyên dụng</li>
                <li><strong>Công dụng:</strong> Dán, sửa chữa</li>
              </ul>
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 mb-2">Hình ảnh:</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <img src="/images/thuongmai/keo/keo.jpg" alt="Keo" loading="lazy" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/thuongmai/keo/keo.jpg" />
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <a href="/product-detail?product=keo" className="btn-primary flex-1 text-center">Chi tiết</a>
                <a href="/contact?product=keo" className="btn-outline flex-1 text-center">Báo giá</a>
              </div>
            </div>
          </article>

          <article className="product-card card overflow-hidden" data-product="kieng">
            <div className="hero-media">
              <img src="/images/thuongmai/kieng/kieng.png" alt="Kiềng cao su" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Kiềng</h2>
              <p className="text-sm text-gray-600 mb-3">Kiềng cao su hỗ trợ định vị chén và máng chắn mưa trên thân cây.</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li><strong>Chất liệu:</strong> Cao su, nhựa tổng hợp</li>
                <li><strong>Chức năng:</strong> Định vị, hỗ trợ lắp</li>
              </ul>
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 mb-2">Hình ảnh:</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <img src="/images/thuongmai/kieng/kieng.png" alt="Kiềng" loading="lazy" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/thuongmai/kieng/kieng.png" />
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <a href="/product-detail?product=kieng" className="btn-primary flex-1 text-center">Chi tiết</a>
                <a href="/contact?product=kieng" className="btn-outline flex-1 text-center">Báo giá</a>
              </div>
            </div>
          </article>

          <article className="product-card card overflow-hidden" data-product="dayNilon">
            <div className="hero-media">
              <img src="/images/product/dayNilon/dayNilon1.jpg" alt="Dây nilon cột" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Dây nilon cột</h2>
              <p className="text-sm text-gray-600 mb-3">Dây nilon chuyên dụng để buộc cột cây, chứ các dụng cụ trong khai thác mủ.</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li><strong>Chất liệu:</strong> Nilon, polypropylene</li>
                <li><strong>Kích thước:</strong> Đa dạng từ 3mm - 10mm</li>
              </ul>
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 mb-2">Hình ảnh:</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <img src="/images/product/dayNilon/dayNilon1.jpg" alt="Dây nilon cột" loading="lazy" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/product/dayNilon/dayNilon1.jpg" />
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <a href="/product-detail?product=dayNilon" className="btn-primary flex-1 text-center">Chi tiết</a>
                <a href="/contact?product=dayNilon" className="btn-outline flex-1 text-center">Báo giá</a>
              </div>
            </div>
          </article>

          <article className="product-card card overflow-hidden" data-product="khac">
            <div className="hero-media">
              <img src="/images/product/khac/khac1.jpg" alt="Các sản phẩm khác" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Khác - Phụ kiện & công cụ</h2>
              <p className="text-sm text-gray-600 mb-3">Các sản phẩm hỗ trợ khác: phân bón, dao cạo mủ, kim bấm dây.</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li><strong>Bao gồm:</strong> Phân bón, dao cạo, kim bấm</li>
                <li><strong>Công dụng:</strong> Hỗ trợ khai thác, chăm sóc</li>
              </ul>
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 mb-2">Hình ảnh:</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <img src="/images/product/khac/khac1.jpg" alt="Phụ kiện khác" loading="lazy" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/product/khac/khac1.jpg" />
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <a href="/product-detail?product=khac" className="btn-primary flex-1 text-center">Chi tiết</a>
                <a href="/contact?product=khac" className="btn-outline flex-1 text-center">Báo giá</a>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  )
}
