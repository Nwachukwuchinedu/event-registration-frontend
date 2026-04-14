"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Calendar, Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>The New Era of Event Management</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-8"
          >
            Experience <span className="text-gradient-primary">Seamless</span> <br />
            Event Flow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-12 leading-relaxed"
          >
            Manage registrations, track attendees, and create monumental experiences with our next-generation platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/register"
              className="px-8 py-4 rounded-2xl bg-white text-black font-bold flex items-center gap-2 hover:bg-white/90 transition-all shadow-xl shadow-white/5 active:scale-95"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/events"
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all active:scale-95"
            >
              Browse Events
            </Link>
          </motion.div>
        </div>

        {/* Hero Background Grid Effect */}
        <div className="absolute inset-x-0 top-0 h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none -z-20" />
      </section>

      {/* Bento Grid Section */}
      <section className="px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Unmatched Power</h2>
          <p className="text-white/60">Everything you need to handle events at scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full">
          {/* Main Large Card */}
          <GlassCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <Globe className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Reach</h3>
              <p className="text-white/60 leading-relaxed text-lg">
                Connect with attendees from across the globe. Our platform handles localized timing, currency, and multi-language support effortlessly.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800" />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-black bg-zinc-900 flex items-center justify-center text-xs font-bold">
                  +2k
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Medium Card 1 */}
          <GlassCard className="md:col-span-2 flex flex-col justify-center" delay={0.1}>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                <Zap className="text-accent w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Real-time Sync</h3>
                <p className="text-white/60">Instant updates for attendee counts and ticket availability across all devices.</p>
              </div>
            </div>
          </GlassCard>

          {/* Small Card 1 */}
          <GlassCard className="md:col-span-1" delay={0.2}>
            <Calendar className="text-indigo-400 w-8 h-8 mb-4" />
            <h3 className="text-lg font-bold mb-2">Easy Scheduling</h3>
            <p className="text-sm text-white/50">Intuitive calendar integration for both hosts and guests.</p>
          </GlassCard>

          {/* Small Card 2 */}
          <GlassCard className="md:col-span-1" delay={0.3}>
            <Shield className="text-emerald-400 w-8 h-8 mb-4" />
            <h3 className="text-lg font-bold mb-2">Secure Ticketing</h3>
            <p className="text-sm text-white/50">Bank-grade security for all registration and payment data.</p>
          </GlassCard>
        </div>
      </section>

      {/* Featured Events Quick List */}
      <section className="px-6 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Upcoming Experiences</h2>
            <p className="text-white/60 text-sm">Join world-class events happening near you.</p>
          </div>
          <Link href="/events" className="text-accent font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Future Tech Summit", date: "April 28, 2026", loc: "San Francisco" },
            { title: "Indie Dev Showcase", date: "May 12, 2026", loc: "Berlin" },
            { title: "AI Research Forum", date: "June 05, 2026", loc: "Tokyo" }
          ].map((event, i) => (
            <GlassCard key={i} className="p-0 border-none bg-white/[0.02]" delay={0.1 * i}>
              <div className="aspect-video bg-zinc-900 relative">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                 <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 rounded bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider">Conference</span>
                 </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold mb-1">{event.title}</h4>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span>{event.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{event.loc}</span>
                </div>
                <button className="w-full mt-6 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
                  Register Interest
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-6 text-center">
         <p className="text-xs font-bold tracking-[0.2em] text-white/20 uppercase mb-8">Trusted by industry leaders</p>
         <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale contrast-125">
             <span className="text-2xl font-black italic">TECHNO</span>
             <span className="text-2xl font-black italic">QUANTUM</span>
             <span className="text-2xl font-black italic">NEXUS</span>
             <span className="text-2xl font-black italic">AETHER</span>
         </div>
      </section>
    </div>
  );
}
