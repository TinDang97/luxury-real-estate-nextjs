'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

import { urlFor } from '@/sanity/lib/image';

interface Project {
  _id: string;
  title: string;
  slug: string;
  mainImage: any;
  category: string;
}

export default function Header({ recentProjects = [] }: { recentProjects?: Project[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [investorsOpen, setInvestorsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('Header');
  const pathname = usePathname();
  const router = useRouter();

  const investors = [
    { name: 'Masterise Homes', role: 'Chủ đầu tư chính' },
    { name: 'Foster + Partners', role: 'Thiết kế kiến trúc' },
    { name: 'Central Cons', role: 'Tổng thầu xây dựng' },
    { name: 'SDI Corp', role: 'Đối tác phát triển' },
    { name: 'Quimera Energy', role: 'Giải pháp bền vững' },
  ];

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
        <nav className="hidden lg:flex gap-10 items-center">
          <Link href={`/${locale}`} className="text-[13px] font-bold text-white uppercase tracking-[0.2em] hover:text-accent transition-all">{t('home')}</Link>
          
          {/* Projects Dropdown */}
          <div className="relative group" onMouseEnter={() => setProjectsOpen(true)} onMouseLeave={() => setProjectsOpen(false)}>
            <Link href={`/${locale}/projects`} className="text-[13px] font-bold text-white uppercase tracking-[0.2em] hover:text-accent transition-all flex items-center gap-1">
              {t('projects')} <span className="text-[10px]">▼</span>
            </Link>
            <AnimatePresence>
              {projectsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-2 w-[300px] bg-primary/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl p-4"
                >
                  <p className="text-[11px] font-bold text-accent uppercase tracking-widest mb-3">{t('recentProjects') || 'Dự án mới nhất'}</p>
                  <div className="flex flex-col gap-3">
                    {recentProjects.map((project) => (
                      <Link 
                        key={project._id} 
                        href={`/${locale}/projects/${project.slug}`}
                        className="flex gap-3 group/item"
                      >
                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                          {project.mainImage && (
                            <img 
                              src={urlFor(project.mainImage).width(100).height(80).url()} 
                              alt={project.title}
                              className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                            />
                          )}
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="text-[12px] font-bold text-white group-hover/item:text-accent transition-colors">{project.title}</h4>
                          <span className="text-[10px] text-white/50 uppercase">{project.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Investors Dropdown */}
          <div className="relative group" onMouseEnter={() => setInvestorsOpen(true)} onMouseLeave={() => setInvestorsOpen(false)}>
            <button className="text-[13px] font-bold text-white uppercase tracking-[0.2em] hover:text-accent transition-all flex items-center gap-1">
              {t('investors') || 'Chủ đầu tư'} <span className="text-[10px]">▼</span>
            </button>
            <AnimatePresence>
              {investorsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-2 w-[250px] bg-primary/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl p-4"
                >
                  <p className="text-[11px] font-bold text-accent uppercase tracking-widest mb-3">{t('topInvestors') || 'Danh sách nhà đầu tư'}</p>
                  <div className="flex flex-col gap-2">
                    {investors.map((investor, idx) => (
                      <div key={idx} className="p-2 hover:bg-white/5 rounded-lg transition-colors cursor-default group/inv">
                        <h4 className="text-[12px] font-bold text-white group-hover/inv:text-accent transition-colors">{investor.name}</h4>
                        <p className="text-[10px] text-white/40">{investor.role}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href={`/${locale}/#about`} className="text-[13px] font-bold text-white uppercase tracking-[0.2em] hover:text-accent transition-all">{t('about')}</Link>
        </nav>

        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-[12px] font-bold text-white uppercase tracking-widest bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all"
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
                  className="absolute right-0 mt-3 w-32 bg-[#0c1a2c]/95 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                >
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLocaleChange(l.code)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-white/5 ${
                        locale === l.code ? 'text-accent' : 'text-white'
                      }`}
                    >
                      <span className="text-[11px]">{l.label}</span>
                      <span className="text-sm">{l.flag}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href="tel:0123456789" 
            className="hidden sm:block bg-[#c5a059] text-white px-8 py-3 rounded-sm font-bold text-[12px] tracking-[0.2em] hover:bg-[#b08d4a] transition-all shadow-lg"
          >
            {t('contact')}
          </Link>
        </div>
      </div>
    </header>
  );
}
