"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BlogSection from "@/components/blog/BlogSection";
import DestinationsSection from "@/components/destinations/DestinationsSection";
import EventsSection from "@/components/events/EventsSection";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import PackagesSection from "@/components/packages/PackagesSection";
import RestaurantsSection from "@/components/restaurants/RestaurantsSection";
import TopCategories from "@/components/home/TopCategories";
import TrendingSection from "@/components/home/TrendingSection";

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
      setScrollProgress(progress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <main style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        a { text-decoration: none; }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 1000,
          background: "rgba(31,111,107,0.16)",
          transformOrigin: "left center",
          transform: `scaleX(${scrollProgress})`,
          transition: "transform 0.08s linear",
        }}
      />
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
