"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  phone: z.string().min(7, "El número de teléfono no es válido"), // Basic length check, the UI component handles strict validation
  service: z.string().min(1, "Por favor selecciona un servicio"),
  message: z.string().optional(),
});

export type ContactState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    phone?: string[];
    service?: string[];
    message?: string[];
  };
  inputs?: {
    name: string;
    phone: string;
    service: string;
    message: string;
  };
};

export async function sendContactEmail(prevState: ContactState, formData: FormData): Promise<ContactState> {
  // Extract data
  const rawData = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    service: formData.get("service") as string,
    message: formData.get("message") as string,
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

  const { name, phone, service, message } = validatedFields.data;

  // Check for environment variables
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.error("Missing Gmail credentials in .env file");
    return {
      success: false,
      message: "Error del servidor: No se pudo enviar el mensaje. Intente más tarde.",
      inputs: rawData,
    };
  }

  try {
    // Configure Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email Content
    const mailOptions = {
      from: `"Jenny Vera Spa Web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Sed to yourself (the spa owner)
      subject: `Nueva Solicitud de Cita: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Nueva Solicitud de Cita</h2>
          <p>Has recibido un nuevo mensaje desde el formulario de contacto de la web.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Nombre:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Teléfono:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="tel:${phone}" style="color: #1A1A1A; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Servicio de Interés:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${service}</td>
            </tr>
             <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Comentarios:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${message || "Sin comentarios adicionales"}</td>
            </tr>
          </table>

          <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; text-align: center;">
            <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Contactar por WhatsApp</a>
          </div>
        </div>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
      inputs: { name: "", phone: "", service: "", message: "" }, // Clear form
    };

  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.",
      inputs: rawData,
    };
  }
}
