"use client";

export default function AdminSubscriptionsPage() {
  const tiers = [
    {
      name: "Starter",
      price: "$99/mo",
      features: ["Up to 50 clients", "Route optimization", "Basic lead gen", "Review requests", "Email support"],
      subscribers: 98,
      mrr: "$9,702",
      color: "border-gray-200 bg-white",
    },
    {
      name: "Pro",
      price: "$199/mo",
      features: ["Up to 200 clients", "Everything in Starter", "Ad Builder", "Captain Scoop AI", "Post scheduler", "Priority support"],
      subscribers: 142,
      mrr: "$28,258",
      color: "border-emerald-200 bg-emerald-50/30",
    },
    {
      name: "Enterprise",
      price: "$299/mo",
      features: ["Unlimited clients", "Everything in Pro", "Multi-crew routing", "API access", "Dedicated support", "Custom integrations"],
      subscribers: 44,
      mrr: "$13,156",
      color: "border-purple-200 bg-purple-50/30",
    },
  ];

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Subscriptions</h1>
        <p className="text-gray-500 text-sm">Manage subscription tiers and payment gateway configuration.</p>
      </div>

      {/* Tier cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {tiers.map((tier) => (
          <div key={tier.name} className={`border rounded-xl p-6 ${tier.color}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{tier.name}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-4">{tier.price}</p>
            <ul className="space-y-2 mb-6">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {f}
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-gray-200 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subscribers</span>
                <span className="font-semibold text-gray-900">{tier.subscribers}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">MRR</span>
                <span className="font-semibold text-gray-900">{tier.mrr}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gateway config */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Payment Gateway Configuration</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Stripe Publishable Key</label>
            <input type="text" placeholder="pk_live_..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500" readOnly defaultValue="pk_live_••••••••••••••••kF3m" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Stripe Secret Key</label>
            <input type="password" placeholder="sk_live_..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500" readOnly defaultValue="••••••••••••••••" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Webhook URL</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500" readOnly defaultValue="https://poopscoop-hq.vercel.app/api/stripe/webhook" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Webhook Secret</label>
            <input type="password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500" readOnly defaultValue="••••••••••••••••" />
          </div>
        </div>
        <button className="mt-4 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors">
          Save Gateway Settings
        </button>
      </div>
    </div>
  );
}
