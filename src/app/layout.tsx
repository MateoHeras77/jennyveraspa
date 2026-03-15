import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LocalBusinessSchema } from "@/components/seo/local-schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jenny Vera Spa | Centro de Estética Avanzada en Cuenca",
  description: "Tratamientos estéticos faciales y corporales, masajes relajantes y cuidados post-operatorios (HIFU, Botox, Drenaje Linfático) en Cuenca, Ecuador.",
  metadataBase: new URL('https://www.jennyveraspa.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LocalBusinessSchema />
        {children}
      </body>
    </html>
  );
}
