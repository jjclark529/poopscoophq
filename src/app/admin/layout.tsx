'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard, Users, CreditCard, ChevronLeft, ChevronRight,
  Shield, DollarSign, UserCircle, LogOut
} from 'lucide-react'

type AdminUser = {
  id: string
  email: string
  name: string
  role: string
  loginAt: string
}

const adminNav = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Payment Gateway', href: '/admin/subscriptions', icon: CreditCard },
  { name: 'Billing', href: '/admin/billing', icon: DollarSign },
  { name: 'Profile & Admins', href: '/admin/profile', icon: UserCircle },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [checking, setChecking] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (pathname === '/admin/login') { setChecking(false); return }
    const stored = localStorage.getItem('scoophq_admin')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AdminUser
        if (Date.now() - new Date(parsed.loginAt).getTime() < 24 * 60 * 60 * 1000) {
          setAdmin(parsed); setChecking(false); return
        }
      } catch {}
    }
    localStorage.removeItem('scoophq_admin')
    router.replace('/admin/login')
  }, [pathname, router])

  const handleLogout = () => { localStorage.removeItem('scoophq_admin'); router.replace('/admin/login') }

  if (pathname === '/admin/login') return <>{children}</>
  if (checking) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Verifying admin access...</p>
      </div>
    </div>
  )
  if (!admin) return null

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside className={`${collapsed ? 'w-[68px]' : 'w-64'} bg-slate-950 text-slate-200 min-h-screen flex flex-col flex-shrink-0 transition-all duration-200 relative`}>
        {/* Header */}
        <div className={`border-b border-slate-800 flex items-center ${collapsed ? 'justify-center py-5 px-2' : 'gap-2 px-4 py-5'}`}>
          <Shield size={24} className="text-red-400 flex-shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-white leading-tight">PSQ Admin</h1>
              <p className="text-xs text-slate-400">Backoffice</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href} title={collapsed ? item.name : undefined}
                className={`flex items-center gap-3 mx-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-red-600 text-white font-medium' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} ${collapsed ? 'justify-center px-2 py-2.5' : 'px-4 py-2.5'}`}>
                <Icon size={20} className="flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Collapse toggle */}
        <button onClick={() => setCollapsed(!collapsed)}
          className="mx-2 mb-2 flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-white py-2 rounded border border-slate-700 hover:border-slate-600 transition-colors">
          {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /> Collapse</>}
        </button>

        {/* User */}
        <div className="border-t border-slate-800 p-3">
          {!collapsed && (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {admin.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">{admin.name}</p>
                <p className="text-xs text-slate-400 truncate">{admin.email}</p>
              </div>
            </div>
          )}
          <div className={`flex gap-2 ${collapsed ? 'flex-col' : ''}`}>
            <Link href="/dashboard/quotes" className={`flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white py-1.5 rounded border border-slate-700 hover:border-slate-600 ${collapsed ? '' : 'flex-1'}`}>
              {collapsed ? <ChevronLeft size={12} /> : <><ChevronLeft size={12} /> App</>}
            </Link>
            <button onClick={handleLogout} className={`flex items-center justify-center gap-1.5 text-xs text-red-400 hover:text-red-300 py-1.5 rounded border border-slate-700 hover:border-red-700 ${collapsed ? '' : 'flex-1'}`}>
              {collapsed ? <LogOut size={12} /> : <><LogOut size={12} /> Logout</>}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
