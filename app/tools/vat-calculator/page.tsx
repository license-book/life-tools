import type { Metadata } from "next";
import VatCalculator from "@/components/tools/VatCalculator";
import ToolPageRenderer from "@/components/tools/ToolPageRenderer";
import { vatCalculatorTool } from "@/data/tools/vat-calculator";
import { createToolMetadata } from "@/lib/tools/engine";

export const metadata: Metadata = createToolMetadata(vatCalculatorTool);

export default function VatCalculatorPage() {
  return (
    <ToolPageRenderer
      tool={vatCalculatorTool}
      calculator={<VatCalculator />}
    />
  );
}
