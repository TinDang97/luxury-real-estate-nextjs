"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface GalleryProps {
  heading?: string;
  description?: string;
  images: any[];
}

const GalleryItem = ({ image, index, onClick, getImageUrl }: { 
    image: any, 
    index: number, 
    onClick: (index: number) => void,
    getImageUrl: (img: any, width?: number) => string 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -1 : 1, index % 2 === 0 ? 1 : -1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      className="relative group overflow-hidden rounded-2xl cursor-pointer min-h-[250px] border border-white/10 shadow-xl"
      onClick={() => onClick(index)}
    >
      <motion.div style={{ y, rotate }} className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%]">
        <Image
          src={getImageUrl(image, 800)}
          alt={image.caption || `Gallery image ${index + 1}`}
          fill
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 scale-75 group-hover:scale-100 transition-transform duration-500">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
          </div>
      </div>
      {image.caption && (
        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
          <p className="text-white text-sm font-bold tracking-wider uppercase">{image.caption}</p>
        </div>
      )}
    </motion.div>
  );
};

export default function Gallery({ heading, description, images }: GalleryProps) {
  const t = useTranslations("Gallery");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) return null;

  const validImages = images.filter(img => {
    if (img?.asset?._ref || img?.asset?._id) return true;
    if (typeof img === 'string') return true;
    if (img?.url) return true;
    return false;
  }).map((img, idx) => {
    // Normalize image object
    if (typeof img === 'string') return { url: img, caption: "" };
    return img;
  });
  
  if (validImages.length === 0) return null;

  const getImageUrl = (img: any, width: number = 800) => {
    if (typeof img === 'string') return img;
    if (img?.url) return img.url;
    try {
      return urlFor(img).width(width).url();
    } catch (e) {
      return "/assets/images/placeholder.jpg";
    }
  };

  const paginate = useCallback((newDirection: number) => {
    if (selectedIndex === null) return;
    setDirection(newDirection);
    const nextIndex = (selectedIndex + newDirection + validImages.length) % validImages.length;
    setSelectedIndex(nextIndex);
  }, [selectedIndex, validImages.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "f") toggleFullscreen();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, paginate]);

  const swipeVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const displayHeading = heading || t("defaultHeading");
  const displayDescription = description || t("defaultDescription");

  return (
    <section className="py-24 bg-[#0a0f16]">
      <div className="max-w-[1800px] mx-auto px-5 md:px-12 xl:px-24">
        {(displayHeading || displayDescription) && (
          <div className="mb-20">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent font-black uppercase tracking-[0.4em] text-[12px] mb-4"
            >
              Exquisite Perspective
            </motion.p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                {displayHeading && (
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight"
                    >
                        {displayHeading}
                    </motion.h2>
                )}
                {displayDescription && (
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/50 max-w-xl font-light tracking-wide text-lg border-l border-white/10 pl-8"
                    >
                        {displayDescription}
                    </motion.p>
                )}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Highlight Image - Index 0 */}
          <div 
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl cursor-pointer border border-white/5 shadow-2xl aspect-[4/3] md:aspect-auto min-h-[400px]"
            onClick={() => setSelectedIndex(0)}
          >
            <motion.div 
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 1.5 }}
               className="absolute inset-0"
            >
                <Image
                    src={getImageUrl(validImages[0], 1600)}
                    alt="Project Highlight"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-12 left-12 right-12">
                <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Signature Shot</span>
                <h3 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">{validImages[0].caption || "Project Overview"}</h3>
                <div className="h-1 w-20 bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </div>
            
            <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
            </div>
          </div>

          {/* Subsequent Images - Show only up to 9 more (indices 1-9) */}
          {validImages.slice(1, 10).map((img, idx) => (
            <GalleryItem 
              key={idx + 1} 
              image={img} 
              index={idx + 1} 
              onClick={setSelectedIndex} 
              getImageUrl={getImageUrl} 
            />
          ))}

          {/* View More Button - Show if there are 11+ images */}
          {validImages.length > 10 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05 * 9 }}
              onClick={() => setSelectedIndex(10)}
              className="relative group overflow-hidden rounded-2xl cursor-pointer min-h-[250px] border border-white/10 shadow-xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent hover:from-accent/30 hover:via-accent/20 transition-all duration-500"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/30 mb-4 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white font-bold tracking-wider uppercase text-sm">View More</p>
                <p className="text-white/70 text-xs mt-2">+{validImages.length - 10} {validImages.length - 10 === 1 ? 'image' : 'images'}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Enhanced Lightbox */}
      <AnimatePresence initial={false} custom={direction}>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black flex items-center justify-center overflow-hidden"
          >
            {/* Top Bar */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-[2020] bg-gradient-to-b from-black/60 to-transparent"
            >
              <div className="text-white font-bold tracking-[0.3em] uppercase text-[10px]">
                <span className="text-accent">{selectedIndex + 1}</span> / {validImages.length}
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleFullscreen}
                  className="text-white/50 hover:text-white p-2 transition-colors group"
                  title={isFullscreen ? t("exitFullscreen") : t("fullscreen")}
                >
                  {isFullscreen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9L4 4m0 0l5 0M4 4l0 5M15 9l5-5m0 0l-5 0m5 0l0 5M9 15l-5 5m0 0l5 0m-5 0l0-5M15 15l5 5m0 0l-5 0m5 0l0-5" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  )}
                </button>
                <button 
                  onClick={() => setSelectedIndex(null)}
                  className="text-white/50 hover:text-white p-2 group"
                >
                  <svg className="w-8 h-8 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Navigation Tools */}
            <div className="absolute inset-y-0 left-4 md:left-10 flex items-center z-[2010]">
                <button 
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                  className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors backdrop-blur-md"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
            </div>
            
            <div className="absolute inset-y-0 right-4 md:right-10 flex items-center z-[2010]">
                <button 
                   onClick={(e) => { e.stopPropagation(); paginate(1); }}
                   className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors backdrop-blur-md"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
            </div>

            {/* Swipeable Image Wrapper */}
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={selectedIndex}
                        custom={direction}
                        variants={swipeVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full h-full flex items-center justify-center"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={getImageUrl(validImages[selectedIndex], 2400)}
                                alt={validImages[selectedIndex].caption || "Gallery View"}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        
                        {/* Caption Overlay */}
                        {validImages[selectedIndex].caption && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl text-center min-w-[300px]"
                            >
                                <p className="text-white text-lg font-medium tracking-wide uppercase">{validImages[selectedIndex].caption}</p>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
