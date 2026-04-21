'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { loadQuoteBranding } from '@/lib/quote-branding'
import { FileText, Send, Download, Calculator, Plus, Trash2, DollarSign, Settings, Upload, X, Edit3, Table, ChevronDown, ChevronUp, CalendarDays } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────
type PriceTier = 'basic' | 'premium'

type PricingEntry = {
  yardSize: string
  dogs: string
  frequency: string
  price: number
}

type PricingTable = {
  basic: PricingEntry[]
  premium: PricingEntry[]
}

type QuoteItem = {
  service: string
  basePrice: number
  adjustedPrice: number
  quantity: number
}

type Quote = {
  id: string
  customerName: string
  phone: string
  email: string
  items: QuoteItem[]
  yardSize: string
  dogCount: string
  frequency: string
  priceTier: PriceTier
  discount: number
  notes: string
  quoteMode: 'visit' | 'month'
  includeInitialClean: boolean
  initialCleanFee: number | null
  initialCleanDate: string
  recurringStartDate: string
  status: 'draft' | 'sent' | 'accepted' | 'declined'
  createdAt: string
}

// ─── Default pricing data (matches typical Excel layout) ─────────
const defaultYardSizes = ['1–1,000 sqft', '1,001–2,000 sqft', '2,001–3,000 sqft', '3,001–4,000 sqft', '4,001–5,000 sqft', '5,001–6,000 sqft', '6,001–7,000 sqft', '7,001–8,000 sqft', '8,001–9,000 sqft', '9,001–10,000 sqft', '10,001+ sqft']
const defaultDogCounts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const defaultFrequencies = ['Weekly', 'Bi-Weekly', 'Twice a Week', 'Once a Month', 'One-Time']

// Helper: generate prices for dogs 4-10 by scaling base (4-dog) prices +8% per extra dog
function scaleDogPrices(base4: Record<string, number>): Record<string, Record<string, number>> {
  const result: Record<string, Record<string, number>> = {}
  for (let d = 4; d <= 10; d++) {
    const multiplier = 1 + (d - 4) * 0.08
    const row: Record<string, number> = {}
    for (const [freq, price] of Object.entries(base4)) {
      row[freq] = Math.round(price * multiplier)
    }
    result[String(d)] = row
  }
  return result
}

const generateDefaultPricing = (): PricingTable => {
  const base4Prices: Record<string, Record<string, number>> = {
    '1–1,000 sqft': { 'Weekly': 55, 'Bi-Weekly': 44, 'Twice a Week': 88, 'Once a Month': 65, 'One-Time': 100 },
    '1,001–2,000 sqft': { 'Weekly': 62, 'Bi-Weekly': 50, 'Twice a Week': 100, 'Once a Month': 75, 'One-Time': 112 },
    '2,001–3,000 sqft': { 'Weekly': 70, 'Bi-Weekly': 56, 'Twice a Week': 112, 'Once a Month': 85, 'One-Time': 125 },
    '3,001–4,000 sqft': { 'Weekly': 80, 'Bi-Weekly': 64, 'Twice a Week': 128, 'Once a Month': 95, 'One-Time': 140 },
    '4,001–5,000 sqft': { 'Weekly': 88, 'Bi-Weekly': 70, 'Twice a Week': 140, 'Once a Month': 105, 'One-Time': 155 },
    '5,001–6,000 sqft': { 'Weekly': 98, 'Bi-Weekly': 78, 'Twice a Week': 155, 'Once a Month': 115, 'One-Time': 170 },
    '6,001–7,000 sqft': { 'Weekly': 108, 'Bi-Weekly': 86, 'Twice a Week': 172, 'Once a Month': 128, 'One-Time': 188 },
    '7,001–8,000 sqft': { 'Weekly': 118, 'Bi-Weekly': 94, 'Twice a Week': 188, 'Once a Month': 140, 'One-Time': 205 },
    '8,001–9,000 sqft': { 'Weekly': 128, 'Bi-Weekly': 102, 'Twice a Week': 205, 'Once a Month': 152, 'One-Time': 222 },
    '9,001–10,000 sqft': { 'Weekly': 134, 'Bi-Weekly': 107, 'Twice a Week': 215, 'Once a Month': 160, 'One-Time': 232 },
    '10,001+ sqft': { 'Weekly': 140, 'Bi-Weekly': 112, 'Twice a Week': 225, 'Once a Month': 168, 'One-Time': 245 },
  }

  const basicPrices: Record<string, Record<string, Record<string, number>>> = {
    '1–1,000 sqft': { '1': { 'Weekly': 35, 'Bi-Weekly': 28, 'Twice a Week': 60, 'Once a Month': 45, 'One-Time': 70 },
                           '2': { 'Weekly': 40, 'Bi-Weekly': 32, 'Twice a Week': 65, 'Once a Month': 50, 'One-Time': 75 },
                           '3': { 'Weekly': 45, 'Bi-Weekly': 36, 'Twice a Week': 72, 'Once a Month': 55, 'One-Time': 85 },
                           ...scaleDogPrices(base4Prices['1–1,000 sqft']) },
    '1,001–2,000 sqft': { '1': { 'Weekly': 40, 'Bi-Weekly': 32, 'Twice a Week': 68, 'Once a Month': 50, 'One-Time': 78 },
                           '2': { 'Weekly': 45, 'Bi-Weekly': 36, 'Twice a Week': 74, 'Once a Month': 55, 'One-Time': 85 },
                           '3': { 'Weekly': 50, 'Bi-Weekly': 40, 'Twice a Week': 82, 'Once a Month': 62, 'One-Time': 95 },
                           ...scaleDogPrices(base4Prices['1,001–2,000 sqft']) },
    '2,001–3,000 sqft': { '1': { 'Weekly': 45, 'Bi-Weekly': 36, 'Twice a Week': 75, 'Once a Month': 55, 'One-Time': 85 },
                           '2': { 'Weekly': 50, 'Bi-Weekly': 40, 'Twice a Week': 82, 'Once a Month': 62, 'One-Time': 95 },
                           '3': { 'Weekly': 58, 'Bi-Weekly': 46, 'Twice a Week': 92, 'Once a Month': 70, 'One-Time': 108 },
                           ...scaleDogPrices(base4Prices['2,001–3,000 sqft']) },
    '3,001–4,000 sqft': { '1': { 'Weekly': 50, 'Bi-Weekly': 40, 'Twice a Week': 85, 'Once a Month': 62, 'One-Time': 95 },
                           '2': { 'Weekly': 58, 'Bi-Weekly': 46, 'Twice a Week': 95, 'Once a Month': 70, 'One-Time': 108 },
                           '3': { 'Weekly': 65, 'Bi-Weekly': 52, 'Twice a Week': 105, 'Once a Month': 78, 'One-Time': 120 },
                           ...scaleDogPrices(base4Prices['3,001–4,000 sqft']) },
    '4,001–5,000 sqft': { '1': { 'Weekly': 55, 'Bi-Weekly': 44, 'Twice a Week': 92, 'Once a Month': 68, 'One-Time': 105 },
                           '2': { 'Weekly': 65, 'Bi-Weekly': 52, 'Twice a Week': 105, 'Once a Month': 78, 'One-Time': 118 },
                           '3': { 'Weekly': 72, 'Bi-Weekly': 58, 'Twice a Week': 115, 'Once a Month': 85, 'One-Time': 130 },
                           ...scaleDogPrices(base4Prices['4,001–5,000 sqft']) },
    '5,001–6,000 sqft': { '1': { 'Weekly': 62, 'Bi-Weekly': 50, 'Twice a Week': 100, 'Once a Month': 75, 'One-Time': 115 },
                           '2': { 'Weekly': 72, 'Bi-Weekly': 58, 'Twice a Week': 115, 'Once a Month': 85, 'One-Time': 128 },
                           '3': { 'Weekly': 80, 'Bi-Weekly': 64, 'Twice a Week': 128, 'Once a Month': 95, 'One-Time': 142 },
                           ...scaleDogPrices(base4Prices['5,001–6,000 sqft']) },
    '6,001–7,000 sqft': { '1': { 'Weekly': 68, 'Bi-Weekly': 55, 'Twice a Week': 110, 'Once a Month': 82, 'One-Time': 125 },
                           '2': { 'Weekly': 78, 'Bi-Weekly': 62, 'Twice a Week': 125, 'Once a Month': 92, 'One-Time': 138 },
                           '3': { 'Weekly': 88, 'Bi-Weekly': 70, 'Twice a Week': 140, 'Once a Month': 105, 'One-Time': 155 },
                           ...scaleDogPrices(base4Prices['6,001–7,000 sqft']) },
    '7,001–8,000 sqft': { '1': { 'Weekly': 75, 'Bi-Weekly': 60, 'Twice a Week': 120, 'Once a Month': 90, 'One-Time': 135 },
                           '2': { 'Weekly': 85, 'Bi-Weekly': 68, 'Twice a Week': 135, 'Once a Month': 100, 'One-Time': 150 },
                           '3': { 'Weekly': 95, 'Bi-Weekly': 76, 'Twice a Week': 152, 'Once a Month': 112, 'One-Time': 168 },
                           ...scaleDogPrices(base4Prices['7,001–8,000 sqft']) },
    '8,001–9,000 sqft': { '1': { 'Weekly': 82, 'Bi-Weekly': 65, 'Twice a Week': 130, 'Once a Month': 98, 'One-Time': 145 },
                           '2': { 'Weekly': 92, 'Bi-Weekly': 74, 'Twice a Week': 148, 'Once a Month': 110, 'One-Time': 162 },
                           '3': { 'Weekly': 105, 'Bi-Weekly': 84, 'Twice a Week': 168, 'Once a Month': 125, 'One-Time': 182 },
                           ...scaleDogPrices(base4Prices['8,001–9,000 sqft']) },
    '9,001–10,000 sqft': { '1': { 'Weekly': 86, 'Bi-Weekly': 69, 'Twice a Week': 138, 'Once a Month': 103, 'One-Time': 152 },
                            '2': { 'Weekly': 97, 'Bi-Weekly': 78, 'Twice a Week': 155, 'Once a Month': 115, 'One-Time': 170 },
                            '3': { 'Weekly': 110, 'Bi-Weekly': 88, 'Twice a Week': 175, 'Once a Month': 130, 'One-Time': 190 },
                            ...scaleDogPrices(base4Prices['9,001–10,000 sqft']) },
    '10,001+ sqft':     { '1': { 'Weekly': 90, 'Bi-Weekly': 72, 'Twice a Week': 145, 'Once a Month': 108, 'One-Time': 160 },
                           '2': { 'Weekly': 102, 'Bi-Weekly': 82, 'Twice a Week': 162, 'Once a Month': 120, 'One-Time': 178 },
                           '3': { 'Weekly': 115, 'Bi-Weekly': 92, 'Twice a Week': 182, 'Once a Month': 135, 'One-Time': 198 },
                           ...scaleDogPrices(base4Prices['10,001+ sqft']) },
  }

  const basic: PricingEntry[] = []
  const premium: PricingEntry[] = []

  for (const ys of defaultYardSizes) {
    for (const dc of defaultDogCounts) {
      for (const freq of defaultFrequencies) {
        const bp = basicPrices[ys]?.[dc]?.[freq] ?? 50
        basic.push({ yardSize: ys, dogs: dc, frequency: freq, price: bp })
        premium.push({ yardSize: ys, dogs: dc, frequency: freq, price: Math.round(bp * 1.35) })
      }
    }
  }
  return { basic, premium }
}

