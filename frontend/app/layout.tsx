import type { Metadata } from "next";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";
import StyledComponentsRegistry from "../lib/registry";
import { archivo, dmSans, montserrat } from './fonts';

export const metadata: Metadata = {
  metadataBase: new URL("https://ksushi.menu"),
  title: "K. Sushi | Cerritos, CA",
  description: "K. Sushi is a family-owned sushi restaurant in Cerritos, CA, serving fresh rolls, sushi, and Korean-inspired specialties. View our menu and order online.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "K. Sushi | Cerritos, CA",
    description: "Family-owned sushi restaurant in Cerritos, CA, serving fresh rolls, sushi, and Korean-inspired specialties.",
    url: "https://ksushi.menu",
    siteName: "K. Sushi",
    images: [{ url: "/android-chrome-512x512.png", width: 512, height: 512, alt: "K. Sushi logo" }],
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "https://ksushi.menu" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${dmSans.variable} ${montserrat.variable}`}>
      <body className="min-h-full flex flex-col">
        <GoogleTagManager gtmId="GTM-M7XCCXGB" />
        <GoogleAnalytics gaId="G-QRNLGYCKEF" />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}