"use client";

import { motion } from "framer-motion";

export default function StoreLocator() {
  return (
    <section className="relative py-40 w-full bg-brand-black flex items-center justify-center overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-chocolate blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif font-bold text-brand-cream mb-8 leading-tight"
        >
          Ready to experience <br />
          <span className="text-gradient">the extraordinary?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-brand-cream/70 mb-12 max-w-2xl mx-auto"
        >
          Find BOOM Ice Cream at select luxury grocers and our signature boutiques worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button className="px-10 py-5 bg-brand-cream text-brand-black font-bold rounded-full hover:bg-brand-gold transition-colors duration-300 text-lg w-full sm:w-auto transform hover:scale-105 active:scale-95">
            Locate a Boutique
          </button>
          <button className="px-10 py-5 bg-transparent border border-brand-cream/30 text-brand-cream font-bold rounded-full hover:bg-brand-cream/10 transition-colors duration-300 text-lg w-full sm:w-auto glass">
            Order Online
          </button>
        </motion.div>
      </div>
      
      {/* Footer minimal */}
      <div className="absolute bottom-6 left-0 w-full text-center text-brand-cream/30 text-sm font-sans">
        © {new Date().getFullYear()} BOOM Ice Cream. All rights reserved.
      </div>
    </section>
  );
}
