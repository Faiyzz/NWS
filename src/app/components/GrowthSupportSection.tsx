'use client'

import { motion } from 'framer-motion'

const services = [
  {
    title: 'Short-form Video Recording',
    points: [
      'On-location camera setup',
      'Studio lighting & audio',
      'Multiple takes & angles',
      'Framed for Reels, Shorts, TikTok',
      'High-end equipment used',
    ],
  },
  {
    title: 'Editing to Perfection',
    points: [
      'Cutting & trimming with story flow',
      'Auto subtitles & captions',
      'Dynamic zooms, emojis, transitions',
      'Sound design with effects',
      'Output in multiple formats',
    ],
  },
  {
    title: 'Websites That Convert',
    points: [
      'Built with Next.js 15 & Tailwind 4',
      'Lightning-fast load time',
      'SEO-optimized from the ground up',
      'Clean UI/UX, custom animations',
      'Mobile-first & responsive',
    ],
  },
  {
    title: 'AI-Powered Video Creation',
    points: [
      'Generate videos from script',
      'Your face, no filming needed',
      'Great for faceless content',
      'Text-to-video + avatar generation',
      'Perfect for creators short on time',
    ],
  },
]

export default function GrowthSupportSection() {
  return (
    <section className=" min-h-screen w-full bg-sky-100 text-black px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-light text-center max-w-5xl mx-auto mb-40 leading-tight"
      >
        Whatever helps you grow — <br className="hidden md:block" />
        <span className="font-semibold text-blue-900 italic">ZSIDEO has it handled.</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-300 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="md:px-8 py-8 text-center md:text-left"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4">{service.title}</h3>
            <ul className="space-y-2 text-sm md:text-base text-zinc-600">
              {service.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
