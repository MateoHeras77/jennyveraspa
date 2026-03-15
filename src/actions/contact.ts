"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

function getEnvValue(key: "GMAIL_USER" | "GMAIL_PASS") {
  return process.env[key]?.trim();
}

/**
 * Zod Schema for validation
 */
const contactSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  phone: z.string().min(7, "El número de teléfono no es válido"),
  email: z.union([z.literal(""), z.string().email("El email no es válido")]), // Optional: empty string OR valid email
  service: z.string().min(1, "Por favor selecciona un servicio"),
  contactPreference: z.string().refine((val) => val === "whatsapp" || val === "email", {
    message: "Por favor selecciona una preferencia",
  }), // Validates manually against expected values
  message: z.string().optional(),
});

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

  // Validate data
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
      cc: "wmateohv@hotmail.com",
      replyTo: email || undefined, // Set Reply-To if email is provided
      subject: `Nuevo Cliente (${
        isEmailPref ? "Email" : "WhatsApp"
      }): ${name}`,
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
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">Teléfono:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="tel:${phone}" style="color: #1A1A1A; text-decoration: none;">${phone}</a>
                <a href="https://wa.me/${phone.replace(
                  /[^0-9]/g,
                  ""
                )}" style="margin-left: 10px; font-size: 0.85em; color: #25D366; text-decoration: none;">(Link WhatsApp)</a>
              </td>
            </tr>
            ${
              email
                ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                 <a href="mailto:${email}" style="color: #0056b3;">${email}</a>
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">Servicio de Interés:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${service}</td>
            </tr>
             <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">Comentarios:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${
                message || "Sin comentarios adicionales"
              }</td>
            </tr>
          </table>

          <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; text-align: center;">
            <p style="margin: 0 0 10px; font-size: 0.9em; color: #666;">Acciones Rápidas:</p>
            <a href="https://wa.me/${phone.replace(
              /[^0-9]/g,
              ""
            )}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-right: 10px; display: inline-block;">WhatsApp</a>
            ${
              email
                ? `<a href="mailto:${email}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Responder Email</a>`
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
