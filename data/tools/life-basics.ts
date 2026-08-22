import type { ToolDefinition } from "@/types/tool";

const common = {
  category: "LIFE" as const,
  badges: ["무료", "회원가입 없음", "즉시 계산", "인쇄·PDF 저장"],
  disclaimer: "계산 결과는 생활 계획을 위한 참고값입니다. 실제 일정과 개인 조건에 맞게 다시 확인하세요.",
};

export const datePeriodTool: ToolDefinition = {
  ...common,
  id: "life-date-period", slug: "date-period", name: "날짜·기간 계산기",
  shortDescription: "두 날짜 사이의 일수와 주·개월 환산, D-day를 한 번에 확인합니다.",
  heroDescription: "시작일과 종료일을 입력하면 두 날짜 사이의 기간과 D-day를 빠르게 계산합니다.",
  relatedTools: ["anniversary-cycle", "business-days", "deadline-business-day"],
  calculatorTitle: "날짜 사이 기간 계산", calculatorDescription: "두 날짜를 선택하면 달력 기준 일수와 주·개월 환산값을 보여줍니다.",
  sections: [
    { title: "사용법", cards: [{ title: "1. 시작일 선택", description: "계산의 기준이 되는 시작 날짜를 선택합니다." }, { title: "2. 종료일 선택", description: "비교할 종료 날짜를 선택합니다." }, { title: "3. 결과 확인", description: "일수, 주수, 개월 환산값과 D-day를 확인합니다." }] },
    { title: "계산 기준", paragraphs: ["일수 차이는 두 날짜의 자정 기준 차이를 사용합니다. 개월 값은 평균 30.44일을 기준으로 환산한 참고값입니다."] },
    { title: "활용 예시", cards: [{ label: "여행", title: "출발일까지 남은 날", description: "예약일과 출발일 사이의 남은 기간을 확인할 수 있습니다." }, { label: "일정", title: "프로젝트 기간", description: "시작일과 마감일 사이의 전체 기간을 빠르게 확인할 수 있습니다." }] }
  ],
  freeResources: [{ type: "PDF", title: "계산 결과 저장", description: "브라우저 인쇄 기능으로 결과를 PDF로 무료 저장할 수 있습니다." }],
  faq: [{ question: "시작일을 포함하나요?", answer: "기본 결과는 두 날짜의 날짜 차이를 표시합니다. 일정 성격에 따라 시작일 포함 여부를 따로 고려하세요." }, { question: "개월 수는 정확한 달력 개월인가요?", answer: "아니요. 평균 일수로 환산한 참고값이며 달력상 정확한 개월 계산과는 차이가 있을 수 있습니다." }],
  seo: { title: "날짜 기간 계산기 | 일수·주·개월·D-day 계산", description: "두 날짜 사이의 기간, 일수, 주수, 개월 환산과 D-day를 무료로 계산하세요.", keywords: ["날짜 계산기", "기간 계산기", "D-day 계산기", "일수 계산"] }
};

export const ageCalculatorTool: ToolDefinition = {
  ...common,
  id: "life-age", slug: "age-calculator", name: "나이·만나이 계산기",
  shortDescription: "생년월일을 기준으로 만 나이와 다음 생일까지 남은 기간을 확인합니다.",
  heroDescription: "생년월일과 기준일을 입력해 현재 만 나이와 다음 생일까지 남은 일수를 계산합니다.",
  relatedTools: ["date-period", "anniversary-cycle"],
  calculatorTitle: "만 나이 계산", calculatorDescription: "생년월일과 기준일을 입력하면 만 나이를 계산합니다.",
  sections: [{ title: "계산 기준", paragraphs: ["만 나이는 기준일에서 출생 연도를 뺀 뒤, 해당 연도의 생일이 아직 지나지 않았다면 1을 뺍니다."] }, { title: "활용 예시", cards: [{ title: "연령 확인", description: "보험, 여행, 예약 등에서 기준일 현재 만 나이를 확인할 때 활용할 수 있습니다." }, { title: "생일 계획", description: "다음 생일까지 남은 일수를 확인해 일정 계획에 활용할 수 있습니다." }] }],
  faq: [{ question: "한국식 세는나이도 나오나요?", answer: "이 도구는 공식 문서와 일상에서 널리 쓰이는 만 나이를 중심으로 제공합니다." }, { question: "기준일을 바꿀 수 있나요?", answer: "네. 오늘뿐 아니라 원하는 날짜를 기준으로 만 나이를 계산할 수 있습니다." }],
  seo: { title: "만나이 계산기 | 생년월일 나이 계산", description: "생년월일과 기준일로 만 나이와 다음 생일까지 남은 날을 무료 계산하세요.", keywords: ["만나이 계산기", "나이 계산기", "생년월일 나이"] }
};

