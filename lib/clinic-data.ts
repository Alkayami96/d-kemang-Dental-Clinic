export const clinic = {
  name: "d'Kemang Dental Clinic",
  whatsappNumber: '6285892713270',
  whatsappDisplay: '+62 858-9271-3270',
  address: 'Jl. Kemang Raya, Kemang, Mampang Prapatan, Jakarta Selatan 12730',
  shortAddress: 'Jl. Kemang Raya, Jakarta Selatan',
  hours: 'Senin - Sabtu: 10.00 - 20.00 WIB',
  instagramHandle: '@dkemang.dentalclinic',
  instagramUrl: 'https://www.instagram.com/dkemang.dentalclinic/',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Kemang+Raya+Jakarta+Selatan',
  mapsEmbedUrl: 'https://www.google.com/maps?q=Jl.+Kemang+Raya,+Jakarta+Selatan&output=embed',
}

export const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] as const
export type Day = (typeof days)[number]

export const specializations = ['Spesialis Behel', 'Aesthetic', 'Gigi Anak', 'Umum & Implan'] as const
export type Specialization = (typeof specializations)[number]

export type Doctor = {
  id: string
  name: string
  title: string
  specialization: Specialization
  photo: string
  experience: string
  schedule: Partial<Record<Day, string>>
}

export const doctors: Doctor[] = [
  {
    id: 'drg-nadira',
    name: 'drg. Nadira Putri',
    title: 'Dokter Gigi Estetik',
    specialization: 'Aesthetic',
    photo: '/images/doctor-1.png',
    experience: '8 tahun pengalaman',
    schedule: { Senin: '17.00 - 20.00', Rabu: '10.00 - 16.00', Jumat: '17.00 - 20.00', Sabtu: '10.00 - 15.00' },
  },
  {
    id: 'drg-arya',
    name: 'drg. Arya Wicaksono, Sp.Ort',
    title: 'Spesialis Ortodonti',
    specialization: 'Spesialis Behel',
    photo: '/images/doctor-2.png',
    experience: '12 tahun pengalaman',
    schedule: { Selasa: '17.00 - 20.00', Kamis: '17.00 - 20.00', Sabtu: '10.00 - 16.00' },
  },
  {
    id: 'drg-salsa',
    name: 'drg. Salsabila Rahman, Sp.KGA',
    title: 'Spesialis Kedokteran Gigi Anak',
    specialization: 'Gigi Anak',
    photo: '/images/doctor-3.png',
    experience: '6 tahun pengalaman',
    schedule: { Senin: '10.00 - 15.00', Rabu: '15.00 - 20.00', Sabtu: '10.00 - 14.00' },
  },
  {
    id: 'drg-bima',
    name: 'drg. Bima Santoso',
    title: 'Dokter Gigi Umum & Implan',
    specialization: 'Umum & Implan',
    photo: '/images/doctor-4.png',
    experience: '15 tahun pengalaman',
    schedule: { Selasa: '10.00 - 16.00', Kamis: '10.00 - 16.00', Jumat: '10.00 - 16.00' },
  },
]

export type ServiceIcon = 'sparkles' | 'sun' | 'braces' | 'aligner' | 'implant' | 'kids'

export const services: {
  name: string
  description: string
  price: string
  icon: ServiceIcon
}[] = [
  {
    name: 'Scaling & Cleaning',
    description: 'Membersihkan karang gigi dan noda untuk gusi sehat dan napas segar.',
    price: 'Rp 450.000',
    icon: 'sparkles',
  },
  {
    name: 'Pemutihan Gigi (Bleaching)',
    description: 'Gigi lebih cerah dalam satu kunjungan dengan prosedur aman dan terkontrol.',
    price: 'Rp 3.500.000',
    icon: 'sun',
  },
  {
    name: 'Behel Damon / Ortho',
    description: 'Merapikan susunan gigi dengan sistem self-ligating yang lebih nyaman.',
    price: 'Rp 14.000.000',
    icon: 'braces',
  },
  {
    name: 'Invisalign / Clear Aligners',
    description: 'Aligner transparan yang hampir tak terlihat, cocok untuk aktivitas kerja.',
    price: 'Rp 28.000.000',
    icon: 'aligner',
  },
  {
    name: 'Implan Gigi',
    description: 'Pengganti gigi hilang yang kuat, natural, dan tahan lama.',
    price: 'Rp 18.000.000',
    icon: 'implant',
  },
  {
    name: 'Perawatan Gigi Anak',
    description: 'Pendekatan ramah anak agar si kecil nyaman dan tidak takut ke dokter gigi.',
    price: 'Rp 350.000',
    icon: 'kids',
  },
]

export type PromoDeal = {
  /** Judul kartu promo di section "Promo & Pembayaran" (components/promo-payment.tsx). */
  title: string
  /** Nama singkat untuk headline banner atas (components/promo-toast.tsx). */
  shortName: string
  description: string
  /** Harga normal sebelum diskon, dalam rupiah (angka murni tanpa titik). */
  listPrice: number
  /** Diskon kampanye dalam persen — dipakai banner sekaligus kartu promo. */
  discountPercent: number
}

