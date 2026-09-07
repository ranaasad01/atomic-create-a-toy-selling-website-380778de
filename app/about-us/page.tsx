"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Heart, Star, Shield, Truck, Award, Users, Smile, Leaf } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/data";
import { staggerContainer, fadeInUp, slideInLeft, slideInRight } from "@/lib/motion";

const TEAM = [
  {
    id: "1",
    name: "Maria Chen",
    role: "Founder & CEO",
    bio: "Former child psychologist turned toy entrepreneur. Maria started ToyVille after noticing a gap in safe, imaginative toys for modern kids.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria%20Chen",
  },
  {
    id: "2",
    name: "James Okafor",
    role: "Head of Product",
    bio: "With 15 years in toy design, James ensures every product sparks curiosity and meets the highest safety standards.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James%20Okafor",
  },
  {
    id: "3",
    name: "Sofia Reyes",
    role: "Chief Play Officer",
    bio: "Sofia leads our in-house play lab, testing every toy with real kids to guarantee hours of genuine fun and learning.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia%20Reyes",
  },
  {
    id: "4",
    name: "Liam Park",
    role: "Head of Safety",
    bio: "A certified product safety engineer, Liam oversees rigorous testing so parents can shop with complete confidence.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam%20Park",
  },
];

const STATS = [
  { value: "50,000+", label: "Happy Families" },
  { value: "1,200+", label: "Curated Toys" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "12", label: "Years of Play" },
];

const VALUES = [
  {
    id: "safety",
    icon: Shield,
    title: "Safety First",
    description: "Every toy passes rigorous safety testing before it reaches your child's hands. We hold ourselves to standards beyond what regulations require.",
  },
  {
    id: "imagination",
    icon: Star,
    title: "Spark Imagination",
    description: "We believe the best toys open doors to new worlds. Our curation focuses on products that inspire creativity and open-ended play.",
  },
  {
    id: "sustainability",
    icon: Leaf,
    title: "Planet Friendly",
    description: "From recycled packaging to sustainably sourced materials, we're committed to leaving a healthier planet for the children we serve.",
  },
  {
    id: "community",
    icon: Users,
    title: "Community Rooted",
    description: "We partner with schools, pediatricians, and parent groups to understand what children truly need at every stage of development.",
  },
  {
    id: "joy",
    icon: Smile,
    title: "Pure Joy",
    description: "Play is serious business. We measure success not in sales figures but in the laughter and wonder we bring to living rooms everywhere.",
  },
  {
    id: "trust",
    icon: Heart,
    title: "Parent Trusted",
    description: "Thousands of parents recommend ToyVille to friends and family. That word-of-mouth trust is the metric we care about most.",
  },
];

const MILESTONES = [
  { year: "2012", event: "ToyVille founded in a small garage in Fun City with just 40 handpicked toys." },
  { year: "2015", event: "Launched our in-house Play Lab, testing every product with real children before listing." },
  { year: "2018", event: "Reached 10,000 happy families and introduced our sustainability pledge." },
  { year: "2020", event: "Expanded online to serve families across North America with free shipping." },
  { year: "2022", event: "Crossed 1,000 curated products and launched our educational toy line." },
  { year: "2024", event: "Celebrating 50,000+ families and a 98% satisfaction rate — and still growing." },
];

