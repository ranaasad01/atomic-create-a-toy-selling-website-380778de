"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, SlidersHorizontal, X, ChevronDown, ShoppingCart, Search } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Mock product data ────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: "1", name: "Galaxy Explorer Action Figure", price: 24.99, originalPrice: 34.99, image: "/images/galaxy-explorer-action-figure.jpg", category: "Action Figures", ageGroup: "3-8", rating: 4.8, reviewCount: 142, badge: "Best Seller", description: "Poseable 12-inch figure with light-up helmet and accessories.", inStock: true },
  { id: "2", name: "Dino World Board Game", price: 32.99, image: "/images/dino-world-board-game.jpg", category: "Board Games", ageGroup: "8-12", rating: 4.6, reviewCount: 89, badge: "New", description: "Strategic family board game for 2–6 players.", inStock: true },
  { id: "3", name: "Rainbow Stacking Rings", price: 14.99, image: "/images/rainbow-stacking-rings-baby-toy.jpg", category: "Educational", ageGroup: "0-3", rating: 4.9, reviewCount: 213, badge: undefined, description: "Soft, colorful rings that develop motor skills.", inStock: true },
  { id: "4", name: "Pro Soccer Ball Set", price: 29.99, originalPrice: 39.99, image: "/images/pro-soccer-ball-set-kids.jpg", category: "Outdoor & Sports", ageGroup: "8-12", rating: 4.5, reviewCount: 67, badge: "Sale", description: "Regulation-size ball with pump and carry bag.", inStock: true },
  { id: "5", name: "Watercolor Mega Kit", price: 19.99, image: "/images/watercolor-mega-art-kit-kids.jpg", category: "Arts & Crafts", ageGroup: "3-8", rating: 4.7, reviewCount: 155, badge: undefined, description: "48 vibrant watercolors, 3 brushes, and a canvas pad.", inStock: true },
  { id: "6", name: "Princess Elara Doll", price: 27.99, image: "/images/princess-elara-fashion-doll.jpg", category: "Dolls & Plush", ageGroup: "3-8", rating: 4.8, reviewCount: 198, badge: "Best Seller", description: "12-inch doll with 5 outfit changes and accessories.", inStock: true },
  { id: "7", name: "Robo-Builder STEM Kit", price: 49.99, image: "/images/robo-builder-stem-kit-kids.jpg", category: "Educational", ageGroup: "8-12", rating: 4.9, reviewCount: 301, badge: "Best Seller", description: "Build and code your own robot with 200+ pieces.", inStock: true },
  { id: "8", name: "Jungle Gym Climber", price: 89.99, originalPrice: 119.99, image: "/images/jungle-gym-climber-outdoor.jpg", category: "Outdoor & Sports", ageGroup: "3-8", rating: 4.4, reviewCount: 44, badge: "Sale", description: "Freestanding climber with slide and monkey bars.", inStock: false },
  { id: "9", name: "Cuddly Bear Plush", price: 16.99, image: "/images/cuddly-bear-plush-toy.jpg", category: "Dolls & Plush", ageGroup: "0-3", rating: 4.7, reviewCount: 88, badge: "New", description: "Ultra-soft 18-inch teddy bear, machine washable.", inStock: true },
  { id: "10", name: "Castle Quest Strategy Game", price: 44.99, image: "/images/castle-quest-strategy-board-game.jpg", category: "Board Games", ageGroup: "12+", rating: 4.6, reviewCount: 73, badge: undefined, description: "Epic medieval strategy game for 2–4 players.", inStock: true },
  { id: "11", name: "Finger Paint Starter Set", price: 11.99, image: "/images/finger-paint-starter-set-toddler.jpg", category: "Arts & Crafts", ageGroup: "0-3", rating: 4.5, reviewCount: 120, badge: undefined, description: "Non-toxic, washable finger paints in 8 colors.", inStock: true },
  { id: "12", name: "Space Ranger Blaster", price: 22.99, image: "/images/space-ranger-blaster-toy-gun.jpg", category: "Action Figures", ageGroup: "8-12", rating: 4.3, reviewCount: 56, badge: "New", description: "Light-and-sound foam blaster with 10 darts.", inStock: true },
  { id: "13", name: "Magnetic Tile Set 60pc", price: 38.99, image: "/images/magnetic-tile-set-60-pieces.jpg", category: "Educational", ageGroup: "3-8", rating: 4.9, reviewCount: 445, badge: "Best Seller", description: "60 translucent magnetic tiles for endless building.", inStock: true },
  { id: "14", name: "Bubble Wand Outdoor Kit", price: 9.99, image: "/images/bubble-wand-outdoor-kit-kids.jpg", category: "Outdoor & Sports", ageGroup: "0-3", rating: 4.6, reviewCount: 99, badge: undefined, description: "Giant bubble wands with 2 bottles of solution.", inStock: true },
  { id: "15", name: "Superhero Cape Set", price: 18.99, image: "/images/superhero-cape-costume-set-kids.jpg", category: "Action Figures", ageGroup: "3-8", rating: 4.7, reviewCount: 167, badge: undefined, description: "Set of 4 capes with masks for imaginative play.", inStock: true },
  { id: "16", name: "Glitter Slime Lab", price: 15.99, originalPrice: 21.99, image: "/images/glitter-slime-lab-kit-kids.jpg", category: "Arts & Crafts", ageGroup: "8-12", rating: 4.4, reviewCount: 203, badge: "Sale", description: "Make 10 types of glitter slime with safe ingredients.", inStock: true },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];

