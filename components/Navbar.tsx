"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, LogOut, Menu, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse navbar user:", err);
      }
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-black/40 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
            <Calendar className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gradient">
            EventFlow
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/events">Events</NavLink>
          {user ? (
            <>
              {user.role === "admin" && (
                <NavLink href="/admin" className="text-emerald-400 font-bold border-r border-white/10 pr-8">
                  Admin Panel
                </NavLink>
              )}
              <NavLink href="/dashboard">Dashboard</NavLink>
              <button 
                onClick={() => window.location.href = "/dashboard"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium"
              >
                <User className="w-4 h-4" />
                <span>{user.name}</span>
              </button>
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all shadow-lg hover:shadow-white/10 active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 md:hidden flex flex-col gap-6"
          >
            <NavLink href="/events" onClick={() => setIsMobileMenuOpen(false)}>Events</NavLink>
            <NavLink href="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</NavLink>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full h-12 flex items-center justify-center rounded-xl bg-primary text-white font-semibold"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ href, children, onClick, className }: { href: string; children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm font-medium text-white/70 hover:text-white transition-colors relative group",
        className
      )}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
    </Link>
  );
}
