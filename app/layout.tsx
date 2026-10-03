import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { MotionProvider } from '@/components/motion'
import { ClinicSchema } from '@/components/clinic-schema'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const defaultSiteUrl = 'https://dkemangdental.com'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "d'Kemang Dental Clinic | Dokter Gigi Keluarga di Kemang, Jakarta Selatan",
    template: "%s | d'Kemang Dental Clinic",
  },
  description:
    'Senyum sehat & estetis tanpa rasa cemas. Klinik gigi keluarga di Kemang Raya, Jakarta Selatan dengan dokter spesialis behel, aesthetic bleaching, gigi anak, jadwal praktek hingga malam, dan reservasi mudah lewat WhatsApp.',
  keywords: [
    'dokter gigi kemang',
    'klinik gigi jakarta selatan',
    'behel damon kemang',
    'bleaching gigi jakarta selatan',
    'dokter gigi anak kemang',
    'scaling karang gigi',
    'implan gigi jakarta',
    'invisalign kemang',
  ],
  authors: [{ name: "d'Kemang Dental Clinic" }],
  creator: "d'Kemang Dental Clinic",
  publisher: "d'Kemang Dental Clinic",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "d'Kemang Dental Clinic | Dokter Gigi Keluarga di Kemang, Jakarta Selatan",
    description:
      'Senyum sehat & estetis tanpa rasa cemas. Klinik gigi keluarga di Kemang Raya dengan dokter spesialis, jadwal sore-malam, dan reservasi mudah lewat WhatsApp.',
    url: siteUrl,
    siteName: "d'Kemang Dental Clinic",
    images: [
      {
        url: '/images/hero-clinic.png',
        width: 1200,
        height: 630,
        alt: "Klinik d'Kemang Dental Clinic Jakarta Selatan",
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "d'Kemang Dental Clinic | Dokter Gigi Kemang Jakarta Selatan",
    description:
      'Senyum sehat & estetis tanpa rasa cemas. Klinik gigi keluarga di Kemang Raya dengan dokter spesialis dan reservasi mudah via WhatsApp.',
    images: ['/images/hero-clinic.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#008B8B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={jakarta.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ClinicSchema siteUrl={siteUrl} />
        <MotionProvider>{children}</MotionProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
