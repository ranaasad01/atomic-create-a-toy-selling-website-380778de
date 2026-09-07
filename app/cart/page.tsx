"use client";
import { useState, useCallback, createContext, useContext, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, Tag } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  quantity: number;
}

// ─── Mock initial cart data ───────────────────────────────────────────────────

const INITIAL_CART: CartItem[] = [
  {
    id: "toy-001",
    name: "Galaxy Explorer Action Figure",
    price: 24.99,
    originalPrice: 34.99,
    image: "/images/galaxy-explorer-action-figure.jpg",
    category: "Action Figures",
    quantity: 2,
  },
  {
    id: "toy-002",
    name: "Rainbow Stacking Rings",
    price: 18.5,
    image: "/images/rainbow-stacking-rings-toy.jpg",
    category: "Educational",
    quantity: 1,
  },
  {
    id: "toy-003",
    name: "Cozy Bear Plush Buddy",
    price: 29.99,
    image: "/images/cozy-bear-plush-toy.jpg",
    category: "Dolls & Plush",
    quantity: 1,
  },
];

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5.99;

// ─── Cart Context ─────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  updateQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);

  const updateQty = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <CartContext.Provider value={{ items, updateQty, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// ─── Cart Item Row ────────────────────────────────────────────────────────────

function CartItemRow({ item }: { item: CartItem }) {
  const t = useTranslations();
  const { updateQty, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
    >
      {/* Product image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--surface-muted)]">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/images/toy-placeholder.jpg";
          }}
        />
        {item.originalPrice && (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[10px] font-bold text-white">
            {t("cart.saleBadge")}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-2 min-w-0">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted-fg)]">
            {item.category}
          </p>
          <h3 className="mt-0.5 truncate text-sm font-semibold text-[var(--fg)] leading-snug">
            {item.name}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[var(--fg)]">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-[var(--muted-fg)] line-through">
                ${(item.originalPrice * item.quantity).toFixed(2)}
              </span>
            )}
          </div>

          {/* Quantity stepper + remove */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-black/10 bg-[var(--surface-muted)]">
              <button
                onClick={() => updateQty(item.id, -1)}
                aria-label={t("cart.decreaseQty")}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--fg)] transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <Minus size={13} />
              </button>
              <span className="w-6 text-center text-sm font-semibold text-[var(--fg)]">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQty(item.id, 1)}
                aria-label={t("cart.increaseQty")}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--fg)] transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <Plus size={13} />
              </button>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              aria-label={t("cart.removeItem")}
              className="flex h-7 w-7 items-center justify-center rounded-full text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Order Summary ────────────────────────────────────────────────────────────

function OrderSummary() {
  const t = useTranslations();
  const { items } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount + shipping;

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === "PLAY10") {
      setPromoApplied(true);
    }
  };

  const trustItems: Array<{ icon: string; label: string }> = [
    { icon: "🔒", label: t("cart.trust.secure") },
    { icon: "🚚", label: t("cart.trust.shipping") },
    { icon: "↩️", label: t("cart.trust.returns") },
  ];

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
      <h2 className="text-lg font-bold text-[var(--fg)] tracking-tight">
        {t("cart.summaryTitle")}
      </h2>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between text-[var(--muted-fg)]">
          <span>{t("cart.subtotal")}</span>
          <span className="font-medium text-[var(--fg)]">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {promoApplied && (
          <div className="flex justify-between text-green-600">
            <span>{t("cart.promoDiscount")}</span>
            <span className="font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-[var(--muted-fg)]">
          <span>{t("cart.shipping")}</span>
          <span className="font-medium text-[var(--fg)]">
            {shipping === 0 ? t("cart.freeShipping") : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="border-t border-black/5 pt-3 flex justify-between font-bold text-[var(--fg)]">
          <span>{t("cart.total")}</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Promo code */}
      <div className="mt-5 flex gap-2">
        <div className="relative flex-1">
          <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-fg)]" />
          <input
            type="text"
            placeholder={t("cart.promoPlaceholder")}
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-[var(--surface-muted)] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <button
          onClick={handlePromo}
          className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          {t("cart.applyPromo")}
        </button>
      </div>

      {/* Checkout CTA */}
      <Link
        href="/checkout"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] py-3.5 text-sm font-bold text-black transition-all duration-300 hover:opacity-90 hover:shadow-lg"
      >
        {t("cart.checkout")}
        <ArrowRight size={16} />
      </Link>

      {/* Trust signals */}
      <div className="mt-5 space-y-2">
        {trustItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-[var(--muted-fg)]">
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyCart() {
  const t = useTranslations();
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--accent)]/10">
        <ShoppingCart size={40} className="text-[var(--accent)]" />
      </div>
      <h2 className="text-2xl font-bold text-[var(--fg)]">{t("cart.emptyTitle")}</h2>
      <p className="mt-2 text-[var(--muted-fg)]">{t("cart.emptySubtitle")}</p>
      <Link
        href="/shop"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-bold text-black transition-all duration-300 hover:opacity-90 hover:shadow-lg"
      >
        {t("cart.shopNow")}
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function CartPageInner() {
  const t = useTranslations();
  const { items } = useCart();

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-12 md:py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="mb-10">
              <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                {t("cart.title")}
              </h1>
              <p className="mt-2 text-[var(--muted-fg)]">
                {items.length === 0
                  ? t("cart.emptySubtitle")
                  : t("cart.itemCount", { count: items.length })}
              </p>
            </motion.div>

            {items.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
                {/* Items */}
                <motion.div variants={fadeInUp} className="space-y-4">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </motion.div>

                {/* Summary */}
                <motion.div variants={fadeInUp}>
                  <OrderSummary />
                </motion.div>
              </div>
            )}
          </motion.div>
        </section>
      </Reveal>
    </main>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartPageInner />
    </CartProvider>
  );
}
