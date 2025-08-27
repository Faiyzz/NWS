"use client";

import Image from "next/image";

type Logo = { src: string; alt: string };

const logos: Logo[] = [
  { src: "/logos/next.svg", alt: "Next.js" },
  { src: "/logos/react.svg", alt: "React" },
  { src: "/logos/node.png", alt: "Node.js" },
  { src: "/logos/css.png", alt: "CSS" },
  { src: "/logos/django.svg", alt: "django" },

  { src: "/logos/firebase.png", alt: "firebase" },
  { src: "/logos/HTML.png", alt: "HTML" },
  { src: "/logos/javascript.svg", alt: "javascript" },
  { src: "/logos/webflow.svg", alt: "webflow" },
  { src: "/logos/wordpress.png", alt: "Wordpress" },
  
  { src: "/logos/prisma.webp", alt: "Prisma" },
  { src: "/logos/postgres.png", alt: "PostgreSQL" },


 
  { src: "/logos/n8n.png", alt: "n8n" },
 
];

export default function TechMarquee() {
  // Duplicate for seamless loop
  const track = [...logos, ...logos];

  return (
    <section
      aria-labelledby="stack-heading"
      className="relative overflow-hidden bg-white py-16"
    >
      {/* Heading */}
      <div className="text-center mb-10 px-6">
        <h2
          id="stack-heading"
          className="text-4xl md:text-6xl font-light tracking-tight text-zinc-900"
        >
          Built for the <span className="italic text-blue-900 font-semibold">AI Era</span>
        </h2>
        <p className="mt-3 text-lg md:text-2xl text-zinc-600">
          Our trusted stack for intelligent CRMs, automations, and high-performance web apps.
        </p>
      </div>

      {/* Marquee */}
      <div className="group relative mx-auto w-full max-w-7xl overflow-hidden">
        {/* Edge fade overlays */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent" />

        <div
          className="flex w-max items-center gap-16 will-change-transform"
          aria-hidden="true"
        >
          {/* Track A */}
          <div className="flex animate-z-marquee items-center gap-16 group-hover:[animation-play-state:paused]">
            {track.map((logo, idx) => (
              <LogoItem key={`a-${idx}`} logo={logo} />
            ))}
          </div>

          {/* Track B (offset for seamless loop) */}
          <div className="flex animate-z-marquee items-center gap-16 group-hover:[animation-play-state:paused]">
            {track.map((logo, idx) => (
              <LogoItem key={`b-${idx}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>

      {/* Local styles: marquee keyframes + reduced motion */}
      <style jsx global>{`
        @keyframes z-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-z-marquee {
          animation: z-marquee 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-z-marquee {
            animation: none !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </section>
  );
}

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <div className="relative h-14 w-40 md:h-16 md:w-48 opacity-80 transition-opacity duration-200 hover:opacity-100">
      <Image
        src={logo.src}
        alt={logo.alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 160px, 192px"
        priority={false}
      />
    </div>
  );
}
