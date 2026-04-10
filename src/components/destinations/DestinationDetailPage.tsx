"use client";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  CalendarDays,
  ChevronRight,
  Compass,
  ExternalLink,
  LayoutGrid,
  MapPin,
  Search,
  UtensilsCrossed,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { C, DESTINATION_DETAIL, DESTINATIONS } from "@/lib/constants";

type DestinationSlug = keyof typeof DESTINATION_DETAIL;
type DestinationDetail = (typeof DESTINATION_DETAIL)[DestinationSlug];

type TabKey = "overview" | "stay" | "eat" | "do";

const TABS: Array<{ key: TabKey; label: string; Icon: typeof LayoutGrid }> = [
  { key: "overview", label: "Overview", Icon: LayoutGrid },
  { key: "stay", label: "Where to Stay", Icon: BedDouble },
  { key: "eat", label: "Where to Eat", Icon: UtensilsCrossed },
  { key: "do", label: "Things to Do", Icon: Compass },
];

function formatInputDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNightCount(checkin: string, checkout: string) {
  const start = new Date(`${checkin}T00:00:00`);
  const end = new Date(`${checkout}T00:00:00`);
  const diff = end.getTime() - start.getTime();
  return diff > 0 ? Math.round(diff / 86400000) : 0;
}

function BudgetBadge({ tier }: { tier: "Budget" | "Mid" | "Premium" }) {
  const colors = {
    Budget: { bg: "#E8F5E9", color: "#2E7D32" },
    Mid: { bg: "#FFF8E1", color: "#F57F17" },
    Premium: { bg: "#FCE4EC", color: "#C62828" },
  };
  const scheme = colors[tier];

  return (
    <span
      style={{
        background: scheme.bg,
        color: scheme.color,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.02em",
      }}
    >
      {tier}
    </span>
  );
}

function ComingSoon({
  message,
  linkLabel,
  linkHref,
}: {
  message: string;
  linkLabel: string;
  linkHref: string;
}) {
  return (
    <div
      style={{
        background: C.sandLight,
        borderRadius: 18,
        padding: "32px",
        textAlign: "center",
        border: `1px solid ${C.sandDark}55`,
      }}
    >
      <p style={{ fontSize: 14, color: "#7B766D", marginBottom: 12, lineHeight: 1.7 }}>{message}</p>
      <Link href={linkHref} style={{ color: C.teal, fontSize: 14, fontWeight: 700 }}>
        {linkLabel}
      </Link>
    </div>
  );
}

