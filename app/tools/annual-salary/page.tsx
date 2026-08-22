import type { Metadata } from "next";
import ToolPageRenderer from "@/components/tools/ToolPageRenderer";
import { AnnualSalaryCalculator } from "@/components/tools/MoneyWorkCalculators";
import { annualSalaryTool } from "@/data/tools/money-work";
import { createToolMetadata } from "@/lib/tools/engine";
export const metadata: Metadata = createToolMetadata(annualSalaryTool);
export default function Page(){return <ToolPageRenderer tool={annualSalaryTool} calculator={<AnnualSalaryCalculator/>}/>;}
