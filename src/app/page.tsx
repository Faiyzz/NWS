'use client'

import HeroSection from './components/HeroSection'
import GrowthSupportSection from './components/GrowthSupportSection'
import TechMarquee from './components/TechMarquee'

import CTA from './components/CTA'
import WebsiteSection from './components/Website'



import Footer from './components/Footer'
import CounterSection from './components/CounterSection'




export default function HomePage() {
  return (
    <>
     
      <main className="overflow-x-hidden">
        <HeroSection />
        <TechMarquee/>
        <GrowthSupportSection />
       <CounterSection/>
        
   
       < WebsiteSection/>
    
     <CTA/>

       
          <Footer/>
      
      </main>
    </>
  )
}
