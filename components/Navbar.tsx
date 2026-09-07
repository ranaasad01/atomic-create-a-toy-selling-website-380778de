"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { navLinks } from "@/lib/data";
import { BRAND } from "@/lib/data";
import { ShoppingCart, Menu, X, Search, Sparkles } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateCart = () => {
      try {
        const stored = localStorage.getItem("toyland-cart");
        if (stored) {
          const items = JSON.parse(stored) as { quantity: number }[];
          setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
        } else {
          setCartCount(0);
        }
      } catch {
        setCartCount(0);
      }
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    window.addEventListener("cart-updated", updateCart);
    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("cart-updated", updateCart);
    };
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-black/5"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-9 h-9 rounded-2xl bg-[var(--brand-red)] flex items-center justify-center shadow-[0_4px_12px_rgba(255,107,107,0.4)]"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-black tracking-tight text-[var(--foreground)]">
              {BRAND.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={getLinkHref(link.href)}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-4 py-2 rounded-full text-sm font-700 transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-[var(--brand-red)] bg-[var(--brand-red)]/10"
                    : "text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-black/5"
                }`}
              >
                {navT[link.key] ?? link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-[var(--brand-red)]/10 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-600 text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-black/5 transition-all duration-200"
            >
              <Search className="w-4 h-4" />
            </Link>

            <Link href="/cart" className="relative p-2 rounded-full hover:bg-black/5 transition-all duration-200 group">
              <ShoppingCart className="w-5 h-5 text-[var(--foreground)]/70 group-hover:text-[var(--foreground)] transition-colors" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--brand-red)] text-white text-xs font-800 rounded-full flex items-center justify-center"
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-black/5 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-black/5"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`block px-4 py-3 rounded-2xl text-sm font-700 transition-all duration-200 ${
                      isActive(link.href)
                        ? "text-[var(--brand-red)] bg-[var(--brand-red)]/10"
                        : "text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-black/5"
                    }`}
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="pt-2 border-t border-black/5 mt-2"
              >
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-700 text-[var(--brand-red)] bg-[var(--brand-red)]/10"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {t("nav.cart")} {cartCount > 0 && `(${cartCount})`}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}