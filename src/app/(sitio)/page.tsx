"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Star } from "lucide-react";
import { useRef, useEffect, useState } from "react";

/* ─────────────────────────────────────────────
   Animated counter (counts up when in view)
───────────────────────────────────────────── */
function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const totalFrames = 80;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (frame >= totalFrames) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [isInView, to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Cursor glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const services = [
    {
      number: "01",
      tag: "Premium",
      title: "Estética Facial",
      desc: "HIFU, toxina botulínica y limpiezas profundas para revelar tu luminosidad.",
      img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
    },
    {
      number: "02",
      tag: "Exclusive",
      title: "Estética Corporal",
      desc: "Tecnología reductiva, masajes relajantes y maderoterapia para esculpir.",
      img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1587&auto=format&fit=crop",
    },
    {
      number: "03",
      tag: "Specialist",
      title: "Post-Operatorio",
      desc: "Drenaje linfático vital para una recuperación quirúrgica exitosa y segura.",
      img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const marqueeItems = [
    "HIFU",
    "Drenaje Linfático",
    "Botox",
    "Masaje Relajante",
    "Maderoterapia",
    "Limpieza Profunda",
    "Radiofrecuencia",
    "Post-Operatorio",
  ];

  const stats = [
    { number: 10, suffix: "+", label: "Años de experiencia" },
    { number: 500, suffix: "+", label: "Clientes satisfechas" },
    { number: 20, suffix: "+", label: "Tratamientos únicos" },
    { number: 100, suffix: "%", label: "Satisfacción garantizada" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] overflow-x-hidden">

      {/* ══════════════════════════════════════════
          1. HERO — Cinematográfico
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-screen min-h-[700px] flex flex-col justify-end overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
            alt="Jenny Vera Spa — Ambiente de Lujo"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-[#0A0A0A]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-transparent" />
        </motion.div>

        {/* Cursor glow */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 65%)",
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        {/* Floating badge — top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-28 right-8 md:right-16 z-10 hidden md:flex flex-col items-center justify-center w-28 h-28 rounded-full border border-[#D4AF37]/30"
          style={{ background: "rgba(212,175,55,0.06)" }}
        >
          <Star size={12} className="text-[#D4AF37] mb-1.5" />
          <span className="text-[#D4AF37] text-[9px] uppercase tracking-[0.2em] leading-snug text-center font-medium">
            Cuenca
            <br />
            Ecuador
          </span>
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-6 lg:px-16 pb-24 md:pb-32"
        >
          <div className="overflow-hidden mb-5">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: 28 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="h-[1px] bg-[#D4AF37] block"
              />
              <span className="text-[#D4AF37] uppercase tracking-[0.35em] text-[10px] font-semibold">
                Estética Avanzada · Cuenca, Ecuador
              </span>
            </motion.div>
          </div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: 140, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.2rem,9.5vw,8rem)] font-serif text-white leading-[0.92] tracking-tight"
            >
              Jenny Vera
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: 140, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.2rem,9.5vw,8rem)] font-serif italic font-light text-white/40 leading-[0.92] tracking-tight"
            >
              Spa
            </motion.h1>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.9 }}
              className="text-white/45 text-base font-light max-w-xs leading-relaxed"
            >
              Tratamientos exclusivos, tecnología de vanguardia y un ambiente de
              total relajación.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contacto"
                className="group flex items-center justify-center gap-3 bg-[#D4AF37] text-[#0A0A0A] px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-white transition-all duration-500"
              >
                Agendar cita
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </Link>
              <Link
                href="/servicios"
                className="flex items-center justify-center border border-white/15 text-white/60 px-9 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:border-white/40 hover:text-white transition-all duration-500 backdrop-blur-sm"
              >
                Tratamientos
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-14 bg-gradient-to-b from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          2. MARQUEE — Strip dorado
      ══════════════════════════════════════════ */}
      <div className="py-5 bg-[#D4AF37] overflow-hidden">
        <div className="flex">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex gap-10 whitespace-nowrap shrink-0"
          >
            {[
              ...marqueeItems,
              ...marqueeItems,
              ...marqueeItems,
              ...marqueeItems,
            ].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-10 text-[#0A0A0A] text-[10px] uppercase tracking-[0.35em] font-bold shrink-0"
              >
                {item}
                <span className="text-[#0A0A0A]/35 text-base">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3. STATS — Contadores animados
      ══════════════════════════════════════════ */}
      <section className="py-24 lg:py-36 bg-[#0A0A0A] border-b border-white/[0.06]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-center md:text-left"
              >
                <div className="font-serif text-5xl md:text-6xl text-white mb-3 tabular-nums">
                  <AnimatedCounter to={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-white/25 text-xs uppercase tracking-[0.22em] font-light leading-relaxed">
                  {stat.label}
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  className="mt-5 h-[1px] bg-[#D4AF37] mx-auto md:mx-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. FILOSOFÍA — Split screen
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] grid grid-cols-1 lg:grid-cols-2">
        {/* Imagen */}
        <div className="relative h-[55vh] lg:h-auto overflow-hidden">
          <motion.div
            initial={{ scale: 1.18 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop"
              alt="Tratamiento Facial de Lujo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/25" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-8 left-8 bg-white/8 backdrop-blur-lg border border-white/15 px-5 py-4 rounded-sm"
          >
            <p className="text-white text-[10px] uppercase tracking-[0.25em] font-semibold mb-1">
              Nuestra filosofía
            </p>
            <p className="text-white/50 text-xs">Belleza que nace desde adentro</p>
          </motion.div>
        </div>

        {/* Contenido */}
        <div className="flex items-center bg-[#111111] px-8 md:px-16 xl:px-24 py-24 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="w-6 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold">
                Nuestra Esencia
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[3.2rem] font-serif text-white leading-[1.08] mb-8 tracking-tight">
              Una pausa <br />
              <span className="italic font-light text-white/35">
                diseñada para ti
              </span>
            </h2>

            <p className="text-white/50 font-light text-[1.05rem] leading-relaxed mb-5">
              En Jenny Vera Spa creemos que la belleza profunda comienza con la
              conexión cuerpo y mente.
            </p>
            <p className="text-white/25 font-light text-sm leading-relaxed mb-14">
              Desde procesos post-operatorios hasta rituales de rejuvenecimiento
              facial, cada tratamiento está diseñado con precisión clínica y
              sensibilidad artística.
            </p>

            <Link
              href="/servicios"
              className="group inline-flex items-center gap-5 text-white/50 hover:text-white transition-colors duration-300 text-[11px] uppercase tracking-[0.28em]"
            >
              <span>Descubrir tratamientos</span>
              <span className="w-8 h-[1px] bg-current group-hover:w-14 transition-all duration-500 ease-out" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. SERVICIOS — Grid editorial
      ══════════════════════════════════════════ */}
      <section className="py-28 lg:py-44 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-6 h-[1px] bg-[#D4AF37]" />
                <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold">
                  Especialidades
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight tracking-tight">
                Menú de
                <br />
                Tratamientos
              </h2>
            </div>
            <Link
              href="/servicios"
              className="group flex items-center gap-4 text-white/30 hover:text-white text-[11px] uppercase tracking-[0.25em] transition-colors duration-300"
            >
              Ver el menú completo
              <span className="w-5 h-[1px] bg-current group-hover:w-10 transition-all duration-500 ease-out" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.07] border-t border-white/[0.07]">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative p-8 lg:p-12 cursor-pointer overflow-hidden"
              >
                {/* Hover background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/80" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-white/15 text-xs font-mono tracking-widest">
                      {service.number}
                    </span>
                    <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] border border-[#D4AF37]/25 text-[#D4AF37]/70">
                      {service.tag}
                    </span>
                  </div>

                  <div className="relative h-52 md:h-60 overflow-hidden mb-8">
                    <motion.div
                      className="relative w-full h-full"
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={service.img}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-serif text-white leading-tight mb-4">
                    {service.title}
                  </h3>
                  <p className="text-white/35 text-sm leading-relaxed mb-8">
                    {service.desc}
                  </p>

                  <div className="flex items-center gap-3 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Ver tratamiento <ArrowRight size={11} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. QUOTE
      ══════════════════════════════════════════ */}
      <section className="py-36 lg:py-52 bg-[#0D0D0D] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "44px 44px",
          }}
        />

        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[#D4AF37]/20 text-8xl font-serif leading-none block mb-8 select-none"
            >
              &ldquo;
            </motion.span>
            <blockquote className="text-2xl md:text-3xl lg:text-[2.2rem] font-serif text-white/60 leading-relaxed italic mb-14 tracking-tight">
              La suma de la experiencia clínica y el arte de la relajación. Un
              espacio donde cada visita transforma.
            </blockquote>
            <div className="flex items-center justify-center gap-5">
              <span className="w-10 h-[1px] bg-[#D4AF37]/30" />
              <span className="text-[#D4AF37]/50 text-[10px] uppercase tracking-[0.35em]">
                Jenny Vera · Fundadora
              </span>
              <span className="w-10 h-[1px] bg-[#D4AF37]/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. CTA FINAL — Cinematográfico
      ══════════════════════════════════════════ */}
      <section className="relative h-[85vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop"
            alt="Reserva tu experiencia en Jenny Vera Spa"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/78" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/8 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="w-10 h-[1px] bg-[#D4AF37]/40" />
              <Sparkles size={15} className="text-[#D4AF37]" />
              <span className="w-10 h-[1px] bg-[#D4AF37]/40" />
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-serif text-white mb-6 leading-[0.95] tracking-tight">
              Tu mejor versión
              <br />
              <span className="italic font-light text-white/40">te espera</span>
            </h2>

            <p className="text-white/35 text-base md:text-lg font-light mb-14 max-w-sm mx-auto leading-relaxed">
              Asegura tu espacio y permítenos redefinir tu bienestar con la
              precisión que mereces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="group inline-flex items-center justify-center gap-3 bg-[#D4AF37] text-[#0A0A0A] px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all duration-500"
              >
                Solicitar Evaluación
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center border border-white/15 text-white/50 px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-medium hover:border-white/40 hover:text-white transition-all duration-500"
              >
                Ver Tratamientos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
