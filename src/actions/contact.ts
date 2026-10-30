"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import { SERVICE_CATEGORIES } from "@/lib/constants";

function getEnvValue(key: "GMAIL_USER" | "GMAIL_PASS") {
  return process.env[key]?.trim();
}

/**
 * Antispam (oct 2026). Llegaban formularios con nombres tipo «aksnfdnakdnfkajdnfna»
 * porque no había ninguna barrera: el teléfono solo exigía 7 caracteres cualesquiera.
 * Capas, todas invisibles para una persona real:
 *  1. Campo trampa `empresa_web`: oculto para humanos; los bots lo rellenan.
 *  2. Tiempo `_t`: marca puesta por el navegador al montar el formulario. Sin ella
 *     (POST directo a la server action) o con menos de 3 s, es un bot.
 *  3. Validación estricta (abajo): teléfono con 7-15 dígitos, nombre con letras,
 *     servicio del catálogo y detector de nombres sin sentido.
 * Los descartes por 1 y 2 devuelven un «éxito» falso para que el bot no aprenda,
 * y se registran en los logs de Vercel con el prefijo [contacto].
 */
const TIEMPO_MINIMO_MS = 3000;
const TIEMPO_MAXIMO_MS = 24 * 60 * 60 * 1000;

const SERVICIOS_VALIDOS = new Set([
  ...SERVICE_CATEGORIES.flatMap((c) => c.services.map((s) => s.name)),
  "Otro",
]);

// Seis consonantes seguidas no aparecen en nombres reales en español ni en inglés
// («Nietzsche» tiene cinco); en el tecleo aleatorio, casi siempre.
const parecePalabraSinSentido = (texto: string) =>
  /[bcdfghjklmnñpqrstvwxz]{6,}/i.test(texto) || texto.split(/\s+/).some((p) => p.length > 20);

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre es muy corto")
    .max(80, "El nombre es demasiado largo")
    .regex(/^[\p{L}][\p{L}\s.'-]*$/u, "Escribe tu nombre solo con letras")
    .refine((v) => !parecePalabraSinSentido(v), "Por favor escribe tu nombre real"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]+$/, "El número de teléfono no es válido")
    .refine((v) => {
      const digitos = v.replace(/\D/g, "").length;
      return digitos >= 7 && digitos <= 15;
    }, "El número de teléfono no es válido"),
  email: z.union([z.literal(""), z.string().trim().email("El email no es válido").max(120)]),
  service: z
    .string()
    .refine((v) => SERVICIOS_VALIDOS.has(v), "Por favor selecciona un servicio"),
  contactPreference: z.string().refine((val) => val === "whatsapp" || val === "email", {
    message: "Por favor selecciona una preferencia",
  }),
  message: z.string().max(2000, "El mensaje es demasiado largo").optional(),
});

/** Escapa texto del usuario antes de insertarlo en el HTML del correo. */
const escapar = (texto: string) =>
  texto.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const EXITO_FALSO_INPUTS = {
  name: "",
  phone: "",
  email: "",
  service: "",
  contactPreference: "whatsapp",
  message: "",
};

export type ContactState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    phone?: string[];
    email?: string[];
    service?: string[];
    contactPreference?: string[];
    message?: string[];
  };
  inputs?: {
    name: string;
    phone: string;
    email: string;
    service: string;
    contactPreference: string;
    message: string;
  };
};

