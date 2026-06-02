"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorySequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random particles only on the client to prevent SSR hydration errors
  const [particles, setParticles] = useState<Array<{size: number, top: number, left: number, opacity: number, blur: number}>>([]);

  useEffect(() => {
    setParticles([...Array(40)].map(() => ({
      size: Math.random() * 6 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.4 + 0.1,
    })));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      // Create a massive timeline pinned for 800% of the viewport height 
      // This allows extremely slow, luxurious scrubbing for 4 separate screens
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=800%", 
          scrub: 1.5, // 1.5 adds a luxurious lag/smoothing to the scrub
          pin: container,
        },
      });

      // --- SCREEN 1: THE OBSESSION ---
      tl.to(".screen-1", { opacity: 1, duration: 1 })
        // Simulate gold sweep light by moving background-position
        .to(".crafted-text", { backgroundPosition: "200% center", duration: 3 }, "-=0.5")
        // Breathing scale while holding
        .to(".screen-1-content", { scale: 1.05, duration: 3 }, "-=3")
        // Fade out Screen 1
        .to(".screen-1", { opacity: 0, duration: 1.5 });

      // --- SCREEN 2: THE EXPERIENCE ---
      tl.to(".screen-2", { opacity: 1, duration: 1 });
      // Word by word stagger
      tl.fromTo(".s2-word", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.3 }, 
        "-=0.5"
      );
      // Parallax particles on scroll (they move up as you scroll down)
      tl.to(".particles", { y: -300, duration: 4 }, "-=3");
      // Fade out Screen 2
      tl.to(".screen-2", { opacity: 0, duration: 1.5 });

      // --- SCREEN 3: THE FEELING ---
      tl.set(".s3-title", { scale: 1.2 }); // Setup initial scale
      tl.to(".screen-3", { opacity: 1, duration: 1 })
        // Scale down to 1
        .to(".s3-title", { scale: 1, duration: 3 }, "-=1")
        // Fade in subtitle smoothly
        .fromTo(".s3-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5 }, "-=2")
        // Fade out Screen 3
        .to(".screen-3", { opacity: 0, duration: 1.5 });

      // --- SCREEN 4: THE REVEAL ---
      // Expand dark gold gradient
      tl.to(".s4-bg-glow", { scale: 2.5, opacity: 0.8, duration: 3 });
      tl.to(".screen-4", { opacity: 1, duration: 1 }, "-=3");
      // Contract letter spacing
      tl.fromTo(".s4-title", 
        { letterSpacing: "0.4em", opacity: 0 }, 
        { letterSpacing: "normal", opacity: 1, duration: 2.5 }, 
        "-=2.5"
      );
      
      // Hold the final screen for a moment before unpinning
      tl.to({}, { duration: 1.5 });

    }, section); // Scoped to section to allow inner pinning without React crash

    return () => ctx.revert();
  }, [particles]); // Depend on particles so GSAP attaches after they render

  return (
    <section ref={sectionRef} className="w-full bg-brand-black relative z-10">
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center bg-brand-black">
        
        {/* --- SCREEN 1: THE OBSESSION --- */}
        <div className="screen-1 absolute inset-0 flex items-center justify-center opacity-0">
          <div className="screen-1-content text-center px-4">
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-brand-cream/80 leading-tight tracking-tight">
              Not Made. <br />
              <span 
                className="crafted-text inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#8B6508] via-[#FFD700] to-[#8B6508] bg-[length:200%_auto] bg-left mt-2"
              >
                Crafted.
              </span>
            </h2>
          </div>
        </div>

        {/* --- SCREEN 2: THE EXPERIENCE --- */}
        <div className="screen-2 absolute inset-0 flex items-center justify-center opacity-0 bg-brand-black">
          {/* Particles Background */}
          <div className="particles absolute inset-0 opacity-50 pointer-events-none">
            {particles.map((p, i) => (
              <div 
                key={i} 
                className="absolute bg-brand-gold rounded-full"
                style={{
                  width: p.size + "px",
                  height: p.size + "px",
                  top: p.top + "%",
                  left: p.left + "%",
                  opacity: p.opacity,
                }}
              />
            ))}
          </div>
          <div className="text-center z-10 px-4 w-full max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-medium text-brand-cream leading-relaxed flex flex-wrap justify-center gap-x-4 md:gap-x-6">
              {["Every", "Scoop", "Creates", "a", "Moment."].map((word, i) => (
                <span key={i} className="s2-word inline-block drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{word}</span>
              ))}
            </h2>
          </div>
        </div>

        {/* --- SCREEN 3: THE FEELING --- */}
        <div className="screen-3 absolute inset-0 flex flex-col items-center justify-center opacity-0 bg-brand-black px-4">
          <h2 className="s3-title text-6xl md:text-8xl lg:text-[11rem] font-serif font-bold text-brand-cream mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] text-center tracking-tighter">
            Indulgence.
          </h2>
          <p className="s3-subtitle text-xl md:text-3xl lg:text-4xl text-brand-cream/70 font-sans tracking-wide drop-shadow-lg text-center max-w-4xl font-light">
            Rich textures. Premium ingredients. Unforgettable taste.
          </p>
        </div>

        {/* --- SCREEN 4: THE REVEAL --- */}
        <div className="screen-4 absolute inset-0 flex items-center justify-center opacity-0 bg-brand-black overflow-hidden">
          {/* Expanding Radial Gold Glow */}
          <div className="s4-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] bg-brand-gold/20 rounded-full blur-[100px] pointer-events-none opacity-0 scale-50" />
          
          <h2 className="s4-title text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-brand-gold text-center relative z-10 drop-shadow-[0_0_40px_rgba(212,175,55,0.6)] px-4">
            Welcome to BOOM.
          </h2>
        </div>

      </div>
    </section>
  );
}
