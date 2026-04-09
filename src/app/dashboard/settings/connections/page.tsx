'use client'

import { useState } from 'react'
import { Plug, Check, X, MessageSquare } from 'lucide-react'

const connections = [
  {
    name: 'Sweep&Go',
    icon: '🧹',
    description: 'Client data, subscriptions, jobs, and payments',
    connected: false,
    fields: [
      { label: 'Sweep&Go API Token', value: '', type: 'password' },
      { label: 'Organization ID', value: '', type: 'text' },
    ],
  },
  {
    name: 'Jobber',
    icon: '🔧',
    description: 'Jobs, invoices, clients, quotes, and scheduling',
    connected: false,
    fields: [
      { label: 'Jobber API Key', value: '', type: 'password' },
      { label: 'Client ID', value: '', type: 'text' },
    ],
  },
  {
    name: 'Quo',
    icon: '📞',
    description: 'Calls, texts, voicemails, recordings, and transcriptions',
    connected: false,
    smsCapable: true,
    fields: [{ label: 'Quo API Key', value: '', type: 'password' }],
  },
  {
    name: 'Dialpad',
    icon: '☎️',
    description: 'Business phone, SMS messaging, and call analytics',
    connected: false,
    smsCapable: true,
    fields: [
      { label: 'Dialpad API Key', value: '', type: 'password' },
      { label: 'Office ID', value: '', type: 'text' },
    ],
  },
  {
    name: 'RingCentral',
    icon: '📱',
    description: 'Cloud phone, SMS, team messaging, and video',
    connected: false,
    smsCapable: true,
    fields: [
      { label: 'RingCentral Client ID', value: '', type: 'text' },
      { label: 'RingCentral Client Secret', value: '', type: 'password' },
      { label: 'JWT Token', value: '', type: 'password' },
    ],
  },
]

export default function ConnectionsPage() {
  const [smsProvider, setSmsProvider] = useState<string | null>(null)

  const selectSmsProvider = (name: string) => setSmsProvider(smsProvider === name ? null : name)

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Connections</h1>
        <p className="text-gray-500">Connect your CRM and communication tools</p>
      </div>

      <div className="space-y-4">
        {connections.map((conn, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{conn.icon}</span>
                <div>
                  <h3 className="font-semibold">{conn.name}</h3>
                  <p className="text-sm text-gray-500">{conn.description}</p>
                </div>
              </div>
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${conn.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {conn.connected ? <><Check size={14} /> Connected</> : <><X size={14} /> Not Connected</>}
              </span>
            </div>

            <div className="space-y-3">
              {conn.fields.map((field, f) => (
                <div key={f}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              {conn.connected ? (
                <>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Reconnect</button>
                  <button className="border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50">Disconnect</button>
                </>
              ) : (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                  <Plug size={14} /> Connect
                </button>
              )}
            </div>

            {(conn as any).smsCapable && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => selectSmsProvider(conn.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full justify-center ${
                    smsProvider === conn.name
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <MessageSquare size={14} />
                  {smsProvider === conn.name ? '✅ Active SMS Provider' : 'Use for In-App SMS'}
                </button>
                {smsProvider === conn.name && (
                  <p className="text-xs text-green-600 mt-1 text-center">SMS messages from PoopScoop Quote will be sent through {conn.name}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
