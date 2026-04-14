"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Calendar, 
  LayoutDashboard, 
  MapPin, 
  ShieldCheck, 
  LogOut, 
  User as UserIcon,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  user: any;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const menuItems = [
    { name: "Landing", href: "/", icon: Home },
    { name: "Explore Events", href: "/events", icon: MapPin },
    { name: "My Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  if (user?.role === "admin") {
    menuItems.push({ name: "Admin Panel", href: "/admin", icon: ShieldCheck });
  }

  return (
    <aside className="w-72 h-screen sticky top-0 bg-zinc-950/50 backdrop-blur-2xl border-r border-white/5 flex flex-col p-6 z-[60]">
      {/* Logo Area */}
      <Link href="/" className="flex items-center gap-3 px-2 mb-12 group">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
          <Calendar className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight text-gradient">
          EventFlow
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative overflow-hidden",
                isActive 
                  ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                />
              )}
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-white/30 group-hover:text-white/60")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Area */}
      <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-white/40" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">{user?.name}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-black leading-none mt-1">
              {user?.role}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all border border-transparent hover:border-red-400/20"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
