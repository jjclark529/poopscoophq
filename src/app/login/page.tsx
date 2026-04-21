'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { QuoteLogo } from '@/components/ui/QuoteLogo'

type CustomerAccount = {
  id: string
  name: string
  email: string
  company: string
  plan: string
  status: 'active' | 'trial' | 'past_due' | 'cancelled' | 'paused' | 'free'
  mrr: number
  joinDate: string
  paymentMethod: 'stripe' | 'paypal' | 'none'
  lastPayment: string
  password?: string
}

const CUSTOMER_STORAGE_KEY = 'poopscoopquote_customers'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!localStorage.getItem(CUSTOMER_STORAGE_KEY)) {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify([
        {
          id: 'cust_001',
          name: 'Jackie',
          email: 'info@doctordoo.com',
          company: 'Doctor Doo',
          plan: '$29.99/month',
          status: 'active',
          mrr: 29.99,
          paymentMethod: 'stripe',
          joinDate: 'Jan 15, 2025',
          lastPayment: 'Apr 10, 2026',
        }
      ]))
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY)
    const customers: CustomerAccount[] = saved ? JSON.parse(saved) : []
    const customer = customers.find(c => c.email.toLowerCase() === email.trim().toLowerCase())

    if (!customer) return setError('Account not found')
    if (customer.status === 'cancelled' || customer.status === 'paused') return setError('This account is not active')
    if (!customer.password) return setError('No password set yet. Use Forgot Password to create one.')
    if (customer.password !== password) return setError('Incorrect password')

    localStorage.setItem('poopscoopquote_customer_session', JSON.stringify({
      id: customer.id,
      email: customer.email,
      name: customer.name,
      company: customer.company,
      loginAt: new Date().toISOString(),
    }))
    window.location.href = '/dashboard/quotes'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <QuoteLogo size={120} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">PoopScoop Quote</h1>
          <p className="text-gray-500 mt-2">Sign in to your quote builder account</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full border border-gray-200 rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <Link href="/forgot-password" className="text-sm text-blue-600 font-medium hover:underline">Forgot your password?</Link>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account? <Link href="/register" className="text-blue-600 font-medium hover:underline">Create one</Link>
        </p>
        <p className="text-center text-xs text-gray-400 mt-6">© 2026 PoopScoop Quote | info@poopscoophq.com</p>
      </div>
    </div>
  )
}
