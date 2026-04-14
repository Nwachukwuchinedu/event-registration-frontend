import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "@/components/NavigationWrapper";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
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
      className={`${plusJakarta.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-primary/30">
        <NavigationWrapper>
          {children}
        </NavigationWrapper>
        
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
