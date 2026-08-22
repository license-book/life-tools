import type { Metadata } from "next";
import DepositInterestCalculator from "@/components/tools/DepositInterestCalculator";
import ToolPageRenderer from "@/components/tools/ToolPageRenderer";
import { depositInterestTool } from "@/data/tools/money-basics";
import { createToolMetadata } from "@/lib/tools/engine";
export const metadata: Metadata = createToolMetadata(depositInterestTool);
export default function Page(){return <ToolPageRenderer tool={depositInterestTool} calculator={<DepositInterestCalculator/>}/>;}