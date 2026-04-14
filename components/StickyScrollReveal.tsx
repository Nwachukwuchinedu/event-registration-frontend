"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyScrollRevealProps {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  className?: string;
}

export default function StickyScrollReveal({ content, className }: StickyScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[600vh] flex flex-col items-start gap-10 px-6", className)}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-between overflow-hidden gap-12">
        {/* Left side: Text Content */}
        <div className="relative flex w-1/2 flex-col gap-10 px-4">
          {content.map((item, index) => {
            // Each item appears for a fraction of the scroll progress
            const start = index / content.length;
            const end = (index + 1) / content.length;
            
            // Adjust ranges: fade in sooner, stay for 60% of segment, fade out later
            // [start, start + fadeIntime, end - fadeOutTime, end]
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const translateY = useTransform(scrollYProgress, [start, start + 0.1], [40, 0]);

            return (
              <motion.div
                key={item.title + index}
                style={{ opacity, y: translateY }}
                className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex flex-col gap-6"
              >
                <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter text-white">
                  {item.title}
                </h2>
                <p className="max-w-md text-lg text-white/40 leading-relaxed font-sans">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Right side: Visual Content/Animation */}
        <div className="relative h-4/5 w-1/2 rounded-3xl glass-dark overflow-hidden border border-white/5">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
             
             {content.map((item, index) => {
               const start = index / content.length;
               const end = (index + 1) / content.length;
               // eslint-disable-next-line react-hooks/rules-of-hooks
               const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.8, 1, 1, 0.8]);
               // eslint-disable-next-line react-hooks/rules-of-hooks
               const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);

               return (
                 <motion.div
                   key={"visual" + index}
                   style={{ scale, opacity }}
                   className="absolute inset-0 flex items-center justify-center p-8"
                 >
                   {item.content || (
                     <div className="w-full h-full rounded-2xl bg-white/5 animate-pulse flex items-center justify-center">
                        <span className="text-white/10 font-black text-8xl uppercase tracking-tighter select-none">Preview</span>
                     </div>
                   )}
                 </motion.div>
               );
             })}
        </div>
      </div>
    </div>
  );
}
