import type { ToolDefinition } from "@/types/tool";

const commonBadges = ["무료", "회원가입 없음", "즉시 계산", "인쇄·PDF 저장"];

export const dateDurationTool: ToolDefinition = {
  id: "life-date-duration",
  slug: "date-duration",
  category: "LIFE",
  name: "날짜·기간 계산기",
  shortDescription: "두 날짜 사이의 일수와 주 단위 기간, D-day를 한 번에 계산합니다.",
  heroDescription: "시작일과 종료일을 입력하면 두 날짜 사이의 기간과 D-day를 빠르게 확인할 수 있습니다. 일정, 여행, 계약, 공부 계획처럼 날짜 간격을 확인해야 할 때 활용하세요.",
  badges: commonBadges,
  relatedTools: ["anniversary-cycle", "age-calculator", "business-days"],
  calculatorTitle: "두 날짜 사이 기간 계산",
  calculatorDescription: "시작일과 종료일을 선택하면 경과 일수, 포함 일수, 주 단위 기간을 계산합니다.",
  sections: [
    { title: "언제 유용한가요?", cards: [
      { label: "일정", title: "D-day와 남은 기간 확인", description: "시험, 이사, 여행, 행사일까지 남은 날짜를 확인할 수 있습니다." },
      { label: "기록", title: "두 날짜 사이 경과일 계산", description: "프로젝트 기간이나 생활 기록의 실제 경과일을 확인할 때 유용합니다." },
      { label: "비교", title: "주 단위로도 확인", description: "일수뿐 아니라 약 몇 주에 해당하는지도 함께 확인할 수 있습니다." }
    ]},
    { title: "계산 기준", paragraphs: ["경과 일수는 종료일에서 시작일을 뺀 날짜 차이입니다. 시작일과 종료일을 모두 포함해 세고 싶다면 포함 일수를 확인하세요.", "시간대 차이 영향을 줄이기 위해 달력 날짜 기준으로 계산하며, 실제 계약·법정 기간 산정은 해당 규정을 우선해야 합니다."], notice: "법률·행정상 기간 계산은 초일 산입 여부, 공휴일 처리 등 별도 규칙이 있을 수 있습니다." },
    { title: "사용 예시", cards: [
      { title: "2026년 9월 1일 → 2026년 9월 30일", description: "경과 일수는 29일, 시작일과 종료일을 모두 포함하면 30일입니다." },
      { title: "여행 출발일까지 남은 날", description: "오늘을 시작일, 출발일을 종료일로 설정해 남은 기간을 확인할 수 있습니다." }
    ]}
  ],
  freeResources: [{ type: "인쇄", title: "기간 계산 결과 저장", description: "계산 결과를 인쇄하거나 브라우저의 PDF 저장 기능으로 보관할 수 있습니다." }],
  faq: [
    { question: "시작일도 1일로 포함되나요?", answer: "경과 일수는 포함하지 않습니다. 대신 시작일과 종료일을 모두 포함한 '포함 일수'를 별도로 표시합니다." },
    { question: "윤년도 반영되나요?", answer: "네. 실제 달력 날짜 차이를 사용하므로 윤년의 2월 29일도 자동 반영됩니다." },
    { question: "법정 기간 계산에도 그대로 쓸 수 있나요?", answer: "참고용으로는 사용할 수 있지만 법정 기간은 초일 산입, 휴일 처리 등 별도 기준을 반드시 확인해야 합니다." }
  ],
  disclaimer: "날짜·기간 계산 결과는 일반적인 달력 기준 참고값입니다.",
  seo: { title: "날짜·기간 계산기 | 두 날짜 사이 일수·D-day 계산", description: "두 날짜 사이 경과 일수, 포함 일수, 주 단위 기간과 D-day를 무료로 계산하세요.", keywords: ["날짜 계산기", "기간 계산기", "일수 계산", "D-day 계산기", "두 날짜 사이"] }
};

