'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion as m } from 'motion/react'
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Info } from 'lucide-react'
import { days, doctors, specializations, type Day, type Specialization } from '@/lib/clinic-data'
import { waLink } from '@/lib/whatsapp'
import { HOVER_SPRING } from '@/components/motion/variants'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from './section-heading'
import { WhatsAppIcon } from './whatsapp-icon'

type Mode = 'day' | 'spec'

const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] as const

export function DoctorSchedule() {
  const [mode, setMode] = useState<Mode>('spec')
  const [day, setDay] = useState<Day | 'Semua'>('Semua')
  const [spec, setSpec] = useState<Specialization | 'Semua'>('Semua')
  const [today, setToday] = useState<Day | null>(null)

  // Dibaca setelah komponen ter-render agar tidak ada beda tampilan antara server dan browser.
  useEffect(() => {
    const name = dayNames[new Date().getDay()]
    setToday((days as readonly string[]).includes(name) ? (name as Day) : null)
  }, [])

  const isPracticingToday = (doctor: (typeof doctors)[number]) =>
    today !== null && Boolean(doctor.schedule[today])

  const filtered = doctors
    .filter((d) => {
      if (mode === 'day') return day === 'Semua' || Boolean(d.schedule[day])
      return spec === 'Semua' || d.specialization === spec
    })
    // Dokter yang praktik hari ini ditampilkan lebih dulu supaya pasien cepat menemukan jadwal.
    .sort((a, b) => Number(isPracticingToday(b)) - Number(isPracticingToday(a)))

  const options: { value: string; label: string }[] =
    mode === 'day'
      ? days.map((d) => ({ value: d, label: today === d ? `${d} · Hari Ini` : d }))
      : specializations.map((s) => ({ value: s, label: s }))
  const allOption = { value: 'Semua', label: mode === 'day' ? 'Semua Hari' : 'Semua Spesialisasi' }
  const active = mode === 'day' ? day : spec

  const carouselRef = useRef<HTMLUListElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Tombol floating hanya muncul kalau kartu memang melebihi lebar container.
  const updateScrollState = useCallback(() => {
    const el = carouselRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    const overflow = maxScroll > 4
    setCanScrollLeft(overflow && el.scrollLeft > 4)
    setCanScrollRight(overflow && el.scrollLeft < maxScroll - 4)
  }, [])

  useLayoutEffect(() => {
    const el = carouselRef.current
    if (el) el.scrollTo({ left: 0, behavior: 'instant' })
    updateScrollState()
  }, [updateScrollState, filtered.length, mode, day, spec, today])

  useEffect(() => {
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [updateScrollState])

  const scrollCards = (direction: -1 | 1) => {
    carouselRef.current?.scrollBy({ left: 380 * direction, behavior: 'smooth' })
  }

  return (
    <section id="jadwal" aria-labelledby="jadwal-title" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        id="jadwal-title"
        eyebrow="Jadwal Dokter"
        title="Pilih jadwal yang pas, tanpa ganggu jam kerja"
        description="Pilih spesialisasi atau hari yang paling nyaman untuk Anda. Kami buka sampai malam dan tetap melayani di akhir pekan."
        className="gap-4 md:gap-5"
      />

      <Reveal y={24} className="mt-10 md:mt-12">
        <div className="flex flex-col gap-5">
          <div
            role="group"
            aria-label="Mode filter jadwal"
            className="inline-flex w-fit rounded-full bg-slate-100 p-1"
          >
          {(
            [
              ['spec', 'Spesialisasi'],
              ['day', 'Hari'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className="rounded-full px-5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:bg-card aria-pressed:text-foreground aria-pressed:shadow-sm"
            >
              {label}
            </button>
          ))}
        </div>

        <div
          className="scrollbar-none -mx-4 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0 md:pb-0"
          role="group"
          aria-label="Filter jadwal"
        >
          <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
            {[allOption, ...options].map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={active === opt.value}
                onClick={() =>
                  mode === 'day'
                    ? setDay(opt.value as Day | 'Semua')
                    : setSpec(opt.value as Specialization | 'Semua')
                }
                className="whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:border-gold/70 aria-pressed:bg-gold-soft aria-pressed:font-semibold aria-pressed:shadow-sm"
              >
                {opt.value === today ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
                    {opt.label}
                  </span>
                ) : (
                  opt.label
                )}
              </button>
            ))}
          </div>
        </div>
        </div>
      </Reveal>

      <div aria-live="polite" className="relative mt-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-medium text-foreground">Belum ada dokter terjadwal untuk filter ini.</p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-[#007575]"
            >
              <WhatsAppIcon className="size-4" />
              Tanyakan via WhatsApp
            </a>
          </div>
        ) : (
          <>
            <ul
              ref={carouselRef}
              onScroll={updateScrollState}
              className="scrollbar-none flex gap-6 overflow-x-auto scroll-smooth snap-x px-2 py-4"
            >
              {filtered.map((doctor) => {
                const practicingToday = isPracticingToday(doctor)
                const shownDays =
                  mode === 'day' && day !== 'Semua'
                    ? ([[day, doctor.schedule[day]]] as [Day, string][])
                    : (Object.entries(doctor.schedule) as [Day, string][])
                return (
                  <m.li
                    key={doctor.id}
                    data-motion-reduced-visible
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -4, transition: HOVER_SPRING }}
                    className={`group flex w-[85vw] min-w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-[box-shadow,border-color] hover:shadow-lg md:w-[360px] md:min-w-[340px] md:max-w-[360px] md:shrink-0 ${
                      practicingToday ? 'border-gold/60' : 'border-border'
                    }`}
                  >
                    <div className="relative aspect-square bg-muted">
                      <Image
                        src={doctor.photo}
                        alt={`Foto ${doctor.name}`}
                        fill
                        sizes="(min-width: 768px) 360px, 85vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-xs font-semibold text-secondary-foreground shadow-sm backdrop-blur-sm">
                        {doctor.specialization}
                      </span>
                      {practicingToday && (
                        <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gold/95 px-3 py-1 text-xs font-bold text-foreground backdrop-blur-sm">
                          <span className="relative flex size-1.5" aria-hidden="true">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                          </span>
                          Praktik Hari Ini
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                      <div>
                        <h3 className="font-bold leading-snug text-foreground">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {doctor.title} &middot; {doctor.experience}
                        </p>
                      </div>
                      <dl className="flex flex-col gap-1.5 text-sm">
                        {shownDays.map(([d, hours]) => (
                          <div
                            key={d}
                            className={`flex items-center justify-between gap-2 rounded-lg px-3 py-1.5 ${
                              today === d ? 'bg-gold-soft' : 'bg-muted'
                            }`}
                          >
                            <dt className="flex flex-col font-medium text-foreground">
                              {d}
                              {today === d && (
                                <span className="mt-0.5 w-fit rounded bg-amber-50 py-0.5 text-[10px] font-semibold text-amber-700">
                                (Hari Ini)
                                </span>
                              )}
                            </dt>
                            <dd className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="size-3.5" aria-hidden="true" />
                              {hours}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <a
                        href={waLink({ doctor: doctor.name })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#007575] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        <WhatsAppIcon className="size-4" />
                        {'Jadwalkan Kunjungan'}
                      </a>
                    </div>
                  </m.li>
                )
              })}
            </ul>

            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scrollCards(-1)}
                aria-label="Lihat dokter sebelumnya"
                className="absolute left-2 top-1/2 z-10 hidden w-10 h-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow-md backdrop-blur transition-all hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 md:flex"
              >
                <ChevronLeft className="size-4 text-foreground" aria-hidden="true" />
              </button>
            )}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollCards(1)}
                aria-label="Lihat dokter berikutnya"
                className="absolute right-2 top-1/2 z-10 hidden w-10 h-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow-md backdrop-blur transition-all hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 md:flex"
              >
                <ChevronRight className="size-4 text-foreground" aria-hidden="true" />
              </button>
            )}

            {filtered.length > 1 && (
              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground md:hidden">
                <ArrowRight className="size-3.5 text-gold" aria-hidden="true" />
                Geser ke samping untuk melihat dokter lainnya
              </p>
            )}
          </>
        )}
      </div>

      <p className="mt-6 flex items-start justify-center gap-1.5 border-t border-border pt-5 text-center text-xs text-slate-500">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        {today === null
          ? 'Hari ini klinik tutup. Silakan pilih hari lain, tim kami siap membantu Anda lewat WhatsApp.'
          : 'Jadwal sewaktu-waktu bisa berubah.'}
      </p>
    </section>
  )
}
