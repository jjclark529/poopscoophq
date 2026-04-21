'use client'

import { useState } from 'react'
import { Plug, Check, X, MessageSquare, Loader2 } from 'lucide-react'

type ConnectionDef = {
  name: string
  icon: string
  description: string
  smsCapable?: boolean
  fields: { label: string; key: string; type: string }[]
}

const connectionDefs: ConnectionDef[] = [
  {
    name: 'Sweep&Go',
    icon: '🧹',
    description: 'Client data, subscriptions, jobs, and payments',
    fields: [
      { label: 'Sweep&Go API Token', key: 'apiToken', type: 'password' },
      { label: 'Organization ID', key: 'orgId', type: 'text' },
    ],
  },
  {
    name: 'Jobber',
    icon: '🔧',
    description: 'Jobs, invoices, clients, quotes, and scheduling',
    fields: [
      { label: 'Jobber API Key', key: 'apiKey', type: 'password' },
      { label: 'Client ID', key: 'clientId', type: 'text' },
    ],
  },
  {
    name: 'Quo',
    icon: '📞',
    description: 'Calls, texts, voicemails, recordings, and transcriptions',
    smsCapable: true,
    fields: [{ label: 'Quo API Key', key: 'apiKey', type: 'password' }],
  },
  {
    name: 'Dialpad',
    icon: '☎️',
    description: 'Business phone, SMS messaging, and call analytics',
    smsCapable: true,
    fields: [
      { label: 'Dialpad API Key', key: 'apiKey', type: 'password' },
      { label: 'Office ID', key: 'officeId', type: 'text' },
    ],
  },
  {
    name: 'RingCentral',
    icon: '📱',
    description: 'Cloud phone, SMS, team messaging, and video',
    smsCapable: true,
    fields: [
      { label: 'RingCentral Client ID', key: 'clientId', type: 'text' },
      { label: 'RingCentral Client Secret', key: 'clientSecret', type: 'password' },
      { label: 'JWT Token', key: 'jwtToken', type: 'password' },
    ],
  },
]

type ConnectionState = {
  connected: boolean
  fieldValues: Record<string, string>
  busy: boolean
}

function loadState(): Record<string, ConnectionState> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem('psq_connections')
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return {}
}

function saveState(state: Record<string, ConnectionState>) {
  try { localStorage.setItem('psq_connections', JSON.stringify(state)) } catch { /* ignore */ }
}

