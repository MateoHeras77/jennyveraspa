import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gray-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Centro de Estética Avanzada en Cuenca
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Especialistas en tratamientos faciales, corporales y cuidados post-operatorios. Resultados que puedes ver y sentir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/contacto">Agendar Cita</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/servicios">Ver Servicios</Link>
              </Button>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src="/placeholder.png" 
              alt="Instalaciones de Jenny Vera Spa Cuenca" 
              width={800} 
              height={600} 
              priority
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
