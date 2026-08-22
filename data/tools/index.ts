import type { ToolDefinition } from "@/types/tool";
import { loanCalculatorTool } from "@/data/tools/loan-calculator";

export const tools: ToolDefinition[] = [loanCalculatorTool];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolDefinition["category"]) {
  return tools.filter((tool) => tool.category === category);
}
