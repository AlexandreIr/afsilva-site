import {
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  FolderKanban,
  ListChecks,
  Map,
  MessageCircleMore,
  MessagesSquare,
  Settings2,
  Tags,
  Target,
  UsersRound,
  UserRoundCheck,
} from "lucide-react";
import { DiagnosticForm } from "./diagnostic-form";
import { FAQ } from "./faq";
import { Logo } from "./logo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Image from "next/image";

const method = [
  { number: "01", icon: MessageCircleMore, title: "Responder", text: "Respostas padronizadas e contexto disponível para reduzir atrasos e retrabalho." },
  { number: "02", icon: UserRoundCheck, title: "Qualificar", text: "Perguntas estratégicas para entender necessidade, interesse e momento de cada contato." },
  { number: "03", icon: FolderKanban, title: "Organizar", text: "Conversas, informações e próximas ações estruturadas em um fluxo visível para a equipe." },
  { number: "04", icon: BarChart3, title: "Acompanhar", text: "Lembretes e follow-ups para que oportunidades não esfriem por falta de continuidade." },
];

const scope = [
  [Map, "Mapeamento da jornada", "Canais, pontos de contato e gargalos da operação."],
  [MessagesSquare, "Fluxos de atendimento", "Conversas desenhadas para orientar sem robotizar."],
  [Target, "Respostas consultivas", "Diretrizes para dúvidas, objeções e encaminhamentos."],
  [FileText, "Materiais de apoio", "Conteúdo centralizado para respostas mais seguras."],
  [Tags, "Organização de dados", "Etiquetas, campos, interesses e contexto do contato."],
  [Settings2, "Padronização", "Regras claras para automação e atuação humana."],
  [BarChart3, "Indicadores", "Visibilidade sobre entradas, etapas e conversões do funil."],
  [UsersRound, "Treinamento e suporte", "Orientação para o time adotar o processo no dia a dia."],
];

const timeline = [
  ["01", ClipboardCheck, "Diagnóstico", "Entendemos a clínica, o atendimento atual e os principais gargalos."],
  ["02", Map, "Planejamento", "Desenhamos o fluxo, as regras e as informações necessárias."],
  ["03", Settings2, "Implantação", "Configuramos a estrutura, os materiais e as integrações definidas."],
  ["04", UsersRound, "Treinamento", "Capacitamos a equipe para atuar com método e segurança."],
  ["05", CheckCircle2, "Acompanhamento", "Monitoramos o uso e refinamos pontos do processo."],
];

