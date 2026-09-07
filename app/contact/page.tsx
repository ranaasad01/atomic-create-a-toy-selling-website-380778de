"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HeadphonesIcon, ChevronDown } from 'lucide-react';
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3–5 business days. Express shipping (1–2 business days) is available at checkout for an additional fee.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days of purchase. Items must be unused and in original packaging. Simply contact us and we will arrange a free return label.",
  },
  {
    q: "Are your toys safe for young children?",
    a: "All our toys meet or exceed ASTM and CPSC safety standards. Each product page lists the recommended age range and any relevant safety certifications.",
  },
  {
    q: "Do you offer gift wrapping?",
    a: "Yes! Gift wrapping is available for $4.99 per item. You can add a personalized message at checkout.",
  },
  {
    q: "Can I track my order?",
    a: "Absolutely. Once your order ships you will receive a tracking number via email. You can also check order status in your account dashboard.",
  },
];

const SUPPORT_CHANNELS = [
  {
    icon: Mail,
    title: "Email Us",
    detail: BRAND.email,
    note: "Response within 24 hours",
    color: "bg-[var(--accent)]/10 text-[var(--accent)]",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: BRAND.phone,
    note: "Mon–Fri, 9 am – 6 pm EST",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: BRAND.address,
    note: "Open weekdays by appointment",
    color: "bg-violet-100 text-violet-700",
  },
  {
    icon: Clock,
    title: "Live Chat",
    detail: "Available on our website",
    note: "Mon–Sun, 8 am – 10 pm EST",
    color: "bg-sky-100 text-sky-700",
  },
];

export default function ContactPage() {
  const t = useTranslations();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-[var(--accent)] py-20 md:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-4"
            >
              <motion.span
                variants={scaleIn}
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white"
              >
                <MessageSquare className="h-4 w-4" />
                {t("contact.badge")}
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl font-extrabold tracking-tight text-white md:text-5xl text-balance"
              >
                {t("contact.hero.title")}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="max-w-xl text-lg leading-relaxed text-white/80"
              >
                {t("contact.hero.subtitle")}
              </motion.p>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Support Channels */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORT_CHANNELS.map((ch, i) => (
              <Reveal key={ch.title} delay={i * 0.08}>
                <div className="flex flex-col gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.14)]">
                  <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", ch.color)}>
                    <ch.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-[hsl(var(--foreground))]">{ch.title}</p>
                    <p className="mt-0.5 text-sm font-medium text-[hsl(var(--foreground))]">{ch.detail}</p>
                    <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{ch.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Form + Map split */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
                <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                  {t("contact.form.heading")}
                </h2>
                <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  {t("contact.form.subheading")}
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mt-8 flex flex-col items-center gap-4 rounded-xl bg-[var(--accent)]/10 py-12 text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                      <Send className="h-6 w-6" />
                    </span>
                    <p className="text-lg font-bold text-[hsl(var(--foreground))]">
                      {t("contact.form.successTitle")}
                    </p>
                    <p className="max-w-xs text-sm text-[hsl(var(--muted-foreground))]">
                      {t("contact.form.successBody")}
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="mt-2 rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                    >
                      {t("contact.form.sendAnother")}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-sm font-medium text-[hsl(var(--foreground))]">
                          {t("contact.form.nameLabel")}
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder={t("contact.form.namePlaceholder")}
                          className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-[hsl(var(--foreground))]">
                          {t("contact.form.emailLabel")}
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder={t("contact.form.emailPlaceholder")}
                          className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-sm font-medium text-[hsl(var(--foreground))]">
                        {t("contact.form.subjectLabel")}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                      >
                        <option value="">{t("contact.form.subjectPlaceholder")}</option>
                        <option value="order">{t("contact.form.subjectOrder")}</option>
                        <option value="return">{t("contact.form.subjectReturn")}</option>
                        <option value="product">{t("contact.form.subjectProduct")}</option>
                        <option value="wholesale">{t("contact.form.subjectWholesale")}</option>
                        <option value="other">{t("contact.form.subjectOther")}</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-sm font-medium text-[hsl(var(--foreground))]">
                        {t("contact.form.messageLabel")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder={t("contact.form.messagePlaceholder")}
                        className="resize-none rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] outline-none transition-all focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50"
                    >
                      <Send className="h-4 w-4" />
                      {t("contact.form.submit")}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>

            {/* Info panel */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                  <HeadphonesIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-[hsl(var(--foreground))]">
                  {t("contact.info.title")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {t("contact.info.body")}
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {[
                    { label: t("contact.info.hours1"), value: "Mon–Fri: 9 am – 6 pm EST" },
                    { label: t("contact.info.hours2"), value: "Sat: 10 am – 4 pm EST" },
                    { label: t("contact.info.hours3"), value: "Sun: Closed" },
                  ].map((row) => (
                    <li key={row.label} className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-2 last:border-0 last:pb-0">
                      <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{row.label}</span>
                      <span className="text-xs font-semibold text-[hsl(var(--foreground))]">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map placeholder */}
              <div className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
                <img
                  src="/images/toyville-store-map-location.jpg"
                  alt="ToyVille store location map"
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{BRAND.address}</p>
                  <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{t("contact.map.note")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="bg-[hsl(var(--muted))] py-20">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
                {t("contact.faq.heading")}
              </h2>
              <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                {t("contact.faq.subheading")}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {FAQ_ITEMS.map((item, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-[hsl(var(--accent))/5]"
                      aria-expanded={openFaq === i}
                    >
                      <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{item.q}</span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 text-[hsl(var(--muted-foreground))]"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                        {item.a}
                      </p>
                    </motion.div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA Banner */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="relative overflow-hidden rounded-3xl bg-[hsl(var(--foreground))] px-8 py-14 text-center md:px-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--accent)]/20 blur-3xl" />
              <div className="absolute -bottom-12 left-0 h-48 w-48 rounded-full bg-[var(--accent)]/10 blur-2xl" />
            </div>
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                {t("contact.cta.eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl text-balance">
                {t("contact.cta.title")}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base text-white/70">
                {t("contact.cta.body")}
              </p>
              <motion.a
                href={`mailto:${BRAND.email}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-200 hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                {t("contact.cta.button")}
              </motion.a>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}