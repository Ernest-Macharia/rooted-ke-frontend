import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rooted Kenya | Curated Travel, Dining & Experiences",
  description: "Experience Kenya properly with curated travel, dining, and experiences across the country. Discover destinations, restaurants, events, and packages.",
  keywords: "Kenya travel, Kenyan restaurants, safari packages, Nairobi events, Diani beach, Maasai Mara",
  authors: [{ name: "Rooted Kenya" }],
  openGraph: {
    title: "Rooted Kenya - Experience Kenya Properly",
    description: "Curated travel, dining, and experiences across Kenya",
    url: "https://rootedkenya.com",
    siteName: "Rooted Kenya",
    images: [
      {
        url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Kenyan savannah at sunset",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rooted Kenya - Experience Kenya Properly",
    description: "Curated travel, dining, and experiences across Kenya",
    images: ["https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "your-google-verification-code", // Add your Google verification code
  // },
  alternates: {
    canonical: "https://rootedkenya.com",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
