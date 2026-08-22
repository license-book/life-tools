import type { Metadata } from "next";
import LoanCalculator from "@/components/tools/LoanCalculator";
import ToolPageRenderer from "@/components/tools/ToolPageRenderer";
import { loanCalculatorTool } from "@/data/tools/loan-calculator";
import { createToolMetadata } from "@/lib/tools/engine";

export const metadata: Metadata = createToolMetadata(loanCalculatorTool);

export default function LoanCalculatorPage() {
  return (
    <ToolPageRenderer
      tool={loanCalculatorTool}
      calculator={<LoanCalculator />}
    />
  );
}
