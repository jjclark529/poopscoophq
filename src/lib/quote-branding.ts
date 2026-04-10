export type QuoteBranding = {
  logoUrl: string
  primaryColor: string
  secondaryColor: string
  secondaryDark: string
}

export const defaultQuoteBranding: QuoteBranding = {
  logoUrl: '/poopscoopquote-logo.png',
  primaryColor: '#d9731d',
  secondaryColor: '#23997d',
  secondaryDark: '#8b4513',
}

export const QUOTE_BRANDING_STORAGE_KEY = 'poopscoopquote.quoteBranding'

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
}
