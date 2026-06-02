"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

export default function IngredientStory() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -45]);

  useEffect(() => {
    if (!textRef.current) return;
    
    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[120vh] w-full bg-brand-cream text-brand-black overflow-hidden flex items-center justify-center">
      
      {/* Background Story Elements */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-20 left-10 w-64 h-64 bg-[url('https://images.unsplash.com/photo-1596647285556-9177114dfbc6?auto=format&fit=crop&q=80')] bg-cover bg-center rounded-full opacity-30 mix-blend-multiply"
      />
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-[url('https://images.unsplash.com/photo-1615486171448-4fb603058863?auto=format&fit=crop&q=80')] bg-cover bg-center rounded-full opacity-30 mix-blend-multiply"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center" ref={textRef}>
        <h2 className="text-sm font-sans tracking-[0.3em] uppercase mb-8 font-semibold">Our Ingredients</h2>
        <p className="text-4xl md:text-6xl font-serif leading-tight">
          We travel the world to source the <span className="font-bold italic text-brand-chocolate">finest ingredients</span>. 
          From single-origin Madagascar vanilla to hand-picked pistachios.
        </p>
        <p className="mt-12 text-xl md:text-2xl font-sans text-brand-black/70 max-w-2xl mx-auto">
          No artificial flavors. No compromises. Just pure, unadulterated luxury in every bite.
        </p>
      </div>

    </section>
  );
}
