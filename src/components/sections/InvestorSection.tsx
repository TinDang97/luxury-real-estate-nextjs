"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface InvestorSectionProps {
  investor: {
    _id: string;
    name: string;
    slug: string;
    logo?: any;
    coverImage?: any;
    vision?: string;
  };
  locale: string;
}

export default function InvestorSection({ investor, locale }: InvestorSectionProps) {
  const t = useTranslations("Investor");

  if (!investor) return null;

  return (
    <section className="relative py-32 overflow-hidden bg-[#0c1a2c]">
      {/* Background Image / Overlay */}
      {investor.coverImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(investor.coverImage).url()}
            alt={investor.name}
            fill
            className="object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2c] via-[#0c1a2c]/80 to-transparent" />
        </div>
      )}

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-black uppercase tracking-[0.4em] text-[12px] mb-8">
              {t("aboutDeveloper")}
            </p>
          </motion.div>

          {investor.logo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-10 h-20 flex items-center justify-center filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src={urlFor(investor.logo).url()}
                alt={investor.name}
                className="h-full w-auto object-contain"
              />
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8"
          >
            {investor.name}
          </motion.h2>

          {investor.vision && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-12"
            >
              {investor.vision}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              href={`/${locale}/investors/${investor.slug}`}
              className="group relative inline-flex items-center gap-4 px-12 py-5 bg-accent text-white font-bold tracking-[0.3em] text-[11px] hover:bg-white hover:text-primary transition-all uppercase shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">{t("viewProfile")}</span>
              <motion.span 
                className="relative z-10 transition-transform group-hover:translate-x-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Grid Pattern Decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>
    </section>
  );
}
