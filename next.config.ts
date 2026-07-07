import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [70, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'self';",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async redirects() {
    // Mapa de migración: URLs del sitio anterior (planas, sin locale) hacia su
    // equivalente actual. Deben vivir aquí (no en el proxy) porque los
    // redirects de next.config se evalúan antes que la detección de idioma,
    // evitando cadenas 307 → 404. Fuente: GSC, páginas legacy con impresiones.
    const legacyMap: Record<string, string> = {
      // Servicios
      '/hifu': '/es/servicios/hifu',
      '/depilacion-definitiva-con-laser': '/es/servicios/depilacion-laser',
      '/limpiezas-faciales-profundas': '/es/servicios/limpieza-facial',
      '/tratamientos-faciales-segun-tipo-de-piel': '/es/servicios/limpieza-facial',
      '/cirugia-estetica': '/es/servicios',
      // Blog (slug idéntico)
      '/tratamientos-de-acne': '/es/servicios/tratamiento-acne',
      '/despigmentacion-de-axilas': '/es/servicios/despigmentacion-axilas',
      '/despigmentacion-en-zonas-intimas': '/es/servicios/despigmentacion-zonas-intimas',
      '/drenaje-linfatico-facial': '/es/servicios/drenaje-linfatico-facial',
      '/drenaje-linfatico-postoperatorio': '/es/blog/drenaje-linfatico-postoperatorio',
      '/hidratacion-profunda-con-vitamina-c': '/es/blog/hidratacion-profunda-con-vitamina-c',
      '/plasma-rico-en-plaquetas': '/es/servicios/plasma-rico-plaquetas',
      '/tratamiento-intimo-con-hifu': '/es/servicios/hifu-intimo',
      '/masajes-relajantes': '/es/servicios/masajes-relajantes',
      '/masajes-relajantes-en-cuenca-ecuador': '/es/blog/masajes-relajantes-en-cuenca-ecuador',
      '/lipoescultura-sin-cirugia-tratamientos-efectivos-comparativa-liposuccion-tradicional':
        '/es/blog/lipoescultura-sin-cirugia-tratamientos-efectivos-comparativa-liposuccion-tradicional',
      '/mejores-tratamientos-corporales-reducir-grasa-localizada-celulitis':
        '/es/blog/mejores-tratamientos-corporales-reducir-grasa-localizada-celulitis',
      // Blog (slug equivalente)
      '/botox': '/es/servicios/botox',
      '/todo-sobre-botox-usos-cuidados-costos': '/es/servicios/botox',
      '/masaje-relajante': '/es/servicios/masajes-relajantes',
      '/tipos-de-masajes-corporales-beneficios': '/es/blog/masajes-relajantes-en-cuenca-ecuador',
      '/alternativas-liposuccion-sin-cirugia-criolipolisis-laser-ultrasonido-focalizado':
        '/es/blog/lipoescultura-sin-cirugia-tratamientos-efectivos-comparativa-liposuccion-tradicional',
      '/blefaroplastia-en-ecuador': '/es/blog/todo-sobre-blefaroplastia',
      '/rinoplastia-en-ecuador': '/es/blog/rinoplastia-ecuador-todo-lo-que-necesitas-saber',
      '/tipos-de-nariz-segun-su-forma-y-estructura-procedimientos-esteticos':
        '/es/blog/rinoplastia-ecuador-todo-lo-que-necesitas-saber',
      '/comparativa-lifting-facial-botox-mejor-opcion':
        '/es/blog/lifting-facial-procedimientos-quirurgicos-opciones-no-invasivas',
      '/cuidados-postoperatorios-cirugias-esteticas-rinoplastia-liposuccion-blefaroplastia':
        '/es/blog/tratamientos-post-operatorios',
      '/diferencias-procedimientos-esteticos-cirugias-plasticas-beneficios-recomendaciones':
        '/es/blog',
      '/tratamiento-de-hidratacion-facial-profunda': '/es/blog/hidrataciones-faciales-profundas',
      // Otras
      '/agenda-un-cita': '/es/contacto',
    };

    return [
      ...Object.entries(legacyMap).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      // Rutas nuevas compartidas sin prefijo de locale (indexadas por error):
      // redirect permanente en vez de la negociación 307 del proxy.
      {
        source: '/blog/:path*',
        destination: '/es/blog/:path*',
        permanent: true,
      },
      {
        source: '/servicios/:path*',
        destination: '/es/servicios/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
