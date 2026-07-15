export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    __afsilvaEvents?: Array<{ event: string; params: AnalyticsParams; at: string }>;
  }
}

export function track(event: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const sanitized = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );

  window.__afsilvaEvents = window.__afsilvaEvents ?? [];
  window.__afsilvaEvents.push({
    event,
    params: sanitized,
    at: new Date().toISOString(),
  });

  const consent = localStorage.getItem("afsilva_analytics_consent");
  if (consent !== "accepted") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...sanitized });

  if (window.gtag) window.gtag("event", event, sanitized);
  if (window.clarity) window.clarity("event", event);

  if (event === "generate_lead" && window.fbq) {
    window.fbq("track", "Lead", sanitized);
  }
}
