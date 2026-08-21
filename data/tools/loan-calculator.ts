import type { ToolDefinition } from "@/types/tool";

export const loanCalculatorTool: ToolDefinition = {
  id: "money-loan-001",
  slug: "loan-calculator",
  category: "MONEY",
  name: "대출 이자·상환 계산기",
  shortDescription: "대출금, 금리, 기간을 입력해 월 상환액과 총이자를 계산합니다.",
  heroDescription: "원리금균등·원금균등 상환 방식을 비교하고 월별 상환계획까지 한 번에 확인하세요.",
  badges: ["무료", "회원가입 없음", "바로 계산", "상환계획표 제공"],
  relatedTools: ["deposit-interest", "savings-interest", "compound-interest"],
  seo: {
    title: "대출 이자 계산기 | 월 상환액·총이자·상환계획표",
    description: "대출금과 금리, 기간을 입력하면 원리금균등·원금균등 방식의 월 상환액, 총이자, 상환계획표를 무료로 계산합니다.",
    keywords: ["대출 이자 계산기", "대출 상환 계산기", "원리금균등 계산기", "원금균등 계산기", "월 상환액 계산"],
  },
  rule: {
    country: "KR",
    locale: "ko-KR",
    currency: "KRW",
    reviewRequired: false,
  },
};
