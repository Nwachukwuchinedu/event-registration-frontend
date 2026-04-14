import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventFlow | Elite Event Management",
  description: "Experience modern event registration with seamless motion and cinematic design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-primary/30">
        <Navbar />
        <main className="flex-1 pt-24">{children}</main>
        
        {/* Abstract Background Elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse-slow" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-accent/10 blur-[100px] rounded-full animate-pulse-slow delay-1000" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-indigo-500/5 blur-[150px] rounded-full" />
        </div>
      </body>
    </html>
  );
}
