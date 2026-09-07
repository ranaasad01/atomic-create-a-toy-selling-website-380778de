"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, ShoppingCart, Heart, Share2, ChevronRight, Shield, Truck, RotateCcw, Plus, Minus, Check, ChevronDown } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PRODUCT = {
  id: "prod-001",
  name: "Galaxy Explorer Robot",
  price: 49.99,
  originalPrice: 69.99,
  rating: 4.7,
  reviewCount: 284,
  badge: "Best Seller",
  ageGroup: "8–12 Years",
  category: "Action Figures",
  description:
    "Blast off into adventure with the Galaxy Explorer Robot. This interactive toy features voice commands, LED light-up eyes, and over 50 sound effects. Kids can program custom missions, activate battle mode, and watch the robot navigate obstacles on its own. Built from durable, child-safe ABS plastic with smooth rounded edges.",
  images: [
    "/images/galaxy-explorer-robot-front.jpg",
    "/images/galaxy-explorer-robot-side.jpg",
    "/images/galaxy-explorer-robot-back.jpg",
    "/images/galaxy-explorer-robot-detail.jpg",
  ],
  features: [
    "Voice-activated commands",
    "50+ sound effects and phrases",
    "LED light-up eyes and chest panel",
    "Obstacle-avoidance sensors",
    "Programmable mission mode",
    "USB rechargeable battery",
  ],
  specs: [
    { label: "Age Range", value: "8–12 Years" },
    { label: "Height", value: "32 cm (12.6 in)" },
    { label: "Weight", value: "680 g" },
    { label: "Battery", value: "Built-in Li-ion, USB-C" },
    { label: "Material", value: "ABS Plastic" },
    { label: "Colors", value: "Silver / Blue" },
  ],
  inStock: true,
  stockCount: 14,
};

const REVIEWS = [
  {
    id: "r1",
    author: "Jamie L.",
    rating: 5,
    date: "March 12, 2025",
    title: "My son absolutely loves it",
    body: "We got this for his 9th birthday and he hasn't put it down. The voice commands work really well and the LED effects are super cool in the dark.",
    verified: true,
  },
  {
    id: "r2",
    author: "Priya M.",
    rating: 4,
    date: "February 28, 2025",
    title: "Great quality, minor setup needed",
    body: "Build quality is excellent and the robot feels sturdy. Setup took about 20 minutes but the instructions are clear. Kids aged 8+ will have no trouble.",
    verified: true,
  },
  {
    id: "r3",
    author: "Carlos R.",
    rating: 5,
    date: "January 15, 2025",
    title: "Worth every penny",
    body: "Bought this after seeing it at a friend's house. The programmable missions keep my daughter engaged for hours. Highly recommend for curious kids.",
    verified: false,
  },
];

const RELATED = [
  {
    id: "rel-1",
    name: "Cosmic Blaster Set",
    price: 34.99,
    rating: 4.5,
    image: "/images/cosmic-blaster-set-toy.jpg",
    badge: "New",
  },
  {
    id: "rel-2",
    name: "Space Rover RC Car",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.8,
    image: "/images/space-rover-rc-car.jpg",
    badge: "Sale",
  },
  {
    id: "rel-3",
    name: "Astro Build Kit",
    price: 27.99,
    rating: 4.3,
    image: "/images/astro-build-kit-toy.jpg",
    badge: undefined,
  },
  {
    id: "rel-4",
    name: "Nebula Puzzle 500pc",
    price: 19.99,
    rating: 4.6,
    image: "/images/nebula-puzzle-500-piece.jpg",
    badge: undefined,
  },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={
            s <= Math.round(rating)
              ? "fill-[var(--brand-accent)] text-[var(--brand-accent)]"
              : "fill-transparent text-[var(--brand-accent)]/30"
          }
        />
      ))}
    </span>
  );
}

