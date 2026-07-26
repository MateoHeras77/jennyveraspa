"use client";

import { useEffect } from "react";
import { META_PIXEL_ID, WHATSAPP_CONTACT_URL } from "@/lib/constants";

// Margen antes de saltar a WhatsApp. El script de Vercel Analytics se carga de
// forma asíncrona y envía el pageview con navigator.sendBeacon; sin esta pausa
// la navegación puede ocurrir antes de que llegue a registrarse y el clic no se
// contaría. Se abre en pestaña nueva (todos los enlaces son target="_blank"),
// así que esta espera no interrumpe la navegación del visitante.
const REDIRECT_DELAY_MS = 400;

export function WhatsAppRedirect() {
  useEffect(() => {
    // Conversión de Meta. Este es el único punto del sitio donde se dispara:
    // todos los CTA de WhatsApp pasan obligatoriamente por esta página puente
    // (ver `whatsappBridgePath` en src/lib/constants.ts), así que un único
    // evento cubre el botón flotante y los CTA de las páginas de servicio.
    //
    // Se envía como baliza de imagen y NO con `fbq('track', …)` a propósito.
    // El Pixel se carga con estrategia `afterInteractive`, que inyecta su script
    // después de la hidratación: cuando corre este efecto `window.fbq` todavía
    // no existe y la llamada se perdería en silencio. Verificado en Playwright —
    // con `fbq` solo se registraba el PageView, nunca el Contact. La baliza no
    // depende de que fbevents.js haya cargado; es el mismo mecanismo que usa el
    // <noscript> oficial de Meta.
    new Image().src =
      `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=Contact&noscript=1`;

    const timer = window.setTimeout(() => {
      // replace() para no dejar esta página en el historial: al volver atrás el
      // visitante regresa a donde estaba, sin re-disparar el redirect.
      window.location.replace(WHATSAPP_CONTACT_URL);
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
