import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPageRenderer from "@/components/tools/ToolPageRenderer";
import { AgeCalculator, AnniversaryCycleCalculator, DatePeriodCalculator, SleepTimeCalculator, TravelPackingChecklist } from "@/components/tools/LifeCalculators";
import { getToolBySlug, getToolsByCategory } from "@/data/tools";
import { createToolMetadata } from "@/lib/tools/engine";

const calculators = {
  "date-period": <DatePeriodCalculator />,
  "age-calculator": <AgeCalculator />,
  "sleep-time": <SleepTimeCalculator />,
  "travel-packing-checklist": <TravelPackingChecklist />,
  "anniversary-cycle": <AnniversaryCycleCalculator />,
} as const;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getToolsByCategory("LIFE").map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool || tool.category !== "LIFE") return {};
  return createToolMetadata(tool);
}

export default async function LifeToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool || tool.category !== "LIFE") notFound();
  const calculator = calculators[slug as keyof typeof calculators];
  if (!calculator) notFound();
  return <ToolPageRenderer tool={tool} calculator={calculator} />;
}
