"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import { Mail } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { C } from "@/lib/constants";
import { subscribe } from "@/lib/api";

type NewsletterCms = {
  newsletter_eyebrow?: string;
  newsletter_title?: string;
  newsletter_subtitle?: string;
  newsletter_description?: string;
  newsletter_disclaimer?: string;
  newsletter_button_label?: string;
  newsletter_success_message?: string;
};

export default function Newsletter({ cms }: { cms?: NewsletterCms }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const normalized = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalized)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      await subscribe(normalized);
      setSubmitted(true);
      setEmail("");
    } catch {
      setError("Could not subscribe right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{ background: C.sand, padding: "80px 32px", textAlign: "center" }}>
      <AnimatedSection>
        <p style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>{cms?.newsletter_eyebrow || "Stay in the Loop"}</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px, 5vw, 56px)", color: C.green, marginBottom: 12, lineHeight: 1.1 }}>{cms?.newsletter_title || "Get Rooted"}</h2>
        <p style={{ fontSize: 17, color: C.green, marginBottom: 8 }}>{cms?.newsletter_subtitle || "Subscribe for exclusive travel insights & insider deals"}</p>
        <p style={{ fontSize: 14, color: "rgba(15,61,51,0.6)", marginBottom: 40 }}>{cms?.newsletter_description || "Weekly Kenya travel ideas, hidden restaurant gems, event discoveries, and special subscriber offers"}</p>

        {submitted ? (
          <div style={{ background: C.green, color: C.white, padding: "18px 40px", borderRadius: 16, display: "inline-block", animation: "popIn 0.45s ease" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22 }}>{cms?.newsletter_success_message || "You're in! Welcome to Rooted Kenya ✦"}</p>
          </div>
        ) : (
          <div style={{ display: "flex", maxWidth: 520, margin: "0 auto", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: 1, minWidth: 260, position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                style={{ width: "100%", padding: "15px 18px 15px 44px", borderRadius: 50, border: "1.5px solid rgba(15,61,51,0.15)", fontSize: 14, outline: "none", background: C.white, color: C.green, transition: "border-color 0.2s" }}
                onFocus={(event) => {
                  event.currentTarget.style.borderColor = C.teal;
                }}
                onBlur={(event) => {
                  event.currentTarget.style.borderColor = "rgba(15,61,51,0.15)";
                }}
              />
            </div>
            <button
              onClick={() => {
                if (!isSubmitting) {
                  void handleSubmit();
                }
              }}
              style={{ background: C.green, color: C.white, padding: "15px 32px", borderRadius: 50, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.3s", whiteSpace: "nowrap" }}
              onMouseEnter={(event: MouseEvent<HTMLButtonElement>) => {
                event.currentTarget.style.background = C.teal;
                event.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(event: MouseEvent<HTMLButtonElement>) => {
                event.currentTarget.style.background = C.green;
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {isSubmitting ? "Saving..." : cms?.newsletter_button_label || "Subscribe"}
            </button>
          </div>
        )}
        {error ? (
          <p style={{ marginTop: 10, fontSize: 13, color: "#B84840" }}>{error}</p>
        ) : null}
        <p style={{ marginTop: 16, fontSize: 12, color: "rgba(15,61,51,0.5)" }}>{cms?.newsletter_disclaimer || "No spam. Just the good stuff."}</p>
      </AnimatedSection>
      <style>{`@keyframes popIn { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
    </section>
  );
}
