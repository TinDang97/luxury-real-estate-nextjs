"use client";

import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface GalleryProps {
  heading?: string;
  description?: string;
  images: any[];
}

export default function Gallery({ heading, description, images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  if (!images || images.length === 0) return null;

  // Filter out images that don't have valid asset references OR valid URL strings
  const validImages = images.filter(img => {
    // Check if it's a Sanity image with asset reference
    if (img?.asset?._ref || img?.asset?._id) return true;
    // Check if it's a string URL (public folder path)
    if (typeof img === 'string') return true;
    // Check if it has a url property
    if (img?.url) return true;
    return false;
  });
  
  if (validImages.length === 0) return null;

  const highlightImage = validImages[0];
  const gridImages = validImages.slice(1);

  // Helper function to get image URL
  const getImageUrl = (img: any, width: number = 800) => {
    // If it's a string, return as-is (public folder path)
    if (typeof img === 'string') return img;
    // If it has a url property, use it
    if (img?.url) return img.url;
    // Otherwise, use urlFor for Sanity images
    return urlFor(img).width(width).url();
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {(heading || description) && (
        <div className="mb-12">
          {heading && <h2 className="text-3xl font-serif text-slate-900 mb-4">{heading}</h2>}
          {description && <p className="text-slate-500 max-w-2xl">{description}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:h-[600px] xl:h-[800px]">
        {/* Highlight Image */}
        <div 
          className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer min-h-[300px] md:min-h-0"
          onClick={() => setSelectedImage(highlightImage)}
        >
          <Image
            src={getImageUrl(highlightImage, 1200)}
            alt="Project Highlight"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Grid Images */}
        {gridImages.map((img, idx) => (
          <div 
            key={idx}
            className="relative group overflow-hidden rounded-2xl cursor-pointer min-h-[200px] md:min-h-0"
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={getImageUrl(img, 800)}
              alt={`Gallery image ${idx}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={getImageUrl(selectedImage, 1600)}
              alt="Fullscreen view"
              fill
              className="object-contain"
            />
          </div>
          <button className="absolute top-8 right-8 text-white text-4xl">&times;</button>
        </div>
      )}
    </section>
  );
}
