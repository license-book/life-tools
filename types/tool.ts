export type ToolCategory = "MONEY" | "HOME" | "CAR" | "BUY" | "WORK" | "LIFE";

export type ToolInfoCard = {
  label?: string;
  title: string;
  description: string;
};

export type ToolContentSection = {
  title: string;
  description?: string;
  cards?: ToolInfoCard[];
  paragraphs?: string[];
  notice?: string;
};

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolFreeResource = {
  type: string;
  title: string;
  description: string;
};

export type ToolDefinition = {
  id: string;
  slug: string;
  category: ToolCategory;
  name: string;
  shortDescription: string;
  heroDescription: string;
  badges: string[];
  relatedTools: string[];
  calculatorTitle: string;
  calculatorDescription: string;
  sections: ToolContentSection[];
  freeResources?: ToolFreeResource[];
  faq: ToolFaq[];
  disclaimer: string;
  applicationCategory?: string;
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
