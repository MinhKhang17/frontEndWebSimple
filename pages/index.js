import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sản phẩm vật tư khai thác mủ cao su — Phong Hòa Phát</title>
        <meta name="description" content="Đồng hành cùng người nông dân — cung cấp vật tư, dụng cụ khai thác mủ cao su chất lượng, giao nhanh, giá hợp lý tại Việt Nam." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero */}
        <section className="rounded-lg overflow-hidden relative shadow-lg mb-10">
          <a href="/product">
            <img src="/images/page/page1.jpg" alt="Banner Phong Hòa Phát" className="w-full h-[280px] sm:h-[340px] md:h-[420px] object-cover" loading="eager" />
          </a>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 sm:from-black/50 to-transparent flex items-center">
            <div className="px-6 sm:ml-8 max-w-xl text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Chất Lượng Tạo Nên Sự Bền Vững</h1>
              <p className="text-base sm:text-lg opacity-95 mb-4">Phụ kiện cao su chất lượng cao - Đồng hành cùng sự phát triển của ngành cao su Việt Nam</p>
              <a href="/product" className="inline-block bg-green-600 hover:bg-green-700 transition-colors px-6 py-3 rounded-lg text-white font-medium">Xem sản phẩm</a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-white p-6 rounded-lg shadow mb-10">
          <div className="md:flex md:items-center md:justify-between md:gap-8">
            <div className="md:flex-1 mb-4 md:mb-0">
              <h2 className="text-2xl font-semibold mb-2">Phong Hòa Phát — Vật tư ngành cao su</h2>
              <p className="text-gray-600">Phong Hòa Phát chuyên sản xuất vật tư phục vụ khai thác mủ cao su: chén cao su, máng chắn mưa. Quy trình sản xuất hiện đại, tiêu chuẩn chất lượng và dịch vụ hậu mãi tận tâm.</p>
            </div>
            <div className="text-center md:text-right">
              <a href="/contact" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-medium transition-colors">0908 093 598</a>
            </div>
          </div>
        </section>

        {/* Example products (simplified) */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Sản phẩm tiêu biểu</h3>
            <a href="/product" className="text-green-600 hover:text-green-700 font-medium text-sm">Xem tất cả →</a>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <article className="bg-white rounded-lg shadow product-card overflow-hidden flex flex-col h-full">
              <div className="grid md:grid-cols-5 gap-0 flex-grow">
                <div className="md:col-span-2 relative overflow-hidden bg-gray-100">
                  <a href="/product#chen-01" className="block h-full">
                    <img src="/images/product/chenMu/chenMu1.jpg" alt="Chén cao su" className="w-full h-full object-contain md:object-cover min-h-[200px] md:min-h-0" />
                  </a>
                </div>
                <div className="md:col-span-3 p-5 flex flex-col justify-between h-full">
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Chén cao su chịu nhiệt</h4>
                    <p className="text-sm text-gray-600 mb-4">Chén cao su chất lượng cao, chịu nhiệt tốt, dùng để hứng mủ cao su hiệu quả, bền bỉ.</p>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <a href="/product#chen-01" className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium text-sm transition-colors">Chi tiết</a>
                    <a href="/contact?product=chenMu" className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 hover:border-green-600 hover:text-green-600 rounded font-medium text-sm transition-colors">Báo giá</a>
                  </div>
                </div>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow product-card overflow-hidden flex flex-col h-full">
              <div className="grid md:grid-cols-5 gap-0 flex-grow">
                <div className="md:col-span-2 relative overflow-hidden bg-gray-100">
                  <a href="/product#mang-01" className="block h-full">
                    <img src="/images/product/mangChanMua/mangChanMua.jpg" alt="Máng chắn mưa" className="w-full h-full object-contain md:object-cover min-h-[200px] md:min-h-0" />
                  </a>
                </div>
                <div className="md:col-span-3 p-5 flex flex-col justify-between h-full">
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Máng chắn mưa PE</h4>
                    <p className="text-sm text-gray-600 mb-4">Máng nhựa PE nhẹ, bền, chống thấm tốt, bảo vệ mủ cao su trong mùa mưa hiệu quả.</p>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <a href="/product#mang-01" className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium text-sm transition-colors">Chi tiết</a>
                    <a href="/contact?product=mangChanMua" className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 hover:border-green-600 hover:text-green-600 rounded font-medium text-sm transition-colors">Báo giá</a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
