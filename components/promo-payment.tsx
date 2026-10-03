import { BadgePercent, CreditCard, ShieldCheck, Tag, Wallet } from 'lucide-react'
import { promos } from '@/lib/clinic-data'
import { waLink } from '@/lib/whatsapp'
import { MotionAnchor, Stagger, StaggerItem } from '@/components/motion'
import { SectionHeading } from './section-heading'
import { WhatsAppIcon } from './whatsapp-icon'

const payments = [
  { icon: ShieldCheck, title: 'Mitra Asuransi', text: 'Bekerja sama dengan berbagai asuransi kesehatan rekanan.' },
  { icon: BadgePercent, title: 'Cicilan 0%', text: 'Tersedia untuk kartu kredit bank tertentu hingga 12 bulan.' },
  { icon: Wallet, title: 'Cashless Payment', text: 'Debit, kartu kredit, QRIS, dan semua e-wallet favorit Anda.' },
]

export function PromoPayment() {
  return (
    <section aria-labelledby="promo-title" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        id="promo-title"
        eyebrow="Promo & Pembayaran"
        title="Harga transparan, pembayaran fleksibel"
        description="Anda tahu estimasi biaya sejak awal — tanpa kejutan di akhir perawatan. Rencana tindakan dijelaskan sebelum dimulai."
      />

      <Stagger className="mt-10 grid gap-4 md:grid-cols-2" stagger={0.1}>
        {promos.map((promo) => (
          <StaggerItem
            as="article"
            key={promo.title}
            hoverY={-4}
            className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border-2 border-gold/50 bg-card p-6 shadow-sm transition-[box-shadow,border-color] hover:border-gold hover:shadow-lg"
          >
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-foreground">
              <Tag className="size-3.5" aria-hidden="true" />
              {promo.badge}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-foreground">{promo.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{promo.description}</p>
            </div>
            <p className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">{promo.price}</span>
              {promo.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">{promo.originalPrice}</span>
              )}
            </p>
            <MotionAnchor
              href={waLink({ service: `promo ${promo.title}` })}
              target="_blank"
              rel="noopener noreferrer"
              lift={-2}
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#007575] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <WhatsAppIcon className="size-4" />
              Klaim Promo
            </MotionAnchor>
          </StaggerItem>
        ))}
      </Stagger>

      <Stagger as="ul" className="mt-6 grid gap-3 md:grid-cols-3" stagger={0.08}>
        {payments.map(({ icon: Icon, title, text }) => (
          <StaggerItem key={title} as="li" className="flex items-start gap-3 rounded-2xl bg-secondary p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-card text-primary shadow-sm ring-1 ring-gold/30">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="font-semibold text-foreground">{title}</span>
              <span className="text-sm text-muted-foreground">{text}</span>
            </span>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <CreditCard className="size-3.5" aria-hidden="true" />
        Harga akhir dapat menyesuaikan kondisi klinis setelah pemeriksaan dokter. Kami sampaikan rinciannya lebih dahulu.
      </p>
    </section>
  )
}
