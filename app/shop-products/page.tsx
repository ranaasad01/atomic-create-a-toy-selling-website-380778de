"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Star, ShoppingCart, Heart, X, ChevronDown } from 'lucide-react';
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PRODUCTS = [
  { id: "1", name: "Galaxy Explorer Robot", slug: "galaxy-explorer-robot", price: 49.99, originalPrice: 64.99, image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/2520e257c2b34fabbc07e2c097fb9201.jpg", category: "Action Figures", ageGroup: "8-12", rating: 4.8, reviewCount: 124, badge: "Sale", description: "An interactive robot with LED lights, sound effects, and programmable movements.", inStock: true },
  { id: "2", name: "Wooden Rainbow Stacker", slug: "wooden-rainbow-stacker", price: 29.99, image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/047b3318306c4afba2e85d16a771c522.jpg", category: "Educational", ageGroup: "0-3", rating: 4.9, reviewCount: 87, badge: "Best Seller", description: "Beautifully crafted wooden stacking rings in vibrant rainbow colors.", inStock: true },
  { id: "3", name: "Kingdom Quest Board Game", slug: "kingdom-quest-board-game", price: 39.99, image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d2c42fd6e6d643e6a883ee21a0626312.jpg", category: "Board Games", ageGroup: "8-12", rating: 4.7, reviewCount: 56, badge: undefined, description: "An epic strategy board game for 2–6 players with over 200 pieces.", inStock: true },
  { id: "4", name: "Outdoor Adventure Kite", slug: "outdoor-adventure-kite", price: 19.99, image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/07d42a3586a143e5a59074675201e7b7.jpeg", category: "Outdoor & Sports", ageGroup: "3-8", rating: 4.5, reviewCount: 43, badge: "New", description: "A durable, easy-to-fly kite with a 30-meter string and carrying bag.", inStock: true },
  { id: "5", name: "Sparkle Princess Doll Set", slug: "sparkle-princess-doll-set", price: 34.99, originalPrice: 44.99, image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/df8bbc53b0b846a6985653f89d77bf01.jpg", category: "Dolls & Plush", ageGroup: "3-8", rating: 4.6, reviewCount: 98, badge: "Sale", description: "A deluxe princess doll with 12 outfits, accessories, and a royal castle.", inStock: true },
  { id: "6", name: "Watercolor Art Studio", slug: "watercolor-art-studio", price: 24.99, image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/b5ef79f6bee94d029897ec79fef1f316.jpeg", category: "Arts & Crafts", ageGroup: "3-8", rating: 4.8, reviewCount: 61, badge: undefined, description: "A complete watercolor set with 36 colors, brushes, and a canvas pad.", inStock: true },
  { id: "7", name: "Dino Dig Excavation Kit", slug: "dino-dig-excavation-kit", price: 27.99, image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/12856368ac9c412897e9f8bdef9fdbdb.jpg", category: "Educational", ageGroup: "8-12", rating: 4.7, reviewCount: 39, badge: "New", description: "Unearth real fossil replicas with this hands-on paleontology kit.", inStock: true },
  { id: "8", name: "Cuddly Bear Plush XL", slug: "cuddly-bear-plush-xl", price: 22.99, image: "/images/cuddly-bear-plush-xl.jpg", category: "Dolls & Plush", ageGroup: "0-3", rating: 4.9, reviewCount: 152, badge: "Best Seller", description: "An ultra-soft, huggable teddy bear made from hypoallergenic materials.", inStock: true },
  { id: "9", name: "Speed Racer Track Set", slug: "speed-racer-track-set", price: 54.99, originalPrice: 69.99, image: "/images/speed-racer-track-set-cars.jpg", category: "Action Figures", ageGroup: "3-8", rating: 4.6, reviewCount: 77, badge: "Sale", description: "A 6-meter loop-the-loop track with 4 die-cast cars and a launcher.", inStock: false },
  { id: "10", name: "Magnetic Tile Builder 100pc", slug: "magnetic-tile-builder-100pc", price: 59.99, image: "/images/magnetic-tile-builder-set.jpg", category: "Educational", ageGroup: "3-8", rating: 4.9, reviewCount: 203, badge: "Best Seller", description: "100 magnetic tiles in 6 shapes for endless 3D building creativity.", inStock: true },
  { id: "11", name: "Junior Soccer Goal Set", slug: "junior-soccer-goal-set", price: 32.99, image: "/images/junior-soccer-goal-set.jpg", category: "Outdoor & Sports", ageGroup: "3-8", rating: 4.4, reviewCount: 28, badge: undefined, description: "A pop-up soccer goal with a size-3 ball and pump, perfect for the backyard.", inStock: true },
  { id: "12", name: "Craft Bead Jewelry Kit", slug: "craft-bead-jewelry-kit", price: 18.99, image: "/images/craft-bead-jewelry-kit-kids.jpg", category: "Arts & Crafts", ageGroup: "8-12", rating: 4.5, reviewCount: 45, badge: "New", description: "Over 500 colorful beads with elastic cord and clasps to make bracelets and necklaces.", inStock: true },
];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
const ALL_AGE_GROUPS = ["All Ages", "0-3", "3-8", "8-12", "12+"];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
];
const BADGE_COLORS: Record<string, string> = {
  "New": "bg-[var(--accent)] text-black",
  "Sale": "bg-rose-500 text-white",
  "Best Seller": "bg-amber-400 text-black",
};

export default function ShopProductsPage() {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeAge, setActiveAge] = useState("All Ages");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [sortOpen, setSortOpen] = useState(false);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (activeAge !== "All Ages") list = list.filter((p) => p.ageGroup === activeAge);
    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "reviews": list.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return list;
  }, [search, activeCategory, activeAge, sortBy]);

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      {/* Hero Banner */}
      <Reveal>
        <section className="relative overflow-hidden bg-[var(--accent)] py-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            {["🧸","🎲","🚀","🎨","⚽","🦸"].map((emoji, i) => (
              <span key={i} className="absolute text-5xl select-none" style={{ top: `${10 + (i * 15) % 80}%`, left: `${5 + (i * 17) % 90}%`, transform: `rotate(${i * 23 - 30}deg)` }}>{emoji}</span>
            ))}
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-3">
              {t("shopProducts.hero.title")}
            </h1>
            <p className="text-black/70 text-lg max-w-xl mx-auto">
              {t("shopProducts.hero.subtitle")}
            </p>
          </div>
        </section>
      </Reveal>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Sort Bar */}
        <Reveal>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("shopProducts.search.placeholder")}
                className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] pl-10 pr-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={cn("flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors sm:hidden", showFilters ? "bg-[var(--accent)] text-black border-[var(--accent)]" : "border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))]")}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {t("shopProducts.filters.toggle")}
            </button>
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2.5 text-sm font-medium text-[hsl(var(--foreground))] hover:border-[var(--accent)] transition-colors min-w-[160px] justify-between"
              >
                <span>{SORT_OPTIONS.find((s) => s.value === sortBy)?.label}</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", sortOpen && "rotate-180")} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 z-20 w-48 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)] overflow-hidden">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                      className={cn("w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[hsl(var(--muted))]", sortBy === opt.value ? "text-[var(--accent)] font-semibold" : "text-[hsl(var(--foreground))]")}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <Reveal className={cn("w-56 shrink-0 hidden sm:block")}>
            <aside className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-3">{t("shopProducts.filters.category")}</h3>
                <div className="space-y-1">
                  {ALL_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn("w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-colors", activeCategory === cat ? "bg-[var(--accent)] text-black" : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]")}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-3">{t("shopProducts.filters.ageGroup")}</h3>
                <div className="space-y-1">
                  {ALL_AGE_GROUPS.map((age) => (
                    <button
                      key={age}
                      onClick={() => setActiveAge(age)}
                      className={cn("w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-colors", activeAge === age ? "bg-[var(--accent)] text-black" : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]")}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
              {(activeCategory !== "All" || activeAge !== "All Ages" || search) && (
                <button
                  onClick={() => { setActiveCategory("All"); setActiveAge("All Ages"); setSearch(""); }}
                  className="flex items-center gap-1.5 text-sm text-rose-500 hover:text-rose-600 font-medium transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                  {t("shopProducts.filters.clearAll")}
                </button>
              )}
            </aside>
          </Reveal>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="sm:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setShowFilters(false)}>
              <div className="absolute bottom-0 left-0 right-0 bg-[hsl(var(--card))] rounded-t-2xl p-6 space-y-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">{t("shopProducts.filters.toggle")}</h3>
                  <button onClick={() => setShowFilters(false)}><X className="h-5 w-5 text-[hsl(var(--muted-foreground))]" /></button>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-2">{t("shopProducts.filters.category")}</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_CATEGORIES.map((cat) => (
                      <button key={cat} onClick={() => setActiveCategory(cat)} className={cn("rounded-full px-3 py-1 text-sm font-medium border transition-colors", activeCategory === cat ? "bg-[var(--accent)] text-black border-[var(--accent)]" : "border-[hsl(var(--border))] text-[hsl(var(--foreground))]")}>{cat}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-2">{t("shopProducts.filters.ageGroup")}</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_AGE_GROUPS.map((age) => (
                      <button key={age} onClick={() => setActiveAge(age)} className={cn("rounded-full px-3 py-1 text-sm font-medium border transition-colors", activeAge === age ? "bg-[var(--accent)] text-black border-[var(--accent)]" : "border-[hsl(var(--border))] text-[hsl(var(--foreground))]")}>{age}</button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setShowFilters(false)} className="w-full rounded-xl bg-[var(--accent)] text-black font-semibold py-3 text-sm">{t("shopProducts.filters.apply")}</button>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <Reveal>
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {t("shopProducts.results.count", { count: filtered.length })}
                </p>
              </div>
            </Reveal>

            {filtered.length === 0 ? (
              <Reveal>
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <span className="text-6xl mb-4">🔍</span>
                  <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2">{t("shopProducts.empty.title")}</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm mb-6">{t("shopProducts.empty.subtitle")}</p>
                  <button onClick={() => { setSearch(""); setActiveCategory("All"); setActiveAge("All Ages"); }} className="rounded-xl bg-[var(--accent)] text-black font-semibold px-6 py-2.5 text-sm hover:opacity-90 transition-opacity">
                    {t("shopProducts.empty.cta")}
                  </button>
                </div>
              </Reveal>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((product) => (
                  <motion.div key={product.id} variants={scaleIn}>
                    <div className="group relative flex flex-col rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-0.5">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-[hsl(var(--muted))]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => { (e.target as HTMLImageElement).src = "/images/toy-placeholder.jpg"; }}
                        />
                        {product.badge && (
                          <span className={cn("absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-xs font-bold", BADGE_COLORS[product.badge] ?? "bg-gray-200 text-gray-800")}>
                            {product.badge}
                          </span>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="bg-white/90 text-black text-xs font-bold rounded-full px-3 py-1">{t("shopProducts.product.outOfStock")}</span>
                          </div>
                        )}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 right-3 rounded-full bg-white/90 p-1.5 shadow-sm hover:scale-110 transition-transform"
                          aria-label={t("shopProducts.product.wishlist")}
                        >
                          <Heart className={cn("h-4 w-4 transition-colors", wishlist.includes(product.id) ? "fill-rose-500 text-rose-500" : "text-gray-400")} />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="flex flex-col flex-1 p-4 gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs text-[hsl(var(--muted-foreground))] mb-0.5">{product.category}</p>
                            <h3 className="font-semibold text-[hsl(var(--foreground))] text-sm leading-snug line-clamp-2">{product.name}</h3>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200")} />
                            ))}
                          </div>
                          <span className="text-xs text-[hsl(var(--muted-foreground))]">({product.reviewCount})</span>
                        </div>

                        {/* Age tag */}
                        <span className="inline-flex w-fit rounded-full bg-[hsl(var(--muted))] px-2 py-0.5 text-xs text-[hsl(var(--muted-foreground))] font-medium">
                          {t("shopProducts.product.ages")} {product.ageGroup}
                        </span>

                        {/* Price + CTA */}
                        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-bold text-[hsl(var(--foreground))]">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                              <span className="text-xs text-[hsl(var(--muted-foreground))] line-through">${product.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                          <Link
                            href={`/product-detail?id=${product.id}`}
                            className={cn("flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200", product.inStock ? "bg-[var(--accent)] text-black hover:opacity-90 hover:scale-105" : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] cursor-not-allowed pointer-events-none")}
                          >
                            <ShoppingCart className="h-3.5 w-3.5" />
                            {product.inStock ? t("shopProducts.product.addToCart") : t("shopProducts.product.outOfStock")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <Reveal>
        <section className="mt-16 bg-[hsl(var(--muted))] py-14">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <span className="text-4xl mb-4 block">🎁</span>
            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">{t("shopProducts.newsletter.title")}</h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-6 text-sm">{t("shopProducts.newsletter.subtitle")}</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t("shopProducts.newsletter.placeholder")}
                className="flex-1 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-2.5 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
              />
              <button type="submit" className="rounded-xl bg-[var(--accent)] text-black font-semibold px-5 py-2.5 text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                {t("shopProducts.newsletter.cta")}
              </button>
            </form>
          </div>
        </section>
      </Reveal>
    </main>
  );
}