import { client } from '@/sanity/lib/client';
import { investorBySlugQuery } from '@/sanity/lib/queries';
import InvestorHero from '@/components/sections/InvestorHero';
import AchievementTimeline from '@/components/sections/AchievementTimeline';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function InvestorDetailPage({
  params
}: {
  params: Promise<{ locale: string, slug: string }>;
}) {
  const { locale, slug } = await params;
  const investor = await client.fetch(investorBySlugQuery, { slug, language: locale });
  const t = await getTranslations('InvestorDetailPage');

  if (!investor) return <div className="pt-32 text-center">{t('notFound')}</div>;

  return (
    <div className="flex flex-col">
      <InvestorHero 
        name={investor.name}
        logo={investor.logo}
        coverImage={investor.coverImage}
        vision={investor.vision}
      />

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent font-black uppercase tracking-[0.4em] text-[12px] mb-6">{t('mission')}</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{t('inspirationTitle')}</h2>
              <div className="w-16 h-[2px] bg-accent mb-10"></div>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-8">
                {investor.mission}
              </p>
              
              {investor.awards && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                  {investor.awards.slice(0, 4).map((award: string, i: number) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-accent text-[8px]">★</span>
                      </div>
                      <p className="text-[12px] font-bold uppercase tracking-wider text-slate-800">{award}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-slate-100 rounded-sm overflow-hidden relative shadow-3xl">
                 {investor.coverImage && (
                    <Image 
                      src={urlFor(investor.coverImage).url()} 
                      alt={investor.name}
                      fill
                      className="object-cover opacity-90 scale-110"
                    />
                 )}
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent p-12 text-white hidden md:block">
                <span className="text-5xl font-black block mb-4">30+</span>
                <p className="text-xs font-bold uppercase tracking-widest leading-loose">{t('yearsExcellence')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <AchievementTimeline achievements={investor.achievements} />

      {/* Featured Projects */}
      {investor.featuredProjects && investor.featuredProjects.length > 0 && (
        <section className="py-32 bg-slate-50">
          <div className="container mx-auto px-5">
            <div className="text-center mb-20">
              <p className="text-accent font-black uppercase tracking-[0.4em] text-[12px] mb-4">{t('portfolio')}</p>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight">{t('iconicDevelopments')}</h2>
              <div className="w-20 h-[2px] bg-accent mx-auto mt-8"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {investor.featuredProjects.map((project: any) => (
                <Link 
                  key={project._id}
                  href={`/${locale}/projects/${project.slug}`}
                  className="group bg-white rounded-sm overflow-hidden shadow-xl transition-all duration-700 hover:-translate-y-4"
                >
                  <div className="relative h-[400px] overflow-hidden">
                    {project.mainImage ? (
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                        style={{ backgroundImage: `url('${urlFor(project.mainImage).url()}')` }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-200" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-8">
                    <p className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-4">{project.location}</p>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">{project.title}</h3>
                    <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{project.status === 'selling' ? (locale === 'vn' ? 'Đang Mở Bán' : locale === 'ko' ? '판매 중' : 'Selling') : project.status}</span>
                      <span className="text-accent font-black text-lg">{project.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="bg-[#0c1a2c] py-32 relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
          <div className="container mx-auto px-5 relative z-10">
             <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight leading-tight">{t('ctaHeading')} <br/><span className="text-accent">{investor.name}</span>?</h2>
             <p className="max-w-2xl mx-auto text-white/50 text-lg font-light mb-16 leading-relaxed">
               {t('ctaDesc')}
             </p>
             <Link href={`/${locale}/#contact`} className="inline-block bg-accent hover:bg-white hover:text-primary text-white py-6 px-14 rounded-sm font-bold text-[12px] tracking-[0.4em] transition-all transform hover:-translate-y-2 shadow-2xl">
               {t('inquireNow')}
             </Link>
          </div>
      </section>
    </div>
  );
}