export const ageCalculatorTool: ToolDefinition = {
  id: "life-age-calculator",
  slug: "age-calculator",
  category: "LIFE",
  name: "나이·만나이 계산기",
  shortDescription: "생년월일과 기준일을 바탕으로 만 나이와 연 나이를 계산합니다.",
  heroDescription: "생년월일과 기준일을 입력해 만 나이, 연 나이, 다음 생일까지 남은 기간을 확인하세요.",
  badges: commonBadges,
  relatedTools: ["date-duration", "anniversary-cycle"],
  calculatorTitle: "생년월일 기준 나이 계산",
  calculatorDescription: "생년월일과 기준일을 입력하면 만 나이와 연 나이를 함께 보여줍니다.",
  sections: [
    { title: "만 나이와 연 나이 차이", cards: [
      { label: "만 나이", title: "생일 기준", description: "기준일에 생일이 지났는지를 반영해 계산합니다." },
      { label: "연 나이", title: "연도 기준", description: "기준 연도에서 출생 연도를 뺀 값으로 계산합니다." }
    ]},
    { title: "계산 기준", paragraphs: ["만 나이는 기준 연도에서 출생 연도를 뺀 뒤, 해당 연도의 생일이 아직 지나지 않았다면 1을 뺍니다.", "연 나이는 단순히 기준 연도에서 출생 연도를 뺀 값입니다. 특정 제도나 서비스의 나이 기준은 별도 규정을 확인하세요."], notice: "법령·보험·교육·서비스별 연령 기준은 계산 방식이 다를 수 있습니다." },
    { title: "사용 예시", cards: [
      { title: "1990년 10월 10일생", description: "기준일이 2026년 8월 23일이면 그해 생일 전이므로 만 35세입니다." },
      { title: "생일 전후 확인", description: "기준일을 바꿔 미래 특정 날짜의 만 나이도 미리 확인할 수 있습니다." }
    ]}
  ],
  freeResources: [{ type: "인쇄", title: "나이 계산 결과표", description: "기준일과 생년월일이 포함된 결과를 인쇄·PDF로 저장할 수 있습니다." }],
  faq: [
    { question: "한국식 세는나이도 계산하나요?", answer: "기본 결과는 현재 실생활에서 많이 쓰는 만 나이와 연 나이를 중심으로 제공합니다." },
    { question: "미래 날짜 기준 나이도 볼 수 있나요?", answer: "네. 기준일을 미래 날짜로 설정하면 해당 날짜의 만 나이를 계산할 수 있습니다." },
    { question: "나이 제한 판단에 그대로 써도 되나요?", answer: "서비스나 법령마다 기준일과 연령 계산 규정이 다를 수 있으므로 최종 판단은 해당 기준을 확인하세요." }
  ],
  disclaimer: "나이 계산 결과는 일반적인 달력 기준 참고값입니다.",
  seo: { title: "만나이 계산기 | 생년월일로 만 나이·연 나이 계산", description: "생년월일과 기준일을 입력해 만 나이, 연 나이와 다음 생일까지 남은 기간을 무료로 확인하세요.", keywords: ["만나이 계산기", "나이 계산기", "만 나이", "연 나이", "생년월일 나이"] }
};

