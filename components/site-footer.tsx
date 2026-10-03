import { Clock, ExternalLink, MapPin } from 'lucide-react'
import { InstagramIcon as Instagram } from './instagram-icon'
import { clinic } from '@/lib/clinic-data'
import { waLink } from '@/lib/whatsapp'
import { MotionAnchor, Reveal } from '@/components/motion'
import { WhatsAppIcon } from './whatsapp-icon'

export function SiteFooter() {
  return (
    <footer id="lokasi" className="bg-foreground text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <Reveal className="flex flex-col gap-6">
          <div>
            <p className="text-2xl font-bold">{clinic.name}</p>
            <p className="mt-1 flex items-center gap-2 text-white/70">
              <span className="h-px w-6 rounded-full bg-gold" aria-hidden="true" />
              Senyum sehat &amp; estetis tanpa rasa cemas
            </p>
          </div>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="size-5 shrink-0 text-brand-light" aria-hidden="true" />
              <address className="not-italic text-white/85">{clinic.address}</address>
            </li>
            <li className="flex gap-3">
              <Clock className="size-5 shrink-0 text-brand-light" aria-hidden="true" />
              <span className="text-white/85">{clinic.hours}</span>
            </li>
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-white/85 transition-colors hover:text-white">
                <WhatsAppIcon className="size-5 shrink-0 text-brand-light" />
                {clinic.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={clinic.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-white/85 transition-colors hover:text-white">
                <Instagram className="size-5 shrink-0 text-brand-light" aria-hidden="true" />
                {clinic.instagramHandle}
              </a>
            </li>
          </ul>
          <MotionAnchor
            href={clinic.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            lift={-2}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Buka di Google Maps
            <ExternalLink className="size-4" aria-hidden="true" />
          </MotionAnchor>
        </Reveal>
        <Reveal delay={0.1} className="overflow-hidden rounded-2xl bg-white/10">
          <iframe
            title={`Peta lokasi ${clinic.name}`}
            src={clinic.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full border-0 md:h-full md:min-h-80"
          />
        </Reveal>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-white/60 md:flex-row md:justify-between md:px-6">
          <p>{`© ${new Date().getFullYear()} ${clinic.name}. Semua hak dilindungi.`}</p>
        </div>
      </div>
    </footer>
  )
}
