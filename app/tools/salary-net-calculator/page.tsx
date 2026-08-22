import type { Metadata } from "next";
import SalaryNetCalculator from "@/components/tools/SalaryNetCalculator";
import ToolPageRenderer from "@/components/tools/ToolPageRenderer";
import { salaryNetTool } from "@/data/tools/money-basics";
import { createToolMetadata } from "@/lib/tools/engine";
export const metadata: Metadata = createToolMetadata(salaryNetTool);
export default function Page(){return <ToolPageRenderer tool={salaryNetTool} calculator={<SalaryNetCalculator/>}/>;}