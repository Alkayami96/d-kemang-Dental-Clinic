import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { DoctorSchedule } from '@/components/doctor-schedule'
import { ServicesGrid } from '@/components/services-grid'
import { Testimonials } from '@/components/testimonials'
import { ReservationForm } from '@/components/reservation-form'
import { SiteFooter } from '@/components/site-footer'
import { FloatingWhatsApp } from '@/components/floating-whatsapp'
import { MobileBookingBar } from '@/components/mobile-booking-bar'
import { PromoToast } from '@/components/promo-toast'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <PromoToast />
        <Hero />
        <DoctorSchedule />
        <ServicesGrid />
        <Testimonials />
        <ReservationForm />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
      <MobileBookingBar />
    </>
  )
}
