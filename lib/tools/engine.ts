import type { Metadata } from "next";
import type { ToolDefinition } from "@/types/tool";

export function createToolMetadata(tool: ToolDefinition): Metadata {
  return {
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      type: "website",
      url: `/tools/${tool.slug}`,
    },
  };
}

export function createToolJsonLd(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    applicationCategory: tool.applicationCategory ?? "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: tool.rule?.currency ?? "KRW",
    },
    description: tool.seo.description,
    url: `/tools/${tool.slug}`,
  };
}

export function createFaqJsonLd(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