export default function ProductDetailPage() {
  const t = useTranslations();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const discount = PRODUCT.originalPrice
    ? Math.round(((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100)
    : 0;

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  }

  const faqs = [
    {
      q: t("productDetail.faq.q1"),
      a: t("productDetail.faq.a1"),
    },
    {
      q: t("productDetail.faq.q2"),
      a: t("productDetail.faq.a2"),
    },
    {
      q: t("productDetail.faq.q3"),
      a: t("productDetail.faq.a3"),
    },
  ];

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Breadcrumb */}
      <Reveal>
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-2 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">
              {t("productDetail.breadcrumb.home")}
            </Link>
            <ChevronRight size={14} />
            <Link href="/shop" className="hover:text-[var(--brand-accent)] transition-colors">
              {t("productDetail.breadcrumb.shop")}
            </Link>
            <ChevronRight size={14} />
            <span className="text-[hsl(var(--foreground))] font-medium">{PRODUCT.name}</span>
          </nav>
        </div>
      </Reveal>

      {/* Product Hero */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image Gallery */}
          <Reveal>
            <div className="flex flex-col gap-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative aspect-square w-full overflow-hidden rounded-2xl border border-black/5 bg-[hsl(var(--card))] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(0,0,0,0.1)]"
              >
                <img
                  src={PRODUCT.images[selectedImage]}
                  alt={PRODUCT.name}
                  className="h-full w-full object-cover"
                />
                {PRODUCT.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--brand-accent)] px-3 py-1 text-xs font-bold text-black">
                    {PRODUCT.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                    -{discount}%
                  </span>
                )}
              </motion.div>
              <div className="grid grid-cols-4 gap-3">
                {PRODUCT.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200",
                      selectedImage === i
                        ? "border-[var(--brand-accent)] shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt={`${PRODUCT.name} view ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Product Info */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6">
              {/* Category + Age */}
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                  {PRODUCT.category}
                </span>
                <span className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                  {t("productDetail.ageLabel")} {PRODUCT.ageGroup}
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl">
                {PRODUCT.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <StarRating rating={PRODUCT.rating} size={18} />
                <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{PRODUCT.rating}</span>
                <span className="text-sm text-[hsl(var(--muted-foreground))]">
                  ({PRODUCT.reviewCount} {t("productDetail.reviews")})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-[var(--brand-accent)]">
                  ${PRODUCT.price.toFixed(2)}
                </span>
                {PRODUCT.originalPrice && (
                  <span className="text-xl text-[hsl(var(--muted-foreground))] line-through">
                    ${PRODUCT.originalPrice.toFixed(2)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-semibold text-red-600">
                    {t("productDetail.save")} {discount}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="leading-relaxed text-[hsl(var(--muted-foreground))]">{PRODUCT.description}</p>

              {/* Stock */}
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={cn(
                    "inline-block h-2 w-2 rounded-full",
                    PRODUCT.inStock ? "bg-green-500" : "bg-red-500"
                  )}
                />
                <span className={PRODUCT.inStock ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                  {PRODUCT.inStock
                    ? `${t("productDetail.inStock")} — ${PRODUCT.stockCount} ${t("productDetail.remaining")}`
                    : t("productDetail.outOfStock")}
                </span>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-l-xl text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(PRODUCT.stockCount, q + 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-r-xl text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  disabled={!PRODUCT.inStock}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300",
                    addedToCart
                      ? "bg-green-500 text-white"
                      : "bg-[var(--brand-accent)] text-black hover:brightness-110"
                  )}
                >
                  {addedToCart ? (
                    <>
                      <Check size={18} />
                      {t("productDetail.addedToCart")}
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      {t("productDetail.addToCart")}
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setWishlisted((w) => !w)}
                  aria-label="Add to wishlist"
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200",
                    wishlisted
                      ? "border-red-300 bg-red-50 text-red-500"
                      : "border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] hover:text-red-400"
                  )}
                >
                  <Heart size={18} className={wishlisted ? "fill-red-500" : ""} />
                </motion.button>

                <button
                  aria-label="Share product"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                >
                  <Share2 size={18} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                {[
                  { icon: Truck, label: t("productDetail.trust.shipping") },
                  { icon: RotateCcw, label: t("productDetail.trust.returns") },
                  { icon: Shield, label: t("productDetail.trust.safety") },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1.5 text-center">
                    <item.icon size={20} className="text-[var(--brand-accent)]" />
                    <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features + Specs */}
      <Reveal>
        <section className="bg-[hsl(var(--card))] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Features */}
              <div>
                <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
                  {t("productDetail.features.heading")}
                </h2>
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="space-y-3"
                >
                  {PRODUCT.features.map((feat, i) => (
                    <motion.li key={i} variants={fadeInUp} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-accent)]/20">
                        <Check size={12} className="text-[var(--brand-accent)]" />
                      </span>
                      <span className="text-sm leading-relaxed text-[hsl(var(--foreground))]">{feat}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Specs */}
              <div>
                <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
                  {t("productDetail.specs.heading")}
                </h2>
                <div className="overflow-hidden rounded-xl border border-[hsl(var(--border))]">
                  {PRODUCT.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={cn(
                        "flex items-center justify-between px-5 py-3.5 text-sm",
                        i % 2 === 0
                          ? "bg-[hsl(var(--background))]"
                          : "bg-[hsl(var(--card))]"
                      )}
                    >
                      <span className="font-medium text-[hsl(var(--muted-foreground))]">{spec.label}</span>
                      <span className="font-semibold text-[hsl(var(--foreground))]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Reviews */}
      <Reveal>
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
                  {t("productDetail.reviews.heading")}
                </h2>
                <div className="mt-2 flex items-center gap-3">
                  <StarRating rating={PRODUCT.rating} size={20} />
                  <span className="text-lg font-bold text-[hsl(var(--foreground))]">{PRODUCT.rating} / 5</span>
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">
                    {PRODUCT.reviewCount} {t("productDetail.reviews.total")}
                  </span>
                </div>
              </div>
              <button className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 py-2.5 text-sm font-semibold text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--muted))]">
                {t("productDetail.reviews.writeReview")}
              </button>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {REVIEWS.map((review) => (
                <motion.div
                  key={review.id}
                  variants={scaleIn}
                  className="flex flex-col gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[hsl(var(--foreground))]">{review.author}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">{review.date}</p>
                    </div>
                    {review.verified && (
                      <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        <Check size={10} />
                        {t("productDetail.reviews.verified")}
                      </span>
                    )}
                  </div>
                  <StarRating rating={review.rating} size={14} />
                  <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{review.title}</p>
                  <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{review.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section className="bg-[hsl(var(--card))] py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
              {t("productDetail.faq.heading")}
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--muted))]"
                  >
                    {faq.q}
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown size={16} className="shrink-0 text-[hsl(var(--muted-foreground))]" />
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                      {faq.a}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Related Products */}
      <Reveal>
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
              {t("productDetail.related.heading")}
            </h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 gap-5 sm:grid-cols-4"
            >
              {RELATED.map((item) => (
                <motion.div
                  key={item.id}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_40px_-8px_rgba(0,0,0,0.14)]"
                >
                  <Link href="/shop" className="block">
                    <div className="relative aspect-square overflow-hidden bg-[hsl(var(--muted))]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.badge && (
                        <span
                          className={cn(
                            "absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-bold",
                            item.badge === "Sale"
                              ? "bg-red-500 text-white"
                              : "bg-[var(--brand-accent)] text-black"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="mb-1 text-sm font-semibold text-[hsl(var(--foreground))] leading-snug">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <StarRating rating={item.rating} size={12} />
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">{item.rating}</span>
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-[var(--brand-accent)]">
                          ${item.price.toFixed(2)}
                        </span>
                        {"originalPrice" in item && item.originalPrice && (
                          <span className="text-xs text-[hsl(var(--muted-foreground))] line-through">
                            ${(item.originalPrice as number).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* CTA Banner */}
      <Reveal>
        <section className="bg-[var(--brand-accent)] py-14">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-black sm:text-3xl">
              {t("productDetail.cta.heading")}
            </h2>
            <p className="mb-6 text-sm text-black/70">{t("productDetail.cta.body")}</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-black/80"
            >
              {t("productDetail.cta.button")}
              <ChevronRight size={16} />
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}