'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { Cpu, GitBranch, Gauge, ShieldCheck } from 'lucide-react';

type Stat = {
  label: string;
  value: number;        // target number to count to
  suffix?: string;      // e.g., "+", "%", "k+"
  decimals?: number;    // e.g., 1 for 99.9
  icon?: React.ReactNode;
};

const DEFAULT_STATS: Stat[] = [
  { label: 'AI Automations Shipped', value: 120, suffix: '+', icon: <Cpu className="h-6 w-6 text-blue-900" /> },
  { label: 'Hours Automated', value: 25000, suffix: '+', icon: <GitBranch className="h-6 w-6 text-blue-900" /> },
  { label: 'Avg PageSpeed Score', value: 98, suffix: '/100', icon: <Gauge className="h-6 w-6 text-blue-900" /> },
  { label: 'Uptime SLA', value: 99.9, suffix: '%', decimals: 1, icon: <ShieldCheck className="h-6 w-6 text-blue-900" /> },
];

export default function CounterSection({
  stats = DEFAULT_STATS,
  heading = 'Outcomes you can measure',
  subheading = 'Real impact from AI, automations, CRMs, and high-performance web.',
}: {
  stats?: Stat[];
  heading?: string;
  subheading?: string;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-20% 0px -20% 0px' });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="counter-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white to-sky-50 px-6 py-24"
    >
      {/* Top grid glow */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(800px_300px_at_50%_-80px,rgba(30,58,138,0.08),transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-16 max-w-5xl text-center"
      >
        <h2 id="counter-heading" className="text-4xl md:text-6xl font-light tracking-tight text-zinc-900">
          {heading}{' '}
          <span className="italic font-semibold text-blue-900">by ZSIDEO</span>
        </h2>
        <p className="mt-4 text-lg md:text-2xl text-zinc-600">{subheading}</p>
      </motion.div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} start={inView} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ stat, index, start }: { stat: Stat; index: number; start: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white/80 p-8 backdrop-blur-sm shadow-[0_10px_30px_rgba(2,6,23,0.05)] hover:shadow-[0_18px_40px_rgba(2,6,23,0.08)]"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-blue-50 p-3 ring-1 ring-inset ring-blue-100">
          {stat.icon}
        </div>
        <span className="text-sm font-medium tracking-wide text-zinc-500">Metric</span>
      </div>

      <div className="flex items-baseline gap-2">
        <CountUp
          to={stat.value}
          play={start}
          decimals={stat.decimals ?? 0}
          className="text-5xl md:text-6xl font-semibold leading-none tracking-tight text-zinc-900"
        />
        {stat.suffix ? (
          <span className="text-2xl md:text-3xl font-semibold text-blue-900">{stat.suffix}</span>
        ) : null}
      </div>

      <p className="mt-4 text-base md:text-lg text-zinc-700">{stat.label}</p>

      {/* subtle bottom gradient line */}
      <div className="pointer-events-none absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}

/**
 * CountUp – animates numbers smoothly when `play` becomes true.
 * Uses framer-motion's imperative `animate` on a MotionValue for precision.
 */
function CountUp({
  to,
  play,
  duration = 1.8,
  decimals = 0,
  className,
}: {
  to: number;
  play: boolean;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const unsub = mv.on('change', (latest) => {
      setVal(latest);
    });
    return () => unsub();
  }, [mv]);

  useEffect(() => {
    if (!play || hasRunRef.current) return;
    hasRunRef.current = true;

    const controls = animate(mv, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // sleek easeOut
    });

    return () => controls.stop();
  }, [play, to, duration, mv]);

  const text = useMemo(() => formatNumber(val, decimals), [val, decimals]);
  return <span className={className}>{text}</span>;
}

function formatNumber(n: number, decimals: number) {
  const fixed = n.toFixed(decimals);
  // Use Intl for thousands separators
  const [whole, frac] = fixed.split('.');
  const formattedWhole = new Intl.NumberFormat('en-US').format(Number(whole));
  return frac ? `${formattedWhole}.${frac}` : formattedWhole;
}
