'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-[1000] transition-all duration-300 border-b border-white/10 ${
      scrolled ? 'py-3 bg-primary' : 'py-5 bg-primary/85 backdrop-blur-[15px]'
    }`}>
      <div className="container mx-auto px-5 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-accent uppercase tracking-wider">
          VN Luxury Realty
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium text-white uppercase hover:text-accent transition-colors">Trang Chủ</Link>
          <Link href="/projects" className="text-sm font-medium text-white uppercase hover:text-accent transition-colors">Dự Án</Link>
          <Link href="/#about" className="text-sm font-medium text-white uppercase hover:text-accent transition-colors">Về Chúng Tôi</Link>
          <Link href="/#news" className="text-sm font-medium text-white uppercase hover:text-accent transition-colors">Tin Tức</Link>
        </nav>
        <Link href="tel:0123456789" className="bg-accent text-primary px-5 py-2 rounded-sm font-semibold text-sm hover:bg-accent-hover transition-colors">
          LIÊN HỆ NGAY
        </Link>
      </div>
    </header>
  );
}
