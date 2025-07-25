'use client'

import HeroSection from './components/HeroSection'
import GrowthSupportSection from './components/GrowthSupportSection'
import FeaturedVideo from './components/FeaturedVideo'
import EditingSection from './components/EditingSection'
import WebsiteSection from './components/Website'
import RecordingSection from './components/RecordingSection'
import AiCloningSection from './components/AiCloningSection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'


export default function HomePage() {
  return (
    <>
     
      <main className="overflow-x-hidden">
        <HeroSection />
        <FeaturedVideo />
        <GrowthSupportSection />
        <EditingSection/>
        <RecordingSection/>
       < WebsiteSection/>
    
       <AiCloningSection/>

          <CtaSection/>
          <Footer/>
      
      </main>
    </>
  )
}
