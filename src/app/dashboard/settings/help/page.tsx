'use client'

import { useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp, Check } from 'lucide-react'

type Guide = {
  title: string
  icon: string
  description: string
  time: string
  steps: { title: string; detail: string }[]
}

const setupGuides: Guide[] = [
  {
    title: 'Sweep&Go Setup',
    icon: '🧹',
    description: 'Connect Sweep&Go for client data, subscriptions, and job tracking.',
    time: '5 min',
    steps: [
      { title: 'Log into Sweep&Go', detail: 'Go to your Sweep&Go dashboard.' },
      { title: 'Generate API token', detail: 'Open your dashboard settings and generate an API token for access.' },
      { title: 'Find your Organization ID', detail: 'Copy your organization ID from your account or API settings.' },
      { title: 'Enter credentials in PoopScoop Quote', detail: 'Go to Connections, paste your API Token and Organization ID, then click Connect.' },
    ],
  },
  {
    title: 'Jobber Setup',
    icon: '🔧',
    description: 'Connect Jobber to pull jobs, invoices, clients, and quotes.',
    time: '8 min',
    steps: [
      { title: 'Log into Jobber', detail: 'Sign into your Jobber account.' },
      { title: 'Create or locate your API credentials', detail: 'Open Jobber developer or API settings and generate the credentials you want to use.' },
      { title: 'Copy your Client ID', detail: 'Save the Client ID from your Jobber app settings.' },
      { title: 'Enter credentials in PoopScoop Quote', detail: 'Go to Connections, paste your API Key and Client ID, then click Connect.' },
    ],
  },
  {
    title: 'Quo Setup',
    icon: '📞',
    description: 'Connect Quo for calls, texts, voicemails, and in-app SMS.',
    time: '5 min',
    steps: [
      { title: 'Log into Quo', detail: 'Go to your Quo account and sign in with admin access.' },
      { title: 'Generate an API key', detail: 'Create a new API key with access to calls, messages, and contacts.' },
      { title: 'Enter API key in PoopScoop Quote', detail: 'Go to Connections, paste your Quo API key, and click Connect.' },
      { title: 'Enable for SMS messaging', detail: 'Use the “Use for In-App SMS” button if you want Quo to be your active SMS provider.' },
    ],
  },
  {
    title: 'Dialpad Setup',
    icon: '☎️',
    description: 'Connect Dialpad for business phone, SMS messaging, and call analytics.',
    time: '8 min',
    steps: [
      { title: 'Log into Dialpad', detail: 'Sign into your Dialpad admin account.' },
      { title: 'Create an API key', detail: 'Generate an API key in your Dialpad admin or integration settings.' },
      { title: 'Find your Office ID', detail: 'Copy your Office ID from Dialpad office settings.' },
      { title: 'Enter credentials in PoopScoop Quote', detail: 'Go to Connections, enter your API Key and Office ID, then click Connect.' },
      { title: 'Enable for SMS messaging', detail: 'Use the “Use for In-App SMS” button to make Dialpad your active SMS provider if desired.' },
    ],
  },
  {
    title: 'RingCentral Setup',
    icon: '📱',
    description: 'Connect RingCentral for cloud phone, SMS messaging, and team communications.',
    time: '10 min',
    steps: [
      { title: 'Log into RingCentral Developer Portal', detail: 'Sign into the RingCentral developer portal with admin access.' },
      { title: 'Create an app', detail: 'Create a REST API app and enable the permissions you need.' },
      { title: 'Copy your credentials', detail: 'Save your Client ID, Client Secret, and JWT Token.' },
      { title: 'Enter credentials in PoopScoop Quote', detail: 'Go to Connections, paste your Client ID, Client Secret, and JWT Token, then click Connect.' },
      { title: 'Enable for SMS messaging', detail: 'Use the “Use for In-App SMS” button if you want RingCentral to be your active SMS provider.' },
    ],
  },
]

export default function HelpPage() {
  const [expandedGuide, setExpandedGuide] = useState<number | null>(null)
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({})

  const toggleStep = (guideIdx: number, stepIdx: number) => {
    const key = `${guideIdx}-${stepIdx}`
    setCompletedSteps((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="text-blue-500" /> Help Center
        </h1>
        <p className="text-gray-500">Setup guides for the connections used in PoopScoop Quote</p>
      </div>

      <div className="space-y-4">
        {setupGuides.map((guide, guideIdx) => {
          const completedCount = guide.steps.filter((_, stepIdx) => completedSteps[`${guideIdx}-${stepIdx}`]).length
          const isExpanded = expandedGuide === guideIdx

          return (
            <div key={guide.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setExpandedGuide(isExpanded ? null : guideIdx)}
                className="w-full p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{guide.icon}</span>
                    <div>
                      <h2 className="font-semibold text-gray-900">{guide.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">{guide.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span>{guide.time}</span>
                        <span>•</span>
                        <span>{completedCount}/{guide.steps.length} steps completed</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-400 mt-1">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                  <div className="space-y-3">
                    {guide.steps.map((step, stepIdx) => {
                      const key = `${guideIdx}-${stepIdx}`
                      const done = !!completedSteps[key]
                      return (
                        <div key={stepIdx} className={`rounded-lg border p-4 ${done ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleStep(guideIdx, stepIdx)}
                              className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${done ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-blue-500'}`}
                            >
                              {done && <Check size={12} />}
                            </button>
                            <div>
                              <h3 className={`font-medium ${done ? 'text-green-900 line-through' : 'text-gray-900'}`}>{step.title}</h3>
                              <p className={`text-sm mt-1 ${done ? 'text-green-700' : 'text-gray-600'}`}>{step.detail}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-400">
        © 2026 PoopScoop Quote| info@poopscoopquote.com | 877.357.7474
      </div>
    </div>
  )
}
