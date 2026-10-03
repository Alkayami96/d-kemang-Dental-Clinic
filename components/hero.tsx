import Image from 'next/image'
import { Stagger, StaggerItem } from '@/components/motion/stagger'
import { Reveal } from '@/components/motion/reveal'

export function Hero() {
  return (
    <section
      id="top"
      className="bg-gradient-to-b from-secondary/60 via-background to-background py-12 md:py-20"
    >
      <div className="mx-auto max-w-4xl px-4 text-center">
        {/* Elemen hero berada di atas fold → entrance on-mount (sekali saja). */}
        <Stagger stagger={0.12} once>
          <StaggerItem>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Senyum Sehat &amp; Estetis{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">Tanpa Rasa Cemas</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-full bg-gold/35"
                />
              </span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Perawatan gigi modern dengan dokter spesialis, transparan, dan kenyamanan serasa di rumah.
            </p>
          </StaggerItem>
        </Stagger>
      </div>

      <Reveal y={40} scaleFrom={0.97} duration={0.8}>
        <div className="mx-auto mt-10 max-w-5xl px-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-100 shadow-2xl sm:aspect-video">
            <Image
              src="/images/hero-clinic.png"
              alt="Dokter gigi tersenyum di ruang perawatan d'Kemang Dental Clinic"
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

