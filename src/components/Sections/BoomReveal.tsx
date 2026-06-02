"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BoomReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const pinContainer = pinRef.current;
    if (!canvas || !section || !pinContainer) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    contextRef.current = context;

    let dpr = 1;
    const frameCount = 240;
    const currentFrame = (index: number) =>
      `/assets/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const updateCanvasSize = () => {
      dpr = window.devicePixelRatio || 1;
      // Using window dimensions to match the full viewport
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      render();
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    images[0].onload = () => {
      updateCanvasSize();
      render();
    };

    function render() {
      if (!context || !images[airpods.frame]) return;
      const img = images[airpods.frame];
      if (!img.complete || img.naturalWidth === 0) return;

      context.clearRect(0, 0, canvas!.width, canvas!.height);

      // Object-fit: cover logic mathematically
      const scale = Math.max(canvas!.width / img.width, canvas!.height / img.height);
      const x = (canvas!.width - img.width * scale) / 2;
      const y = (canvas!.height - img.height * scale) / 2;

      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: 0.5,
          pin: pinContainer,
        },
      });

      tl.to(airpods, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: render,
        duration: 1,
      }, 0);
      
      // Fade out the canvas at 95% progress
      tl.to(".boom-canvas-container", {
        opacity: 0,
        duration: 0.05,
      }, 0.95);
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-brand-black z-20">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* 3D Canvas sequence - Positioned centrally to act as the Hero image */}
        <div className="boom-canvas-container absolute inset-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
          />
          {/* Cinematic Noise Grain to mask low-res compression artifacts */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30" 
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          />
          {/* Subtle vignette over the tub to keep it looking luxurious */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black opacity-60 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
