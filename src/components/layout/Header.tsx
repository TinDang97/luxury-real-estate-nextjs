'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const locales = [
    { code: 'vn', label: 'VN', flag: '🇻🇳' },
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'ko', label: 'KO', flag: '🇰🇷' },
  ];

  const handleLocaleChange = (newLocale: string) => {
    const pathParts = pathname.split('/');
    pathParts[1] = newLocale;
    router.push(pathParts.join('/'));
    setLangOpen(false);
  };

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
        <nav className="hidden lg:flex gap-10">
          <Link href={`/${locale}`} className="text-[11px] font-bold text-white uppercase tracking-[0.2em] hover:text-accent transition-all">Home</Link>
          <Link href={`/${locale}/projects`} className="text-[11px] font-bold text-white uppercase tracking-[0.2em] hover:text-accent transition-all">Projects</Link>
          <Link href={`/${locale}/#about`} className="text-[11px] font-bold text-white uppercase tracking-[0.2em] hover:text-accent transition-all">About</Link>
        </nav>

        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all"
            >
              <span className="opacity-70">{locales.find(l => l.code === locale)?.flag}</span>
              {locale}
              <motion.span animate={{ rotate: langOpen ? 180 : 0 }}>▾</motion.span>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-32 bg-[#0c1a2c]/fb backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                >
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLocaleChange(l.code)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-white/5 ${
                        locale === l.code ? 'text-accent' : 'text-white'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-sm">{l.flag}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href="tel:0123456789" 
            className="hidden sm:block bg-[#c5a059] text-white px-6 py-2.5 rounded-sm font-bold text-[10px] tracking-[0.2em] hover:bg-[#b08d4a] transition-all shadow-lg"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </header>
  );
}
