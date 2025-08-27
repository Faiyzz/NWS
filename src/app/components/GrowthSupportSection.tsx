'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Brain, PanelsTopLeft, Globe2, Server, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

type Service = {
  title: string;
  icon: JSX.Element;
  points: string[];
  image: string;
  alt: string;
};

const services: Service[] = [
  {
    title: 'AI & Automations',
    icon: <Brain className="h-9 w-9 text-blue-900" />,
    points: ['AI agents & chatbots', 'Workflow automation', 'Smart integrations'],
    image: '/images/services/aichat.png',
    alt: 'AI & Automations',
  },
  {
    title: 'CRMs & Portals',
    icon: <PanelsTopLeft className="h-9 w-9 text-blue-900" />,
    points: ['Custom CRMs', 'Client dashboards', 'Team collaboration'],
    image: '/images/services/crm.png',
    alt: 'CRMs & Client Portals',
  },
  {
    title: 'Websites & Web Apps',
    icon: <Globe2 className="h-9 w-9 text-blue-900" />,
    points: ['Next.js & Tailwind builds', 'SEO-optimized', 'Fast & responsive'],
    image: '/images/services/Web-Services.png',
    alt: 'Websites & Web Apps',
  },
  {
    title: 'Hosting & SEO',
    icon: <Server className="h-9 w-9 text-blue-900" />,
    points: ['Reliable cloud hosting', 'Performance tuning', 'Search visibility'],
    image: '/images/services/Hosting.png',
    alt: 'Hosting & SEO',
  },
];

export default function GrowthSupportSection() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-white to-sky-50 text-black px-6 py-24">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-light leading-tight tracking-tight">
          Whatever helps you grow —{' '}
          <span className="font-semibold text-blue-900 italic">ZSIDEO has it handled.</span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-zinc-700">
          From AI automations to websites and CRMs, we deliver the essentials your business needs to
          scale — fast, smart, and future-ready.
        </p>
      </motion.div>

      {/* Alternating pairs: card | image , image | card */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {services.map((service, index) => (
          <React.Fragment key={service.title}>
            {/* Left cell */}
            {index % 2 === 0 ? (
              <ServiceCard service={service} index={index} />
            ) : (
              <ServiceImage service={service} index={index} />
            )}

            {/* Right cell */}
            {index % 2 === 0 ? (
              <ServiceImage service={service} index={index} />
            ) : (
              <ServiceCard service={service} index={index} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-16 text-center">
        <Link href="/services">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 text-lg font-semibold rounded-full bg-blue-900 text-white shadow-md hover:shadow-lg transition"
          >
            Explore All Services →
          </motion.button>
        </Link>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.05 }}
      viewport={{ once: true, margin: '-40px' }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 border border-zinc-200 shadow-lg hover:shadow-2xl transition-shadow flex flex-col min-h-[420px]"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="mx-auto md:mx-0">{service.icon}</div>
        <h3 className="text-2xl md:text-3xl font-semibold text-center md:text-left">
          {service.title}
        </h3>
      </div>

      <ul className="space-y-4 text-lg text-zinc-700 mt-2">
        {service.points.map((point) => (
          <li key={point} className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-blue-700" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link
          href={`/services#${slugify(service.title)}`}
          className="inline-block text-blue-900 font-semibold hover:underline"
        >
          Learn more →
        </Link>
      </div>
    </motion.div>
  );
}

function ServiceImage({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
      viewport={{ once: true, margin: '-40px' }}

      className="relative h-[420px] md:h-[460px] group"   // no border/radius/shadow/overflow
    >
      <Image
        src={service.image}
        alt={service.alt}
        fill
        priority={false}

        className="object-contain transition-transform duration-700 group-hover:scale-105 bg-transparent"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* removed dark overlay so PNG transparency stays clean */}
      <div className="absolute bottom-5 left-6 right-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-zinc-900 shadow">
          {service.icon}
          {service.title}
        </span>
      </div>
    </motion.div>
  );
}

function slugify(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}
