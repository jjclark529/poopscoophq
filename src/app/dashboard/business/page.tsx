'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { Upload, Palette, Save, Trash2, Pencil, Plus } from 'lucide-react'
import {
  defaultQuoteBranding,
  loadQuoteBranding,
  saveQuoteBranding,
  loadLogoVariants,
  saveLogoVariants,
  type LogoVariant,
} from '@/lib/quote-branding'

export default function BusinessPage() {
  const [colors, setColors] = useState({ primary: '', secondary: '', secondaryDark: '' })
  const [logoUrl, setLogoUrl] = useState('')
  const [logoVariants, setLogoVariants] = useState<LogoVariant[]>([])
  const [saved, setSaved] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage first, then override with Supabase
  useEffect(() => {
    const branding = loadQuoteBranding()
    if (branding.primaryColor) {
      setColors({ primary: branding.primaryColor, secondary: branding.secondaryColor, secondaryDark: branding.secondaryDark })
    }
    if (branding.logoUrl) setLogoUrl(branding.logoUrl)
    const variants = loadLogoVariants()
    if (variants.length > 0) setLogoVariants(variants)

    // Fetch from Supabase (overrides localStorage if available)
    fetch('/api/branding').then(r => r.json()).then(data => {
      if (data.branding) {
        const b = data.branding
        if (b.primaryColor) setColors({ primary: b.primaryColor, secondary: b.secondaryColor, secondaryDark: b.secondaryDark })
        if (b.logoUrl) setLogoUrl(b.logoUrl)
      }
      if (data.logoVariants && Array.isArray(data.logoVariants) && data.logoVariants.length > 0) {
        setLogoVariants(data.logoVariants)
      }
    }).catch(() => { /* localStorage fallback already loaded */ })
    .finally(() => setLoaded(true))
  }, [])

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogoUrl(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSaveAsVariant = () => {
    if (!logoUrl) return
    const name = prompt('Name this logo variant:', `Logo ${logoVariants.length + 1}`)
    if (!name?.trim()) return
    const newVariant: LogoVariant = {
      name: name.trim(),
      dataUrl: logoUrl,
      active: logoVariants.length === 0, // First one is auto-active
    }
    const updated = [...logoVariants, newVariant]
    setLogoVariants(updated)
    saveLogoVariants(updated)
  }

  const handleUseVariant = (index: number) => {
    const updated = logoVariants.map((v, i) => ({ ...v, active: i === index }))
    setLogoVariants(updated)
    setLogoUrl(updated[index].dataUrl)
    saveLogoVariants(updated)
  }

  const handleDeleteVariant = (index: number) => {
    if (logoVariants.length <= 1 && logoVariants[index]?.active) return
    const wasActive = logoVariants[index].active
    const updated = logoVariants.filter((_, i) => i !== index)
    if (wasActive && updated.length > 0) {
      updated[0].active = true
      setLogoUrl(updated[0].dataUrl)
    }
    setLogoVariants(updated)
    saveLogoVariants(updated)
  }

  const handleRenameVariant = (index: number) => {
    const newName = prompt('Rename variant:', logoVariants[index].name)
    if (!newName?.trim()) return
    const updated = logoVariants.map((v, i) => i === index ? { ...v, name: newName.trim() } : v)
    setLogoVariants(updated)
    saveLogoVariants(updated)
  }

  const handleSaveBranding = () => {
    saveQuoteBranding({
      logoUrl,
      primaryColor: colors.primary,
      secondaryColor: colors.secondary,
      secondaryDark: colors.secondaryDark,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const hasLogo = !!logoUrl
  const hasColors = !!colors.primary

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Business Profile</h1>
      </div>

      {/* Logo & Brand Colors */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Palette size={20} /> Logo & Brand Colors
        </h2>
        <p className="text-sm text-gray-500 mb-4">Used to brand the quote layout sent by email and downloaded to PDF</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Upload */}
          <div>
            <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload logo</p>
              <p className="text-xs text-gray-400">PNG, JPG, SVG</p>
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>

            {/* Preview */}
            {(hasLogo || hasColors) && (
              <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Quote Branding Preview</p>
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
                  <div
                    className="p-4 text-white"
                    style={{
                      background: hasColors
                        ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                        : '#6b7280',
                    }}
                  >
                    {hasLogo ? (
                      <Image src={logoUrl} alt="Brand logo" width={72} height={72} className="object-contain h-16 w-auto" unoptimized />
                    ) : (
                      <div className="h-16 flex items-center text-white/60 text-sm">Upload a logo above</div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gray-900">Branded Quote Header</p>
                    <p className="text-xs text-gray-500 mt-1">This branding will appear on emailed quotes and downloaded PDFs.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Logo Variants */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Saved Logo Variants</h3>
                {hasLogo && (
                  <button onClick={handleSaveAsVariant} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <Plus size={12} /> Save Current as Variant
                  </button>
                )}
              </div>
              {logoVariants.length === 0 ? (
                <p className="text-xs text-gray-400 bg-gray-50 rounded-lg p-3">No saved logo variants yet. Upload a logo and save it as a variant.</p>
              ) : (
                <div className="space-y-2">
                  {logoVariants.map((logo, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        {logo.dataUrl ? (
                          <Image src={logo.dataUrl} alt={logo.name} width={32} height={32} className="w-8 h-8 object-contain rounded" unoptimized />
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded" />
                        )}
                        <span className="text-sm font-medium">{logo.name}</span>
                        {logo.active && <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Active</span>}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleUseVariant(i)}
                          className={`text-xs hover:underline ${logo.active ? 'text-gray-400' : 'text-blue-600 cursor-pointer'}`}
                          disabled={logo.active}
                        >
                          {logo.active ? 'Active' : 'Use'}
                        </button>
                        <button onClick={() => handleRenameVariant(i)} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteVariant(i)}
                          className={`p-1 hover:text-red-600 cursor-pointer ${logoVariants.length <= 1 && logo.active ? 'text-gray-200 cursor-not-allowed' : 'text-red-400'}`}
                          disabled={logoVariants.length <= 1 && logo.active}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Brand Colors */}
          <div className="space-y-3">
            {[
              { key: 'primary', label: 'Primary Color' },
              { key: 'secondary', label: 'Secondary Color' },
              { key: 'secondaryDark', label: 'Secondary Dark' },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3">
                <input
                  type="color"
                  value={colors[key as keyof typeof colors] || '#cccccc'}
                  onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                  className="w-10 h-10 rounded cursor-pointer border-0"
                />
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-gray-500">{colors[key as keyof typeof colors] || 'Not set'}</p>
                </div>
              </div>
            ))}

            <button
              onClick={handleSaveBranding}
              disabled={!hasLogo && !hasColors}
              className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} /> {saved ? '✅ Saved!' : 'Save Branding'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
