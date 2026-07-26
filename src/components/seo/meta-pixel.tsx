import Script from "next/script";
import { META_PIXEL_ID } from "@/lib/constants";

/**
 * Pixel de Meta. Registra el PageView de cada página; el evento de conversión
 * (`Contact`) lo dispara la página puente de WhatsApp, que es donde el visitante
 * demuestra intención real — ver `src/app/[locale]/whatsapp/whatsapp-redirect.tsx`.
 *
 * Sirve para construir públicos (reimpacto y similares) a partir del tráfico
 * orgánico. NO mide las campañas de clic-a-mensaje: esas conversiones ocurren
 * dentro de WhatsApp, fuera del sitio, y ya se cuentan con los eventos de
 * mensajería de Meta.
 */
export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
