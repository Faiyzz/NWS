'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const websiteProjects = [
  '/images/project1.jpg',
  '/images/project2.jpeg',
  '/images/project3.png',
  '/images/project4.webp',
  '/images/project1.jpg',
  '/images/project3.png',
]

export default function WebsiteSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -320 : 320,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="w-full min-h-screen bg-white text-black flex flex-col justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-7xl font-semibold mb-12">Websites That <span className='text-blue-900 font-italic'>Convert </span></h2>
        <p className="text-base md:text-lg text-zinc-700 max-w-3xl mx-auto mb-12">
          We build blazing-fast, SEO-optimized websites that sell your brand in seconds — not just showcase it.
        </p>
        <a
          href="#"
          className="inline-block mt-6 text-sm font-medium text-black underline"
        >
          Explore Websites
        </a>
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 z-10 shadow-md hidden md:block"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Image Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-hidden px-2 scroll-smooth"
        >
          {websiteProjects.map((src, i) => (
            <div
              key={i}
              className="min-w-[280px] max-w-[320px] rounded-xl overflow-hidden shadow-md shrink-0"
            >
              <Image
                src={src}
                alt={`Project ${i + 1}`}
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 z-10 shadow-md hidden md:block"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}
