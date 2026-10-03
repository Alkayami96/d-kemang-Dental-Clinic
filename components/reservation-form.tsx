'use client'

import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { clinic, days, services } from '@/lib/clinic-data'
import { waLinkWithText } from '@/lib/whatsapp'
import { MotionButton, Reveal, Stagger, StaggerItem } from '@/components/motion'
import { SectionHeading } from './section-heading'

const timeSlots = ['Pagi (10.00 - 12.00)', 'Siang (12.00 - 15.00)', 'Sore (15.00 - 17.00)', 'Malam (17.00 - 20.00)']

const fieldClass =
  'w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors hover:border-brand-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40'

export function ReservationForm() {
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const service = String(data.get('service') ?? '')
    const day = String(data.get('day') ?? '')
    const time = String(data.get('time') ?? '')
    const notes = String(data.get('notes') ?? '').trim()

    if (!/^(\+62|62|0)8\d{7,12}$/.test(phone.replace(/[\s-]/g, ''))) {
      setError('Mohon masukkan nomor HP Indonesia yang valid, contoh 0812xxxxxxx.')
      return
    }
    setError(null)

    const message = [
      `Halo ${clinic.name}, saya ingin reservasi.`,
      '',
      `Nama: ${name}`,
      `No. HP: ${phone}`,
      `Layanan: ${service}`,
      `Jadwal: ${day}, ${time}`,
      notes ? `Catatan: ${notes}` : null,
    ]
      .filter((line) => line !== null)
      .join('\n')

    window.open(waLinkWithText(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="reservasi" aria-labelledby="reservasi-title" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="grid gap-10 rounded-3xl bg-secondary p-6 md:grid-cols-5 md:p-10">
        <div className="flex flex-col gap-4 md:col-span-2">
          <SectionHeading
            id="reservasi-title"
            eyebrow="Reservasi"
            title="Booking dalam 1 menit"
            description="Isi data singkat di bawah ini. Pesan Anda otomatis terformat rapi dan langsung terkirim ke WhatsApp admin kami."
          />
          <Stagger as="ol" className="mt-2 flex flex-col gap-3 text-sm text-foreground" stagger={0.09}>
            {[
              'Isi data dan pilih layanan yang Anda butuhkan',
              'Tekan kirim — WhatsApp otomatis terbuka',
              'Admin membalas dan mengunci jadwal Anda',
            ].map((step, i) => (
              <StaggerItem key={step} as="li" className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
                {step}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="md:col-span-3">
          <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl bg-card p-5 shadow-sm sm:grid-cols-2 md:p-6" noValidate={false}>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Nama Lengkap</label>
            <input id="name" name="name" required autoComplete="name" placeholder="Nama sesuai KTP" className={fieldClass} />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">Nomor HP</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              required
              autoComplete="tel"
              placeholder="0812xxxxxxx"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'phone-error' : undefined}
              className={fieldClass}
            />
            {error && (
              <p id="phone-error" role="alert" className="text-sm text-destructive">{error}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="service" className="text-sm font-medium text-foreground">Pilih Layanan</label>
            <select id="service" name="service" required defaultValue="" className={fieldClass}>
              <option value="" disabled>Pilih layanan</option>
              {services.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
              <option value="Konsultasi Umum">Konsultasi Umum</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="day" className="text-sm font-medium text-foreground">Pilih Hari</label>
            <select id="day" name="day" required defaultValue="" className={fieldClass}>
              <option value="" disabled>Pilih hari</option>
              {days.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="time" className="text-sm font-medium text-foreground">Pilih Jam</label>
            <select id="time" name="time" required defaultValue="" className={fieldClass}>
              <option value="" disabled>Pilih jam</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="notes" className="text-sm font-medium text-foreground">
              Catatan <span className="font-normal text-muted-foreground">(opsional)</span>
            </label>
            <textarea id="notes" name="notes" rows={3} placeholder="Keluhan atau dokter yang diinginkan" className={`${fieldClass} resize-none`} />
          </div>
          <MotionButton
            type="submit"
            lift={-2}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-[box-shadow,background-color] hover:bg-[#007575] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:col-span-2"
          >
            <Send className="size-4" aria-hidden="true" />
            Kirim via WhatsApp
          </MotionButton>
          <p className="text-center text-xs text-muted-foreground sm:col-span-2">
            Data yang Anda isi akan digunakan untuk menyusun pesan reservasi yang dibuka melalui WhatsApp.
          </p>
        </form>
        </Reveal>
      </div>
    </section>
  )
}
