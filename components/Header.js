import React, { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (!headerRef.current) return
      if (!headerRef.current.contains(e.target)) {
        setMobileOpen(false)
        setCatOpen(false)
      }
    }

    function onKey(e) {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setCatOpen(false)
      }
    }

    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)

    // expose initializeHeader for legacy callers
    const init = () => { setMobileOpen(false); setCatOpen(false); }
    window.initializeHeader = init

    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
      if (window.initializeHeader === init) delete window.initializeHeader
    }
  }, [])

  // lock scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [mobileOpen])

  return (
    <header ref={headerRef} className="bg-white shadow-sm sticky top-0 z-50" role="banner" aria-label="Main header">
      <div id="topBanner" className="bg-teal-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between whitespace-nowrap overflow-x-auto no-scrollbar">
          <div className="text-sm">Chuyên sản xuất vật tư - trang thiết bị cho ngành cao su</div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3" aria-label="Phong Hòa Phát - Trang chủ">
            <img src="/images/page/logo/logo.jpg" alt="Logo Phong Hòa Phát" className="w-12 h-12 object-contain rounded-full shadow-sm"/>
            <div className="hidden md:block">
              <div className="text-lg font-semibold text-gray-800 leading-tight">Phong Hòa Phát</div>
              <div className="text-sm text-gray-500">Vật tư & giải pháp khai thác mủ</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center flex-1 px-6">
            <nav className="flex items-center gap-6 text-sm" role="navigation" aria-label="Primary">
              <a className="nav-link hover:text-teal-600 transition-colors" href="/">Trang Chủ</a>
              <a className="nav-link hover:text-teal-600 transition-colors" href="/about">Giới Thiệu</a>

              <div className="relative">
                <button id="catToggle" onClick={() => setCatOpen(s => !s)} className="flex items-center gap-2 nav-link hover:text-teal-600 transition-colors" aria-expanded={catOpen} aria-controls="catMenu">
                  <span>Danh mục sản phẩm</span>
                  <svg className={`w-4 h-4 transition-transform ${catOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 7l5 5 5-5H5z"/></svg>
                </button>
                <div id="catMenu" className={`${catOpen ? 'block' : 'hidden'} absolute left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-40`} role="menu" aria-hidden={!catOpen}>
                  <div className="p-4 space-y-2">
                    <a href="/product-detail?product=chenMu" className="block text-sm py-1.5 hover:text-teal-600 rounded transition-colors">Chén cao su hứng mủ</a>
                    <a href="/product-detail?product=mangChanMua" className="block text-sm py-1.5 hover:text-teal-600 rounded transition-colors">Máng chắn mưa</a>
                    <a href="/product" className="block text-sm py-1.5 hover:text-teal-600 rounded transition-colors font-medium">Tất cả sản phẩm</a>
                  </div>
                </div>
              </div>

              <a className="nav-link hover:text-teal-600 transition-colors" href="/pricing">Bảng Giá</a>
              <a className="nav-link hover:text-teal-600 transition-colors" href="/news">Tin Tức</a>
              <a className="nav-link hover:text-teal-600 transition-colors" href="/contact">Liên Hệ</a>
            </nav>
          </div>

          <button id="menuBtn" aria-controls="mobileMenu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(s => !s)} className="p-2 md:hidden rounded hover:bg-gray-100 transition-colors" title="Mở menu">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="text-sm">Sản phẩm & dịch vụ</div>
          <a href="/product" className="text-sm text-teal-600 font-medium hover:underline">Xem sản phẩm</a>
        </div>

        <div id="mobileMenu" className={`${mobileOpen ? 'block' : 'hidden'} border-t bg-white`} aria-hidden={!mobileOpen}>
          <nav className="px-4 py-3 space-y-2">
            <a className="block py-2 text-sm" href="/">Trang Chủ</a>
            <a className="block py-2 text-sm" href="/about">Giới Thiệu</a>
            <a className="block py-2 text-sm" href="/product-detail?product=chenMu">Chén cao su hứng mủ</a>
            <a className="block py-2 text-sm" href="/product-detail?product=mangChanMua">Máng chắn mưa</a>
            <a className="block py-2 text-sm font-medium" href="/product">Tất cả sản phẩm</a>
            <a className="block py-2 text-sm" href="/pricing">Bảng Giá</a>
            <a className="block py-2 text-sm" href="/news">Tin Tức</a>
            <a className="block py-2 text-sm" href="/contact">Liên Hệ</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
