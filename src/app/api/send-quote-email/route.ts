import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const SMTP_HOST = process.env.SMTP_HOST || ''
const SMTP_PORT = Number(process.env.SMTP_PORT || '587')
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER

export async function POST(req: NextRequest) {
  try {
    const { to, customerName, html, subject } = await req.json()

    if (!to || !to.includes('@')) {
      return NextResponse.json({ error: 'Valid recipient email is required' }, { status: 400 })
    }

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json({ error: 'SMTP not configured' }, { status: 500 })
    }

    const secure = SMTP_PORT === 465

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    const info = await transporter.sendMail({
      from: `PoopScoop Quote <${FROM_EMAIL}>`,
      to,
      subject: subject || `Quote for ${customerName || 'you'} from PoopScoop`,
      html: html || '<p>Your quote is attached.</p>',
    })

    return NextResponse.json({ success: true, messageId: info.messageId })
  } catch (error: any) {
    console.error('send-quote-email error', error)
    return NextResponse.json({
      error: 'Failed to send quote email',
      details: error?.message || String(error),
    }, { status: 500 })
  }
}
