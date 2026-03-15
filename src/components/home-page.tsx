import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "@/lib/blog-content";
import { BlogCard } from "@/components/shared/blog-card";
import { withLocalePath, type Locale } from "@/lib/i18n";

const homeCopy = {
  es: {
    badge: "Cuidado de lujo en Cuenca",
    heroTitle: "Belleza que te",
    heroAccent: "mira de frente",
    heroText:
      "Tu primera impresion importa. Por eso abrimos con una mirada directa: confianza, tecnica y una experiencia sensorial disenada para que te sientas segura desde el primer minuto.",
    heroPrimaryCta: "Agenda tu cita",
    heroSecondaryCta: "Ver tratamientos",
    heroStatText: "Clientes felices en tratamientos faciales y corporales",
    trustItems: ["Diagnostico Pro", "Tecnologia Segura", "Ritual Sensorial"],
    imageCaption:
      "Cada protocolo se adapta a tu historia: piel, ritmo de vida y objetivos reales.",
    signatureEyebrow: "Nuestra firma",
    signatureTitle: "Ciencia estetica con tacto",
    signatureAccent: "humano y honesto.",
    signatureText:
      "Disenamos experiencias completas: evaluacion profesional, protocolos personalizados y seguimiento para que cada sesion genere resultados visibles y sostenibles.",
    signaturePills: [
      "Faciales avanzados y rejuvenecimiento",
      "Drenaje, relajacion y armonia corporal",
      "Tecnologia de ultima generacion",
      "Atencion personalizada de inicio a fin",
    ],
    experienceEyebrow: "Experiencia Jenny Vera",
    experienceTitle: "Un recorrido pensado para que te sientas cuidada de principio a fin.",
    stepLabel: "Paso",
    experienceSteps: [
      "Diagnostico inicial con objetivos claros",
      "Plan de tratamiento adaptado a ti",
      "Seguimiento y ajustes inteligentes",
    ],
    blogEyebrow: "Nuestro Blog",
    blogTitle: "Journal",
    blogAllCta: "Ver todos los articulos",
    testimonialsEyebrow: "Los testimonios",
    testimonialsTitle: "Voces de Confianza",
    finalTitle: "Tu mejor version comienza aqui",
    finalText: "Agenda tu cita hoy y dejanos cuidar de ti con la excelencia que mereces.",
    finalCta: "Configura tu cita",
    testimonials: [
      {
        name: "Carolina M.",
        text: "La atencion de Jenny es inigualable. El tratamiento facial cambio mi piel por completo.",
        rating: 5,
      },
      {
        name: "Andrea R.",
        text: "Un lugar magico en Cuenca. Los masajes relajantes son una experiencia de otro nivel.",
        rating: 5,
      },
      {
        name: "Gabriela S.",
        text: "Profesionalismo y calidez. Me senti segura durante todo mi proceso post-operatorio.",
        rating: 5,
      },
    ],
  },
  en: {
    badge: "Luxury care in Cuenca",
    heroTitle: "Beauty that",
    heroAccent: "meets your gaze",
    heroText:
      "First impressions matter. That is why we begin with confidence, technique, and a sensory experience designed to make you feel safe from the first minute.",
    heroPrimaryCta: "Book your appointment",
    heroSecondaryCta: "Explore treatments",
    heroStatText: "Happy clients in facial and body treatments",
    trustItems: ["Pro Diagnosis", "Safe Technology", "Sensory Ritual"],
    imageCaption:
      "Every protocol adapts to your story: skin condition, lifestyle, and realistic goals.",
    signatureEyebrow: "Our signature",
    signatureTitle: "Aesthetic science with",
    signatureAccent: "human and honest care.",
    signatureText:
      "We design complete experiences: professional evaluation, personalized protocols, and follow-up so each session delivers visible and lasting results.",
    signaturePills: [
      "Advanced facials and rejuvenation",
      "Lymphatic drainage, relaxation, and body harmony",
      "Next-generation technology",
      "Personalized care from start to finish",
    ],
    experienceEyebrow: "The Jenny Vera experience",
    experienceTitle: "A journey designed to make you feel cared for from beginning to end.",
    stepLabel: "Step",
    experienceSteps: [
      "Initial diagnosis with clear goals",
      "A treatment plan tailored to you",
      "Smart follow-up and adjustments",
    ],
    blogEyebrow: "Our Blog",
    blogTitle: "Journal",
    blogAllCta: "View all articles",
    testimonialsEyebrow: "Testimonials",
    testimonialsTitle: "Trusted Voices",
    finalTitle: "Your best version starts here",
    finalText: "Book your appointment today and let us care for you with the excellence you deserve.",
    finalCta: "Plan your appointment",
    testimonials: [
      {
        name: "Carolina M.",
        text: "Jenny's care is unmatched. The facial treatment transformed my skin completely.",
        rating: 5,
      },
      {
        name: "Andrea R.",
        text: "A magical place in Cuenca. The relaxing massages are a next-level experience.",
        rating: 5,
      },
      {
        name: "Gabriela S.",
        text: "Professional and warm. I felt safe throughout my post-operative process.",
        rating: 5,
      },
    ],
  },
} as const;

interface HomePageProps {
  posts: BlogPostSummary[];
  locale?: Locale;
}

