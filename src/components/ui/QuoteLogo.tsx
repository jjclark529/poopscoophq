'use client'

import Image from 'next/image'

export function QuoteLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="PoopScoop Quote"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority
    />
  )
}
