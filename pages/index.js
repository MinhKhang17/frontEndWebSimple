import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Phong Hòa Phát — Vật tư ngành cao su</title>
        <meta name="description" content="Phong Hòa Phát cung cấp vật tư khai thác mủ: chén, máng chắn mưa, phụ kiện chuẩn chất lượng." />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative mt-8 rounded-xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-r from-green-700/90 to-green-600/80 text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">Giải pháp vật tư bền bỉ cho vườn cao su</h1>
              <p className="text-base sm:text-lg opacity-95 mb-6">Sản phẩm của chúng tôi: chén hứng mủ, máng chắn mưa và phụ kiện hỗ trợ. Chất lượng kiểm định, giao nhanh, hỗ trợ kỹ thuật.</p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/product"><a className="inline-block bg-white text-green-700 px-5 py-3 rounded-lg font-semibold shadow">Xem sản phẩm</a></Link>
                <Link href="/contact"><a className="inline-block border border-white/30 text-white px-5 py-3 rounded-lg">Liên hệ báo giá</a></Link>
              </div>
            </div>
            <div className="relative">
              <img src="/images/page/page1.jpg" alt="Phong Hòa Phát - Banner" className="w-full h-80 md:h-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Sản phẩm đạt chuẩn</h3>
            <p className="text-sm text-gray-600">Sản xuất theo quy trình kiểm soát chất lượng nghiêm ngặt, vật liệu bền, chịu nhiệt và an toàn.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Giao hàng nhanh</h3>
            <p className="text-sm text-gray-600">Hệ thống giao vận linh hoạt, phục vụ trên toàn quốc với thời gian nhanh chóng.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Hỗ trợ kỹ thuật</h3>
            <p className="text-sm text-gray-600">Tư vấn lắp đặt, chọn mã sản phẩm phù hợp, hỗ trợ sau bán hàng tận tâm.</p>
          </div>
        </section>

        {/* Featured products */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Sản phẩm tiêu biểu</h2>
            <Link href="/product"><a className="text-green-600 hover:text-green-700 font-medium">Xem tất cả →</a></Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="bg-white rounded-lg shadow overflow-hidden">
              <Link href="/product#chen-01"><a className="block h-44 overflow-hidden bg-gray-50"><img src="/images/product/chenMu/chenMu1.jpg" alt="Chén cao su" className="w-full h-full object-contain md:object-cover" loading="lazy" /></a></Link>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Chén hứng mủ</h4>
                <p className="text-sm text-gray-600 mb-4">Chén cao su bền, thiết kế chuẩn giúp tối ưu lượng mủ hứng.</p>
                <div className="flex gap-2">
                  <Link href="/product#chen-01"><a className="flex-1 text-center bg-green-600 text-white px-3 py-2 rounded">Chi tiết</a></Link>
                  <Link href="/contact?product=chenMu"><a className="flex-1 text-center border border-gray-300 px-3 py-2 rounded">Báo giá</a></Link>
                </div>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow overflow-hidden">
              <Link href="/product#mang-01"><a className="block h-44 overflow-hidden bg-gray-50"><img src="/images/product/mangChanMua/mangChanMua.jpg" alt="Máng chắn mưa" className="w-full h-full object-contain md:object-cover" loading="lazy" /></a></Link>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Máng chắn mưa</h4>
                <p className="text-sm text-gray-600 mb-4">Bảo vệ mủ khỏi mưa, vật liệu PE bền, dễ lắp đặt.</p>
                <div className="flex gap-2">
                  <Link href="/product#mang-01"><a className="flex-1 text-center bg-green-600 text-white px-3 py-2 rounded">Chi tiết</a></Link>
                  <Link href="/contact?product=mangChanMua"><a className="flex-1 text-center border border-gray-300 px-3 py-2 rounded">Báo giá</a></Link>
                </div>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow overflow-hidden">
              <a className="block h-44 overflow-hidden bg-gray-50" href="/product"><img src="/images/page/page2.jpg" alt="Phụ kiện" className="w-full h-full object-cover" loading="lazy" /></a>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Phụ kiện &amp; thay thế</h4>
                <p className="text-sm text-gray-600 mb-4">Đa dạng phụ kiện phục vụ thu hoạch và bảo trì thiết bị.</p>
                <div className="flex gap-2">
                  <Link href="/product"><a className="flex-1 text-center bg-green-600 text-white px-3 py-2 rounded">Chi tiết</a></Link>
                  <Link href="/contact"><a className="flex-1 text-center border border-gray-300 px-3 py-2 rounded">Báo giá</a></Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Video teaser */}
        <section className="mt-10 bg-white p-6 rounded-lg shadow">
          <div className="md:flex md:items-center md:gap-8">
            <div className="md:flex-1">
              <h3 className="text-xl font-semibold mb-2">Video quy trình sản xuất</h3>
              <p className="text-sm text-gray-600 mb-4">Xem nhanh quy trình sản xuất và khâu kiểm định chất lượng sản phẩm tại nhà máy.</p>
            </div>
            <div className="md:w-96">
              <div className="video-block not-playing" data-video-id="NNivheW6Qiw" data-youtube data-poster-custom="/images/page/abou/dongGoi.jpg">
                <div className="video-inner">
                  <div className="yt-brand-cover" aria-hidden="true"></div>
                  <img className="video-poster" loading="lazy" alt="Poster" />
                  <button className="play-btn" aria-label="Play video"></button>
                  <button className="fs-btn" aria-label="Toàn màn hình" title="Toàn màn hình" style={{display:'none'}}>⤢</button>
                  <iframe title="Video quy trình" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 py-8 px-6 rounded-lg bg-green-600 text-white text-center">
          <h3 className="text-2xl font-semibold mb-3">Cần tư vấn chọn sản phẩm?</h3>
          <p className="mb-4">Gọi ngay để được tư vấn kỹ thuật và nhận báo giá nhanh chóng.</p>
          <a href="/contact" className="inline-block bg-white text-green-700 px-6 py-3 rounded-lg font-semibold">Liên hệ</a>
        </section>

      </main>

      <Footer />
    </>
  )
}
