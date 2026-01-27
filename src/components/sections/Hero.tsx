'use client';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden bg-[#0c1a2c]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-40 transition-transform duration-[10s] hover:scale-105"
        style={{ backgroundImage: "url('/assets/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a2c]/95 via-[#0c1a2c]/60 to-transparent" />
      
      <div className="container relative z-10 px-5 max-w-6xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-[0.2em] mb-10 leading-tight">
          {t('title')} <br /> <span className="text-accent">{t('titleAccent')}</span>
        </h1>
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/60 mb-14 tracking-wide font-light leading-relaxed">
          {t('subtitle')}
        </p>
        <button 
          onClick={() => {
            const projectsSection = document.getElementById('featured-projects');
            projectsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="inline-block bg-[#c5a059] hover:bg-[#b08d4a] text-white py-6 px-14 rounded-sm font-bold text-[12px] tracking-[0.3em] transition-all transform hover:-translate-y-2 shadow-[0_20px_50px_rgba(197,160,89,0.3)] cursor-pointer"
        >
          {t('cta')}
        </button>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-accent to-transparent" />
      </div>
    </section>
  );
}