export const sleepTimeTool: ToolDefinition = {
  ...common,
  id: "life-sleep-time", slug: "sleep-time", name: "수면시간 계산기",
  shortDescription: "취침 시각과 기상 시각으로 실제 수면 가능 시간을 계산합니다.",
  heroDescription: "잠드는 시각과 일어나는 시각을 입력해 하루 수면 시간을 빠르게 확인합니다.",
  relatedTools: ["date-period", "work-hours"],
  calculatorTitle: "수면시간 계산", calculatorDescription: "취침과 기상 시각을 입력하면 자정을 넘기는 경우까지 반영해 수면 시간을 계산합니다.",
  sections: [{ title: "사용법", paragraphs: ["취침 시각과 기상 시각을 24시간 기준으로 입력하세요. 기상 시각이 취침 시각보다 이르면 다음 날 기상으로 계산합니다."] }, { title: "결과 해석", paragraphs: ["표시되는 값은 침대에 머문 시간 기준입니다. 실제 잠드는 데 걸린 시간이나 중간 각성 시간은 포함하지 않습니다."] }],
  faq: [{ question: "자정을 넘어도 계산되나요?", answer: "네. 예를 들어 23시 취침, 7시 기상은 8시간으로 계산합니다." }, { question: "권장 수면시간을 진단하나요?", answer: "아니요. 이 도구는 시간 계산용이며 건강 상태를 진단하지 않습니다." }],
  seo: { title: "수면시간 계산기 | 취침·기상 시간 계산", description: "취침 시각과 기상 시각을 입력해 실제 수면 가능 시간을 무료로 계산하세요.", keywords: ["수면시간 계산기", "잠자는 시간 계산", "취침 기상 계산"] }
};

export const travelPackingTool: ToolDefinition = {
  ...common,
  id: "life-travel-packing", slug: "travel-packing-checklist", name: "여행 준비물 체크리스트",
  shortDescription: "여행 기간과 유형에 맞춰 기본 준비물을 체크리스트로 정리합니다.",
  heroDescription: "국내·해외 여행과 기간을 선택해 챙겨야 할 준비물을 빠르게 정리하고 인쇄할 수 있습니다.",
  relatedTools: ["date-period", "trip-fuel-cost", "bulk-pack"],
  calculatorTitle: "여행 준비물 만들기", calculatorDescription: "여행 유형과 기간을 선택하면 기본 준비물 목록을 자동 구성합니다.",
  sections: [{ title: "체크 기준", paragraphs: ["신분증·결제수단·의류·세면도구·충전기 등 공통 준비물에 해외여행 여부와 여행 기간에 따라 항목을 추가합니다."] }, { title: "출발 전 확인", cards: [{ title: "문서", description: "신분증, 여권, 예약확인서와 필요한 비자 여부를 확인하세요." }, { title: "결제", description: "카드, 현금, 해외 결제 가능 여부와 비상 결제수단을 확인하세요." }, { title: "전자기기", description: "휴대전화, 충전기, 보조배터리와 필요한 변환 플러그를 확인하세요." }] }],
  freeResources: [{ type: "체크리스트", title: "무료 여행 준비물 목록", description: "생성한 체크리스트를 인쇄하거나 PDF로 저장해 사용할 수 있습니다." }],
  faq: [{ question: "모든 여행 준비물이 포함되나요?", answer: "기본적인 공통 항목을 중심으로 제공합니다. 목적지 날씨, 활동, 숙소 조건에 따라 항목을 추가하세요." }, { question: "체크 상태가 저장되나요?", answer: "현재는 브라우저 화면에서 체크하고 인쇄하는 방식이며 계정 저장은 사용하지 않습니다." }],
  seo: { title: "여행 준비물 체크리스트 | 국내·해외 여행 짐 목록", description: "국내·해외 여행 기간에 맞춘 준비물 체크리스트를 무료로 만들고 인쇄하세요.", keywords: ["여행 준비물", "여행 체크리스트", "해외여행 준비물", "여행 짐 목록"] }
};

export const anniversaryCycleTool: ToolDefinition = {
  ...common,
  id: "life-anniversary-cycle", slug: "anniversary-cycle", name: "기념일·주기 계산기",
  shortDescription: "기준일에서 100일, 1년 또는 원하는 주기 뒤 날짜를 계산합니다.",
  heroDescription: "시작 날짜와 원하는 일수를 입력해 100일, 1년, 특정 주기의 기념일 날짜를 계산합니다.",
  relatedTools: ["date-period", "age-calculator", "deadline-business-day"],
  calculatorTitle: "기념일 날짜 계산", calculatorDescription: "기준일과 추가할 일수를 입력하면 해당 기념일 날짜를 계산합니다.",
  sections: [{ title: "계산 기준", paragraphs: ["기준일 다음 날을 1일 뒤로 보고 입력한 일수만큼 날짜를 더합니다. 100일 기념일처럼 시작일을 1일째로 세는 관습과는 1일 차이가 날 수 있으므로 용도에 맞게 확인하세요."] }, { title: "활용 예시", cards: [{ title: "100일", description: "만난 날, 시작일 등에서 100일 뒤 날짜를 확인합니다." }, { title: "1주년", description: "달력 기준 1년 기념일과 함께 특정 일수 기준 날짜도 비교할 수 있습니다." }] }],
  faq: [{ question: "100일 기념일은 시작일을 포함하나요?", answer: "이 도구의 기본 추가일 계산은 시작일 다음 날부터 셉니다. 시작일을 1일째로 계산하려면 하루를 조정해 확인하세요." }, { question: "1년 뒤 윤년도 반영되나요?", answer: "일수 추가 방식은 실제 달력 날짜를 따라 계산합니다." }],
  seo: { title: "기념일 계산기 | 100일·주기 날짜 계산", description: "기준일에서 100일, 1년 또는 원하는 일수 뒤 기념일 날짜를 무료로 계산하세요.", keywords: ["기념일 계산기", "100일 계산기", "날짜 주기 계산"] }
};

export const lifeBasicsTools = [datePeriodTool, ageCalculatorTool, sleepTimeTool, travelPackingTool, anniversaryCycleTool];
