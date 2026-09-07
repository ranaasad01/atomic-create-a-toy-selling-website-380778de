import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "ToyLand — Where Play Begins",
  description:
    "Discover thousands of toys for every age. From action figures to board games, educational toys to outdoor fun — ToyLand has it all.",
  keywords: ["toys", "kids toys", "educational toys", "board games", "action figures", "toy store"],
  openGraph: {
    title: "ToyLand — Where Play Begins",
    description: "Discover thousands of toys for every age.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-nunito antialiased">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}