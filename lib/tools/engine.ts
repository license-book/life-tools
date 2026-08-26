import type { Metadata } from "next";
import type { ToolDefinition } from "@/types/tool";

const BASE_URL = "https://life-tools-one.vercel.app";

export function createToolMetadata(tool: ToolDefinition): Metadata {
  const path = `/tools/${tool.slug}`;
  return {
    title: tool.seo.title,
    description: tool.seo.description,
    keywords: tool.seo.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      type: "website",
      url: path,
      siteName: "생활도구",
      locale: "ko_KR",
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
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: tool.rule?.currency ?? "KRW",
    },
    description: tool.seo.description,
    url: `${BASE_URL}/tools/${tool.slug}`,
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
