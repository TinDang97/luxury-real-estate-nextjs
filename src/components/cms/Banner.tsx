"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { motion } from "framer-motion";

interface BannerProps {
  title: string;
  content?: string;
  buttonText?: string;
  backgroundImage: any;
}

export default function Banner({ title, content, buttonText, backgroundImage }: BannerProps) {
  // Helper to get image URL
  const getImageUrl = (img: any) => {
    if (!img) return null;
    if (typeof img === 'string') return img;
    if (img?.url) return img.url;
    try {
      return urlFor(img).width(2500).quality(90).url();
    } catch (e) {
      return null;
    }
  };

  const bgUrl = getImageUrl(backgroundImage);

  return (
    <section className="relative py-32 md:py-48 px-4 md:px-12 xl:px-24 overflow-hidden bg-slate-900">
      {bgUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgUrl}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0c1a2c]/85" />
        </div>
      )}
      {!bgUrl && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0c1a2c] to-[#1a2f47]" />
      )}
      <div className="relative z-10 max-w-[1200px] mx-auto text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif mb-8 tracking-tight drop-shadow-lg"
        >
          {title}
        </motion.h2>
        {content && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl xl:text-2xl text-slate-200 mb-12 leading-relaxed font-light tracking-wide"
          >
            {content}
          </motion.p>
        )}
        {buttonText && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#c5a059] text-white px-12 py-5 uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold hover:bg-[#b08d4a] transition-all shadow-2xl rounded-sm"
          >
            {buttonText}
          </motion.button>
        )}
      </div>
    </section>
  );
}
