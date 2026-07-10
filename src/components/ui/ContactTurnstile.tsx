"use client";

import Script from "next/script";
import { useCallback, useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      remove: (widgetId?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

type ContactTurnstileProps = {
  siteKey: string;
  onTokenChange: (token: string | null) => void;
};

export default function ContactTurnstile({
  siteKey,
  onTokenChange,
}: ContactTurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const id = useId();

  const renderWidget = useCallback(() => {
    if (!siteKey || !scriptReady || !containerRef.current || !window.turnstile) {
      return;
    }

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    onTokenChange(null);

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "dark",
      callback: (token) => onTokenChange(token),
      "expired-callback": () => onTokenChange(null),
      "error-callback": () => onTokenChange(null),
    });
  }, [onTokenChange, scriptReady, siteKey]);

  useEffect(() => {
    window.onTurnstileLoad = () => setScriptReady(true);
    if (window.turnstile) {
      setScriptReady(true);
    }
  }, []);

  useEffect(() => {
    renderWidget();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad"
        strategy="lazyOnload"
      />
      <div
        ref={containerRef}
        className="contact-turnstile"
        id={`turnstile-${id}`}
      />
    </>
  );
}
