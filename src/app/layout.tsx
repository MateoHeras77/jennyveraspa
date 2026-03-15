import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LocalBusinessSchema } from "@/components/seo/local-schema";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jenny Vera Spa | Centro de Estetica Avanzada en Cuenca",
    template: "%s | Jenny Vera Spa",
  },
  description: "Tratamientos estéticos faciales y corporales, masajes relajantes y cuidados post-operatorios (HIFU, Botox, Drenaje Linfático) en Cuenca, Ecuador.",
  metadataBase: new URL("https://www.jennyveraspa.com"),
  icons: {
    icon: "/logo-black.ico",
    shortcut: "/logo-black.ico",
  },
  openGraph: {
    type: "website",
    locale: "es_EC",
    siteName: "Jenny Vera Spa",
    images: [
      {
        url: "/placeholder.png",
        width: 1200,
        height: 630,
        alt: "Jenny Vera Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/placeholder.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <LocalBusinessSchema />
        {children}
      </body>
    </html>
  );
}
