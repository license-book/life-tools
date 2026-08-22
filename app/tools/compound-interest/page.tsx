import type { Metadata } from "next";
import CompoundInterestCalculator from "@/components/tools/CompoundInterestCalculator";
import ToolPageRenderer from "@/components/tools/ToolPageRenderer";
import { compoundInterestTool } from "@/data/tools/money-basics";
import { createToolMetadata } from "@/lib/tools/engine";
export const metadata: Metadata = createToolMetadata(compoundInterestTool);
export default function Page(){return <ToolPageRenderer tool={compoundInterestTool} calculator={<CompoundInterestCalculator/>}/>;}