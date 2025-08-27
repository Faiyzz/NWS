'use client'

import BlurText from './BlurText'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  const handleAnimationComplete = () => {
    console.log('Hero animation completed!')
  }

  return (
    <section className="h-screen w-full bg-white flex flex-col items-center justify-center text-center px-6 relative">
     <div className="max-w-7xl">
 <BlurText
  delay={120}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
  className="text-zinc-900 text-5xl md:text-7xl xl:text-8xl font-light tracking-tight leading-tight mb-12"
>
  ZSIDEO builds the future with <br />{' '}
  <span className="text-blue-900 italic">AI, Automation & Software.</span>{' '}
  
</BlurText>


</div>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <Link
  href="#contact"
  className="inline-block text-lg md:text-xl px-10 py-6 bg-black text-white rounded-full border border-black hover:bg-transparent hover:text-black hover:scale-105 transition-all duration-300 transform"
>
  Let&apos;s Build Something Together
</Link>
      </motion.div>
    </section>
  )
}