export const sleepTimeTool: ToolDefinition = {
  id: "life-sleep-time",
  slug: "sleep-time",
  category: "LIFE",
  name: "수면시간 계산기",
  shortDescription: "취침 시각과 기상 시각으로 실제 수면 가능 시간을 계산합니다.",
  heroDescription: "잠드는 시각과 일어나는 시각을 입력해 확보 가능한 수면시간을 확인하고 생활 일정을 계획하세요.",
  badges: commonBadges,
  relatedTools: ["date-duration"],
  calculatorTitle: "취침·기상 시각으로 수면시간 계산",
  calculatorDescription: "자정을 넘기는 수면도 자동으로 처리해 총 수면 가능 시간을 계산합니다.",
  sections: [
    { title: "이 도구의 활용법", cards: [
      { label: "생활", title: "평일 수면시간 확인", description: "평소 취침·기상 시각을 넣어 실제 확보 가능한 시간을 확인합니다." },
      { label: "계획", title: "기상시간 기준 취침계획", description: "기상 시각을 기준으로 목표 수면시간을 확보하려면 언제 잠자리에 들어야 할지 역산할 수 있습니다." }
    ]},
    { title: "계산 기준", paragraphs: ["취침 시각과 기상 시각의 단순 시간 차이를 계산하며, 기상 시각이 더 이르면 다음 날로 간주합니다.", "잠들기까지 걸리는 시간, 야간 각성, 개인별 수면 효율은 자동 반영하지 않습니다."], notice: "이 도구는 생활 일정 계획용이며 수면장애 진단이나 의학적 판단을 위한 도구가 아닙니다." },
    { title: "결과 해석", paragraphs: ["표시되는 시간은 침대에 누워 있는 실제 시간과 다를 수 있습니다. 잠드는 데 걸리는 시간이나 중간 각성이 있다면 실제 수면시간은 더 짧을 수 있습니다."] }
  ],
  freeResources: [{ type: "인쇄", title: "수면 일정 결과 저장", description: "취침·기상 시각과 계산 결과를 인쇄·PDF로 저장해 생활계획에 활용할 수 있습니다." }],
  faq: [
    { question: "밤 11시에 자고 아침 7시에 일어나면 어떻게 계산되나요?", answer: "자정을 넘어 다음 날 기상하는 것으로 처리해 8시간으로 계산합니다." },
    { question: "낮잠도 계산할 수 있나요?", answer: "네. 같은 날의 시작·종료 시각을 넣어 낮잠 시간을 계산할 수 있습니다." },
    { question: "권장 수면시간도 판단해주나요?", answer: "개인별 건강상태와 연령에 따라 달라질 수 있어 이 도구는 시간 계산과 일정 계획에 초점을 둡니다." }
  ],
  disclaimer: "수면시간 계산기는 생활 일정 계획용이며 의료 진단을 제공하지 않습니다.",
  seo: { title: "수면시간 계산기 | 취침·기상 시간으로 수면시간 계산", description: "취침 시각과 기상 시각을 입력해 총 수면 가능 시간을 무료로 계산하고 생활 일정을 계획하세요.", keywords: ["수면시간 계산기", "취침시간 계산", "기상시간 계산", "수면 계산"] }
};

export const travelChecklistTool: ToolDefinition = {
  id: "life-travel-checklist",
  slug: "travel-checklist",
  category: "LIFE",
  name: "여행 준비물 체크리스트",
  shortDescription: "국내·해외, 여행기간과 상황에 맞춰 준비물을 점검합니다.",
  heroDescription: "여행 유형과 기간을 선택하면 기본 준비물과 상황별 추가 준비물을 체크리스트로 정리합니다. 출발 전 빠뜨린 물건이 없는지 확인하세요.",
  badges: ["무료", "회원가입 없음", "맞춤 체크리스트", "인쇄·PDF 저장"],
  relatedTools: ["date-duration", "anniversary-cycle"],
  calculatorTitle: "맞춤 여행 준비물 만들기",
  calculatorDescription: "국내·해외 여부와 여행기간, 동반 상황을 선택하면 준비물 목록을 구성합니다.",
  sections: [
    { title: "준비물 구성 기준", cards: [
      { label: "필수", title: "신분·결제·예약", description: "신분증, 결제수단, 예약정보처럼 여행의 기본이 되는 항목을 우선 확인합니다." },
      { label: "생활", title: "의류·세면·전자기기", description: "기간이 길수록 필요한 의류와 충전·세면 관련 항목을 추가로 점검합니다." },
      { label: "상황별", title: "해외·아이 동반", description: "여권, 변환 플러그, 아이용품 등 상황에 맞는 추가 항목을 보여줍니다." }
    ]},
    { title: "사용 팁", paragraphs: ["목록을 만든 뒤 실제 여행지의 날씨, 항공사 수하물 규정, 숙소 제공품을 확인해 불필요한 짐은 줄이는 것이 좋습니다.", "여권 유효기간, 비자, 여행자보험, 의약품 반입 규정처럼 국가별 조건은 출발 전에 공식 정보를 확인하세요."], notice: "국가별 입국·검역·수하물 규정은 수시로 바뀔 수 있으므로 최신 공식 안내를 확인하세요." },
    { title: "출발 전 마지막 확인", cards: [
      { title: "전날", description: "예약정보, 신분증·여권, 충전기, 결제수단을 한곳에 모아두세요." },
      { title: "출발 직전", description: "휴대전화, 지갑, 열쇠, 신분증·여권처럼 마지막까지 쓰는 물건을 다시 확인하세요." }
    ]}
  ],
  freeResources: [{ type: "체크리스트", title: "맞춤 여행 준비물 목록", description: "선택한 조건에 맞춰 생성된 준비물 목록을 체크하고 인쇄·PDF로 저장할 수 있습니다." }],
  faq: [
    { question: "해외여행 준비물도 포함되나요?", answer: "네. 해외여행을 선택하면 여권, 해외 결제수단, 변환 플러그 같은 항목이 추가됩니다." },
    { question: "아이 동반 항목도 있나요?", answer: "아이 동반을 선택하면 여벌옷, 간식, 물티슈 등 기본적인 추가 준비물을 표시합니다." },
    { question: "목록이 모든 여행에 완벽하게 맞나요?", answer: "기본 점검용입니다. 여행지 날씨, 활동, 항공사·숙소 규정에 따라 항목을 추가하거나 제외하세요." }
  ],
  disclaimer: "여행 준비물 목록은 일반적인 참고용이며 여행지·항공사·숙소별 규정을 별도로 확인해야 합니다.",
  seo: { title: "여행 준비물 체크리스트 | 국내·해외 맞춤 준비물", description: "국내·해외 여행과 여행기간, 아이 동반 여부에 맞춰 여행 준비물을 무료 체크리스트로 만들어보세요.", keywords: ["여행 준비물", "여행 체크리스트", "해외여행 준비물", "국내여행 준비물", "여행 짐싸기"] }
};

