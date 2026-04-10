"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import { C } from "@/lib/constants";
import { getSitePage } from "@/lib/api";

type SitePagePayload = {
  slug: string;
  title: string;
  summary?: string;
  body?: string;
  content?: Record<string, unknown>;
};

interface SitePageTemplateProps {
  slug: string;
  fallbackTitle: string;
  fallbackSummary: string;
}

function SectionBlock({
  heading,
  text,
}: {
  heading: string;
  text: string;
}) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          lineHeight: 1.08,
          color: C.green,
          marginBottom: 10,
        }}
      >
        {heading}
      </h2>
      <p style={{ fontSize: 15, color: "#5f5a52", lineHeight: 1.85, whiteSpace: "pre-line" }}>
        {text}
      </p>
    </section>
  );
}

export default function SitePageTemplate({
  slug,
  fallbackTitle,
  fallbackSummary,
}: SitePageTemplateProps) {
  const [page, setPage] = useState<SitePagePayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadPage = async () => {
      try {
        const response = await getSitePage(slug);
        if (!active) {
          return;
        }
        setPage(response.data as SitePagePayload);
      } catch {
        if (!active) {
          return;
        }
        setPage(null);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPage();
    return () => {
      active = false;
    };
  }, [slug]);

  const sections = useMemo(() => {
    const content = page?.content;
    if (!content || typeof content !== "object") {
      return [];
    }

    const sectionsValue = (content as { sections?: unknown }).sections;
    if (!Array.isArray(sectionsValue)) {
      return [];
    }

    return sectionsValue
      .map((section) => {
        if (!section || typeof section !== "object") {
          return null;
        }
        const heading = (section as { heading?: unknown }).heading;
        const text = (section as { text?: unknown }).text;
        if (typeof heading !== "string" || typeof text !== "string") {
          return null;
        }
        return { heading, text };
      })
      .filter((item): item is { heading: string; text: string } => Boolean(item));
  }, [page]);

  const pageTitle = page?.title || fallbackTitle;
  const pageSummary = page?.summary || fallbackSummary;

  return (
    <main style={{ fontFamily: "'Inter',system-ui,sans-serif", overflowX: "hidden", background: "#fcfaf6", color: C.green }}>
      <Navbar />
      <PageHero
        label="Rooted Kenya"
        title={pageTitle}
        subtitle={pageSummary}
      />

      <section
        className="site-page-shell"
        style={{ maxWidth: 980, margin: "0 auto", padding: "56px 32px 86px" }}
      >
        {loading ? (
          <p style={{ fontSize: 15, color: "#7f796f" }}>Loading page content...</p>
        ) : null}

        {!loading && page?.body ? (
          <p style={{ fontSize: 15, color: "#5f5a52", lineHeight: 1.9, whiteSpace: "pre-line", marginBottom: sections.length ? 34 : 0 }}>
            {page.body}
          </p>
        ) : null}

        {!loading && !page ? (
          <p style={{ fontSize: 15, color: "#5f5a52", lineHeight: 1.9 }}>
            This page content is not published yet in admin.
          </p>
        ) : null}

        {!loading && sections.length > 0
          ? sections.map((section) => (
              <SectionBlock key={section.heading} heading={section.heading} text={section.text} />
            ))
          : null}
      </section>

      <Footer />
      <style>{`@media (max-width: 700px) { .site-page-shell { padding: 40px 20px 62px !important; } }`}</style>
    </main>
  );
}
