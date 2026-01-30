"use client";

import { motion } from "framer-motion";

interface VideoSectionProps {
  title?: string;
  subtitle?: string;
  videoUrl: string;
}

export default function VideoSection({ title, subtitle, videoUrl }: VideoSectionProps) {
  // Extract YouTube ID from URL
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(videoUrl);

  if (!videoId) return null;

  return (
    <section className="py-20 bg-[#0c1a2c] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#c5a059]/10 blur-[150px] rounded-full"
        />
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          {title && (
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif font-bold text-white mb-4"
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg font-light tracking-wide"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-black"
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1`}
            title={title || "Project Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
