"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { registrationApi } from "@/lib/api";
import GlassCard from "@/components/GlassCard";
import { Calendar, MapPin, XCircle, LayoutDashboard, Ticket, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("user");
    
    if (!token) {
      router.push("/login");
      return;
    }

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    }

    async function fetchMyRegistrations() {
      try {
        const data = await registrationApi.getMyRegistrations();
        setRegistrations(data.registrations || []);
      } catch (error) {
        console.error("Failed to fetch registrations:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMyRegistrations();
  }, [router]);

  const handleCancel = async (regId: string) => {
    if (!confirm("Are you sure you want to cancel your registration for this event?")) return;
    
    setIsCancelling(regId);
    try {
      await registrationApi.cancelRegistration(regId);
      setRegistrations(prev => prev.filter(r => r._id !== regId));
    } catch (error) {
      alert("Failed to cancel registration. Please try again.");
    } finally {
      setIsCancelling(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    router.push("/");
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-4">
           <GlassCard className="p-6 overflow-hidden relative" hoverEffect={false}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 blur-2xl rounded-full" />
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-xl font-bold border border-white/10">
                {user?.name?.[0] || <Ticket />}
              </div>
              <h2 className="font-bold text-lg truncate">{user?.name}</h2>
              <p className="text-white/40 text-xs mb-8">{user?.email}</p>
              
              <div className="space-y-1">
                 <button className="w-full flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                    <LayoutDashboard className="w-4 h-4" /> My Events
                 </button>
                 <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all"
                 >
                    <LogOut className="w-4 h-4" /> Log out
                 </button>
              </div>
           </GlassCard>

           <div className="p-4 px-6 text-xs text-white/20 font-bold uppercase tracking-widest">
              Account Stats
           </div>
           <GlassCard className="p-4 flex items-center justify-between" hoverEffect={false}>
              <span className="text-sm text-white/50">Joined Events</span>
              <span className="text-xl font-black text-white">{registrations.length}</span>
           </GlassCard>
        </div>

        {/* Main Content */}
        <div className="flex-1">
           <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Your Registered Events</h1>
              <Link href="/events" className="hidden md:flex items-center gap-2 text-primary text-sm font-medium hover:underline">
                 Browse more events
              </Link>
           </div>

           {registrations.length > 0 ? (
             <div className="grid grid-cols-1 gap-6">
                <AnimatePresence>
                  {registrations.map((reg) => (
                    <motion.div
                      key={reg._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      layout
                    >
                      <GlassCard className="flex flex-col md:flex-row items-center gap-6 p-4 md:p-6" hoverEffect={false}>
                        <div className="w-full md:w-32 aspect-square md:aspect-video rounded-2xl bg-zinc-900 shrink-0 relative overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                           <h3 className="text-xl font-bold">{reg.event.title}</h3>
                           <div className="flex flex-wrap gap-4 text-sm text-white/50">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" /> 
                                {new Date(reg.event.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" /> 
                                {reg.event.location}
                              </span>
                           </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                           <Link 
                            href={`/events/${reg.event._id}`}
                            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-xs font-bold text-center transition-all"
                           >
                              Details
                           </Link>
                           <button
                             onClick={() => handleCancel(reg._id)}
                             disabled={isCancelling === reg._id}
                             className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                           >
                              {isCancelling === reg._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <XCircle className="w-4 h-4" /> Cancel
                                </>
                              )}
                           </button>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
             </div>
           ) : (
             <div className="py-24 glass rounded-3xl text-center border-dashed border-white/10 bg-transparent">
                <Ticket className="w-16 h-16 text-white/10 mx-auto mb-4" />
                <h3 className="text-xl font-bold">No registered events yet</h3>
                <p className="text-white/40 mb-8 px-12">You haven&apos;t joined any events. Explore our upcoming experiences to get started.</p>
                <Link href="/events" className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition-all">
                  Browse Events
                </Link>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
