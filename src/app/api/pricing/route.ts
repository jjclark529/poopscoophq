import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

const USER_ID = 'default' // Single-tenant for now

// GET — load pricing table + addon services
export async function GET() {
  try {
    const supabase = getSupabaseAdmin()

    const [pricingRes, addonsRes] = await Promise.all([
      supabase.from('pricing_tables').select('*').eq('user_id', USER_ID),
      supabase.from('addon_services').select('*').eq('user_id', USER_ID).order('name'),
    ])

    if (pricingRes.error) throw pricingRes.error
    if (addonsRes.error) throw addonsRes.error

    // Convert flat rows back into the nested PricingTable format the frontend expects
    // { basic: [{ yardSize, dogs, frequency, price }], premium: [...] }
    const pricingTable: Record<string, Array<{ yardSize: string; dogs: string; frequency: string; price: number }>> = {
      basic: [],
      premium: [],
    }

    for (const row of pricingRes.data || []) {
      const tier = row.tier as 'basic' | 'premium'
      if (pricingTable[tier]) {
        pricingTable[tier].push({
          yardSize: row.yard_size,
          dogs: row.dogs,
          frequency: row.frequency,
          price: Number(row.price),
        })
      }
    }

    const addonServices = (addonsRes.data || []).map(a => ({
      name: a.name,
      basePrice: Number(a.base_price),
      description: a.description || '',
    }))

    return NextResponse.json({
      pricingTable: (pricingRes.data?.length ?? 0) > 0 ? pricingTable : null,
      addonServices: (addonsRes.data?.length ?? 0) > 0 ? addonServices : null,
    })
  } catch (error: any) {
    console.error('pricing GET error:', error)
    return NextResponse.json({ error: error.message || 'Failed to load pricing' }, { status: 500 })
  }
}

// POST — save pricing table + addon services (full replace)
export async function POST(req: NextRequest) {
  try {
    const { pricingTable, addonServices } = await req.json()
    const supabase = getSupabaseAdmin()

    // Upsert pricing rows
    if (pricingTable) {
      // Delete existing rows for this user, then insert fresh
      await supabase.from('pricing_tables').delete().eq('user_id', USER_ID)

      const rows: Array<{
        user_id: string; tier: string; yard_size: string; dogs: string; frequency: string; price: number
      }> = []

      for (const tier of ['basic', 'premium'] as const) {
        if (pricingTable[tier]) {
          for (const entry of pricingTable[tier]) {
            rows.push({
              user_id: USER_ID,
              tier,
              yard_size: entry.yardSize,
              dogs: entry.dogs,
              frequency: entry.frequency,
              price: Math.round(Number(entry.price) * 100) / 100,
            })
          }
        }
      }

      if (rows.length > 0) {
        // Insert in batches of 500 to avoid payload limits
        for (let i = 0; i < rows.length; i += 500) {
          const batch = rows.slice(i, i + 500)
          const { error } = await supabase.from('pricing_tables').insert(batch)
          if (error) throw error
        }
      }
    }

    // Upsert addon services
    if (addonServices) {
      await supabase.from('addon_services').delete().eq('user_id', USER_ID)

      if (addonServices.length > 0) {
        const addonRows = addonServices.map((a: any) => ({
          user_id: USER_ID,
          name: a.name,
          base_price: Math.round(Number(a.basePrice) * 100) / 100,
          description: a.description || '',
        }))
        const { error } = await supabase.from('addon_services').insert(addonRows)
        if (error) throw error
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('pricing POST error:', error)
    return NextResponse.json({ error: error.message || 'Failed to save pricing' }, { status: 500 })
  }
}
