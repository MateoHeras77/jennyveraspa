"use client";

import { useActionState, useState } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { sendContactEmail } from "@/actions/contact";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, getLocaleFromPathname } from "@/lib/i18n";

const formCopy = {
    es: {
        name: "Nombre Completo",
        namePlaceholder: "Ej. Maria Perez",
        email: "Correo Electrónico (Opcional)",
        phone: "Teléfono / WhatsApp",
        contactPreference: "Preferencia de Contacto",
        whatsapp: "WhatsApp",
        emailOption: "Correo Electrónico",
        service: "Servicio de Interés",
        selectService: "Selecciona un servicio...",
        other: "Otro / Consulta General",
        comments: "Comentarios Adicionales",
        commentsPlaceholder: "¿Alguna duda específica o preferencia de horario?",
        sending: "Enviando...",
        submit: "Solicitar Cita",
    },
    en: {
        name: "Full Name",
        namePlaceholder: "e.g. Maria Perez",
        email: "Email (Optional)",
        phone: "Phone / WhatsApp",
        contactPreference: "Contact Preference",
        whatsapp: "WhatsApp",
        emailOption: "Email",
        service: "Service of Interest",
        selectService: "Select a service...",
        other: "Other / General Inquiry",
        comments: "Additional Notes",
        commentsPlaceholder: "Any specific question or preferred schedule?",
        sending: "Sending...",
        submit: "Request Appointment",
    },
} as const;

export function ContactForm() {
    const [state, formAction, isPending] = useActionState(sendContactEmail, {
        inputs: {
            name: "",
            phone: "",
            email: "",
            service: "",
            contactPreference: "whatsapp",
            message: "",
        }
    });

    const [phone, setPhone] = useState("");
    const phoneValue = phone || state.inputs?.phone || "";
    // Handle phone updates from server state if needed, though typically phone input manages its own state well.
    // If state.inputs.phone changes (e.g. after error), update local state.
    // However, react-international-phone is controlled.
    
    const pathname = usePathname();
    const locale = getLocaleFromPathname(pathname) ?? DEFAULT_LOCALE;
    const copy = formCopy[locale];

    return (
        <form action={formAction} className="space-y-6">
            
            {/* Success Message */}
            {state.success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative flex items-center gap-2" role="alert">
                    <CheckCircle2 size={18} />
                    <span className="block sm:inline">{state.message}</span>
                </div>
            )}

            {/* Error Message (Global) */}
            {state?.success === false && state?.message && (
                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center gap-2" role="alert">
                    <AlertCircle size={18} />
                    <span className="block sm:inline">{state.message}</span>
                </div>
            )}

            {/* Name Field */}
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                    {copy.name} <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    defaultValue={state.inputs?.name}
                    className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder={copy.namePlaceholder}
                />
                {state?.errors?.name && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
                )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                    {copy.email}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={state.inputs?.email}
                    className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="example@email.com"
                />
                {state?.errors?.email && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
                )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
                <label htmlFor="phone" className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                    {copy.phone} <span className="text-red-500">*</span>
                </label>
                <div className="phone-input-container">
                    <input type="hidden" name="phone" value={phoneValue} />
                    <PhoneInput
                        defaultCountry="ec"
                        value={phoneValue}
                        onChange={(phone) => setPhone(phone)}
                        required
                        inputClassName="!w-full !bg-white !border-gray-200 !p-4 !h-[58px] !rounded-none focus:!border-[#D4AF37] !text-base"
                        countrySelectorStyleProps={{
                            buttonClassName: "!bg-white !border-gray-200 !h-[58px] !rounded-none !px-3",
                        }}
                    />
                </div>
                {state?.errors?.phone && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.phone[0]}</p>
                )}
            </div>

            {/* Contact Preference */}
            <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                    {copy.contactPreference} <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6 items-center pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="contactPreference"
                            value="whatsapp"
                            defaultChecked={state.inputs?.contactPreference === "whatsapp" || !state.inputs?.contactPreference}
                            className="accent-[#D4AF37] w-4 h-4"
                        />
                         <span className="text-gray-700">{copy.whatsapp}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="contactPreference"
                            value="email"
                            defaultChecked={state.inputs?.contactPreference === "email"}
                            className="accent-[#D4AF37] w-4 h-4"
                        />
                        <span className="text-gray-700">{copy.emailOption}</span>
                    </label>
                </div>
                 {state?.errors?.contactPreference && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.contactPreference[0]}</p>
                )}
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
                <label htmlFor="service" className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                    {copy.service} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        id="service"
                        name="service"
                        required
                        defaultValue={state.inputs?.service}
                        className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37] transition-colors text-gray-700 appearance-none rounded-none"
                    >
                        <option value="" disabled>{copy.selectService}</option>
                        {SERVICE_CATEGORIES.map((category) => (
                            <optgroup key={category.category} label={category.category}>
                                {category.services.map((service) => (
                                    <option key={service.name} value={service.name}>
                                        {service.name}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                        <option value="Otro">{copy.other}</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
                {state?.errors?.service && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.service[0]}</p>
                )}
            </div>

            {/* Message Field (Optional) */}
             <div className="space-y-2">
                <label htmlFor="message" className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                    {copy.comments}
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    defaultValue={state.inputs?.message}
                    className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    placeholder={copy.commentsPlaceholder}
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className={clsx(
                    "w-full bg-[#1A1A1A] text-white py-4 mt-4 uppercase tracking-widest text-sm hover:bg-[#D4AF37] transition-colors flex justify-center items-center gap-2",
                    isPending && "opacity-70 cursor-not-allowed"
                )}
            >
                {isPending ? (
                    <>
                        <Loader2 className="animate-spin" size={18} />
                        {copy.sending}
                    </>
                ) : (
                    copy.submit
                )}
            </button>
        </form>
    );
}
