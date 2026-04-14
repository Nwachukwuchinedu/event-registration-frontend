"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { eventApi, registrationApi } from "@/lib/api";
import GlassCard from "@/components/GlassCard";
import { Calendar, MapPin, Users, ArrowLeft, Loader2, CheckCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const response = await eventApi.getEvent(id as string);
        const eventData = response.data;
        setEvent(eventData);
        
        // Check if already registered
        const token = localStorage.getItem("auth_token");
        if (token && eventData) {
          const myRegsResponse = await registrationApi.getMyRegistrations();
          const already = myRegsResponse.data?.registrations.some((r: any) => r.event._id === (id as string));
          setIsRegistered(already);
        }
      } catch (err: any) {
        setError("Could not find the event you are looking for.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEventDetails();
  }, [id]);

  const handleRegister = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }

    setIsRegistering(true);
    setError("");
    try {
      await registrationApi.register(id as string);
      setIsRegistered(true);
    } catch (err: any) {
      setError(err.message || "Failed to register for event.");
    } finally {
      setIsRegistering(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
        <p className="text-white/50 mb-8">{error}</p>
        <Link href="/events" className="text-primary hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      <Link href="/events" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to browse
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[21/9] rounded-3xl bg-zinc-900 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                {event.category || "Elite Event"}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white">{event.title}</h1>
            </div>
          </motion.div>

          <section>
            <h2 className="text-2xl font-bold mb-6">About the Event</h2>
            <div className="text-white/70 leading-relaxed text-lg space-y-4 whitespace-pre-wrap">
              {event.description}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <GlassCard className="flex items-start gap-4" hoverEffect={false}>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Calendar className="text-accent" />
                </div>
                <div>
                   <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Date & Time</p>
                   <p className="font-medium">{new Date(event.date).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
             </GlassCard>
             <GlassCard className="flex items-start gap-4" hoverEffect={false}>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" />
                </div>
                <div>
                   <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Location</p>
                   <p className="font-medium">{event.location}</p>
                </div>
             </GlassCard>
          </section>
        </div>

        {/* Sidebar / CTA */}
        <div className="space-y-6">
          <GlassCard className="p-8 border-primary/20 bg-primary/5 sticky top-32" hoverEffect={false}>
             <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-3xl font-bold">Free</p>
                  <p className="text-white/40 text-xs">Full Access Pass</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-400">{event.capacity - (event.attendeesCount || 0)} left</p>
                  <p className="text-white/40 text-[10px]">out of {event.capacity} total</p>
                </div>
             </div>

             {isRegistered ? (
               <div className="w-full">
                 <div className="flex items-center justify-center gap-2 py-4 text-emerald-400 bg-emerald-500/10 rounded-xl mb-4 border border-emerald-500/20">
                   <CheckCircle className="w-5 h-5" />
                   <span className="font-bold">You&apos;re Registered!</span>
                 </div>
                 <Link href="/dashboard" className="w-full flex items-center justify-center py-4 text-sm font-bold text-white/60 hover:text-white transition-colors">
                   View in Dashboard
                 </Link>
               </div>
             ) : (
               <>
                 <button
                   onClick={handleRegister}
                   disabled={isRegistering || (event.attendeesCount >= event.capacity)}
                   className="w-full py-4 rounded-xl bg-white text-black font-extrabold shadow-xl hover:bg-white/90 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 mb-4"
                 >
                   {isRegistering ? (
                     <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                   ) : (
                     "Join This Event"
                   )}
                 </button>
                 <p className="text-center text-[10px] text-white/30 px-4">
                   By registering, you agree to the EventFlow terms of service and attendee conduct policy.
                 </p>
               </>
             )}

             {error && <p className="text-red-400 text-xs text-center mt-4 font-medium">{error}</p>}
          </GlassCard>

          <GlassCard className="p-6 bg-white/[0.02]" hoverEffect={false}>
             <h3 className="font-bold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                Attendees ({event.attendeesCount || 0})
             </h3>
             <div className="flex -space-x-2">
                {[...Array(Math.min(5, event.attendeesCount || 0))].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800" />
                ))}
                {(event.attendeesCount > 5) && (
                   <div className="w-8 h-8 rounded-full border-2 border-black bg-zinc-900 flex items-center justify-center text-[10px] font-bold">
                      +{event.attendeesCount - 5}
                   </div>
                )}
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
