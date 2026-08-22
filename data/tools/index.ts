import type { ToolDefinition } from "@/types/tool";
import { loanCalculatorTool } from "@/data/tools/loan-calculator";
import { vatCalculatorTool } from "@/data/tools/vat-calculator";
import {
  compoundInterestTool,
  depositInterestTool,
  discountTool,
  salaryNetTool,
  savingsInterestTool,
} from "@/data/tools/money-basics";

export const tools: ToolDefinition[] = [
  loanCalculatorTool,
  vatCalculatorTool,
  depositInterestTool,
  savingsInterestTool,
  compoundInterestTool,
  discountTool,
  salaryNetTool,
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolDefinition["category"]) {
  return tools.filter((tool) => tool.category === category);
}
