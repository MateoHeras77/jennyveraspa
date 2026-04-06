"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, getLocaleFromPathname, withLocalePath } from "@/lib/i18n";
import { Award, Heart, ShieldCheck, Sparkles, MapPin, Phone, Clock } from "lucide-react";

const copy = {
  es: {
    badge: "Nuestra Historia",
    heroTitle: "Donde la ciencia y el arte se encuentran",
    heroSubtitle:
      "Somos un centro de estética avanzada en Cuenca, Ecuador, dedicado a realzar tu belleza natural con los tratamientos más innovadores y el cuidado más humano.",
    storyTitle: "La Historia de Jenny Vera Spa",
    storyParagraphs: [
      "Jenny Vera Spa nació de la pasión de Jenny Vera por la estética y el bienestar integral. Con años de formación especializada y una visión clara: que cada persona merece sentirse en su mejor versión, Jenny fundó en Cuenca un espacio donde la tecnología de punta se combina con un trato profundamente personal.",
      "Lo que comenzó como un pequeño consultorio de tratamientos faciales se ha convertido en un centro de referencia en la ciudad, reconocido por la calidad de sus procedimientos, la calidez de su equipo y los resultados reales que transforma la vida de sus pacientes.",
      "Hoy, Jenny Vera Spa ofrece una amplia gama de tratamientos faciales, corporales, láser y post-operatorios, todos guiados por los más altos estándares de seguridad, ciencia y belleza.",
    ],
    missionTitle: "Misión",
    missionText:
      "Brindar tratamientos estéticos avanzados con estándares clínicos de excelencia, acompañando a cada persona en su camino hacia el bienestar y la confianza en sí misma.",
    visionTitle: "Visión",
    visionText:
      "Ser el centro de estética de mayor confianza en el Ecuador, reconocido por la innovación tecnológica, el profesionalismo de su equipo y los resultados transformadores para sus pacientes.",
    valuesTitle: "Nuestros Valores",
    values: [
      {
        icon: "Heart",
        title: "Trato Humano",
        description: "Cada paciente es única. Escuchamos, entendemos y adaptamos cada tratamiento a sus necesidades específicas.",
      },
      {
        icon: "ShieldCheck",
        title: "Seguridad Clínica",
        description: "Trabajamos con protocolos médicos rigurosos y equipos certificados para garantizar resultados seguros y efectivos.",
      },
      {
        icon: "Sparkles",
        title: "Innovación Constante",
        description: "Nos mantenemos a la vanguardia de las últimas tecnologías y tratamientos estéticos del mercado internacional.",
      },
      {
        icon: "Award",
        title: "Excelencia Profesional",
        description: "Nuestro equipo se forma y certifica continuamente para ofrecer siempre el más alto nivel de atención.",
      },
    ],
    teamTitle: "Equipo Profesional",
    teamSubtitle: "Especialistas certificados comprometidos con tu bienestar",
    teamMembers: [
      {
        name: "Jenny Vera",
        role: "Fundadora & Especialista en Estética Avanzada",
        bio: "Especialista en tratamientos faciales avanzados, HIFU, láser y medicina regenerativa. Con formación continua en Ecuador y el exterior, Jenny es referente en estética avanzada en Cuenca.",
      },
      {
        name: "Equipo de Especialistas",
        role: "Terapeutas y Técnicos Certificados",
        bio: "Nuestro equipo está formado por profesionales certificados en terapias corporales, drenaje linfático, tratamientos post-operatorios y técnicas de bienestar integral.",
      },
    ],
    whyTitle: "¿Por qué elegirnos?",
    whyItems: [
      "Tecnología de última generación: HIFU 25D, Exilis Ultra 360, láser CO2 fraccionado y más.",
      "Evaluación personalizada antes de cada tratamiento.",
      "Protocolos seguros con equipos certificados internacionalmente.",
      "Equipo certificado con formación continua.",
      "Ambiente cálido, privado y de absoluta confianza.",
      "Ubicación central en Cuenca con fácil acceso.",
    ],
    locationTitle: "Dónde Encontrarnos",
    address: "Edificio Plaza Médica, 4to piso\nAv. Manuel de J. Calle, Cuenca, Ecuador",
    phone: "+593 96 939 5353",
    hours: "Lunes a Viernes: 09:00 – 18:00\nSábados: 09:00 – 13:00",
    ctaTitle: "Tu mejor versión comienza aquí",
    ctaText:
      "Agenda tu evaluación personalizada y descubre el tratamiento ideal para ti. Estamos listas para acompañarte.",
    ctaButton: "Agendar Cita",
  },
  en: {
    badge: "Our Story",
    heroTitle: "Where science and art meet",
    heroSubtitle:
      "We are an advanced aesthetic center in Cuenca, Ecuador, dedicated to enhancing your natural beauty with the most innovative treatments and the most human care.",
    storyTitle: "The Story of Jenny Vera Spa",
    storyParagraphs: [
      "Jenny Vera Spa was born from Jenny Vera's passion for aesthetics and holistic well-being. With years of specialized training and a clear vision — that every person deserves to look and feel their best — Jenny founded in Cuenca a space where cutting-edge technology meets deeply personal care.",
      "What began as a small facial treatment practice has become a reference center in the city, recognized for the quality of its procedures, the warmth of its team, and the real results that transform patients' lives.",
      "Today, Jenny Vera Spa offers a wide range of facial, body, laser, and post-operative treatments, all guided by the highest standards of safety, science, and beauty.",
    ],
    missionTitle: "Mission",
    missionText:
      "To provide advanced aesthetic treatments with clinical excellence standards, accompanying each person on their journey toward well-being and self-confidence.",
    visionTitle: "Vision",
    visionText:
      "To be Ecuador's most trusted aesthetic center, recognized for technological innovation, team professionalism, and transformative results for patients.",
    valuesTitle: "Our Values",
    values: [
      {
        icon: "Heart",
        title: "Human Care",
        description: "Every patient is unique. We listen, understand, and adapt each treatment to their specific needs.",
      },
      {
        icon: "ShieldCheck",
        title: "Clinical Safety",
        description: "We follow rigorous medical protocols and use certified equipment to ensure safe and effective results.",
      },
      {
        icon: "Sparkles",
        title: "Constant Innovation",
        description: "We stay at the forefront of the latest technologies and aesthetic treatments from the international market.",
      },
      {
        icon: "Award",
        title: "Professional Excellence",
        description: "Our team continuously trains and obtains certifications to always offer the highest level of care.",
      },
    ],
    teamTitle: "Professional Team",
    teamSubtitle: "Certified specialists committed to your well-being",
    teamMembers: [
      {
        name: "Jenny Vera",
        role: "Founder & Advanced Aesthetics Specialist",
        bio: "Specialist in advanced facial treatments, HIFU, laser, and regenerative medicine. With ongoing training in Ecuador and abroad, Jenny is a reference in advanced aesthetics in Cuenca.",
      },
      {
        name: "Team of Specialists",
        role: "Certified Therapists and Technicians",
        bio: "Our team consists of certified professionals in body therapies, lymphatic drainage, post-operative treatments, and holistic wellness techniques.",
      },
    ],
    whyTitle: "Why Choose Us?",
    whyItems: [
      "Latest-generation technology: HIFU 25D, Exilis Ultra 360, fractional CO2 laser, and more.",
      "Personalized evaluation before each treatment.",
      "Safe protocols using internationally certified equipment.",
      "Certified team with continuous training.",
      "Warm, private, and completely trustworthy environment.",
      "Central location in Cuenca with easy access.",
    ],
    locationTitle: "Where to Find Us",
    address: "Edificio Plaza Médica, 4th floor\nAv. Manuel de J. Calle, Cuenca, Ecuador",
    phone: "+593 96 939 5353",
    hours: "Monday to Friday: 09:00 – 18:00\nSaturday: 09:00 – 13:00",
    ctaTitle: "Your best self starts here",
    ctaText:
      "Schedule your personalized evaluation and discover the ideal treatment for you. We are ready to accompany you.",
    ctaButton: "Book Appointment",
  },
};