function HotelSearchWidget({ destName }: { destName: string }) {
  const today = useMemo(() => formatInputDate(new Date()), []);
  const tomorrow = useMemo(() => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    return formatInputDate(nextDay);
  }, []);

  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(tomorrow);
  const [guests, setGuests] = useState(2);

  const nights = getNightCount(checkin, checkout);

  const bookingUrl = useMemo(() => {
    const params = new URLSearchParams({
      ss: destName,
      checkin,
      checkout,
      group_adults: String(guests),
      no_rooms: "1",
      aid: "1",
    });
    return `https://www.booking.com/search.html?${params.toString()}`;
  }, [checkin, checkout, destName, guests]);

  return (
    <aside
      style={{
        background: C.white,
        borderRadius: 18,
        padding: "28px",
        boxShadow: "0 10px 32px rgba(15,61,51,0.09)",
        border: `1px solid ${C.sandDark}45`,
        position: "sticky",
        top: 96,
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: 28,
          lineHeight: 1,
          color: C.green,
          marginBottom: 20,
        }}
      >
        Find Hotels in {destName}
      </h3>

      <div style={{ display: "grid", gap: 14 }}>
        <DateInput
          label="Check-in"
          min={today}
          value={checkin}
          onChange={(value) => {
            setCheckin(value);
            if (value >= checkout) {
              const nextCheckout = new Date(`${value}T00:00:00`);
              nextCheckout.setDate(nextCheckout.getDate() + 1);
              setCheckout(formatInputDate(nextCheckout));
            }
          }}
        />
        <DateInput
          label="Check-out"
          min={checkin}
          value={checkout}
          onChange={(value) => setCheckout(value)}
        />

        <div>
          <label
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 700,
              color: "#7B766D",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              marginBottom: 8,
            }}
          >
            Guests
          </label>
          <div style={{ display: "flex", alignItems: "center", border: `1.5px solid ${C.sandDark}`, borderRadius: 12, overflow: "hidden" }}>
            <GuestButton label="Decrease guests" onClick={() => setGuests((current) => Math.max(1, current - 1))}>
              -
            </GuestButton>
            <div style={{ flex: 1, textAlign: "center", color: C.green, fontWeight: 700, fontSize: 15 }}>
              {guests} {guests === 1 ? "Guest" : "Guests"}
            </div>
            <GuestButton label="Increase guests" onClick={() => setGuests((current) => Math.min(10, current + 1))}>
              +
            </GuestButton>
          </div>
        </div>

        <a
          href={bookingUrl}
          target="_blank"
          rel="noreferrer noopener"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: C.teal,
            color: C.white,
            padding: "15px 18px",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.03em",
            boxShadow: "0 8px 24px rgba(31,111,107,0.28)",
          }}
        >
          <Search size={16} />
          Search &amp; Book Now
          <ExternalLink size={14} style={{ opacity: 0.75 }} />
        </a>
      </div>

      {nights > 0 ? (
        <p style={{ marginTop: 12, textAlign: "center", fontSize: 12, color: "#8E8A81" }}>
          {nights} night{nights === 1 ? "" : "s"} selected
        </p>
      ) : null}

      <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${C.sandLight}` }}>
        <p style={{ fontSize: 11, color: "#B2ACA3", lineHeight: 1.7, textAlign: "center" }}>
          Powered by Booking.com. We may earn a commission at no extra cost to you.
        </p>
      </div>
    </aside>
  );
}

function DateInput({
  label,
  min,
  onChange,
  value,
}: {
  label: string;
  min: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 700,
          color: "#7B766D",
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <CalendarDays
          size={16}
          style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.teal, pointerEvents: "none" }}
        />
        <input
          type="date"
          min={min}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={{
            width: "100%",
            height: 48,
            borderRadius: 12,
            border: `1.5px solid ${C.sandDark}`,
            padding: "0 14px 0 40px",
            fontSize: 14,
            color: C.green,
            background: C.white,
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}

function GuestButton({
  children,
  label,
  onClick,
}: {
  children: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{
        width: 46,
        height: 46,
        border: "none",
        background: C.sandLight,
        color: C.green,
        fontSize: 24,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function OverviewTab({ dest }: { dest: DestinationDetail }) {
  return (
    <section>
      <h2 style={tabHeadingStyle}>About {dest.name}</h2>
      <p style={introStyle}>{dest.overview}</p>

      <div className="destination-overview-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 360px)", gap: 28, alignItems: "start" }}>
        <div>
          <h3 style={subheadingStyle}>Highlights</h3>
          <div style={{ display: "grid", gap: 12 }}>
            {dest.highlights.map((highlight) => (
              <div key={highlight} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: 999, background: C.teal, flexShrink: 0 }} />
                <span style={{ color: "#44423E", fontSize: 15, lineHeight: 1.7 }}>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: C.sandLight, borderRadius: 18, padding: "28px", border: `1px solid ${C.sandDark}40` }}>
          <h3 style={subheadingStyle}>Plan Your Visit</h3>
          <p style={{ fontSize: 14, color: "#67625A", lineHeight: 1.8, marginBottom: 20 }}>
            Discover the best of {dest.name} with our curated guides, recommended stays, dining options, and signature experiences.
          </p>
          <Link
            href={dest.packageLink}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: C.teal,
              color: C.white,
              padding: "12px 22px",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            View Packages
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhereToStayTab({ dest }: { dest: DestinationDetail }) {
  return (
    <section>
      <h2 style={tabHeadingStyle}>Where to Stay in {dest.name}</h2>
      <p style={introStyle}>
        From luxury lodges to budget-friendly options, find the right accommodation for your style of trip.
      </p>
      <ComingSoon
        message="Detailed stay recommendations and curated accommodation collections are coming soon."
        linkLabel="View available packages →"
        linkHref={dest.packageLink}
      />
    </section>
  );
}

function WhereToEatTab({ dest }: { dest: DestinationDetail }) {
  return (
    <section>
      <h2 style={tabHeadingStyle}>Where to Eat in {dest.name}</h2>
      <p style={introStyle}>
        Discover standout dining options, from local favorites to polished destination restaurants.
      </p>

      <div style={{ display: "grid", gap: 16, marginBottom: 28 }}>
        {dest.restaurants.map((restaurant) => (
          <article
            key={restaurant.name}
            className="restaurant-row"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              background: C.white,
              borderRadius: 18,
              padding: "16px",
              border: `1px solid ${C.sandLight}`,
              boxShadow: "0 4px 18px rgba(15,61,51,0.06)",
            }}
          >
            <img
              src={restaurant.img}
              alt={restaurant.name}
              style={{ width: 88, height: 88, objectFit: "cover", borderRadius: 12, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 28, color: C.green, lineHeight: 1 }}>{restaurant.name}</h3>
                <BudgetBadge tier={restaurant.budget} />
              </div>
              <p style={{ fontSize: 14, color: "#807B74" }}>
                {restaurant.area} · {restaurant.cuisine}
              </p>
            </div>
            <ChevronRight size={18} color={C.teal} />
          </article>
        ))}
      </div>

      <ComingSoon
        message="Restaurant guides and more neighborhood picks are coming soon."
        linkLabel="Explore all restaurants →"
        linkHref="/restaurants"
      />
    </section>
  );
}

function ThingsToDoTab({ dest }: { dest: DestinationDetail }) {
  return (
    <section>
      <h2 style={tabHeadingStyle}>Things to Do in {dest.name}</h2>
      <p style={introStyle}>
        Explore the activities, attractions, and signature moments that make {dest.name} memorable.
      </p>

      <div style={{ display: "grid", gap: 10, marginBottom: 28 }}>
        {dest.things.map((thing) => (
          <div
            key={thing}
            className="activity-row"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "15px 18px",
              borderRadius: 14,
              background: C.white,
              border: `1px solid ${C.sandLight}`,
              boxShadow: "0 2px 10px rgba(15,61,51,0.05)",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 999, background: C.teal, flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 15, color: "#45423C" }}>{thing}</span>
            <ChevronRight size={16} color="#C1BBB1" />
          </div>
        ))}
      </div>

      <ComingSoon
        message="Curated activity guides and bookable experiences are coming soon."
        linkLabel="View curated experiences →"
        linkHref={dest.packageLink}
      />
    </section>
  );
}

const tabHeadingStyle: CSSProperties = {
  fontFamily: "var(--font-cormorant), serif",
  fontSize: "clamp(32px, 4vw, 44px)",
  lineHeight: 1.05,
  color: C.green,
  marginBottom: 12,
};

const subheadingStyle: CSSProperties = {
  fontFamily: "var(--font-cormorant), serif",
  fontSize: 28,
  lineHeight: 1.05,
  color: C.green,
  marginBottom: 14,
};

const introStyle: CSSProperties = {
  maxWidth: 720,
  fontSize: 15,
  color: "#67625A",
  lineHeight: 1.85,
  marginBottom: 30,
};

export default function DestinationDetailPage({ slug }: { slug: DestinationSlug }) {
  const destination = DESTINATION_DETAIL[slug];
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const tabBarRef = useRef<HTMLDivElement | null>(null);
  const [tabBarStuck, setTabBarStuck] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!tabBarRef.current) {
        return;
      }
      setTabBarStuck(window.scrollY > tabBarRef.current.offsetTop - 72);
    };

    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const relatedDestinations = DESTINATIONS.filter((item) => item.slug !== slug).slice(0, 4);

  return (
    <main style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", overflowX: "hidden", background: "#FCFAF6", color: C.green }}>
      <style>{`
        .destination-layout { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 40px; }
        .tab-scroll { display: flex; gap: 0; }
        .related-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
        .activity-row, .related-card img, .tab-trigger { transition: all 0.25s ease; }
        .activity-row:hover { transform: translateX(4px); border-color: rgba(31, 111, 107, 0.35); }
        .related-card:hover img { transform: scale(1.06); }
        @media (max-width: 1024px) {
          .destination-layout { grid-template-columns: 1fr; }
          .hotel-sidebar { display: none; }
          .hotel-mobile { display: block !important; }
        }
        @media (max-width: 900px) {
          .related-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 720px) {
          .destination-shell, .tab-shell, .related-shell { padding-left: 20px !important; padding-right: 20px !important; }
          .hero-copy { padding: 24px 20px !important; }
          .destination-overview-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .tab-scroll { overflow-x: auto; scrollbar-width: none; }
          .restaurant-row { flex-direction: column; align-items: flex-start !important; }
          .related-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <Navbar />

      <section style={{ position: "relative", height: 340, marginTop: 72, overflow: "hidden" }}>
        <img src={destination.heroImg} alt={destination.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,35,28,0.12) 0%, rgba(10,35,28,0.8) 100%)" }} />
        <div className="hero-copy" style={{ position: "absolute", insetInline: 0, bottom: 0, padding: "28px 48px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.sand, fontSize: 13, marginBottom: 10 }}>
              <MapPin size={13} color={C.teal} />
              {destination.name}
            </div>
            <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(42px, 6vw, 68px)", lineHeight: 0.95, fontWeight: 700, color: C.white, marginBottom: 10, textShadow: "0 4px 24px rgba(0,0,0,0.26)" }}>
              {destination.name}
            </h1>
            <p style={{ maxWidth: 620, color: "rgba(255,255,255,0.84)", fontSize: 15, lineHeight: 1.7 }}>{destination.short}</p>
          </div>
        </div>
      </section>

      <div
        ref={tabBarRef}
        style={{
          position: "sticky",
          top: 72,
          zIndex: 70,
          background: C.white,
          borderBottom: `1px solid ${C.sandLight}`,
          boxShadow: tabBarStuck ? "0 6px 18px rgba(15,61,51,0.08)" : "none",
        }}
      >
        <div className="tab-shell" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
          <div className="tab-scroll">
            {TABS.map(({ key, label, Icon }) => {
              const active = activeTab === key;

              return (
                <button
                  key={key}
                  type="button"
                  className="tab-trigger"
                  onClick={() => setActiveTab(key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "18px 22px",
                    background: "transparent",
                    border: "none",
                    borderBottom: active ? `2.5px solid ${C.teal}` : "2.5px solid transparent",
                    color: active ? C.teal : "#67625A",
                    fontSize: 14,
                    fontWeight: active ? 700 : 500,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  <Icon size={16} strokeWidth={active ? 2.1 : 1.7} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="destination-shell" style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 48px 84px" }}>
        <div className="destination-layout">
          <div>
            <Link href="/destinations" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#8C867E", fontSize: 13, marginBottom: 28 }}>
              <ArrowLeft size={14} />
              All Destinations
            </Link>

            {activeTab === "overview" ? <OverviewTab dest={destination} /> : null}
            {activeTab === "stay" ? <WhereToStayTab dest={destination} /> : null}
            {activeTab === "eat" ? <WhereToEatTab dest={destination} /> : null}
            {activeTab === "do" ? <ThingsToDoTab dest={destination} /> : null}

            <div className="hotel-mobile" style={{ display: "none", marginTop: 40 }}>
              <HotelSearchWidget destName={destination.hotelSearch || destination.name} />
            </div>
          </div>

          <div className="hotel-sidebar">
            <HotelSearchWidget destName={destination.hotelSearch || destination.name} />
          </div>
        </div>
      </section>

      <section style={{ background: C.sandLight, padding: "64px 0" }}>
        <div className="related-shell" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(32px, 4vw, 46px)", lineHeight: 1, color: C.green, marginBottom: 30 }}>
            Other Destinations to Explore
          </h2>

          <div className="related-grid">
            {relatedDestinations.map((item) => (
              <Link
                key={item.slug}
                href={`/destinations/${item.slug}`}
                className="related-card"
                style={{ position: "relative", display: "block", height: 190, borderRadius: 18, overflow: "hidden" }}
              >
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,40,33,0.9) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", insetInline: 0, bottom: 0, padding: "16px" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: C.teal, color: C.white, borderRadius: 999, padding: "5px 10px", fontSize: 10, fontWeight: 800, marginBottom: 6 }}>
                    <MapPin size={10} />
                    {item.name}
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.78)", lineHeight: 1.55 }}>{item.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
