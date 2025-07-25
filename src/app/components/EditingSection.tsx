'use client'

import { useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const videos = [
  '/videos/video1.mp4',
  '/videos/video2.mp4',
  '/videos/video1.mp4',
  '/videos/video2.mp4',
  '/videos/video1.mp4',
  '/videos/video2.mp4',
]

export default function EditingSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -300 : 300,
        behavior: 'smooth',
      })
    }
  }

  const handlePlayMobile = (e: React.TouchEvent<HTMLVideoElement>, index: number) => {
    const allVideos = document.querySelectorAll('video')
    allVideos.forEach((video, i) => {
      if (i !== index) video.pause()
    })
    const target = e.currentTarget
    if (target.paused) {
      target.play()
    } else {
      target.pause()
    }
  }

  useEffect(() => {
    const videos = document.querySelectorAll('video')
    videos.forEach((video) => {
      video.currentTime = 0
    })
  }, [])

  return (
    <section className="bg-white px-6 py-24 text-black min-h-screen">
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h2 className="text-3xl md:text-7xl font-semibold mb-10">Editing for <span className='text-blue-900 italic'> Impact </span></h2>
        <p className="text-base md:text-lg text-zinc-700 mb-10">
          We don&apos;t just cut clips — we create rhythm, story, and punch. Every zoom, caption, and transition is optimized for attention.
        </p>
        <a href="#" className="inline-block mt-6 text-sm font-medium text-black underline">
          Explore Editing
        </a>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 z-10 shadow-md hidden md:block"
        >
          <ChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scroll-smooth no-scrollbar px-2 mb-20"
        >
          {videos.map((src, i) => (
            <div key={i} className="min-w-[250px] max-w-[300px] bg-zinc-100 rounded-xl overflow-hidden">
              <video
                src={src}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover transition duration-300"
                onLoadedMetadata={(e) => (e.currentTarget.currentTime = 0)}
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => e.currentTarget.pause()}
                onTouchStart={(e) => handlePlayMobile(e, i)}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 z-10 shadow-md hidden md:block"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  )
}
