"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const OPS_API = 'https://script.google.com/macros/s/AKfycby7xDEoYBzGM7sAAAkX0LDTKNHo63LjbgmaC-0VLXESPFj7BSl10GE-sIqM-Ss3wE8/exec';
const RECIPIENT_EMAIL = 'asim.aljmaan@gmail.com';

export default function ContactPortal() {
  const { t, locale } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    needs: [] as string[],
    message: ''
  });

  const isAr = locale === "ar";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
        action: 'sendEmail',
        to: RECIPIENT_EMAIL,
        subject: `[Asim_OS] New Project Inquiry from ${formData.name}`,
        body: `
            SYSTEM TRANSMISSION RECEIVED
            ---------------------------
            IDENTITY: ${formData.name}
            CONTACT: ${formData.email}
            PHONE: ${formData.phone}
            LOCALE: ${formData.country}
            REQUIREMENTS: ${formData.needs.join(', ')}

            TRANSMISSION CONTENT:
            ${formData.message}
            ---------------------------
            TIMESTAMP: ${new Date().toISOString()}
        `
    };

    try {
      await fetch(OPS_API, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setSubmitted(true);
    } catch (err) {
        alert("CRITICAL ERROR: Transmission failed to reach central server. Please try direct WhatsApp.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const toggleNeed = (need: string) => {
    setFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(need) ? prev.needs.filter(n => n !== need) : [...prev.needs, need]
    }));
  };

  return (
    <div className="w-full h-full flex bg-[#F6F6F6] text-black font-sans">

        {/* SIDEBAR */}
        <div className="w-64 bg-[#E8E8E8]/50 backdrop-blur-xl border-r border-black/5 flex flex-col p-4 shrink-0">
            <div className="mb-8 px-4">
                <h2 className="text-[11px] font-black text-black/30 uppercase tracking-[0.2em] mb-4">Transmission_Menu</h2>
                <div className="space-y-1">
                    <div className="bg-mac-blue text-white px-3 py-2 rounded-md text-[13px] font-semibold flex items-center gap-3 shadow-md">
                        <span className="text-base">✉️</span> New Inquiry
                    </div>
                    <div className="px-3 py-2 rounded-md text-[13px] font-medium text-black/60 hover:bg-black/5 transition-colors flex items-center gap-3 cursor-default">
                        <span className="text-base opacity-40">⏳</span> History
                    </div>
                    <div className="px-3 py-2 rounded-md text-[13px] font-medium text-black/60 hover:bg-black/5 transition-colors flex items-center gap-3 cursor-default">
                        <span className="text-base opacity-40">⚙️</span> Config
                    </div>
                </div>
            </div>

            <div className="mt-auto px-4 py-8 border-t border-black/5">
                <a
                    href="https://wa.me/966500823643"
                    target="_blank"
                    className="flex items-center gap-3 group"
                >
                    <div className="size-8 rounded-full bg-mac-green flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
                        💬
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-black/80">Direct_Link</span>
                        <span className="text-[9px] font-mono text-black/40 uppercase">OPS_READY</span>
                    </div>
                </a>
            </div>
        </div>

        {/* MAIN FORM AREA */}
        <div className="flex-1 overflow-y-auto p-12 md:p-20 bg-white">
            <div className="max-w-3xl mx-auto space-y-12">

                <header className={`space-y-4 ${isAr ? "text-right" : "text-left"}`}>
                    <h1 className="text-4xl font-black tracking-tight">{isAr ? "بدء مشروع جديد" : "SYSTEM_INQUIRY"}</h1>
                    <p className="text-lg text-black/40 font-light leading-relaxed">
                        {isAr
                            ? "أدخل معايير المشروع لبدء معالجة النظام."
                            : "Enter project parameters to initialize system processing."}
                    </p>
                </header>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-20 text-center flex flex-col items-center gap-6 bg-[#F6F6F6] rounded-2xl border border-black/5 shadow-inner"
                    >
                        <div className="size-16 rounded-full bg-mac-green/10 border-2 border-mac-green flex items-center justify-center text-3xl">
                            ✓
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase mb-2">Transmission_Success</h3>
                            <p className="text-black/50 font-medium">{t("form.success_msg")}</p>
                        </div>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="mac-button-primary mt-4"
                        >
                            {t("form.retry")}
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-12">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-2">
                                <label className="mac-label">{t("form.name")}</label>
                                <input required onChange={e => setFormData({...formData, name: e.target.value})} className={`w-full mac-input ${isAr ? "text-right" : "text-left"}`} placeholder="ENTER_NAME..." />
                            </div>
                            <div className="space-y-2">
                                <label className="mac-label">{t("form.email")}</label>
                                <input required type="email" onChange={e => setFormData({...formData, email: e.target.value})} className={`w-full mac-input ${isAr ? "text-right" : "text-left"}`} placeholder="EMAIL@SYSTEM.COM" />
                            </div>
                            <div className="space-y-2">
                                <label className="mac-label">{t("form.phone")}</label>
                                <input type="tel" onChange={e => setFormData({...formData, phone: e.target.value})} className={`w-full mac-input ${isAr ? "text-right" : "text-left"}`} placeholder="+966 --- --- ---" />
                            </div>
                            <div className="space-y-2">
                                <label className="mac-label">{t("form.country")}</label>
                                <input onChange={e => setFormData({...formData, country: e.target.value})} className={`w-full mac-input ${isAr ? "text-right" : "text-left"}`} placeholder="LOCATION..." />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <label className="mac-label">{t("form.needs")}</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {["ERP_Systems", "Web_Apps", "Operations", "Consulting"].map(need => (
                                    <button
                                        key={need} type="button"
                                        onClick={() => toggleNeed(need)}
                                        className={`px-4 py-3 rounded-xl border transition-all flex items-center justify-center gap-3 ${
                                            formData.needs.includes(need)
                                            ? 'border-mac-blue bg-mac-blue/5 text-mac-blue shadow-sm'
                                            : 'border-black/5 bg-black/5 hover:bg-black/10'
                                        }`}
                                    >
                                        <div className={`size-3 rounded-full border-2 transition-all ${
                                            formData.needs.includes(need) ? 'border-mac-blue bg-mac-blue scale-125' : 'border-black/20'
                                        }`} />
                                        <span className={`text-[11px] font-black uppercase tracking-tight ${
                                            formData.needs.includes(need) ? 'text-mac-blue' : 'text-black/40'
                                        }`}>{need}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="mac-label">{t("form.message")}</label>
                            <textarea
                                rows={5}
                                required
                                onChange={e => setFormData({...formData, message: e.target.value})}
                                className={`w-full mac-input resize-none ${isAr ? "text-right" : "text-left"}`}
                                placeholder={isAr ? "صف متطلباتك هنا..." : "DESCRIBE SYSTEM REQUIREMENTS..."}
                            />
                        </div>

                        <div className={`flex justify-end pt-8 border-t border-black/5 ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mac-button-primary h-12 min-w-[200px] flex items-center justify-center gap-4 text-sm"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>PROCESSING...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>INITIATE_TRANSMISSION</span>
                                        <span className="text-xl">➔</span>
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                )}
            </div>
        </div>
    </div>
  );
}
