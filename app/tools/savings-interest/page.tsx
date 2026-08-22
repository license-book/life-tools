import type { Metadata } from "next";
import SavingsInterestCalculator from "@/components/tools/SavingsInterestCalculator";
import ToolPageRenderer from "@/components/tools/ToolPageRenderer";
import { savingsInterestTool } from "@/data/tools/money-basics";
import { createToolMetadata } from "@/lib/tools/engine";
export const metadata: Metadata = createToolMetadata(savingsInterestTool);
export default function Page(){return <ToolPageRenderer tool={savingsInterestTool} calculator={<SavingsInterestCalculator/>}/>;}