# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
create a toy selling website

## Goal
Build a vibrant, playful toy-selling e-commerce website with homepage, shop, product detail, cart, checkout, and about pages using Next.js 14 App Router and Tailwind CSS.

## Project type
e-commerce

## Design system — match this exactly
- Color tokens: `--background: #FFFBF5`, `--foreground: #1A1A2E`, `--card: #FFFFFF`, `--border: #E8E0D5`, `--muted: #F5F0E8`, `--muted-foreground: #6B6570`, `--accent: #FF6B6B`, `--accent-foreground: #FFFFFF`, `--brand-accent: 0 0% 100%`
- Fonts: Nunito

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`about`, `cart`, `categories`, `checkout`, `contact`, `cta`, `featured`, `footer`, `hero`, `nav`, `productDetail`, `shop`, `shopProducts`, `story`, `testimonials`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
