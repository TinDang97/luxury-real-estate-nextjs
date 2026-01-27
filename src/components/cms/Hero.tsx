"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
  heading: string;
  category?: string;
  location?: string;
  backgroundImage: any;
}

export default function Hero({ heading, category, location, backgroundImage }: HeroProps) {
  // Helper to get image URL
  const getImageUrl = (img: any) => {
    if (!img) return null;
    if (typeof img === 'string') return img;
    if (img?.url) return img.url;
    try {
      return urlFor(img).width(1920).quality(90).url();
    } catch (e) {
      return null;
    }
  };

  const bgUrl = getImageUrl(backgroundImage);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {bgUrl && (
          <Image
            src={bgUrl}
            alt={heading}
            fill
            className="object-cover transition-transform duration-[20s] hover:scale-110"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 xl:p-20 z-10">
        <div className="max-w-[1800px] mx-auto">
          {category && (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block py-1.5 px-4 mb-6 text-[10px] md:text-xs font-bold tracking-[0.2em] text-white uppercase bg-[#c5a059] rounded-sm shadow-lg"
            >
              {category}
            </motion.span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-serif font-bold text-white mb-6 leading-[1.1] drop-shadow-2xl"
          >
            {heading}
          </motion.h1>
          {location && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm md:text-xl xl:text-2xl text-white/90 font-light tracking-widest max-w-3xl flex items-center gap-3"
            >
              <span className="w-8 h-8 md:w-10 md:h-10 inline-flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full text-xs md:text-sm border border-white/20">📍</span> 
              {location}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
