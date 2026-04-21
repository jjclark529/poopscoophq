'use client'

import { useState } from 'react'
import { UserCircle, Save, Check, Lock, Eye, EyeOff, CreditCard, AlertCircle } from 'lucide-react'

export default function UserProfilePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [saved, setSaved] = useState(false)

  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwError, setPwError] = useState<string | null>(null)
  const [pwSaved, setPwSaved] = useState(false)
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [billingSaved, setBillingSaved] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const saveProfile = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setPwError(null)
    if (!currentPw) return setPwError('Current password is required')
    if (newPw.length < 8) return setPwError('New password must be at least 8 characters')
    if (newPw !== confirmPw) return setPwError('Passwords do not match')
    setPwSaved(true)
    setCurrentPw('')
    setNewPw('')
    setConfirmPw('')
    setTimeout(() => setPwSaved(false), 2500)
  }

  const saveBilling = (e: React.FormEvent) => {
    e.preventDefault()
    setBillingSaved(true)
    setTimeout(() => setBillingSaved(false), 2500)
  }

  const fmtCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const fmtExp = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><UserCircle className="text-blue-500" /> Account Profile & Billing</h1>
        <p className="text-gray-500">Manage your account details, billing, and password</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold mb-4">Profile Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" placeholder="Full Name" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" placeholder="Email" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" placeholder="Phone" />
          <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" placeholder="Business Name" />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={saveProfile} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Save size={16} /> Save Changes</button>
          {saved && <span className="text-sm text-green-600 flex items-center gap-1"><Check size={14} /> Saved!</span>}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2"><CreditCard size={18} className="text-blue-500" /> Subscription & Billing</h2>
        {cancelled && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-center gap-2 text-sm text-amber-700">
            <AlertCircle size={14} className="text-amber-500" /> Your subscription has been cancelled.
          </div>
        )}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-bold text-gray-900">PoopScoop Quote</p>
            <p className="text-sm text-gray-600">Single plan subscription</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-700">$29.99</p>
            <p className="text-xs text-blue-600">per month</p>
          </div>
        </div>

        <form onSubmit={saveBilling} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as 'stripe'|'paypal')} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm">
                <option value="stripe">Credit / Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Name on card" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input value={cardNumber} onChange={(e) => setCardNumber(fmtCard(e.target.value))} placeholder="4242 4242 4242 4242" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                <input value={cardExpiry} onChange={(e) => setCardExpiry(fmtExp(e.target.value))} placeholder="MM/YY" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <input value={cardCvc} onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="123" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Save Billing</button>
            {billingSaved && <span className="text-sm text-green-600 flex items-center gap-1"><Check size={14} /> Billing updated</span>}
          </div>
        </form>

        <button onClick={() => setCancelled(true)} className="text-sm text-red-500 hover:text-red-700 hover:underline mt-4">Cancel Subscription</button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2"><Lock size={18} className="text-gray-500" /> Change Password</h2>
        {pwError && <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">{pwError}</div>}
        {pwSaved && <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-sm text-green-700">Password updated successfully.</div>}
        <form onSubmit={changePassword} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input type={showCurrentPw ? 'text' : 'password'} value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="Current Password" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm" />
            <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
          </div>
          <div className="relative">
            <input type={showNewPw ? 'text' : 'password'} value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="New Password" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm" />
            <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
          </div>
          <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Confirm Password" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
          <div className="md:col-span-3">
            <button type="submit" className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800">Update Password</button>
          </div>
        </form>
      </div>
      <p className="text-center text-xs text-gray-400 mt-8">
        © 2026 PoopScoop Quote | info@poopscoophq.com
      </p>
    </div>
  )
}
