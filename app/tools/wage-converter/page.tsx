import type { Metadata } from "next";
import ToolPageRenderer from "@/components/tools/ToolPageRenderer";
import { WageConverter } from "@/components/tools/MoneyWorkCalculators";
import { wageConverterTool } from "@/data/tools/money-work";
import { createToolMetadata } from "@/lib/tools/engine";
export const metadata: Metadata = createToolMetadata(wageConverterTool);
export default function Page(){return <ToolPageRenderer tool={wageConverterTool} calculator={<WageConverter/>}/>;}
