import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const productData = {
  chenMu: {
    name: "Chén cao su hứng mủ",
    description: "Chén cao su dùng để hứng mủ, thiết kế đơn giản, bền, chịu nhiệt phù hợp khai thác mủ.",
    image: "/images/product/chenMu/chenMu1.jpg",
    thumbnails: [
      { src: "/images/product/chenMu/chenMu1.jpg", alt: "Chén cao su - góc chính" },
      { src: "/images/product/chenMu/chenCaoSu2.jpg", alt: "Chén cao su - góc nghiêng" }
    ],
    features: ["Độ bền cao", "Chịu nhiệt tốt", "Thiết kế tối ưu cho hứng mủ"],
    specs: {
      "Chất liệu": "Nhựa tổng hợp (dẻo)",
      "Dung tích": "1.5 L",
      "Màu sắc": "Xám đen",
    }
  },
  mangChanMua: {
    name: "Máng chắn mưa PE",
    description: "Máng chắn mưa làm từ PE, bảo vệ mủ khỏi nước mưa; có sẵn kích thước phổ thông hoặc đặt theo yêu cầu.",
    image: "/images/product/mangChanMua/mangChanMuaNgang.jpg",
    thumbnails: [
      { src: "/images/product/mangChanMua/mangChanMuaNgang.jpg", alt: "Máng chắn mưa - góc ngang" },
      { src: "/images/product/mangChanMua/mangChanMua.jpg", alt: "Máng chắn mưa - góc dọc" }
    ],
    features: ["Chống thấm nước", "Dễ lắp đặt", "Bền trong điều kiện thời tiết"],
    specs: {
      "Chất liệu": "Nhựa PE",
      "Kích thước chuẩn": "450 x 80 mm; 550 x 80 mm; 600 x 80 mm",
      "Dung sai": "±1 mm",
    }
  },
  mangDanMu: {
    name: "Máng dẫn mủ",
    description: "Máng dẫn mủ cao su chuyên dụng, giúp dẫn mủ vào thùng chứa hiệu quả và không lãng phí.",
    image: "/images/thuongmai/mangdanmu/mangdanmu1.jpg",
    thumbnails: [
      { src: "/images/thuongmai/mangdanmu/mangdanmu1.jpg", alt: "Máng dẫn mủ - góc 1" },
      { src: "/images/thuongmai/mangdanmu/mangdanmu2.jpg", alt: "Máng dẫn mủ - góc 2" }
    ],
    features: ["Dẫn mủ hiệu quả", "Chất liệu PVC bền", "Tùy chỉnh kích thước"],
    specs: {
      "Chất liệu": "Nhựa PVC",
      "Chiều dài": "Tùy tính",
      "Độ cong": "Tối ưu cho dòng chảy mủ",
    }
  },
  keo: {
    name: "Keo",
    description: "Keo chuyên dụng dùng trong quá trình sản xuất và sửa chữa sản phẩm cao su.",
    image: "/images/thuongmai/keo/keo.jpg",
    thumbnails: [
      { src: "/images/thuongmai/keo/keo.jpg", alt: "Keo" },
      { src: "/images/thuongmai/keo/keo2.jpg", alt: "Keo - lọ" }
    ],
    features: ["Dính chắc", "Chịu nước tốt", "Thích hợp cho cao su"],
    specs: {
      "Loại": "Keo dán chuyên dụng",
      "Công dụng": "Dán, sửa chữa sản phẩm cao su",
      "Duyên hạn": "Lâu dài",
    }
  },
  kieng: {
    name: "Kiềng",
    description: "Kiềng cao su hỗ trợ định vị chén và máng chắn mưa trên thân cây cao su.",
    image: "/images/thuongmai/kieng/kieng.png",
    thumbnails: [
      { src: "/images/thuongmai/kieng/kieng.png", alt: "Kiềng cao su" }
    ],
    features: ["Định vị chắc chắn", "Chất liệu cao su bền", "Dễ lắp đặt"],
    specs: {
      "Chất liệu": "Cao su, nhựa tổng hợp",
      "Chức năng": "Định vị, hỗ trợ lắp thiết bị",
      "Kích thước": "Tiêu chuẩn, tùy chỉnh được",
    }
  },
  dayNilon: {
    name: "Dây nilon cột",
    description: "Dây nilon chuyên dụng để buộc cột cây, chứ các dụng cụ trong khai thác mủ.",
    image: "/images/product/dayNilon/dayNilon1.jpg",
    thumbnails: [
      { src: "/images/product/dayNilon/dayNilon1.jpg", alt: "Dây nilon cột" }
    ],
    features: ["Độ bền cao", "Chịu thời tiết tốt", "Đa dạng kích thước"],
    specs: {
      "Chất liệu": "Nilon, polypropylene",
      "Kích thước": "Từ 3mm - 10mm",
      "Độ chịu lực": "Tùy kích thước",
    }
  },
  khac: {
    name: "Khác - Phụ kiện & công cụ",
    description: "Các sản phẩm hỗ trợ khác: phân bón, dao cạo mủ, kim bấm dây và nhiều phụ kiện khác.",
    image: "/images/product/khac/khac1.jpg",
    thumbnails: [
      { src: "/images/product/khac/khac1.jpg", alt: "Phụ kiện khác" }
    ],
    features: ["Đa dạng sản phẩm", "Hỗ trợ toàn diện", "Giá cạnh tranh"],
    specs: {
      "Bao gồm": "Phân bón, dao cạo mủ, kim bấm, và khác",
      "Công dụng": "Hỗ trợ khai thác, chăm sóc cây",
      "Liên hệ": "Để biết danh sách đầy đủ",
    }
  }
};