export default function HomePage({ posts, locale = "es" }: HomePageProps) {
  const localize = (path: string) => withLocalePath(locale, path);
  const copy = homeCopy[locale];

  return (
    <div className="min-h-screen overflow-hidden bg-[#f6f1e9] text-[#1B1B1B]">
      <section className="relative min-h-[98vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/image2.webp"
            alt="Modelo en tratamiento facial en Jenny Vera Spa"
            fill
            priority
            fetchPriority="high"
            loading="eager"
            quality={70}
            sizes="100vw"
            className="object-cover object-[58%_center] md:object-center"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1410]/78 via-[#211913]/50 to-[#211913]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b]/48 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -right-24 top-36 h-72 w-72 rounded-full bg-[#d9b861]/35 blur-[120px]" />

        <div className="relative z-10 container mx-auto flex min-h-[98vh] items-start px-6 pb-8 pt-36 md:items-center md:pb-12 md:pt-32 lg:px-10">
          <div className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#fdebc2] backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {copy.badge}
            </span>

            <h1 className="font-serif text-5xl leading-[0.95] text-[#f8f5ef] sm:text-6xl lg:text-7xl">
              {copy.heroTitle}
              <span className="block italic text-[#f0cd73]">{copy.heroAccent}</span>
            </h1>

            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[#efe7d8] md:text-lg">
              {copy.heroText}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={localize("/contacto")}
                prefetch={false}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-sm border border-[#f7d682]/50 bg-[#f0cd73] px-8 py-6 text-xs font-semibold uppercase tracking-[0.19em] text-[#1B1B1B] transition-colors hover:bg-[#f8dda0]"
                )}
              >
                {copy.heroPrimaryCta}
              </Link>
              <Link
                href={localize("/servicios")}
                prefetch={false}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-sm border border-white/50 bg-transparent px-8 py-6 text-xs font-semibold uppercase tracking-[0.19em] text-white transition-colors hover:bg-white/12"
                )}
              >
                {copy.heroSecondaryCta}
              </Link>
            </div>

            <div className="mt-10 inline-flex items-center gap-4 border-l border-[#f0cd73]/55 pl-4 text-[#e9dfcc]">
              <span className="font-serif text-3xl text-[#f0cd73]">+400</span>
              <p className="text-xs uppercase tracking-[0.2em]">{copy.heroStatText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[#d9c9a3]/45 bg-[#efe4cf] py-7 md:py-9">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0)_58%)]" />

        <div className="relative mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-4 text-center md:gap-4 md:px-6">
          {copy.trustItems.map((item) => (
            <div
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-[#c9b186]/70 bg-white/55 px-4 py-2 md:px-5"
            >
              <Star className="h-3 w-3 text-[#b69135]" fill="currentColor" />
              <span className="font-serif text-lg italic leading-none text-[#2c221a] md:text-xl">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 md:py-28 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_1fr]">
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
                {copy.imageCaption}
              </p>
            </div>
          </div>

          <div>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.24em] text-[#a98634]">{copy.signatureEyebrow}</span>
            <h2 className="font-serif text-4xl leading-tight text-[#1b1511] md:text-5xl">
              {copy.signatureTitle}
              <span className="block italic text-[#b48a2f]">{copy.signatureAccent}</span>
            </h2>
            <p className="mt-6 text-lg font-light leading-relaxed text-[#4f4438]">
              {copy.signatureText}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {copy.signaturePills.map((item) => (
                <div key={item} className="rounded-xl border border-[#d9c9a4]/55 bg-white/70 px-4 py-3 text-sm text-[#332922]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1d1612] py-20 text-[#f6efe2] md:py-24">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.24em] text-[#efcd77]">{copy.experienceEyebrow}</span>
            <h3 className="font-serif text-3xl leading-tight md:text-5xl">{copy.experienceTitle}</h3>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.experienceSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/15 bg-white/6 p-6 backdrop-blur-sm">
                <span className="text-xs uppercase tracking-[0.24em] text-[#f0cd73]">{copy.stepLabel} {index + 1}</span>
                <p className="mt-4 font-light leading-relaxed text-[#f7edd9]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4ede1] py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#b1882f]">{copy.blogEyebrow}</span>
              <h2 className="font-serif text-4xl text-[#1B1B1B] md:text-5xl">{copy.blogTitle}</h2>
            </div>
            <Link
              href={localize("/blog")}
              prefetch={false}
              className="group flex items-center gap-2 border-b border-transparent pb-1 text-sm uppercase tracking-widest transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              {copy.blogAllCta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((post, index) => (
              <BlogCard key={post.slug} post={post} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 text-center md:py-24">
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#b1882f]">{copy.testimonialsEyebrow}</span>
        <h2 className="mb-14 font-serif text-3xl text-[#1B1B1B] md:text-5xl">{copy.testimonialsTitle}</h2>

        <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
          {copy.testimonials.map((t) => (
            <article
              key={t.name}
              className="rounded-2xl border border-[#dccca8]/70 bg-white/80 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_15px_50px_-30px_rgba(0,0,0,0.45)]"
            >
              <div className="mb-6 flex gap-1 text-[#D4AF37]">
                {[...Array(t.rating)].map((_, starIndex) => (
                  <Star key={starIndex} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mb-6 font-light italic leading-relaxed text-[#5a4d3f]">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0e6d3] text-xs font-bold text-[#1B1B1B]">
                  {t.name[0]}
                </div>
                <span className="text-sm font-medium tracking-wide">{t.name}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1B1B1B] py-28 text-center text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-[#1B1B1B] to-[#1B1B1B]" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <h2 className="mb-6 font-serif text-4xl md:text-6xl">{copy.finalTitle}</h2>
          <p className="mx-auto mb-10 max-w-xl text-lg font-light text-gray-300">
            {copy.finalText}
          </p>
          <div className="flex items-center justify-center">
            <Link
              href={localize("/contacto")}
              prefetch={false}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#D4AF37] px-10 py-7 text-sm uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-[#1B1B1B]"
              )}
            >
              {copy.finalCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
