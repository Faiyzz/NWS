import type { ReactNode } from "react";
import { Brain, Bot, PanelsTopLeft, Globe2, Server } from "lucide-react";

export type ServiceDef = {
  id: string;
  title: string;
  icon: ReactNode;
  summary: string;
  bullets: string[];
  poster: string;
  video?: string;
};

export const SERVICES: ServiceDef[] = [
  {
    id: "ai-automations",
    title: "AI Automations",
    icon: <Brain className="h-7 w-7 text-blue-900" />,
    summary:
      "Automate workflows across sales, ops, and support with reliable, observable pipelines.",
    bullets: [
      "Human-in-the-loop where needed",
      "n8n / custom Node workflows",
      "Logging, retries & alerts",
      "Security & access controls",
    ],
    poster: "/images/services/posters/ai-automations.jpg",
    // video: "/videos/services/ai-automations.mp4",
  },
  {
    id: "chatbots-agents",
    title: "Chatbots & AI Agents",
    icon: <Bot className="h-7 w-7 text-blue-900" />,
    summary:
      "Sales and support agents trained on your data — on web, WhatsApp, or Slack.",
    bullets: ["RAG with your docs/data", "Escalation & guardrails", "Analytics & conversions", "Omnichannel widgets"],
    poster: "/images/services/posters/agents.jpg",
  },
  {
    id: "crms-portals",
    title: "CRMs & Client Portals",
    icon: <PanelsTopLeft className="h-7 w-7 text-blue-900" />,
    summary:
      "Custom CRMs and role-based portals that match your process, not the other way around.",
    bullets: ["Dashboards, approvals, tasks", "Next.js + Prisma + Postgres", "Clean data models & RBAC", "Audit trails & exports"],
    poster: "/images/services/posters/crm.jpg",
  },
  {
    id: "websites-apps",
    title: "Websites & Web Apps",
    icon: <Globe2 className="h-7 w-7 text-blue-900" />,
    summary:
      "High-performance sites and apps with modern UI, SEO, and fast Core Web Vitals.",
    bullets: ["Next.js 15, Tailwind 4", "Framer Motion animations", "A11y & mobile-first", "Headless CMS optional"],
    poster: "/images/services/posters/web.jpg",
  },
  {
    id: "hosting-seo",
    title: "Hosting, DevOps & SEO",
    icon: <Server className="h-7 w-7 text-blue-900" />,
    summary:
      "Vercel/Docker, CI/CD, observability and technical SEO to keep you fast and visible.",
    bullets: ["Staging & previews per PR", "Monitoring & error tracking", "Structured data & sitemaps", "Backups & rollbacks"],
    poster: "/images/services/posters/hosting.jpg",
  },
];
