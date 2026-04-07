"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import {
  BlogSection,
  DestinationsSection,
  EventsSection,
  Hero,
  Newsletter,
  PackagesSection,
  RestaurantsSection,
  TopCategories,
  TrendingSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <main style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        a { text-decoration: none; }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>
      <Navbar transparent />
      <Hero />
      <TopCategories />
      <TrendingSection />
      <DestinationsSection />
      <RestaurantsSection />
      <EventsSection />
      <PackagesSection />
      <BlogSection />
      <Newsletter />
      <Footer />
    </main>
  );
}
