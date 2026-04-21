'use client'

import { useState } from 'react'
import { CreditCard, DollarSign, Check, Plug, Loader2 } from 'lucide-react'

export default function PaymentGatewayPage() {
  const [productName, setProductName] = useState('PoopScoop Quote')
  const [monthlyPrice, setMonthlyPrice] = useState('$29.99')
  const [stripePriceId, setStripePriceId] = useState('price_poopscoop_quote_monthly')
  const [paypalPlanId, setPaypalPlanId] = useState('P-POOPSCOOPQUOTE-MONTHLY')

  const [stripePk, setStripePk] = useState('')
  const [stripeSk, setStripeSk] = useState('')
  const [stripeSaving, setStripeSaving] = useState(false)
  const [stripeSaved, setStripeSaved] = useState(false)

  const [paypalClientId, setPaypalClientId] = useState('')
  const [paypalSecret, setPaypalSecret] = useState('')
  const [paypalSaving, setPaypalSaving] = useState(false)
  const [paypalSaved, setPaypalSaved] = useState(false)

  const saveStripe = () => {
    setStripeSaving(true)
    setTimeout(() => {
      setStripeSaving(false)
      setStripeSaved(true)
      setTimeout(() => setStripeSaved(false), 2500)
    }, 1000)
  }

  const savePaypal = () => {
    setPaypalSaving(true)
    setTimeout(() => {
      setPaypalSaving(false)
      setPaypalSaved(true)
      setTimeout(() => setPaypalSaved(false), 2500)
    }, 1000)
  }

  return (
    <div className="p-4 sm:p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><CreditCard className="text-blue-500" /> Payment Gateway</h1>
          <p className="text-gray-500">Manage Stripe and PayPal settings for PoopScoop Quote</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">$29.99</p>
          <p className="text-xs text-gray-500">Monthly Subscription</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">$29.99</p>
          <p className="text-xs text-gray-500">Paid Plan Price</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">1</p>
          <p className="text-xs text-gray-500">Active Customer</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2"><DollarSign size={18} className="text-green-600" /> Subscription Configuration</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input type="text" value={productName} onChange={e => setProductName(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Price</label>
            <input type="text" value={monthlyPrice} onChange={e => setMonthlyPrice(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Price ID</label>
            <input type="text" value={stripePriceId} onChange={e => setStripePriceId(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Plan ID</label>
            <input type="text" value={paypalPlanId} onChange={e => setPaypalPlanId(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Plug size={18} className="text-purple-600" /> Stripe</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Publishable Key</label>
              <input type="text" value={stripePk} onChange={e => setStripePk(e.target.value)} placeholder="pk_live_..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
              <input type="password" value={stripeSk} onChange={e => setStripeSk(e.target.value)} placeholder="sk_live_..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
              <input readOnly value="https://poopscoopquote.com/api/billing/webhooks/stripe" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-500" />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={saveStripe} disabled={stripeSaving} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2 cursor-pointer">
                {stripeSaving ? <Loader2 size={14} className="animate-spin" /> : null}
                Save Stripe Settings
              </button>
              {stripeSaved && <span className="text-sm text-green-600 flex items-center gap-1"><Check size={14} /> Saved!</span>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Check size={18} className="text-blue-600" /> PayPal</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
              <input type="text" value={paypalClientId} onChange={e => setPaypalClientId(e.target.value)} placeholder="PayPal Client ID" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
              <input type="password" value={paypalSecret} onChange={e => setPaypalSecret(e.target.value)} placeholder="PayPal Client Secret" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
              <input readOnly value="https://poopscoopquote.com/api/billing/webhooks/paypal" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-500" />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={savePaypal} disabled={paypalSaving} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 cursor-pointer">
                {paypalSaving ? <Loader2 size={14} className="animate-spin" /> : null}
                Save PayPal Settings
              </button>
              {paypalSaved && <span className="text-sm text-green-600 flex items-center gap-1"><Check size={14} /> Saved!</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
