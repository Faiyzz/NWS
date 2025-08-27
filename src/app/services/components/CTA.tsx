'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
type CTAProps = {
  calendlyUrl: string;
};
export default function CTA({ calendlyUrl }: { calendlyUrl: string }) {
  const [open, setOpen] = useState(false);

  // Append a default UTM for tracking
  const iframeSrc = useMemo(() => {
    try {
      const url = new URL(calendlyUrl);
      if (!url.searchParams.has('utm_source')) {
        url.searchParams.set('utm_source', 'services-page');
      }
      return url.toString();
    } catch {
      return calendlyUrl;
    }
  }, [calendlyUrl]);

  // Scroll anchor
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    // optional: could log view
    void inView;
  }, [inView]);

  return (
    <section id="book" className="relative overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_300px_at_50%_-120px,rgba(30,58,138,0.08),transparent)]" />
      <div ref={ref} className="mx-auto max-w-5xl text-center">
        <h3 className="text-4xl md:text-6xl font-light tracking-tight text-zinc-900">
          Ready to start?{' '}
          <span className="font-semibold italic text-blue-900">Book a call.</span>
        </h3>
        <p className="mx-auto mt-4 max-w-3xl text-lg md:text-2xl text-zinc-600">
          We’ll map the fastest path to impact for your stack — and the exact work we’ll ship in the first 30 days.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-blue-900 px-7 py-4 text-lg font-semibold text-white shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <CalendarDays className="h-5 w-5" />
            Book your strategy call
          </button>
          <Link
            href="/contact"
            className="rounded-full border border-zinc-300 px-6 py-4 text-lg font-medium text-zinc-800 transition hover:bg-zinc-50"
          >
            Contact us
          </Link>
        </div>
      </div>

      {open && <CalendlyDialog src={iframeSrc} onClose={() => setOpen(false)} />}
    </section>
  );
}

function CalendlyDialog({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEsc);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] grid place-items-center"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22 }}
        className="relative z-[61] h-[80vh] w-[92vw] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-200"
      >
        <header className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
          <div className="text-sm font-medium text-zinc-700">Schedule with ZSIDEO</div>
          <button
            onClick={onClose}
            className="rounded-md px-3 py-1.5 text-sm text-zinc-500 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Close
          </button>
        </header>
        <iframe
          title="Calendly Scheduling"
          src={src}
          className="h-[calc(80vh-45px)] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </div>
  );
}
