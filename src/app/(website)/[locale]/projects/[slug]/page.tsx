import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
// import Hero from "@/components/cms/Hero";
import { PortableText } from "next-sanity";
import RegisterButton from "@/components/features/RegisterButton";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import { getTranslations } from "next-intl/server";

const Hero = dynamic(() => import("@/components/cms/Hero"));
const Gallery = dynamic(() => import("@/components/cms/Gallery"));
const Project3DView = dynamic(() => import("@/components/cms/Project3DView"));
const LocationMap = dynamic(() => import("@/components/cms/LocationMap"));
const MortgageCalculator = dynamic(() => import("@/components/features/MortgageCalculator"));
const InfoTable = dynamic(() => import("@/components/cms/InfoTable"));
const InfoGrid = dynamic(() => import("@/components/cms/InfoGrid"));
const Banner = dynamic(() => import("@/components/cms/Banner"));
const VideoSection = dynamic(() => import("@/components/cms/VideoSection"));
const InlineRegisterForm = dynamic(() => import("@/components/features/InlineRegisterForm"));
const FeatureListBlock = dynamic(() => import("@/components/features/FeatureListBlock"));

// Page Builder Map
const components = {
  hero: Hero,
  gallery: Gallery,
  project3DView: Project3DView,
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

// SEO: Generate dynamic metadata for each project
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug, language: locale });

  if (!project) {
    return {
      title: "Project Not Found | VN Luxury Realty",
      description: "The requested project could not be found.",
    };
  }

  // Get project image for social sharing
  const ogImage = project.content?.find((block: any) => block._type === 'hero')?.backgroundImage
    || project.mainImage
    || project.gallery?.images?.[0]
    || project.content?.find((block: any) => block._type === 'gallery')?.images?.[0];

  const imageUrlForSocial = ogImage
    ? urlFor(ogImage).width(1200).height(630).url()
    : undefined;

  // Truncate description to optimal length for meta description (155-160 chars)
  const description = project.description
    ? project.description.length > 160
      ? project.description.substring(0, 157) + "..."
      : project.description
    : `Khám phá dự án ${project.title} - Bất động sản cao cấp tại Việt Nam với tiện ích đẳng cấp quốc tế.`;

  // Map locale to Open Graph locale format
  const ogLocaleMap: Record<string, string> = {
    vn: "vi_VN",
    en: "en_US",
    ko: "ko_KR",
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";
  const canonicalUrl = `${baseUrl}/${locale}/projects/${slug}`;

  return {
    title: `${project.title} | VN Luxury Realty`,
    description,
    
    // Open Graph for Facebook, LinkedIn, etc.
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale] || "vi_VN",
      url: canonicalUrl,
      title: `${project.title} | VN Luxury Realty`,
      description,
      siteName: "VN Luxury Realty",
      images: imageUrlForSocial
        ? [
            {
              url: imageUrlForSocial,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : [],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | VN Luxury Realty`,
      description,
      images: imageUrlForSocial ? [imageUrlForSocial] : [],
    },

    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/projects/${slug}`,
        vi: `${baseUrl}/vn/projects/${slug}`,
        ko: `${baseUrl}/ko/projects/${slug}`,
      },
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations('Footer');
  const project = await client.fetch(projectBySlugQuery, { slug, language: locale });

  if (!project) {
    // If we're waiting for the user to input data, we might show a fallback or 404
    // But for now, let's assume if it's missing, it's 404
    return notFound();
  }

  // Get project image for social sharing (used in JSON-LD)
  const ogImage = project.content?.find((block: any) => block._type === 'hero')?.backgroundImage
    || project.mainImage
    || project.gallery?.images?.[0]
    || project.content?.find((block: any) => block._type === 'gallery')?.images?.[0];

  const imageUrlForSocial = ogImage
    ? urlFor(ogImage).width(1200).height(630).url()
    : undefined;

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
         if (block._type === 'videoSection') {
             return <VideoSection key={block._key || index} {...block} />;
         }
         if (block._type === 'project3DView') {
             return <Project3DView key={block._key || index} {...block} />;
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


      {/* Render top-level components if they weren't in the content array already */}
      {!project.content?.some((b: any) => b._type === 'gallery') && project.gallery?.images?.length > 0 && (
          <Gallery {...project.gallery} />
      )}
      
      {!project.content?.some((b: any) => b._type === 'project3DView') && project.project3DView?.views?.length > 0 && (
          <Project3DView {...project.project3DView} />
      )}
      
      {/* Brochure Registration Section */}
      {!project.content?.some((b: any) => b._type === 'inlineRegisterForm') && (
        <InlineRegisterForm projectTitle={project.title} />
      )}
      
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": project.title,
            "description": project.description || `Dự án bất động sản cao cấp ${project.title} tại ${project.location || 'Việt Nam'}`,
            ...(imageUrlForSocial && { "image": imageUrlForSocial }),
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "VND",
              "availability": "https://schema.org/InStock",
              ...(project.price && { "price": project.price }),
            },
            ...(project.location && {
              "address": {
                "@type": "PostalAddress",
                "addressLocality": project.location,
                "addressCountry": "VN"
              }
            }),
            "category": project.category || "Real Estate",
            ...(project.developer && { "brand": { "@type": "Organization", "name": project.developer } }),
          }),
        }}
      />
      
      {/* Booking Policy Section */}
      <section className="py-12 px-4 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-serif text-slate-900 mb-4">{t('Footer.bookingPolicy')}</h3>
          <p className="text-lg text-[#c5a059] font-bold tracking-wide uppercase italic">
            {t('Footer.bookingPolicyText')}
          </p>
        </div>
      </section>

      {/* Registration CTA */}
      <RegisterButton projectTitle={project.title} />
    </main>
  );
}
