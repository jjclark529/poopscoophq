'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { QuoteLogo } from '@/components/ui/QuoteLogo'

const ADMIN_ACCOUNT_KEY = 'poopscoopquote_admin_account'
const ADMIN_PASSWORD_KEY = 'poopscoopquote_admin_password'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))

    const savedAccount = localStorage.getItem(ADMIN_ACCOUNT_KEY)
    const savedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || ''

    let adminAccount = {
      id: 'admin_001',
      email: 'info@doctordoo.com',
      name: 'Jackie',
      role: 'owner',
    }

    if (savedAccount) {
      try {
        adminAccount = { ...adminAccount, ...JSON.parse(savedAccount) }
      } catch {}
    }

    const emailMatches = email.trim().toLowerCase() === adminAccount.email.toLowerCase()
    const passwordMatches = savedPassword ? password === savedPassword : password.trim().length > 0

    if (emailMatches && passwordMatches) {
      localStorage.setItem('scoophq_admin', JSON.stringify({
        ...adminAccount,
        loginAt: new Date().toISOString(),
      }))
      window.location.href = '/admin'
    } else {
      setError('Invalid admin credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <QuoteLogo size={80} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Backoffice</h1>
          <p className="text-gray-500 text-sm mt-1">PoopScoop Quote Management Console</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2">
            <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@poopscoopquote.com" required className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full border border-gray-200 rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Verifying...</> : <><Shield size={18} /> Sign In to Admin</>}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link href="/forgot-password" className="text-sm text-blue-600 font-medium hover:underline">Forgot your password?</Link>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Restricted to authorized PoopScoop Quote administrators only.
          </p>
        </div>
      </div>
    </div>
  )
}
