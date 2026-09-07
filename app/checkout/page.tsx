"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check, ShoppingBag, Lock, CreditCard, MapPin, User, ChevronRight, X } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/data";
import { cn } from "@/lib/utils";

const MOCK_CART_ITEMS = [
  {
    id: "1",
    name: "Adventure Hero Action Figure",
    image: "/images/action-figure-hero-adventure.jpg",
    price: 24.99,
    quantity: 2,
    category: "Action Figures",
  },
  {
    id: "2",
    name: "Rainbow Stacking Rings",
    image: "/images/rainbow-stacking-rings-toy.jpg",
    price: 18.5,
    quantity: 1,
    category: "Educational",
  },
  {
    id: "3",
    name: "Cozy Teddy Bear Plush",
    image: "/images/cozy-teddy-bear-plush.jpg",
    price: 32.0,
    quantity: 1,
    category: "Dolls & Plush",
  },
];

const SHIPPING_COST = 5.99;
const FREE_SHIPPING_THRESHOLD = 75;

const successOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const successModal: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const checkmarkCircle: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 0.2, duration: 0.5, ease: "easeOut" } },
};

const checkmarkPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { delay: 0.5, duration: 0.5, ease: "easeOut" } },
};

function SuccessModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={successOverlay}
        initial="hidden"
        animate="visible"
        exit="hidden"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      >
        <motion.div
          className="relative w-full max-w-md rounded-3xl bg-[hsl(var(--card))] p-10 text-center shadow-[0_8px_48px_-8px_rgba(0,0,0,0.25)]"
          variants={successModal}
          initial="hidden"
          animate="visible"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center">
            <motion.div
              className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--accent)]/20"
              variants={checkmarkCircle}
              initial="hidden"
              animate="visible"
            >
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="28" fill="var(--accent)" opacity="0.15" />
                <motion.path
                  d="M16 28.5L23.5 36L40 20"
                  stroke="var(--accent)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={checkmarkPath}
                  initial="hidden"
                  animate="visible"
                />
              </svg>
            </motion.div>
          </div>

          <h2 className="mb-2 text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            {t("checkout.success.title")}
          </h2>
          <p className="mb-1 text-[hsl(var(--muted-foreground))]">
            {t("checkout.success.subtitle")}
          </p>
          <p className="mb-8 text-sm text-[hsl(var(--muted-foreground))]">
            {t("checkout.success.orderNumber")} <span className="font-semibold text-[hsl(var(--foreground))]">#{Math.floor(10000 + Math.random() * 90000)}</span>
          </p>

          <div className="mb-6 rounded-2xl bg-[hsl(var(--muted))] p-4 text-left text-sm text-[hsl(var(--muted-foreground))]">
            <p>{t("checkout.success.emailNote")}</p>
          </div>

          <button
            onClick={onClose}
            className="w-full rounded-full bg-[var(--accent)] py-3 text-sm font-semibold text-black transition-all duration-300 hover:opacity-90 hover:shadow-lg"
          >
            {t("checkout.success.cta")}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function InputField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="text-sm font-medium text-[hsl(var(--foreground))]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "rounded-xl border bg-[hsl(var(--background))] px-4 py-3 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)]/50",
          error
            ? "border-red-400 focus:ring-red-300"
            : "border-[hsl(var(--border))] focus:border-[var(--accent)]"
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const t = useTranslations();
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const subtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const setField = (key: keyof typeof form) => (val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.firstName.trim()) newErrors.firstName = t("checkout.errors.required");
    if (!form.lastName.trim()) newErrors.lastName = t("checkout.errors.required");
    if (!form.email.trim() || !form.email.includes("@")) newErrors.email = t("checkout.errors.invalidEmail");
    if (!form.address.trim()) newErrors.address = t("checkout.errors.required");
    if (!form.city.trim()) newErrors.city = t("checkout.errors.required");
    if (!form.zip.trim()) newErrors.zip = t("checkout.errors.required");
    if (!form.cardName.trim()) newErrors.cardName = t("checkout.errors.required");
    if (form.cardNumber.replace(/\s/g, "").length < 16) newErrors.cardNumber = t("checkout.errors.invalidCard");
    if (!form.expiry || form.expiry.length < 5) newErrors.expiry = t("checkout.errors.invalidExpiry");
    if (!form.cvv || form.cvv.length < 3) newErrors.cvv = t("checkout.errors.invalidCvv");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShowSuccess(true);
    }
  };

  const trustItems: Array<{ icon: string; label: string }> = [
    { icon: "🔒", label: t("checkout.trust.secure") },
    { icon: "🚚", label: t("checkout.trust.shipping") },
    { icon: "↩️", label: t("checkout.trust.returns") },
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-12 md:py-20">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mb-3">
              <span>{t("checkout.breadcrumb.cart")}</span>
              <ChevronRight size={14} />
              <span className="font-semibold text-[hsl(var(--foreground))]">{t("checkout.breadcrumb.checkout")}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {t("checkout.title")}
            </h1>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))]">
              <Lock size={13} />
              <span>{t("checkout.secureNote")}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
              {/* Left: Form */}
              <div className="space-y-8">
                {/* Contact */}
                <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <User size={18} className="text-[var(--accent)]" />
                    <h2 className="font-bold text-[hsl(var(--foreground))]">{t("checkout.sections.contact")}</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InputField
                      label={t("checkout.fields.firstName")}
                      id="firstName"
                      value={form.firstName}
                      onChange={setField("firstName")}
                      error={errors.firstName}
                    />
                    <InputField
                      label={t("checkout.fields.lastName")}
                      id="lastName"
                      value={form.lastName}
                      onChange={setField("lastName")}
                      error={errors.lastName}
                    />
                    <InputField
                      label={t("checkout.fields.email")}
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={setField("email")}
                      error={errors.email}
                      className="sm:col-span-2"
                    />
                    <InputField
                      label={t("checkout.fields.phone")}
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={setField("phone")}
                      error={errors.phone}
                      className="sm:col-span-2"
                    />
                  </div>
                </div>

                {/* Shipping */}
                <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <MapPin size={18} className="text-[var(--accent)]" />
                    <h2 className="font-bold text-[hsl(var(--foreground))]">{t("checkout.sections.shipping")}</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InputField
                      label={t("checkout.fields.address")}
                      id="address"
                      value={form.address}
                      onChange={setField("address")}
                      error={errors.address}
                      className="sm:col-span-2"
                    />
                    <InputField
                      label={t("checkout.fields.city")}
                      id="city"
                      value={form.city}
                      onChange={setField("city")}
                      error={errors.city}
                    />
                    <InputField
                      label={t("checkout.fields.state")}
                      id="state"
                      value={form.state}
                      onChange={setField("state")}
                      error={errors.state}
                    />
                    <InputField
                      label={t("checkout.fields.zip")}
                      id="zip"
                      value={form.zip}
                      onChange={setField("zip")}
                      error={errors.zip}
                    />
                    <InputField
                      label={t("checkout.fields.country")}
                      id="country"
                      value={form.country}
                      onChange={setField("country")}
                      error={errors.country}
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <CreditCard size={18} className="text-[var(--accent)]" />
                    <h2 className="font-bold text-[hsl(var(--foreground))]">{t("checkout.sections.payment")}</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InputField
                      label={t("checkout.fields.cardName")}
                      id="cardName"
                      value={form.cardName}
                      onChange={setField("cardName")}
                      error={errors.cardName}
                      className="sm:col-span-2"
                    />
                    <InputField
                      label={t("checkout.fields.cardNumber")}
                      id="cardNumber"
                      value={form.cardNumber}
                      onChange={(v) => setField("cardNumber")(formatCardNumber(v))}
                      error={errors.cardNumber}
                      placeholder="1234 5678 9012 3456"
                      className="sm:col-span-2"
                    />
                    <InputField
                      label={t("checkout.fields.expiry")}
                      id="expiry"
                      value={form.expiry}
                      onChange={(v) => setField("expiry")(formatExpiry(v))}
                      error={errors.expiry}
                      placeholder="MM/YY"
                    />
                    <InputField
                      label={t("checkout.fields.cvv")}
                      id="cvv"
                      value={form.cvv}
                      onChange={setField("cvv")}
                      error={errors.cvv}
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <ShoppingBag size={18} className="text-[var(--accent)]" />
                    <h2 className="font-bold text-[hsl(var(--foreground))]">{t("checkout.sections.orderSummary")}</h2>
                  </div>

                  <div className="space-y-4">
                    {MOCK_CART_ITEMS.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[hsl(var(--muted))]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = "/images/toy-placeholder.jpg";
                            }}
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-center min-w-0">
                          <p className="truncate text-sm font-semibold text-[hsl(var(--foreground))]">{item.name}</p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">{t("checkout.qty")}: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-[hsl(var(--foreground))] shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-[hsl(var(--border))] pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-[hsl(var(--muted-foreground))]">
                      <span>{t("checkout.subtotal")}</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[hsl(var(--muted-foreground))]">
                      <span>{t("checkout.shipping")}</span>
                      <span>{shipping === 0 ? t("checkout.freeShipping") : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[hsl(var(--foreground))] pt-2 border-t border-[hsl(var(--border))]">
                      <span>{t("checkout.total")}</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="space-y-2">
                  {trustItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[var(--accent)] py-4 text-sm font-bold text-black transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                >
                  {t("checkout.placeOrder")} — ${total.toFixed(2)}
                </button>
              </div>
            </div>
          </form>
        </section>
      </Reveal>
    </main>
  );
}
