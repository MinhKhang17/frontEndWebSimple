import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import VideoBlock from '../components/VideoBlock'
import { generateOGTags, generateStructuredData, getCanonicalUrl } from '../lib/seo'

export default function Home() {
  const title = 'Phong Hòa Phát — Vật tư ngành cao su | Chén hứng mủ, máng chắn mưa'
  const description = 'Phong Hòa Phát cung cấp vật tư khai thác mủ cao su: chén hứng mủ, máng chắn mưa, phụ kiện chuẩn chất lượng. Giao hàng nhanh, hỗ trợ kỹ thuật.'
  const canonicalUrl = getCanonicalUrl('/')
  
  const ogTags = generateOGTags({
    title,
    description,
    url: canonicalUrl,
  })
  
  const organizationSchema = generateStructuredData('Organization', {
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84-908-093-598',
      contactType: 'Sales',
      name: 'Phong Hòa Phát',
    }
  })

  const localBusinessSchema = generateStructuredData('LocalBusiness', {
    telephone: '+84-908-093-598',
    priceRange: '$$',
  })

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="vật tư cao su, chén hứng mủ, máng chắn mưa, phụ kiện cao su, khai thác mủ, tiêu chuẩn ISO" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        {Object.entries(ogTags).map(([key, value]) => (
          <meta key={key} property={key} content={value} />
        ))}
        
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(organizationSchema)}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(localBusinessSchema)}} />
        
        {/* Additional SEO */}
        <meta name="author" content="Phong Hòa Phát" />
        <meta name="language" content="Vietnamese" />
        <meta name="revisit-after" content="7 days" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="site-hero card">
          <div className="hero-content">
            <h1>Giải pháp vật tư bền bỉ cho vườn cao su</h1>
            <p>Sản phẩm của chúng tôi: chén hứng mủ, máng chắn mưa và phụ kiện hỗ trợ. Chất lượng kiểm định, giao nhanh, hỗ trợ kỹ thuật.</p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/product" className="cta">Xem sản phẩm</Link>
              <Link href="/contact" className="cta" style={{background:'#ffffff', color:'#059669', boxShadow:'none'}}>Liên hệ báo giá</Link>
            </div>
          </div>
          <div className="hero-media">
            <img src="/images/page/page1.jpg" alt="Phong Hòa Phát - Banner" loading="lazy" />
          </div>
        </section>

        {/* Floating white info card under hero */}
        <section className="hero-info-card">
          <div className="max-w-7xl mx-auto">
            <div className="card">
              <div>
                <h3>Phong Hòa Phát — Vật tư ngành cao su</h3>
                <p>Phong Hòa Phát chuyên sản xuất vật tư phục vụ khai thác mủ cao su. Quy trình sản xuất hiện đại, tiêu chuẩn chất lượng và dịch vụ hậu mãi tận tâm.</p>
              </div>
              <a href="tel:0908093598" className="phone-cta">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12 1.05.48 2.07 1.06 3.02a2 2 0 0 1-.45 2.11L9.91 11.09a16 16 0 0 0 6 6l1.24-1.24a2 2 0 0 1 2.11-.45c.95.58 1.97.94 3.02 1.06A2 2 0 0 1 22 16.92z" fill="#fff"></path></svg>
                <span>0908 093 598</span>
              </a>
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
            <Link href="/product" className="text-green-600 hover:text-green-700 font-medium">Xem tất cả →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="product-card bg-white rounded-lg shadow overflow-hidden">
              <Link href="/product#chen-01" className="block h-44 overflow-hidden bg-gray-50"><img src="/images/product/chenMu/chenMu1.jpg" alt="Chén cao su" className="w-full h-full object-contain md:object-cover" loading="lazy" /></Link>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Chén hứng mủ</h4>
                <p className="text-sm text-gray-600 mb-4">Chén cao su bền, thiết kế chuẩn giúp tối ưu lượng mủ hứng.</p>
                <div className="flex gap-2">
                  <Link href="/product#chen-01" className="flex-1 text-center bg-green-600 text-white px-3 py-2 rounded">Chi tiết</Link>
                  <Link href="/contact?product=chenMu" className="flex-1 text-center border border-gray-300 px-3 py-2 rounded">Báo giá</Link>
                </div>
              </div>
            </article>

            <article className="product-card bg-white rounded-lg shadow overflow-hidden">
              <Link href="/product#mang-01" className="block h-44 overflow-hidden bg-gray-50"><img src="/images/product/mangChanMua/mangChanMua.jpg" alt="Máng chắn mưa" className="w-full h-full object-contain md:object-cover" loading="lazy" /></Link>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Máng chắn mưa</h4>
                <p className="text-sm text-gray-600 mb-4">Bảo vệ mủ khỏi mưa, vật liệu PE bền, dễ lắp đặt.</p>
                <div className="flex gap-2">
                  <Link href="/product#mang-01" className="flex-1 text-center bg-green-600 text-white px-3 py-2 rounded">Chi tiết</Link>
                  <Link href="/contact?product=mangChanMua" className="flex-1 text-center border border-gray-300 px-3 py-2 rounded">Báo giá</Link>
                </div>
              </div>
            </article>

            {/* Sản phẩm thương mại */}
            <article className="product-card bg-white rounded-lg shadow overflow-hidden">
              <Link href="/product-detail?product=mangDanMu" className="block h-44 overflow-hidden bg-gray-50"><img src="/images/thuongmai/mangdanmu/mangdanmu1.jpg" alt="Máng dẫn mủ" className="w-full h-full object-contain md:object-cover" loading="lazy" /></Link>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Máng dẫn mủ</h4>
                <p className="text-sm text-gray-600 mb-4">Máng dẫn mủ cao su chuyên dụng, dẫn mủ vào thùng chứa hiệu quả.</p>
                <div className="flex gap-2">
                  <Link href="/product-detail?product=mangDanMu" className="flex-1 text-center bg-green-600 text-white px-3 py-2 rounded">Chi tiết</Link>
                  <Link href="/contact?product=mangDanMu" className="flex-1 text-center border border-gray-300 px-3 py-2 rounded">Báo giá</Link>
                </div>
              </div>
            </article>

            <article className="product-card bg-white rounded-lg shadow overflow-hidden">
              <Link href="/product-detail?product=keo" className="block h-44 overflow-hidden bg-gray-50"><img src="/images/thuongmai/keo/keo.jpg" alt="Keo" className="w-full h-full object-contain md:object-cover" loading="lazy" /></Link>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Keo</h4>
                <p className="text-sm text-gray-600 mb-4">Keo chuyên dụng sản xuất và sửa chữa sản phẩm cao su.</p>
                <div className="flex gap-2">
                  <Link href="/product-detail?product=keo" className="flex-1 text-center bg-green-600 text-white px-3 py-2 rounded">Chi tiết</Link>
                  <Link href="/contact?product=keo" className="flex-1 text-center border border-gray-300 px-3 py-2 rounded">Báo giá</Link>
                </div>
              </div>
            </article>

            <article className="product-card bg-white rounded-lg shadow overflow-hidden">
              <Link href="/product-detail?product=kieng" className="block h-44 overflow-hidden bg-gray-50"><img src="/images/thuongmai/kieng/kieng.png" alt="Kiềng" className="w-full h-full object-contain md:object-cover" loading="lazy" /></Link>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Kiềng</h4>
                <p className="text-sm text-gray-600 mb-4">Kiềng cao su định vị chén và máng chắn mưa trên cây.</p>
                <div className="flex gap-2">
                  <Link href="/product-detail?product=kieng" className="flex-1 text-center bg-green-600 text-white px-3 py-2 rounded">Chi tiết</Link>
                  <Link href="/contact?product=kieng" className="flex-1 text-center border border-gray-300 px-3 py-2 rounded">Báo giá</Link>
                </div>
              </div>
            </article>

            <article className="product-card bg-white rounded-lg shadow overflow-hidden">
              <Link href="/product-detail?product=dayNilon" className="block h-44 overflow-hidden bg-gray-50"><img src="https://images.pexels.com/photos/32063437/pexels-photo-32063437.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Dây nilon cột" className="w-full h-full object-contain md:object-cover" loading="lazy" /></Link>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Dây nilon cột</h4>
                <p className="text-sm text-gray-600 mb-4">Dây nilon buộc cột cây, dụng cụ chuyên dụng trong khai thác mủ.</p>
                <div className="flex gap-2">
                  <Link href="/product-detail?product=dayNilon" className="flex-1 text-center bg-green-600 text-white px-3 py-2 rounded">Chi tiết</Link>
                  <Link href="/contact?product=dayNilon" className="flex-1 text-center border border-gray-300 px-3 py-2 rounded">Báo giá</Link>
                </div>
              </div>
            </article>

          </div>
        </section>

        {/* Quy trình sản xuất */}
        <section className="mt-10 card p-6 sm:p-8">
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
                <img src="/images/page/abou/may/mayDap1.jpg" alt="Quy trình sản xuất" className="object-cover w-full h-44 sm:h-64" loading="lazy" />
              </div>

              <div className="flex gap-3">
                <Link href="/about" className="flex-1 px-4 py-2 text-center bg-green-600 text-white rounded font-medium">Xem chi tiết</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Video short + detailed process videos */}
        <section className="card p-4 sm:p-6 mb-6 mt-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border mb-6">
              <p className="text-sm text-gray-700 font-medium mb-3">Xem video ngắn về quy trình sản xuất của chúng tôi:</p>
              <VideoBlock 
                videoId="NNivheW6Qiw" 
                title="Video quy trình sản xuất"
                posterImage="/images/page/abou/dongGoi.jpg"
              />
            </div>

            {/* Detailed videos */}
            <section id="video-quy-trinh" className="card p-6 sm:p-8 mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Video chi tiết quy trình sản xuất</h3>
              <div className="space-y-5">

                {/* VIDEO 1: Máy ép chén */}
                <div>
                  <h4 className="font-semibold mb-2">Máy ép chén cao su</h4>
                  <VideoBlock 
                    videoId="9QxWV1E77is" 
                    title="Máy ép chén"
                    posterImage="/images/page/abou/may/mayEpChen.jpg"
                  />
                </div>

                {/* VIDEO 2: Máy dập */}
                <div>
                  <h4 className="font-semibold mb-2">Máy dập cao su</h4>
                  <VideoBlock 
                    videoId="9Hae-M9pJZE" 
                    title="Máy dập"
                    posterImage="/images/page/abou/may/mayDap.jpg"
                  />
                </div>

                {/* VIDEO 3: Máy cuộn */}
                <div>
                  <h4 className="font-semibold mb-2">Máy cuộn cao su</h4>
                  <VideoBlock 
                    videoId="rAyHbNkHD7I" 
                    title="Máy cuộn"
                    posterImage="/images/page/abou/may/mayCuon.jpg"
                  />
                </div>

                {/* VIDEO 4: Đóng gói */}
                <div>
                  <h4 className="font-semibold mb-2">Sản xuất &amp; đóng gói</h4>
                  <VideoBlock 
                    videoId="8OxbEvEaxHM" 
                    title="Đóng gói"
                    posterImage="/images/page/abou/may/dongGoi.jpg"
                  />
                </div>

              </div>
            </section>
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
