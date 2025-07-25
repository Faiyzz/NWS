'use client'

import { motion } from 'framer-motion'
import DotGrid from './DotGrid/DotGrid'

export default function AiCloningSection() {
  return (
    <section className="relative min-h-screen bg-white px-6 py-32 text-black overflow-hidden flex items-center">
      {/* 🟣 Animated DotGrid BG */}
      <div className="absolute inset-1 z-0">
  <DotGrid
    dotSize={10}
    gap={15}
    baseColor="#5227FF"
    activeColor="#5227FF"
    proximity={120}
    shockRadius={250}
    shockStrength={5}
    resistance={750}
    returnDuration={1.5}
  />

  {/* 🌀 Radial Blur Edge Overlay */}
  <div className="pointer-events-none absolute inset-0 z-5 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0)_30%,_rgba(255,255,255,1)_100%)]" />
</div>


      {/* ✨ Foreground Glass Text Container */}
     <div className="relative z-10 w-full flex justify-center">
  <div className="relative">
    {/* ✨ Glass Content */}
    <div
  className="relative z-10 max-w-7xl w-full text-center px-6 py-12 backdrop-blur-sm bg-white/10 shadow-xl rounded-2xl"
  style={{
    WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
    maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
  }}
>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-5xl md:text-8xl font-semibold mb-6 leading-tight text-black"
      >
        AI Cloning That Feels <span className='text-blue-900'>Real</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-lg md:text-2xl text-zinc-800 font-light max-w-2xl mx-auto"
      >
        Skip the camera — not the content. Create videos with your face, voice, and script even while you sleep. Personal content on autopilot.
      </motion.p>
      <motion.a
        href="#"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="inline-block mt-6 text-base font-medium text-black underline"
      >
        Explore AI Cloning
      </motion.a>
    </div>

    {/* 🌀 Blurred Edge Effect */}
    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0)_40%,_rgba(255,255,255,0.25)_100%)] blur-md z-0" />
  </div>
</div>

    </section>
  )
}
