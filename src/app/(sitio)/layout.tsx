import React from "react";

export default function SitioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="w-full border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-xl text-primary">Jenny Vera Spa</div>
          <nav className="hidden md:flex gap-4">
            <a href="/" className="hover:text-primary transition-colors">Inicio</a>
            <a href="/servicios" className="hover:text-primary transition-colors">Servicios</a>
            <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
            <a href="/contacto" className="hover:text-primary transition-colors">Contacto</a>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="w-full border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Jenny Vera Spa. Todos los derechos reservados.
        </div>
      </footer>
    </>
  );
}
