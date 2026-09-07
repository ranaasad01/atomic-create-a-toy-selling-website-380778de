"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, Shield, Truck, RotateCcw, Plus, Minus, Check } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { scaleIn, fadeInUp, staggerContainer } from "@/lib/motion";

const PRODUCT = {
  id: "toy-001",
  name: "Galaxy Explorer Robot",
  price: 49.99,
  originalPrice: 69.99,
  badge: "Sale" as const,
  rating: 4.7,
  reviewCount: 128,
  ageGroup: "8–12 Years",
  category: "Action Figures",
  description:
    "Blast off into adventure with the Galaxy Explorer Robot! This feature-packed interactive toy comes with light-up eyes, 12 sound effects, and 360-degree rotating arms. Built from durable, child-safe ABS plastic, it stands 12 inches tall and is packed with imaginative play possibilities. Perfect for budding space explorers who love science and technology.",
  features: [
    "12 built-in sound effects and voice commands",
    "Light-up eyes and chest panel",
    "360° rotating arms and articulated joints",
    "Durable child-safe ABS plastic",
    "Requires 3 AA batteries (included)",
    "12 inches tall",
  ],
  images: [
    "/images/galaxy-explorer-robot-front.jpg",
    "/images/galaxy-explorer-robot-side.jpg",
    "/images/galaxy-explorer-robot-back.jpg",
    "/images/galaxy-explorer-robot-detail.jpg",
  ],
  inStock: true,
};

