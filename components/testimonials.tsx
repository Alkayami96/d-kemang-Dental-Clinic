'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion as m, useReducedMotion } from 'motion/react'
import { Stagger, StaggerItem } from '@/components/motion/stagger'
import { Reveal } from '@/components/motion/reveal'
import { MotionAnchor } from '@/components/motion/pressable'
import { Play, Quote, Star, X } from 'lucide-react'
import { InstagramIcon as Instagram } from './instagram-icon'
import { clinic, gallery, testimonials } from '@/lib/clinic-data'
import { EASE_OUT_EXPO } from '@/components/motion/variants'
import { SectionHeading } from './section-heading'

type Testimonial = (typeof testimonials)[number]

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion()
  const [active, setActive] = useState<Testimonial | null>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (active && !dialog.open) dialog.showModal()
    if (!active && dialog.open) dialog.close()
  }, [active])

  function openTestimonial(testimonial: Testimonial) {
    setVideoFailed(false)
    setActive(testimonial)
  }

  // Hentikan pemutaran & reset posisi video sebelum modal ditutup, lalu bersihkan state.
  function closeTestimonial() {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    setVideoFailed(false)
    setActive(null)
  }

  return (
    <section id="testimoni" aria-labelledby="testimoni-title" className="bg-card py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          id="testimoni-title"
          eyebrow="Testimoni"
          title="Cerita senyum dari pasien kami"
          description="Dengarkan langsung pengalaman pasien yang merawat giginya di d'Kemang — dari konsultasi pertama sampai kontrol rutin."
        />

        <Stagger as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name} as="li" hoverY={-4}>
              <button
                type="button"
                onClick={() => openTestimonial(t)}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl text-left shadow-sm transition-[box-shadow] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <Image
                  src={t.thumbnail}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" aria-hidden="true" />
                <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card/95 text-primary shadow-md transition-transform group-hover:scale-110">
                  <Play className="ml-1 size-7 fill-primary" aria-hidden="true" />
                </span>
                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 text-white">
                  <span className="flex items-center justify-between gap-2">
                    <span className="w-fit rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-foreground">{t.treatment}</span>
                    <span className="flex items-center gap-0.5" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-gold text-gold" />
                      ))}
                    </span>
                  </span>
                  <span className="text-pretty text-sm leading-relaxed">{`"${t.quote}"`}</span>
                  <span className="text-sm font-semibold">{t.name}</span>
                </span>
                <span className="sr-only">{`Putar video testimoni ${t.name}`}</span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-16 flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-foreground">Hasil Perawatan</h3>
              <p className="text-sm text-muted-foreground">Galeri before-after dari Instagram kami.</p>
            </div>
            <MotionAnchor
              href={clinic.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              lift={-2}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
            >
              <Instagram className="size-4" aria-hidden="true" />
              {clinic.instagramHandle}
            </MotionAnchor>
          </div>
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-3" stagger={0.08}>
            {gallery.map((g) => (
              <StaggerItem key={g.label} as="li" className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                <Image src={g.image} alt={g.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
                  {g.label}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="text-xs text-muted-foreground">Hasil dapat berbeda pada setiap pasien.</p>
        </Reveal>
      </div>

      <dialog
        ref={dialogRef}
        onClose={closeTestimonial}
        onClick={(e) => e.target === e.currentTarget && closeTestimonial()}
        aria-labelledby="video-title"
        className="m-auto w-[min(92vw,26rem)] max-w-sm overflow-hidden rounded-3xl bg-card p-0 shadow-xl backdrop:bg-foreground/70 backdrop:backdrop-blur-sm"
      >
        <AnimatePresence>
          {active && (
            <m.div
              key={active.name}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.3, ease: EASE_OUT_EXPO } }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: shouldReduceMotion ? 0 : 0.18 } }}
              className="motion-reduced-visible relative mx-auto aspect-[9/16] max-h-[70vh] w-full overflow-hidden bg-foreground"
            >
              {active.videoUrl && !videoFailed ? (
              <video
                ref={videoRef}
                src={active.videoUrl}
                poster={active.thumbnail}
                controls
                autoPlay
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <Image
                src={active.thumbnail}
                alt={`Testimoni ${active.name}`}
                fill
                sizes="(min-width: 640px) 416px, 92vw"
                className="object-cover"
              />
            )}

            <button
              type="button"
              onClick={closeTestimonial}
              className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-foreground/60 text-white backdrop-blur-sm transition-colors hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">Tutup video</span>
            </button>

            {/* Kutipan & nama pasien melayang di bawah video, diberi jarak dari bar kontrol native. */}
            <div className="pointer-events-none absolute inset-x-3 bottom-14 flex flex-col gap-1.5 rounded-2xl bg-foreground/70 p-4 text-white backdrop-blur-sm">
              <Quote className="size-4 text-gold" aria-hidden="true" />
              <p className="text-pretty text-sm leading-relaxed">{`"${active.quote}"`}</p>
              <p id="video-title" className="mt-1 text-sm font-bold">
                {active.name}
                <span className="ml-2 font-normal text-white/70">{active.treatment}</span>
              </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </dialog>
    </section>
  )
}
