# AFSILVA Tech

Site institucional e landing page de conversão para a oferta **Implantação de Atendimento Inteligente AFSILVA**.

## O que está incluído

- Next.js 16, React 19, TypeScript e Tailwind CSS 4.
- Layout responsivo inspirado na identidade visual azul-marinho, azul-sinal e ciano da AFSILVA Tech.
- Jornada visual do lead no hero.
- Seções de método, problemas, escopo, implantação, diagnóstico e FAQ.
- Formulário que monta a mensagem e encaminha o lead ao WhatsApp.
- Página de privacidade e consentimento compatível com a estratégia LGPD.
- SEO técnico: metadata, canonical, Open Graph, dados estruturados, sitemap e robots.
- Integração opcional com GA4, Microsoft Clarity e Meta Pixel.
- Eventos de conversão, engajamento, atribuição de campanhas e Core Web Vitals.

## Requisitos

- Node.js 22.13 ou superior.
- npm.

## Desenvolvimento local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configure `.env.local` antes de testar o WhatsApp e as integrações de métricas.

## Variáveis de ambiente

| Variável | Finalidade |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de destino com DDI e DDD, apenas dígitos |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Identificador da propriedade GA4 |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Identificador do projeto Microsoft Clarity |
| `NEXT_PUBLIC_META_PIXEL_ID` | Identificador do Meta Pixel |

O site funciona sem essas variáveis. Sem o número, o WhatsApp abre a seleção de contato; sem os identificadores, nenhum serviço externo de analytics é carregado.

## Validação e build

```bash
npm run lint
npm run build
npm run validate:artifact
```

O build gera o artefato ESM Worker usado pela hospedagem do projeto.

## Analytics

Consulte [ANALYTICS.md](./ANALYTICS.md) para ver o catálogo de eventos, o funil recomendado no GA4 e as regras de privacidade. O evento `generate_lead` deve ser marcado como evento principal na propriedade GA4.

Dados pessoais digitados no formulário não são enviados aos eventos de analytics.