export default function AboutUsPage() {
  const t = useTranslations();

  return (
    <main className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">

      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-[var(--accent)]/10 py-24 md:py-32">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--accent)]/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-[var(--accent)]/15 blur-2xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-block rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-black mb-6"
            >
              {t("about.eyebrow")}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight text-balance md:text-6xl lg:text-7xl"
            >
              {t("about.hero.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-[hsl(var(--muted-foreground))] text-pretty"
            >
              {t("about.hero.subtitle")}
            </motion.p>
          </div>
        </section>
      </Reveal>

      {/* Stats */}
      <Reveal>
        <section className="py-16 border-y border-[hsl(var(--border))]">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 gap-8 md:grid-cols-4"
            >
              {STATS.map((stat, i) => (
                <motion.div key={i} variants={fadeInUp} className="text-center">
                  <p className="text-4xl font-extrabold text-[var(--accent)] tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-[hsl(var(--muted-foreground))]">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Story — split layout */}
      <Reveal>
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("about.story.eyebrow")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl text-balance">
                {t("about.story.title")}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
                {t("about.story.p1")}
              </p>
              <p className="mt-4 text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
                {t("about.story.p2")}
              </p>
            </motion.div>
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-3xl bg-[var(--accent)]/10 -z-10" />
              <img
                src="/images/about-toyville-story-kids-playing.jpg"
                alt="Children playing with ToyVille toys"
                className="w-full rounded-2xl object-cover aspect-[4/3] shadow-[0_4px_32px_-8px_rgba(0,0,0,0.15)] border border-[hsl(var(--border))]"
              />
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Values */}
      <Reveal>
        <section className="bg-[hsl(var(--card))] py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("about.values.eyebrow")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl text-balance">
                {t("about.values.title")}
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-[hsl(var(--muted-foreground))] leading-relaxed text-pretty">
                {t("about.values.subtitle")}
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {VALUES.map((val) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={val.id}
                    variants={fadeInUp}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.14)]"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/15">
                      <Icon className="h-5 w-5 text-[var(--accent)]" strokeWidth={2} />
                    </div>
                    <h3 className="text-base font-bold">{val.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{val.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Timeline */}
      <Reveal>
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("about.timeline.eyebrow")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl text-balance">
                {t("about.timeline.title")}
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-[hsl(var(--border))] md:left-1/2" />
              <div className="space-y-10">
                {MILESTONES.map((m, i) => (
                  <Reveal key={m.year} delay={i * 0.07}>
                    <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      <div className="flex-shrink-0 pl-0 md:w-1/2 md:pr-10 md:pl-0 pl-14">
                        <div className={`rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] ${i % 2 === 0 ? "md:text-right" : "md:text-left md:pl-10 md:pr-0"}`}>
                          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">{m.year}</span>
                          <p className="mt-1 text-sm leading-relaxed text-[hsl(var(--foreground))]">{m.event}</p>
                        </div>
                      </div>
                      <div className="absolute left-4 top-4 h-4 w-4 rounded-full border-2 border-[var(--accent)] bg-[hsl(var(--background))] md:left-1/2 md:-translate-x-1/2 z-10" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Team */}
      <Reveal>
        <section className="bg-[hsl(var(--card))] py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {t("about.team.eyebrow")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl text-balance">
                {t("about.team.title")}
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-[hsl(var(--muted-foreground))] leading-relaxed text-pretty">
                {t("about.team.subtitle")}
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {TEAM.map((member) => (
                <motion.div
                  key={member.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-base">{member.name}</h3>
                    <p className="text-xs font-semibold text-[var(--accent)] mt-0.5">{member.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Certifications / Trust bar */}
      <Reveal>
        <section className="py-16 border-t border-[hsl(var(--border))]">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-10">
              {t("about.trust.label")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: Shield, label: "ASTM Certified" },
                { icon: Award, label: "CPSC Compliant" },
                { icon: Leaf, label: "Eco Packaging" },
                { icon: Truck, label: "Carbon Neutral Shipping" },
                { icon: Star, label: "Parent Choice Award" },
              ].map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.label} className="flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 py-2.5 text-sm font-medium text-[hsl(var(--foreground))]">
                    <Icon className="h-4 w-4 text-[var(--accent)]" strokeWidth={2} />
                    {badge.label}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-balance">
              {t("about.cta.title")}
            </h2>
            <p className="mt-4 text-[hsl(var(--muted-foreground))] leading-relaxed text-pretty">
              {t("about.cta.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="/shop"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-bold text-black shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                {t("about.cta.shop")}
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-8 py-3.5 text-sm font-bold text-[hsl(var(--foreground))] transition-all duration-300 hover:bg-[hsl(var(--border))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--border))] focus-visible:ring-offset-2"
              >
                {t("about.cta.contact")}
              </motion.a>
            </div>
          </div>
        </section>
      </Reveal>

    </main>
  );
}