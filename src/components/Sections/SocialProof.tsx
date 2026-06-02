"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { text: "The Madagascar Vanilla completely changed my standard for ice cream. Pure luxury.", name: "Sophia L." },
  { text: "Every spoonful of Belgian Chocolate feels like an award-winning dessert.", name: "James R." },
  { text: "It’s not just ice cream, it’s a full sensory experience. BOOM is incredible.", name: "Elena M." },
  { text: "The texture is impossibly smooth. Worth every single penny.", name: "David K." },
  { text: "I served this at my dinner party and it stole the show.", name: "Olivia T." },
  { text: "The Gold Pistachio flavor is something out of a dream.", name: "Michael C." },
];

export default function SocialProof() {
  return (
    <section className="py-32 w-full bg-[#111] overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-cream">
          Loved by Connoisseurs
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div
          className="flex whitespace-nowrap gap-6 px-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {/* Double the list for seamless loop */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i} 
              className="glass w-[350px] md:w-[450px] p-8 rounded-3xl shrink-0 hover:bg-white/10 transition-colors"
            >
              <div className="flex gap-1 text-brand-gold mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-brand-cream/90 font-serif italic mb-6 whitespace-normal">
                &quot;{t.text}&quot;
              </p>
              <p className="text-brand-cream/50 text-sm tracking-widest uppercase font-sans">
                — {t.name}
              </p>
            </div>
          ))}
        </motion.div>
        
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#111] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#111] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
