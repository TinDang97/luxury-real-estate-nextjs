import { notFound } from 'next/navigation';
import projects from '@/data/projects.json';
import dynamic from 'next/dynamic';
import createMDX from '@next/mdx'
import ProjectGallery from '@/components/project/ProjectGallery';
import MortgageCalculator from '@/components/project/MortgageCalculator';
import LeadCaptureForm from '@/components/project/LeadCaptureForm';
import LocationMap from '@/components/project/LocationMap';
import ProjectPricingPanel from '@/components/project/ProjectPricingPanel';
import ProjectClientWrapper from '@/components/project/ProjectClientWrapper';

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
        {/* State Wrapper for interactive elements */}
        <ProjectClientWrapper project={project}>
          <Content />
        </ProjectClientWrapper>
      </div>
    </div>
  );
}
