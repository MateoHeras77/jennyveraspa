"use client";

import { useActionState, useState, useEffect } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { sendContactEmail } from "@/actions/contact";
import clsx from "clsx";

export function ContactForm() {
    const [state, formAction, isPending] = useActionState(sendContactEmail, {
        inputs: {
            name: "",
            phone: "",
            service: "",
            message: "",
        }
    });

    const [phone, setPhone] = useState(state.inputs?.phone || "");

    useEffect(() => {
        if (state.inputs?.phone) {
            setPhone(state.inputs.phone);
        }
    }, [state.inputs?.phone]);

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
                    Nombre Completo <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    defaultValue={state.inputs?.name}
                    className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Ej. María Pérez"
                />
                {state?.errors?.name && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
                )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
                <label htmlFor="phone" className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                    Teléfono / WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="phone-input-container">
                    <input type="hidden" name="phone" value={phone} />
                    <PhoneInput
                        defaultCountry="ec"
                        value={phone}
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

            {/* Service Selection */}
            <div className="space-y-2">
                <label htmlFor="service" className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                    Servicio de Interés <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <select
                        id="service"
                        name="service"
                        required
                        defaultValue={state.inputs?.service}
                        className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37] transition-colors text-gray-700 appearance-none rounded-none"
                    >
                        <option value="" disabled>Selecciona un servicio...</option>
                        {SERVICE_CATEGORIES.map((category) => (
                            <optgroup key={category.category} label={category.category}>
                                {category.services.map((service) => (
                                    <option key={service.name} value={service.name}>
                                        {service.name}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                        <option value="Otro">Otro / Consulta General</option>
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
                    Comentarios Adicionales
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    defaultValue={state.inputs?.message}
                    className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    placeholder="¿Alguna duda específica o preferencia de horario?"
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
                        Enviando...
                    </>
                ) : (
                    "Solicitar Cita"
                )}
            </button>
        </form>
    );
}
