"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Cookie, X } from "lucide-react";
import { track } from "@/lib/analytics";

type Consent = "accepted" | "rejected" | null;

const CONSENT_KEY = "afsilva_analytics_consent";

function appendScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadTrackers() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (gaId) {
    appendScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, "ga4-script");
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag("js", new Date());
    window.gtag("config", gaId, {
      anonymize_ip: true,
      allow_google_signals: false,
      send_page_view: true,
    });
  }

  if (clarityId && !window.clarity) {
    const clarity = function (...args: unknown[]) {
      const fn = window.clarity as unknown as { q?: unknown[] };
      fn.q = fn.q ?? [];
      fn.q.push(args);
    };
    window.clarity = clarity;
    appendScript(`https://www.clarity.ms/tag/${clarityId}`, "clarity-script");
  }

  if (metaId && !window.fbq) {
    type MetaQueue = ((...args: unknown[]) => void) & {
      queue: unknown[][];
      loaded: boolean;
      version: string;
    };
    const fbq = ((...args: unknown[]) => fbq.queue.push(args)) as unknown as MetaQueue;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    appendScript("https://connect.facebook.net/en_US/fbevents.js", "meta-pixel-script");
    window.fbq("init", metaId);
    window.fbq("track", "PageView");
  }
}

export function AnalyticsProvider() {
  const [consent, setConsent] = useState<Consent>(null);
  const [showSettings, setShowSettings] = useState(false);
  const seenSections = useRef(new Set<string>());

  const updateConsent = useCallback((value: Exclude<Consent, null>) => {
    localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
    setShowSettings(false);
    if (value === "accepted") {
      loadTrackers();
      track("consent_update", { analytics_storage: "granted" });
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as Consent;
    const current = stored === "accepted" || stored === "rejected" ? stored : null;
    const consentSync = window.setTimeout(() => setConsent(current), 0);
    if (current === "accepted") loadTrackers();

    const params = new URLSearchParams(window.location.search);
    const attribution = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"]
      .reduce<Record<string, string>>((result, key) => {
        const value = params.get(key);
        if (value) result[key] = value;
        return result;
      }, {});
    if (Object.keys(attribution).length) {
      sessionStorage.setItem("afsilva_attribution", JSON.stringify(attribution));
      track("campaign_attribution", attribution);
    }

    const clickHandler = (event: MouseEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>("[data-analytics-event]");
      if (!element) return;
      track(element.dataset.analyticsEvent ?? "interaction", {
        location: element.dataset.analyticsLocation,
        label: element.dataset.analyticsLabel,
        target: element.getAttribute("href") ?? undefined,
      });
    };
    document.addEventListener("click", clickHandler);

    const sections = document.querySelectorAll<HTMLElement>("[data-analytics-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = (entry.target as HTMLElement).dataset.analyticsSection;
          if (entry.isIntersecting && section && !seenSections.current.has(section)) {
            seenSections.current.add(section);
            track("section_view", { section_name: section });
          }
        });
      },
      { threshold: 0.35 },
    );
    sections.forEach((section) => observer.observe(section));

    const milestones = new Set<number>();
    const scrollHandler = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = Math.round((window.scrollY / scrollable) * 100);
      [25, 50, 75, 90].forEach((milestone) => {
        if (depth >= milestone && !milestones.has(milestone)) {
          milestones.add(milestone);
          track("scroll_depth", { percent_scrolled: milestone });
        }
      });
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    const timers = [15, 30, 60, 120].map((seconds) =>
      window.setTimeout(() => track("engaged_time", { seconds }), seconds * 1000),
    );

    return () => {
      document.removeEventListener("click", clickHandler);
      window.removeEventListener("scroll", scrollHandler);
      observer.disconnect();
      timers.forEach(window.clearTimeout);
      window.clearTimeout(consentSync);
    };
  }, []);

  useEffect(() => {
    if (consent !== "accepted" || typeof PerformanceObserver === "undefined") return;
    const observers: PerformanceObserver[] = [];
    let clsValue = 0;
    let highestInp = 0;
    const observe = (type: string, handler: (entry: PerformanceEntry) => void) => {
      try {
        const observer = new PerformanceObserver((list) => list.getEntries().forEach(handler));
        observer.observe({ type, buffered: true });
        observers.push(observer);
      } catch { /* unsupported metric */ }
    };
    observe("largest-contentful-paint", (entry) => track("web_vital", { metric_name: "LCP", value: Math.round(entry.startTime) }));
    observe("paint", (entry) => {
      if (entry.name === "first-contentful-paint") track("web_vital", { metric_name: "FCP", value: Math.round(entry.startTime) });
    });
    observe("layout-shift", (entry) => {
      const shift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
      if (!shift.hadRecentInput) clsValue += shift.value ?? 0;
    });
    observe("event", (entry) => {
      const interaction = entry as PerformanceEntry & { duration?: number; interactionId?: number };
      if (interaction.interactionId && (interaction.duration ?? 0) > highestInp) highestInp = interaction.duration ?? 0;
    });
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigation) track("web_vital", { metric_name: "TTFB", value: Math.round(navigation.responseStart) });

    const reportFinalVitals = () => {
      track("web_vital", { metric_name: "CLS", value: Math.round(clsValue * 1000) / 1000 });
      if (highestInp) track("web_vital", { metric_name: "INP", value: Math.round(highestInp) });
    };
    window.addEventListener("pagehide", reportFinalVitals, { once: true });
    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("pagehide", reportFinalVitals);
    };
  }, [consent]);

  const bannerVisible = consent === null || showSettings;

  return (
    <>
      {bannerVisible ? (
        <aside className="consent-banner" aria-label="Preferências de privacidade" role="dialog">
          <div className="consent-icon"><Cookie size={22} /></div>
          <div>
            <strong>Privacidade e métricas</strong>
            <p>
              Usamos métricas para entender a navegação e melhorar a experiência. Dados de formulário não são enviados ao analytics.
              {" "}<a href="/privacidade">Saiba mais</a>.
            </p>
          </div>
          <div className="consent-actions">
            <button type="button" className="consent-secondary" onClick={() => updateConsent("rejected")}>Recusar</button>
            <button type="button" className="consent-primary" onClick={() => updateConsent("accepted")}>Aceitar métricas</button>
          </div>
          {showSettings ? (
            <button className="consent-close" aria-label="Fechar preferências" onClick={() => setShowSettings(false)}><X size={18} /></button>
          ) : null}
        </aside>
      ) : (
        <button className="privacy-trigger" type="button" onClick={() => setShowSettings(true)} aria-label="Alterar preferências de privacidade">
          <Cookie size={18} />
        </button>
      )}
    </>
  );
}
