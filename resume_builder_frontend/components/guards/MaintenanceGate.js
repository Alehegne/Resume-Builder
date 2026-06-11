"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { backendUrl } from "@/utils/constants";
import { useAuth } from "@/hooks/useAuth";

const PUBLIC_PATHS = ["/login", "/signup"];

export default function MaintenanceGate({ children }) {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const bypassGate = useMemo(() => {
    if (!pathname) return false;

    if (pathname.startsWith("/admin")) return true;

    return PUBLIC_PATHS.includes(pathname);
  }, [pathname]);

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      try {
        const response = await fetch(`${backendUrl}/admin/settings.php`);
        const data = await response.json();

        if (isMounted && data.success) {
          setSettings(data.data || null);
        }
      } catch (error) {
        console.error("Failed to load public settings:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const isAdmin = isAuthenticated && user?.role === "admin";
  const maintenanceMode = Boolean(settings?.maintenanceMode);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_45%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]">
        <div className="text-center space-y-3">
          <div className="mx-auto h-12 w-12 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin" />
          <p className="text-slate-600">Checking site status...</p>
        </div>
      </div>
    );
  }

  if (maintenanceMode && !isAdmin && !bypassGate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.16),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] px-4">
        <div className="max-w-2xl w-full rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl shadow-2xl p-8 md:p-12 text-center space-y-6">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-slate-900 text-white text-2xl mx-auto shadow-lg">
            !
          </div>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              Maintenance Mode
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              {settings?.siteTitle || "Resume Builder"} is temporarily
              unavailable
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-7">
              We are applying updates right now. Please check back soon.
              Administrators can still sign in and manage the site.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
