"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Navigation error:", err);
      }
    }
    setLoading(false);
  }, [pathname]);

  // Auth pages like login/register might want a different view or just the navbar
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (loading) {
    return (
       <div className="bg-black min-h-screen">
         {children}
       </div>
    );
  }

  // If logged in and NOT on a pure landing/auth page (or maybe everywhere?), show Sidebar
  // The user specifically asked: "make sure we don't show anything like a navbar again, let the browser show a sidebar of everything"
  // So if user exists, we show Sidebar.
  const showSidebar = !!user && !isAuthPage;

  return (
    <div className="flex min-h-screen bg-black">
      {showSidebar ? (
        <>
          <Sidebar user={user} />
          <main className="flex-1 overflow-y-auto min-h-screen">
            {children}
          </main>
        </>
      ) : (
        <>
          {!isAuthPage && <Navbar />}
          <main className={cn("flex-1", !isAuthPage && "pt-24")}>
            {children}
          </main>
        </>
      )}
    </div>
  );
}
