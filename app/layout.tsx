import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";
import { canonicalSiteUrl } from "@/lib/seo";
import { Ga4PageTracker } from "@/app/_components/ga4-page-tracker";
import { AnalyticsEventBridge } from "@/app/_components/analytics-event-bridge";

const ga4MeasurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const googleSiteVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN;

export const metadata: Metadata = {
  metadataBase: new URL(canonicalSiteUrl),
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
    url: canonicalSiteUrl,
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {ga4MeasurementId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${ga4MeasurementId}', {
                  send_page_view: false
                });
              `}
            </Script>
            <Ga4PageTracker measurementId={ga4MeasurementId} />
            <AnalyticsEventBridge />
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
