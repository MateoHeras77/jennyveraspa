"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, getLocaleFromPathname, withLocalePath } from "@/lib/i18n";
import { Shield, Lock, UserCheck, FileText, Mail, Clock } from "lucide-react";

const copy = {
  es: {
    badge: "Legal",
    title: "Política de Privacidad",
    subtitle: "Jenny Vera Spa se compromete a proteger la privacidad y los datos personales de sus clientes y visitantes.",
    lastUpdated: "Última actualización: abril de 2026",
    sections: [
      {
        icon: "FileText",
        title: "1. Responsable del Tratamiento",
        content: [
          "El responsable del tratamiento de los datos personales es Jenny Vera Spa, centro de estética avanzada con sede en:",
          "Edificio Plaza Médica, 4to piso, Av. Manuel de J. Calle, Cuenca, Ecuador.",
          "Para cualquier consulta relacionada con el tratamiento de sus datos personales, puede contactarnos a través de los medios indicados al final de esta política.",
        ],
      },
      {
        icon: "Lock",
        title: "2. Datos Personales que Recopilamos",
        content: [
          "A través del formulario de contacto y agendamiento disponible en nuestro sitio web, recopilamos la siguiente información personal:",
          "• Nombre completo",
          "• Número de teléfono",
          "• Dirección de correo electrónico",
          "• Servicio de interés (seleccionado por el usuario)",
          "• Mensaje o consulta adicional (opcional)",
          "No recopilamos datos sensibles como información financiera, datos de salud detallados ni información de menores de edad a través de este formulario.",
        ],
      },
      {
        icon: "UserCheck",
        title: "3. Finalidad del Tratamiento",
        content: [
          "Los datos personales recopilados son utilizados exclusivamente para las siguientes finalidades:",
          "• Responder a consultas y solicitudes de información sobre nuestros servicios.",
          "• Agendar y confirmar citas para tratamientos estéticos.",
          "• Enviar recordatorios de citas previamente solicitadas.",
          "• Brindar seguimiento post-tratamiento cuando sea necesario.",
          "No utilizamos sus datos para enviar comunicaciones comerciales no solicitadas (spam), ni los empleamos para ningún fin distinto al directamente relacionado con la prestación de nuestros servicios.",
        ],
      },
      {
        icon: "Shield",
        title: "4. No Compartimos sus Datos",
        content: [
          "Jenny Vera Spa no vende, alquila ni transfiere sus datos personales a terceros con fines comerciales.",
          "Sus datos únicamente pueden ser compartidos en los siguientes supuestos excepcionales:",
          "• Con proveedores de servicios tecnológicos que nos asisten en la operación del sitio web (como servicios de correo electrónico transaccional), bajo estrictos acuerdos de confidencialidad.",
          "• Cuando sea requerido por autoridades competentes en cumplimiento de obligaciones legales vigentes en Ecuador.",
          "En ningún caso sus datos serán cedidos a empresas de publicidad, marketing o a terceras partes con fines ajenos a los descritos en esta política.",
        ],
      },
      {
        icon: "Clock",
        title: "5. Retención de Datos",
        content: [
          "Conservamos sus datos personales únicamente durante el tiempo necesario para cumplir con las finalidades para las que fueron recogidos:",
          "• Los datos de contacto y solicitudes de citas se conservan por un período máximo de 2 años desde la última interacción.",
          "• Los datos relacionados con tratamientos realizados pueden conservarse hasta 5 años por razones de calidad del servicio y seguimiento clínico.",
          "Transcurridos estos períodos, sus datos serán eliminados de forma segura de nuestros sistemas.",
        ],
      },
      {
        icon: "UserCheck",
        title: "6. Derechos del Usuario",
        content: [
          "De conformidad con la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP), usted tiene derecho a:",
          "• Acceso: solicitar información sobre los datos personales que tenemos de usted.",
          "• Rectificación: solicitar la corrección de datos inexactos o incompletos.",
          "• Supresión: solicitar la eliminación de sus datos cuando ya no sean necesarios para la finalidad con que fueron recogidos.",
          "• Oposición: oponerse al tratamiento de sus datos en determinadas circunstancias.",
          "• Portabilidad: solicitar la transferencia de sus datos en un formato estructurado.",
          "• Limitación: solicitar la restricción del tratamiento de sus datos en ciertos supuestos.",
          "Para ejercer cualquiera de estos derechos, puede contactarnos a través de los medios indicados en la sección de contacto.",
        ],
      },
      {
        icon: "Lock",
        title: "7. Seguridad de los Datos",
        content: [
          "Jenny Vera Spa implementa medidas técnicas y organizativas apropiadas para proteger sus datos personales frente a accesos no autorizados, pérdida, destrucción o alteración.",
          "Nuestro sitio web utiliza conexiones cifradas (HTTPS) para garantizar la seguridad de la información transmitida a través del formulario de contacto.",
          "El acceso a los datos personales está restringido únicamente al personal autorizado que necesita dicha información para desempeñar sus funciones.",
        ],
      },
      {
        icon: "FileText",
        title: "8. Cookies y Tecnologías de Seguimiento",
        content: [
          "Nuestro sitio web puede utilizar cookies técnicas necesarias para su correcto funcionamiento. Estas cookies no recopilan información personal identificable y son estrictamente necesarias para la operación del sitio.",
          "En caso de utilizar cookies analíticas o de seguimiento adicionales, le informaremos mediante un aviso de cookies y solicitaremos su consentimiento previo.",
        ],
      },
      {
        icon: "FileText",
        title: "9. Cambios en esta Política",
        content: [
          "Jenny Vera Spa se reserva el derecho de modificar esta Política de Privacidad para adaptarla a cambios legislativos, jurisprudenciales o de prácticas empresariales.",
          "Cualquier modificación será publicada en esta misma página con la fecha de actualización correspondiente. Le recomendamos revisar esta política periódicamente.",
        ],
      },
    ],
    contactTitle: "10. Contacto para Ejercer sus Derechos",
    contactText: "Para ejercer sus derechos o resolver cualquier duda sobre el tratamiento de sus datos personales, puede contactarnos a través de:",
    contactItems: [
      "Formulario de contacto disponible en nuestro sitio web",
      "Teléfono: +593 96 939 5353",
      "Presencialmente en: Edificio Plaza Médica, 4to piso, Av. Manuel de J. Calle, Cuenca, Ecuador",
    ],
    contactResponse: "Atenderemos su solicitud en un plazo máximo de 15 días hábiles.",
    ctaTitle: "¿Tiene alguna pregunta?",
    ctaText: "Estamos disponibles para resolver cualquier duda sobre el tratamiento de sus datos personales.",
    ctaButton: "Contáctenos",
  },
  en: {
    badge: "Legal",
    title: "Privacy Policy",
    subtitle: "Jenny Vera Spa is committed to protecting the privacy and personal data of its clients and visitors.",
    lastUpdated: "Last updated: April 2026",
    sections: [
      {
        icon: "FileText",
        title: "1. Data Controller",
        content: [
          "The data controller responsible for processing personal data is Jenny Vera Spa, an advanced aesthetic center located at:",
          "Edificio Plaza Médica, 4th floor, Av. Manuel de J. Calle, Cuenca, Ecuador.",
          "For any questions regarding the processing of your personal data, please contact us through the means indicated at the end of this policy.",
        ],
      },
      {
        icon: "Lock",
        title: "2. Personal Data We Collect",
        content: [
          "Through the contact and appointment booking form available on our website, we collect the following personal information:",
          "• Full name",
          "• Phone number",
          "• Email address",
          "• Service of interest (selected by the user)",
          "• Message or additional inquiry (optional)",
          "We do not collect sensitive data such as financial information, detailed health information, or information from minors through this form.",
        ],
      },
      {
        icon: "UserCheck",
        title: "3. Purpose of Processing",
        content: [
          "The personal data collected is used exclusively for the following purposes:",
          "• Responding to inquiries and requests for information about our services.",
          "• Scheduling and confirming appointments for aesthetic treatments.",
          "• Sending appointment reminders previously requested.",
          "• Providing post-treatment follow-up when necessary.",
          "We do not use your data to send unsolicited commercial communications (spam), nor do we use it for any purpose other than those directly related to the provision of our services.",
        ],
      },
      {
        icon: "Shield",
        title: "4. We Do Not Share Your Data",
        content: [
          "Jenny Vera Spa does not sell, rent, or transfer your personal data to third parties for commercial purposes.",
          "Your data may only be shared in the following exceptional circumstances:",
          "• With technology service providers who assist us in operating the website (such as transactional email services), under strict confidentiality agreements.",
          "• When required by competent authorities in compliance with legal obligations in force in Ecuador.",
          "Under no circumstances will your data be transferred to advertising, marketing companies, or third parties for purposes other than those described in this policy.",
        ],
      },
      {
        icon: "Clock",
        title: "5. Data Retention",
        content: [
          "We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected:",
          "• Contact data and appointment requests are retained for a maximum period of 2 years from the last interaction.",
          "• Data related to treatments performed may be retained for up to 5 years for service quality and clinical follow-up reasons.",
          "After these periods, your data will be securely deleted from our systems.",
        ],
      },
      {
        icon: "UserCheck",
        title: "6. Your Rights",
        content: [
          "In accordance with Ecuador's Organic Law on Personal Data Protection (LOPDP), you have the right to:",
          "• Access: request information about the personal data we hold about you.",
          "• Rectification: request correction of inaccurate or incomplete data.",
          "• Erasure: request deletion of your data when it is no longer necessary for the purpose it was collected.",
          "• Objection: object to the processing of your data in certain circumstances.",
          "• Portability: request the transfer of your data in a structured format.",
          "• Restriction: request limitation of the processing of your data in certain cases.",
          "To exercise any of these rights, please contact us through the means indicated in the contact section.",
        ],
      },
      {
        icon: "Lock",
        title: "7. Data Security",
        content: [
          "Jenny Vera Spa implements appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, destruction, or alteration.",
          "Our website uses encrypted connections (HTTPS) to ensure the security of information transmitted through the contact form.",
          "Access to personal data is restricted solely to authorized personnel who need this information to perform their duties.",
        ],
      },
      {
        icon: "FileText",
        title: "8. Cookies and Tracking Technologies",
        content: [
          "Our website may use technical cookies necessary for its proper functioning. These cookies do not collect personally identifiable information and are strictly necessary for the site's operation.",
          "If we use additional analytical or tracking cookies, we will inform you through a cookie notice and request your prior consent.",
        ],
      },
      {
        icon: "FileText",
        title: "9. Changes to This Policy",
        content: [
          "Jenny Vera Spa reserves the right to modify this Privacy Policy to adapt it to legislative, jurisprudential, or business practice changes.",
          "Any modifications will be published on this same page with the corresponding update date. We recommend reviewing this policy periodically.",
        ],
      },
    ],
    contactTitle: "10. Contact to Exercise Your Rights",
    contactText: "To exercise your rights or resolve any questions about the processing of your personal data, you may contact us through:",
    contactItems: [
      "Contact form available on our website",
      "Phone: +593 96 939 5353",
      "In person at: Edificio Plaza Médica, 4th floor, Av. Manuel de J. Calle, Cuenca, Ecuador",
    ],
    contactResponse: "We will address your request within a maximum period of 15 business days.",
    ctaTitle: "Do you have any questions?",
    ctaText: "We are available to resolve any questions about the processing of your personal data.",
    ctaButton: "Contact Us",
  },
};

