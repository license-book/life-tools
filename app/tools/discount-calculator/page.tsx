import type { Metadata } from "next";
import DiscountCalculator from "@/components/tools/DiscountCalculator";
import ToolPageRenderer from "@/components/tools/ToolPageRenderer";
import { discountTool } from "@/data/tools/money-basics";
import { createToolMetadata } from "@/lib/tools/engine";
export const metadata: Metadata = createToolMetadata(discountTool);
export default function Page(){return <ToolPageRenderer tool={discountTool} calculator={<DiscountCalculator/>}/>;}