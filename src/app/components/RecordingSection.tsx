'use client'

import { motion } from 'framer-motion'

export default function RecordingSection() {
  return (
    <section
      className="w-full h-screen bg-cover bg-center bg-fixed relative px-6 flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/images/videobg.jpg')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl text-center backdrop-blur-sm bg-black/40 p-6 rounded-xl"
      >
        <h2 className="text-4xl md:text-6xl font-semibold my-20 leading-tight">
          Recording With Purpose
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-zinc-200">
          Every shot we record is built for impact — from camera angles to lighting, your short-form content is engineered to grab attention and perform on any platform.
        </p>
        <a
          href="#"
          className="inline-block mt-6 text-sm font-medium text-white underline"
        >
          Explore Recording
        </a>
      </motion.div>
    </section>
  )
}
