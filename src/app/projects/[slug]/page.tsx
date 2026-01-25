import { notFound } from 'next/navigation';
import projects from '@/data/projects.json';
import dynamic from 'next/dynamic';
import ProjectGallery from '@/components/project/ProjectGallery';
import MortgageCalculator from '@/components/project/MortgageCalculator';
import LeadCaptureForm from '@/components/project/LeadCaptureForm';

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  // Dynamically import MDX content
  const Content = dynamic(() => import(`@/content/projects/${slug}.mdx`).catch(() => () => <p>Content coming soon...</p>));

  // Placeholder images for gallery (in real app, this comes from CMS/JSON)
  const galleryImages = [
    project.image,
    '/assets/images/global_city_soho.jpg',
    '/assets/images/global_city_fountain.jpg',
    '/assets/images/global_city_park.jpg',
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* 1. Cinematic Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
          style={{ backgroundImage: `url('${project.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10 reveal-on-load">
          <div className="container mx-auto">
            <span className="inline-block py-1 px-3 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-accent/90 rounded-sm">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight shadow-sm">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light tracking-wide max-w-2xl flex items-center gap-2">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-white/20 rounded-full text-xs">📍</span> 
              {project.location}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 2. Main Content Column */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            
            {/* Gallery Section */}
            <ProjectGallery images={galleryImages} />

            <div className="prose prose-lg md:prose-xl prose-slate max-w-none 
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-primary 
              prose-p:text-slate-600 prose-p:leading-loose
              prose-li:text-slate-600 prose-li:leading-loose
              prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full prose-img:object-cover prose-img:my-8
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden
              prose-th:bg-slate-100 prose-th:p-4 prose-th:text-left prose-th:font-serif prose-th:text-primary
              prose-td:p-4 prose-td:border-b prose-td:border-slate-50
              bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 space-y-8">
              <Content />
            </div>

            {/* Mortgage Calculator */}
            <MortgageCalculator priceString={project.price} />
          </div>

          {/* 3. Sticky Sidebar */}
          <div className="lg:col-span-4 order-1 lg:order-2 relative">
            <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* Highlight Card */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-t-4 border-accent relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold mb-1">Giá khởi điểm</p>
                  <p className="text-3xl md:text-4xl font-serif font-bold text-primary">{project.price}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-500">Trạng thái</span>
                    <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{project.tag}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                     <span className="text-slate-500">Quy mô</span>
                     <span className="font-medium text-slate-800 text-right">{project.scale}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                     <span className="text-slate-500">Chủ đầu tư</span>
                     <span className="font-medium text-slate-800 text-right">{project.investor}</span>
                  </div>
                </div>

                {/* Lead Capture Form */}
                <LeadCaptureForm />
                
              </div>

              {/* Contact Info */}
               <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                <h3 className="font-serif text-xl font-bold mb-4">Hỗ trợ 24/7</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm">Hotline Kinh Doanh</p>
                    <p className="font-bold text-lg">0909 888 999</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
