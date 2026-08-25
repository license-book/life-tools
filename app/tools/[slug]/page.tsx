import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPageRenderer from "@/components/tools/ToolPageRenderer";
import { AgeCalculator, AnniversaryCycleCalculator, DatePeriodCalculator, SleepTimeCalculator, TravelPackingChecklist } from "@/components/tools/LifeCalculators";
import { AnnualMileageCalculator, DdayCalculator, EmergencyFundCalculator, EventBudgetCalculator, FreelanceRateCalculator, InstallmentTotalCalculator, RenovationBudgetCalculator, RentShareCalculator, SavingsGoalCalculator, TripTotalCostCalculator, UnitPriceCalculator, WeeklyPayCalculator } from "@/components/tools/ExpansionCalculators";
import { BillableUtilizationCalculator, BreakDeductionCalculator, CagrCalculator, CashbackPriceCalculator, CurtainSizeCalculator, EvChargeTimeCalculator, PricePerUseCalculator, RatioSplitCalculator, RealReturnCalculator, StorageVolumeCalculator, TireDiameterCalculator, WeightedAverageCalculator } from "@/components/tools/AdditionalCalculators";
import { getToolBySlug } from "@/data/tools";
import { createToolMetadata } from "@/lib/tools/engine";

const calculators = {
  "date-period": <DatePeriodCalculator />,
  "age-calculator": <AgeCalculator />,
  "sleep-time": <SleepTimeCalculator />,
  "travel-packing-checklist": <TravelPackingChecklist />,
  "anniversary-cycle": <AnniversaryCycleCalculator />,
  "savings-goal": <SavingsGoalCalculator />,
  "emergency-fund": <EmergencyFundCalculator />,
  "rent-share": <RentShareCalculator />,
  "renovation-budget": <RenovationBudgetCalculator />,
  "trip-total-cost": <TripTotalCostCalculator />,
  "annual-mileage": <AnnualMileageCalculator />,
  "unit-price": <UnitPriceCalculator />,
  "installment-total": <InstallmentTotalCalculator />,
  "weekly-pay": <WeeklyPayCalculator />,
  "freelance-rate": <FreelanceRateCalculator />,
  "dday-calculator": <DdayCalculator />,
  "event-budget": <EventBudgetCalculator />,
  "cagr-calculator": <CagrCalculator />,
  "real-return": <RealReturnCalculator />,
  "curtain-size": <CurtainSizeCalculator />,
  "storage-volume": <StorageVolumeCalculator />,
  "tire-diameter": <TireDiameterCalculator />,
  "ev-charge-time": <EvChargeTimeCalculator />,
  "cashback-price": <CashbackPriceCalculator />,
  "price-per-use": <PricePerUseCalculator />,
  "break-deduction": <BreakDeductionCalculator />,
  "billable-utilization": <BillableUtilizationCalculator />,
  "ratio-split": <RatioSplitCalculator />,
  "weighted-average": <WeightedAverageCalculator />,
} as const;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(calculators).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  return tool ? createToolMetadata(tool) : {};
}

export default async function DynamicToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  const calculator = calculators[slug as keyof typeof calculators];
  if (!calculator) notFound();
  return <ToolPageRenderer tool={tool} calculator={calculator} />;
}
