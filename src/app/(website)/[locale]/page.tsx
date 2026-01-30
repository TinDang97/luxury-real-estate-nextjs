import Hero from "@/components/sections/Hero";
import Link from "next/link";
import { client } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const projects = await client.fetch(projectsQuery, { language: locale });

  return (
    <div className="flex flex-col">
      <Hero />

      {/* Featured Projects */}
      <section id="featured-projects" className="container mx-auto px-5 py-32 overflow-hidden">
        <div className="text-center mb-20 relative">
          <div className="text-[40px] xs:text-[60px] sm:text-[80px] md:text-[120px] font-black text-slate-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-60 tracking-tighter uppercase whitespace-nowrap">Featured</div>
          <h2 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            {locale === 'vn' ? 'Dựa Án Tiêu Biểu' : locale === 'ko' ? '주요 프로젝트' : 'Featured Projects'}
          </h2>
          <div className="w-20 h-[2px] bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.slice(0, 3).map((project: any) => (
            <Link 
              key={project._id}
              href={`/${locale}/projects/${project.slug}`}
              className="group bg-white overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_50px_80px_-20px_rgba(0,0,0,0.2)] transition-all duration-700 hover:-translate-y-4"
            >
              <div className="relative h-[450px] overflow-hidden">
                {project.mainImage ? (
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
                    style={{ backgroundImage: `url('${urlFor(project.mainImage).url()}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <div className="p-10 bg-white relative z-10 transition-colors group-hover:bg-[#0c1a2c]">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-[1px] bg-accent"></span>
                  <p className="text-accent text-[13px] font-bold uppercase tracking-[0.3em]">{project.location}</p>
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-white transition-colors">{project.title}</h3>
                <div className="flex justify-between items-end pt-6 border-t border-slate-100 group-hover:border-white/5 transition-colors">
                  <span className="text-slate-400 group-hover:text-white/40 font-medium text-sm">Luxury Residence</span>
                  <span className="text-accent font-black text-xl tracking-tight">{project.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[#f8f9fa] py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-5 lg:flex items-center gap-16 xl:gap-24 relative z-10">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden shadow-[40px_40px_0px_#c5a059]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] hover:scale-110"
                  style={{ backgroundImage: "url('/assets/images/consultant.jpg')" }}
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <p className="text-accent font-black uppercase tracking-[0.4em] text-[12px] sm:text-[14px] mb-4 sm:mb-8">About Us</p>
            <h2 className="text-4xl md:text-7xl font-bold mb-8 md:mb-10 leading-tight">
              {locale === 'vn' ? 'Chuyên Gia Bất Động Sản Hạng Sang' : locale === 'ko' ? '럭셔리 부동산 전문가' : 'Luxury Real Estate Specialists'}
            </h2>
            <div className="space-y-8 text-slate-500 text-lg font-light leading-relaxed">
              <p>{locale === 'vn' ? 'Với hơn 10 năm kinh nghiệm trong lĩnh vực bất động sản phân khúc hạng sang tại Việt Nam, chúng tôi tự hào mang đến cho khách hàng những giải pháp đầu tư tối ưu.' : locale === 'ko' ? '베트남 럭셔리 부동산 분야에서 10년 이상의 경험을 바탕으로 고객에게 최적의 투자 솔루션을 제공하는 것을 자랑스럽게 생각합니다.' : 'With over a decade of dedication to Vietnam\'s ultra-luxury sector, we pride ourselves on curating the most exclusive investment opportunities for our elite clientele.'}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
                <div>
                  <h4 className="text-primary font-bold text-lg mb-2">10+ Years</h4>
                  <p className="text-sm">Of Market Excellence</p>
                </div>
                <div>
                  <h4 className="text-primary font-bold text-lg mb-2">Exclusive</h4>
                  <p className="text-sm">Portfolio Access</p>
                </div>
              </div>

              <Link href={`/${locale}/#contact`} className="inline-block mt-8 md:mt-12 bg-[#0c1a2c] text-white py-4 md:py-5 px-10 md:px-12 font-bold tracking-[0.2em] text-[11px] md:text-[12px] hover:bg-accent hover:text-white transition-all shadow-2xl">
                {locale === 'vn' ? 'LIÊN HỆ TƯ VẤN' : locale === 'ko' ? '컨설팅 문의' : 'SCHEDULE CONSULTATION'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