export async function sendContactEmail(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Extract data safely handling nulls as empty strings for robust processing
  const rawData = {
    name: (formData.get("name") as string) || "",
    phone: (formData.get("phone") as string) || "",
    email: (formData.get("email") as string) || "",
    service: (formData.get("service") as string) || "",
    contactPreference: (formData.get("contactPreference") as string) || "",
    message: (formData.get("message") as string) || "",
  };

  // Capas 1 y 2: bots evidentes → éxito falso, sin enviar nada
  const trampa = (formData.get("empresa_web") as string) || "";
  const t = Number(formData.get("_t"));
  const transcurrido = Date.now() - t;
  const motivo = trampa
    ? "campo trampa relleno"
    : !t
      ? "sin marca de tiempo"
      : transcurrido < TIEMPO_MINIMO_MS
        ? `enviado en ${transcurrido} ms`
        : transcurrido > TIEMPO_MAXIMO_MS
          ? "marca de tiempo caducada"
          : (rawData.message.match(/https?:\/\//gi)?.length ?? 0) >= 2
            ? "mensaje con enlaces"
            : null;
  if (motivo) {
    console.warn(`[contacto] descartado (${motivo}): nombre="${rawData.name.slice(0, 40)}"`);
    return {
      success: true,
      message: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
      inputs: EXITO_FALSO_INPUTS,
    };
  }

  // Capa 3: validación estricta
  const validatedFields = contactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Por favor revisa los campos del formulario.",
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  const { name, phone, email, service, contactPreference, message } =
    validatedFields.data;
  // Todo lo que va al HTML del correo, escapado
  const h = {
    name: escapar(name),
    phone: escapar(phone),
    email: escapar(email),
    service: escapar(service),
    message: escapar(message || ""),
    digitos: phone.replace(/[^0-9]/g, ""),
  };

  // Check for environment variables
  const gmailUser = getEnvValue("GMAIL_USER");
  const gmailPass = getEnvValue("GMAIL_PASS");

  if (!gmailUser || !gmailPass) {
    console.error("Missing Gmail credentials in .env file");
    return {
      success: false,
      message:
        "Error del servidor: No se pudo enviar el mensaje. Intente más tarde.",
      inputs: rawData,
    };
  }

  try {
    // Configure Transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const isEmailPref = contactPreference === "email";

    // Email Content
    const mailOptions = {
      from: `"Jenny Vera Spa Web" <${gmailUser}>`,
      to: "chelis.vera@hotmail.com",
      cc: ["wmateohv@hotmail.com", "salomeherasvera@hotmail.com"],
      replyTo: email || undefined, // Set Reply-To if email is provided
      subject: `Nuevo Cliente (${
        isEmailPref ? "Email" : "WhatsApp"
      }): ${name.replace(/[\r\n]/g, " ")}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Nuevo Cliente desde la Web</h2>
          <p>Has recibido un nuevo mensaje desde el formulario de contacto de la web.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
             <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 160px; background-color: #f9f9f9;">Preferencia de Contacto:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: ${
                isEmailPref ? "#0056b3" : "#25D366"
              };">
                ${isEmailPref ? "Correo Electrónico" : "WhatsApp"}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">Nombre:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${h.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">Teléfono:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="tel:${h.digitos}" style="color: #1A1A1A; text-decoration: none;">${h.phone}</a>
                <a href="https://wa.me/${h.digitos}" style="margin-left: 10px; font-size: 0.85em; color: #25D366; text-decoration: none;">(Link WhatsApp)</a>
              </td>
            </tr>
            ${
              email
                ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                 <a href="mailto:${h.email}" style="color: #0056b3;">${h.email}</a>
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">Servicio de Interés:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${h.service}</td>
            </tr>
             <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">Comentarios:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${
                h.message || "Sin comentarios adicionales"
              }</td>
            </tr>
          </table>

          <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; text-align: center;">
            <p style="margin: 0 0 10px; font-size: 0.9em; color: #666;">Acciones Rápidas:</p>
            <a href="https://wa.me/${h.digitos}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-right: 10px; display: inline-block;">WhatsApp</a>
            ${
              email
                ? `<a href="mailto:${h.email}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Responder Email</a>`
                : ""
            }
          </div>
        </div>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message:
        "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
      inputs: {
        name: "",
        phone: "",
        email: "",
        service: "",
        contactPreference: "whatsapp",
        message: "",
      }, // Clear form
    };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: unknown }).code === "EAUTH"
    ) {
      console.error("GMAIL AUTH ERROR: Please check your App Password.");
    } else {
      console.error("Error sending email:", error);
    }
    return {
      success: false,
      message: "Error al enviar el correo. Por favor intenta de nuevo.",
      inputs: rawData,
    };
  }
}
