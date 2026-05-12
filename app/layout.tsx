import type { Metadata } from "next";

import "./globals.css";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HDZ Hardscaping & Landscaping LLC",
    template: "%s | HDZ Hardscaping & Landscaping",
  },
  description: "Hardscaping, landscaping, and concrete work for South Jersey homeowners.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HDZ Hardscaping & Landscaping LLC",
    title: "HDZ Hardscaping & Landscaping LLC",
    description: "Hardscaping, landscaping, and concrete work for South Jersey homeowners.",
    url: siteUrl,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
