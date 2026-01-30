'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ProjectGalleryProps {
  images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const t = useTranslations('Gallery');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Use the first image as highlight, rest as grid
  const highlightImage = images[0];
  const gridImages = images.slice(1);

  return (
    <div className="mb-16 reveal-on-load">
      <h3 className="font-serif text-2xl font-bold text-primary mb-6">{t('defaultHeading')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
        {/* Highlight Image (Large) */}
        <div 
          className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer"
          onClick={() => setSelectedImage(highlightImage)}
        >
          <Image 
            src={highlightImage} 
            alt="Project Highlight"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
        </div>

        {/* Grid Images */}
        {gridImages.map((img, idx) => (
          <div 
            key={idx}
            className="relative group overflow-hidden rounded-2xl cursor-pointer h-full min-h-[200px]"
            onClick={() => setSelectedImage(img)}
          >
            <Image 
              src={img} 
              alt={`Project Gallery ${idx + 2}`}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Gallery Fullscreen" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in duration-300" 
          />
          <button className="absolute top-8 right-8 text-white text-4xl hover:text-accent">&times;</button>
        </div>
      )}
    </div>
  );
}
