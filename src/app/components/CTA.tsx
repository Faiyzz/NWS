'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CalendarDays, CheckCircle2, ShieldCheck } from 'lucide-react';

/** ================================
 *  BookCallCTA – ZSIDEO
 *  - Lazy modal Calendly embed (iframe) for perf
 *  - Focused, high-converting layout
 *  - Accessible dialog & scroll lock
 *  - No extra libraries
 *  Usage: <BookCallCTA calendlyUrl="https://calendly.com/your-team/30min" />
 * ================================= */
type Props = {
  calendlyUrl: string; // e.g., https://calendly.com/zsideo/discovery
  heading?: string;
  subheading?: string;
  highlights?: string[];
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function CTA({
  calendlyUrl,
  heading = 'Ready to scale ?',
  subheading = 'Book a free strategy call. We’ll map automations, CRMs, and AI agents that move the needle—fast.',
  highlights = ['No obligation', 'Roadmap in 30 minutes', 'We handle setup, hosting & SEO'],
  ctaLabel = "Book your strategy call",
  secondaryHref = '/services',
  secondaryLabel = 'See all services',
}: Props) {
  const [open, setOpen] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Append a default UTM so you can track site conversions in Calendly
  const iframeSrc = useMemo(() => {
    try {
      const url = new URL(calendlyUrl);
      if (!url.searchParams.has('utm_source')) {
        url.searchParams.set('utm_source', 'zsideo-site');
      }
      return url.toString();
    } catch {
      return calendlyUrl;
    }
  }, [calendlyUrl]);

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-white px-6 py-24"
    >
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_300px_at_50%_-120px,rgba(30,58,138,0.08),transparent)]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[1100px] -translate-x-1/2 rounded-full bg-sky-50 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto max-w-5xl text-center"
      >
        <h2
          id="cta-heading"
          className="text-4xl md:text-6xl font-light tracking-tight text-zinc-900"
        >
          {heading}{' '}
          <span className="font-semibold italic text-blue-900">Book a call.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg md:text-2xl text-zinc-600">
          {subheading}
        </p>

        {/* Highlights */}
        <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 text-left sm:text-center">
          {highlights.map((h) => (
            <li key={h} className="inline-flex items-center justify-center gap-2 text-zinc-700">
              <CheckCircle2 className="h-5 w-5 text-blue-800" aria-hidden />
              <span className="text-base md:text-lg">{h}</span>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-blue-900 px-7 py-4 text-lg font-semibold text-white shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-haspopup="dialog"
            aria-controls="calendly-dialog"
          >
            <CalendarDays className="h-5 w-5" aria-hidden />
            {ctaLabel}
          </motion.button>

          <Link
            href={secondaryHref}
            className="rounded-full border border-zinc-300 px-6 py-4 text-lg font-medium text-zinc-800 transition hover:bg-zinc-50"
          >
            {secondaryLabel}
          </Link>
        </div>

        {/* Trust line */}
        <div className="mt-10 inline-flex items-center gap-3 text-sm text-zinc-500">
          <ShieldCheck className="h-4 w-4" aria-hidden />
          <span>Secure booking • Calendar invites & reminders included</span>
        </div>
      </motion.div>

      {/* Calendly Modal */}
      {open && (
        <Dialog onClose={() => setOpen(false)}>
          <div className="relative h-[80vh] w-[92vw] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-200">
            <header className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
              <div className="text-sm font-medium text-zinc-700">Schedule with ZSIDEO</div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-1.5 text-sm text-zinc-500 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Close
              </button>
            </header>

            {/* Lazy-loaded iframe */}
            <iframe
              title="Calendly Scheduling"
              src={iframeSrc}
              className="h-[calc(80vh-45px)] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Dialog>
      )}
    </section>
  );
}

/** Accessible dialog (no deps) */
function Dialog({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

  return (
    <div
      id="calendly-dialog"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] grid place-items-center"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="relative z-[61] max-w-[92vw]"
      >
        {children}
      </motion.div>
    </div>
  );
}
