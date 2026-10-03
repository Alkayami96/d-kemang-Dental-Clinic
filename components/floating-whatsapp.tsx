import { waLink } from '@/lib/whatsapp'
import { WhatsAppIcon } from './whatsapp-icon'

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-wa-pulse fixed bottom-5 right-5 z-50 hidden size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:bottom-8 md:right-8 md:flex"
    >
      <WhatsAppIcon className="size-7" />
      <span className="sr-only">Chat WhatsApp untuk reservasi</span>
    </a>
  )
}
