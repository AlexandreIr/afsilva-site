"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { track } from "@/lib/analytics";

const items = [
  ["Isso é apenas um chatbot?", "Não. A implantação combina estratégia, organização de dados, fluxos de atendimento, qualificação, acompanhamento e treinamento da equipe. A automação é uma parte da estrutura."],
  ["Funciona com o WhatsApp que já usamos?", "O diagnóstico verifica o cenário atual, o número utilizado, a equipe e as integrações necessárias antes de definir a arquitetura ideal."],
  ["A equipe perde o controle das conversas?", "Não. O objetivo é dar mais clareza para a equipe, registrar contexto e encaminhar os contatos certos para o atendimento humano."],
  ["Vocês prometem agenda cheia?", "Não fazemos promessa de faturamento ou agenda. Organizamos o processo para reduzir perdas, melhorar a consistência e dar visibilidade sobre o atendimento."],
  ["Quanto tempo leva para implantar?", "O cronograma depende dos canais, volume, regras e integrações da clínica. Depois do diagnóstico, você recebe um escopo e uma previsão claros."],
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => {
        const expanded = open === index;
        return (
          <article className="faq-item" key={question}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => {
                const next = expanded ? null : index;
                setOpen(next);
                if (next !== null) track("faq_open", { question });
              }}
            >
              <span>{question}</span>
              <ChevronDown className={expanded ? "rotated" : ""} size={20} />
            </button>
            {expanded ? <p>{answer}</p> : null}
          </article>
        );
      })}
    </div>
  );
}
