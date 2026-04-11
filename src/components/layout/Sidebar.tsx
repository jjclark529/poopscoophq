'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Building2, Plug, HelpCircle, FileText, ChevronLeft, ChevronRight, LogOut, Menu, X } from 'lucide-react'
import { QuoteLogo } from '@/components/ui/QuoteLogo'

const navItems = [
  { label: 'Quote Builder', href: '/dashboard/quotes', icon: FileText },
  { label: 'My Business', href: '/dashboard/business', icon: Building2 },
  { label: 'Connections', href: '/dashboard/settings/connections', icon: Plug },
  { label: 'Help', href: '/dashboard/settings/help', icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navContent = (
    <>
      <div className="flex items-center gap-2 px-4 py-5 border-b border-slate-700">
        <QuoteLogo size={40} className="flex-shrink-0 rounded-lg" />
        {!collapsed && <span className="text-lg font-bold text-white">PoopScoop Quote</span>}
        <button onClick={() => { setCollapsed(!collapsed); setMobileOpen(false) }} className="ml-auto text-slate-400 hover:text-white hidden lg:block">
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        <button onClick={() => setMobileOpen(false)} className="ml-auto text-slate-400 hover:text-white lg:hidden">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {!collapsed && <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">APP</p>}
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-blue-600 text-white font-medium' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className={collapsed ? 'hidden' : ''}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-slate-700 p-4">
        <Link href="/dashboard/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 hover:bg-slate-800 rounded-lg p-1.5 -m-1.5 transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">U</div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">My Account</p>
              <p className="text-xs text-slate-400">Profile & Billing</p>
            </div>
          )}
        </Link>
        {!collapsed && (
          <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white mt-2 ml-11">
            <LogOut size={12} /> Logout
          </button>
        )}
      </div>
    </>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-700 flex items-center gap-3 px-4 py-3">
        <button onClick={() => setMobileOpen(true)} className="text-white">
          <Menu size={24} />
        </button>
        <QuoteLogo size={32} className="rounded-lg" />
        <span className="text-white font-bold">PoopScoop Quote</span>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-slate-900 text-slate-200 h-full flex flex-col z-10">
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-72'} bg-slate-900 text-slate-200 min-h-screen hidden lg:flex flex-col transition-all duration-300 flex-shrink-0`}>
        {navContent}
      </aside>
    </>
  )
}