const REVIEWS = [
  {
    id: "r1",
    name: "Sarah M.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah%20M.",
    rating: 5,
    date: "November 12, 2024",
    comment:
      "My son absolutely loves this robot! The sound effects are amazing and the build quality is really solid. He has been playing with it every single day since his birthday. Totally worth the price.",
    verified: true,
  },
  {
    id: "r2",
    name: "James T.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James%20T.",
    rating: 4,
    date: "October 28, 2024",
    comment:
      "Great toy overall. The lights and sounds are a big hit. Assembly was straightforward and the instructions were clear. Took off one star because the arm joints feel slightly loose, but nothing that affects play.",
    verified: true,
  },
  {
    id: "r3",
    name: "Priya K.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya%20K.",
    rating: 5,
    date: "October 5, 2024",
    comment:
      "Bought this for my daughter who is obsessed with space. She carries it everywhere. The quality is excellent and it feels very durable. Shipping was fast and packaging was secure.",
    verified: false,
  },
  {
    id: "r4",
    name: "Carlos R.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos%20R.",
    rating: 5,
    date: "September 19, 2024",
    comment:
      "Got this as a gift for my nephew and he was thrilled. The robot looks exactly like the photos and the size is perfect. The rotating arms are a really cool feature. Highly recommend!",
    verified: true,
  },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClass,
            star <= Math.round(rating)
              ? "fill-[var(--brand-accent)] text-[var(--brand-accent)]"
              : "fill-transparent text-gray-300"
          )}
        />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const t = useTranslations();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discount = PRODUCT.originalPrice
    ? Math.round(((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      {/* Breadcrumb */}
      <Reveal>
        <div className="border-b border-[hsl(var(--border))]">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
              <a href="/" className="hover:text-[var(--brand-accent)] transition-colors">
                {t("productDetail.breadcrumbHome")}
              </a>
              <ChevronRight className="w-3.5 h-3.5" />
              <a href="/shop" className="hover:text-[var(--brand-accent)] transition-colors">
                {t("productDetail.breadcrumbShop")}
              </a>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[hsl(var(--foreground))] font-medium truncate max-w-[200px]">
                {PRODUCT.name}
              </span>
            </nav>
          </div>
        </div>
      </Reveal>

      {/* Product Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image Gallery */}
          <Reveal>
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <motion.div
                key={selectedImage}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="relative overflow-hidden rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] aspect-square shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]"
              >
                {PRODUCT.badge && (
                  <span
                    className={cn(
                      "absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
                      PRODUCT.badge === "Sale"
                        ? "bg-red-500 text-white"
                        : PRODUCT.badge === "New"
                        ? "bg-[var(--brand-accent)] text-black"
                        : "bg-purple-600 text-white"
                    )}
                  >
                    {PRODUCT.badge === "Sale" ? `-${discount}%` : PRODUCT.badge}
                  </span>
                )}
                <img
                  src={PRODUCT.images[selectedImage]}
                  alt={PRODUCT.name}
                  className="w-full h-full object-cover"
                />
                {/* Nav arrows */}
                <button
                  onClick={() => setSelectedImage((prev) => (prev - 1 + PRODUCT.images.length) % PRODUCT.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-black/10 flex items-center justify-center shadow-sm hover:bg-white transition-all"
                  aria-label={t("productDetail.prevImage")}
                >
                  <ChevronLeft className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev + 1) % PRODUCT.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-black/10 flex items-center justify-center shadow-sm hover:bg-white transition-all"
                  aria-label={t("productDetail.nextImage")}
                >
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                </button>
              </motion.div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {PRODUCT.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200",
                      selectedImage === i
                        ? "border-[var(--brand-accent)] shadow-[0_0_0_3px_var(--brand-accent-muted)]"
                        : "border-[hsl(var(--border))] hover:border-[var(--brand-accent)]/50"
                    )}
                    aria-label={t("productDetail.thumbnailAlt")}
                  >
                    <img src={img} alt={`${PRODUCT.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: Details Panel */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6">
              {/* Category + Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-full bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  {PRODUCT.category}
                </span>
                <span className="rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] px-3 py-1 text-xs font-medium">
                  {t("productDetail.ageLabel")}: {PRODUCT.ageGroup}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-3xl font-extrabold tracking-tight text-[hsl(var(--foreground))] leading-tight text-balance">
                {PRODUCT.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <StarRating rating={PRODUCT.rating} size="md" />
                <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{PRODUCT.rating}</span>
                <span className="text-sm text-[hsl(var(--muted-foreground))]">
                  ({PRODUCT.reviewCount} {t("productDetail.reviews")})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-[hsl(var(--foreground))]">
                  ${PRODUCT.price.toFixed(2)}
                </span>
                {PRODUCT.originalPrice && (
                  <>
                    <span className="text-xl text-[hsl(var(--muted-foreground))] line-through">
                      ${PRODUCT.originalPrice.toFixed(2)}
                    </span>
                    <span className="rounded-full bg-red-100 text-red-600 px-2.5 py-0.5 text-sm font-bold">
                      {t("productDetail.saveLabel")} {discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-pretty">
                {PRODUCT.description}
              </p>

              {/* Features */}
              <div>
                <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-3 uppercase tracking-wide">
                  {t("productDetail.featuresTitle")}
                </h3>
                <ul className="grid grid-cols-1 gap-2">
                  {PRODUCT.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                      <Check className="w-4 h-4 text-[var(--brand-accent)] mt-0.5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity + CTA */}
              <div className="flex flex-col gap-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-[hsl(var(--foreground))]">
                    {t("productDetail.quantityLabel")}
                  </span>
                  <div className="flex items-center gap-0 rounded-xl border border-[hsl(var(--border))] overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors text-[hsl(var(--foreground))]"
                      aria-label={t("productDetail.decreaseQty")}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-[hsl(var(--foreground))]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors text-[hsl(var(--foreground))]"
                      aria-label={t("productDetail.increaseQty")}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddToCart}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 font-bold text-base transition-all duration-300",
                      addedToCart
                        ? "bg-green-500 text-white"
                        : "bg-[var(--brand-accent)] text-black hover:brightness-105 shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
                    )}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-5 h-5" />
                        {t("productDetail.addedToCart")}
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        {t("productDetail.addToCart")}
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setWishlisted((w) => !w)}
                    className={cn(
                      "w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200",
                      wishlisted
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-red-300 hover:text-red-400"
                    )}
                    aria-label={t("productDetail.wishlist")}
                  >
                    <Heart className={cn("w-5 h-5", wishlisted && "fill-red-500")} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:border-[var(--brand-accent)]/50 hover:text-[var(--brand-accent)] transition-all duration-200"
                    aria-label={t("productDetail.share")}
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[hsl(var(--border))]">
                {[
                  { icon: Truck, label: t("productDetail.trustShipping") },
                  { icon: Shield, label: t("productDetail.trustSafe") },
                  { icon: RotateCcw, label: t("productDetail.trustReturns") },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                    <div className="w-9 h-9 rounded-full bg-[var(--brand-accent)]/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[var(--brand-accent)]" />
                    </div>
                    <span className="text-xs text-[hsl(var(--muted-foreground))] leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews Section */}
      <Reveal>
        <section className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
                  {t("productDetail.reviewsTitle")}
                </h2>
                <p className="mt-1 text-[hsl(var(--muted-foreground))] text-sm">
                  {t("productDetail.reviewsSubtitle")}
                </p>
              </div>
              {/* Summary */}
              <div className="flex items-center gap-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-5 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]">
                <div className="text-center">
                  <p className="text-4xl font-black text-[hsl(var(--foreground))]">{PRODUCT.rating}</p>
                  <StarRating rating={PRODUCT.rating} size="sm" />
                  <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                    {PRODUCT.reviewCount} {t("productDetail.reviews")}
                  </p>
                </div>
              </div>
            </div>

            {/* Review Cards Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              {REVIEWS.map((review, i) => (
                <motion.div
                  key={review.id}
                  variants={fadeInUp}
                  className="rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] flex flex-col gap-4"
                >
                  {/* Reviewer Info */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[hsl(var(--muted))] flex-shrink-0 border border-[hsl(var(--border))]">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span class="w-full h-full flex items-center justify-center text-sm font-bold text-[hsl(var(--muted-foreground))]">${review.name.charAt(0)}</span>`;
                            }
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{review.name}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{review.date}</p>
                      </div>
                    </div>
                    {review.verified && (
                      <span className="flex items-center gap-1 rounded-full bg-green-50 text-green-600 px-2.5 py-0.5 text-xs font-medium flex-shrink-0">
                        <Check className="w-3 h-3" />
                        {t("productDetail.verified")}
                      </span>
                    )}
                  </div>

                  <StarRating rating={review.rating} size="sm" />

                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {review.comment}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Related Products CTA */}
      <Reveal>
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-[hsl(var(--foreground))] mb-3">
              {t("productDetail.relatedTitle")}
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-md mx-auto">
              {t("productDetail.relatedSubtitle")}
            </p>
            <motion.a
              href="/shop"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-accent)] text-black font-bold px-8 py-3.5 shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:brightness-105 transition-all duration-300"
            >
              {t("productDetail.browseAll")}
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </div>
        </section>
      </Reveal>
    </main>
  );
}