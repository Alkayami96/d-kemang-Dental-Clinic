import type { Transition } from 'motion/react'
import type { Variants } from 'motion/react'

/** Easing lembut khas reveal (mirip easeOutExpo). */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Spring konsisten untuk interaksi hover/tap. */
export const HOVER_SPRING: Transition = { type: 'spring', stiffness: 400, damping: 28 }

/**
 * Default viewport untuk animasi scroll: jalan sekali saat ~20% elemen
 * terlihat. `once: true` mencegah animasi berulang saat scroll naik-turun.
 */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const

/** Variants parent untuk stagger (dipakai bersama `staggerChild`). */
export function staggerParent(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
  }
}

/** Variants item untuk stagger: fade + naik halus. */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}
