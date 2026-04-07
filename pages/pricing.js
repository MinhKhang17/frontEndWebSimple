import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Bảng giá — Phong Hòa Phát</title>
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Bảng giá</h1>

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Sản phẩm</th>
                <th className="p-3 text-left">Đơn vị</th>
                <th className="p-3 text-left">Giá</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b bg-blue-50"><td className="p-3 font-semibold text-blue-900">SẢN PHẨM CỦA XƯỞNG</td><td colSpan="2" className="p-3"></td></tr>
              <tr className="border-b"><td className="p-3">Chén hứng mủ cao su</td><td className="p-3">Cái</td><td className="p-3 text-red-600 font-medium">Liên hệ</td></tr>
              <tr className="border-b"><td className="p-3">Máng chắn mưa cây cao su</td><td className="p-3">Kg</td><td className="p-3 text-red-600 font-medium">Liên hệ</td></tr>
              
              <tr className="border-b bg-gray-50"><td className="p-3 font-semibold text-gray-900">SẢN PHẨM THƯƠNG MẠI</td><td colSpan="2" className="p-3"></td></tr>
              <tr className="border-b"><td className="p-3">Máng dẫn mủ</td><td className="p-3">Bộ</td><td className="p-3 text-red-600 font-medium">Liên hệ</td></tr>
              <tr className="border-b"><td className="p-3">Keo</td><td className="p-3">Lọ / Tuýp</td><td className="p-3 text-red-600 font-medium">Liên hệ</td></tr>
              <tr className="border-b"><td className="p-3">Kiềng</td><td className="p-3">Cái</td><td className="p-3 text-red-600 font-medium">Liên hệ</td></tr>
              <tr className="border-b"><td className="p-3">Dây nilon cột</td><td className="p-3">Mét / Cuộn</td><td className="p-3 text-red-600 font-medium">Liên hệ</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
          <p className="text-sm text-yellow-800">Lưu ý: Giá chưa bao gồm VAT. Giá có thể thay đổi theo số lượng. Vui lòng liên hệ để được báo giá chi tiết.</p>
        </div>
      </main>

      <Footer />
    </>
  )
}
