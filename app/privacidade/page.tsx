import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Privacidade e dados",
  description: "Saiba como a AFSILVA Tech utiliza métricas e protege dados enviados pelo site.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header><div className="page-container legal-header"><Link href="/"><Logo /></Link><Link href="/" className="back-link"><ArrowLeft size={17} /> Voltar ao site</Link></div></header>
      <article className="page-container legal-content">
        <p className="eyebrow blue">Privacidade e dados</p>
        <h1>Transparência sobre métricas e contato.</h1>
        <p className="legal-intro">Esta página explica, de forma objetiva, quais informações podem ser tratadas durante a navegação e o contato com a AFSILVA Tech.</p>
        <h2>Dados enviados no diagnóstico</h2>
        <p>Nome, clínica, WhatsApp, especialidade e desafio informado são usados exclusivamente para preparar e continuar o contato solicitado. Esses dados não são incluídos nos eventos enviados às ferramentas de analytics.</p>
        <h2>Métricas de navegação</h2>
        <p>Com seu consentimento, podemos medir páginas e seções visualizadas, origem da visita, campanhas, profundidade de rolagem, tempo de engajamento, cliques, abertura de perguntas, início do formulário, conversão e indicadores técnicos de desempenho.</p>
        <h2>Ferramentas opcionais</h2>
        <p>O site está preparado para Google Analytics 4, Microsoft Clarity e Meta Pixel. Essas ferramentas só são carregadas depois da aceitação das métricas e apenas quando seus identificadores estiverem configurados.</p>
        <h2>Cookies e armazenamento local</h2>
        <p>Guardamos sua preferência de consentimento no navegador. Parâmetros de campanha podem ser mantidos durante a sessão para atribuir corretamente a origem de uma conversão.</p>
        <h2>Seus direitos</h2>
        <p>Você pode recusar métricas e alterar sua escolha pelo botão de privacidade no rodapé da tela. Também pode solicitar informações, correção ou exclusão de dados de contato pelos canais oficiais da AFSILVA Tech.</p>
        <h2>Atualizações</h2>
        <p>Última atualização: 14 de julho de 2026. Esta política pode ser revisada quando as ferramentas, finalidades ou processos do site mudarem.</p>
      </article>
    </main>
  );
}
