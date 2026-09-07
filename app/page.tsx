"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Star, ShoppingCart, ArrowRight, Shield, Truck, RotateCcw, Award, ChevronRight } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { BRAND } from "@/lib/data";

const FEATURED_PRODUCTS = [
  {
    id: "fp-1",
    name: "Galaxy Explorer Robot",
    price: 49.99,
    originalPrice: 64.99,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/2520e257c2b34fabbc07e2c097fb9201.jpg",
    badge: "Sale",
    rating: 4.8,
    reviewCount: 312,
    ageGroup: "8–12 Years",
    slug: "galaxy-explorer-robot",
  },
  {
    id: "fp-2",
    name: "Woodland Friends Plush Set",
    price: 34.99,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/4f004e36758d495096434c792fe77c84.jpg",
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 528,
    ageGroup: "0–3 Years",
    slug: "woodland-friends-plush",
  },
  {
    id: "fp-3",
    name: "Master Builder Blocks 500pc",
    price: 59.99,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/f44e745de3d149a7a188431bee5fae4e.jpg",
    badge: "New",
    rating: 4.7,
    reviewCount: 194,
    ageGroup: "3–8 Years",
    slug: "master-builder-blocks",
  },
  {
    id: "fp-4",
    name: "Rainbow Art Studio Kit",
    price: 27.99,
    originalPrice: 34.99,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/19f1f856907b456699cfec722b520080.jpeg",
    badge: "Sale",
    rating: 4.6,
    reviewCount: 241,
    ageGroup: "3–8 Years",
    slug: "rainbow-art-studio",
  },
];

const CATEGORIES_HERO = [
  { label: "Action Figures", icon: "🦸", slug: "action-figures", color: "bg-orange-50 border-orange-200" },
  { label: "Board Games", icon: "🎲", slug: "board-games", color: "bg-blue-50 border-blue-200" },
  { label: "Educational", icon: "🧩", slug: "educational", color: "bg-green-50 border-green-200" },
  { label: "Outdoor & Sports", icon: "⚽", slug: "outdoor", color: "bg-yellow-50 border-yellow-200" },
  { label: "Arts & Crafts", icon: "🎨", slug: "arts-crafts", color: "bg-pink-50 border-pink-200" },
  { label: "Dolls & Plush", icon: "🧸", slug: "dolls", color: "bg-purple-50 border-purple-200" },
];

const VALUE_PROPS = [
  {
    icon: Truck,
    titleKey: "valueProps.shipping.title",
    descKey: "valueProps.shipping.desc",
  },
  {
    icon: Shield,
    titleKey: "valueProps.safety.title",
    descKey: "valueProps.safety.desc",
  },
  {
    icon: RotateCcw,
    titleKey: "valueProps.returns.title",
    descKey: "valueProps.returns.desc",
  },
  {
    icon: Award,
    titleKey: "valueProps.quality.title",
    descKey: "valueProps.quality.desc",
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Sarah M.",
    location: "Austin, TX",
    rating: 5,
    text: "My kids absolutely love everything we've ordered from ToyVille. The quality is outstanding and shipping was faster than expected. Will definitely be back for the holidays!",
    product: "Master Builder Blocks",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah%20M.",
  },
  {
    id: "t2",
    name: "James R.",
    location: "Portland, OR",
    rating: 5,
    text: "Finally a toy store that takes safety seriously. Every toy is age-appropriate and built to last. The Galaxy Explorer Robot has been my son's favorite for months.",
    product: "Galaxy Explorer Robot",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James%20R.",
  },
  {
    id: "t3",
    name: "Priya K.",
    location: "Chicago, IL",
    rating: 5,
    text: "The Rainbow Art Studio Kit sparked my daughter's creativity in ways I never imagined. Excellent packaging, zero mess, and hours of fun. Highly recommend!",
    product: "Rainbow Art Studio Kit",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya%20K.",
  },
];

const STATS = [
  { value: "50,000+", label: "Happy Families" },
  { value: "1,200+", label: "Toys in Stock" },
  { value: "4.9★", label: "Average Rating" },
  { value: "98%", label: "Satisfaction Rate" },
];