const AGE_GROUPS = [
  { label: "All Ages", value: "all" },
  { label: "0–3 Years", value: "0-3" },
  { label: "3–8 Years", value: "3-8" },
  { label: "8–12 Years", value: "8-12" },
  { label: "12+ Years", value: "12+" },
];

const PRODUCT_CATEGORIES = ["Action Figures", "Board Games", "Educational", "Outdoor & Sports", "Arts & Crafts", "Dolls & Plush"];

const BRANDS = ["ToyVille Originals", "PlayPeak", "BrightMinds", "WildPlay", "CraftKids"];

const BADGE_STYLES: Record<string, string> = {
  "New": "bg-[var(--accent)] text-black",
  "Sale": "bg-rose-500 text-white",
  "Best Seller": "bg-amber-400 text-black",
};

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={cn(
              "fill-current",
              i < Math.floor(rating) ? "text-amber-400" : "text-gray-300"
            )}
          />
        ))}
      </div>
      <span className="text-xs text-[hsl(var(--muted-foreground))]">({count})</span>
    </div>
  );
}

function ProductCard({ product, t }: { product: typeof PRODUCTS[0]; t: ReturnType<typeof useTranslations> }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_20px_40px_-12px_rgba(0,0,0,0.16)]"
    >
      {/* Badge */}
      {product.badge && (
        <span className={cn("absolute top-3 left-3 z-10 rounded-full px-2.5 py-0.5 text-xs font-semibold", BADGE_STYLES[product.badge])}>
          {product.badge}
        </span>
      )}
      {!product.inStock && (
        <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
          <span className="rounded-full bg-black/80 px-4 py-1.5 text-xs font-semibold text-white">{t("shop.outOfStock")}</span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium text-[var(--accent)] uppercase tracking-wide">{product.category}</p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{product.name}</h3>
        <StarRating rating={product.rating} count={product.reviewCount} />

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-[hsl(var(--muted-foreground))] line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleAdd}
            disabled={!product.inStock}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200",
              added
                ? "bg-green-500 text-white"
                : "bg-[var(--accent)] text-black hover:brightness-95"
            )}
          >
            <ShoppingCart size={13} />
            {added ? t("shop.added") : t("shop.addToCart")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ShopPage() {
  const t = useTranslations();

  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(120);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedAge("all");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange(120);
    setSearchQuery("");
  };

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    if (selectedAge !== "all") {
      result = result.filter((p) => p.ageGroup === selectedAge);
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    result = result.filter((p) => p.price <= priceRange);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    return result;
  }, [searchQuery, selectedAge, selectedCategories, priceRange, sortBy]);

  const hasActiveFilters =
    selectedAge !== "all" ||
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange < 120;

  const SidebarContent = () => (
    <div className="flex flex-col gap-6">
      {/* Age Group */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide">{t("shop.filter.ageGroup")}</h3>
        <div className="flex flex-col gap-1.5">
          {AGE_GROUPS.map((ag) => (
            <button
              key={ag.value}
              onClick={() => setSelectedAge(ag.value)}
              className={cn(
                "w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-all duration-200",
                selectedAge === ag.value
                  ? "bg-[var(--accent)] text-black"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {ag.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-black/5" />

      {/* Category */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide">{t("shop.filter.category")}</h3>
        <div className="flex flex-col gap-2">
          {PRODUCT_CATEGORIES.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 rounded border-gray-300 accent-[var(--accent)]"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-black/5" />

      {/* Brand */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide">{t("shop.filter.brand")}</h3>
        <div className="flex flex-col gap-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="h-4 w-4 rounded border-gray-300 accent-[var(--accent)]"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-black/5" />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wide">{t("shop.filter.price")}</h3>
        <div className="flex flex-col gap-3">
          <input
            type="range"
            min={5}
            max={120}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))]">
            <span>$5</span>
            <span className="font-semibold text-gray-900">{t("shop.filter.upTo")} ${priceRange}</span>
            <span>$120</span>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-100"
        >
          <X size={14} />
          {t("shop.filter.clear")}
        </button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      {/* Page Header */}
      <Reveal>
        <section className="border-b border-black/5 bg-white px-4 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">{t("shop.eyebrow")}</p>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{t("shop.heading")}</h1>
              <p className="max-w-xl text-base text-[hsl(var(--muted-foreground))] leading-relaxed">{t("shop.subheading")}</p>
            </div>
          </div>
        </section>
      </Reveal>

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <Reveal>
              <div className="sticky top-24 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-900">{t("shop.filter.title")}</h2>
                  {hasActiveFilters && (
                    <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-bold text-black">
                      {[selectedAge !== "all" ? 1 : 0, selectedCategories.length, selectedBrands.length, priceRange < 120 ? 1 : 0].reduce((a, b) => a + b, 0)}
                    </span>
                  )}
                </div>
                <SidebarContent />
              </div>
            </Reveal>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top Bar */}
            <Reveal>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("shop.searchPlaceholder")}
                    className="w-full rounded-xl border border-black/10 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
                  />
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile filter toggle */}
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 lg:hidden"
                  >
                    <SlidersHorizontal size={15} />
                    {t("shop.filter.title")}
                    {hasActiveFilters && <span className="rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-xs font-bold text-black">{[selectedAge !== "all" ? 1 : 0, selectedCategories.length, selectedBrands.length, priceRange < 120 ? 1 : 0].reduce((a, b) => a + b, 0)}</span>}
                  </button>

                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none rounded-xl border border-black/10 bg-white py-2.5 pl-3 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 cursor-pointer"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Result count */}
            <Reveal>
              <p className="mb-5 text-sm text-[hsl(var(--muted-foreground))]">
                {t("shop.resultCount", { count: filtered.length })}
              </p>
            </Reveal>

            {/* Product Grid */}
            {filtered.length === 0 ? (
              <Reveal>
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-black/10 bg-white py-24 text-center">
                  <span className="text-5xl">🔍</span>
                  <h3 className="text-lg font-semibold text-gray-900">{t("shop.noResults.title")}</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{t("shop.noResults.body")}</p>
                  <button
                    onClick={clearFilters}
                    className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-black transition-all hover:brightness-95"
                  >
                    {t("shop.noResults.cta")}
                  </button>
                </div>
              </Reveal>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} t={t} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="absolute left-0 top-0 h-full w-80 overflow-y-auto bg-white p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">{t("shop.filter.title")}</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <SidebarContent />
          </motion.aside>
        </div>
      )}
    </main>
  );
}