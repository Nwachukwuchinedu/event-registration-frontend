"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { eventApi } from "@/lib/api";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";
import { Calendar, MapPin, Users, Search, Loader2 } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await eventApi.getEvents();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-2">Explore Events</h1>
          <p className="text-white/50 text-lg">Find and register for the world&apos;s most exclusive experiences.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, i) => (
            <Link key={event._id} href={`/events/${event._id}`}>
              <GlassCard className="h-full flex flex-col p-0 border-none bg-white/[0.01] hover:bg-white/[0.03]" delay={i * 0.05}>
                <div className="aspect-video bg-zinc-900 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                   <div className="absolute bottom-4 left-4">
                      <span className="px-2 py-1 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                        {event.category || "General"}
                      </span>
                   </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-3 line-clamp-1">{event.title}</h3>
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <Users className="w-4 h-4" />
                      <span>{event.attendeesCount || 0} / {event.capacity} Registered</span>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-primary group-hover:border-primary transition-all text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 glass rounded-3xl">
          <Calendar className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <h3 className="text-xl font-bold">No events found</h3>
          <p className="text-white/40">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}
