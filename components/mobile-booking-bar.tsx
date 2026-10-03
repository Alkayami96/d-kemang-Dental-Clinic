import { MapPin } from 'lucide-react'
import { clinic } from '@/lib/clinic-data'
import { waLink } from '@/lib/whatsapp'
import { MotionAnchor } from '@/components/motion'
import { WhatsAppIcon } from './whatsapp-icon'

export function MobileBookingBar() {
  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/80 shadow-[0_-10px_30px_-18px_rgb(15_23_42_/_0.45)] backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-2.5 px-4 pt-2.5">
        <a
          href={clinic.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary"
        >
          <MapPin className="size-5" aria-hidden="true" />
          <span className="sr-only">Lihat lokasi klinik di Google Maps</span>
        </a>
        <MotionAnchor
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          lift={0}
          tap={0.97}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md transition-colors hover:bg-[#007575] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <WhatsAppIcon className="size-4" />
          Reservasi WhatsApp
        </MotionAnchor>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-2 pt-1.5 text-center text-[11px] text-muted-foreground">
        Dibalas admin rata-rata di bawah 5 menit pada jam praktik.
      </p>
    </div>
  )
}
