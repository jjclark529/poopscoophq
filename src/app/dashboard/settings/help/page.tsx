"use client";

import { useState } from "react";
import Link from "next/link";

interface Guide {
  icon: string;
  title: string;
  desc: string;
  steps: number;
  time: string;
  stepList: Array<{ title: string; desc: string }>;
}

const guides: Guide[] = [
  { icon: "🔍", title: "Google Ads Setup", desc: "Connect your Google Ads account and start tracking campaign performance.", steps: 5, time: "10 min", stepList: [
    { title: "Go to your Google Ads account", desc: "Log in at ads.google.com. You'll need your Customer ID (found in the top right corner, format: XXX-XXX-XXXX)." },
    { title: "Find your Customer ID", desc: "Click on your account icon in the top right. Your Customer ID is displayed under your email. Copy this number." },
    { title: "Open PoopScoop HQ Connections", desc: "Navigate to Settings → Connections in PoopScoop HQ. Find the Google card." },
    { title: "Enter your Google Ads Customer ID", desc: 'Paste your Customer ID into the "Google Ads Customer ID" field and click Save.' },
    { title: "Authorize access", desc: "Click \"Connect\" and follow the Google OAuth prompt to grant PoopScoop HQ read access to your campaign data." },
  ]},
  { icon: "📘", title: "Facebook Ads Setup", desc: "Link your Meta Business account to pull Facebook and Instagram ad data.", steps: 4, time: "8 min", stepList: [
    { title: "Open Meta Business Suite", desc: "Go to business.facebook.com and log into your business account." },
    { title: "Find your Ad Account ID", desc: "Navigate to Business Settings → Ad Accounts. Copy your Ad Account ID (format: act_XXXXXXXXXX)." },
    { title: "Open PoopScoop HQ Connections", desc: "Go to Settings → Connections and find the Meta card." },
    { title: "Enter credentials and connect", desc: "Paste your Ad Account ID and Page ID, then click Connect to authorize via Meta OAuth." },
  ]},
  { icon: "📊", title: "Google Analytics (GA4)", desc: "Connect GA4 to track website traffic, conversions, and user behavior.", steps: 6, time: "12 min", stepList: [
    { title: "Open Google Analytics", desc: "Go to analytics.google.com and select your GA4 property." },
    { title: "Find your Property ID", desc: "Click Admin → Property Settings. Your Property ID is a 9-digit number." },
    { title: "Create an API credential", desc: "Go to Google Cloud Console → APIs & Services → Credentials. Create an OAuth client." },
    { title: "Enable the Analytics API", desc: "Search for 'Google Analytics Data API' in the API library and enable it." },
    { title: "Open PoopScoop HQ Connections", desc: "Go to Settings → Connections and find the Google card." },
    { title: "Enter your GA4 Property ID", desc: "Paste the Property ID and click Save." },
  ]},
  { icon: "🌐", title: "Search Console", desc: "Link Search Console for organic search rankings and click data.", steps: 3, time: "5 min", stepList: [
    { title: "Open Google Search Console", desc: "Go to search.google.com/search-console and select your property." },
    { title: "Copy your site URL", desc: "Your verified property URL is shown in the top-left dropdown." },
    { title: "Enter in PoopScoop HQ", desc: "Go to Settings → Connections → Google card. Paste into the Search Console URL field." },
  ]},
  { icon: "🔄", title: "Conversion Tracking", desc: "Set up proper conversion tracking across Google and Meta platforms.", steps: 8, time: "20 min", stepList: [
    { title: "Install Google Tag Manager", desc: "Add the GTM snippet to your website's <head> section." },
    { title: "Create a conversion action in Google Ads", desc: "Go to Google Ads → Goals → Conversions → New conversion action." },
    { title: "Set up the Google Ads tag in GTM", desc: "Create a new tag using the Google Ads Conversion Tracking template." },
    { title: "Install Meta Pixel", desc: "Go to Meta Events Manager → Connect Data Sources → Web → Meta Pixel." },
    { title: "Add pixel to your website", desc: "Install the base pixel code or use GTM with the Meta Pixel template." },
    { title: "Configure standard events", desc: "Set up Lead, Contact, and Purchase events for proper attribution." },
    { title: "Test your conversions", desc: "Use Google Tag Assistant and Meta Pixel Helper to verify tracking." },
    { title: "Verify in PoopScoop HQ", desc: "Check that conversion data appears in your KPIs & Metrics dashboard." },
  ]},
  { icon: "📞", title: "Call Tracking", desc: "Configure call tracking to attribute phone leads to your ad campaigns.", steps: 4, time: "10 min", stepList: [
    { title: "Choose your call platform", desc: "PoopScoop HQ supports Quo, Dialpad, and RingCentral for call tracking." },
    { title: "Get your API credentials", desc: "Log into your phone platform and navigate to the API or integrations section." },
    { title: "Connect in PoopScoop HQ", desc: "Go to Settings → Connections and enter your API key for your chosen platform." },
    { title: "Enable call attribution", desc: "Calls will automatically be tagged with their source (Google Ads, organic, direct)." },
  ]},
  { icon: "📞", title: "Quo Setup", desc: "Connect Quo for calls, texts, voicemails, transcriptions, and in-app SMS.", steps: 5, time: "5 min", stepList: [
    { title: "Log into Quo", desc: "Go to quo.com and sign into your account." },
    { title: "Navigate to API settings", desc: "Go to Settings → API → Generate new API key." },
    { title: "Copy your API key", desc: "Copy the generated API key to your clipboard." },
    { title: "Connect in PoopScoop HQ", desc: "Go to Settings → Connections → Quo. Paste your API key and click Connect." },
    { title: "Enable for In-App SMS", desc: "Click 'Use for In-App SMS' to use Quo as your SMS provider for templates and campaigns." },
  ]},
  { icon: "☎️", title: "Dialpad Setup", desc: "Connect Dialpad for business phone, SMS messaging, and call analytics.", steps: 6, time: "8 min", stepList: [
    { title: "Log into Dialpad", desc: "Go to dialpad.com and sign into your admin account." },
    { title: "Navigate to integrations", desc: "Go to Admin → Integrations → API." },
    { title: "Generate an API key", desc: "Click 'Create API Key' and give it a descriptive name." },
    { title: "Find your Office ID", desc: "Go to Admin → Offices. Your Office ID is in the URL or settings panel." },
    { title: "Connect in PoopScoop HQ", desc: "Go to Settings → Connections → Dialpad. Enter your API Key and Office ID." },
    { title: "Enable for In-App SMS", desc: "Click 'Use for In-App SMS' to use Dialpad as your SMS provider." },
  ]},
  { icon: "📱", title: "RingCentral Setup", desc: "Connect RingCentral for cloud phone, SMS messaging, and team communications.", steps: 7, time: "10 min", stepList: [
    { title: "Log into RingCentral Developer Portal", desc: "Go to developers.ringcentral.com and sign in." },
    { title: "Create a new app", desc: "Click 'Create App' and select 'REST API App'." },
    { title: "Configure permissions", desc: "Add ReadMessages, SendMessages, and ReadCallLog permissions." },
    { title: "Get your Client ID and Secret", desc: "Copy the Client ID and Client Secret from your app's credentials page." },
    { title: "Generate a JWT token", desc: "Go to Credentials → JWT Credentials → Create JWT." },
    { title: "Connect in PoopScoop HQ", desc: "Go to Settings → Connections → RingCentral. Enter Client ID, Secret, and JWT." },
    { title: "Enable for In-App SMS", desc: "Click 'Use for In-App SMS' to use RingCentral for sending texts." },
  ]},
  { icon: "🧹", title: "Sweep&Go Setup", desc: "Connect Sweep&Go for client data, subscriptions, and job tracking.", steps: 3, time: "5 min", stepList: [
    { title: "Log into Sweep&Go", desc: "Go to sweepandgo.com and sign into your dashboard." },
    { title: "Generate an API token", desc: "Go to Settings → API → Generate API Token. Copy the token and your Organization ID." },
    { title: "Connect in PoopScoop HQ", desc: "Go to Settings → Connections → Sweep&Go. Paste your token and Org ID, then click Connect." },
  ]},
  { icon: "🔗", title: "HubSpot + Make Setup", desc: "Set up Make scenarios to bridge HubSpot data into PoopScoop HQ.", steps: 6, time: "15 min", stepList: [
    { title: "Create a Make.com account", desc: "Sign up at make.com (formerly Integromat) if you haven't already." },
    { title: "Create an inbound scenario", desc: "Create a new scenario: HubSpot → Webhook. This sends HubSpot data to PoopScoop HQ." },
    { title: "Copy the inbound webhook URL", desc: "Make will generate a webhook URL. Copy it." },
    { title: "Create an outbound scenario", desc: "Create another scenario: Webhook → HubSpot. This sends PoopScoop HQ actions back to HubSpot." },
    { title: "Copy the outbound webhook URL", desc: "Copy the second webhook URL." },
    { title: "Connect in PoopScoop HQ", desc: "Go to Settings → Connections → HubSpot. Paste both webhook URLs and click Connect." },
  ]},
  { icon: "🔧", title: "Jobber Setup", desc: "Connect Jobber to pull jobs, invoices, clients, and quotes.", steps: 5, time: "8 min", stepList: [
    { title: "Log into Jobber", desc: "Go to getjobber.com and sign into your account." },
    { title: "Navigate to API settings", desc: "Go to Settings → App Marketplace → API." },
    { title: "Create an API application", desc: "Register a new application and note your API Key and Client ID." },
    { title: "Connect in PoopScoop HQ", desc: "Go to Settings → Connections → Jobber. Enter your API Key and Client ID." },
    { title: "Authorize the connection", desc: "Click Connect and follow the OAuth prompt to grant access." },
  ]},
  { icon: "📊", title: "Pipeline CRM Setup", desc: "Connect Pipeline CRM for deals, contacts, and pipeline tracking.", steps: 4, time: "5 min", stepList: [
    { title: "Log into Pipeline CRM", desc: "Go to pipelinecrm.com and sign in." },
    { title: "Find your API key", desc: "Go to Settings → API → Copy your API Key and App Key." },
    { title: "Connect in PoopScoop HQ", desc: "Go to Settings → Connections → Pipeline CRM. Enter both keys." },
    { title: "Verify sync", desc: "Check that your deals and contacts appear in the platform." },
  ]},
  { icon: "🚀", title: "GoHighLevel Setup", desc: "Connect GoHighLevel for contacts, opportunities, and campaigns.", steps: 5, time: "8 min", stepList: [
    { title: "Log into GoHighLevel", desc: "Go to app.gohighlevel.com and sign in." },
    { title: "Navigate to API settings", desc: "Go to Settings → Business Profile → API Keys." },
    { title: "Generate an API key", desc: "Click 'Create API Key'. Copy the key and your Location ID." },
    { title: "Connect in PoopScoop HQ", desc: "Go to Settings → Connections → GoHighLevel. Enter your API Key and Location ID." },
    { title: "Test the connection", desc: "Click Connect and verify that contacts sync successfully." },
  ]},
  { icon: "🤖", title: "OpenAI API Key", desc: "Configure your AI key to power Captain Scoop and smart features.", steps: 3, time: "3 min", stepList: [
    { title: "Get an OpenAI API key", desc: "Go to platform.openai.com/api-keys and create a new secret key." },
    { title: "Enter in PoopScoop HQ", desc: "Go to Settings → Connections → AI Configuration. Paste your API key." },
    { title: "Choose your models", desc: "Select which model to use for each workflow (Chat, Images, Analysis, Ad Builder)." },
  ]},
];