export default function ProductDetail() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.product;
    setProductId(id);
    const p = productData[id];
    if (!p) {
      router.replace('/product');
      return;
    }
    setProduct(p);
    // small page transition effect
    setTimeout(() => {
      const el = document.querySelector('.page-transition');
      if (el) el.classList.add('loaded');
    }, 100);

    // initialize lightbox for thumbnails (keyboard accessible, lazy thumbnails)
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
      // move focus to close button for accessibility
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

    function close() {
      if (!lightbox || !lightboxImg) return;
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
      lightboxImg.src = '';
      currentIdx = -1;
    }

    function keyHandler(e) {
      if (!lightbox || !lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') { close(); return; }
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

    closeBtn?.addEventListener('click', close);
    function handleLightboxClick(e) { if (e.target === lightbox) close(); }
    lightbox?.addEventListener('click', handleLightboxClick);
    document.addEventListener('keydown', keyHandler);

    return () => {
      thumbHandlers.forEach(h => { h.el.removeEventListener('click', h.onClick); h.el.removeEventListener('keydown', h.onKey); });
      closeBtn?.removeEventListener('click', close);
      lightbox?.removeEventListener('click', handleLightboxClick);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [router.isReady, router.query]);

  if (!product) return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">Loading…</main>
      <Footer />
    </>
  );

  return (
    <>
      <Head>
        <title>{product.name} — Phong Hòa Phát</title>
        <meta name="description" content={product.description} />
      </Head>

      <Header />

      <main id="main-content" className="max-w-6xl mx-auto px-4 py-8 page-transition">
        <nav className="text-sm text-gray-600 mb-4">
          <a href="/">Trang chủ</a> / <a href="/product">Sản phẩm</a> / <span className="font-semibold">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="card overflow-hidden">
            <div className="bg-gray-100">
              <img src={product.image} alt={product.name} className="w-full h-72 object-cover" loading="eager" />
            </div>

            <div className="p-4 border-t">
              <p className="text-xs font-medium text-gray-600 mb-2">Hình ảnh thực tế:</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.thumbnails.map((t, i) => (
                  <img key={i} src={t.src} alt={t.alt} loading="lazy" className="h-20 w-20 object-cover rounded cursor-pointer" data-lightbox={t.src} />
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Mới</span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">{product.description}</p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-lg mb-4">Đặc điểm nổi bật</h3>
                <ul className="space-y-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">{f}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <a href={`/contact?product=${productId}`} className="btn-primary">Yêu cầu báo giá</a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-8">
              <h2 className="text-xl font-semibold mb-6">Thông số kỹ thuật</h2>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([k,v]) => (
                    <tr className="hover:bg-gray-50" key={k}><td className="py-3 font-medium">{k}</td><td className="py-3 text-gray-600">{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card p-8">
              <h2 className="text-xl font-semibold mb-6">Quy trình sản xuất</h2>
              <ol className="space-y-6 list-none">
                <li className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">1</div><div><h3 className="font-medium">Chuẩn bị nguyên liệu</h3><p className="text-sm text-gray-600">Lựa chọn cao su và vật tư đạt tiêu chuẩn.</p></div></li>
                <li className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">2</div><div><h3 className="font-medium">Gia công & tạo hình</h3><p className="text-sm text-gray-600">Cắt, ép khuôn hoặc đúc theo mẫu.</p></div></li>
                <li className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">3</div><div><h3 className="font-medium">Hoàn thiện & xử lý bề mặt</h3><p className="text-sm text-gray-600">Xử lý bề mặt, cắt tỉa và kiểm tra.</p></div></li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
