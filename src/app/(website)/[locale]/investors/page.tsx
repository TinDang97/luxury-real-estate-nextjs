import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { investorsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function InvestorsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('InvestorsPage');
  const investors = await client.fetch(investorsQuery, { language: locale });

  return (
    <div className="pt-24 min-h-screen pb-24 bg-slate-50">
      <div className="bg-[#0c1a2c] py-32 text-white text-center mb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-5 relative z-10">
          <p className="text-accent font-black uppercase tracking-[0.4em] text-[12px] mb-6">{t('partnersTitle')}</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-[0.2em]">
            {t('title')}
          </h1>
          <div className="w-24 h-[1px] bg-accent mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-white/60 text-lg font-light tracking-wide leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {investors?.map((investor: any) => (
            <Link 
              key={investor._id}
              href={`/${locale}/investors/${investor.slug}`}
              className="group relative bg-white overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-4 flex flex-col h-[500px]"
            >
              <div className="relative h-1/2 overflow-hidden">
                {investor.coverImage ? (
                  <Image 
                    src={urlFor(investor.coverImage).url()} 
                    alt={investor.name}
                    fill
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-80"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#0c1a2c]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>
              
              <div className="p-10 flex flex-col justify-between flex-grow bg-white relative">
                {investor.logo && (
                  <div className="absolute -top-12 left-10 bg-white p-4 shadow-xl">
                    <Image 
                      src={urlFor(investor.logo).url()} 
                      alt={`${investor.name} logo`}
                      width={100}
                      height={50}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                )}
                <div className="mt-4">
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-accent transition-colors">{investor.name}</h3>
                  <p className="text-slate-500 font-light line-clamp-3 leading-relaxed">
                    {investor.vision}
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">{t('viewProfile')}</span>
                  <span className="text-slate-300 group-hover:text-accent transition-colors">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
