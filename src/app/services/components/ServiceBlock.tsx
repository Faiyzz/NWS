'use client';

import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { ServiceDef } from '../data';
import { CheckCircle2, Play } from 'lucide-react';

export default function ServiceBlock({
  service,
  flip,
}: {
  service: ServiceDef;
  flip?: boolean;
}) {
  return (
   <section
  id={service.id}
  aria-labelledby={`${service.id}-title`}
  className="relative isolate"
>



      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          className={[
            'grid gap-10 lg:gap-16',
            'lg:grid-cols-12',
            'min-h-[90svh] py-16 md:py-24',
          ].join(' ')}
        >
          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={[
              'lg:col-span-6',
              flip ? 'lg:order-2' : 'lg:order-1',
              'self-center',
            ].join(' ')}
          >
            <div className="relative rounded-3xl border border-zinc-200/70 bg-white/85 p-10 md:p-12 shadow-[0_20px_60px_rgba(2,6,23,0.07)] backdrop-blur supports-[backdrop-filter]:bg-white/70">
              {/* subtle gradient ring */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] [mask:linear-gradient(#000,transparent_80%)] ring-1 ring-inset ring-white/40" />
              <div className="mb-7 flex items-center gap-4">
                <div className="rounded-2xl bg-blue-50 p-3 ring-1 ring-inset ring-blue-100">
                  {service.icon as ReactNode}
                </div>
                <h2
                  id={`${service.id}-title`}
                  className="text-3xl md:text-5xl font-semibold tracking-tight"
                >
                  {service.title}
                </h2>
              </div>

              <p className="text-lg md:text-xl leading-relaxed text-zinc-700">
                {service.summary}
              </p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-800" />
                    <span className="text-base md:text-lg text-zinc-800">{b}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Bar */}
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href={`/contact?topic=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center justify-center rounded-full bg-blue-900 px-6 py-3 text-sm font-semibold text-white shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  Discuss {service.title}
                </Link>
                <a
                  href="#book"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  Book a call
                </a>

                {/* Trust microcopy */}
                <div className="ml-2 text-xs text-zinc-500">
                  No pushy sales—just clarity on scope, timeline, and budget.
                </div>
              </div>
            </div>
          </motion.div>

          {/* MEDIA SIDE (sticky on desktop for an editorial feel) */}
           <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
        className={`lg:col-span-6 ${flip ? 'lg:order-1' : 'lg:order-2'} flex items-center`}
      >
        <div className="w-full lg:sticky lg:top-24">
          <PremiumMedia
            poster={service.poster}
            videoSrc={service.video}
            title={service.title}
          />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Elevated media card with luxe frame, soft glow, and refined play overlay */
function PremiumMedia({
  poster,
  videoSrc,
  title,
}: {
  poster: string;
  videoSrc?: string;
  title: string;
}) {
  const [play, setPlay] = useState(false);

  return (
    <div className="relative isolate">
      {/* Glow frame */}
      <div className="pointer-events-none absolute -inset-1 -z-10 rounded-[28px] bg-gradient-to-br from-blue-500/15 via-indigo-400/10 to-emerald-400/10 blur-xl" />
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/80 shadow-[0_18px_50px_rgba(2,6,23,0.10)] backdrop-blur supports-[backdrop-filter]:bg-white/65">
        {!play && (
          <Image
            src={poster}
            alt={`${title} preview`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 48vw"
            priority={false}
          />
        )}

        {play && videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            controls
            className="h-full w-full object-cover"
            poster={poster}
          />
        ) : null}

        {/* Overlay control */}
        {!play && (
          <button
            onClick={() => videoSrc && setPlay(true)}
            className="absolute inset-0 grid place-items-center bg-gradient-to-t from-black/35 via-black/10 to-transparent"
            aria-label={videoSrc ? 'Play video preview' : 'Video coming soon'}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-md">
              <Play className="h-4 w-4" />
              {videoSrc ? 'Play preview' : 'Video coming soon'}
            </span>
          </button>
        )}
      </div>

      {/* Caption */}
      <p className="mt-3 text-sm text-zinc-500">
        Sample from <span className="font-medium text-zinc-700">{title}</span>
      </p>
    </div>
  );
}
