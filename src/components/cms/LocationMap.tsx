"use client";

import { motion } from "framer-motion";

interface LocationMapProps {
  address?: string;
  latitude?: number;
  longitude?: number;
  projectName: string;
}

export default function LocationMap({ address, latitude, longitude, projectName }: LocationMapProps) {
  const mapQuery = (latitude && longitude)
    ? `${latitude},${longitude}`
    : encodeURIComponent(address || projectName);
  
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapQuery}&zoom=15`;

  const directionsUrl = (latitude && longitude)
    ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address || projectName)}`;

  return (
    <section className="py-32 px-4 md:px-12 xl:px-24 bg-slate-50 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl xl:text-6xl font-serif text-slate-900 mb-16 text-center uppercase tracking-[0.2em]"
        >
           Vị Trí Dự Án
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Info */}
            <div className="lg:col-span-1 border-l-4 border-[#c5a059] pl-6 py-2">
               <motion.h4 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3 }}
                 className="font-serif text-xl text-[#0c1a2c] mb-4 font-bold uppercase"
               >
                 {projectName}
               </motion.h4>
               <motion.p 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 }}
                 className="text-slate-600 text-sm leading-relaxed mb-8"
               >
                 {address || "District 2, Ho Chi Minh City"}
               </motion.p>
               
               <motion.a 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 href={directionsUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 bg-[#0c1a2c] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all uppercase tracking-widest shadow-lg"
               >
                 <span>Chỉ Đường</span> ↗
               </motion.a>
            </div>

            {/* Interactive Map with Zoom Entry */}
            <div className="lg:col-span-3">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="relative h-[500px] rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-slate-100 group"
              >
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-transform duration-1000"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