// ─── Legacy fallback options (used when pricing table not loaded) ─
type AddonService = {
  name: string
  basePrice: number
  description: string
}

const defaultAddons: AddonService[] = [
  { name: 'Deodorizing Treatment', basePrice: 40, description: 'Enzyme-based yard deodorizer' },
  { name: 'Brown Spot Treatment', basePrice: 30, description: 'Lawn repair for pet damage' },
]

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  sent: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  declined: 'bg-red-100 text-red-700',
}

// ═══════════════════════════════════════════════════════════════════
//  PRICING SETTINGS MODAL COMPONENT
// ═══════════════════════════════════════════════════════════════════
function PricingSettingsModal({
  isOpen,
  onClose,
  pricingTable,
  onSave,
  addonServices,
  onSaveAddons,
}: {
  isOpen: boolean
  onClose: () => void
  pricingTable: PricingTable
  onSave: (table: PricingTable) => void
  addonServices: AddonService[]
  onSaveAddons: (addons: AddonService[]) => void
}) {
  const [tab, setTab] = useState<'upload' | 'manual' | 'addons'>('upload')
  const [editTier, setEditTier] = useState<PriceTier>('basic')
  const [localPricing, setLocalPricing] = useState<PricingTable>(pricingTable)
  const [localAddons, setLocalAddons] = useState<AddonService[]>(addonServices)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)
  const [expandedYard, setExpandedYard] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const ext = file.name.toLowerCase().split('.').pop()
    if (!['xlsx', 'xls', 'csv'].includes(ext || '')) {
      setUploadStatus('❌ Unsupported file type. Please upload .xlsx, .xls, or .csv')
      return
    }

    try {
      setUploadStatus('⏳ Parsing file...')
      const XLSX = await import('xlsx')
      const arrayBuffer = await file.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      const sheetNames = workbook.SheetNames

      const parseSheet = (sheetName: string): PricingEntry[] => {
        const sheet = workbook.Sheets[sheetName]
        if (!sheet) return []
        const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' })
        const entries: PricingEntry[] = []

        for (const row of rows) {
          const keys = Object.keys(row)
          // Try to detect columns: look for yard size, dogs, frequency, price
          const yardCol = keys.find(k => /yard|size|property/i.test(k))
          const dogCol = keys.find(k => /dog|pet|count/i.test(k))
          const freqCol = keys.find(k => /freq|service|schedule|plan/i.test(k))
          const priceCol = keys.find(k => /price|cost|rate|amount|\$/i.test(k))

          if (yardCol && dogCol && freqCol && priceCol) {
            const price = Math.round(parseFloat(String(row[priceCol]).replace(/[$,]/g, '')) * 100) / 100
            if (!isNaN(price)) {
              entries.push({
                yardSize: String(row[yardCol]).trim(),
                dogs: String(row[dogCol]).trim(),
                frequency: String(row[freqCol]).trim(),
                price,
              })
            }
          }
        }
        return entries
      }

      // Try to find Basic/Premium sheets by name
      const basicSheet = sheetNames.find(n => /basic/i.test(n)) || sheetNames[0]
      const premiumSheet = sheetNames.find(n => /premium/i.test(n)) || sheetNames[1]

      const basicEntries = parseSheet(basicSheet)
      const premiumEntries = premiumSheet ? parseSheet(premiumSheet) : []

      if (basicEntries.length === 0 && premiumEntries.length === 0) {
        setUploadStatus('❌ Could not parse pricing data. Make sure your file has columns for Yard Size, Dogs, Frequency, and Price.')
        return
      }

      const newPricing: PricingTable = {
        basic: basicEntries.length > 0 ? basicEntries : localPricing.basic,
        premium: premiumEntries.length > 0 ? premiumEntries : localPricing.premium,
      }

      setLocalPricing(newPricing)
      setUploadStatus(`✅ Imported ${basicEntries.length} basic and ${premiumEntries.length} premium pricing entries from "${file.name}"`)
    } catch (err) {
      console.error(err)
      setUploadStatus('❌ Error reading file. Please check the format and try again.')
    }

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const updatePrice = (tier: PriceTier, yardSize: string, dogs: string, frequency: string, newPrice: number) => {
    setLocalPricing(prev => ({
      ...prev,
      [tier]: prev[tier].map(entry =>
        entry.yardSize === yardSize && entry.dogs === dogs && entry.frequency === frequency
          ? { ...entry, price: newPrice }
          : entry
      ),
    }))
  }

  const yardSizes = Array.from(new Set(localPricing[editTier].map(e => e.yardSize)))
  const dogCounts = Array.from(new Set(localPricing[editTier].map(e => e.dogs)))
  const frequencies = Array.from(new Set(localPricing[editTier].map(e => e.frequency)))

  const getPrice = (ys: string, dc: string, freq: string): number => {
    const raw = localPricing[editTier].find(e => e.yardSize === ys && e.dogs === dc && e.frequency === freq)?.price ?? 0
    return Math.round(raw * 100) / 100
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2"><Settings size={20} className="text-blue-500" /> Pricing Settings</h2>
            <p className="text-sm text-gray-500">Upload a spreadsheet or manually edit pricing tiers</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 px-5">
          <button onClick={() => setTab('upload')} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === 'upload' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            <Upload size={14} className="inline mr-1.5" /> Upload File
          </button>
          <button onClick={() => setTab('manual')} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === 'manual' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            <Edit3 size={14} className="inline mr-1.5" /> Manual Input
          </button>
          <button onClick={() => setTab('addons')} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === 'addons' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            <Plus size={14} className="inline mr-1.5" /> Add-On Services
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === 'upload' ? (
            <div className="space-y-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <Upload size={40} className="mx-auto text-gray-400 mb-3" />
                <p className="text-sm font-medium text-gray-700 mb-1">Upload Excel or CSV file</p>
                <p className="text-xs text-gray-400 mb-4">Supports .xlsx, .xls, and .csv formats</p>
                <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 cursor-pointer">
                  <Upload size={16} /> Choose File
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadStatus && (
                <div className={`rounded-lg p-3 text-sm ${uploadStatus.startsWith('✅') ? 'bg-green-50 text-green-700 border border-green-200' : uploadStatus.startsWith('❌') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                  {uploadStatus}
                </div>
              )}

              {/* Expected Format */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-700">Expected File Format</h3>
                  <a
                    href="/api/pricing-template"
                    download="pricing-template.xlsx"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    <Download size={14} /> Download Template (.xlsx)
                  </a>
                </div>
                <p className="text-xs text-gray-500 mb-3">Your file should have two tabs/sheets: <strong>Basic</strong> and <strong>Premium</strong>. Each should have columns:</p>
                <div className="overflow-x-auto">
                  <table className="text-xs border border-gray-200 rounded">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-3 py-1.5">Yard Size</th>
                        <th className="border border-gray-200 px-3 py-1.5">Dogs</th>
                        <th className="border border-gray-200 px-3 py-1.5">Frequency</th>
                        <th className="border border-gray-200 px-3 py-1.5">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-gray-200 px-3 py-1">1–1,000 sqft</td><td className="border border-gray-200 px-3 py-1">1</td><td className="border border-gray-200 px-3 py-1">Weekly</td><td className="border border-gray-200 px-3 py-1">$35</td></tr>
                      <tr><td className="border border-gray-200 px-3 py-1">1–1,000 sqft</td><td className="border border-gray-200 px-3 py-1">2</td><td className="border border-gray-200 px-3 py-1">Weekly</td><td className="border border-gray-200 px-3 py-1">$40</td></tr>
                      <tr><td className="border border-gray-200 px-3 py-1">1,001–2,000 sqft</td><td className="border border-gray-200 px-3 py-1">1</td><td className="border border-gray-200 px-3 py-1">Bi-Weekly</td><td className="border border-gray-200 px-3 py-1">$32</td></tr>
                      <tr><td className="border border-gray-200 px-3 py-1 text-gray-400" colSpan={4}>... etc</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-2">Yard Size options: 1–1,000 sqft through 10,001+ sqft • Dogs: 1–10 • Frequency: Weekly, Bi-Weekly, Twice a Week, Once a Month, One-Time</p>
                <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs font-medium text-blue-700">💡 Pricing Note</p>
                  <p className="text-xs text-blue-600 mt-0.5"><strong>Weekly, Twice a Week</strong> — monthly cost = price × 52 ÷ 12.</p>
                  <p className="text-xs text-blue-600 mt-0.5"><strong>Bi-Weekly</strong> — monthly cost = price × 26 ÷ 12.</p>
                  <p className="text-xs text-blue-600 mt-0.5"><strong>Once a Month, One-Time</strong> — enter the <strong>per-visit / per-month</strong> price as-is. No conversion is applied.</p>
                </div>
              </div>
            </div>
          ) : tab === 'manual' ? (
            <div className="space-y-4">
              {/* Tier Selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Editing:</span>
                <div className="flex bg-gray-100 rounded-lg overflow-hidden">
                  <button onClick={() => setEditTier('basic')} className={`px-4 py-2 text-sm font-medium transition-colors ${editTier === 'basic' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-800'}`}>
                    Basic Pricing
                  </button>
                  <button onClick={() => setEditTier('premium')} className={`px-4 py-2 text-sm font-medium transition-colors ${editTier === 'premium' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-gray-800'}`}>
                    Premium Pricing
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-medium text-blue-700">💡 Pricing Note</p>
                <p className="text-xs text-blue-600 mt-0.5"><strong>Weekly, Twice a Week</strong> — monthly cost = price × 52 ÷ 12.</p>
                <p className="text-xs text-blue-600 mt-0.5"><strong>Bi-Weekly</strong> — monthly cost = price × 26 ÷ 12.</p>
                <p className="text-xs text-blue-600 mt-0.5"><strong>Once a Month, One-Time</strong> — enter the <strong>per-visit / per-month</strong> price as-is. No conversion is applied.</p>
              </div>

              {/* Pricing Grid - Grouped by Yard Size */}
              <div className="space-y-3">
                {yardSizes.map(ys => (
                  <div key={ys} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedYard(expandedYard === ys ? null : ys)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-700">{ys}</span>
                      {expandedYard === ys ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {expandedYard === ys && (
                      <div className="p-3 overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 px-2 font-semibold text-gray-500 w-16">Dogs</th>
                              {frequencies.map(f => (
                                <th key={f} className="text-center py-2 px-2 font-semibold text-gray-500">{f}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {dogCounts.map(dc => (
                              <tr key={dc} className="border-b border-gray-50">
                                <td className="py-2 px-2 font-medium text-gray-700">{dc} {dc === '1' ? 'dog' : 'dogs'}</td>
                                {frequencies.map(freq => (
                                  <td key={freq} className="py-1 px-1 text-center">
                                    <div className="relative">
                                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                                      <input
                                        type="number"
                                        value={getPrice(ys, dc, freq)}
                                        onChange={(e) => updatePrice(editTier, ys, dc, freq, Number(e.target.value))}
                                        className="w-full border border-gray-200 rounded px-2 py-1.5 text-center text-xs focus:outline-none focus:border-blue-500 pl-5"
                                        min={0}
                                      />
                                    </div>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : tab === 'addons' ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Manage the add-on services available when building quotes.</p>

              {localAddons.map((addon, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 flex items-start gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Service Name</label>
                      <input
                        type="text"
                        value={addon.name}
                        onChange={(e) => {
                          const updated = [...localAddons]
                          updated[i] = { ...updated[i], name: e.target.value }
                          setLocalAddons(updated)
                        }}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          value={addon.basePrice}
                          onChange={(e) => {
                            const updated = [...localAddons]
                            updated[i] = { ...updated[i], basePrice: Number(e.target.value) }
                            setLocalAddons(updated)
                          }}
                          min={0}
                          step={0.01}
                          className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                      <input
                        type="text"
                        value={addon.description}
                        onChange={(e) => {
                          const updated = [...localAddons]
                          updated[i] = { ...updated[i], description: e.target.value }
                          setLocalAddons(updated)
                        }}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setLocalAddons(localAddons.filter((_, idx) => idx !== i))}
                    className="mt-6 text-red-400 hover:text-red-600 p-1"
                    title="Remove add-on"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <button
                onClick={() => setLocalAddons([...localAddons, { name: '', basePrice: 0, description: '' }])}
                className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-sm font-medium text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add New Service
              </button>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-5 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-400">
            {localPricing.basic.length} basic & {localPricing.premium.length} premium pricing entries • {localAddons.length} add-on services
          </p>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-100">Cancel</button>
            <button
              onClick={() => { onSave(localPricing); onSaveAddons(localAddons); onClose() }}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Save Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN QUOTES PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════
export default function QuotesPage() {
  const [view, setView] = useState<'list' | 'builder'>('list')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [yardSize, setYardSize] = useState('3,001–4,000 sqft')
  const [dogCount, setDogCount] = useState('1')
  const [frequency, setFrequency] = useState('Weekly')
  const [priceTier, setPriceTier] = useState<PriceTier>('basic')
  const [selectedServices, setSelectedServices] = useState<QuoteItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [notes, setNotes] = useState('')
  const [quoteMode, setQuoteMode] = useState<'visit' | 'month'>('visit')
  const [includeInitialClean, setIncludeInitialClean] = useState(false)
  const [initialCleanFee, setInitialCleanFee] = useState<number | null>(null)
  const [initialCleanDate, setInitialCleanDate] = useState('')
  const [recurringStartDate, setRecurringStartDate] = useState('')
  const [showPricingSettings, setShowPricingSettings] = useState(false)
  const [pricingTable, setPricingTable] = useState<PricingTable>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('psq_pricing_table')
        if (saved) return JSON.parse(saved)
      } catch { /* ignore */ }
    }
    return generateDefaultPricing()
  })
  const [addonServices, setAddonServices] = useState<AddonService[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('psq_addon_services')
        if (saved) return JSON.parse(saved)
      } catch { /* ignore */ }
    }
    return defaultAddons
  })
  const [previewMode, setPreviewMode] = useState<'text' | 'email' | 'pdf' | null>(null)
  const [smsProviderName, setSmsProviderName] = useState<string | null>(null)
  const [actionToast, setActionToast] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null)
  const [quotes, setQuotes] = useState<Quote[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('psq_saved_quotes')
        if (saved) return JSON.parse(saved)
      } catch { /* ignore */ }
    }
    return []
  })
  const [branding, setBranding] = useState(loadQuoteBranding())

  // Load data from Supabase on mount (with localStorage fallback already set above)
  useEffect(() => {
    try {
      const sp = localStorage.getItem('psq_sms_provider')
      setSmsProviderName(sp)
    } catch { /* ignore */ }

    // Fetch branding from Supabase
    fetch('/api/branding').then(r => r.json()).then(data => {
      if (data.branding) {
        setBranding(data.branding)
      }
    }).catch(() => {})

    // Fetch pricing from Supabase
    fetch('/api/pricing').then(r => r.json()).then(data => {
      if (data.pricingTable) {
        setPricingTable(data.pricingTable)
        try { localStorage.setItem('psq_pricing_table', JSON.stringify(data.pricingTable)) } catch {}
      }
      if (data.addonServices) {
        setAddonServices(data.addonServices)
        try { localStorage.setItem('psq_addon_services', JSON.stringify(data.addonServices)) } catch {}
      }
    }).catch(() => { /* localStorage fallback already loaded */ })

    // Fetch quotes from Supabase
    fetch('/api/quotes').then(r => r.json()).then(data => {
      if (data.quotes && data.quotes.length > 0) {
        setQuotes(data.quotes)
        try { localStorage.setItem('psq_saved_quotes', JSON.stringify(data.quotes)) } catch {}
      }
    }).catch(() => { /* localStorage fallback already loaded */ })
  }, [])

  // Save pricing to Supabase
  const savePricingToDb = (table: PricingTable, addons?: AddonService[]) => {
    const body: any = { pricingTable: table }
    if (addons) body.addonServices = addons
    fetch('/api/pricing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch(err => console.error('Failed to save pricing to DB:', err))
  }

  // Save a quote to Supabase
  const saveQuoteToDb = (quote: Quote) => {
    fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote),
    }).catch(err => console.error('Failed to save quote to DB:', err))
  }

  const showActionToast = (msg: string) => {
    setActionToast(msg)
    setTimeout(() => setActionToast(null), 3500)
  }

  const loadDraftQuote = (quote: Quote) => {
    setCustomerName(quote.customerName)
    setCustomerPhone(quote.phone)
    setCustomerEmail(quote.email)
    setYardSize(quote.yardSize)
    setDogCount(quote.dogCount)
    setFrequency(quote.frequency || 'Weekly')
    setPriceTier(quote.priceTier || 'basic')
    setSelectedServices([...quote.items])
    setDiscount(quote.discount)
    setNotes(quote.notes)
    setQuoteMode(quote.quoteMode || 'visit')
    setIncludeInitialClean(quote.includeInitialClean || false)
    setInitialCleanFee(quote.initialCleanFee ?? null)
    setInitialCleanDate(quote.initialCleanDate || '')
    setRecurringStartDate(quote.recurringStartDate || '')
    setEditingQuoteId(quote.id)
    setView('builder')
  }

  const clearForm = () => {
    setCustomerName('')
    setCustomerPhone('')
    setCustomerEmail('')
    setYardSize('3,001–4,000 sqft')
    setDogCount('1')
    setFrequency('Weekly')
    setPriceTier('basic')
    setSelectedServices([])
    setDiscount(0)
    setNotes('')
    setQuoteMode('visit')
    setIncludeInitialClean(false)
    setInitialCleanFee(null)
    setInitialCleanDate('')
    setRecurringStartDate('')
    setEditingQuoteId(null)
  }

  const saveQuotes = (updated: Quote[]) => {
    setQuotes(updated)
    try { localStorage.setItem('psq_saved_quotes', JSON.stringify(updated)) } catch {}
  }

  const saveAsDraft = () => {
    if (selectedServices.length === 0) { showActionToast('⚠️ Add at least one service first'); return }
    if (editingQuoteId) {
      // Update existing draft
      const updated = quotes.map(q => q.id === editingQuoteId ? {
        ...q,
        customerName: customerName || 'Unnamed',
        phone: customerPhone,
        email: customerEmail,
        items: [...selectedServices],
        yardSize,
        dogCount,
        frequency,
        priceTier,
        discount,
        notes,
        quoteMode,
        includeInitialClean,
        initialCleanFee,
        initialCleanDate,
        recurringStartDate,
        status: 'draft' as const,
      } : q)
      saveQuotes(updated)
      const savedQ = updated.find(q => q.id === editingQuoteId)
      if (savedQ) saveQuoteToDb(savedQ)
      showActionToast('✅ Draft updated')
    } else {
      const newQuote: Quote = {
        id: `Q-${String(quotes.length + 1).padStart(3, '0')}`,
        customerName: customerName || 'Unnamed',
        phone: customerPhone,
        email: customerEmail,
        items: [...selectedServices],
        yardSize,
        dogCount,
        frequency,
        priceTier,
        discount,
        notes,
        quoteMode,
        includeInitialClean,
        initialCleanFee,
        initialCleanDate,
        recurringStartDate,
        status: 'draft',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      }
      saveQuotes([newQuote, ...quotes])
      saveQuoteToDb(newQuote)
      showActionToast('✅ Quote saved as draft')
    }
    setEditingQuoteId(null)
    setView('list')
  }

  const markQuoteSent = (via: string) => {
    if (selectedServices.length === 0) return
    if (editingQuoteId) {
      // Update existing quote to 'sent'
      const updated = quotes.map(q => q.id === editingQuoteId ? {
        ...q,
        customerName: customerName || 'Unnamed',
        phone: customerPhone,
        email: customerEmail,
        items: [...selectedServices],
        yardSize,
        dogCount,
        frequency,
        priceTier,
        discount,
        notes,
        quoteMode,
        includeInitialClean,
        initialCleanFee,
        initialCleanDate,
        recurringStartDate,
        status: 'sent' as const,
      } : q)
      saveQuotes(updated)
      const savedQ = updated.find(q => q.id === editingQuoteId)
      if (savedQ) saveQuoteToDb(savedQ)
      setEditingQuoteId(null)
    } else {
      const newQuote: Quote = {
        id: `Q-${String(quotes.length + 1).padStart(3, '0')}`,
        customerName: customerName || 'Unnamed',
        phone: customerPhone,
        email: customerEmail,
        items: [...selectedServices],
        yardSize,
        dogCount,
        frequency,
        priceTier,
        discount,
        notes,
        quoteMode,
        includeInitialClean,
        initialCleanFee,
        initialCleanDate,
        recurringStartDate,
        status: 'sent',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      }
      saveQuotes([newQuote, ...quotes])
      saveQuoteToDb(newQuote)
    }
  }

  const sendViaEmail = async () => {
    if (!customerEmail || !customerEmail.includes('@')) {
      showActionToast('⚠️ Enter a valid customer email first')
      return
    }
    setSending(true)
    try {
      const htmlContent = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="padding:24px;color:white;border-radius:12px 12px 0 0;background:${branding.primaryColor ? `linear-gradient(135deg,${branding.primaryColor},${branding.secondaryColor})` : '#6b7280'}">
            ${branding.logoUrl ? `<img src="${branding.logoUrl}" alt="Logo" style="height:60px;margin-bottom:12px" />` : ''}
            <p style="font-size:18px;font-weight:bold;margin:0">PoopScoop Quote</p>
            <p style="opacity:0.8;margin:4px 0 0;font-size:14px">Quote for ${customerName || 'you'}</p>
          </div>
          <div style="padding:24px;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
            ${notes ? `<p style="color:#374151;margin:0 0 16px">${notes}</p>` : ''}
            ${selectedServices.map(s => `<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px"><span style="color:#374151">${s.service}</span><span style="font-weight:600">$${s.adjustedPrice.toFixed(2)}</span></div>`).join('')}
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
            <div style="display:flex;justify-content:space-between;font-weight:bold;font-size:16px"><span>Total</span><span style="color:#16a34a">$${total.toFixed(2)}${totalLabel}</span></div>
            ${(prorationInfo.isProrated || prorationInfo.recurringInFutureMonth) && fullMonthlyPrice !== null ? `<p style="font-size:13px;color:#2563eb;font-weight:500;margin:6px 0 0">Following months: $${fullMonthlyPrice.toFixed(2)}/month</p>` : ''}
            <p style="font-size:13px;color:#6b7280;margin:8px 0 0">${dogCount} ${dogCount === '1' ? 'dog' : 'dogs'} • ${frequency}</p>
          </div>
        </div>`
      const res = await fetch('/api/send-quote-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: customerEmail,
          customerName,
          subject: `Your Quote from PoopScoop — $${total.toFixed(2)}${totalLabel}`,
          html: htmlContent,
        }),
      })
      const data = await res.json()
      if (data.success) {
        markQuoteSent('email')
        setPreviewMode(null)
        showActionToast('✅ Quote emailed to ' + customerEmail)
      } else {
        showActionToast('❌ ' + (data.error || 'Failed to send email'))
      }
    } catch (err: any) {
      showActionToast('❌ Error: ' + (err?.message || 'Network error'))
    } finally {
      setSending(false)
    }
  }

  const sendViaSms = () => {
    if (!customerPhone) {
      showActionToast('⚠️ Enter the customer phone number first')
      return
    }
    // Build SMS text content
    const lines = [
      `${customerName || 'Hi'}, here is your quote:`,
      ...selectedServices.map(s => `• ${s.service}: $${s.adjustedPrice.toFixed(2)}`),
      `${dogCount} ${dogCount === '1' ? 'dog' : 'dogs'} • ${frequency}`,
      `Total: $${total.toFixed(2)}${totalLabel}`,
    ]
    if ((prorationInfo.isProrated || prorationInfo.recurringInFutureMonth) && fullMonthlyPrice !== null) {
      lines.push(`Following months: $${fullMonthlyPrice.toFixed(2)}/month`)
    }
    if (notes) lines.splice(1, 0, notes)
    // For now, copy to clipboard and show toast (real SMS integration requires the provider API)
    const smsText = lines.join('\n')
    navigator.clipboard.writeText(smsText).then(() => {
      markQuoteSent('sms')
      setPreviewMode(null)
      showActionToast(`✅ Quote text copied to clipboard — paste in ${smsProviderName || 'your SMS app'} to send to ${customerPhone}`)
    }).catch(() => {
      showActionToast('⚠️ Could not copy to clipboard')
    })
  }

  const downloadPdf = async () => {
    setSending(true)
    try {
      // Use browser print-to-PDF via a hidden iframe
      const htmlContent = `
        <!DOCTYPE html>
        <html><head><style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; color: #111827; }
          .header { padding: 24px; color: white; border-radius: 12px 12px 0 0; background: ${branding.primaryColor ? `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor})` : '#6b7280'}; }
          .header img { height: 60px; margin-bottom: 12px; }
          .header h1 { font-size: 18px; margin: 0; }
          .header p { opacity: 0.8; font-size: 14px; margin: 4px 0 0; }
          .body { padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; }
          .line { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
          .total { display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; border-top: 1px solid #e5e7eb; padding-top: 12px; margin-top: 12px; }
          .meta { font-size: 13px; color: #6b7280; margin-top: 8px; }
        </style></head><body>
          <div class="header">
            ${branding.logoUrl ? `<img src="${branding.logoUrl}" alt="Logo" />` : ''}
            <h1>PoopScoop Quote</h1>
            <p>Quote for ${customerName || 'Customer'}</p>
          </div>
          <div class="body">
            ${notes ? `<p>${notes}</p>` : ''}
            ${selectedServices.map(s => `<div class="line"><span>${s.service}</span><span><strong>$${s.adjustedPrice.toFixed(2)}</strong></span></div>`).join('')}
            <div class="total"><span>Total</span><span style="color:#16a34a">$${total.toFixed(2)}${totalLabel}</span></div>
            ${(prorationInfo.isProrated || prorationInfo.recurringInFutureMonth) && fullMonthlyPrice !== null ? `<p class="meta" style="color:#2563eb;font-weight:500">Following months: $${fullMonthlyPrice.toFixed(2)}/month</p>` : ''}
            <p class="meta">${dogCount} ${dogCount === '1' ? 'dog' : 'dogs'} • ${frequency}</p>
          </div>
          <script>window.onload=()=>{ window.print(); }<\/script>
        </body></html>`
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const w = window.open(url, '_blank')
      if (w) {
        showActionToast('📄 PDF print dialog opened — save as PDF')
      } else {
        // Fallback: download as HTML
        const a = document.createElement('a')
        a.href = url
        a.download = `quote-${customerName || 'customer'}-${new Date().toISOString().slice(0,10)}.html`
        a.click()
        showActionToast('📄 Quote downloaded — open and print to PDF')
      }
      URL.revokeObjectURL(url)
    } finally {
      setSending(false)
    }
  }

  // Look up price from the loaded pricing table
  const lookupPrice = useCallback((ys: string, dc: string, freq: string, tier: PriceTier): number | null => {
    const entry = pricingTable[tier].find(
      e => e.yardSize === ys && e.dogs === dc && e.frequency === freq
    )
    return entry?.price ?? null
  }, [pricingTable])

  const currentPrice = lookupPrice(yardSize, dogCount, frequency, priceTier)

  // Initial clean price: look up "One-Time" frequency for same yard/dogs/tier
  const initialCleanPrice = lookupPrice(yardSize, dogCount, 'One-Time', priceTier)

  // Calculate monthly price from per-visit price
  // Weekly / Twice a Week: price × 52 / 12
  // Bi-Weekly: price × 26 / 12
  // Once a Month / One-Time: price as-is
  const calcMonthly = (price: number, freq: string): number => {
    if (freq === 'Once a Month' || freq === 'One-Time') return price
    if (freq === 'Bi-Weekly') return Math.round((price * 26 / 12) * 100) / 100
    return Math.round((price * 52 / 12) * 100) / 100
  }
  const fullMonthlyPrice = currentPrice !== null ? calcMonthly(currentPrice, frequency) : null

  // Pro-rate logic: prorated first month = (visits remaining in recurring start month) × per-visit cost.
  // If the recurring start month is AFTER the initial-clean month, there's nothing to prorate and
  // no current-month charge — but the "Following Months" monthly fee should still be shown.
  const calculateProratedMonth = (): {
    prorated: number | null
    fullMonthly: number | null
    remainingWeeks: number
    totalWeeks: number
    isProrated: boolean
    recurringInFutureMonth: boolean
    visitsInFirstMonth: number
  } => {
    const base = { prorated: null, fullMonthly: fullMonthlyPrice, remainingWeeks: 0, totalWeeks: 0, isProrated: false, recurringInFutureMonth: false, visitsInFirstMonth: 0 }
    if (fullMonthlyPrice === null || currentPrice === null || !recurringStartDate || frequency === 'Once a Month' || frequency === 'One-Time') return base

    const startDate = new Date(recurringStartDate + 'T00:00:00')
    const year = startDate.getFullYear()
    const month = startDate.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const endOfMonth = new Date(year, month, daysInMonth)

    // Step size per visit (in days) based on frequency
    const stepDays = frequency === 'Bi-Weekly' ? 14 : 7
    // Visits per scheduled week for multi-visit frequencies
    const visitsPerWeek = frequency === 'Three Times a Week' ? 3 : frequency === 'Twice a Week' ? 2 : 1

    // Count service weeks (step occurrences) from recurringStartDate through end of its month
    let serviceWeeksInMonth = 0
    for (let d = new Date(startDate); d <= endOfMonth; d.setDate(d.getDate() + stepDays)) {
      serviceWeeksInMonth++
    }
    const visitsInFirstMonth = serviceWeeksInMonth * visitsPerWeek

    // Determine the reference month: if an initial clean is included, use its month; otherwise the recurring start month itself.
    let refYear = year
    let refMonth = month
    if (includeInitialClean && initialCleanDate) {
      const icd = new Date(initialCleanDate + 'T00:00:00')
      refYear = icd.getFullYear()
      refMonth = icd.getMonth()
    }

    const recurringMonthIndex = year * 12 + month
    const refMonthIndex = refYear * 12 + refMonth

    // Recurring starts in a FUTURE month relative to reference (e.g. initial clean April, recurring May 1)
    if (recurringMonthIndex > refMonthIndex) {
      return { prorated: null, fullMonthly: fullMonthlyPrice, remainingWeeks: 0, totalWeeks: 0, isProrated: false, recurringInFutureMonth: true, visitsInFirstMonth: 0 }
    }

    // How many full service weeks fit in a typical month at this frequency?
    const fullServiceWeeksPerMonth = frequency === 'Bi-Weekly' ? 2 : 4

    // If the month has its full expected number of service weeks, no proration needed.
    if (serviceWeeksInMonth >= fullServiceWeeksPerMonth) {
      return { prorated: null, fullMonthly: fullMonthlyPrice, remainingWeeks: serviceWeeksInMonth, totalWeeks: fullServiceWeeksPerMonth, isProrated: false, recurringInFutureMonth: false, visitsInFirstMonth }
    }

    const prorated = Math.round(currentPrice * visitsInFirstMonth * 100) / 100
    return { prorated, fullMonthly: fullMonthlyPrice, remainingWeeks: serviceWeeksInMonth, totalWeeks: fullServiceWeeksPerMonth, isProrated: true, recurringInFutureMonth: false, visitsInFirstMonth }
  }

  const prorationInfo = quoteMode === 'month' ? calculateProratedMonth() : { prorated: null, fullMonthly: fullMonthlyPrice, remainingWeeks: 0, totalWeeks: 0, isProrated: false, recurringInFutureMonth: false, visitsInFirstMonth: 0 }

  const monthlyPrice = prorationInfo.recurringInFutureMonth ? 0 : (prorationInfo.isProrated ? prorationInfo.prorated : fullMonthlyPrice)
  const displayPrice = quoteMode === 'month' ? monthlyPrice : currentPrice
  const priceLabel = quoteMode === 'month' ? '/month' : '/visit'
  const recurringVisitPrice = currentPrice ?? 0
  const hasRecurringChargeNow = quoteMode === 'month' && !prorationInfo.recurringInFutureMonth
  const totalLabel = quoteMode === 'month' ? (hasRecurringChargeNow ? '/month' : '') : ''

  const addMainService = () => {
    if (displayPrice === null) return
    const modeLabel = quoteMode === 'month' ? 'Monthly' : frequency
    const serviceName = `${modeLabel} Cleanup`
    const newServices: QuoteItem[] = []

    // Add initial clean if selected
    if (includeInitialClean && initialCleanFee !== null) {
      newServices.push({
        service: 'Initial Cleanup',
        basePrice: initialCleanFee,
        adjustedPrice: initialCleanFee,
        quantity: 1,
      })
    }

    // Add the recurring service (skip if recurring starts in a future month — nothing to charge now)
    if (!(quoteMode === 'month' && prorationInfo.recurringInFutureMonth)) {
      newServices.push({
        service: prorationInfo.isProrated ? `${serviceName} (pro-rated first month)` : serviceName,
        basePrice: displayPrice,
        adjustedPrice: displayPrice,
        quantity: 1,
      })
    }

    setSelectedServices([...selectedServices, ...newServices])
  }

  const addAddon = (addon: AddonService) => {
    setSelectedServices([...selectedServices, {
      service: addon.name,
      basePrice: addon.basePrice,
      adjustedPrice: addon.basePrice,
      quantity: 1,
    }])
  }

  const removeService = (index: number) => {
    setSelectedServices(selectedServices.filter((_, i) => i !== index))
  }

  const subtotal = selectedServices.reduce((sum, s) => sum + (s.adjustedPrice * s.quantity), 0)
  const discountAmount = subtotal * (discount / 100)
  const total = subtotal - discountAmount

  const yardSizes = Array.from(new Set(pricingTable[priceTier].map(e => e.yardSize)))
  const dogCounts = Array.from(new Set(pricingTable[priceTier].map(e => e.dogs)))
  const frequencies = Array.from(new Set(pricingTable[priceTier].map(e => e.frequency)))

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="text-blue-500" /> Quote Builder
          </h1>
          <p className="text-gray-500">Create, send, and track quotes for new and existing customers</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPricingSettings(true)}
            className="border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
          >
            <Settings size={16} /> Pricing Settings
          </button>
          <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setView('list')} className={`px-4 py-2 text-sm font-medium ${view === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}>Quotes</button>
            <button onClick={() => { clearForm(); setView('builder') }} className={`px-4 py-2 text-sm font-medium ${view === 'builder' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}>New Quote</button>
          </div>
        </div>
      </div>

      {/* Pricing Settings Modal */}
      <PricingSettingsModal
        isOpen={showPricingSettings}
        onClose={() => setShowPricingSettings(false)}
        pricingTable={pricingTable}
        onSave={(table: PricingTable) => { setPricingTable(table); try { localStorage.setItem('psq_pricing_table', JSON.stringify(table)) } catch {}; savePricingToDb(table) }}
        addonServices={addonServices}
        onSaveAddons={(addons: AddonService[]) => { setAddonServices(addons); try { localStorage.setItem('psq_addon_services', JSON.stringify(addons)) } catch {}; savePricingToDb(pricingTable, addons) }}
      />

      {view === 'list' ? (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{quotes.length}</p>
              <p className="text-xs text-gray-500">Total Quotes</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{quotes.filter(q => q.status === 'sent').length}</p>
              <p className="text-xs text-gray-500">Awaiting Response</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{quotes.filter(q => q.status === 'accepted').length}</p>
              <p className="text-xs text-gray-500">Accepted</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {Math.round((quotes.filter(q => q.status === 'accepted').length / Math.max(quotes.filter(q => q.status !== 'draft').length, 1)) * 100)}%
              </p>
              <p className="text-xs text-gray-500">Close Rate</p>
            </div>
          </div>

          {/* Quote List */}
          <div className="space-y-3">
            {quotes.map((quote) => (
              <div key={quote.id} onClick={() => quote.status === 'draft' ? loadDraftQuote(quote) : undefined} className={`bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-sm transition-shadow ${quote.status === 'draft' ? 'cursor-pointer hover:border-blue-300' : ''}`}>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-xs text-gray-400 font-mono">{quote.id}</span>
                    <h3 className="font-semibold">{quote.customerName}</h3>
                    <p className="text-sm text-gray-500">{quote.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ${quote.items.reduce((sum, i) => sum + i.adjustedPrice * i.quantity, 0).toFixed(2)}
                      <span className="text-xs text-gray-400 font-normal">/visit</span>
                    </p>
                    <p className="text-xs text-gray-500">{quote.items.map(i => i.service).join(', ')}</p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColors[quote.status]}`}>
                    {quote.status}
                  </span>
                  <p className="text-xs text-gray-400">{quote.createdAt}</p>
                  {quote.status === 'draft' && (
                    <button onClick={(e) => { e.stopPropagation(); loadDraftQuote(quote) }} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-medium hover:bg-blue-100">
                      Edit & Send
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Builder Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="John Doe" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="(520) 555-0000" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="john@email.com" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>

            {/* Service Selection — Driven by Pricing Table */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <DollarSign size={18} className="text-green-600" /> Service & Pricing
              </h2>

              {/* Tier Toggle */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-gray-700">Pricing Tier:</span>
                <div className="flex bg-gray-100 rounded-lg overflow-hidden">
                  <button onClick={() => setPriceTier('basic')} className={`px-4 py-2 text-sm font-medium transition-colors ${priceTier === 'basic' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-800'}`}>
                    Basic
                  </button>
                  <button onClick={() => setPriceTier('premium')} className={`px-4 py-2 text-sm font-medium transition-colors ${priceTier === 'premium' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-gray-800'}`}>
                    Premium
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yard Size</label>
                  <select value={yardSize} onChange={(e) => setYardSize(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                    {yardSizes.map(ys => <option key={ys} value={ys}>{ys}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Dogs</label>
                  <select value={dogCount} onChange={(e) => setDogCount(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                    {dogCounts.map(dc => <option key={dc} value={dc}>{dc} {dc === '1' ? 'dog' : 'dogs'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                    {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>

              {/* Live Price Preview */}
              <div className={`rounded-xl p-4 mb-4 flex items-center justify-between ${priceTier === 'premium' ? 'bg-purple-50 border border-purple-200' : 'bg-green-50 border border-green-200'}`}>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {frequency} • {yardSize} • {dogCount} {dogCount === '1' ? 'Dog' : 'Dogs'}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 capitalize">{priceTier} Tier Pricing</p>
                </div>
                <div className="text-right">
                  {displayPrice !== null ? (
                    <p className={`text-2xl font-bold ${priceTier === 'premium' ? 'text-purple-600' : 'text-green-600'}`}>${displayPrice.toFixed(2)}<span className="text-sm text-gray-400 font-normal">{priceLabel}</span></p>
                  ) : (
                    <p className="text-sm text-red-500">No price set</p>
                  )}
                </div>
              </div>

              {/* Per Visit / Per Month Toggle */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-gray-700">Quote as:</span>
                <div className="flex bg-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuoteMode('visit')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${quoteMode === 'visit' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    Per Visit
                  </button>
                  <button
                    onClick={() => setQuoteMode('month')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${quoteMode === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    Per Month
                  </button>
                </div>
                {quoteMode === 'month' && currentPrice !== null && (
                  <span className="text-xs text-gray-400">({frequency === 'Bi-Weekly' ? `$${currentPrice}/visit × 26 ÷ 12` : `$${currentPrice}/visit × 52 wks ÷ 12 mo`})</span>
                )}
              </div>

              {/* Initial Clean Option */}
              <div className="border border-gray-200 rounded-xl p-4 mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInitialClean}
                    onChange={(e) => {
                      setIncludeInitialClean(e.target.checked)
                      if (e.target.checked && initialCleanFee === null && initialCleanPrice !== null) {
                        setInitialCleanFee(initialCleanPrice)
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-700">Include Initial Cleanup</span>
                    <p className="text-xs text-gray-400">One-time first visit cleanup before recurring service begins</p>
                  </div>
                </label>

                {includeInitialClean && (
                  <div className="mt-3 pl-7 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <DollarSign size={14} className="inline mr-1 text-gray-400" /> Initial Cleanup Fee
                      </label>
                      <div className="relative w-full max-w-xs">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          value={initialCleanFee ?? ''}
                          onChange={(e) => setInitialCleanFee(e.target.value === '' ? null : Number(e.target.value))}
                          min={0}
                          step={0.01}
                          className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                          placeholder={initialCleanPrice !== null ? initialCleanPrice.toString() : '0'}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <CalendarDays size={14} className="inline mr-1 text-gray-400" /> Initial Cleanup Date
                      </label>
                      <input
                        type="date"
                        value={initialCleanDate}
                        onChange={(e) => setInitialCleanDate(e.target.value)}
                        className="w-full max-w-xs border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Recurring Service Start Date */}
              <div className="border border-gray-200 rounded-xl p-4 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <CalendarDays size={14} className="inline mr-1 text-gray-400" /> Recurring Service Start Date
                </label>
                <input
                  type="date"
                  value={recurringStartDate}
                  onChange={(e) => setRecurringStartDate(e.target.value)}
                  className="w-full max-w-xs border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
                {prorationInfo.isProrated && quoteMode === 'month' && prorationInfo.prorated !== null && fullMonthlyPrice !== null && (
                  <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs font-medium text-amber-700">
                      ⚡ Pro-rated first month: <span className="font-bold">${prorationInfo.prorated.toFixed(2)}</span>
                    </p>
                    <p className="text-xs text-amber-600 mt-0.5">
                      {prorationInfo.visitsInFirstMonth} visit{prorationInfo.visitsInFirstMonth === 1 ? '' : 's'} this month × ${currentPrice?.toFixed(2)}/visit. Full monthly rate of ${fullMonthlyPrice.toFixed(2)} starts the following month.
                    </p>
                  </div>
                )}
                {prorationInfo.recurringInFutureMonth && quoteMode === 'month' && fullMonthlyPrice !== null && (
                  <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs font-medium text-blue-700">
                      ℹ️ Recurring service starts next month — nothing to prorate.
                    </p>
                    <p className="text-xs text-blue-600 mt-0.5">
                      First monthly charge of ${fullMonthlyPrice.toFixed(2)} begins {new Date(recurringStartDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={addMainService}
                disabled={displayPrice === null}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
              >
                <Plus size={16} /> Add to Quote
              </button>

              {/* Add-on Services */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Add-On Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {addonServices.map((addon) => (
                    <button
                      key={addon.name}
                      onClick={() => addAddon(addon)}
                      className="text-left border border-gray-200 rounded-lg p-3 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{addon.name}</span>
                        <span className="text-sm text-green-600 font-bold">${addon.basePrice}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{addon.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Services */}
              {selectedServices.length > 0 && (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Services</h3>
                  <div className="space-y-2">
                    {selectedServices.map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2">
                        <span className="text-sm font-medium">{item.service}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-green-700">${item.adjustedPrice.toFixed(2)}</span>
                          <button onClick={() => removeService(i)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold mb-2">Introductory Comments</h2>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Add an intro message for the email, PDF quote, or SMS text before the quote is shown..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              <p className="text-xs text-gray-400 mt-2">These comments appear before the quote in email, PDF, or SMS preview.</p>
            </div>
          </div>

          {/* Quote Summary */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2"><Calculator size={18} /> Quote Summary</h2>

              {selectedServices.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">Add services to build your quote</p>
              ) : (
                <>
                  <div className="space-y-2 mb-4">
                    {selectedServices.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.service}</span>
                        <span className="font-medium">${item.adjustedPrice.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-3 mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Discount</span>
                      <div className="flex items-center gap-1">
                        <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} min={0} max={100} className="w-14 border border-gray-200 rounded px-2 py-0.5 text-sm text-right" />
                        <span className="text-gray-400">%</span>
                        {discountAmount > 0 && <span className="text-red-500 text-xs">-${discountAmount.toFixed(2)}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mb-4">
                    <div className="flex justify-between">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-lg text-green-600">${total.toFixed(2)}<span className="text-sm text-gray-400 font-normal">{totalLabel}</span></span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {dogCount} {dogCount === '1' ? 'dog' : 'dogs'} • {frequency}
                    </p>
                    {initialCleanDate && includeInitialClean && (
                      <p className="text-xs text-gray-400 mt-0.5">Initial clean: {new Date(initialCleanDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    )}
                    {recurringStartDate && (
                      <p className="text-xs text-gray-400 mt-0.5">Recurring starts: {new Date(recurringStartDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}{quoteMode === 'visit' ? ` • $${recurringVisitPrice.toFixed(2)}/visit` : ''}</p>
                    )}
                    {(prorationInfo.isProrated || prorationInfo.recurringInFutureMonth) && fullMonthlyPrice !== null && (
                      <p className="text-xs text-blue-600 font-medium mt-1.5">
                        Following months: ${fullMonthlyPrice.toFixed(2)}/month
                      </p>
                    )}
                  </div>

                  <div className="rounded-xl overflow-hidden border border-gray-200 mb-4 bg-white">
                    <div className="p-3 text-white" style={{ background: branding.primaryColor ? `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor})` : '#6b7280' }}>
                      {branding.logoUrl ? <Image src={branding.logoUrl} alt="Quote branding logo" width={72} height={72} className="object-contain h-14 w-auto" unoptimized /> : <p className="text-sm opacity-60">No logo set</p>}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-900">Email / PDF Branding Preview</p>
                      <p className="text-xs text-gray-500 mt-1">This quote header uses your My Business → Logo & Branding settings.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button onClick={() => setPreviewMode('text')} className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2">
                      <Send size={16} /> Send via Text{smsProviderName ? ` (${smsProviderName})` : ''}
                    </button>
                    <button onClick={() => setPreviewMode('email')} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                      <Send size={16} /> Send via Email
                    </button>
                    <button onClick={() => setPreviewMode('pdf')} className="w-full border border-gray-200 py-2.5 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                      <Download size={16} /> Download PDF
                    </button>
                    <button onClick={saveAsDraft} className="w-full border border-gray-200 py-2.5 rounded-lg font-medium hover:bg-gray-50 text-sm">
                      Save as Draft
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {previewMode && selectedServices.length > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">{previewMode === 'text' ? 'SMS Quote Preview' : previewMode === 'email' ? 'Email Quote Preview' : 'PDF Quote Preview'}</h2>
                <p className="text-sm text-gray-500">Preview how the branded quote will appear when sent.</p>
              </div>
              <button onClick={() => setPreviewMode(null)} className="text-sm text-gray-500 hover:text-gray-700">Close</button>
            </div>
            <div className="p-5 space-y-4">
              {previewMode === 'text' ? (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-4">
                  <p className="text-xs text-green-700 font-medium mb-2">SMS TEXT</p>
                  {notes && <p className="text-sm text-gray-700 mb-3">{notes}</p>}
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>{customerName || 'Customer'}</strong>, here is your quote:</p>
                    {selectedServices.map((item, i) => <p key={i}>• {item.service}: ${item.adjustedPrice.toFixed(2)}</p>)}
                    <p className="pt-2 text-gray-500">{dogCount} {dogCount === '1' ? 'dog' : 'dogs'} • {frequency}</p>
                    {initialCleanDate && includeInitialClean && (
                      <p className="text-gray-500">Initial clean: {new Date(initialCleanDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    )}
                    {recurringStartDate && (
                      <p className="text-gray-500">Recurring starts: {new Date(recurringStartDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}{quoteMode === 'visit' ? ` • $${recurringVisitPrice.toFixed(2)}/visit` : ''}</p>
                    )}
                    {(prorationInfo.isProrated || prorationInfo.recurringInFutureMonth) && fullMonthlyPrice !== null && (
                      <p className="font-medium text-blue-600">Following months: ${fullMonthlyPrice.toFixed(2)}/month</p>
                    )}
                    <p className="pt-2 font-semibold">Total: ${total.toFixed(2)}{totalLabel}</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden border border-gray-200">
                  <div className="p-5 text-white" style={{ background: branding.primaryColor ? `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor})` : '#6b7280' }}>
                    {branding.logoUrl && <Image src={branding.logoUrl} alt="Quote branding logo" width={96} height={96} className="object-contain h-20 w-auto mb-3" unoptimized />}
                    <p className="text-lg font-bold">PoopScoop Quote</p>
                    <p className="text-white/80 text-sm">Customer Quote</p>
                  </div>
                  <div className="p-5 bg-white">
                    {notes && <p className="text-sm text-gray-700 mb-4">{notes}</p>}
                    <div className="space-y-2 mb-4">
                      {selectedServices.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-700">{item.service}</span>
                          <span className="font-medium">${item.adjustedPrice.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-3 space-y-1">
                      <div className="flex justify-between">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-green-600">${total.toFixed(2)}{totalLabel}</span>
                      </div>
                      <p className="text-sm text-gray-500">{dogCount} {dogCount === '1' ? 'dog' : 'dogs'} • {frequency}</p>
                      {initialCleanDate && includeInitialClean && (
                        <p className="text-sm text-gray-500">Initial clean: {new Date(initialCleanDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      )}
                      {recurringStartDate && (
                        <p className="text-sm text-gray-500">Recurring starts: {new Date(recurringStartDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}{quoteMode === 'visit' ? ` • $${recurringVisitPrice.toFixed(2)}/visit` : ''}</p>
                      )}
                      {(prorationInfo.isProrated || prorationInfo.recurringInFutureMonth) && fullMonthlyPrice !== null && (
                        <p className="text-sm font-medium text-blue-600">Following months: ${fullMonthlyPrice.toFixed(2)}/month</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-3">{previewMode === 'email' ? 'Email preview' : 'PDF preview'} for {customerName || 'Customer'} • {customerEmail || 'no email entered'}</p>
                  </div>
                </div>
              )}
            </div>
            {/* Action Buttons */}
            <div className="p-5 border-t border-gray-200 flex gap-3">
              {previewMode === 'text' && (
                <button onClick={sendViaSms} disabled={sending} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  <Send size={16} /> {sending ? 'Sending...' : `Send via ${smsProviderName || 'SMS'}`}
                </button>
              )}
              {previewMode === 'email' && (
                <button onClick={sendViaEmail} disabled={sending} className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  <Send size={16} /> {sending ? 'Sending...' : 'Send Email Now'}
                </button>
              )}
              {previewMode === 'pdf' && (
                <button onClick={downloadPdf} disabled={sending} className="flex-1 bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2">
                  <Download size={16} /> {sending ? 'Preparing...' : 'Download / Print PDF'}
                </button>
              )}
              <button onClick={() => setPreviewMode(null)} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {actionToast && (
        <div className="fixed top-4 right-4 z-[60] bg-white border border-gray-200 shadow-lg rounded-xl px-5 py-3 text-sm font-medium max-w-md">
          {actionToast}
        </div>
      )}

    </div>
  )
}