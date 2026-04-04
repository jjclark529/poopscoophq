import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl">💩</div>
            <span className="text-xl font-bold text-gray-900">PoopScoop HQ</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Sign In</Link>
            <Link href="/register" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">Start Free Trial</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          🚀 Now with AI-powered Route Optimization
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Run Your Poop Scoop<br />
          Business Like a <span className="text-emerald-600">Pro</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          The all-in-one platform for pet waste removal operators. Route optimization, lead generation, marketing automation, and AI coaching — all in one place.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/register" className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-lg font-semibold transition-colors shadow-md shadow-emerald-200">
            Start Free Trial
          </Link>
          <Link href="/login" className="px-8 py-3.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl text-lg font-semibold transition-colors">
            Sign In →
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Everything You Need to Scale</h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">Built by operators, for operators. Every feature designed to save you time and grow your business.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "🗺️", title: "Route Optimizer", desc: "AI-powered route planning saves 20-30% drive time. Automatically finds the best order for your daily stops." },
            { icon: "📍", title: "Lead Generation", desc: "Find new customers near your existing routes. Generate targeted leads with neighbor-radius prospecting." },
            { icon: "⭐", title: "Review Requests", desc: "Automated review request sequences with smart follow-ups. Build your online reputation on autopilot." },
            { icon: "📊", title: "KPI Dashboard", desc: "Track revenue, churn, client growth, and route efficiency. Know your numbers at a glance." },
            { icon: "📱", title: "Ad Builder", desc: "Create professional Facebook and Google ads in minutes. Templates designed for pet waste removal." },
            { icon: "🤖", title: "Captain Scoop AI", desc: "Your AI business development assistant. Get strategy advice, competitive intel, and growth coaching." },
            { icon: "📅", title: "Post Scheduler", desc: "Schedule social media posts across platforms. Keep your brand visible without the daily grind." },
            { icon: "💰", title: "Quote Builder", desc: "Professional quotes in seconds. Pricing by yard size, dog count, and service frequency." },
            { icon: "🏆", title: "AI Coaching", desc: "Personalized growth missions and milestones. Captain Scoop guides you step-by-step to your goals." },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-emerald-100 transition-all">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-500 text-center mb-12">Start free. Upgrade when you&apos;re ready.</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Starter", price: "$99", features: ["Up to 50 clients", "Route optimization", "Basic lead gen", "Review requests", "Email support"] },
              { name: "Pro", price: "$199", features: ["Up to 200 clients", "Everything in Starter", "Ad Builder", "Captain Scoop AI", "Post scheduler", "Priority support"], popular: true },
              { name: "Enterprise", price: "$299", features: ["Unlimited clients", "Everything in Pro", "Multi-crew routing", "API access", "Dedicated support", "Custom integrations"] },
            ].map((plan) => (
              <div key={plan.name} className={`bg-white rounded-2xl p-8 border-2 ${plan.popular ? "border-emerald-500 shadow-lg shadow-emerald-100 relative" : "border-gray-100"}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-400">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors ${plan.popular ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}>
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Scoop Smarter?</h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">Join hundreds of poop scoop operators who&apos;ve streamlined their operations with PoopScoop HQ.</p>
        <Link href="/register" className="inline-block px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-lg font-semibold transition-colors shadow-md shadow-emerald-200">
          Get Started Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">💩</span>
            <span className="text-sm font-semibold text-gray-600">PoopScoop HQ</span>
          </div>
          <p className="text-gray-400 text-sm">© 2025 PoopScoop HQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
