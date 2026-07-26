"use client";

import { useEffect } from "react";
import { WHATSAPP_CONTACT_URL } from "@/lib/constants";

// Margen antes de saltar a WhatsApp. El script de Vercel Analytics se carga de
// forma asíncrona y envía el pageview con navigator.sendBeacon; sin esta pausa
// la navegación puede ocurrir antes de que llegue a registrarse y el clic no se
// contaría. Se abre en pestaña nueva (todos los enlaces son target="_blank"),
// así que esta espera no interrumpe la navegación del visitante.
const REDIRECT_DELAY_MS = 400;

export function WhatsAppRedirect() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      // replace() para no dejar esta página en el historial: al volver atrás el
      // visitante regresa a donde estaba, sin re-disparar el redirect.
      window.location.replace(WHATSAPP_CONTACT_URL);
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
