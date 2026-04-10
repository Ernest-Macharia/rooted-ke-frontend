import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { C } from "@/lib/constants";
import { EVENT_DATA } from "@/lib/data";

export default function EventDetailPage({ slug }: { slug: string }) {
  const event = EVENT_DATA[slug as keyof typeof EVENT_DATA];

  if (!event) {
    return null;
  }

  return (
    <main style={{ fontFamily: "'Inter',system-ui,sans-serif", background: "#fcfaf6", color: C.green }}>
      <Navbar />

      <section className="event-detail-hero" style={{ position: "relative", height: 320, marginTop: 72, overflow: "hidden" }}>
        <img src={event.img} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,35,28,0.2), rgba(10,35,28,0.86))" }} />
        <div className="event-detail-hero-copy" style={{ position: "absolute", insetInline: 0, bottom: 0, padding: "24px 36px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Link href="/events" style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>← Back to Events</Link>
            <h1 style={{ marginTop: 10, fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,5vw,56px)", color: C.white }}>{event.title}</h1>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 14 }}>{event.date} · {event.time} · {event.venue}</p>
          </div>
        </div>
      </section>

      <section className="event-detail-shell" style={{ maxWidth: 1100, margin: "0 auto", padding: "44px 32px 70px" }}>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5f5a52", marginBottom: 24 }}>{event.description}</p>

        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.sandLight}`, padding: 18, marginBottom: 18 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, marginBottom: 10 }}>Lineup</h2>
          {event.lineup.map((item: string) => (
            <p key={item} style={{ fontSize: 14, color: "#59544d", marginBottom: 8 }}>• {item}</p>
          ))}
        </div>

        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.sandLight}`, padding: 18 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, marginBottom: 10 }}>Insider Tips</h2>
          {event.tips.map((tip: string) => (
            <p key={tip} style={{ fontSize: 14, color: "#59544d", marginBottom: 8 }}>• {tip}</p>
          ))}
          <a href={event.ticketLink} target="_blank" rel="noreferrer noopener" style={{ marginTop: 14, display: "inline-block", background: C.teal, color: C.white, padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
            Get Tickets
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 700px) {
          .event-detail-hero { height: 290px !important; }
          .event-detail-hero-copy { padding: 20px !important; }
          .event-detail-shell { padding: 34px 20px 56px !important; }
        }
      `}</style>
      <Footer />
    </main>
  );
}
