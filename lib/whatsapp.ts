import { clinic } from './clinic-data'

const greeting = `Halo ${clinic.name}, saya ingin reservasi`

export function waLink(context?: { service?: string; doctor?: string }) {
  let text = greeting
  if (context?.doctor) text += ` dengan ${context.doctor}`
  if (context?.service) text += ` untuk ${context.service}`
  return waLinkWithText(`${text}.`)
}

export function waLinkWithText(text: string) {
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(text)}`
}

// Integrasi Fonnte WA Gateway untuk DentaClinic
export const sendWAConfirmation = async ({
  name,
  waNumber,
  date,
  time,
  treatment,
}: {
  name: string
  waNumber: string
  date: string
  time: string
  treatment: string
}) => {
  const token = process.env.NEXT_PUBLIC_FONNTE_TOKEN || ''

  if (!token) {
    console.warn('Token Fonnte belum dikonfigurasi di .env.local')
    return false
  }

  const cleanPhone = waNumber.replace(/[^0-9]/g, '')
  const formattedPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone

  const message = `Halo Kak ${name}! 👋\n\nTerima kasih, janji temu perawatan Anda di *DentaClinic* telah berhasil dicatat:\n\n📅 *Hari/Tanggal:* ${date}\n⏰ *Jam:* ${time}\n🦷 *Perawatan:* ${treatment}\n\nMohon hadir 10 menit sebelum jadwal perawatan. Sampai jumpa di klinik! 😊`

  try {
    const formData = new FormData()
    formData.append('target', formattedPhone)
    formData.append('message', message)

    const response = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formData,
    })

    const result = await response.json()
    return result.status
  } catch (err) {
    console.error('Gagal mengirim pesan WhatsApp via Fonnte:', err)
    return false
  }
}