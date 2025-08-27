'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export type ServiceNavItem = {
  id: string;               // section id (e.g., "ai-automations")
  title: string;            // accessible label
  icon: React.ReactNode;    // <Brain className="h-5 w-5" />
};

export default function LeftSubnav({
  items,
  offsetTop = 96,           // header offset for smooth scroll
  className = '',
}: {
  items: ServiceNavItem[];
  offsetTop?: number;
  className?: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  // Scroll spy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const onIntersect: IntersectionObserverCallback = (entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
    };
    const opts: IntersectionObserverInit = {
      root: null,
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0.01,
    };
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (!el) return;
      const io = new IntersectionObserver(onIntersect, opts);
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  // Smooth scroll with offset
  const handleClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - offsetTop - 12;
    window.scrollTo({ top: y, behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <aside
      className={[
        // fixed, vertically centered, 65vh tall, narrow, rounded RIGHT corners only
        'hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-40',
        'h-[65vh] w-[72px] rounded-r-3xl border border-l-0 border-zinc-200',
        'bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-md',
        className,
      ].join(' ')}
      aria-label="Services navigation"
    >
      <nav className="flex h-full flex-col items-center justify-center gap-3 px-3 py-4">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <Link
              key={it.id}
              href={`#${it.id}`}
              onClick={handleClick(it.id)}
              aria-current={isActive ? 'true' : undefined}
              className={[
                'group relative grid h-12 w-12 place-items-center rounded-2xl transition',
                isActive
                  ? 'bg-blue-50 text-blue-900 ring-1 ring-blue-200'
                  : 'text-zinc-600 hover:bg-zinc-50',
              ].join(' ')}
            >
              {/* icon only */}
              <span aria-hidden>{it.icon}</span>
              {/* accessible label (not visible) */}
              <span className="sr-only">{it.title}</span>

              {/* active indicator bar on the right edge */}
              {isActive && (
                <span className="pointer-events-none absolute right-[-2px] top-1/2 h-8 w-1.5 -translate-y-1/2 rounded-l-full bg-blue-600" />
              )}

              {/* hover tooltip (optional, remove if you want truly icon-only) */}
              <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 rounded-md bg-zinc-900/90 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                {it.title}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
