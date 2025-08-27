import Hero from "./components/Hero";
import Subnav from "./components/Subnav";
import CTA from "./components/CTA";
import ServiceBlock from "./components/ServiceBlock";
import { SERVICES } from "./data";



export default function ServicesPage() {
    const CALENDLY_URL = "https://calendly.com/d/cv9k-n8v-s84";
  const navItems = SERVICES.map(({ id, title, icon }) => ({ id, title, icon }));

  return (
    <main className="bg-white text-black">
      <Hero />
      <Subnav items={navItems} />
      <section className="mx-auto max-w-7xl px-6 py-16 space-y-16">
        {SERVICES.map((svc, i) => (
          <div id={svc.id} key={svc.id}>
            <ServiceBlock service={svc} flip={i % 2 === 1} />
          </div>
        ))}
      </section>
      <CTA calendlyUrl={CALENDLY_URL} />
    </main>
  );
}
