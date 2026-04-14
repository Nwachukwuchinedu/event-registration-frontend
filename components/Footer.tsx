"use client";

import Link from "next/link";
import { Calendar, Globe, MessageSquare, Camera, Code, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 pt-24 pb-12 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-heading">
              EventFlow
            </span>
          </Link>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            The next generation of event management. Create, manage, and experience monumental events with our elite platform.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 font-heading">Platform</h4>
          <ul className="space-y-4 text-sm text-white/40">
            <li><Link href="/events" className="hover:text-primary transition-colors">Browse Events</Link></li>
            <li><Link href="/register" className="hover:text-primary transition-colors">Get Started</Link></li>
            <li><Link href="/login" className="hover:text-primary transition-colors">Sign In</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 font-heading">Resources</h4>
          <ul className="space-y-4 text-sm text-white/40">
            <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Partner Program</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 font-heading">Connect</h4>
          <div className="flex gap-4 mb-6">
            <SocialLink href="#" icon={<MessageSquare className="w-5 h-5" />} />
            <SocialLink href="#" icon={<Camera className="w-5 h-5" />} />
            <SocialLink href="#" icon={<Code className="w-5 h-5" />} />
            <SocialLink href="#" icon={<Mail className="w-5 h-5" />} />
          </div>
          <p className="text-xs text-white/30">
            Subscribe to our newsletter for event insights.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
        <p>© 2026 EventFlow Elite. All rights Reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-primary transition-all duration-300"
    >
      {icon}
    </Link>
  );
}
