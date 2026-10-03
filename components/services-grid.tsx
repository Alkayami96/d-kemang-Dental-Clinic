import { services } from '@/lib/clinic-data'
import { waLink } from '@/lib/whatsapp'
import { Stagger, StaggerItem } from '@/components/motion'
import { SectionHeading } from './section-heading'
import { serviceIcons } from './dental-icons'

export function ServicesGrid() {
  return (
    <section id="layanan" aria-labelledby="layanan-title" className="bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          id="layanan-title"
          eyebrow="Layanan Kami"
          title="Perawatan yang lengkap untuk senyum sehat Anda"
          description="Dari perawatan rutin hingga estetika, semuanya ditangani dokter berpengalaman dengan peralatan modern dan pendekatan yang nyaman."
        />
        <Stagger as="ul" className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {services.map((service) => {
            const Icon = serviceIcons[service.icon]
            return (
              <StaggerItem
                key={service.name}
                as="li"
                hoverY={-6}
                className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-teal-200 hover:shadow-lg"
              >
                <span className="flex w-12 h-12 items-center justify-center rounded-xl bg-teal-50 p-2.5 text-teal-600 transition-colors duration-300 group-hover:bg-teal-600 group-hover:text-white">
                  <Icon className="h-full w-full" />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-foreground">{service.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <p className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Mulai dari</span>
                    <span className="text-sm font-bold text-foreground">{service.price}</span>
                  </p>
                  <a
                    href={waLink({ service: service.name })}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Tanya dan booking ${service.name}`}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-2.5 py-2 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-primary md:px-3.5 md:text-sm"
                  >
                    {'Tanya & Booking'}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
