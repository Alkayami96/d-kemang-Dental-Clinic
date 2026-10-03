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
