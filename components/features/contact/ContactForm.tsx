"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const API_CONTACT = "/api/contact";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Ad Soyad gerekli";
    if (!email.trim()) e.email = "E-posta gerekli";
    else if (!isValidEmail(email)) e.email = "Geçerli bir e-posta girin";
    if (!subject.trim()) e.subject = "Konu gerekli";
    if (!message.trim()) e.message = "Mesaj gerekli";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch(API_CONTACT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setResult({
          type: "success",
          text: data.message ?? "Mesajınız alındı, en kısa sürede dönüş yapacağız.",
        });
        setName("");
        setPhone("");
        setEmail("");
        setSubject("");
        setMessage("");
        setErrors({});
      } else {
        setResult({
          type: "error",
          text: data.error ?? "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
        });
      }
    } catch {
      setResult({
        type: "error",
        text: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-lg border bg-[var(--color-surface)] px-3 py-2.5 pl-10 sm:pl-10 text-sm sm:text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent";
  const errorBorder = "border-red-500/60";
  const iconWrap = "absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none [&>svg]:w-5 [&>svg]:h-5";

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-1">
        Mesaj Gönder
      </h2>
      <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mb-6 sm:mb-8">
        Formu doldurun, en kısa sürede size dönüş yapacağım.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="relative">
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
            >
              Ad Soyad <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className={iconWrap} aria-hidden>
                <UserIcon />
              </span>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${inputBase} ${errors.name ? errorBorder : ""}`}
                placeholder="Adınız Soyadınız"
                disabled={submitting}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
              />
            </div>
            {errors.name && (
              <p id="contact-name-error" className="mt-1 text-sm text-red-500">
                {errors.name}
              </p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="contact-phone"
              className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
            >
              Telefon
            </label>
            <div className="relative">
              <span className={iconWrap} aria-hidden>
                <PhoneIcon />
              </span>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputBase}
                placeholder="0555 555 55 55"
                disabled={submitting}
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
          >
            E-posta <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className={iconWrap} aria-hidden>
              <EnvelopeIcon />
            </span>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputBase} ${errors.email ? errorBorder : ""}`}
              placeholder="ornek@email.com"
              disabled={submitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
          </div>
          {errors.email && (
            <p id="contact-email-error" className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div className="relative">
          <label
            htmlFor="contact-subject"
            className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
          >
            Konu <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className={iconWrap} aria-hidden>
              <DocumentIcon />
            </span>
            <input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={`${inputBase} ${errors.subject ? errorBorder : ""}`}
              placeholder="Mesajınızın konusu"
              disabled={submitting}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            />
          </div>
          {errors.subject && (
            <p id="contact-subject-error" className="mt-1 text-sm text-red-500">
              {errors.subject}
            </p>
          )}
        </div>

        <div className="relative">
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
          >
            Mesaj <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-[var(--color-text-muted)] pointer-events-none [&>svg]:w-5 [&>svg]:h-5" aria-hidden>
              <DocumentIcon />
            </span>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className={`${inputBase} pl-10 resize-y min-h-[120px] ${errors.message ? errorBorder : ""}`}
              placeholder="Mesajınızı buraya yazın...."
              disabled={submitting}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
            />
          </div>
          {errors.message && (
            <p id="contact-message-error" className="mt-1 text-sm text-red-500">
              {errors.message}
            </p>
          )}
        </div>

        {result && (
          <p
            className={`text-sm sm:text-base ${
              result.type === "success"
                ? "text-[var(--color-primary)]"
                : "text-red-500"
            }`}
            role="status"
          >
            {result.text}
          </p>
        )}

        <Button type="submit" disabled={submitting} className="w-full justify-center gap-2">
          <PaperPlaneIcon className="w-5 h-5" />
          {submitting ? "Gönderiliyor…" : "Mesaj Gönder"}
        </Button>
      </form>
    </div>
  );
}
