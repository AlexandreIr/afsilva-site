# Analytics da AFSILVA Tech

O site possui uma camada única de eventos e integrações opcionais com Google Analytics 4, Microsoft Clarity e Meta Pixel. Os scripts externos só carregam depois do consentimento.

## Configuração

Copie `.env.example` para `.env.local` no desenvolvimento ou cadastre as mesmas variáveis no provedor de deploy.

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: propriedade GA4.
- `NEXT_PUBLIC_CLARITY_PROJECT_ID`: projeto Microsoft Clarity.
- `NEXT_PUBLIC_META_PIXEL_ID`: pixel da Meta.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número de destino com DDI e DDD.

Sem identificadores, o site continua funcional e mantém os eventos em `window.__afsilvaEvents` para inspeção local, mas não persiste métricas externamente.

## Eventos instrumentados

| Evento | Quando acontece | Parâmetros principais |
| --- | --- | --- |
| `section_view` | Primeira visualização de cada seção | `section_name` |
| `cta_click` | Cliques nos CTAs | `location`, `label`, `target` |
| `navigation_click` | Navegação pelo menu | `label`, `target` |
| `scroll_depth` | 25%, 50%, 75% e 90% da página | `percent_scrolled` |
| `engaged_time` | 15, 30, 60 e 120 segundos | `seconds` |
| `form_start` | Primeiro foco no formulário | `form_name` |
| `generate_lead` | Envio do diagnóstico | `specialty`, `challenge`, `conversion_location` |
| `faq_open` | Abertura de pergunta | `question` |
| `campaign_attribution` | Visita com UTM ou GCLID | UTMs disponíveis |
| `web_vital` | LCP, FCP, CLS, INP e TTFB no navegador | `metric_name`, `value` |
| `consent_update` | Aceite de métricas | `analytics_storage` |

Nunca envie nome, telefone, texto livre ou outro dado pessoal nos parâmetros de eventos.

## Painel recomendado no GA4

Marque `generate_lead` como evento principal. Crie comparações por `utm_source`, `utm_campaign`, dispositivo e página de entrada. Acompanhe o funil `page_view` → `section_view:diagnostic` → `form_start` → `generate_lead` e avalie a taxa de conversão por canal.

No Clarity, use gravações e mapas de calor apenas para investigar fricções de layout, rolagem e interação; não use o conteúdo digitado no formulário para análise.