const iconMap = {
  FileText,
  Lock,
  UserCheck,
  Shield,
  Clock,
  Mail,
};

export default function PrivacidadPage() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? DEFAULT_LOCALE;
  const t = copy[locale];
  const localizeHref = (path: string) => withLocalePath(locale, path);

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#1B1B1B]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#FDFBF7] overflow-hidden">
        <div className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-3 border border-[#D4AF37]/30 rounded-full text-xs font-medium tracking-[0.2em] uppercase text-[#D4AF37] mb-6">
              {t.badge}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1B1B1B] mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-gray-600 text-lg font-light leading-relaxed max-w-2xl mb-4">
              {t.subtitle}
            </p>
            <p className="text-sm text-gray-400 font-light tracking-wide">{t.lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-[1px] bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37]/10 to-transparent" />
      </div>

      {/* Content */}
      <section className="py-16 container mx-auto px-6">
        <div className="max-w-3xl space-y-12">
          {t.sections.map((section, idx) => {
            const IconComponent = iconMap[section.icon as keyof typeof iconMap] ?? FileText;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                    <IconComponent size={15} className="text-[#D4AF37]" />
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl text-[#1B1B1B]">{section.title}</h2>
                </div>
                <div className="pl-11 space-y-3">
                  {section.content.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      className={`font-light leading-relaxed ${
                        paragraph.startsWith("•")
                          ? "text-gray-600 text-sm pl-2"
                          : pIdx === 0
                          ? "text-gray-700"
                          : "text-gray-600"
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Section 10 - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="rounded-sm border border-[#D4AF37]/20 bg-white p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                <Mail size={15} className="text-[#D4AF37]" />
              </div>
              <h2 className="font-serif text-xl md:text-2xl text-[#1B1B1B]">{t.contactTitle}</h2>
            </div>
            <div className="pl-11 space-y-3">
              <p className="text-gray-700 font-light leading-relaxed">{t.contactText}</p>
              <ul className="space-y-2">
                {t.contactItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 font-light">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 font-light italic mt-4">{t.contactResponse}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F5F2EB]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-[#1B1B1B] mb-4">{t.ctaTitle}</h2>
            <p className="text-gray-600 font-light max-w-md mx-auto mb-8">{t.ctaText}</p>
            <Link
              href={localizeHref("/contacto")}
              className="inline-block bg-[#1B1B1B] text-white hover:bg-[#D4AF37] rounded-sm px-10 py-4 text-sm tracking-widest uppercase transition-all duration-300"
            >
              {t.ctaButton}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
