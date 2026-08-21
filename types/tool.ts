export type ToolCategory = "MONEY" | "HOME" | "CAR" | "BUY" | "WORK" | "LIFE";

export type ToolDefinition = {
  id: string;
  slug: string;
  category: ToolCategory;
  name: string;
  shortDescription: string;
  heroDescription: string;
  badges: string[];
  relatedTools: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  rule?: {
    country: "KR";
    locale: "ko-KR";
    currency: "KRW";
    effectiveDate?: string;
    reviewRequired: boolean;
  };
};
