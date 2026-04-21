import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const SMTP_HOST = process.env.SMTP_HOST || ''
const SMTP_PORT = Number(process.env.SMTP_PORT || '587')
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL) {
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 })
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString()

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

    await transporter.sendMail({
      from: `PoopScoop Quote <${FROM_EMAIL}>`,
      to: email,
      subject: 'Your PoopScoop Quote password reset code',
      text: `Your password reset code is: ${code}\n\nThis code will expire in 15 minutes.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111827;">
          <h2 style="margin:0 0 16px;">PoopScoop Quote Password Reset</h2>
          <p style="margin:0 0 16px;">Use the verification code below to reset your password:</p>
          <div style="font-size:32px;font-weight:700;letter-spacing:6px;background:#eff6ff;color:#1d4ed8;padding:16px 20px;border-radius:12px;text-align:center;margin:20px 0;">${code}</div>
          <p style="margin:0 0 8px;">This code expires in 15 minutes.</p>
          <p style="margin:0;color:#6b7280;font-size:14px;">If you did not request this, you can ignore this email.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, code })
  } catch (error) {
    console.error('send-reset-code error', error)
    return NextResponse.json({ error: 'Failed to send reset email' }, { status: 500 })
  }
}
