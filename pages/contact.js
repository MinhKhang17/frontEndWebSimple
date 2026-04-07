import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

export default function Contact() {
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && window.initializeHeader) {
      try { window.initializeHeader(); } catch(e){}
    }
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  async function copyToClipboard(value) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.style.position = 'fixed'; ta.style.left = '-9999px';
        document.body.appendChild(ta); ta.focus(); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      }
      setToast('Đã sao chép: ' + value);
    } catch (e) {
      setToast('Sao chép thất bại');
    }
  }

  return (
    <>
      <Head>
        <title>Liên hệ — Phong Hòa Phát</title>
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12 page-transition">
        <section className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">Liên hệ</h1>
          <p className="text-gray-600 mt-2">Gọi, nhắn tin hoặc gửi email — chúng tôi luôn sẵn sàng hỗ trợ báo giá và tư vấn.</p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <aside className="contact-card p-6 rounded-2xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-none bg-blue-50 p-3 rounded-lg">📞</div>
                <div>
                  <div className="text-sm text-gray-500">Hotline</div>
                  <div className="block text-lg font-medium text-green-600">0908 093 598</div>
                  <div className="text-sm text-gray-500">(Anh Phong) — Zalo/Điện thoại</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-none bg-green-50 p-3 rounded-lg">✉️</div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="block text-lg font-medium text-blue-600">thanhphong7474@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-none bg-gray-100 p-3 rounded-lg">📍</div>
                <div>
                  <div className="text-sm text-gray-500">Địa chỉ</div>
                  <div className="text-base font-medium text-gray-800">Nhà 12 đường 15 KDC Hiệp Thành 3, Thủ Dầu Một, Bình Dương</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button id="copyPhoneBtn" onClick={() => copyToClipboard('0908093598')} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm">Sao chép số</button>
              <button id="copyEmailBtn" onClick={() => copyToClipboard('thanhphong7474@gmail.com')} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm">Sao chép email</button>
            </div>

            <hr className="my-6" />
            <div className="text-sm text-gray-500"><strong>Ghi chú:</strong> Nếu bạn cần báo giá nhanh, vui lòng gọi trực tiếp đến chúng tôi.</div>
          </aside>

          <div className="map-container">
            <iframe title="Bản đồ Phong Hòa Phát" src="https://www.google.com/maps?q=Nh%C3%A0+12+%C4%91%C6%B0%E1%BB%9Dng+15+KDC+Hi%E1%BB%87p+Th%C3%A0nh+3,+Ph%C6%B0%E1%BB%9Dng+Hi%E1%BB%87p+Th%C3%A0nh,+Th%E1%BB%A7+D%E1%BA%A7u+M%E1%BB%99t,+B%C3%ACnh+D%C6%B0%C6%A1ng&output=embed" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>

        {/* Toast */}
        <div id="toast" className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>
      </main>

      <Footer />
    </>
  )
}
