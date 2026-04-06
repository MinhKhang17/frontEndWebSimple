import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function News() {
  return (
    <>
      <Head>
        <title>Tin tức — Phong Hòa Phát</title>
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12 page-transition">
        <h1 className="text-2xl font-bold mb-4">Tin tức</h1>
        <p className="text-gray-600">Mục tin tức sẽ được cập nhật sớm.</p>
      </main>

      <Footer />
    </>
  )
}
