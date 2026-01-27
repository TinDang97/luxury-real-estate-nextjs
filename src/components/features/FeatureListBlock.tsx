"use client";

import { motion } from "framer-motion";

interface FeatureListProps {
  title?: string;
  features: { title: string; description: string }[];
}

export default function FeatureList({ title, features }: FeatureListProps) {
  return (
    <section className="py-24 px-4 md:px-12 xl:px-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        {title && (
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl xl:text-6xl font-light text-center mb-24 font-serif tracking-widest uppercase"
          >
            {title}
          </motion.h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-x-12 gap-y-20">
          {features?.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 border-l border-[#c5a059]/30 hover:border-[#c5a059] transition-all bg-white/5 backdrop-blur-sm rounded-r-xl group"
            >
              <span className="absolute -left-4 top-8 w-8 h-8 bg-[#c5a059] rounded-full flex items-center justify-center text-xs font-bold text-slate-900 shadow-xl group-hover:scale-110 transition-transform">
                {index + 1}
              </span>
              <h4 className="text-xl md:text-2xl font-serif mb-6 text-[#c5a059] tracking-wide">
                {feature.title}
              </h4>
              <p className="text-slate-400 leading-relaxed font-light text-sm md:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
