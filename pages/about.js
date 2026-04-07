import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    // Re-run legacy initializers on client navigation
    if (typeof window !== 'undefined') {
      try { if (window.initializeHeader) window.initializeHeader(); } catch(e){}

      // Lightbox for images with data-lightbox (make thumbnails keyboard accessible)
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
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn?.focus();
      }

      function open(e) {
        const src = e.currentTarget.dataset.lightbox || e.currentTarget.src;
        gallery = Array.from(document.querySelectorAll('img[data-lightbox]')).map(n => n.dataset.lightbox || n.src);
        currentIdx = gallery.indexOf(src);
        if (currentIdx === -1) currentIdx = 0;
        showAt(currentIdx);
      }

      function close() {
        if (!lightbox || !lightboxImg) return;
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
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

      const imgs = Array.from(document.querySelectorAll('img[data-lightbox]'));
      imgs.forEach((img, i) => {
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `Mở hình ${i + 1} / ${imgs.length}: ${img.alt || ''}`);
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
    }
  }, []);

  return (
    <>
      <Head>
        <title>Giới Thiệu — Phong Hòa Phát</title>
        <meta name="description" content="Phong Hòa Phát — vật tư ngành cao su" />
      </Head>

      <Header />

      <main id="main-content" className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div id="about-phonghoaphat" className="card p-6 sm:p-8 mb-6">
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
              <div className="grid grid-cols-2 gap-3 img-gallery mb-4 card p-3">
                <img src="/images/page/abou/chonNguyenLieuDauVao.jpg" alt="Nguyên liệu" loading="lazy" className="rounded-lg object-cover w-full h-24 sm:h-36 cursor-pointer" data-lightbox="/images/page/abou/chonNguyenLieuDauVao.jpg" />
                <img src="/images/page/abou/dongGoi.jpg" alt="Đóng gói" loading="lazy" className="rounded-lg object-cover w-full h-24 sm:h-36 cursor-pointer" data-lightbox="/images/page/abou/dongGoi.jpg" />
                <img src="/images/page/abou/giaCong.jpg" alt="Gia công" loading="lazy" className="rounded-lg object-cover w-full h-24 sm:h-36 cursor-pointer" data-lightbox="/images/page/abou/giaCong.jpg" />
                <img src="/images/page/abou/kiemDinh.jpg" alt="Kiểm định" loading="lazy" className="rounded-lg object-cover w-full h-24 sm:h-36 cursor-pointer" data-lightbox="/images/page/abou/kiemDinh.jpg" />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border card">
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

        {/* Quy trình sản xuất */}
        <section className="card p-6 sm:p-8 mb-6">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Quy trình sản xuất</h3>
          <div className="md:grid md:grid-cols-2 gap-6 items-start">
            <div className="space-y-5">
              <div className="flex gap-3 items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full step-num font-semibold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold">Chọn nguyên liệu đầu vào</h4>
                  <p className="text-gray-600 text-sm">Chúng tôi lựa chọn cao su nguyên sinh đạt tiêu chuẩn kỹ thuật, đảm bảo độ bền và tính đàn hồi cao cho từng sản phẩm.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full step-num font-semibold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold">Gia công &amp; tạo hình</h4>
                  <p className="text-gray-600 text-sm">Quy trình ép khuôn được thực hiện trên dây chuyền hiện đại, đảm bảo độ chính xác và đồng nhất.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full step-num font-semibold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold">Kiểm định chất lượng</h4>
                  <p className="text-gray-600 text-sm">Mỗi lô sản phẩm đều trải qua kiểm tra nghiêm ngặt về độ bền, độ dẻo và khả năng chịu nhiệt.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-12 h-12 flex items-center justify-center rounded-full step-num font-semibold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-semibold">Đóng gói &amp; giao hàng</h4>
                  <p className="text-gray-600 text-sm">Sản phẩm được đóng gói an toàn, giao hàng đúng thời gian và bảo đảm chất lượng đến tay khách hàng.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-4 md:mt-0">
              <div className="rounded-lg overflow-hidden border">
                <img src="/images/page/abou/may/mayDap1.jpg" alt="Banner quy trình sản xuất" className="object-cover w-full h-44 sm:h-64" loading="lazy" />
              </div>

              <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border">
                <p className="text-sm text-gray-700 font-medium mb-3">Xem video ngắn về quy trình sản xuất của chúng tôi:</p>
                <div className="rounded-lg overflow-hidden border">
                  {/* VIDEO 1: Tổng quan */}
                  <div className="video-block not-playing" data-video-id="NNivheW6Qiw" data-youtube data-poster-custom="/images/page/abou/dongGoi.jpg">
                    <div className="video-inner">
                      <div className="yt-brand-cover" aria-hidden="true"></div>
                      <button className="play-btn" aria-label="Play video ngắn"></button>
                      <button className="fs-btn" aria-label="Toàn màn hình" title="Toàn màn hình" style={{display:'none'}}>⤢</button>
                      <iframe title="Video quy trình sản xuất" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <a href="/contact" className="flex-1 px-3 py-3 text-center bg-green-600 text-white rounded font-medium">Yêu cầu báo giá</a>
              </div>
            </div>
          </div>
        </section>

        {/* Video short + detailed process videos */}
        <section className="card p-4 sm:p-6 mb-6">
          <div className="max-w-xl mx-auto">
            <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border mb-4">
              <p className="text-sm text-gray-700 font-medium mb-3">Xem video ngắn về quy trình sản xuất của chúng tôi:</p>
              <div className="rounded-lg overflow-hidden border">
                {/* VIDEO 1: Tổng quan */}
                <div className="video-block not-playing" data-video-id="NNivheW6Qiw" data-youtube data-poster-custom="/images/page/abou/dongGoi.jpg">
                  <div className="video-inner">
                    <div className="yt-brand-cover" aria-hidden="true"></div>
                    <button className="play-btn" aria-label="Play video ngắn"></button>
                    <button className="fs-btn" aria-label="Toàn màn hình" title="Toàn màn hình" style={{display:'none'}}>⤢</button>
                    <iframe title="Video quy trình sản xuất" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen></iframe>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed videos */}
            <section id="video-quy-trinh" className="card p-6 sm:p-8 mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Video chi tiết quy trình sản xuất</h3>
              <div className="space-y-5">

                {/* VIDEO 2: Máy ép chén */}
                <div>
                  <h4 className="font-semibold mb-2">Máy ép chén cao su</h4>
                  <div className="video-block not-playing" data-video-id="9QxWV1E77is" data-youtube data-poster-custom="/images/page/abou/may/mayEpChen.jpg">
                    <div className="video-inner">
                      <div className="yt-brand-cover" aria-hidden="true"></div>
                      <button className="play-btn" aria-label="Play"></button>
                      <button className="fs-btn" aria-label="Toàn màn hình" title="Toàn màn hình" style={{display:'none'}}>⤢</button>
                      <iframe title="Máy ép chén" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>

                {/* VIDEO 3: Máy dập */}
                <div>
                  <h4 className="font-semibold mb-2">Máy dập cao su</h4>
                  <div className="video-block not-playing" data-video-id="9Hae-M9pJZE" data-youtube data-poster-custom="/images/page/abou/may/mayDap.jpg">
                    <div className="video-inner">
                      <div className="yt-brand-cover" aria-hidden="true"></div>
                      <button className="play-btn" aria-label="Play"></button>
                      <button className="fs-btn" aria-label="Toàn màn hình" title="Toàn màn hình" style={{display:'none'}}>⤢</button>
                      <iframe title="Máy dập" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>

                {/* VIDEO 4: Máy cuộn */}
                <div>
                  <h4 className="font-semibold mb-2">Máy cuộn cao su</h4>
                  <div className="video-block not-playing" data-video-id="rAyHbNkHD7I" data-youtube data-poster-custom="/images/page/abou/may/mayCuon.jpg">
                      <div className="video-inner">
                      <div className="yt-brand-cover" aria-hidden="true"></div>
                      <button className="play-btn" aria-label="Play"></button>
                      <button className="fs-btn" aria-label="Toàn màn hình" title="Toàn màn hình" style={{display:'none'}}>⤢</button>
                      <iframe title="Máy cuộn" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>

                {/* VIDEO 5: Đóng gói */}
                <div>
                  <h4 className="font-semibold mb-2">Sản xuất &amp; đóng gói</h4>
                  <div className="video-block not-playing" data-video-id="8OxbEvEaxHM" data-youtube data-poster-custom="/images/page/abou/may/dongGoi.jpg">
                      <div className="video-inner">
                      <div className="yt-brand-cover" aria-hidden="true"></div>
                      <button className="play-btn" aria-label="Play"></button>
                      <button className="fs-btn" aria-label="Toàn màn hình" title="Toàn màn hình" style={{display:'none'}}>⤢</button>
                      <iframe title="Đóng gói" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </section>

        {/* CTA */}
        <section className="card p-4 sm:p-6 text-center">
          <div className="max-w-xl mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Bạn cần báo giá số lượng lớn?</h3>
            <p className="text-gray-600 mb-3 text-sm">Liên hệ để nhận bảng giá chi tiết và ưu đãi cho đại lý.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/contact" className="px-4 py-2 bg-green-600 text-white rounded">Yêu cầu báo giá</Link>
              <a href="https://phonghoap​hat.com/catalog.pdf" className="px-4 py-2 border rounded">Tải catalog</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
