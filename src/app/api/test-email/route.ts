import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const SMTP_HOST = process.env.SMTP_HOST || ''
const SMTP_PORT = Number(process.env.SMTP_PORT || '587')
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER

export async function POST(req: NextRequest) {
  try {
    const { to } = await req.json()

    if (!to || typeof to !== 'string' || !to.includes('@')) {
      return NextResponse.json({ error: 'Valid "to" email is required' }, { status: 400 })
    }

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json({
        error: 'SMTP not configured',
        debug: { SMTP_HOST: SMTP_HOST || '(empty)', SMTP_PORT, SMTP_USER: SMTP_USER ? '(set)' : '(empty)', SMTP_PASS: SMTP_PASS ? '(set)' : '(empty)' }
      }, { status: 500 })
    }

    // For Gmail on port 587, use STARTTLS (secure: false)
    // For Gmail on port 465, use SSL (secure: true)
    const secure = SMTP_PORT === 465

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    const info = await transporter.sendMail({
      from: `PoopScoop Quote <${FROM_EMAIL}>`,
      to,
      subject: 'PoopScoop Quote — Test Email ✅',
      text: 'This is a test email from PoopScoop Quote. If you are reading this, email sending is working!',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111827;">
          <h2 style="margin:0 0 16px;">✅ PoopScoop Quote — Email Test</h2>
          <p style="margin:0 0 16px;">This is a test email from <strong>PoopScoop Quote</strong>.</p>
          <p style="margin:0 0 8px;">If you are reading this, email sending is working correctly!</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
          <p style="margin:0;color:#6b7280;font-size:13px;">SMTP Host: ${SMTP_HOST} | Port: ${SMTP_PORT} | Secure: ${secure}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, messageId: info.messageId, smtp: { host: SMTP_HOST, port: SMTP_PORT, secure } })
  } catch (error: any) {
    console.error('test-email error', error)
    return NextResponse.json({
      error: 'Failed to send test email',
      details: error?.message || String(error),
      code: error?.code,
      smtp: { host: SMTP_HOST, port: SMTP_PORT }
    }, { status: 500 })
  }
}
