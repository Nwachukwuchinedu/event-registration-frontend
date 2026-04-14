"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { eventApi } from "@/lib/api";
import GlassCard from "@/components/GlassCard";
import { Plus, Users, Calendar, MapPin, Loader2, ShieldCheck, X } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Create Event Form State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCard, setNewCard] = useState({ title: "", description: "", date: "", location: "", capacity: 50 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = (userStr && userStr !== "undefined") ? JSON.parse(userStr) : null;

    if (!user || user.role !== "admin") {
      router.push("/");
      return;
    }

    setIsAdmin(true);
    fetchEvents();
  }, [router]);

  async function fetchEvents() {
    try {
      const response = await eventApi.getEvents(1, 100);
      setEvents(response.data?.events || []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    try {
      // Ensure date is ISO formatted
      const formattedData = {
        ...newCard,
        date: new Date(newCard.date).toISOString()
      };
      await eventApi.createEvent(formattedData);
      setShowCreateModal(false);
      setNewCard({ title: "", description: "", date: "", location: "", capacity: 50 });
      fetchEvents();
    } catch (error: any) {
      setFormError(error.message || "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdmin || isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" /> Admin Console
          </div>
          <h1 className="text-4xl font-bold">Event Management</h1>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 rounded-xl bg-white text-black font-bold flex items-center gap-2 hover:bg-white/90 active:scale-95 transition-all shadow-xl shadow-white/5"
        >
          <Plus className="w-5 h-5" />
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {events.map((event) => (
          <GlassCard key={event._id} className="flex flex-col md:flex-row items-center justify-between gap-6 p-6" hoverEffect={false}>
            <div className="flex-1">
               <h3 className="text-xl font-bold mb-2">{event.title}</h3>
               <div className="flex flex-wrap gap-4 text-sm text-white/40">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(event.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {event.attendeesCount} / {event.capacity} Registered</span>
               </div>
            </div>
            
            <button
               onClick={() => router.push(`/events/${event._id}`)}
               className="px-6 py-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-xs font-bold transition-all"
            >
               View Details
            </button>
          </GlassCard>
        ))}
      </div>

      {/* Create Event Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl"
            >
              <GlassCard className="p-8 md:p-12" hoverEffect={false}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Initiate New Event</h2>
                  <button onClick={() => setShowCreateModal(false)} className="p-2 text-white/40 hover:text-white transition-colors">
                    <X />
                  </button>
                </div>

                <form onSubmit={handleCreateEvent} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Event Title</label>
                    <input
                      required
                      type="text"
                      value={newCard.title}
                      onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                      placeholder="e.g. Quantum Computing Summit"
                      className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Description</label>
                    <textarea
                      required
                      rows={4}
                      value={newCard.description}
                      onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                      placeholder="Describe the cinematic experience..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Date</label>
                      <input
                        required
                        type="datetime-local"
                        value={newCard.date}
                        onChange={(e) => setNewCard({ ...newCard, date: e.target.value })}
                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Location</label>
                      <input
                        required
                        type="text"
                        value={newCard.location}
                        onChange={(e) => setNewCard({ ...newCard, location: e.target.value })}
                        placeholder="e.g. virtual or physical address"
                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Capacity</label>
                    <input
                      required
                      type="number"
                      value={newCard.capacity}
                      onChange={(e) => setNewCard({ ...newCard, capacity: parseInt(e.target.value) })}
                      className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-red-400 text-xs font-bold text-center bg-red-400/10 py-3 rounded-xl border border-red-400/20"
                    >
                      {formError}
                    </motion.div>
                  )}

                  <button
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-black font-extrabold rounded-2xl hover:bg-white/90 active:scale-95 transition-all shadow-xl shadow-white/5 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Deploy Event"}
                  </button>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
