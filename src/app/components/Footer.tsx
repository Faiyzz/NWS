'use client'

import Link from 'next/link'

const services = [
  { label: 'Recording', href: 'https://recording.zsideo.com' },
  { label: 'Editing', href: 'https://editing.zsideo.com' },
  { label: 'Websites', href: 'https://websites.zsideo.com' },
  { label: 'AI Cloning', href: 'https://ai.zsideo.com' },
]

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold tracking-tight mb-2">ZSIDEO</h2>
          <p className="text-sm text-zinc-400">Crafting growth-driven digital content & platforms.</p>
        </div>

        {/* Services */}
        <div className="text-center">
          <h3 className="text-sm uppercase tracking-wide text-zinc-400 mb-3">Our Services</h3>
          <ul className="flex flex-wrap justify-center gap-4">
            {services.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  target="_blank"
                  className="text-sm hover:text-zinc-300 transition-colors duration-200"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} ZSIDEO. All rights reserved.
      </div>
    </footer>
  )
}
