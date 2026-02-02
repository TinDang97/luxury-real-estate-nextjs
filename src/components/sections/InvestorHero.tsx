'use client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface InvestorHeroProps {
  name: string;
  logo: any;
  coverImage: any;
  vision: string;
}

export default function InvestorHero({ name, logo, coverImage, vision }: InvestorHeroProps) {
  const t = useTranslations('InvestorDetailPage');

  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden bg-[#0c1a2c]">
      <div className="absolute inset-0 z-0">
        {coverImage ? (
          <Image 
            src={urlFor(coverImage).url()} 
            alt={name}
            fill
            priority
            className="object-cover opacity-30 transition-transform duration-[10s] hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0c1a2c]/80" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a2c]/90 via-transparent to-[#0c1a2c]/90" />
      
      <div className="container relative z-10 px-5 max-w-4xl">
        {logo && (
          <div className="mb-12 inline-block p-6 bg-white shadow-2xl rounded-sm">
            <Image 
              src={urlFor(logo).url()} 
              alt={`${name} logo`}
              width={160}
              height={80}
              className="h-12 w-auto object-contain"
            />
          </div>
        )}
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-[0.2em] mb-8 leading-tight">
          {name}
        </h1>
        <div className="w-24 h-[1px] bg-accent mx-auto mb-10"></div>
        <p className="text-xl md:text-2xl text-white/70 italic font-light leading-relaxed max-w-3xl mx-auto">
          "{vision}"
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent/60">{t('discoverExcellence')}</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent/0 via-accent to-accent/0" />
        </div>
      </div>
    </section>
  );
}
