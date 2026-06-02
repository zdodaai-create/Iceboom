"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 100, label: "% Natural", suffix: "" },
  { value: 48, label: "Hours Churned", suffix: "h" },
  { value: 12, label: "Signature Flavors", suffix: "" },
  { value: 5, label: "Global Awards", suffix: "+" },
];

function Counter({ from, to, suffix }: { from: number; to: number; suffix: string }) {
  const [count, setCount] = useState(from);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = from;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / (to - from)));
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === to) clearInterval(timer);
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [inView, from, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function WhyBoom() {
  return (
    <section className="py-32 w-full bg-brand-black text-brand-cream border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            The BOOM Difference
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-cream/70 max-w-2xl mx-auto"
          >
            We don&apos;t just make ice cream; we engineer moments of pure delight.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="glass p-8 rounded-3xl text-center flex flex-col justify-center min-h-[200px]"
            >
              <div className="text-5xl md:text-6xl font-serif font-bold text-brand-gold mb-2">
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base font-sans tracking-wider text-brand-cream/80 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
