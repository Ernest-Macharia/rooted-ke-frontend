"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/ui/PageHero";
import { C } from "@/lib/constants";
import { getAppPage } from "@/lib/api";

type SitePagePayload = {
  slug: string;
  title: string;
  summary?: string;
  body?: string;
  section_1_heading?: string;
  section_1_body?: string;
  section_2_heading?: string;
  section_2_body?: string;
  section_3_heading?: string;
  section_3_body?: string;
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
        const response = await getAppPage(slug);
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
    const sectionTuples: Array<[string | undefined, string | undefined]> = [
      [page?.section_1_heading, page?.section_1_body],
      [page?.section_2_heading, page?.section_2_body],
      [page?.section_3_heading, page?.section_3_body],
    ];

    return sectionTuples
      .map(([heading, text]) => {
        if (!heading || !text) {
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
