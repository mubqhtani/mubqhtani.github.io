import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Mubarak Al-Qahtani is a 16-year-old student in Riyadh studying software engineering and data science and practicing web application security. Two hackathon first places.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: profile.shortName,
  description,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: ["Mubarak Al-Qahtani", "portfolio", "web security", "bug hunting", "CTF", "Python", "machine learning", "Riyadh"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.shortName,
    title: profile.shortName,
    description,
    locale: "en_US",
    firstName: "Mubarak",
    lastName: "Al-Qahtani",
  },
  twitter: { card: "summary_large_image", title: profile.shortName, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5F7FB",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${bricolage.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
