'use client'

import { motion as m } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT_EXPO, HOVER_SPRING, VIEWPORT_ONCE, staggerChild, staggerParent } from './variants'

type StaggerTag = 'div' | 'ul' | 'ol' | 'section'
type StaggerItemTag = 'div' | 'li' | 'article' | 'span'

type StaggerProps = {
  children: ReactNode
  className?: string
  as?: StaggerTag
  /** Jeda antar item (detik). */
  stagger?: number
  /** Jeda sebelum item pertama (detik). */
  delay?: number
  once?: boolean
}

/**
 * Container stagger. Pasangan dari `StaggerItem`.
 * Contoh: `<Stagger as="ul">` + `<StaggerItem as="li">`.
 */
export function Stagger({ children, className, as = 'div', stagger = 0.08, delay = 0, once = true }: StaggerProps) {
  const common = {
    className,
    initial: 'hidden' as const,
    whileInView: 'show' as const,
    viewport: once ? VIEWPORT_ONCE : { once: false, amount: 0.2 },
    variants: staggerParent(stagger, delay),
  }

  switch (as) {
    case 'ul':
      return <m.ul {...common}>{children}</m.ul>
    case 'ol':
      return <m.ol {...common}>{children}</m.ol>
    case 'section':
      return <m.section {...common}>{children}</m.section>
    default:
      return <m.div {...common}>{children}</m.div>
  }
}

type StaggerItemProps = {
  children: ReactNode
  className?: string
  as?: StaggerItemTag
  /**
   * Gerak hover (px, negatif = naik). Diterapkan via motion, jadi HAPUS
   * class CSS `hover:-translate-y-*` / `transition-all` pada elemen yang sama
   * agar tidak dobel atau bertabrakan dengan transform milik motion.
   */
  hoverY?: number
  /** Skala saat ditekan. */
  tapScale?: number
}

/** Item stagger. Mendukung hover/tap motion pada elemen yang sama. */
export function StaggerItem({ children, className, as = 'div', hoverY, tapScale }: StaggerItemProps) {
  const gesture = {
    className: `motion-reduced-visible ${className ?? ''}`,
    variants: staggerChild,
    whileHover: hoverY ? { y: hoverY, transition: HOVER_SPRING } : undefined,
    whileTap: tapScale ? { scale: tapScale } : undefined,
  } as const

  switch (as) {
    case 'li':
      return <m.li {...gesture}>{children}</m.li>
    case 'article':
      return <m.article {...gesture}>{children}</m.article>
    case 'span':
      return <m.span {...gesture}>{children}</m.span>
    default:
      return <m.div {...gesture}>{children}</m.div>
  }
}

export { EASE_OUT_EXPO }
