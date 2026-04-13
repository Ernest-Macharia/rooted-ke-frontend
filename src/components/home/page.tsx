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
import { getHomepageData } from "@/lib/api";

type HomePageCms = {
  hero_eyebrow?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_description?: string;
  hero_background_image_src?: string;
  hero_background_image_url?: string;
  destinations_eyebrow?: string;
  destinations_title?: string;
  destinations_subtitle?: string;
  destinations_fallback_card_image_src?: string;
  destinations_fallback_card_image_url?: string;
  top_categories_eyebrow?: string;
  top_categories_title?: string;
  top_primary_items?: Array<{ title: string; subtitle?: string; img?: string }>;
  top_secondary_items?: Array<{ title: string; subtitle?: string; img?: string }>;
  trending_eyebrow?: string;
  trending_title?: string;
  trending_subtitle?: string;
  trending_items?: Array<{ title: string; subtitle?: string; img?: string }>;
  restaurants_eyebrow?: string;
  restaurants_title?: string;
  restaurants_subtitle?: string;
  events_eyebrow?: string;
  events_title?: string;
  events_subtitle?: string;
  packages_eyebrow?: string;
  packages_title?: string;
  packages_title_emphasis?: string;
  packages_subtitle?: string;
  blog_eyebrow?: string;
  blog_title?: string;
  blog_subtitle?: string;
  blog_cta_label?: string;
  newsletter_eyebrow?: string;
  newsletter_title?: string;
  newsletter_subtitle?: string;
  newsletter_description?: string;
  newsletter_disclaimer?: string;
  newsletter_button_label?: string;
  newsletter_success_message?: string;
};

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cms, setCms] = useState<HomePageCms>({});

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

  useEffect(() => {
    let mounted = true;

    const loadCms = async () => {
      try {
        const response = await getHomepageData();
        const data = response.data as { cms?: { homepage?: HomePageCms } };
        if (!mounted) return;
        setCms(data.cms?.homepage || {});
      } catch {
        if (!mounted) return;
        setCms({});
      }
    };

    void loadCms();

    return () => {
      mounted = false;
    };
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
      <Hero cms={cms} />
      <TopCategories cms={cms} />
      <TrendingSection cms={cms} />
      <DestinationsSection cms={cms} />
      <RestaurantsSection cms={cms} />
      <EventsSection cms={cms} />
      <PackagesSection cms={cms} />
      <BlogSection cms={cms} />
      <Newsletter cms={cms} />
      <Footer />
    </main>
  );
}
