"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

import Image from "next/image";

const flavors = [
  {
    name: "Madagascar Vanilla",
    description: "Rich, creamy, and infused with real Madagascar vanilla beans.",
    color: "#F8F3E7",
    textColor: "#0A0A0A",
    image: "/assets/flavors/vanilla.png",
  },
  {
    name: "Belgian Chocolate",
    description: "Decadent dark chocolate crafted from the finest Belgian cocoa.",
    color: "#3A2314",
    textColor: "#F8F3E7",
    image: "/assets/flavors/chocolate.png",
  },
  {
    name: "Golden Pistachio",
    description: "Roasted pistachios with a hint of sea salt and edible gold.",
    color: "#D4AF37",
    textColor: "#0A0A0A",
    image: "/assets/flavors/pistachio.png",
  }
];

export default function FlavorExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const scrollContainer = scrollRef.current;
    if (!section || !container || !scrollContainer) return;

    const ctx = gsap.context(() => {
      // Calculate how far to scroll
      const getScrollAmount = () => -(scrollContainer.scrollWidth - window.innerWidth);

      const tween = gsap.to(scrollContainer, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${scrollContainer.scrollWidth}`,
        pin: container,
        animation: tween,
        scrub: 1,
        snap: 1 / (flavors.length - 1), // Perfect snapping to each card
        invalidateOnRefresh: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-brand-black relative">
      <div ref={containerRef} className="h-screen w-full overflow-hidden flex flex-col justify-center relative">
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Heading positioned relative to flex layout, with plenty of spacing */}
        <div className="w-full pl-[10vw] mb-12 z-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-cream">
            Signature <span className="text-brand-gold">Flavors</span>
          </h2>
        </div>

      <div ref={scrollRef} className="flex flex-nowrap gap-10 md:gap-20 px-[10vw] items-center w-[max-content]">
        {flavors.map((flavor, index) => (
          <motion.div
            key={index}
            className="relative h-[60vh] md:h-[65vh] max-h-[700px] aspect-[3/4] shrink-0 rounded-3xl overflow-hidden group cursor-pointer hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)] transition-shadow duration-700"
            whileHover={{ scale: 1.03, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image 
              src={flavor.image}
              alt={flavor.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            {/* Luxury Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

            {/* Subtle Flavor Tint Overlay (Optional luxury touch) */}
            <div 
              className="absolute inset-0 mix-blend-color opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
              style={{ backgroundColor: flavor.color }}
            />

            {/* Inner Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <h3 className="text-3xl font-serif font-bold mb-2 text-brand-cream">{flavor.name}</h3>
                <p className="text-lg opacity-90 text-brand-cream/80 max-w-sm">{flavor.description}</p>
                <button 
                  className="mt-6 px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 bg-brand-cream text-brand-black hover:bg-brand-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                >
                  Discover
                </button>
              </div>
            </div>

            {/* Hover Glow Effect Border */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-brand-gold/50 transition-all duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
