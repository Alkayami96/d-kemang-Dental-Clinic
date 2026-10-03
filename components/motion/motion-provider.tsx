'use client'

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Provider animasi global.
 * - `MotionConfig reducedMotion="user"` menonaktifkan animasi otomatis bagi
 *   pengguna `prefers-reduced-motion` (selaras dengan blok CSS di globals.css).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
