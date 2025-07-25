'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function CtaSection() {
  const [showCalendly, setShowCalendly] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'], // track from container entering viewport to end of container
  })

  const width = useTransform(scrollYProgress, [0, 1], ['60vw', '100vw'])

  useEffect(() => {
    if (showCalendly) {
      const el = document.querySelector('.calendly-inline-widget')
      if (el && !document.querySelector('script[src*="calendly.com"]')) {
        const script = document.createElement('script')
        script.src = 'https://assets.calendly.com/assets/external/widget.js'
        script.async = true
        document.body.appendChild(script)
      }
    }
  }, [showCalendly])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[120vh] flex flex-col items-center justify-center bg-transparent"
    >
      <motion.div
        style={{ width }}
        className="sticky top-[20vh] bg-[#3564ab] rounded-2xl shadow-xl h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="max-w-3xl px-6 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-semibold mb-8">
            Let&apos;s Build Something Brilliant
          </h2>
          {!showCalendly ? (
            <button
              onClick={() => setShowCalendly(true)}
              className="bg-black text-white px-8 py-4 rounded-full text-lg hover:bg-zinc-800 transition duration-300"
            >
              Book a Call
            </button>
          ) : (
            <div className="mt-12">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/d/cv9k-n8v-s84"
                style={{ minWidth: '320px', height: '700px' }}
                data-resize="true"
              ></div>
            </div>
          )}
          <p className="text-xs mt-6 text-zinc-900">
            Powered by <a href="https://calendly.com" className="underline">Calendly</a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
