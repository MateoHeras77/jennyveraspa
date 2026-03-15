"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { BlogPostSummary } from "@/lib/blog-content";
import { BlogCard } from "@/components/shared/blog-card";

const testimonials = [
  {
    name: "Carolina M.",
    text: "La atención de Jenny es inigualable. El tratamiento facial cambió mi piel por completo.",
    rating: 5,
  },
  {
    name: "Andrea R.",
    text: "Un lugar mágico en Cuenca. Los masajes relajantes son una experiencia de otro nivel.",
    rating: 5,
  },
  {
    name: "Gabriela S.",
    text: "Profesionalismo y calidez. Me sentí segura durante todo mi proceso post-operatorio.",
    rating: 5,
  },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 28 }
      }
      transition={{ duration: 0.75, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HomePageProps {
  posts: BlogPostSummary[];
}

export default function HomePage({ posts }: HomePageProps) {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const heroImageY = useSpring(
    useTransform(scrollY, [0, 700], [0, reducedMotion ? 0 : 90]),
    { stiffness: 110, damping: 28 }
  );

  const glowY = useSpring(
    useTransform(scrollY, [0, 700], [0, reducedMotion ? 0 : -70]),
    { stiffness: 120, damping: 30 }
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#f6f1e9] text-[#1B1B1B]">
      <section className="relative min-h-[98vh] w-full overflow-hidden">
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/image2.webp"
            alt="Modelo en tratamiento facial en Jenny Vera Spa"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_center] md:object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1410]/78 via-[#211913]/50 to-[#211913]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b]/48 via-transparent to-transparent" />

        <motion.div
          style={{ y: glowY }}
          className="pointer-events-none absolute -right-24 top-36 h-72 w-72 rounded-full bg-[#d9b861]/35 blur-[120px]"
        />

        <div className="relative z-10 container mx-auto flex min-h-[98vh] items-start px-6 pb-8 pt-36 md:items-center md:pb-12 md:pt-32 lg:px-10">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#fdebc2] backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Cuidado de lujo en Cuenca
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
              className="font-serif text-5xl leading-[0.95] text-[#f8f5ef] sm:text-6xl lg:text-7xl"
            >
              Belleza que te
              <span className="block italic text-[#f0cd73]">mira de frente</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
              className="mt-8 max-w-xl text-base font-light leading-relaxed text-[#efe7d8] md:text-lg"
            >
              Tu primera impresión importa. Por eso abrimos con una mirada directa: confianza, técnica y una experiencia
              sensorial diseñada para que te sientas segura desde el primer minuto.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/contacto"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-sm border border-[#f7d682]/50 bg-[#f0cd73] px-8 py-6 text-xs font-semibold tracking-[0.19em] text-[#1B1B1B] uppercase hover:bg-[#f8dda0]"
                )}
              >
                Agenda tu cita
              </Link>
              <Link
                href="/servicios"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-sm border-white/50 bg-transparent px-8 py-6 text-xs font-semibold tracking-[0.19em] text-white uppercase hover:bg-white/12"
                )}
              >
                Ver tratamientos
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="mt-10 inline-flex items-center gap-4 border-l border-[#f0cd73]/55 pl-4 text-[#e9dfcc]"
            >
              <span className="font-serif text-3xl text-[#f0cd73]">+400</span>
              <p className="text-xs uppercase tracking-[0.2em]">Clientes felices en tratamientos faciales y corporales</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[#d9c9a3]/45 bg-[#efe4cf] py-7 md:py-9">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0)_58%)]" />
        <div className="absolute inset-x-0 top-1/2 hidden -translate-y-1/2 px-14 md:block">
          <motion.svg
            viewBox="0 0 1200 120"
            className="h-12 w-full text-[#b99642]/35"
            initial={{ opacity: 0.2 }}
            animate={reducedMotion ? { opacity: 0.2 } : { opacity: [0.2, 0.38, 0.2] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <motion.path
              d="M20,60 C180,6 280,6 420,60 C560,112 670,112 810,60 C920,22 1020,20 1180,60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="4 10"
              initial={{ pathLength: 0.15 }}
              animate={reducedMotion ? { pathLength: 0.15 } : { pathLength: [0.15, 1, 0.15] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.svg>
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-4 text-center md:gap-4 md:px-6">
          {[
            "Diagnostico Pro",
            "Tecnologia Segura",
            "Ritual Sensorial",
          ].map((item, index) => (
            <motion.div
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-[#c9b186]/70 bg-white/55 px-4 py-2 backdrop-blur-[1px] md:px-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              animate={
                reducedMotion
                  ? undefined
                  : { y: [0, -2, 0] }
              }
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Star className="h-3 w-3 text-[#b69135]" fill="currentColor" />
              <span className="font-serif text-lg italic leading-none text-[#2c221a] md:text-xl">{item}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 md:py-28 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_1fr]">
          <FadeIn>
            <div className="relative min-h-[420px] overflow-hidden rounded-[26px] shadow-[0_30px_70px_-35px_rgba(0,0,0,0.55)]">
              <Image
                src="/image1.webp"
                alt="Tratamiento corporal relajante en Jenny Vera Spa"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/60 via-[#1a1410]/12 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-black/30 p-4 backdrop-blur-sm">
                <p className="text-sm font-light leading-relaxed text-[#f6efe2]">
                  Cada protocolo se adapta a tu historia: piel, ritmo de vida y objetivos reales.
                </p>
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.24em] text-[#a98634]">Nuestra firma</span>
              <h2 className="font-serif text-4xl leading-tight text-[#1b1511] md:text-5xl">
                Ciencia estética con tacto
                <span className="block italic text-[#b48a2f]">humano y honesto.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg font-light leading-relaxed text-[#4f4438]">
                Diseñamos experiencias completas: evaluación profesional, protocolos personalizados y seguimiento para que cada
                sesión genere resultados visibles y sostenibles.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Faciales avanzados y rejuvenecimiento",
                  "Drenaje, relajacion y armonia corporal",
                  "Tecnologia de ultima generacion",
                  "Atencion personalizada de inicio a fin",
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-[#d9c9a4]/55 bg-white/70 px-4 py-3 text-sm text-[#332922]">
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-[#1d1612] py-20 text-[#f6efe2] md:py-24">
        <div className="container mx-auto px-6 lg:px-10">
          <FadeIn className="max-w-3xl">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.24em] text-[#efcd77]">Experiencia Jenny Vera</span>
            <h3 className="font-serif text-3xl leading-tight md:text-5xl">Un recorrido pensado para que te sientas cuidada de principio a fin.</h3>
          </FadeIn>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "Diagnostico inicial con objetivos claros",
              "Plan de tratamiento adaptado a ti",
              "Seguimiento y ajustes inteligentes",
            ].map((step, index) => (
              <FadeIn
                key={step}
                delay={index * 0.1}
                className="rounded-2xl border border-white/15 bg-white/6 p-6 backdrop-blur-sm"
              >
                <span className="text-xs uppercase tracking-[0.24em] text-[#f0cd73]">Paso {index + 1}</span>
                <p className="mt-4 font-light leading-relaxed text-[#f7edd9]">{step}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4ede1] py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <FadeIn className="max-w-xl">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#b1882f]">Nuestro Blog</span>
              <h2 className="font-serif text-4xl text-[#1B1B1B] md:text-5xl">Journal</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link
                href="/blog"
                className="group flex items-center gap-2 border-b border-transparent pb-1 text-sm uppercase tracking-widest transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                Ver todos los artículos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post, index) => (
              <FadeIn key={post.slug} delay={index * 0.1}>
                <BlogCard post={post} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 text-center md:py-24">
        <FadeIn>
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#b1882f]">Los testimonios</span>
          <h2 className="mb-14 font-serif text-3xl text-[#1B1B1B] md:text-5xl">Voces de Confianza</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map((t, i) => (
            <FadeIn
              key={t.name}
              delay={i * 0.1}
              className="rounded-2xl border border-[#dccca8]/70 bg-white/80 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_15px_50px_-30px_rgba(0,0,0,0.45)]"
            >
              <div className="flex gap-1 mb-6 text-[#D4AF37]">
                {[...Array(t.rating)].map((_, starIndex) => (
                  <Star key={starIndex} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mb-6 font-light italic leading-relaxed text-[#5a4d3f]">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0e6d3] text-xs font-bold text-[#1B1B1B]">
                  {t.name[0]}
                </div>
                <span className="text-sm font-medium tracking-wide">{t.name}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1B1B1B] py-28 text-center text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-[#1B1B1B] to-[#1B1B1B]" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <FadeIn>
            <h2 className="mb-6 font-serif text-4xl md:text-6xl">Tu mejor versión comienza aquí</h2>
            <p className="mx-auto mb-10 max-w-xl text-lg font-light text-gray-400">
              Agenda tu cita hoy y déjanos cuidar de ti con la excelencia que mereces.
            </p>
            <div className="flex items-center justify-center">
              <Link
                href="/contacto"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-[#D4AF37] px-10 py-7 text-sm uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-[#1B1B1B]"
                )}
              >
                Configura tu cita
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