export function ContentSections() {
  return (
    <>
      <section className="section method-section" id="metodo" data-analytics-section="method">
        <div className="page-container">
          <header className="section-heading">
            <p className="eyebrow blue">Quatro resultados que transformam sua rotina</p>
            <h2>Um atendimento que trabalha para sua clínica.</h2>
            <p>Organização para sua equipe atender melhor — com automação na medida certa e participação humana nos momentos importantes.</p>
          </header>
          <div className="method-grid">
            {method.map(({ number, icon: Icon, title, text }) => (
              <article className="method-card" key={title}>
                <div className="method-card-top"><span>{number}</span><Icon size={29} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section audience-section" id="para-clinicas" data-analytics-section="audience">
        <div className="page-container audience-grid">
          <div>
            <p className="eyebrow">Para clínicas que cresceram mais rápido que o atendimento</p>
            <h2>O problema não é falta de procura. É deixar bons contatos se perderem no caminho.</h2>
          </div>
          <div className="pain-list">
            {[
              [Clock3, "Respostas demoradas", "O contato perde o interesse enquanto espera."],
              [ListChecks, "Qualificação fraca", "A equipe conversa sem identificar prioridade e intenção."],
              [FolderKanban, "Informações espalhadas", "Histórico e próximos passos se perdem entre pessoas e canais."],
              [MessageCircleMore, "Sem acompanhamento", "Oportunidades esfriam porque ninguém retoma no momento certo."],
            ].map(([Icon, title, text]) => {
              const PainIcon = Icon as typeof Clock3;
              return <article key={String(title)}><PainIcon size={24} /><div><h3>{String(title)}</h3><p>{String(text)}</p></div></article>;
            })}
          </div>
        </div>
      </section>

      <section className="section scope-section" id="implantacao" data-analytics-section="scope">
        <div className="page-container">
          <header className="section-heading">
            <p className="eyebrow blue">O que sua implantação pode incluir</p>
            <h2>Uma estrutura completa para seu time atender melhor.</h2>
            <p>O escopo final nasce do diagnóstico. Você implementa o que faz sentido para a sua operação — sem adicionar complexidade só para parecer tecnológico.</p>
          </header>
          <div className="scope-grid">
            {scope.map(([Icon, title, text]) => {
              const ScopeIcon = Icon as typeof Map;
              return (
                <article key={String(title)}>
                  <span><ScopeIcon size={24} /></span>
                  <div><h3>{String(title)}</h3><p>{String(text)}</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section timeline-section" data-analytics-section="implementation_timeline">
        <div className="page-container">
          <header className="section-heading">
            <p className="eyebrow blue">Implantação com método e acompanhamento</p>
            <h2>Do diagnóstico à rotina, com clareza.</h2>
          </header>
          <div className="timeline-grid">
            {timeline.map(([number, Icon, title, text]) => {
              const TimelineIcon = Icon as typeof Map;
              return (
                <article key={String(title)}>
                  <span className="timeline-number">{String(number)}</span>
                  <span className="timeline-icon"><TimelineIcon size={25} /></span>
                  <h3>{String(title)}</h3><p>{String(text)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section diagnostic-section" id="diagnostico" data-analytics-section="diagnostic">
        <div className="page-container diagnostic-grid">
          <div className="diagnostic-copy">
            <p className="eyebrow">Próximo passo</p>
            <h2>Descubra onde sua clínica está perdendo oportunidades.</h2>
            <p>Em uma conversa inicial, analisamos o atendimento atual, os canais utilizados e os pontos que mais consomem tempo da equipe.</p>
            <ul>
              <li><CheckCircle2 size={18} /> Diagnóstico do processo atual</li>
              <li><CheckCircle2 size={18} /> Identificação dos principais gargalos</li>
              <li><CheckCircle2 size={18} /> Próximo passo recomendado para sua operação</li>
            </ul>
            <a
              className="button button-inline"
              href={buildWhatsAppUrl({ message: "Olá! Quero conversar sobre uma estrutura de atendimento no WhatsApp para minha clínica." })}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="cta_click"
              data-analytics-location="diagnostic_section"
              data-analytics-label="WhatsApp direto"
            >
              <MessageCircleMore size={18} aria-hidden="true" />
              Falar agora pelo WhatsApp
            </a>
          </div>
          <DiagnosticForm />
        </div>
      </section>

      <section className="section faq-section" id="faq" data-analytics-section="faq">
        <div className="page-container faq-grid">
          <div>
            <p className="eyebrow blue">Perguntas frequentes</p>
            <h2>Clareza antes da implantação.</h2>
            <p>A tecnologia deve deixar a operação mais simples. Estas são as dúvidas mais comuns antes do diagnóstico.</p>
          </div>
          <FAQ />
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-container footer-grid">
          <div><Image src="/afsilva-logo-reverse.svg" alt="AFSILVA Tech" width={150} height={150} />
          <p>Estruturas inteligentes de atendimento para clínicas.</p></div>
          <div><strong>Navegação</strong><a href="#metodo">Método</a><a href="#implantacao">Implantação</a><a href="#diagnostico">Diagnóstico</a></div>
          <div>
            <strong>Contato</strong>
            <a href={buildWhatsAppUrl({ message: "Olá! Gostaria de conversar sobre atendimento inteligente para minha clínica." })} target="_blank" rel="noreferrer" data-analytics-event="cta_click" data-analytics-location="footer" data-analytics-label="WhatsApp footer">WhatsApp</a>
            <span>Métricas com consentimento</span>
          </div>
        </div>
        <div className="page-container footer-bottom"><span>© {new Date().getFullYear()} AFSILVA Tech.</span><span>Atendimento inteligente com responsabilidade.</span></div>
      </footer>
    </>
  );
}
