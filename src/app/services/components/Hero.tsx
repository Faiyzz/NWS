'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-screen px-6 overflow-hidden">
      {/* subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_300px_at_50%_-120px,rgba(30,58,138,0.08),transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-5xl text-center"
      >
        <h1 className="text-5xl md:text-7xl font-light leading-[1.05] tracking-tight text-zinc-900">
          AI-Driven Services,{' '}
          <span className="font-semibold italic text-blue-900">built to scale.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg md:text-2xl text-zinc-600">
          From chatbots and automations to CRMs, portals, and web apps — ZSIDEO ships
          intelligent software that moves the needle.
        </p>
      </motion.div>
    </section>
  );
}