const BADGE_COLORS: Record<string, string> = {
  Sale: "bg-red-500 text-white",
  "Best Seller": "bg-[var(--accent)] text-black",
  New: "bg-blue-500 text-white",
};

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="home"
          className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-[var(--accent)]/10 via-white to-purple-50 overflow-hidden"
        >
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[var(--accent)]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 -left-24 w-[360px] h-[360px] rounded-full bg-purple-200/30 blur-3xl" />

          <div className="container mx-auto px-6 md:px-12 lg:px-20 py-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 px-4 py-1.5 text-sm font-semibold text-[var(--accent-foreground)]"
              >
                🎉 {t("hero.badge")}
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.05] text-balance"
              >
                {t("hero.headline1")}
                <span className="block text-[var(--accent)]">{t("hero.headline2")}</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg text-pretty"
              >
                {t("hero.subtext")}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-4 text-base font-bold text-black shadow-[0_4px_24px_rgba(0,0,0,0.12)] hover:brightness-105 hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-all duration-300"
                >
                  {t("hero.cta.shop")} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-800 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
                >
                  {t("hero.cta.learn")}
                </Link>
              </motion.div>

              {/* Mini stats */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 pt-4">
                {(Array.isArray(t.raw("hero.miniStats")) ? t.raw("hero.miniStats") : []).map(
                  (s: { value: string; label: string }, i: number) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-2xl font-extrabold text-gray-900">{s.value}</span>
                      <span className="text-xs text-gray-500 font-medium">{s.label}</span>
                    </div>
                  )
                )}
              </motion.div>
            </motion.div>

            {/* Right image collage */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-md aspect-square">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/189fa99b048642dc90599e21d1214132.png"
                  alt={t("hero.imageAlt")}
                  className="w-full h-full object-cover rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.14)] border border-white/60"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 px-5 py-3 flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{t("hero.floatingBadge.label")}</p>
                    <p className="text-sm font-bold text-gray-900">{t("hero.floatingBadge.value")}</p>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-[var(--accent)] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] px-5 py-3 flex items-center gap-2">
                  <Star className="w-4 h-4 fill-black text-black" />
                  <span className="text-sm font-bold text-black">{t("hero.ratingBadge")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <Reveal>
        <section id="categories" className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
                {t("categories.eyebrow")}
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 text-balance">
                {t("categories.heading")}
              </h2>
              <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto text-pretty">
                {t("categories.subtext")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {CATEGORIES_HERO.map((cat) => (
                <motion.div key={cat.slug} variants={fadeInUp}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className={`flex flex-col items-center gap-3 rounded-2xl border-2 ${cat.color} p-5 hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-all duration-300 group`}
                  >
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </span>
                    <span className="text-sm font-semibold text-gray-800 text-center leading-tight">
                      {cat.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <Reveal>
        <section id="featured" className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
                  {t("featured.eyebrow")}
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 text-balance">
                  {t("featured.heading")}
                </h2>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:gap-3 transition-all duration-200 shrink-0"
              >
                {t("featured.viewAll")} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {FEATURED_PRODUCTS.map((product) => (
                <motion.div key={product.id} variants={scaleIn}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="group flex flex-col rounded-2xl bg-white border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.10)] hover:shadow-[0_4px_32px_rgba(0,0,0,0.14)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.badge && (
                        <span
                          className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold ${BADGE_COLORS[product.badge]}`}
                        >
                          {product.badge}
                        </span>
                      )}
                      <button
                        aria-label={t("featured.addToCart")}
                        className="absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 p-2.5 shadow-md opacity-0 group-hover:opacity-100 hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200"
                      >
                        <ShoppingCart className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                      <span className="text-xs font-medium text-gray-400">{product.ageGroup}</span>
                      <h3 className="font-bold text-gray-900 leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-extrabold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
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

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <Reveal>
        <section className="py-20 bg-[var(--accent)]">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {VALUE_PROPS.map((vp, i) => {
                const Icon = vp.icon;
                return (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-black/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-black text-lg">{t(vp.titleKey)}</h3>
                        <p className="text-black/70 text-sm mt-1 leading-relaxed">{t(vp.descKey)}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── BRAND STORY / SPLIT ──────────────────────────────────────────── */}
      <Reveal>
        <section id="about" className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.12)]">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c37631a26ac4465897972d773c3c0200.jpg"
                  alt={t("story.imageAlt")}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-8 -right-4 lg:-right-10 bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.12)] border border-gray-100 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 flex items-center justify-center text-2xl">
                  🏆
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{t("story.award.label")}</p>
                  <p className="text-sm font-bold text-gray-900">{t("story.award.value")}</p>
                </div>
              </div>
            </div>

            {/* Copy side */}
            <div className="order-1 lg:order-2 flex flex-col gap-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("story.eyebrow")}
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight text-balance">
                {t("story.heading")}
              </h2>
              <p className="text-gray-600 leading-relaxed text-pretty">{t("story.body1")}</p>
              <p className="text-gray-600 leading-relaxed text-pretty">{t("story.body2")}</p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-gray-50 border border-gray-100 p-4 flex flex-col gap-1"
                  >
                    <span className="text-2xl font-extrabold text-gray-900">{stat.value}</span>
                    <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 self-start rounded-full border-2 border-gray-900 px-6 py-3 text-sm font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 mt-2"
              >
                {t("story.cta")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <Reveal>
        <section id="reviews" className="py-24 bg-gray-950 overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
                {t("testimonials.eyebrow")}
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white text-balance">
                {t("testimonials.heading")}
              </h2>
              <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto text-pretty">
                {t("testimonials.subtext")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {TESTIMONIALS.map((review) => (
                <motion.div key={review.id} variants={fadeInUp}>
                  <div className="flex flex-col gap-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 h-full hover:bg-white/8 transition-colors duration-300">
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm flex-1">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                      />
                      <div>
                        <p className="text-white font-semibold text-sm">{review.name}</p>
                        <p className="text-gray-500 text-xs">{review.location}</p>
                      </div>
                      <span className="ml-auto text-xs text-[var(--accent)] font-medium bg-[var(--accent)]/10 rounded-full px-2.5 py-1">
                        {review.product}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <Reveal>
        <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-500 to-[var(--accent)] relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
                {t("cta.heading")}
              </h2>
              <p className="mt-4 text-white/80 text-lg leading-relaxed text-pretty">
                {t("cta.subtext")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-purple-700 shadow-[0_4px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.24)] hover:scale-105 transition-all duration-300"
              >
                {t("cta.shopNow")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/60 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all duration-300"
              >
                {t("cta.contact")}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}