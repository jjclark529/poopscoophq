export type QuoteBranding = {
  logoUrl: string
  primaryColor: string
  secondaryColor: string
  secondaryDark: string
}

export type LogoVariant = {
  name: string
  dataUrl: string
  active: boolean
}

export const defaultQuoteBranding: QuoteBranding = {
  logoUrl: '',
  primaryColor: '',
  secondaryColor: '',
  secondaryDark: '',
}

export const QUOTE_BRANDING_STORAGE_KEY = 'poopscoopquote.quoteBranding'
export const LOGO_VARIANTS_STORAGE_KEY = 'poopscoopquote.logoVariants'

export function loadQuoteBranding(): QuoteBranding {
  if (typeof window === 'undefined') return defaultQuoteBranding
  try {
    const raw = window.localStorage.getItem(QUOTE_BRANDING_STORAGE_KEY)
    if (!raw) return defaultQuoteBranding
    return { ...defaultQuoteBranding, ...JSON.parse(raw) }
  } catch {
    return defaultQuoteBranding
  }
}

export function saveQuoteBranding(branding: QuoteBranding) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(QUOTE_BRANDING_STORAGE_KEY, JSON.stringify(branding))
  // Also persist to Supabase
  fetch('/api/branding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ branding }),
  }).catch(() => { /* best-effort */ })
}

export function loadLogoVariants(): LogoVariant[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(LOGO_VARIANTS_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveLogoVariants(variants: LogoVariant[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LOGO_VARIANTS_STORAGE_KEY, JSON.stringify(variants))
  fetch('/api/branding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ logoVariants: variants }),
  }).catch(() => { /* best-effort */ })
}
