"use client";

import Sidebar from "../../components/Sidebar";
import CaptainScoop from "../../components/CaptainScoop";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
      <CaptainScoop />
    </div>
  );
}
