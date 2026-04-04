"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Customers", href: "/admin/customers", icon: "👥" },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: "💳" },
  { label: "Billing", href: "/admin/billing", icon: "🧾" },
  { label: "Profile", href: "/admin/profile", icon: "👤" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-gray-900 flex flex-col min-h-screen">
        <div className="p-5 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm">💩</div>
            <div>
              <span className="text-white font-bold text-sm">PoopScoop HQ</span>
              <p className="text-gray-500 text-[10px]">ADMIN</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-gray-300 text-sm rounded-lg hover:bg-gray-800 transition-colors">
            ← Back to App
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