/**
 * Kampanye promo yang sedang berjalan.
 *
 * Satu sumber angka untuk banner atas (components/promo-toast.tsx) dan kartu
 * promo (components/promo-payment.tsx), jadi teks banner tidak akan pernah
 * bertentangan dengan angka di section promo.
 *
 * Saat kampanye berganti, cukup ubah `id`, `label`, `period`, dan `deals`.
 * Contoh periodik: "Promo Hari Kemerdekaan" (17 Agustus), "Promo Bulan
 * Kesehatan Gigi Nasional" (September), atau "Promo Akhir Tahun" (Desember).
 */
export const promoCampaign = {
  /** Kunci sessionStorage "promo ditutup" — diganti tiap kampanye baru agar banner/modal muncul lagi. */
  id: 'promo-oktober-2026',
  /** Saklar On/Off manual (true = aktif mengikuti jadwal tanggal, false = nonaktif total). */
  enabled: true,
  /**
   * Tanggal mulai tayang promo (Format ISO: YYYY-MM-DDTHH:mm:ss+07:00 atau YYYY-MM-DD).
   * Kosongkan string jika ingin langsung aktif tanpa batas tanggal mulai.
   */
  startDate: '2026-10-01T00:00:00+07:00',
  /**
   * Tanggal berakhirnya promo. Lewat dari waktu ini, pop-up OTOMATIS hilang dari website.
   * Kosongkan string jika promo berlaku tanpa batas waktu.
   */
  endDate: '2026-10-31T23:59:59+07:00',
  emoji: '🎉',
  label: 'Promo Spesial Oktober',
  /** Periode berlaku yang tampil di modal & pesan WhatsApp. */
  period: '1 – 31 Oktober 2026',
  deals: [
    {
      title: 'Paket Scaling + Polishing',
      shortName: 'Scaling + Polishing',
      description: 'Bersih menyeluruh plus polishing untuk kilau gigi natural.',
      listPrice: 600_000,
      discountPercent: 25,
    },
    {
      title: 'Discount Behel Damon',
      shortName: 'Behel Damon',
      description: 'Potongan pemasangan behel Damon, termasuk konsultasi dan rontgen.',
      listPrice: 14_000_000,
      discountPercent: 25,
    },
  ] satisfies PromoDeal[],
}

/**
 * Memeriksa apakah kampanye promo sedang aktif berdasarkan status 'enabled' dan rentang tanggal.
 */
export function isPromoActive(
  campaign: typeof promoCampaign = promoCampaign,
  currentDate: Date = new Date()
): boolean {
  if (!campaign.enabled) return false

  const now = currentDate.getTime()
  if (campaign.startDate) {
    const start = new Date(campaign.startDate).getTime()
    if (!Number.isNaN(start) && now < start) return false
  }
  if (campaign.endDate) {
    const end = new Date(campaign.endDate).getTime()
    if (!Number.isNaN(end) && now > end) return false
  }
  return true
}

export type Promo = {
  title: string
  description: string
  price: string
  originalPrice: string | null
  badge: string
}

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString('id-ID')}`
}

/** Harga promo dihitung dari `promoCampaign.deals` supaya persentase & rupiah selalu sinkron. */
export const promos: Promo[] = promoCampaign.deals.map((deal) => ({
  title: deal.title,
  description: deal.description,
  price: formatRupiah(Math.round((deal.listPrice * (100 - deal.discountPercent)) / 100)),
  originalPrice: formatRupiah(deal.listPrice),
  badge: `Hemat ${deal.discountPercent}%`,
}))

export const testimonials = [
  {
    name: 'Ibu Sari & Alya',
    treatment: 'Gigi Anak',
    quote: 'Anak saya yang biasanya takut, sekarang malah minta balik lagi.',
    thumbnail: '/images/testimonial-1.png',
    videoUrl: '/videos/testi-1.mp4',
  },

  {
    name: 'Raka, 31',
    treatment: 'Bleaching',
    quote: 'Prosesnya cepat, dokternya jelasin semua step. Hasilnya natural.',
    thumbnail: '/images/testimonial-2.png',
    videoUrl: '/videos/testi-2.mp4',
  },
  
    {
    name: 'Nadia, 28',
    treatment: 'Invisalign',
    quote: 'Bisa kontrol sepulang kerja, dan aligner-nya nggak kelihatan saat meeting.',
    thumbnail: '/images/testimonial-3.png',
    videoUrl: '/videos/testi-3.mp4',
  },
]

export const gallery = [
  { image: '/images/ba-whitening.png', label: 'Bleaching', alt: 'Perbandingan sebelum dan sesudah pemutihan gigi' },
  { image: '/images/ba-braces.png', label: 'Behel Damon', alt: 'Perbandingan sebelum dan sesudah perawatan behel' },
  { image: '/images/ba-aligner.png', label: 'Clear Aligner', alt: 'Clear aligner transparan di depan senyum pasien' },
]
