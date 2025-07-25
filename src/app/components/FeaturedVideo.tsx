'use client'

import { useEffect, useState } from 'react'

export default function FeaturedVideo() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section className="w-full bg-white py-24 flex justify-center items-center px-4">
      <div className="w-full flex justify-center">
        {isMobile ? (
          // 9:16 for mobile
          <video
            src="/videos/mobile-showreel.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-[320px] h-[608px] rounded-xl shadow-xl"
          />
        ) : (
          // 16:9 for desktop
          <video
            src="/videos/desktop-showreel.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-[80vw] max-w-[1280px] aspect-video rounded-xl shadow-xl"
          />
        )}
      </div>
    </section>
  )
}
