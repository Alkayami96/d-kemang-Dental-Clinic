'use client'

import { motion as m } from 'motion/react'
import type { ReactNode } from 'react'
import { HOVER_SPRING } from './variants'

type HoverLiftProps = {
  children: ReactNode
  className?: string
  /** Naik (px, negatif) saat hover. 0 = nonaktif (mis. untuk sentuhan). */
  lift?: number
  /** Skala saat ditekan. */
  tap?: number
}

/**
 * Micro-interaction hover/tap generik.
 * Catatan: JANGAN pasang class CSS `transition-all` / `hover:-translate-y-*`
 * pada elemen yang dibungkus ini — transform sudah dimiliki motion.
 */
export function HoverLift({ children, className, lift = -4, tap = 0.98 }: HoverLiftProps) {
  return (
    <m.div
      className={className}
      whileHover={lift ? { y: lift, transition: HOVER_SPRING } : undefined}
      whileTap={{ scale: tap }}
    >
      {children}
    </m.div>
  )
}
