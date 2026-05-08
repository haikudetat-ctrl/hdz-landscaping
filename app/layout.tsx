import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "HDZ Hardscaping & Landscaping LLC",
  description: "Hardscaping, landscaping, and concrete work for South Jersey homeowners.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
