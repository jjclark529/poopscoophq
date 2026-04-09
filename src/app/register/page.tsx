'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, User, Eye, EyeOff, Building2, Check, CreditCard, ChevronLeft, AlertCircle } from 'lucide-react'
import { QuoteLogo } from '@/components/ui/QuoteLogo'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const formatCardNumber = (val: string) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    return digits.length >= 3 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!fullName || !email.includes('@') || password.length < 8 || !businessName || !cardName || !cardNumber || !cardExpiry || !cardCvc) {
      setError('Please complete all fields to start your subscription.')
      return
    }
    setProcessing(true)
    await new Promise(r => setTimeout(r, 1500))
    window.location.href = '/dashboard/quotes'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <QuoteLogo size={120} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Start PoopScoop Quote</h1>
          <p className="text-gray-500 mt-2">One plan. Everything included. $29.99/month.</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900">PoopScoop Quote Subscription</p>
              <p className="text-sm text-gray-600">Standalone quote builder + admin backoffice</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-700">$29.99</p>
              <p className="text-xs text-blue-600">per month</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-2 mt-4 text-sm text-gray-700">
            <div className="flex items-center gap-2"><Check size={14} className="text-green-600" /> Quote Builder</div>
            <div className="flex items-center gap-2"><Check size={14} className="text-green-600" /> Pricing uploads</div>
            <div className="flex items-center gap-2"><Check size={14} className="text-green-600" /> Email/text quote actions</div>
            <div className="flex items-center gap-2"><Check size={14} className="text-green-600" /> Admin billing console</div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2">
            <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <div className="relative">
                <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-200 rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><CreditCard size={18} /> Payment Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input value={cardName} onChange={(e) => setCardName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono" placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input value={cardExpiry} onChange={(e) => setCardExpiry(formatExpiry(e.target.value))} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input value={cardCvc} onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono" placeholder="123" />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" disabled={processing} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
            {processing ? 'Starting subscription...' : 'Start $29.99/month Subscription'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <Link href="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
        </div>
        <div className="mt-2 text-center text-sm text-gray-500">
          <Link href="/" className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"><ChevronLeft size={16} /> Back to home</Link>
        </div>
      </div>
    </div>
  )
}
