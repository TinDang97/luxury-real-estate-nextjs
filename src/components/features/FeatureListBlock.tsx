"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface FeatureListProps {
  title?: string;
  subtitle?: string;
  features: { 
    icon?: string;
    image?: any; 
    title: string; 
    description: string;
  }[];
}

export default function FeatureList({ title, subtitle, features }: FeatureListProps) {
  const getImageUrl = (img: any) => {
    if (!img) return null;
    if (img.url) return img.url;
    try {
      return urlFor(img).width(400).url();
    } catch (e) {
      return null;
    }
  };

  return (
    <section className="py-24 px-4 md:px-12 xl:px-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-24">
            {title && (
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl xl:text-6xl font-light font-serif tracking-widest uppercase mb-4"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/60 text-lg font-light tracking-wide"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12 pt-12">
          {features?.map((feature, index) => {
            const imageUrl = getImageUrl(feature.image);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(197, 160, 89, 0.2)"
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="relative p-10 border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-3xl group overflow-hidden"
              >
                <div className="relative z-10">
                  {/* Image or Icon/Number */}
                  {imageUrl ? (
                    <div className="w-full h-48 mb-6 rounded-xl overflow-hidden relative">
                      <Image
                        src={imageUrl}
                        alt={feature.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  ) : feature.icon ? (
                    <span className="inline-flex items-center justify-center text-4xl mb-8">
                      {feature.icon}
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-[#c5a059] rounded-xl text-lg font-bold text-slate-900 mb-8 shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  )}
                  <h4 className="text-2xl font-serif mb-6 text-white group-hover:text-[#c5a059] transition-colors duration-500 tracking-wide uppercase">
                    {feature.title}
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-light text-base">
                    {feature.description}
                  </p>
                </div>
                
                {/* 2.5D Decorative Element */}
                <motion.div 
                  animate={{ 
                    x: [0, 10, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#c5a059]/5 blur-[60px] rounded-full pointer-events-none"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
