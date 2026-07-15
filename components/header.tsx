"use client";

import { useState } from "react";
import { CalendarCheck, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import Image from "next/image";

const links = [
  ["Método", "#metodo"],
  ["Para clínicas", "#para-clinicas"],
  ["Implantação", "#implantacao"],
  ["FAQ", "#faq"],
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="page-container header-inner">
        <a href="#inicio" className="brand-link" aria-label="Ir para o início">
          <Image src="/afsilva-logo-reverse.svg" alt="AFSILVA Tech" width={150} height={150} />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              data-analytics-event="navigation_click"
              data-analytics-label={label}
            >{label}</a>
          ))}
          <a
            className="button button-small"
            href="#diagnostico"
            data-analytics-event="cta_click"
            data-analytics-location="header"
            data-analytics-label="Agendar diagnóstico"
          >
            <CalendarCheck size={17} aria-hidden="true" />
            Agendar diagnóstico
          </a>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <nav className="mobile-nav" aria-label="Navegação móvel">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              data-analytics-event="navigation_click"
              data-analytics-label={label}
            >{label}</a>
          ))}
          <a
            className="button button-primary"
            href="#diagnostico"
            onClick={() => setOpen(false)}
            data-analytics-event="cta_click"
            data-analytics-location="mobile_menu"
            data-analytics-label="Agendar diagnóstico"
          >
            Agendar diagnóstico
          </a>
        </nav>
      ) : null}
    </header>
  );
}
