import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

const USER_ID = 'default'

// GET — load branding + logo variants from app_settings
export async function GET() {
  try {
    const supabase = getSupabaseAdmin()

    const [brandingRes, variantsRes] = await Promise.all([
      supabase.from('app_settings').select('value').eq('user_id', USER_ID).eq('key', 'branding').single(),
      supabase.from('app_settings').select('value').eq('user_id', USER_ID).eq('key', 'logo_variants').single(),
    ])

    return NextResponse.json({
      branding: brandingRes.data?.value || null,
      logoVariants: variantsRes.data?.value || null,
    })
  } catch (error: any) {
    console.error('branding GET error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST — save branding and/or logo variants
export async function POST(req: NextRequest) {
  try {
    const { branding, logoVariants } = await req.json()
    const supabase = getSupabaseAdmin()

    if (branding) {
      await supabase.from('app_settings').upsert({
        user_id: USER_ID,
        key: 'branding',
        value: branding,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,key' })
    }

    if (logoVariants !== undefined) {
      await supabase.from('app_settings').upsert({
        user_id: USER_ID,
        key: 'logo_variants',
        value: logoVariants,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,key' })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('branding POST error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
