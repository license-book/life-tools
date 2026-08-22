import type { Metadata } from "next";
import ToolPageRenderer from "@/components/tools/ToolPageRenderer";
import { SeveranceCalculator } from "@/components/tools/MoneyWorkCalculators";
import { severanceTool } from "@/data/tools/money-work";
import { createToolMetadata } from "@/lib/tools/engine";
export const metadata: Metadata = createToolMetadata(severanceTool);
export default function Page(){return <ToolPageRenderer tool={severanceTool} calculator={<SeveranceCalculator/>}/>;}
