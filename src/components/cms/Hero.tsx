"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HeroProps {
  heading: string;
  category?: string;
  location?: string;
  backgroundImage: any;
}

export default function Hero({ heading, category, location, backgroundImage }: HeroProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        {bgUrl && (
          <Image
            src={bgUrl}
            alt={heading}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="absolute bottom-0 left-0 w-full p-6 md:p-12 xl:p-20 z-10"
      >
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
            className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-serif font-bold text-white mb-6 leading-[1.1] drop-shadow-2xl"
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
      </motion.div>
    </section>
  );
}