const iconMap = {
  Heart,
  ShieldCheck,
  Sparkles,
  Award,
};

export default function NosotrosPage() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? DEFAULT_LOCALE;
  const t = copy[locale];
  const localizeHref = (path: string) => withLocalePath(locale, path);

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1B1B1B]">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 bg-[#FDFBF7] overflow-hidden">
        <div className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-[#D4AF37]/8 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#1B1B1B]/3 blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-3 border border-[#D4AF37]/30 rounded-full text-xs font-medium tracking-[0.2em] uppercase text-[#D4AF37] mb-6">
              {t.badge}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#1B1B1B] mb-8 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-sm overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop"
                alt="Jenny Vera Spa - Centro de Estética en Cuenca"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-[#D4AF37]" />
                  <span className="font-serif text-white text-lg italic">Jenny Vera Spa</span>
                </div>
                <p className="text-white/70 text-sm font-light mt-1">Cuenca, Ecuador</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-[#1B1B1B] leading-tight">
                {t.storyTitle}
              </h2>
              {t.storyParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-gray-600 font-light leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#F5F2EB]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { label: t.missionTitle, text: t.missionText },
              { label: t.visionTitle, text: t.visionText },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white rounded-sm p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-8 bg-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em]">
                    {item.label}
                  </span>
                </div>
                <p className="text-gray-700 font-light leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
              {t.valuesTitle}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.map((value, idx) => {
              const IconComponent = iconMap[value.icon as keyof typeof iconMap] ?? Sparkles;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white rounded-sm p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4">
                    <IconComponent size={18} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="font-serif text-lg text-[#1B1B1B] mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#1B1B1B] text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
              {t.teamTitle}
            </span>
            <p className="text-gray-400 font-light">{t.teamSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {t.teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="rounded-sm border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-4">
                  <span className="font-serif text-[#D4AF37] text-xl">{member.name[0]}</span>
                </div>
                <h3 className="font-serif text-xl text-white mb-1">{member.name}</h3>
                <p className="text-[#D4AF37] text-xs uppercase tracking-[0.15em] font-medium mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                {t.whyTitle}
              </span>
              <ul className="space-y-4">
                {t.whyItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                    <p className="text-gray-700 font-light leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="rounded-sm bg-[#F5F2EB] p-8">
                <div className="flex items-start gap-4 mb-4">
                  <MapPin size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2">
                      {t.locationTitle}
                    </h4>
                    <p className="text-gray-700 font-light text-sm whitespace-pre-line">{t.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <Phone size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <div>
                    <a
                      href={`tel:+593969395353`}
                      className="text-gray-700 font-light text-sm hover:text-[#D4AF37] transition-colors"
                    >
                      {t.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 font-light text-sm whitespace-pre-line">{t.hours}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 bg-[#1B1B1B] text-white overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-[#1B1B1B] to-[#1B1B1B]" />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-6xl mb-6">{t.ctaTitle}</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg font-light">{t.ctaText}</p>
            <Link
              href={localizeHref("/contacto")}
              className="inline-block bg-[#D4AF37] text-white hover:bg-white hover:text-[#1B1B1B] rounded-full px-10 py-5 text-sm tracking-widest uppercase transition-all duration-300"
            >
              {t.ctaButton}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
