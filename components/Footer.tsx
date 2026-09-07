"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { navLinks, BRAND } from "@/lib/data";
import { Sparkles, Mail, Phone, MapPin, Camera as Instagram, Globe as Facebook, MessageCircle as Twitter, Play as Youtube } from 'lucide-react';
import { Reveal } from "@/components/Reveal";

export default function Footer() {
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;
  const pathname = usePathname();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const footerCategories = [
    { label: t("footer.categories.actionFigures"), href: "/shop?category=action-figures" },
    { label: t("footer.categories.boardGames"), href: "/shop?category=board-games" },
    { label: t("footer.categories.educational"), href: "/shop?category=educational" },
    { label: t("footer.categories.outdoor"), href: "/shop?category=outdoor" },
    { label: t("footer.categories.artsCrafts"), href: "/shop?category=arts-crafts" },
    { label: t("footer.categories.vehicles"), href: "/shop?category=vehicles" },
  ];

  const footerHelp = [
    { label: t("footer.help.shipping"), href: "/contact" },
    { label: t("footer.help.returns"), href: "/contact" },
    { label: t("footer.help.faq"), href: "/contact" },
    { label: t("footer.help.contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-[var(--foreground)] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <Reveal className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-[var(--brand-red)] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight">{BRAND.name}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t("footer.brand.description")}
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: BRAND.social.instagram, label: "Instagram" },
                { icon: Facebook, href: BRAND.social.facebook, label: "Facebook" },
                { icon: Twitter, href: BRAND.social.twitter, label: "Twitter" },
                { icon: Youtube, href: BRAND.social.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--brand-red)] flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </Reveal>

          {/* Navigation */}
          <Reveal delay={0.1}>
            <h3 className="text-sm font-800 uppercase tracking-widest text-white/40 mb-4">
              {t("footer.sections.navigation")}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Categories */}
          <Reveal delay={0.15}>
            <h3 className="text-sm font-800 uppercase tracking-widest text-white/40 mb-4">
              {t("footer.sections.categories")}
            </h3>
            <ul className="space-y-2">
              {footerCategories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Contact */}
          <Reveal delay={0.2}>
            <h3 className="text-sm font-800 uppercase tracking-widest text-white/40 mb-4">
              {t("footer.sections.contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[var(--brand-red)] mt-0.5 shrink-0" />
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[var(--brand-red)] mt-0.5 shrink-0" />
                <a
                  href={`tel:${BRAND.phone}`}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--brand-red)] mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">{BRAND.address}</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-xs font-700 text-white/40 uppercase tracking-widest mb-3">
                {t("footer.sections.help")}
              </h4>
              <ul className="space-y-2">
                {footerHelp.map((item) => (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            {t("footer.copyright", { year: new Date().getFullYear(), brand: BRAND.name })}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t("footer.legal.privacy")}
            </Link>
            <Link href="/contact" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t("footer.legal.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}