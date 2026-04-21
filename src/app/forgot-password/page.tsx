'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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
const ADMIN_ACCOUNT_KEY = 'poopscoopquote_admin_account'
const ADMIN_PASSWORD_KEY = 'poopscoopquote_admin_password'
const RESET_CODE_KEY = 'poopscoopquote_reset_code'
import { Mail, ChevronLeft, Check, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react'
import { QuoteLogo } from '@/components/ui/QuoteLogo'

type Step = 'email' | 'code' | 'reset' | 'done'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPw, setShowNewPw] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    const customers: CustomerAccount[] = JSON.parse(localStorage.getItem(CUSTOMER_STORAGE_KEY) || '[]')
    const adminAccount = JSON.parse(localStorage.getItem(ADMIN_ACCOUNT_KEY) || '{"email":"info@doctordoo.com"}')
    const exists = customers.some(c => c.email.toLowerCase() === email.trim().toLowerCase()) || adminAccount.email?.toLowerCase() === email.trim().toLowerCase()
    if (!exists) {
      setError('No account found with that email address')
      return
    }
    setLoading(true)
    try {
      const response = await fetch('/api/auth/send-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to send reset email')
        setLoading(false)
        return
      }
      localStorage.setItem(RESET_CODE_KEY, JSON.stringify({ email: email.trim().toLowerCase(), code: data.code }))
      setLoading(false)
      setStep('code')
    } catch {
      setError('Failed to send reset email')
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (code.length < 6) {
      setError('Please enter the 6-digit code')
      return
    }
    const saved = JSON.parse(localStorage.getItem(RESET_CODE_KEY) || '{}')
    setLoading(true)
    await new Promise(r => setTimeout(r, 300))
    setLoading(false)
    if (saved.email !== email.trim().toLowerCase() || saved.code !== code) {
      setError('Invalid verification code')
      return
    }
    setStep('reset')
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password: newPassword }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to reset password')
        setLoading(false)
        return
      }

      const targetEmail = email.trim().toLowerCase()
      const customers: CustomerAccount[] = JSON.parse(localStorage.getItem(CUSTOMER_STORAGE_KEY) || '[]')
      const updatedCustomers = customers.map(customer => customer.email.toLowerCase() === targetEmail ? { ...customer, password: newPassword } : customer)
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(updatedCustomers))

      const adminAccount = JSON.parse(localStorage.getItem(ADMIN_ACCOUNT_KEY) || '{"email":"info@doctordoo.com","name":"Jackie","role":"owner"}')
      if (adminAccount.email?.toLowerCase() === targetEmail) {
        localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword)
      }

      localStorage.removeItem(RESET_CODE_KEY)
      setLoading(false)
      setStep('done')
    } catch {
      setError('Failed to reset password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <QuoteLogo size={120} />
            
          </div>
          <p className="text-gray-500">
            {step === 'email' && 'Reset your password'}
            {step === 'code' && 'Check your email'}
            {step === 'reset' && 'Create new password'}
            {step === 'done' && 'Password reset!'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2">
            <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Step 1: Enter Email */}
        {step === 'email' && (
          <form onSubmit={handleSendCode} className="space-y-4">
            <p className="text-sm text-gray-600 mb-2">Enter the email address associated with your account and we'll send you a code to reset your password.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
              ) : 'Send Reset Code'}
            </button>
          </form>
        )}

        {/* Step 2: Enter Code */}
        {step === 'code' && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-2">
              <p className="text-sm text-blue-700">📧 We sent a 6-digit code to <strong>{email}</strong></p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl font-mono tracking-[0.5em] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Verifying...</>
              ) : 'Verify Code'}
            </button>
            <button type="button" onClick={() => setStep('email')} className="w-full text-sm text-gray-500 hover:text-gray-700">
              Didn't receive it? Go back and try again
            </button>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showNewPw ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showNewPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  required
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Resetting...</>
              ) : 'Reset Password'}
            </button>
          </form>
        )}

        {/* Step 4: Success */}
        {step === 'done' && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Password Reset!</h2>
            <p className="text-sm text-gray-600 mb-6">Your password has been successfully changed. You can now sign in with your new password.</p>
            <Link href="/login" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Go to Sign In
            </Link>
          </div>
        )}

        {/* Back to login link */}
        {step !== 'done' && (
          <p className="text-center text-sm text-gray-500 mt-6">
            <Link href="/login" className="text-blue-600 font-medium hover:underline flex items-center justify-center gap-1">
              <ChevronLeft size={14} /> Back to Sign In
            </Link>
          </p>
        )}
        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 PoopScoop Quote | info@poopscoophq.com
        </p>
      </div>
    </div>
  )
}