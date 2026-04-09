import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PoopScoop Quote',
  description: 'Standalone quote builder for pet waste removal businesses',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  )
}