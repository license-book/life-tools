import type { ToolDefinition } from "@/types/tool";
import { loanCalculatorTool } from "@/data/tools/loan-calculator";
import { vatCalculatorTool } from "@/data/tools/vat-calculator";
import { compoundInterestTool, depositInterestTool, discountTool, salaryNetTool, savingsInterestTool } from "@/data/tools/money-basics";
import { annualSalaryTool, severanceTool, wageConverterTool } from "@/data/tools/money-work";
import { areaPyeongTool, roomAreaTool, paintQuantityTool, wallpaperQuantityTool, tileQuantityTool, flooringQuantityTool, movingBoxTool, movingBudgetTool, sharedUtilityTool, electricityEstimatorTool } from "@/data/tools/home-basics";
import { fuelCostTool, fuelEfficiencyTool, tripFuelCostTool, carLoanTool, ownershipCostTool, depreciationTool, evChargingCostTool, parkingCostTool, maintenanceBudgetTool, carExpenseSplitTool } from "@/data/tools/car-basics";
import { buyBasicsTools } from "@/data/tools/buy-basics";
export const tools: ToolDefinition[] = [loanCalculatorTool,vatCalculatorTool,depositInterestTool,savingsInterestTool,compoundInterestTool,discountTool,salaryNetTool,severanceTool,annualSalaryTool,wageConverterTool,areaPyeongTool,roomAreaTool,paintQuantityTool,wallpaperQuantityTool,tileQuantityTool,flooringQuantityTool,movingBoxTool,movingBudgetTool,sharedUtilityTool,electricityEstimatorTool,fuelCostTool,fuelEfficiencyTool,tripFuelCostTool,carLoanTool,ownershipCostTool,depreciationTool,evChargingCostTool,parkingCostTool,maintenanceBudgetTool,carExpenseSplitTool,...buyBasicsTools];
export function getToolBySlug(slug:string){return tools.find(tool=>tool.slug===slug)}
export function getToolsByCategory(category:ToolDefinition["category"]){return tools.filter(tool=>tool.category===category)}
