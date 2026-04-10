"use client";

import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { C, NAV_LINKS } from "@/lib/constants";

interface NavbarProps {
  transparent?: boolean;
}

function tintAnchor(event: MouseEvent<HTMLAnchorElement>, color: string) {
  event.currentTarget.style.color = color;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const update = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : mediaQuery.matches;
      setIsDesktop(matches);
      if (matches) {
        setOpen(false);
      }
    };

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: transparent ? (scrolled ? C.green : "transparent") : C.green,
        transition: "background 0.4s ease",
        boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.2)" : "none",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: C.gold, color: C.green, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", padding: "8px 12px", border: `2px solid ${C.gold}` }}>
            ROOTED®
          </div>
        </div>

        {isDesktop ? (
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 500, letterSpacing: "0.05em", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(event) => tintAnchor(event, C.sand)}
                onMouseLeave={(event) => tintAnchor(event, "rgba(255,255,255,0.9)")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : (
          <div />
        )}

        {isDesktop ? (
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link
              href="/packages"
              style={{ background: C.teal, color: C.white, padding: "10px 22px", borderRadius: 50, fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", letterSpacing: "0.03em", transition: "all 0.3s" }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "#237872";
                event.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = C.teal;
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Plan Your Trip
            </Link>
            <Link
              href="/destinations"
              style={{ background: "transparent", color: C.white, padding: "10px 22px", borderRadius: 50, fontSize: 13, fontWeight: 500, border: "1.5px solid rgba(255,255,255,0.5)", cursor: "pointer", letterSpacing: "0.03em", transition: "all 0.3s" }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "rgba(255,255,255,0.1)";
                event.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "transparent";
                event.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              }}
            >
              Explore Kenya
            </Link>
          </div>
        ) : (
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: C.white, cursor: "pointer" }} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {!isDesktop && open ? (
        <div style={{ background: C.green, padding: "16px 32px 24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} style={{ display: "block", color: C.white, padding: "12px 0", fontSize: 16, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            <Link href="/packages" style={{ flex: 1, background: C.teal, color: C.white, padding: "12px", borderRadius: 50, fontSize: 13, border: "none", cursor: "pointer", textAlign: "center" }}>Plan Your Trip</Link>
            <Link href="/destinations" style={{ flex: 1, background: "transparent", color: C.white, padding: "12px", borderRadius: 50, fontSize: 13, border: "1.5px solid rgba(255,255,255,0.4)", cursor: "pointer", textAlign: "center" }}>Explore Kenya</Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
