'use client'

import { useState } from 'react'
import { AnimatePresence, motion as m, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { WhatsAppIcon } from './whatsapp-icon'
import { MotionAnchor } from '@/components/motion'
import { waLink } from '@/lib/whatsapp'

const navLinks = [
  { href: '#layanan', label: 'Layanan' },
  { href: '#jadwal', label: 'Jadwal Dokter' },
  { href: '#testimoni', label: 'Testimoni' },
  { href: '#lokasi', label: 'Lokasi' },
]

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brand-light text-base font-bold text-primary-foreground shadow-sm ring-1 ring-gold/40">
        dK
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-base font-bold text-foreground">{"d'Kemang"}</span>
        <span className="text-xs font-medium text-muted-foreground">Dental Clinic</span>
      </span>
    </a>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 shadow-[0_1px_0_0_rgb(255_255_255_/_0.6)_inset] backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-18 md:px-6">
        <Logo />

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-gold after:transition-transform hover:bg-secondary hover:text-secondary-foreground hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <MotionAnchor
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            lift={-2}
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-[box-shadow,background-color] hover:bg-[#007575] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Reservasi WhatsApp
          </MotionAnchor>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-nav"
            aria-label="Navigasi seluler"
            data-motion-reduced-visible
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', transition: { duration: shouldReduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, height: 0, transition: { duration: shouldReduceMotion ? 0 : 0.2 } }}
            className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden"
          >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                <WhatsAppIcon className="size-4" />
                Reservasi WhatsApp
              </a>
            </li>
          </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