const resources = [
  { icon: "📝", title: "Reading Your Reports", desc: "Understanding your marketing metrics and what they mean.", time: "10 min read" },
  { icon: "🚀", title: "Using Ad Builder", desc: "How to create ads using the built-in ad builder and AI assistance.", time: "8 min read" },
  { icon: "💰", title: "Budget Management", desc: "Best practices for allocating and optimizing your ad budget.", time: "6 min read" },
  { icon: "📖", title: "Glossary", desc: "Marketing terms and abbreviations explained simply.", time: "Reference" },
];

export default function HelpPage() {
  const [expandedGuide, setExpandedGuide] = useState<number | null>(0);
  const [expandedResource, setExpandedResource] = useState<number | null>(null);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">📋 Help Center</h1>
        <p className="text-gray-500 text-sm mt-1">Setup guides, tutorials, and documentation</p>
      </div>

      {/* What's PoopScoop HQ banner */}
      <Link href="/dashboard/settings/help" className="block bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-5 text-white hover:opacity-95 transition-opacity">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">What&apos;s PoopScoop HQ?</h2>
            <p className="text-sm text-white/80 mt-1">Learn about all features, integrations, and FAQs</p>
          </div>
          <span className="text-xl">→</span>
        </div>
      </Link>

      {/* Quick Start */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
        <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2">🚀 Quick Start</h3>
        <p className="text-sm text-purple-800 mt-2">New to PoopScoop HQ? Start by connecting your Google Ads and Meta Ads accounts (guides below), then set up your business profile. Captain Scoop will guide you through the rest!</p>
      </div>

      {/* Setup Guides */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Setup Guides</h2>
        <div className="space-y-2">
          {guides.map((guide, i) => {
            const isOpen = expandedGuide === i;
            return (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button onClick={() => setExpandedGuide(isOpen ? null : i)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{guide.icon}</span>
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-900">{guide.title}</p>
                      <p className="text-xs text-gray-500">{guide.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 flex-shrink-0">
                    <span>{guide.steps} steps • {guide.time}</span>
                    <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="space-y-3 ml-8">
                      {guide.stepList.map((step, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-[10px] text-gray-400">{j + 1}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Step {j + 1}: {step.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 ml-8">
                      <div className="bg-gray-100 rounded-full h-1.5 w-full">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "0%" }} />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">0 of {guide.steps} steps completed</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Resources */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Resources</h2>
        <div className="space-y-2">
          {resources.map((r, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button onClick={() => setExpandedResource(expandedResource === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{r.icon}</span>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">{r.title}</p>
                    <p className="text-xs text-gray-500">{r.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 flex-shrink-0">
                  <span>{r.time}</span>
                  <svg className={`w-4 h-4 transition-transform ${expandedResource === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {expandedResource === i && (
                <div className="px-5 pb-5 ml-10">
                  <p className="text-sm text-gray-600">Content coming soon. Check back for detailed {r.title.toLowerCase()} documentation.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-100">
        © 2026 PoopScoop HQ | info@poopscoophq.com | 877.357.7474
      </div>
    </div>
  );
}
