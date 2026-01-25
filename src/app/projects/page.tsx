import Link from 'next/link';
import projects from '@/data/projects.json';

export default function ProjectsPage() {
  return (
    <div className="pt-24 min-h-screen pb-24">
      <div className="bg-secondary py-20 text-white text-center mb-16">
        <div className="container mx-auto px-5 reveal active">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider">Tất Cả Dự Án</h1>
          <p className="max-w-xl mx-auto text-text-secondary">Khám phá bộ sưu tập bất động sản hạng sang trên khắp Việt Nam</p>
        </div>
      </div>

      <div className="container mx-auto px-5">
        <div className="flex flex-wrap justify-center gap-4 mb-16 reveal reveal-on-load">
          <button className="px-6 py-2 rounded-full border border-accent bg-accent text-primary font-bold transition-all">Tất Cả</button>
          <button className="px-6 py-2 rounded-full border border-slate-200 hover:border-accent hover:text-accent font-medium transition-all text-slate-500">Nhà Ở</button>
          <button className="px-6 py-2 rounded-full border border-slate-200 hover:border-accent hover:text-accent font-medium transition-all text-slate-500">Nghỉ Dưỡng</button>
          <button className="px-6 py-2 rounded-full border border-slate-200 hover:border-accent hover:text-accent font-medium transition-all text-slate-500">TP.HCM</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link 
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-accent"
            >
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <span className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 text-xs font-bold rounded-sm uppercase italic">
                  {project.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{project.description}</p>
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">📍 {project.location}</span>
                  <span className="text-accent font-extrabold">{project.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
