import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Hero from "@/components/cms/Hero";
import Gallery from "@/components/cms/Gallery";
import InfoTable from "@/components/cms/InfoTable";
import InfoGrid from "@/components/cms/InfoGrid";
import LocationMap from "@/components/cms/LocationMap";
import Banner from "@/components/cms/Banner";
import MortgageCalculator from "@/components/features/MortgageCalculator";
import InlineRegisterForm from "@/components/features/InlineRegisterForm";
import FeatureListBlock from "@/components/features/FeatureListBlock";
import { PortableText } from "next-sanity";
import RegisterButton from "@/components/features/RegisterButton";

// Page Builder Map
const components = {
  hero: Hero,
  gallery: Gallery,
};

// SSG: Generate params for all projects and locales
export async function generateStaticParams() {
  // Fetch all projects (we only need the slug)
  // We fetch VN projects as base, but actually we should fetch ALL language variations if they have different slugs.
  // In our case, slugs seem shared or similar, but we should be robust.
  // For simplicity, let's assuming slugs are unique per project concept or we iterate all.
  
  // NOTE: In a real multi-language setup, we might have different slugs for different languages 
  // OR the same slug. The current query `projectBySlugQuery` filters by language. 
  // If we want to pre-render /en/projects/foo and /vn/projects/foo, we need "foo" in the list.
  
  // Let's fetch ALL projects regardless of language to get unique slugs.
  // But wait, `projectsQuery` filters by language.
  
  // Let's iterate supported locales.
  const locales = ['en', 'vn', 'ko'];
  const paths: Array<{ slug: string; locale: string }> = [];

  for (const locale of locales) {
    // We need a simple query for slugs. 
    // We can reuse `projectsQuery` or make a lighter one.
    // For now, let's use client.fetch with a custom query for speed.
    const slugs = await client.fetch(
        `*[_type == "project" && (language == $locale || (!defined(language) && $locale == "vn"))].slug.current`,
        { locale }
    );
    
    if (slugs && Array.isArray(slugs)) {
        slugs.forEach((slug: string) => {
             if (slug) {
                 paths.push({ slug, locale });
             }
        });
    }
  }

  return paths;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug, language: locale });

  if (!project) {
    // If we're waiting for the user to input data, we might show a fallback or 404
    // But for now, let's assume if it's missing, it's 404
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* 
        If first block is NOT Hero, we might want a default Hero or just start listing blocks.
        The query returns `content[]` which contains the blocks.
      */}
      {project.content?.map((block: any, index: number) => {
         // Check if it's a known component type
         // The GROQ query mapped _type to the component name if we strictly followed it, 
         // but we just grabbed everything in content[].
         // block._type will be 'hero' or 'gallery' or 'block' (text)
         
         if (block._type === 'hero') {
             return <Hero key={block._key || index} {...block} />;
         }
         if (block._type === 'gallery') {
             return <Gallery key={block._key || index} {...block} />;
         }
         if (block._type === 'infoTable') {
             return <InfoTable key={block._key || index} {...block} />;
         }
         if (block._type === 'featureList') {
             return <FeatureListBlock key={block._key || index} {...block} />;
         }
         if (block._type === 'infoGrid') {
             return <InfoGrid key={block._key || index} {...block} />;
         }
         if (block._type === 'banner') {
             return <Banner key={block._key || index} {...block} />;
         }
         if (block._type === 'mortgageCalculator') {
             return <MortgageCalculator key={block._key || index} {...block} />;
         }
         if (block._type === 'inlineRegisterForm') {
             return <InlineRegisterForm key={block._key || index} projectTitle={project.title} {...block} />;
         }
         if (block._type === 'locationMap') {
             return <LocationMap key={block._key || index} projectName={project.title} {...block} />;
         }
         if (block._type === 'block') {
             return (
                 <section key={block._key || index} className="py-12 px-4 max-w-4xl mx-auto prose prose-lg prose-slate">
                     <PortableText value={[block]} />
                 </section>
             )
         }
         return null;
      })}
      
      {/* Registration CTA */}
      <RegisterButton projectTitle={project.title} />
    </main>
  );
}
