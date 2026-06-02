"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(1000);

  useEffect(() => {
    setVh(window.innerHeight);
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map scroll position:
  // Hidden (opacity: 0, translated up slightly) during the 3D Tub animation (0 to 250vh)
  // Fades in and slides down into the center between 250vh and 300vh
  const opacity = useTransform(scrollY, [vh * 2.5, vh * 3], [0, 1]);
  const y = useTransform(scrollY, [vh * 2.5, vh * 3], [-20, 0]);

  return (
    <header className="global-header fixed top-0 left-0 w-full z-50 h-24 pointer-events-none flex justify-center items-center">
      <motion.div
        style={{ opacity, y }}
        className="pointer-events-auto cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <Image 
          src="/assets/logo.png" 
          alt="BOOM Ice Cream Logo" 
          width={140} 
          height={70} 
          className="object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] w-[100px] md:w-[140px] h-auto"
          priority
        />
      </motion.div>
    </header>
  );
}
