export default function HelpPage() {
  const faqs = [
    { q: "How do I optimize my routes?", a: "Go to Route Optimizer from the sidebar. Select a day, then click 'Optimize Route'. The system uses real road data to find the most efficient order for your stops." },
    { q: "How does lead generation work?", a: "Lead Generation finds residential properties near your existing clients. Select a client, set a block radius, and generate leads. You can export them as CSV or launch campaigns directly." },
    { q: "How do review requests work?", a: "Review Requests sends automated emails to your clients asking for Google reviews. You can configure follow-up intervals and the system stops following up once a client clicks the review link." },
    { q: "Can I connect my CRM?", a: "Yes! Go to Settings → Connections to link Sweep&Go, Jobber, or other tools. Once connected, your client data syncs automatically." },
    { q: "What's Captain Scoop?", a: "Captain Scoop is your AI business development assistant. It analyzes your data and provides personalized recommendations for growing your business." },
    { q: "How is pricing calculated in Quote Builder?", a: "Pricing is based on yard size, number of dogs, service frequency, and tier (Basic or Premium). You can customize the pricing matrix in Quote Builder → Pricing Settings." },
  ];

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Help & Support</h1>
        <p className="text-gray-500 text-sm">Get help with PoopScoop HQ features and settings.</p>
      </div>

      {/* Contact */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {[
          { icon: "📧", label: "Email Support", desc: "support@poopscoop.hq", action: "Send Email" },
          { icon: "💬", label: "Live Chat", desc: "Available Mon-Fri 9-5 PST", action: "Start Chat" },
          { icon: "📞", label: "Phone", desc: "(800) 555-POOP", action: "Call Now" },
        ].map((ch) => (
          <div key={ch.label} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl mb-2">{ch.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{ch.label}</h3>
            <p className="text-sm text-gray-500 mb-3">{ch.desc}</p>
            <button className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-200 hover:bg-emerald-100 transition-colors">
              {ch.action}
            </button>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-5">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
              <h3 className="font-medium text-gray-900 mb-1.5">{faq.q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
