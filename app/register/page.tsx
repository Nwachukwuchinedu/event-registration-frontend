"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Lock, User, Loader2, CheckCircle2 } from "lucide-react";
import { authApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/GlassCard";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await authApi.register({ name, email, password });
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <GlassCard className="p-12 text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-2">Account Created!</h2>
          <p className="text-white/50 mb-8">Redirecting you to the login page...</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <GlassCard className="p-8 md:p-12 shadow-2xl relative overflow-hidden" hoverEffect={false}>
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Join EventFlow</h1>
            <p className="text-white/50">Start managing and joining elite experiences today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-xs"
                  />
                </div>
                <div className="px-1 space-y-1">
                   <p className="text-[10px] text-white/30 flex items-center gap-1.5">
                      <CheckCircle2 className={cn("w-3 h-3", password.length >= 8 ? "text-emerald-500" : "text-white/20")} />
                      At least 8 characters
                   </p>
                   <p className="text-[10px] text-white/30 flex items-center gap-1.5">
                      <CheckCircle2 className={cn("w-3 h-3", /[A-Z]/.test(password) ? "text-emerald-500" : "text-white/20")} />
                      One uppercase letter
                   </p>
                   <p className="text-[10px] text-white/30 flex items-center gap-1.5">
                      <CheckCircle2 className={cn("w-3 h-3", /[0-9]/.test(password) ? "text-emerald-500" : "text-white/20")} />
                      One number
                   </p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 ml-1">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-xs"
                  />
                </div>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm font-medium text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-white/40 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:text-primary transition-colors font-medium">
              Sign In
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
