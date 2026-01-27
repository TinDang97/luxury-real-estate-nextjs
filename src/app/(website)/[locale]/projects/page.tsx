import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { getTranslations } from 'next-intl/server';

export default async function ProjectsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('ProjectsPage');
  const projects = await client.fetch(projectsQuery, { language: locale });

  return (
    <div className="pt-24 min-h-screen pb-24 bg-slate-50">
      <div className="bg-[#0c1a2c] py-24 text-white text-center mb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-5 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 uppercase tracking-[0.2em] text-accent">
            {t('title')}
          </h1>
          <p className="max-w-2xl mx-auto text-white/60 text-lg font-light tracking-wide">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project: any) => (
            <Link 
              key={project._id}
              href={`/${locale}/projects/${project.slug}`}
              className="group bg-white rounded-sm overflow-hidden shadow-2xl transition-all duration-700 border border-white/10 hover:border-accent/30"
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
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <span className="absolute top-6 left-6 bg-accent text-white px-4 py-1.5 text-[10px] font-bold rounded-sm uppercase tracking-widest shadow-xl">
                  {project.status === 'selling' ? (locale === 'vn' ? 'Đang Mở Bán' : 'Selling') : project.status}
                </span>
              </div>
              <div className="p-10 relative -mt-20 z-20 bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.1)] mx-6 mb-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors leading-tight">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mb-8">
                  <span className="w-8 h-[1px] bg-accent"></span>
                  <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{project.location}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-accent font-black text-lg tracking-tight">{project.price}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 group-hover:text-accent transition-all">View Detail →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

