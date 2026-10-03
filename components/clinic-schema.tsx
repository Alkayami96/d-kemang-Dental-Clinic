import { clinic, doctors, services } from '@/lib/clinic-data'

type ClinicSchemaProps = {
  siteUrl?: string
}

export function ClinicSchema({ siteUrl = 'https://dkemangdental.com' }: ClinicSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'MedicalBusiness', 'LocalBusiness'],
    '@id': `${siteUrl}/#clinic`,
    name: clinic.name,
    image: `${siteUrl}/images/hero-clinic.png`,
    url: siteUrl,
    telephone: `+${clinic.whatsappNumber}`,
    priceRange: '$$',
    description:
      'Klinik dokter gigi keluarga di Kemang, Jakarta Selatan. Melayani behel damon, clear aligners, bleaching, pembersihan karang gigi (scaling), implan, dan perawatan gigi anak dengan jadwal praktek sore hingga malam.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Kemang Raya, Kemang, Mampang Prapatan',
      addressLocality: 'Jakarta Selatan',
      addressRegion: 'DKI Jakarta',
      postalCode: '12730',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.2608,
      longitude: 106.8156,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:00',
        closes: '20:00',
      },
    ],
    sameAs: [clinic.instagramUrl, clinic.mapsUrl],
    paymentAccepted: 'Cash, Credit Card, Debit Card, QRIS, Insurance',
    currenciesAccepted: 'IDR',
    medicalSpecialty: [
      'Dentistry',
      'Orthodontics',
      'PediatricDentistry',
      'CosmeticDentistry',
    ],
    availableService: services.map((s) => ({
      '@type': 'MedicalProcedure',
      name: s.name,
      description: s.description,
    })),
    employee: doctors.map((doc) => ({
      '@type': 'Physician',
      name: doc.name,
      jobTitle: doc.title,
      medicalSpecialty: doc.specialization,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
