"use client";

import { MouseEvent } from "react";
import Link from "next/link";
import { C } from "@/lib/constants";

const QUICK_LINKS = ["About", "Contact", "Privacy Policy", "Terms of Service"];
const EXPLORE = ["Destinations", "Restaurants", "Events", "Packages", "Blog"];

function tintLink(event: MouseEvent<HTMLAnchorElement>, color: string) {
  event.currentTarget.style.color = color;
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M14.2 3c.32 1.8 1.41 3.21 3.16 4.08.88.44 1.73.65 2.64.68v3.1a8.63 8.63 0 0 1-3.12-.56v5.49c0 3.7-2.93 6.21-6.37 6.21A6.28 6.28 0 0 1 4.2 15.7c0-3.44 2.72-6.06 6.08-6.06.25 0 .5.02.74.06v3.14a3.1 3.1 0 0 0-.74-.09c-1.67 0-2.97 1.24-2.97 2.95 0 1.82 1.44 3.03 2.93 3.03 1.39 0 2.87-.97 2.87-3V3h3.09Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M18.9 3H21l-4.59 5.24L21.8 21h-4.23l-3.31-4.42L10.39 21H8.28l4.91-5.61L2.8 3h4.33l2.99 4.06L13.66 3h2.11l-4.59 5.25L18.9 3Zm-2.07 16h1.17L7.24 4.9H6l10.83 14.1Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12s0-3.1-.4-4.6a2.9 2.9 0 0 0-2-2C18.1 5 12 5 12 5s-6.1 0-7.6.4a2.9 2.9 0 0 0-2 2C2 8.9 2 12 2 12s0 3.1.4 4.6a2.9 2.9 0 0 0 2 2C5.9 19 12 19 12 19s6.1 0 7.6-.4a2.9 2.9 0 0 0 2-2C22 15.1 22 12 22 12Z" />
      <path d="m10 15 5-3-5-3v6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "TikTok", href: "#", Icon: TikTokIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "YouTube", href: "#", Icon: YouTubeIcon },
];

export default function Footer() {
  return (
    <footer style={{ background: C.green, color: C.white, padding: "60px 32px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ background: C.gold, color: C.green, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", padding: "8px 12px", display: "inline-block", marginBottom: 20 }}>ROOTED®</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 320, marginBottom: 24 }}>
              Curated travel, dining, and experiences across Kenya. Experience Kenya properly.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s", display: "flex", alignItems: "center" }}
                  onMouseEnter={(event) => tintLink(event, C.sand)}
                  onMouseLeave={(event) => tintLink(event, "rgba(255,255,255,0.5)")}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.sand, marginBottom: 20 }}>Quick Links</h4>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link}
                href={link === "About" ? "/about" : link === "Contact" ? "/contact" : "#"}
                style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 12, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(event) => tintLink(event, C.white)}
                onMouseLeave={(event) => tintLink(event, "rgba(255,255,255,0.6)")}
              >
                {link}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.sand, marginBottom: 20 }}>Explore</h4>
            {EXPLORE.map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 12, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(event) => tintLink(event, C.white)}
                onMouseLeave={(event) => tintLink(event, "rgba(255,255,255,0.6)")}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>© 2026 Rooted Kenya. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Built with Next.js & Django</p>
        </div>
      </div>
      <style>{`@media (max-width: 700px) { .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
    </footer>
  );
}
