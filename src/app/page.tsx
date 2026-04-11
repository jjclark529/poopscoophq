import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, Send, Sparkles, ShieldCheck, Clock3 } from 'lucide-react'
import { QuoteLogo } from '@/components/ui/QuoteLogo'

const features = [
  'Standalone quote builder for poop scoop businesses',
  'Per-visit and monthly pricing with pro-rating',
  'Initial cleanup fees, add-ons, and pricing uploads',
  'Send quotes by text or email and export PDF',
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col">
      <div className="max-w-6xl mx-auto w-full px-6 pt-8 pb-10 flex-1 grid grid-cols-2 gap-12 items-start">
        <div className="relative">
          <div className="mb-6 flex justify-center">
            <QuoteLogo size={460} className="drop-shadow-2xl" />
          </div>
          <p className="text-xl text-blue-200 mb-5 text-center">Fast, polished quoting for pet waste removal businesses</p>
          <h2 className="text-5xl font-bold leading-tight mb-5">
            Quote jobs faster.
            <br />
            Close more yards.
          </h2>
          <p className="text-xl text-blue-100 max-w-xl mb-8">
            PoopScoop Quote is the standalone quoting app for poop scoop operators — complete with pricing tables, initial cleanups, add-ons, monthly conversions, and simple customer-ready quote delivery.
          </p>
          <div className="space-y-3 mb-8">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 text-blue-50">
                <CheckCircle2 size={18} className="mt-0.5 text-green-300 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <div className="absolute left-[620px] top-[250px] flex gap-4 whitespace-nowrap">
            <Link href="/login" className="px-7 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-lg font-medium">
              Sign In
            </Link>
            <Link href="/register" className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 text-lg">
              Start for $29.99/mo <ArrowRight size={20} />
            </Link>
          </div>
          <div className="mt-6 text-blue-200 text-sm">
            One simple plan: <span className="font-bold text-white">$29.99/month</span>
          </div>
        </div>

        <div style={{ paddingTop: '555px' }}>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/10">
            <div className="bg-slate-950 px-5 py-4 flex items-center gap-3 text-white">
              <QuoteLogo size={42} />
              <div>
                <p className="font-semibold">PoopScoop Quote</p>
                <p className="text-xs text-slate-300">A cleaner, faster quoting workflow</p>
              </div>
            </div>
            <div className="p-6 text-gray-900">
              <div className="grid md:grid-cols-3 gap-4 mb-5">
                <div className="bg-blue-50 rounded-2xl p-4">
                  <FileText className="text-blue-600 mb-2" size={20} />
                  <p className="font-semibold">Professional Quotes</p>
                  <p className="text-sm text-gray-600 mt-1">Create polished quotes in minutes.</p>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4">
                  <Clock3 className="text-amber-600 mb-2" size={20} />
                  <p className="font-semibold">Instant Pricing</p>
                  <p className="text-sm text-gray-600 mt-1">Handle recurring, one-time, and prorated pricing fast.</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-4">
                  <Send className="text-green-600 mb-2" size={20} />
                  <p className="font-semibold">Ready to Send</p>
                  <p className="text-sm text-gray-600 mt-1">Text, email, PDF download, and draft saving built in.</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-lg">Sample Customer Quote</p>
                    <p className="text-sm text-gray-500">2 dogs • 3,001–4,000 sqft • Weekly service</p>
                  </div>
                  <span className="text-green-600 font-bold text-xl">$145.00</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between"><span>Initial Cleanup</span><span>$85.00</span></div>
                  <div className="flex justify-between"><span>Weekly Service</span><span>$60.00</span></div>
                  <div className="flex justify-between"><span>Optional Deodorizing Add-On</span><span>$40.00</span></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-slate-200 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1"><Sparkles size={14} className="text-blue-500" /><span className="text-xs font-semibold text-gray-600">WHY PEOPLE LIKE IT</span></div>
                    <p className="text-sm text-gray-700">Clear pricing, clean totals, and no guesswork for the customer.</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1"><ShieldCheck size={14} className="text-green-500" /><span className="text-xs font-semibold text-gray-600">BUILT FOR OPERATORS</span></div>
                    <p className="text-sm text-gray-700">Upload pricing tables, manage add-ons, and close jobs faster.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={14} /> Secure login and subscription access included
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-white/60 pb-6">
        © 2026 PoopScoop Quote | info@poopscoophq.com
      </div>
    </div>
  )
}
