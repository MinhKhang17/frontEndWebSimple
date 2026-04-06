import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect } from 'react'

export default function Product() {
  useEffect(() => {
    // Re-run legacy init if present
    try { if (window.initializeHeader) window.initializeHeader(); } catch(e){}

    // Card click behavior
    function onCardClick(e) {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('img[data-lightbox]')) return;
      const id = this.dataset.product;
      if (id) window.location.href = `/product-detail?product=${id}`;
    }

    const cards = Array.from(document.querySelectorAll('.product-card'));
    cards.forEach(c => c.addEventListener('click', onCardClick));

    // Lightbox setup
    const lightbox = document.getElementById('img-lightbox');
    const lightboxImg = lightbox?.querySelector('img');
    const closeBtn = lightbox?.querySelector('.close-btn');
    const open = (e) => {
      e.stopPropagation();
      const src = e.currentTarget.dataset.lightbox || e.currentTarget.src;
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = src; lightboxImg.alt = e.currentTarget.alt || '';
      lightbox.classList.add('active'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    };
    const close = () => { if (!lightbox || !lightboxImg) return; lightbox.classList.remove('active'); lightbox.setAttribute('aria-hidden','true'); document.body.style.overflow=''; lightboxImg.src=''; };
    document.querySelectorAll('img[data-lightbox]').forEach(img => img.addEventListener('click', open));
    closeBtn?.addEventListener('click', close);
    lightbox?.addEventListener('click', e => { if (e.target === lightbox) close(); });
    const keyHandler = e => { if (e.key === 'Escape' && lightbox?.classList.contains('active')) close(); };
    document.addEventListener('keydown', keyHandler);

    return () => {
      cards.forEach(c => c.removeEventListener('click', onCardClick));
      document.querySelectorAll('img[data-lightbox]').forEach(img => img.removeEventListener('click', open));
      closeBtn?.removeEventListener('click', close);
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Sản phẩm - Phong Hòa Phát</title>
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 page-transition">
        <nav className="text-sm text-gray-600 mb-4">
          <a href="/">Trang chủ</a> / <span className="font-semibold">Sản phẩm</span>
        </nav>

        <div className="grid sm:grid-cols-2 gap-6">
          <article className="bg-white rounded-lg shadow product-card overflow-hidden flex flex-col h-full" data-product="chenMu">
            <img src="/images/product/chenMu/chenMu1.jpg" alt="Chén cao su hứng mủ" className="w-full h-56 object-cover" />
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex-grow">
                <h2 className="text-lg font-semibold mb-1">Chén cao su hứng mủ</h2>
                <p className="text-sm text-gray-600 mb-3">Chén cao su dùng để hứng mủ, bền, chịu nhiệt.</p>
                <ul className="text-sm text-gray-700 space-y-1 mb-4">
                  <li><strong>Chất liệu:</strong> Nhựa tổng hợp (dẻo)</li>
                  <li><strong>Dung tích:</strong> 1.5 L</li>
                </ul>
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-600 mb-2">Hình ảnh thực tế:</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <img src="/images/product/chenMu/chenMu1.jpg" alt="Chén cao su - góc chính" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/product/chenMu/chenMu1.jpg" />
                    <img src="/images/product/chenMu/chenCaoSu2.jpg" alt="Chén cao su - góc nghiêng" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/product/chenMu/chenCaoSu2.jpg" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-auto">
                <a href="/product-detail?product=chenMu" className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-center text-sm">Xem chi tiết</a>
                <a href="/contact?product=chenMu" className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-center text-sm">Yêu cầu báo giá</a>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow product-card overflow-hidden flex flex-col h-full" data-product="mangChanMua">
            <img src="/images/product/mangChanMua/mangChanMuaNgang.jpg" alt="Máng chắn mưa PE" className="w-full h-56 object-cover" />
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex-grow">
                <h2 className="text-lg font-semibold mb-1">Máng chắn mưa PE</h2>
                <p className="text-sm text-gray-600 mb-3">Máng PE chống thấm, bảo vệ mủ trong mùa mưa.</p>
                <ul className="text-sm text-gray-700 space-y-1 mb-4">
                  <li><strong>Chất liệu:</strong> Nhựa PE</li>
                  <li><strong>Kích thước chuẩn:</strong> 450 × 80 mm / 550 × 80 mm / 600 × 80 mm</li>
                </ul>
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-600 mb-2">Hình ảnh thực tế:</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <img src="/images/product/mangChanMua/mangChanMuaNgang.jpg" alt="Máng chắn mưa - góc ngang" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/product/mangChanMua/mangChanMuaNgang.jpg" />
                    <img src="/images/product/mangChanMua/mangChanMua.jpg" alt="Máng chắn mưa - góc dọc" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox="/images/product/mangChanMua/mangChanMua.jpg" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-auto">
                <a href="/product-detail?product=mangChanMua" className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-center text-sm">Xem chi tiết</a>
                <a href="/contact?product=mangChanMua" className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-center text-sm">Yêu cầu báo giá</a>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  )
}
