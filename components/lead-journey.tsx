import { CalendarClock, Instagram, MessageCircleMore, UserRoundCheck } from "lucide-react";

const steps = [
  {
    icon: MessageCircleMore,
    title: "Novo contato",
    description: "Mensagem recebida agora",
    status: "Recebido",
    color: "blue",
  },
  {
    icon: UserRoundCheck,
    title: "Qualificação",
    description: "Interesse e contexto identificados",
    status: "Qualificado",
    color: "cyan",
  },
  {
    icon: CalendarClock,
    title: "Acompanhamento",
    description: "Follow-up no momento certo",
    status: "Em acompanhamento",
    color: "blue",
  },
];

export function LeadJourney() {
  return (
    <div className="journey-card" aria-label="Exemplo da jornada de atendimento">
      <p className="journey-label">Jornada do lead</p>
      <div className="journey-layout">
        <div className="journey-sources" aria-hidden="true">
          <span className="source-icon instagram"><Instagram size={24} /></span>
          <small>Instagram</small>
          <span className="source-line" />
          <span className="source-icon whatsapp"><MessageCircleMore size={25} /></span>
          <small>WhatsApp</small>
        </div>
        <div className="journey-steps">
          {steps.map(({ icon: Icon, title, description, status, color }, index) => (
            <div className="journey-step-wrap" key={title}>
              <article className="journey-step">
                <span className={`step-icon ${color}`}><Icon size={20} /></span>
                <div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <span className="step-status"><i className={color} />{status}</span>
                </div>
              </article>
              {index < steps.length - 1 ? <span className="step-arrow" aria-hidden="true">↓</span> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
