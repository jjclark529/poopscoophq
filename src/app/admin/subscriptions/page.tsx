'use client'

import { CreditCard, DollarSign, Check, Plug } from 'lucide-react'

export default function PaymentGatewayPage() {
  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><CreditCard className="text-blue-500" /> Payment Gateway</h1>
          <p className="text-gray-500">Manage Stripe and PayPal settings for the single PoopScoop Quote subscription</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">$29.99</p>
          <p className="text-xs text-gray-500">Monthly Subscription</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">24</p>
          <p className="text-xs text-gray-500">Active Subscribers</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">$719.76</p>
          <p className="text-xs text-gray-500">Current MRR</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2"><DollarSign size={18} className="text-green-600" /> Subscription Configuration</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input type="text" defaultValue="PoopScoop Quote" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Price</label>
            <input type="text" defaultValue="$29.99" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Price ID</label>
            <input type="text" defaultValue="price_poopscoop_quote_monthly" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Plan ID</label>
            <input type="text" defaultValue="P-POOPSCOOPQUOTE-MONTHLY" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Plug size={18} className="text-purple-600" /> Stripe</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Publishable Key</label>
              <input type="text" placeholder="pk_live_..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
              <input type="password" placeholder="sk_live_..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
              <input readOnly value="https://poopscoop-quote.vercel.app/api/billing/webhooks/stripe" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-500" />
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700">Save Stripe Settings</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Check size={18} className="text-blue-600" /> PayPal</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
              <input type="text" placeholder="PayPal Client ID" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
              <input type="password" placeholder="PayPal Client Secret" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
              <input readOnly value="https://poopscoop-quote.vercel.app/api/billing/webhooks/paypal" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-500" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Save PayPal Settings</button>
          </div>
        </div>
      </div>
    </div>
  )
}
