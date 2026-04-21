import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

const yardSizes = [
  '1–1,000 sqft', '1,001–2,000 sqft', '2,001–3,000 sqft',
  '3,001–4,000 sqft', '4,001–5,000 sqft', '5,001–6,000 sqft',
  '6,001–7,000 sqft', '7,001–8,000 sqft', '8,001–9,000 sqft',
  '9,001–10,000 sqft', '10,001+ sqft',
]
const dogCounts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const frequencies = ['Weekly', 'Bi-Weekly', 'Twice a Week', 'Once a Month', 'One-Time']

function buildSheet() {
  const rows: Record<string, string | number>[] = []
  for (const ys of yardSizes) {
    for (const dc of dogCounts) {
      for (const freq of frequencies) {
        rows.push({
          'Yard Size': ys,
          'Dogs': Number(dc),
          'Frequency': freq,
          'Price': '',
        } as any)
      }
    }
  }
  return rows
}

export async function GET() {
  const wb = XLSX.utils.book_new()

  const basicRows = buildSheet()
  const basicWs = XLSX.utils.json_to_sheet(basicRows)
  // Set column widths
  basicWs['!cols'] = [
    { wch: 22 }, // Yard Size
    { wch: 6 },  // Dogs
    { wch: 18 }, // Frequency
    { wch: 10 }, // Price
  ]
  XLSX.utils.book_append_sheet(wb, basicWs, 'Basic')

  const premiumRows = buildSheet()
  const premiumWs = XLSX.utils.json_to_sheet(premiumRows)
  premiumWs['!cols'] = [
    { wch: 22 },
    { wch: 6 },
    { wch: 18 },
    { wch: 10 },
  ]
  XLSX.utils.book_append_sheet(wb, premiumWs, 'Premium')

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

  return new NextResponse(buf, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="pricing-template.xlsx"',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
