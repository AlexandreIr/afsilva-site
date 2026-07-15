import type { Metadata, Viewport } from "next";
import { AnalyticsProvider } from "@/components/analytics-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://afsilva.online"),
  title: {
    default: "AFSILVA Tech | Atendimento inteligente para clínicas",
    template: "%s | AFSILVA Tech",
  },
  description:
    "Estrutura inteligente de atendimento no WhatsApp para clínicas responderem, qualificarem, organizarem e acompanharem oportunidades.",
  applicationName: "AFSILVA Tech",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AFSILVA Tech | Atendimento inteligente para clínicas",
    description:
      "Organize o atendimento da sua clínica e acompanhe cada oportunidade com método.",
    url: "https://afsilva.online",
    siteName: "AFSILVA Tech",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AFSILVA Tech | Atendimento inteligente para clínicas",
    description:
      "Atendimento organizado para uma clínica que não pode perder oportunidades.",
  },
  robots: { index: true, follow: true },
  other: { "codex-preview": "development" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06172a",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
