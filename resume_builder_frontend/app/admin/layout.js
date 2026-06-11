"use client";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import { useAuth } from "@/hooks/useAuth";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  console.log("user in admin layout:", user, "isau:", isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      console.log("Not authenticated or not admin, redirecting to login...");
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== "admin") {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminTopbar />

        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
