'use client'

import { motion as m } from 'motion/react'
import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { HOVER_SPRING } from './variants'

type MotionAnchorProps = Omit<HTMLMotionProps<'a'>, 'children' | 'whileHover' | 'whileTap'> & {
  children: ReactNode
  /** Naik (px, negatif) saat hover. 0 = nonaktif. */
  lift?: number
  /** Skala saat ditekan. */
  tap?: number
}

/**
 * Tautan dengan micro-interaction hover/tap.
 * Mempertahankan semantik `<a>` sekaligus memberi feedback fisik.
 */
export function MotionAnchor({ children, lift = -2, tap = 0.98, className, ...props }: MotionAnchorProps) {
  return (
    <m.a
      className={className}
      whileHover={lift ? { y: lift, transition: HOVER_SPRING } : undefined}
      whileTap={{ scale: tap }}
      {...props}
    >
      {children}
    </m.a>
  )
}

type MotionButtonProps = Omit<HTMLMotionProps<'button'>, 'children' | 'whileHover' | 'whileTap'> & {
  children: ReactNode
  /** Naik (px, negatif) saat hover. 0 = nonaktif. */
  lift?: number
  /** Skala saat ditekan. */
  tap?: number
}

/** Tombol dengan micro-interaction hover/tap. */
export function MotionButton({ children, lift = -2, tap = 0.97, type = 'button', className, ...props }: MotionButtonProps) {
  return (
    <m.button
      type={type}
      className={className}
      whileHover={lift ? { y: lift, transition: HOVER_SPRING } : undefined}
      whileTap={{ scale: tap }}
      {...props}
    >
      {children}
    </m.button>
  )
}
