'use client'

import { motion as m } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from './variants'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Jeda sebelum animasi mulai (detik). */
  delay?: number
  /** Jarak geser vertikal awal (px). */
  y?: number
  /** Durasi animasi (detik). */
  duration?: number
  /** Skala awal (mis. 0.97 untuk zoom-in halus). */
  scaleFrom?: number
  /** true = animasi hanya berjalan sekali. */
  once?: boolean
}

/**
 * Pembungkus reveal generik: fade + naik (+ opsional zoom) saat masuk viewport.
 * Aman dipakai dari Server Component karena ini Client Component.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.65,
  scaleFrom,
  once = true,
}: RevealProps) {
  return (
    <m.div
      className={`motion-reduced-visible ${className ?? ''}`}
      initial={{ opacity: 0, y, scale: scaleFrom ?? 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={once ? VIEWPORT_ONCE : { once: false, amount: 0.2 }}
      transition={{ duration, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </m.div>
  )
}
