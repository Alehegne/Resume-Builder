"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Layout,
  BarChart2,
  ScrollText,
  Settings,
} from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users",     label: "Users",      icon: Users },
  { href: "/admin/resumes",   label: "Resumes",    icon: FileText },
  { href: "/admin/templates", label: "Templates",  icon: Layout },
  { href: "/admin/analytics", label: "Analytics",  icon: BarChart2 },
  { href: "/admin/logs",      label: "Logs",       icon: ScrollText },
  { href: "/admin/settings",  label: "Settings",   icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Resume Admin</h1>

      <nav className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
