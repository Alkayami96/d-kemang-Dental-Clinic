'use client'

import { useEffect, useState, useCallback } from 'react'
import { X, Sparkles, Tag, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion as m } from 'motion/react'
import { promoCampaign, isPromoActive } from '@/lib/clinic-data'
import { waLink } from '@/lib/whatsapp'
import { MotionAnchor } from '@/components/motion'
import { WhatsAppIcon } from './whatsapp-icon'

/** Rangkuman diskon kampanye (mis. "25% Scaling + Polishing & 25% Behel Damon"). */
const discountSummary = promoCampaign.deals
  .map((deal) => `${deal.discountPercent}% ${deal.shortName}`)
  .join(' & ')

const promoHeadline = `${promoCampaign.label}`

/** Kunci sessionStorage memuat id kampanye, jadi modal tampil lagi saat kampanye berganti. */
const storageKey = `promo_closed:${promoCampaign.id}`

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString('id-ID')}`
}

/**
 * Modal Pop-Up Promo Melayang di Tengah Layar.
 *
 * Fitur:
 * 1. Otomatis cek rentang waktu (startDate & endDate) via `isPromoActive`.
 *    Jika di luar rentang tanggal atau enabled === false, modal tidak akan muncul.
 * 2. Delay 1.5 detik setelah halaman selesai dimuat agar tidak mengganggu first paint.
 * 3. Backdrop redup & blur dengan animasi masuk yang halus.
 * 4. Dapat ditutup via tombol [X], tombol 'Nanti Saja', klik backdrop, atau tombol ESC.
 * 5. Menyimpan status di sessionStorage agar tidak muncul lagi pada sesi yang sama.
 */
export function PromoToast() {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const handleClose = useCallback(() => {
    setIsVisible(false)
    try {
      sessionStorage.setItem(storageKey, 'true')
    } catch {
      // Abaikan bila storage tidak tersedia (misal private browsing mode ekstrim).
    }
  }, [])

  useEffect(() => {
    setIsMounted(true)

    // 1. Cek apakah promo sedang aktif secara jadwal (rentang tanggal & toggle enabled)
    if (!isPromoActive(promoCampaign)) {
      return
    }

    // 2. Cek apakah pengunjung sudah pernah menutup promo ini di sesi sekarang
    let isClosed = false
    try {
      isClosed = sessionStorage.getItem(storageKey) === 'true'
    } catch {
      // Izinkan tampil jika storage tidak dapat diakses
    }
    if (isClosed) return

    // 3. Tampilkan dengan jeda 1.5 detik
    const timer = setTimeout(() => setIsVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Event listener tombol ESC & kunci scroll body saat modal terbuka
  useEffect(() => {
    if (!isVisible) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isVisible, handleClose])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Latar Belakang Redup (Backdrop) */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Kartu Dialog Modal di Tengah Layar */}
          <m.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-b from-slate-900 via-[#0a3333] to-slate-950 text-white shadow-2xl"
          >
            {/* Tombol Tutup [X] */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Tutup promo"
              className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white/80 backdrop-blur transition hover:bg-gold hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <X className="size-4" aria-hidden="true" />
            </button>

            {/* Bagian Konten Modal (Scrollable jika layar HP pendek) */}
            <div className="overflow-y-auto px-6 py-7 sm:px-8 sm:py-8">
              {/* Header Badge */}
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-soft">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  <span>{promoCampaign.label}</span>
                </span>

                <h2
                  id="promo-modal-title"
                  className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
                >
                  <span className="mr-1.5" aria-hidden="true">{promoCampaign.emoji}</span>
                  Spesial Perawatan Gigi
                </h2>

                <p className="mt-1 text-xs font-medium text-gold-soft sm:text-sm">
                  Berlaku terbatas: <span className="font-semibold underline decoration-gold/50">{promoCampaign.period}</span>
                </p>
              </div>

              {/* Daftar Penawaran Diskon */}
              <div className="mt-6 flex flex-col gap-3">
                {promoCampaign.deals.map((deal) => {
                  const finalPrice = Math.round((deal.listPrice * (100 - deal.discountPercent)) / 100)
                  return (
                    <div
                      key={deal.title}
                      className="group relative flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all hover:border-gold/50 hover:bg-white/[0.07]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-white sm:text-base">{deal.title}</h3>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 text-[11px] font-bold text-foreground">
                          <Tag className="size-3" aria-hidden="true" />
                          Diskon {deal.discountPercent}%
                        </span>
                      </div>

                      <p className="text-xs leading-relaxed text-slate-300">
                        {deal.description}
                      </p>

                      <div className="mt-1 flex items-baseline gap-2 pt-1 border-t border-white/5">
                        <span className="text-base font-bold text-gold sm:text-lg">
                          {formatRupiah(finalPrice)}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {formatRupiah(deal.listPrice)}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-2.5">
                <MotionAnchor
                  href={waLink({
                    service: `${promoCampaign.label} (${discountSummary})`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  lift={-2}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3.5 text-sm font-bold text-foreground shadow-lg transition-colors hover:bg-gold/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <WhatsAppIcon className="size-5" />
                  <span>Klaim Promo via WhatsApp</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </MotionAnchor>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2 text-center text-xs font-medium text-slate-400 transition hover:text-white focus-visible:outline-none"
                >
                  Nanti Saja
                </button>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Alias agar kompatibel jika di masa mendatang di-import sebagai PromoModal
export { PromoToast as PromoModal }
