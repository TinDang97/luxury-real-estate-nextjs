"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface Project3DViewProps {
  title?: string;
  subtitle?: string;
  views: {
    label: string;
    url: string;
  }[];
  slug?: {
    current: string;
  };
}

export default function Project3DView({ 
  title, 
  subtitle, 
  views,
  slug
}: Project3DViewProps) {
  const t = useTranslations("Project3DView");
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  // Reset states when tab changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    // Safety timeout for loading
    const timer = setTimeout(() => {
      if (isLoading) {
        // We don't necessarily set error immediately, but we could
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [activeTab]);

  if (!views || views.length === 0) return null;

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const displayTitle = title || t("defaultTitle");
  const displaySubtitle = subtitle || t("defaultSubtitle");

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-5 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-black uppercase tracking-[0.4em] text-[14px] mb-6"
          >
            Immersive Experience
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-primary mb-6"
          >
            {displayTitle}
          </motion.h2>
          {displaySubtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-xl font-light tracking-wide italic"
            >
              {displaySubtitle}
            </motion.p>
          )}
        </div>

        {/* Tabs */}
        {views.length > 1 && (
          <div className="flex justify-center flex-wrap gap-4 mb-10">
            {views.map((view: any, idx: number) => (
              <button
                key={idx}
                onClick={() => {
                  if (activeTab !== idx) {
                    setActiveTab(idx);
                  }
                }}
                className={`px-8 py-3 rounded-full text-[12px] font-bold tracking-[0.2em] uppercase transition-all border ${
                  activeTab === idx 
                    ? "bg-primary text-white border-primary shadow-xl" 
                    : "bg-transparent text-primary border-primary/20 hover:border-primary/40"
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        )}

        {/* Iframe Container */}
        <div className="relative aspect-[21/9] w-full bg-slate-100 rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-200">
          
          <AnimatePresence mode="wait">
            {!isActivated ? (
              <motion.div 
                key="activation-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm cursor-pointer group"
                onClick={() => setIsActivated(true)}
              >
                <div className="bg-white/90 p-6 rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <p className="mt-6 text-white font-bold tracking-[0.3em] uppercase text-sm drop-shadow-md">{t("activate")}</p>
              </motion.div>
            ) : (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Loading Skeleton */}
                {isLoading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-400 font-medium animate-pulse uppercase tracking-widest text-xs">{t("initializing")}</p>
                  </div>
                )}

                {/* Error State */}
                {hasError && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-50 p-10 text-center">
                    <svg className="w-16 h-16 text-slate-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-xl font-bold text-primary mb-2">{t("errorTitle")}</h3>
                    <p className="text-slate-500 mb-8 max-w-sm">{t("errorDesc")}</p>
                    <a 
                      href={views[activeTab].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-8 py-3 bg-accent text-white font-bold rounded-lg hover:shadow-lg transition-all"
                    >
                      {t("directLink")}
                    </a>
                  </div>
                )}

                <iframe
                  src={views[activeTab].url}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  title={views[activeTab].label}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Decorative Frame Overlay */}
          <div className="absolute inset-0 pointer-events-none border-[12px] border-white/5 rounded-3xl z-40" />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm font-medium flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            {t("instruction")}
          </p>
        </div>
      </div>
    </section>
  );
}
