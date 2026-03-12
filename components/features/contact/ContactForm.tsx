"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const API_CONTACT = "/api/contact";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Ad gerekli";
    if (!email.trim()) e.email = "E-posta gerekli";
    else if (!isValidEmail(email)) e.email = "Geçerli bir e-posta girin";
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
    "w-full rounded-lg border bg-[var(--color-surface)] px-3 py-2 text-sm sm:text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent";
  const errorBorder = "border-red-500/60";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 sm:mt-10 space-y-4 sm:space-y-5 max-w-xl"
      noValidate
    >
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
        >
          Ad / İsim <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${inputBase} ${errors.name ? errorBorder : ""}`}
          placeholder="Adınız"
          disabled={submitting}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1 text-sm text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
        >
          E-posta <span className="text-red-500">*</span>
        </label>
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
        {errors.email && (
          <p id="contact-email-error" className="mt-1 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
        >
          Konu <span className="text-[var(--color-text-muted)]">(opsiyonel)</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputBase}
          placeholder="Konu"
          disabled={submitting}
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
        >
          Mesaj <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className={`${inputBase} resize-y min-h-[120px] ${errors.message ? errorBorder : ""}`}
          placeholder="Mesajınızı yazın..."
          disabled={submitting}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
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

      <Button type="submit" disabled={submitting}>
        {submitting ? "Gönderiliyor…" : "Gönder"}
      </Button>
    </form>
  );
}
