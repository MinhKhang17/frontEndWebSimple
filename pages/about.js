import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    // Re-run legacy initializers on client navigation
    try { if (window.initializeHeader) window.initializeHeader(); } catch(e){}
    try { if (window.initVideos) window.initVideos(); } catch(e){}

    // Lightbox for images with data-lightbox
    const lightbox = document.getElementById('img-lightbox');
    const lightboxImg = lightbox?.querySelector('img');
    const closeBtn = lightbox?.querySelector('.close-btn');

    function open(e) {
      const src = e.currentTarget.dataset.lightbox || e.currentTarget.src;
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = src;
      lightboxImg.alt = e.currentTarget.alt || '';
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      if (!lightbox || !lightboxImg) return;
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    }

    const imgs = Array.from(document.querySelectorAll('img[data-lightbox]'));
    imgs.forEach(img => img.addEventListener('click', open));
    closeBtn?.addEventListener('click', close);
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    const keyHandler = (e) => { if (e.key === 'Escape' && lightbox?.classList.contains('active')) close(); };
    document.addEventListener('keydown', keyHandler);

    return () => {
      imgs.forEach(img => img.removeEventListener('click', open));
      closeBtn?.removeEventListener('click', close);
      lightbox?.removeEventListener('click', close);
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Giới Thiệu — Phong Hòa Phát</title>
        <meta name="description" content="Phong Hòa Phát — vật tư ngành cao su" />
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div id="about-phonghoaphat" className="bg-white p-6 sm:p-8 rounded-lg shadow mb-6">
          <div className="md:flex md:items-start md:gap-8">
            <div className="md:flex-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Công ty TNHH Phong Hòa Phát</h2>
              <p className="text-gray-700 text-sm sm:text-base mb-4">
                Phong Hòa Phát chuyên sản xuất và cung cấp vật tư phục vụ khai thác mủ cao su.
                Chúng tôi tập trung vào các dòng sản phẩm thiết yếu cho vườn cao su: <strong>chén hứng mủ, máng chắn mưa</strong> cùng nhiều phụ kiện hỗ trợ khác.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold mb-1">Sản phẩm chính</h4>
                  <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
                    <li>Chén hứng mủ (nhựa & cao su chịu nhiệt)</li>
                    <li>Máng chắn mưa PE</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Cam kết chất lượng</h4>
                  <p className="text-sm text-gray-600">Mọi sản phẩm đều trải qua kiểm định cơ lý và thử nghiệm thực địa để đảm bảo độ bền, khả năng chịu nhiệt và an toàn cho người thu hoạch.</p>
                </div>
              </div>

              <p className="text-gray-700 text-sm sm:text-base mb-4">
                Sứ mệnh của chúng tôi là <strong>đồng hành cùng người nông dân</strong> bằng các giải pháp vật tư bền vững, giúp tối đa hóa hiệu suất thu hoạch và giảm chi phí vận hành.
              </p>

              <div className="flex gap-3 mt-3">
                <a href="/contact" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium">Liên hệ báo giá</a>
                <a href="/about" className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:text-black hover:border-gray-500 px-4 py-2 rounded font-medium">Chi tiết</a>
              </div>
            </div>

            <aside className="md:w-80 mt-6 md:mt-0">
              <div className="grid grid-cols-2 gap-3 img-gallery mb-4">
                <img src="/images/page/abou/chonNguyenLieuDauVao.jpg" alt="Nguyên liệu" className="rounded-lg object-cover w-full h-24 sm:h-36 cursor-pointer" data-lightbox="/images/page/abou/chonNguyenLieuDauVao.jpg" />
                <img src="/images/page/abou/dongGoi.jpg" alt="Đóng gói" className="rounded-lg object-cover w-full h-24 sm:h-36 cursor-pointer" data-lightbox="/images/page/abou/dongGoi.jpg" />
                <img src="/images/page/abou/giaCong.jpg" alt="Gia công" className="rounded-lg object-cover w-full h-24 sm:h-36 cursor-pointer" data-lightbox="/images/page/abou/giaCong.jpg" />
                <img src="/images/page/abou/kiemDinh.jpg" alt="Kiểm định" className="rounded-lg object-cover w-full h-24 sm:h-36 cursor-pointer" data-lightbox="/images/page/abou/kiemDinh.jpg" />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <h5 className="text-sm font-semibold mb-2">Thông tin nhanh</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Thành lập:</strong> 2012</li>
                  <li><strong>Phục vụ:</strong> Vườn cao su, nhà máy, đại lý</li>
                  <li><strong>Sản xuất:</strong> Tại Việt Nam — kiểm soát toàn bộ quy trình</li>
                  <li><strong>Hỗ trợ:</strong> Tư vấn kỹ thuật &amp; đặt hàng theo kích thước</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>

        {/* Additional sections (process videos etc.) can remain static as in original */}
      </main>

      <Footer />
    </>
  )
}
