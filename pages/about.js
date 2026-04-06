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

        {/* Video short + detailed process videos */}
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
          <div className="max-w-xl mx-auto">
            <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border mb-4">
              <p className="text-sm text-gray-700 font-medium mb-3">Xem video ngắn về quy trình sản xuất của chúng tôi:</p>
              <div className="rounded-lg overflow-hidden border">
                {/* VIDEO 1: Tổng quan */}
                <div className="video-block not-playing" data-video-id="NNivheW6Qiw" data-youtube data-poster-custom="/images/page/abou/dongGoi.jpg">
                  <div className="video-inner">
                    <div className="yt-brand-cover" aria-hidden="true"></div>
                    <img className="video-poster" loading="lazy" alt="Poster" />
                    <button className="play-btn" aria-label="Play video ngắn"></button>
                    <button className="fs-btn" aria-label="Toàn màn hình" title="Toàn màn hình" style={{display:'none'}}>⤢</button>
                    <iframe src="" title="Video quy trình sản xuất" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen></iframe>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed videos */}
            <section id="video-quy-trinh" className="bg-white p-6 sm:p-8 rounded-lg shadow mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Video chi tiết quy trình sản xuất</h3>
              <div className="space-y-5">

                {/* VIDEO 2: Máy ép chén */}
                <div>
                  <h4 className="font-semibold mb-2">Máy ép chén cao su</h4>
                  <div className="video-block not-playing" data-video-id="9QxWV1E77is" data-youtube data-poster-custom="/images/page/abou/may/mayEpChen.jpg">
                    <div className="video-inner">
                      <div className="yt-brand-cover" aria-hidden="true"></div>
                      <img className="video-poster" loading="lazy" alt="Poster" />
                      <button className="play-btn" aria-label="Play"></button>
                      <button className="fs-btn" aria-label="Toàn màn hình" title="Toàn màn hình" style={{display:'none'}}>⤢</button>
                      <iframe src="" title="Máy ép chén" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>

                {/* VIDEO 3: Máy dập */}
                <div>
                  <h4 className="font-semibold mb-2">Máy dập cao su</h4>
                  <div className="video-block not-playing" data-video-id="9Hae-M9pJZE" data-youtube data-poster-custom="/images/page/abou/may/mayDap.jpg">
                    <div className="video-inner">
                      <div className="yt-brand-cover" aria-hidden="true"></div>
                      <img className="video-poster" loading="lazy" alt="Poster" />
                      <button className="play-btn" aria-label="Play"></button>
                      <button className="fs-btn" aria-label="Toàn màn hình" title="Toàn màn hình" style={{display:'none'}}>⤢</button>
                      <iframe src="" title="Máy dập" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>

                {/* VIDEO 4: Máy cuộn */}
                <div>
                  <h4 className="font-semibold mb-2">Máy cuộn cao su</h4>
                  <div className="video-block not-playing" data-video-id="rAyHbNkHD7I" data-youtube data-poster-custom="/images/page/abou/may/mayCuon.jpg">
                    <div className="video-inner">
                      <div className="yt-brand-cover" aria-hidden="true"></div>
                      <img className="video-poster" loading="lazy" alt="Poster" />
                      <button className="play-btn" aria-label="Play"></button>
                      <button className="fs-btn" aria-label="Toàn màn hình" title="Toàn màn hình" style={{display:'none'}}>⤢</button>
                      <iframe src="" title="Máy cuộn" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>

                {/* VIDEO 5: Đóng gói */}
                <div>
                  <h4 className="font-semibold mb-2">Sản xuất &amp; đóng gói</h4>
                  <div className="video-block not-playing" data-video-id="8OxbEvEaxHM" data-youtube data-poster-custom="/images/page/abou/may/dongGoi.jpg">
                    <div className="video-inner">
                      <div className="yt-brand-cover" aria-hidden="true"></div>
                      <img className="video-poster" loading="lazy" alt="Poster" />
                      <button className="play-btn" aria-label="Play"></button>
                      <button className="fs-btn" aria-label="Toàn màn hình" title="Toàn màn hình" style={{display:'none'}}>⤢</button>
                      <iframe src="" title="Đóng gói" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
