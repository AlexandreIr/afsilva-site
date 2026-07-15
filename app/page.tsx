import { CalendarCheck, MessageCircleMore, LockKeyhole } from "lucide-react";
import { Header } from "@/components/header";
import { LeadJourney } from "@/components/lead-journey";
import { ContentSections } from "@/components/content-sections";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AFSILVA Tech",
  url: "https://afsilva.online",
  description:
    "Implantação de estruturas inteligentes de atendimento no WhatsApp para clínicas.",
  areaServed: "BR",
  serviceType: "Automação e organização de atendimento no WhatsApp",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Clínicas de estética, harmonização e odontologia estética",
  },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="hero-shell" id="inicio" data-analytics-section="hero">
        <Header />
        <div className="hero-grid page-container">
          <div className="hero-copy">
            <p className="eyebrow">Implantação de atendimento inteligente</p>
            <h1>
              Atendimento organizado para uma clínica que não pode perder
              oportunidades.
            </h1>
            <span className="title-accent" aria-hidden="true" />
            <p className="hero-description">
              Implantamos uma estrutura inteligente no WhatsApp para sua clínica
              responder, qualificar, organizar e acompanhar cada novo contato com
              método e consistência.
            </p>
            <div className="hero-actions">
              <div className="hero-cta-group">
                <a
                  className="button button-primary"
                  href={buildWhatsAppUrl({ message: "Olá! Quero agendar um diagnóstico estratégico para minha clínica." })}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-event="cta_click"
                  data-analytics-location="hero"
                  data-analytics-label="WhatsApp diagnóstico"
                >
                  <MessageCircleMore size={19} aria-hidden="true" />
                  Falar no WhatsApp
                </a>
                <a
                  className="button button-secondary"
                  href="#diagnostico"
                  data-analytics-event="cta_click"
                  data-analytics-location="hero"
                  data-analytics-label="Agendar diagnóstico"
                >
                  <CalendarCheck size={19} aria-hidden="true" />
                  Agendar diagnóstico
                </a>
              </div>
              <p className="safe-note">
                <LockKeyhole size={14} aria-hidden="true" />
                Diagnóstico estratégico e sem compromisso
              </p>
            </div>
          </div>
          <LeadJourney />
        </div>
      </section>
      <ContentSections />
    </main>
  );
}
