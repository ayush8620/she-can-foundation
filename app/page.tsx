import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
