"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Play, Globe, Zap, Users, Star } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import ThreeScene from "@/components/ThreeScene";
import StickyScrollReveal from "@/components/StickyScrollReveal";
import Footer from "@/components/Footer";
import { useRef } from "react";
import Image from "next/image";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const stickyContent = [
    {
      title: "Real-time Synchronization",
      description: "Experience the pulse of your event with instant attendee updates, live-floor tracking, and cloud-synced registration logs across all global nodes.",
      content: (
        <div className="relative w-full h-full rounded-2xl overflow-hidden glass-dark border border-white/10 group">
          <Image 
             src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80" 
             alt="Sync" 
             fill 
             className="object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )
    },
    {
      title: "Cinematic Event Reels",
      description: "Auto-generate high-production highlight reels for your attendees using our integrated AI-motion capture and cloud rendering engine.",
      content: (
        <div className="relative w-full h-full rounded-2xl overflow-hidden glass-dark border border-white/10 flex items-center justify-center bg-black/40">
           <motion.div 
             animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
             transition={{ duration: 10, repeat: Infinity }}
             className="w-32 h-32 rounded-full bg-accent/20 flex items-center justify-center text-accent ring-8 ring-accent/5"
           >
              <Play fill="currentColor" className="w-12 h-12 ml-1" />
           </motion.div>
           <Image 
             src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80" 
             alt="Reel" 
             fill 
             className="object-cover -z-10 opacity-40" 
           />
        </div>
      )
    },
    {
      title: "Global Scalability",
      description: "From intimate VIP galleries to stadium-sized summits, EventFlow scales with your ambition, ensuring sub-100ms latency on all registration requests.",
      content: (
        <div className="relative w-full h-full rounded-2xl overflow-hidden glass-dark border border-white/10">
           <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-primary/20" />
           <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-white/5" />
           <Image 
             src="https://images.unsplash.com/photo-1475721027185-da9621379393?auto=format&fit=crop&q=80" 
             alt="Global" 
             fill 
             className="object-cover -z-10 opacity-60" 
           />
        </div>
      )
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-black scroll-smooth">
      <ThreeScene />

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black uppercase tracking-[0.3em] mb-12 shadow-2xl shadow-primary/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>The New Era of Event Management</span>
          </motion.div>

          <h1 className="text-6xl md:text-[9rem] font-black font-heading leading-[0.85] tracking-tighter mb-12 text-white">
            DESIGNED <br />
            <span className="text-gradient">FOR ELITE</span> <br />
            EXPERIENCES.
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-white/40 mb-16 font-sans font-medium tracking-tight h-12 overflow-hidden relative">
            <motion.span
               animate={{ y: [0, -40, -80, 0] }}
               transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
               className="flex flex-col gap-4 absolute inset-x-0"
            >
               <span>Scale your ambition with monumental tech.</span>
               <span>The fastest registration engine on the planet.</span>
               <span>A cinematic experience for every attendee.</span>
            </motion.span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link
              href="/register"
              className="group px-10 py-5 rounded-2xl bg-white text-black font-black text-lg flex items-center gap-3 hover:bg-white/90 transition-all shadow-2xl shadow-white/5"
            >
              Get Started
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/events"
              className="px-10 py-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
            >
              Browse Events
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 2 }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20"
        >
           <span>Scroll to explore</span>
           <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* Unique Value Sections - Bento Enhanced */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 min-h-[800px]">
           {/* Cinematic Large Card */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="md:col-span-8 md:row-span-2 relative group rounded-[2.5rem] overflow-hidden glass-dark border border-white/5"
           >
              <Image 
                src="https://images.unsplash.com/photo-1540575861501-7ad058211a37?auto=format&fit=crop&q=80"
                alt="Elite Event"
                fill
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary backdrop-blur-md">
                       <Zap className="w-6 h-6" />
                    </span>
                    <h3 className="text-4xl font-black font-heading tracking-tight text-white">The Engine for High-Growth summits.</h3>
                 </div>
                 <p className="max-w-xl text-white/50 text-xl font-medium leading-relaxed">
                    Designed for founders who demand excellence. We handle the complexity of massive-scale ticketing so you can focus on the vision.
                 </p>
              </div>
           </motion.div>

           {/* Stats Card */}
           <GlassCard className="md:col-span-4 p-8 flex flex-col justify-between" delay={0.2}>
              <div className="space-y-2">
                 <h4 className="text-white/40 text-xs font-black uppercase tracking-widest">Global Performance</h4>
                 <p className="text-5xl font-black font-heading tracking-tighter text-white">100ms</p>
                 <p className="text-sm font-medium text-primary uppercase tracking-[0.2em]">P99 Latency</p>
              </div>
              <div className="pt-8 border-t border-white/5 mt-auto">
                 <p className="text-white/40 text-sm italic">"The fastest system we've ever used." — NexaTech CEO</p>
              </div>
           </GlassCard>

           {/* Users Card */}
           <GlassCard className="md:col-span-4 p-8 bg-accent/5 border-accent/10" delay={0.3}>
              <Users className="text-accent w-10 h-10 mb-6" />
              <h4 className="text-2xl font-black font-heading text-white mb-2">2M+ Attendees</h4>
              <p className="text-white/40 text-sm leading-relaxed mb-6">Empowering millions of interactions every month across every major tech hub.</p>
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800" />
                 ))}
                 <div className="w-10 h-10 rounded-full border-2 border-black bg-zinc-900 border-dashed flex items-center justify-center text-[10px] font-black text-white/50">
                    +250
                 </div>
              </div>
           </GlassCard>
        </div>
      </section>

      {/* STICKY SCROLL SECTION - PAUSES VERTICAL SCROLL */}
      <section className="relative z-10 w-full bg-gradient-to-b from-black to-zinc-950">
         <div className="max-w-7xl mx-auto py-24 px-6 border-b border-white/5">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-primary mb-2">Core Competencies</h2>
            <h3 className="text-5xl font-black font-heading text-white tracking-tighter">THE FLOW ARCHITECTURE</h3>
         </div>
         <StickyScrollReveal content={stickyContent} />
      </section>

      {/* Featured Events Highlight */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto w-full">
         <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div>
               <h2 className="text-5xl font-black font-heading text-white tracking-tighter mb-4">FORTHCOMING REELS.</h2>
               <p className="text-white/40 max-w-md text-lg">Secure your credentials for the next generation of industry-defining experiences.</p>
            </div>
            <Link href="/events" className="group h-14 px-8 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-white font-bold hover:bg-white/10 transition-transform active:scale-95">
               View Registry
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
               { 
                 title: "NEO-FUTURE CON", 
                 loc: "AETHER DOME, NY", 
                 img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80" 
               },
               { 
                 title: "QUANTUM SUMMIT", 
                 loc: "SILICON VALLEY, CA", 
                 img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80" 
               },
               { 
                 title: "HORIZON GALACTIC", 
                 loc: "VIRTUAL REALITY, GLOBAL", 
                 img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80" 
               }
            ].map((ev, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="relative h-[500px] rounded-[2rem] overflow-hidden group border border-white/5"
               >
                  <Image src={ev.img} alt={ev.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                     <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest mb-2">
                        <Star className="w-3 h-3 fill-primary" />
                        <span>Exclusive Venue</span>
                     </div>
                     <h4 className="text-3xl font-black font-heading text-white tracking-tight mb-2">{ev.title}</h4>
                     <p className="text-white/50 text-sm mb-8 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {ev.loc}
                     </p>
                     <button className="w-full py-4 rounded-xl glass text-white font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Join Event
                     </button>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* Unique Trust Ticker */}
      <section className="py-24 border-t border-white/5">
         <div className="flex flex-col gap-12 overflow-hidden">
            <motion.div 
               animate={{ x: [0, -1000] }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="flex gap-24 whitespace-nowrap opacity-10"
            >
               {[...Array(10)].map((_, i) => (
                  <span key={i} className="text-7xl font-black italic tracking-tighter uppercase whitespace-nowrap">
                     EventFlow Elite Registry — Monumental Experiences — The Flow Architecture — 
                  </span>
               ))}
            </motion.div>
         </div>
      </section>

      <Footer />
    </div>
  );
}

function MapPin({ className }: { className: string }) {
  return (
    <svg 
       className={className} 
       xmlns="http://www.w3.org/2000/svg" 
       viewBox="0 0 24 24" 
       fill="none" 
       stroke="currentColor" 
       strokeWidth="2" 
       strokeLinecap="round" 
       strokeLinejoin="round" 
    >
       <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
       <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
