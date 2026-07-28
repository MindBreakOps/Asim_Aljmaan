"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import CloseButton from "./CloseButton";
import Backdrop from "./Backdrop";
import { useLanguage } from "@/context/LanguageContext";

const OPS_API = 'https://script.google.com/macros/s/AKfycby7xDEoYBzGM7sAAAkX0LDTKNHo63LjbgmaC-0VLXESPFj7BSl10GE-sIqM-Ss3wE8/exec';
const RECIPIENT_EMAIL = 'asim.aljmaan@gmail.com';

export default function ContactOverlay({ onClose }: { onClose: () => void }) {
  const { locale } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    website: 'No',
    needs: [] as string[],
    budget: '',
    timeline: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const body = `NEW PORTFOLIO LEAD\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCountry: ${formData.country}\nWebsite: ${formData.website}\nNeeds: ${formData.needs.join(', ')}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\nMessage: ${formData.message}`;

    try {
      await fetch(OPS_API, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          action: 'sendEmail',
          to: RECIPIENT_EMAIL,
          subject: `Portfolio Inquiry: ${formData.name}`,
          body
        })
      });
      setSubmitted(true);
    } catch (err) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleNeed = (need: string) => {
    setFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
    }));
  };

  const isAr = locale === "ar";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-end pointer-events-none"
    >
      <Backdrop onClick={onClose} />
      <CloseButton onClick={onClose} />

      <motion.div
        initial={{ x: isAr ? "-100%" : "100%" }}
        animate={{ x: 0 }}
        exit={{ x: isAr ? "-100%" : "100%" }}
        transition={{ type: "spring", damping: 35, stiffness: 250 }}
        className={`w-full max-w-2xl h-full bg-[#0a0a0a] border-white/5 p-8 md:p-16 overflow-y-auto pointer-events-auto shadow-2xl relative z-10 flex flex-col ${isAr ? "border-r text-right" : "border-l text-left"}`}
        style={{
          backgroundImage: "linear-gradient(rgba(10,10,10,0.9), rgba(10,10,10,0.9)), url('https://www.transparenttextures.com/patterns/dark-matter.png')",
          backgroundSize: "cover"
        }}
      >
        <div className="mb-12">
          <h2 className="font-display text-7xl text-white tracking-tighter mb-4 uppercase">{isAr ? "اتصل بنا" : "CONTACT"}</h2>
          <div className="font-mono text-[9px] text-white/20 tracking-[0.5em] mb-8 break-all">
            ********************************************************************************
          </div>

          <div className="bg-white text-navy px-8 py-5 flex items-center justify-between group cursor-pointer hover:bg-gold transition-all rounded-sm mb-12">
            <div className={`flex items-center gap-5 ${isAr ? "flex-row-reverse" : "flex-row"}`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.6 13.88C16.39 14.45 15.62 14.96 14.73 15.14C14.11 15.27 13.3 15.41 10.59 14.28C7.12 12.83 4.88 9.3 4.71 9.07C4.54 8.84 3.31 7.21 3.31 5.52C3.31 3.83 4.17 3 4.51 2.66C4.79 2.39 5.24 2.26 5.68 2.26C5.82 2.26 5.95 2.27 6.06 2.27C6.39 2.29 6.56 2.31 6.78 2.84C7.06 3.51 7.74 5.17 7.82 5.34C7.91 5.51 7.99 5.74 7.88 5.97C7.76 6.2 7.67 6.33 7.48 6.55C7.3 6.77 7.08 7.05 6.91 7.23C6.72 7.44 6.51 7.66 6.74 8.06C6.97 8.45 7.76 9.74 8.92 10.77C10.42 12.11 11.63 12.54 12.1 12.73C12.44 12.87 12.84 12.84 13.09 12.57C13.41 12.23 13.8 11.65 14.2 11.08C14.48 10.68 14.83 10.63 15.17 10.76C15.52 10.89 17.34 11.79 17.71 11.98C18.08 12.17 18.33 12.26 18.42 12.41C18.51 12.56 18.51 13.31 16.6 13.88Z"/>
              </svg>
              <span className="font-sans font-black text-sm tracking-tight uppercase">{isAr ? "تحدث عبر الواتساب" : "Chat on WhatsApp"}</span>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="py-24 text-center grow flex flex-col items-center justify-center">
            <h3 className="font-display text-4xl text-gold mb-6 tracking-tighter uppercase">{isAr ? "تم الإرسال بنجاح" : "DISPATCHED SUCCESSFULLY"}</h3>
            <p className="font-sans text-white/50 text-lg">{isAr ? "سأتواصل معك قريباً." : "Transmission received. I will contact you shortly."}</p>
            <button onClick={() => setSubmitted(false)} className="mt-12 text-gold uppercase text-[10px] tracking-[0.5em] border-b border-gold/30 pb-1 hover:border-gold transition-all">
              {isAr ? "إرسال طلب آخر" : "Send Another Inquiry"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12 grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {/* Name */}
              <div className="space-y-5">
                <label className={`flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                  <span className="text-white/40">{isAr ? "الاسم / الشركة" : "Name / Company"}</span>
                </label>
                <input
                  type="text" required
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-gold transition-colors text-white font-light text-lg"
                  placeholder={isAr ? "اسمك أو اسم شركتك" : "Your name or company"}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Email */}
              <div className="space-y-5">
                <label className={`flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                  <span className="text-white/40">{isAr ? "البريد الإلكتروني" : "Email"}</span>
                </label>
                <input
                  type="email" required
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-gold transition-colors text-white font-light text-lg"
                  placeholder="you@company.com"
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Phone */}
              <div className="space-y-5">
                <label className={`flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                  <span className="text-white/40">{isAr ? "الهاتف" : "Phone"}</span>
                </label>
                <input
                  type="tel"
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-gold transition-colors text-white font-light text-lg"
                  placeholder="+966 500 000 000"
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              {/* Country */}
              <div className="space-y-5">
                <label className={`flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                  <span className="text-white/40">{isAr ? "البلد" : "Country"}</span>
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-gold transition-colors text-white font-light text-lg"
                  placeholder={isAr ? "السعودية، الإمارات، إلخ" : "Saudi Arabia, UAE, etc."}
                  onChange={e => setFormData({...formData, country: e.target.value})}
                />
              </div>

              {/* Website */}
              <div className="space-y-5">
                <label className={`flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                  <span className="text-white/40">{isAr ? "الموقع الحالي" : "Website"}</span>
                </label>
                <div className={`flex gap-12 pt-3 ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                  {["Yes", "No"].map(opt => (
                    <label key={opt} className="flex items-center gap-4 cursor-pointer group">
                      <input
                        type="radio" name="website" value={opt}
                        checked={formData.website === opt}
                        onChange={e => setFormData({...formData, website: e.target.value})}
                        className="hidden"
                      />
                      <div className={`size-6 border rounded-sm ${formData.website === opt ? 'border-gold bg-gold/20' : 'border-white/10'} transition-all`} />
                      <span className="font-mono text-xs uppercase text-white/60 group-hover:text-gold transition-colors">
                        {opt} {isAr ? (opt === "Yes" ? "(نعم)" : "(لا)") : ""}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Needs */}
            <div className="space-y-8 pt-6">
              <label className={`flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase border-b border-white/5 pb-3 ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                <span className="text-white/40">{isAr ? "المتطلبات" : "Needs"}</span>
              </label>
              <div className={`grid grid-cols-2 md:grid-cols-3 gap-6 ${isAr ? "rtl" : "ltr"}`}>
                {["Website", "Landing Page", "Event Page", "Redesign", "Other"].map(need => (
                  <button
                    key={need} type="button"
                    onClick={() => toggleNeed(need)}
                    className={`flex items-center gap-4 group ${isAr ? "flex-row-reverse text-right" : "flex-row"}`}
                  >
                    <div className={`size-6 border rounded-sm ${formData.needs.includes(need) ? 'border-gold bg-gold/20' : 'border-white/10'} transition-all`} />
                    <span className="font-mono text-xs uppercase text-white/60 group-hover:text-gold transition-colors">{need}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-5">
                <label className={`flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                  <span className="text-white/40">{isAr ? "الميزانية" : "Budget"}</span>
                </label>
                <div className="relative group">
                    <select
                        className={`w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-gold transition-colors text-white/60 font-mono text-xs uppercase appearance-none cursor-pointer ${isAr ? "text-right" : "text-left"}`}
                        onChange={e => setFormData({...formData, budget: e.target.value})}
                    >
                        <option value="" className="bg-[#0a0a0a]">Budget Range</option>
                        <option value="<$5k" className="bg-[#0a0a0a]">&lt; $5,000</option>
                        <option value="$5k-$15k" className="bg-[#0a0a0a]">$5,000 - $15,000</option>
                        <option value="$15k+" className="bg-[#0a0a0a]">$15,000+</option>
                    </select>
                </div>
              </div>

              <div className="space-y-5">
                <label className={`flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase ${isAr ? "flex-row-reverse" : "flex-row"}`}>
                  <span className="text-white/40">{isAr ? "الجدول الزمني" : "Timeline"}</span>
                </label>
                <div className="relative group">
                    <select
                        className={`w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-gold transition-colors text-white/60 font-mono text-xs uppercase appearance-none cursor-pointer ${isAr ? "text-right" : "text-left"}`}
                        onChange={e => setFormData({...formData, timeline: e.target.value})}
                    >
                        <option value="" className="bg-[#0a0a0a]">Schedule</option>
                        <option value="ASAP" className="bg-[#0a0a0a]">ASAP</option>
                        <option value="1-2 Months" className="bg-[#0a0a0a]">1-2 Months</option>
                        <option value="3+ Months" className="bg-[#0a0a0a]">3+ Months</option>
                    </select>
                </div>
              </div>
            </div>

            {/* Submission */}
            <div className="pt-16">
              <button
                type="submit" disabled={isSubmitting}
                className={`w-full group py-8 border-t border-white/5 flex justify-between items-center hover:bg-gold/5 transition-all px-4 ${isAr ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`flex flex-col items-start ${isAr ? "text-right items-end" : "text-left"}`}>
                  <span className="font-display text-4xl text-white group-hover:text-gold transition-colors uppercase tracking-tight">
                    {isSubmitting ? (isAr ? "جاري الإرسال..." : "Dispatching...") : (isAr ? "إرسال الطلب" : "Send Inquiry")}
                  </span>
                  <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.5em] mt-2">إرسال الطلب | SEND TRANSMISSION</span>
                </div>
                <div className="size-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-all duration-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`text-white group-hover:text-navy transition-colors ${isAr ? "rotate-180" : ""}`}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </div>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