export default function ConnectionsPage() {
  const [states, setStates] = useState<Record<string, ConnectionState>>(() => {
    const saved = loadState()
    const init: Record<string, ConnectionState> = {}
    for (const def of connectionDefs) {
      init[def.name] = saved[def.name] ?? {
        connected: false,
        fieldValues: Object.fromEntries(def.fields.map(f => [f.key, ''])),
        busy: false,
      }
    }
    return init
  })
  const [smsProvider, setSmsProvider] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    try { return localStorage.getItem('psq_sms_provider') } catch { return null }
  })
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const updateField = (connName: string, fieldKey: string, value: string) => {
    setStates(prev => {
      const updated = {
        ...prev,
        [connName]: {
          ...prev[connName],
          fieldValues: { ...prev[connName].fieldValues, [fieldKey]: value },
        },
      }
      saveState(updated)
      return updated
    })
  }

  const connect = (def: ConnectionDef) => {
    const state = states[def.name]
    // Validate all fields have values
    const emptyField = def.fields.find(f => !state.fieldValues[f.key]?.trim())
    if (emptyField) {
      showToast(`⚠️ Please enter ${emptyField.label}`)
      return
    }

    // Simulate connection (set busy, then connected)
    setStates(prev => ({ ...prev, [def.name]: { ...prev[def.name], busy: true } }))

    setTimeout(() => {
      setStates(prev => {
        const updated = {
          ...prev,
          [def.name]: { ...prev[def.name], connected: true, busy: false },
        }
        saveState(updated)
        return updated
      })
      showToast(`✅ ${def.name} connected successfully!`)
    }, 1200)
  }

  const disconnect = (def: ConnectionDef) => {
    setStates(prev => ({ ...prev, [def.name]: { ...prev[def.name], busy: true } }))

    setTimeout(() => {
      setStates(prev => {
        const updated = {
          ...prev,
          [def.name]: {
            ...prev[def.name],
            connected: false,
            busy: false,
          },
        }
        saveState(updated)
        return updated
      })
      // Clear SMS provider if it was this one
      if (smsProvider === def.name) {
        setSmsProvider(null)
        try { localStorage.removeItem('psq_sms_provider') } catch { /* ignore */ }
      }
      showToast(`${def.name} disconnected`)
    }, 800)
  }

  const reconnect = (def: ConnectionDef) => {
    setStates(prev => ({ ...prev, [def.name]: { ...prev[def.name], busy: true } }))

    setTimeout(() => {
      setStates(prev => {
        const updated = {
          ...prev,
          [def.name]: { ...prev[def.name], connected: true, busy: false },
        }
        saveState(updated)
        return updated
      })
      showToast(`✅ ${def.name} reconnected!`)
    }, 1200)
  }

  const selectSmsProvider = (name: string) => {
    const newVal = smsProvider === name ? null : name
    setSmsProvider(newVal)
    try {
      if (newVal) localStorage.setItem('psq_sms_provider', newVal)
      else localStorage.removeItem('psq_sms_provider')
    } catch { /* ignore */ }
    if (newVal) showToast(`📱 ${name} set as SMS provider`)
  }

  return (
    <div className="p-6 max-w-4xl">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-gray-200 shadow-lg rounded-xl px-5 py-3 text-sm font-medium animate-fade-in">
          {toast}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Connections</h1>
        <p className="text-gray-500">Connect your CRM and communication tools</p>
      </div>

      <div className="space-y-4">
        {connectionDefs.map((def) => {
          const state = states[def.name]
          if (!state) return null

          return (
            <div key={def.name} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{def.icon}</span>
                  <div>
                    <h3 className="font-semibold">{def.name}</h3>
                    <p className="text-sm text-gray-500">{def.description}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${state.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {state.connected ? <><Check size={14} /> Connected</> : <><X size={14} /> Not Connected</>}
                </span>
              </div>

              <div className="space-y-3">
                {def.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      value={state.fieldValues[field.key] ?? ''}
                      onChange={(e) => updateField(def.name, field.key, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      disabled={state.busy}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 disabled:opacity-50"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                {state.connected ? (
                  <>
                    <button
                      onClick={() => reconnect(def)}
                      disabled={state.busy}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                      {state.busy ? <Loader2 size={14} className="animate-spin" /> : <Plug size={14} />}
                      Reconnect
                    </button>
                    <button
                      onClick={() => disconnect(def)}
                      disabled={state.busy}
                      className="border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 disabled:opacity-50"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => connect(def)}
                    disabled={state.busy}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {state.busy ? <Loader2 size={14} className="animate-spin" /> : <Plug size={14} />}
                    Connect
                  </button>
                )}
              </div>

              {def.smsCapable && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => selectSmsProvider(def.name)}
                    disabled={!state.connected}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full justify-center ${
                      smsProvider === def.name
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : state.connected
                          ? 'border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                          : 'border border-gray-200 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <MessageSquare size={14} />
                    {smsProvider === def.name ? '✅ Active SMS Provider' : 'Use for In-App SMS'}
                  </button>
                  {smsProvider === def.name && (
                    <p className="text-xs text-green-600 mt-1 text-center">SMS messages from PoopScoop Quote will be sent through {def.name}</p>
                  )}
                  {!state.connected && (
                    <p className="text-xs text-gray-400 mt-1 text-center">Connect {def.name} first to use as SMS provider</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
