"use client";

import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Estética Facial",
    description: "Tratamientos personalizados para rejuvenecer y revitalizar tu piel.",
    items: ["HIFU 12D", "Limpieza Profunda", "Peeling Químico"],
    image: "/placeholder.png" // Placeholder
  },
  {
    title: "Estética Corporal",
    description: "Esculpe tu figura y mejora la textura de tu piel con tecnología avanzada.",
    items: ["Drenaje Linfático", "Maderoterapia", "Reductores"],
    image: "/placeholder.png" 
  },
  {
    title: "Post-Operatorio",
    description: "Recuperación acelerada y segura después de procedimientos quirúrgicos.",
    items: ["Masaje Post-Lipo", "Ultrasonido", "Kinesiotaping"],
    image: "/placeholder.png"
  }
];

const testimonials = [
  {
    name: "Carolina M.",
    text: "La atención de Jenny es inigualable. El tratamiento facial cambió mi piel por completo.",
    rating: 5
  },
  {
    name: "Andrea R.",
    text: "Un lugar mágico en Cuenca. Los masajes relajantes son una experiencia de otro nivel.",
    rating: 5
  },
  {
    name: "Gabriela S.",
    text: "Profesionalismo y calidez. Me sentí segura durante todo mi proceso post-operatorio.",
    rating: 5
  }
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1B1B1B] overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] w-full flex items-center bg-[#FDFBF7] overflow-hidden pt-20 lg:pt-0">
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f8f5f0] hidden lg:block"></div>
           <motion.div 
             style={{ y: y1 }}
             className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#D4AF37]/5 blur-[80px]" 
           />
        </div>

        <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center relative z-10">
          
          {/* Text Content - Left Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left py-12 lg:py-0 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 border border-[#D4AF37]/30 rounded-full text-xs font-medium tracking-[0.2em] uppercase text-[#D4AF37] mb-6">
                Bienestar Integral
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] text-[#1B1B1B] mb-8"
            >
              Arte & <br/>
              <span className="italic text-[#D4AF37]">Ciencia</span> <br/>
              Estética
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg font-light text-gray-600 max-w-md mb-10 leading-relaxed"
            >
              Descubre un espacio donde la tecnología avanzada y el cuidado holístico se unen para revelar tu mejor versión.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                href="/contacto"
                className={cn(buttonVariants({ size: "lg" }), "bg-[#1B1B1B] text-white hover:bg-[#D4AF37] rounded-sm px-10 py-7 text-sm tracking-widest uppercase transition-all duration-300")}
              >
                  Agendar Cita
              </Link>
              <Link 
                href="/servicios"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#F5F2EB] rounded-sm px-10 py-7 text-sm tracking-widest uppercase bg-transparent")}
              >
                  Explorar
              </Link>
            </motion.div>
          </div>

          {/* Image - Right Side (Rectangle) */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative">
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="relative w-full h-full overflow-hidden rounded-[2px]"
             >
               {/* Using a high quality Unsplash image for Spa/Esthetics */}
               <Image 
                 src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
                 alt="Jenny Vera Spa Interior"
                 fill
                 className="object-cover"
                 priority
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
               <div className="absolute inset-0 bg-black/10"></div>
             </motion.div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-8 flex flex-col items-center gap-2 hidden lg:flex"
        >
          <span className="text-[10px] tracking-[0.3em] text-[#1B1B1B]/40 uppercase rotate-[-90deg] translate-y-8">Scroll</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-[#1B1B1B]/20 to-transparent"></div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="relative w-full py-12 bg-[#1B1B1B] overflow-hidden rotate-[-1deg] scale-110 origin-center z-20 border-y border-white/10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8">
              <span className="text-4xl md:text-6xl font-serif italic text-white/20 px-4">Belleza</span>
              <Star className="text-[#D4AF37] w-4 h-4" fill="currentColor" />
              <span className="text-4xl md:text-6xl font-serif italic text-white/20 px-4">Bienestar</span>
              <Star className="text-[#D4AF37] w-4 h-4" fill="currentColor" />
              <span className="text-4xl md:text-6xl font-serif italic text-white/20 px-4">Armonía</span>
              <Star className="text-[#D4AF37] w-4 h-4" fill="currentColor" />
            </div>
          ))}
        </div>
      </div>

      {/* PHILOSOPHY SECTION */}
      <section className="py-24 md:py-32 container mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="relative aspect-[4/5] md:aspect-square bg-gray-200 rounded-lg overflow-hidden order-2 lg:order-1">
             {/* Placeholder for About Image - Using a div or Next Image if available */}
             <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-neutral-400">
                <span className="uppercase tracking-widest text-sm">Imagen de Jenny o Espacio</span>
             </div>
             {/* Decorative Frame */}
             <div className="absolute inset-4 border border-white/30 rounded-lg pointer-events-none"></div>
          </FadeIn>
          
          <div className="order-1 lg:order-2">
            <FadeIn>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1B1B1B] mb-8 leading-tight">
                La belleza es un estado de <span className="italic text-[#D4AF37]">armonía.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-gray-600 text-lg font-light leading-relaxed mb-8">
                En Jenny Vera Spa, creemos que cada rostro cuenta una historia única. Nuestro enfoque combina técnicas avanzadas con un cuidado holístico para realzar tu esencia, no para cambiarla.
              </p>
              <p className="text-gray-600 text-lg font-light leading-relaxed mb-8">
                Desde tratamientos faciales de última generación hasta rituales corporales relajantes, cada experiencia está diseñada para detener el tiempo y renovar tu energía vital.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                <span className="font-serif text-xl italic text-[#1B1B1B]">Jenny Vera</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 bg-[#F5F2EB]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <FadeIn className="max-w-xl">
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Nuestros Rituales</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1B1B1B]">Experiencias Curadas</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
               <Link href="/servicios" className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:text-[#D4AF37] transition-colors pb-1 border-b border-transparent hover:border-[#D4AF37]">
                  Ver todo el menú <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FadeIn key={index} delay={index * 0.1} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6 bg-white shadow-sm transition-all duration-500 group-hover:shadow-xl">
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 bg-gray-100 group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center text-gray-300">
                    <span className="uppercase tracking-widest text-xs">Imagen {service.title}</span>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                    <ArrowUpRight className="w-5 h-5 text-[#1B1B1B]" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif text-[#1B1B1B] mb-3 group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
                <p className="text-gray-500 text-sm font-light mb-4 line-clamp-2">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.items.slice(0, 2).map((item, i) => (
                    <span key={i} className="text-xs border border-gray-200 px-2 py-1 rounded-full text-gray-500 bg-white">
                      {item}
                    </span>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 container mx-auto px-6 text-center">
        <FadeIn>
           <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Testimonios</span>
           <h2 className="font-serif text-3xl md:text-5xl text-[#1B1B1B] mb-16">Voces de Confianza</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1} className="p-8 bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.05)] transition-shadow">
              <div className="flex gap-1 mb-6 text-[#D4AF37]">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 font-light italic mb-6 leading-relaxed">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-[#1B1B1B]">
                  {t.name[0]}
                </div>
                <span className="text-sm font-medium tracking-wide">{t.name}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="relative py-32 bg-[#1B1B1B] text-white overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20">
           {/* Abstract shapes or pattern */}
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-[#1B1B1B] to-[#1B1B1B]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-6xl mb-6">Tu mejor versión comienza aquí</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg font-light">
              Agenda tu cita hoy y déjanos cuidar de ti con la excelencia que mereces.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-[#D4AF37] text-white hover:bg-white hover:text-[#1B1B1B] rounded-full px-10 py-7 text-sm tracking-widest uppercase transition-all duration-300"
            >
              Configurar Cita
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
