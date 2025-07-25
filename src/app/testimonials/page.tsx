'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const testimonials = [
  'https://www.youtube.com/embed/s-46qgCXzmo',
  'https://www.youtube.com/embed/2YzeWdsWDd8',
  'https://www.youtube.com/embed/2YzeWdsWDd8',
]

export default function TestimonialPage() {
  return (
    <div className="bg-white text-black">
      {/* Hero Text */}
      <section className="w-full h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extralight leading-tight max-w-4xl"
        >
          Real Results. Real People.
          <br />
          <span className="font-semibold text-blue-900">ZSIDEO Clients Speak For Us.</span>
        </motion.h1>
        <p className="mt-6 max-w-xl text-zinc-600 text-lg">
          Our content fulfillment team doesn&apos;t just deliver — we exceed. From strategy to execution, our clients trust us to make their vision go viral.
        </p>
      </section>

      {/* Testimonial Videos */}
      <section className="px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {testimonials.map((src, i) => (
            <div key={i} className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src={src}
                title={`Testimonial ${i + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          ))}
        </div>

        {/* Call To Action */}
        <div className="text-center mt-20">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            We’re ready when you are.
          </h2>
          <p className="text-lg text-zinc-600 mb-6">
            Join hundreds of creators & brands who’ve scaled their impact with ZSIDEO.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-4 rounded-full text-lg hover:bg-zinc-800 transition"
          >
            Book a Call
          </Link>
        </div>
      </section>

      {/* Extra Section */}
      <section className="bg-zinc-50 px-6 py-24 text-center">
        <h3 className="text-2xl md:text-3xl font-medium mb-6">
          Trusted by top-tier creators, coaches & startups
        </h3>
        <p className="text-zinc-600 max-w-3xl mx-auto">
          Whether you&apso;re building a personal brand or scaling your business, ZSIDEO provides the creative firepower you need to stand out. We craft story-driven content with strategy behind every frame.
        </p>
      </section>
    </div>
  )
}
