export const BRAND = {
  name: "ToyLand",
  tagline: "Where Play Begins",
  email: "hello@toyland.com",
  phone: "+1 (800) TOY-LAND",
  address: "123 Playful Ave, Fun City, CA 90210",
  social: {
    instagram: "https://instagram.com/toyland",
    facebook: "https://facebook.com/toyland",
    twitter: "https://twitter.com/toyland",
    youtube: "https://youtube.com/toyland",
  },
} as const;

export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Shop", href: "/shop", key: "shop" },
  { label: "About Us", href: "/about-us", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export type AgeGroup = "0-3" | "3-8" | "8-12" | "12+" | "all";
export type ToyCategory =
  | "action-figures"
  | "board-games"
  | "educational"
  | "outdoor"
  | "arts-crafts"
  | "dolls"
  | "vehicles"
  | "building-blocks";

export type Badge = "new" | "sale" | "bestseller" | "limited";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: ToyCategory;
  ageGroup: AgeGroup;
  brand: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  badges: Badge[];
  inStock: boolean;
  stockCount: number;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Adventure Action Hero Set",
    slug: "adventure-action-hero-set",
    price: 29.99,
    originalPrice: 39.99,
    category: "action-figures",
    ageGroup: "3-8",
    brand: "HeroWorld",
    description: "A thrilling 5-piece action hero set with accessories and vehicles.",
    longDescription:
      "Unleash your child's imagination with the Adventure Action Hero Set. This premium 5-piece collection includes fully articulated heroes, detailed accessories, and two mini vehicles. Each figure stands 6 inches tall with 12 points of articulation for dynamic poses. Perfect for solo play or group adventures.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e06515c45a9445cb838474d0da0a07c6.jpg",
    images: [
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e06515c45a9445cb838474d0da0a07c6.jpg",
      "/images/adventure-action-hero-set-2.jpg",
      "/images/adventure-action-hero-set-3.jpg",
    ],
    rating: 4.8,
    reviewCount: 234,
    badges: ["bestseller", "sale"],
    inStock: true,
    stockCount: 48,
    features: [
      "5 fully articulated figures",
      "12 points of articulation each",
      "2 mini vehicles included",
      "Safe, non-toxic materials",
      "Ages 3 and up",
    ],
    reviews: [
      {
        id: "r1",
        author: "Sarah M.",
        rating: 5,
        date: "2024-11-15",
        comment: "My son absolutely loves this set! Great quality and so many pieces to play with.",
        verified: true,
      },
      {
        id: "r2",
        author: "James T.",
        rating: 4,
        date: "2024-10-28",
        comment: "Really good value for money. The figures are sturdy and well-made.",
        verified: true,
      },
    ],
  },
  {
    id: "p2",
    name: "Rainbow Stacking Rings",
    slug: "rainbow-stacking-rings",
    price: 14.99,
    category: "educational",
    ageGroup: "0-3",
    brand: "BabyBright",
    description: "Colorful stacking rings that teach colors, sizes, and motor skills.",
    longDescription:
      "The Rainbow Stacking Rings are a classic developmental toy designed to help babies and toddlers learn colors, sizes, and hand-eye coordination. Made from BPA-free, food-safe materials with smooth rounded edges. The wobble base adds an extra element of fun as little ones discover balance.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/474f7be22a8a4e92b9986b5b41aa2558.jpg",
    images: ["https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/474f7be22a8a4e92b9986b5b41aa2558.jpg", "/images/rainbow-stacking-rings-2.jpg"],
    rating: 4.9,
    reviewCount: 512,
    badges: ["bestseller"],
    inStock: true,
    stockCount: 120,
    features: [
      "8 colorful rings",
      "BPA-free materials",
      "Wobble base for extra fun",
      "Teaches colors and sizes",
      "Ages 6 months and up",
    ],
    reviews: [
      {
        id: "r3",
        author: "Emily R.",
        rating: 5,
        date: "2024-12-01",
        comment: "Perfect first toy! My baby loves the bright colors.",
        verified: true,
      },
    ],
  },
  {
    id: "p3",
    name: "Galaxy Explorer Board Game",
    slug: "galaxy-explorer-board-game",
    price: 34.99,
    originalPrice: 44.99,
    category: "board-games",
    ageGroup: "8-12",
    brand: "GameMaster",
    description: "An epic space adventure board game for 2-6 players.",
    longDescription:
      "Blast off into the cosmos with Galaxy Explorer, the award-winning strategy board game for the whole family. Navigate asteroid fields, discover alien civilizations, and race to colonize new planets. With 200+ cards, 6 custom spaceships, and a modular board, no two games are ever the same.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/758b9547cb4a4c549a6afb4d91c6ceae.PNG",
    images: ["https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/758b9547cb4a4c549a6afb4d91c6ceae.PNG", "/images/galaxy-explorer-board-game-2.jpg"],
    rating: 4.7,
    reviewCount: 189,
    badges: ["new", "sale"],
    inStock: true,
    stockCount: 35,
    features: [
      "2-6 players",
      "45-90 minute gameplay",
      "200+ cards",
      "6 custom spaceships",
      "Modular board for replayability",
    ],
    reviews: [
      {
        id: "r4",
        author: "David K.",
        rating: 5,
        date: "2024-11-20",
        comment: "Best board game we've played in years. Kids and adults both love it!",
        verified: true,
      },
    ],
  },
  {
    id: "p4",
    name: "Mega Building Blocks Set",
    slug: "mega-building-blocks-set",
    price: 49.99,
    category: "building-blocks",
    ageGroup: "3-8",
    brand: "BuildIt",
    description: "250-piece colorful building blocks for endless creative construction.",
    longDescription:
      "Let creativity soar with the Mega Building Blocks Set. This 250-piece collection features large, easy-to-grip blocks in 10 vibrant colors. Compatible with all major building block brands, these durable pieces encourage STEM learning through hands-on construction play.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/160f71717da34454b435dc0178f4d310.jpeg",
    images: ["https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/160f71717da34454b435dc0178f4d310.jpeg", "/images/mega-building-blocks-set-2.jpg"],
    rating: 4.6,
    reviewCount: 341,
    badges: ["bestseller"],
    inStock: true,
    stockCount: 67,
    features: [
      "250 pieces",
      "10 vibrant colors",
      "Compatible with major brands",
      "Promotes STEM learning",
      "Storage bucket included",
    ],
    reviews: [
      {
        id: "r5",
        author: "Lisa P.",
        rating: 5,
        date: "2024-10-15",
        comment: "My kids play with these every single day. Worth every penny!",
        verified: true,
      },
    ],
  },
  {
    id: "p5",
    name: "Princess Dream Castle",
    slug: "princess-dream-castle",
    price: 59.99,
    originalPrice: 79.99,
    category: "dolls",
    ageGroup: "3-8",
    brand: "DreamWorld",
    description: "A magical 3-story castle with princess dolls and royal accessories.",
    longDescription:
      "Welcome to the Princess Dream Castle, a magnificent 3-story playset complete with 2 princess dolls, a royal carriage, and over 30 accessories. The castle features working doors, a drawbridge, and a spiral staircase. Lights and sounds bring the magic to life.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c79b176e5b34401aa6b375f3221996b2.webp",
    images: ["https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c79b176e5b34401aa6b375f3221996b2.webp", "/images/princess-dream-castle-2.jpg"],
    rating: 4.8,
    reviewCount: 276,
    badges: ["sale"],
    inStock: true,
    stockCount: 22,
    features: [
      "3-story castle playset",
      "2 princess dolls included",
      "30+ accessories",
      "Working lights and sounds",
      "Royal carriage included",
    ],
    reviews: [
      {
        id: "r6",
        author: "Amanda W.",
        rating: 5,
        date: "2024-11-05",
        comment: "My daughter was speechless when she opened this. Absolutely magical!",
        verified: true,
      },
    ],
  },
  {
    id: "p6",
    name: "Outdoor Adventure Kit",
    slug: "outdoor-adventure-kit",
    price: 39.99,
    category: "outdoor",
    ageGroup: "8-12",
    brand: "WildExplorer",
    description: "Complete outdoor exploration kit with binoculars, compass, and field guide.",
    longDescription:
      "Inspire the next generation of explorers with the Outdoor Adventure Kit. This comprehensive set includes real-glass binoculars, a working compass, a magnifying glass, a bug catcher, a field journal, and a 64-page illustrated nature guide. Perfect for backyard adventures or nature hikes.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e3a8449c6d8c4cc29af9ca8c9c5caecf.jpg",
    images: ["https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e3a8449c6d8c4cc29af9ca8c9c5caecf.jpg", "/images/outdoor-adventure-kit-2.jpg"],
    rating: 4.5,
    reviewCount: 158,
    badges: ["new"],
    inStock: true,
    stockCount: 54,
    features: [
      "Real-glass binoculars",
      "Working compass",
      "Bug catcher with magnifier",
      "64-page nature guide",
      "Durable carry case",
    ],
    reviews: [
      {
        id: "r7",
        author: "Michael B.",
        rating: 5,
        date: "2024-12-03",
        comment: "My son takes this everywhere. Great quality and so educational.",
        verified: true,
      },
    ],
  },
  {
    id: "p7",
    name: "Creative Arts & Crafts Studio",
    slug: "creative-arts-crafts-studio",
    price: 44.99,
    originalPrice: 54.99,
    category: "arts-crafts",
    ageGroup: "3-8",
    brand: "ArtSpark",
    description: "150-piece art studio with paints, brushes, clay, and craft supplies.",
    longDescription:
      "Unlock your child's inner artist with the Creative Arts and Crafts Studio. This all-in-one creative kit includes 24 watercolor paints, 12 brushes, air-dry clay, glitter glue, stickers, foam shapes, and a step-by-step project book with 20 guided activities.",
    image: "https://www.niir.org/blog/wp-content/uploads/2025/08/Gemini_Generated_Image_3g5a43g5a43g5a43_11zon-1.webp",
    images: ["https://www.niir.org/blog/wp-content/uploads/2025/08/Gemini_Generated_Image_3g5a43g5a43g5a43_11zon-1.webp", "/images/creative-arts-crafts-studio-2.jpg"],
    rating: 4.7,
    reviewCount: 203,
    badges: ["sale", "bestseller"],
    inStock: true,
    stockCount: 89,
    features: [
      "150+ pieces",
      "24 watercolor paints",
      "Air-dry clay included",
      "20 guided projects",
      "Non-toxic, washable materials",
    ],
    reviews: [
      {
        id: "r8",
        author: "Rachel S.",
        rating: 5,
        date: "2024-11-28",
        comment: "My daughter has been creating masterpieces every day. Love this kit!",
        verified: true,
      },
    ],
  },
  {
    id: "p8",
    name: "Remote Control Racing Car",
    slug: "remote-control-racing-car",
    price: 54.99,
    category: "vehicles",
    ageGroup: "8-12",
    brand: "SpeedKing",
    description: "High-speed RC car with 2.4GHz control and rechargeable battery.",
    longDescription:
      "Experience the thrill of high-speed racing with the SpeedKing Remote Control Racing Car. Reaching speeds up to 25 mph, this precision-engineered RC car features 2.4GHz interference-free control, all-terrain suspension, and a rechargeable lithium battery for 40 minutes of continuous play.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/09ad645f1fdb46219552cc55b35cd533.jpg",
    images: ["https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/09ad645f1fdb46219552cc55b35cd533.jpg", "/images/remote-control-racing-car-2.jpg"],
    rating: 4.6,
    reviewCount: 167,
    badges: ["new"],
    inStock: true,
    stockCount: 31,
    features: [
      "25 mph top speed",
      "2.4GHz control",
      "All-terrain suspension",
      "40-min battery life",
      "USB rechargeable",
    ],
    reviews: [
      {
        id: "r9",
        author: "Tom H.",
        rating: 5,
        date: "2024-12-05",
        comment: "Incredibly fast and durable. My son races it every weekend!",
        verified: true,
      },
    ],
  },
];

export const CATEGORIES = [
  { id: "action-figures", label: "Action Figures", icon: "⚔️", color: "var(--brand-red)" },
  { id: "board-games", label: "Board Games", icon: "🎲", color: "var(--brand-blue)" },
  { id: "educational", label: "Educational", icon: "🎓", color: "var(--brand-green)" },
  { id: "outdoor", label: "Outdoor", icon: "🌳", color: "var(--brand-green)" },
  { id: "arts-crafts", label: "Arts & Crafts", icon: "🎨", color: "var(--brand-yellow)" },
  { id: "dolls", label: "Dolls", icon: "👸", color: "var(--brand-red)" },
  { id: "vehicles", label: "Vehicles", icon: "🚗", color: "var(--brand-blue)" },
  { id: "building-blocks", label: "Building Blocks", icon: "🧱", color: "var(--brand-yellow)" },
] as const;

export const AGE_GROUPS = [
  { id: "0-3", label: "0–3 Years" },
  { id: "3-8", label: "3–8 Years" },
  { id: "8-12", label: "8–12 Years" },
  { id: "12+", label: "12+ Years" },
  { id: "all", label: "All Ages" },
] as const;