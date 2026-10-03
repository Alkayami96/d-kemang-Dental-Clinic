import type { ComponentType, ReactNode } from 'react'
import type { ServiceIcon } from '@/lib/clinic-data'

export type DentalIconProps = { className?: string }

/** Siluet gigi dasar (dua gelombang mahkota + dua akar) yang dipakai ulang oleh semua ikon. */
const TOOTH_PATH =
  'M5 8.2C5 5.9 6.5 4.3 8.5 4.3C9.7 4.3 10.6 5.2 12 5.2C13.4 5.2 14.3 4.3 15.5 4.3C17.5 4.3 19 5.9 19 8.2C19 10 18 11.2 17.6 12.8C17.2 14.5 17.2 16.6 16.6 18.2C16.4 19 16 19.5 15.4 19.5C14.7 19.5 14.4 18.9 14.2 17.9C14 16.8 13.9 15.5 13.3 14.7C13 14.3 12.5 14 12 14C11.5 14 11 14.3 10.7 14.7C10.1 15.5 10 16.8 9.8 17.9C9.6 18.9 9.3 19.5 8.6 19.5C8 19.5 7.6 19 7.4 18.2C6.8 16.6 6.8 14.5 6.4 12.8C6 11.2 5 10 5 8.2Z'

function DentalSvg({ className, children }: DentalIconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

/** Scaling & Cleaning — gigi bersih dengan kilauan kesegaran. */
export function IconToothClean({ className }: DentalIconProps) {
  return (
    <DentalSvg className={className}>
      <path d={TOOTH_PATH} />
      <path d="M19 1.6v3.2M17.4 3.2h3.2" />
      <path d="M5.4 19.4v2.6M4.1 20.7h2.6" />
    </DentalSvg>
  )
}

/** Pemutihan Gigi — gigi bersinar dengan pancaran cahaya. */
export function IconToothGlow({ className }: DentalIconProps) {
  return (
    <DentalSvg className={className}>
      <g transform="translate(1.44 1.9) scale(0.88)">
        <path d={TOOTH_PATH} />
      </g>
      <path d="M12 1v2.2M7.8 1.8l1.4 2.1M16.2 1.8l-1.4 2.1" />
    </DentalSvg>
  )
}

/** Behel Damon / Ortho — gigi dengan kawat dan tiga braket. */
export function IconToothBraces({ className }: DentalIconProps) {
  return (
    <DentalSvg className={className}>
      <path d={TOOTH_PATH} />
      <path d="M6.6 9.4h1.6M10 9.4h1.2M13 9.4h1.2M16.2 9.4h1.6" />
      <rect x="8.2" y="8.3" width="1.8" height="2.2" rx="0.5" />
      <rect x="11.2" y="8.3" width="1.8" height="2.2" rx="0.5" />
      <rect x="14.2" y="8.3" width="1.8" height="2.2" rx="0.5" />
    </DentalSvg>
  )
}

/** Invisalign / Clear Aligner — gigi dengan kontur pelindung transparan. */
export function IconToothAligner({ className }: DentalIconProps) {
  return (
    <DentalSvg className={className}>
      <path d="M4.4 12C3.9 6.1 5.9 2 8.4 1.8C9.8 1.7 10.7 2.7 12 2.7C13.3 2.7 14.2 1.7 15.6 1.8C18.1 2 20.1 6.1 19.6 12" />
      <path d="M4.4 12v1.4M19.6 12v1.4" />
      <path d={TOOTH_PATH} />
    </DentalSvg>
  )
}

/** Implan Gigi — gigi di atas fondasi sekrup implan. */
export function IconToothImplant({ className }: DentalIconProps) {
  return (
    <DentalSvg className={className}>
      <g transform="translate(2.16 -1.2) scale(0.82)">
        <path d={TOOTH_PATH} />
      </g>
      <path d="M9.8 15h4.4" />
      <path d="M10.2 15l.6 5.2a1.2 1.2 0 0 0 2.4 0l.6-5.2" />
      <path d="M10.4 16.6h3.2M10.6 18.2h2.8M10.8 19.8h2.4" />
    </DentalSvg>
  )
}

/** Perawatan Gigi Anak — gigi ramah dengan ikon hati. */
export function IconToothKids({ className }: DentalIconProps) {
  return (
    <DentalSvg className={className}>
      <path d={TOOTH_PATH} />
      <g transform="translate(15.4 -2) scale(0.32)">
        <path d="M12 21s-6.9-4.3-6.9-9.1A4.1 4.1 0 0 1 12 9.3a4.1 4.1 0 0 1 6.9 2.6C18.9 16.7 12 21 12 21Z" />
      </g>
    </DentalSvg>
  )
}

export const serviceIcons: Record<ServiceIcon, ComponentType<DentalIconProps>> = {
  sparkles: IconToothClean,
  sun: IconToothGlow,
  braces: IconToothBraces,
  aligner: IconToothAligner,
  implant: IconToothImplant,
  kids: IconToothKids,
}
