import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

const USER_ID = 'default'

// GET — load all quotes
export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('user_id', USER_ID)
      .order('created_at', { ascending: false })

    if (error) throw error

    const quotes = (data || []).map(q => ({
      id: q.quote_number,
      dbId: q.id,
      customerName: q.customer_name,
      phone: q.phone || '',
      email: q.email || '',
      items: q.items || [],
      yardSize: q.yard_size || '',
      dogCount: q.dog_count || '1',
      frequency: q.frequency || 'Weekly',
      priceTier: q.price_tier || 'basic',
      discount: Number(q.discount) || 0,
      notes: q.notes || '',
      quoteMode: q.quote_mode || 'visit',
      includeInitialClean: q.include_initial_clean || false,
      initialCleanFee: q.initial_clean_fee != null ? Number(q.initial_clean_fee) : null,
      initialCleanDate: q.initial_clean_date || '',
      recurringStartDate: q.recurring_start_date || '',
      status: q.status,
      createdAt: new Date(q.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }))

    return NextResponse.json({ quotes })
  } catch (error: any) {
    console.error('quotes GET error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST — create or update a quote
export async function POST(req: NextRequest) {
  try {
    const quote = await req.json()
    const supabase = getSupabaseAdmin()

    const row = {
      user_id: USER_ID,
      quote_number: quote.id,
      customer_name: quote.customerName || '',
      phone: quote.phone || '',
      email: quote.email || '',
      items: quote.items || [],
      yard_size: quote.yardSize || '',
      dog_count: quote.dogCount || '1',
      frequency: quote.frequency || 'Weekly',
      price_tier: quote.priceTier || 'basic',
      discount: quote.discount || 0,
      notes: quote.notes || '',
      quote_mode: quote.quoteMode || 'visit',
      include_initial_clean: quote.includeInitialClean || false,
      initial_clean_fee: quote.initialCleanFee,
      initial_clean_date: quote.initialCleanDate || '',
      recurring_start_date: quote.recurringStartDate || '',
      status: quote.status || 'draft',
      updated_at: new Date().toISOString(),
    }

    if (quote.dbId) {
      // Update existing
      const { error } = await supabase
        .from('quotes')
        .update(row)
        .eq('id', quote.dbId)
      if (error) throw error
    } else {
      // Insert new
      const { error } = await supabase.from('quotes').insert(row)
      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('quotes POST error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
