"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { track } from "@/lib/analytics";

export function DiagnosticForm() {
  const [sent, setSent] = useState(false);
  const started = useRef(false);

  const begin = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form_name: "diagnostico" });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const specialty = String(form.get("especialidade") ?? "");
    const challenge = String(form.get("desafio") ?? "");
    const message = [
      "Olá! Gostaria de solicitar um diagnóstico de atendimento para minha clínica.",
      `Nome: ${form.get("nome")}`,
      `Clínica: ${form.get("clinica")}`,
      `WhatsApp: ${form.get("whatsapp")}`,
      `Especialidade: ${specialty}`,
      `Principal desafio: ${challenge}`,
    ].join("\n");
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
    const destination = number
      ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    track("generate_lead", {
      form_name: "diagnostico",
      specialty,
      challenge,
      conversion_location: "diagnostic_form",
    });
    setSent(true);
    window.open(destination, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="diagnostic-form" onSubmit={submit} onFocus={begin}>
      <div className="field-grid">
        <label>
          Seu nome
          <input name="nome" required autoComplete="name" placeholder="Como podemos chamar você?" />
        </label>
        <label>
          Nome da clínica
          <input name="clinica" required autoComplete="organization" placeholder="Nome da sua operação" />
        </label>
      </div>
      <div className="field-grid">
        <label>
          WhatsApp
          <input name="whatsapp" required inputMode="tel" autoComplete="tel" placeholder="(11) 99999-9999" />
        </label>
        <label>
          Especialidade principal
          <select name="especialidade" required defaultValue="">
            <option value="" disabled>Selecione</option>
            <option>Estética</option>
            <option>Harmonização</option>
            <option>Odontologia estética</option>
            <option>Depilação</option>
            <option>Outra clínica de procedimentos</option>
          </select>
        </label>
      </div>
      <label>
        Qual é o principal desafio hoje?
        <select name="desafio" required defaultValue="">
          <option value="" disabled>Selecione</option>
          <option>Demora para responder</option>
          <option>Falta de qualificação</option>
          <option>Contatos desorganizados</option>
          <option>Falta de follow-up</option>
          <option>Equipe sem processo definido</option>
        </select>
      </label>
      <button type="submit" className="button button-primary form-button">
        Solicitar diagnóstico <ArrowUpRight size={18} />
      </button>
      <p className="form-privacy">Ao continuar, você será direcionado ao WhatsApp. Não enviamos seus dados para ferramentas de analytics.</p>
      {sent ? <p className="form-success"><CheckCircle2 size={17} /> Conversão registrada. Abrimos o WhatsApp para você continuar.</p> : null}
    </form>
  );
}
