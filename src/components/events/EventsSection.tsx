"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { C, EVENT_CATEGORIES } from "@/lib/constants";
import { fetchEventCategories, fetchEvents, type EventCategoryItem, type EventItem } from "@/services/eventsService";

type Category = { key: string; label: string };
type EventCard = { slug: string; title: string; short: string; category: string; img: string };

function normalizeCategory(item: EventCategoryItem): Category {
  return { key: item.key, label: item.label };
}

function normalizeEvent(item: EventItem): EventCard {
  return {
    slug: item.slug,
    title: item.title,
    short: item.short || item.venue || "Explore this event",
    category: item.category || "weekend",
    img: item.img || "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700&q=80",
  };
}

type EventsCms = {
  events_eyebrow?: string;
  events_title?: string;
  events_subtitle?: string;
};

export default function EventsSection({ cms }: { cms?: EventsCms }) {
  const [categories, setCategories] = useState<Category[]>(EVENT_CATEGORIES.map(normalizeCategory));
  const [activeTab, setActiveTab] = useState("weekend");
  const [events, setEvents] = useState<EventCard[]>([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [categoryData, eventData] = await Promise.all([
          fetchEventCategories(),
          fetchEvents({ upcoming: true }),
        ]);

        if (!mounted) return;

        if (categoryData.length > 0) {
          setCategories(categoryData.map(normalizeCategory));
          setActiveTab(categoryData[0].key);
        }
        if (eventData.length > 0) {
          setEvents(eventData.map(normalizeEvent));
        }
      } catch {
        // Keep UI stable without API.
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const visibleEvents = useMemo(() => {
    const scoped = events.filter((event) => event.category === activeTab);
    return (scoped.length > 0 ? scoped : events).slice(0, 3);
  }, [activeTab, events]);

  return (
    <section style={{ padding: "80px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <AnimatedSection style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>{cms?.events_eyebrow || "What's On"}</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 52px)", color: C.green, lineHeight: 1.1, marginBottom: 12 }}>{cms?.events_title || "Events in Kenya"}</h2>
        <p style={{ color: "#888", fontSize: 15 }}>{cms?.events_subtitle || "Concerts, festivals, nightlife, cultural pop-ups"}</p>
      </AnimatedSection>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
        {categories.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "10px 22px",
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              letterSpacing: "0.03em",
              transition: "all 0.25s",
              background: activeTab === tab.key ? C.teal : C.sandLight,
              color: activeTab === tab.key ? C.white : C.green,
              boxShadow: activeTab === tab.key ? "0 4px 16px rgba(31,111,107,0.35)" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="events-home-grid">
        {visibleEvents.length > 0 ? (
          visibleEvents.map((event, index) => (
            <AnimatedSection key={event.slug} delay={index * 0.08}>
              <Link href={`/events/${event.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div className="hover-zoom-frame" style={{ borderRadius: 16, overflow: "hidden", position: "relative", height: 220, cursor: "pointer" }}>
                  <img src={event.img} alt={event.title} className="hover-zoom-img" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,40,33,0.92) 0%, transparent 65%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px" }}>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: C.white, marginBottom: 4 }}>{event.title}</h4>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.72)" }}>{event.short}</p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))
        ) : (
          [1, 2, 3].map((item) => (
            <div key={item} style={{ background: C.sandLight, borderRadius: 16, padding: "28px", display: "flex", alignItems: "center", justifyContent: "center", height: 180 }}>
              <p style={{ color: C.teal, fontFamily: "'Cormorant Garamond', serif", fontSize: 20, opacity: 0.5 }}>Events loading...</p>
            </div>
          ))
        )}
      </div>
      <style>{`@media (max-width: 900px) { .events-home-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