export const anniversaryCycleTool: ToolDefinition = {
  id: "life-anniversary-cycle",
  slug: "anniversary-cycle",
  category: "LIFE",
  name: "기념일·주기 계산기",
  shortDescription: "시작일 기준 100일, 200일, 1주년과 원하는 N일 뒤 날짜를 계산합니다.",
  heroDescription: "처음 만난 날, 시작한 날, 프로젝트 시작일을 입력하면 100일·200일·1주년과 원하는 N일 뒤 날짜를 확인할 수 있습니다.",
  badges: commonBadges,
  relatedTools: ["date-duration", "age-calculator"],
  calculatorTitle: "기념일과 N일째 날짜 계산",
  calculatorDescription: "기준일을 1일째로 보고 주요 기념일과 직접 지정한 N일째 날짜를 계산합니다.",
  sections: [
    { title: "계산 방식", paragraphs: ["기준일을 1일째로 계산합니다. 따라서 100일째 날짜는 기준일에서 99일을 더한 날짜입니다.", "1주년은 달력상 다음 해의 같은 월·일을 기준으로 표시합니다. 2월 29일처럼 다음 해에 같은 날짜가 없는 경우 달력 보정이 필요할 수 있습니다."], notice: "서비스마다 '100일 후'와 '100일째'의 표현이 다를 수 있으니 기준일 포함 여부를 확인하세요." },
    { title: "활용 예시", cards: [
      { label: "기념일", title: "100일·200일 확인", description: "연애, 반려동물 입양, 새로운 습관 시작일 등 개인 기념일을 계산할 수 있습니다." },
      { label: "계획", title: "N일 프로젝트", description: "30일 챌린지나 90일 계획처럼 특정 일차의 날짜를 확인할 수 있습니다." }
    ]}
  ],
  freeResources: [{ type: "인쇄", title: "기념일 일정표 저장", description: "주요 기념일과 사용자 지정 날짜를 인쇄·PDF로 저장할 수 있습니다." }],
  faq: [
    { question: "기준일을 1일째로 세나요?", answer: "네. 이 도구는 기준일을 1일째로 계산합니다." },
    { question: "100일 후와 100일째는 다른가요?", answer: "네. 기준일을 1일째로 세면 100일째는 기준일에서 99일을 더한 날짜입니다." },
    { question: "1주년도 계산하나요?", answer: "네. 다음 해의 같은 월·일을 1주년으로 함께 표시합니다." }
  ],
  disclaimer: "기념일 계산은 기준일을 1일째로 보는 일반적인 방식의 참고값입니다.",
  seo: { title: "기념일 계산기 | 100일·200일·1주년·N일째 날짜", description: "기준일을 입력해 100일, 200일, 1주년과 원하는 N일째 날짜를 무료로 계산하세요.", keywords: ["기념일 계산기", "100일 계산기", "200일 계산", "1주년 계산", "N일째 계산"] }
};

export const lifeBasicsTools: ToolDefinition[] = [dateDurationTool, ageCalculatorTool, sleepTimeTool, travelChecklistTool, anniversaryCycleTool];
