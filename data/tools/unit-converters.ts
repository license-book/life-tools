import type { ToolDefinition } from "@/types/tool";

function makeUnitTool(slug:string,name:string,category:ToolDefinition["category"],shortDescription:string,keywords:string[],relatedTools:string[]=[]):ToolDefinition{
  return {
    id:`unit-${slug}`,
    slug,
    category,
    name,
    shortDescription,
    heroDescription:`${shortDescription} 입력값을 바꾸면 결과가 즉시 계산되고 주요 단위를 함께 비교할 수 있습니다.`,
    badges:["무료","회원가입 없음","즉시 변환","결과 인쇄"],
    relatedTools,
    calculatorTitle:`${name} 바로 사용하기`,
    calculatorDescription:"값과 단위를 선택하면 자동으로 변환 결과를 계산합니다.",
    sections:[
      {title:`${name} 사용법`,paragraphs:["변환할 값을 입력하고 기준 단위와 변환 단위를 선택하세요. 단위 서로 바꾸기 버튼으로 방향을 즉시 뒤집을 수 있습니다.","같은 종류의 주요 단위 결과도 함께 표시되어 여러 단위를 한 번에 비교할 수 있습니다."]},
      {title:"계산 기준",paragraphs:["국제적으로 널리 사용하는 표준 환산값을 기준으로 계산합니다. 화면에는 가독성을 위해 소수점 일부를 반올림해 표시합니다."]},
      {title:"활용 예시",cards:[{title:"해외 쇼핑·제품 규격 확인",description:"인치, 파운드, 온스 등 해외 표기를 국내에서 익숙한 단위로 빠르게 바꿀 수 있습니다."},{title:"주거·자동차 생활 계산",description:"평·제곱미터, km/L·MPG, km/h·mph처럼 실제 생활에서 자주 만나는 단위를 비교할 수 있습니다."}]},
      {title:"결과 해석",paragraphs:["표시되는 결과는 동일한 물리량을 다른 단위로 환산한 값입니다. 계약·법정 계량·전문 측정에 사용할 때는 해당 기관의 공식 기준을 함께 확인하세요."]}
    ],
    freeResources:[{type:"print",title:"변환 결과 인쇄·PDF 저장",description:"현재 변환값과 주요 단위 비교 결과를 브라우저 인쇄 기능으로 저장할 수 있습니다."}],
    faq:[
      {question:"변환 결과는 정확한가요?",answer:"표준 환산계수를 사용해 계산하며 화면 표시 단계에서만 일부 소수점을 반올림합니다."},
      {question:"스마트폰에서도 사용할 수 있나요?",answer:"네. 모바일에서도 값 입력, 단위 선택, 결과 확인이 가능하도록 반응형으로 구성합니다."},
      {question:"단위를 더 추가할 수 있나요?",answer:"공통 단위변환 엔진에 단위 정의만 추가하면 같은 구조로 확장할 수 있습니다."}
    ],
    disclaimer:"본 결과는 일반적인 단위 환산을 위한 참고값입니다. 법정 계량, 계약, 공학 설계 등 정밀성이 필요한 용도에서는 공식 기준과 전문 자료를 함께 확인하세요.",
    applicationCategory:"UtilitiesApplication",
    seo:{title:`${name} | 생활도구`,description:shortDescription,keywords},
    rule:{country:"KR",locale:"ko-KR",currency:"KRW",reviewRequired:false}
  };
}

export const unitConverterTools:ToolDefinition[]=[
  makeUnitTool("unit-converter","단위변환","LIFE","길이·넓이·무게·부피·온도·속도·압력·에너지·데이터·연비를 한곳에서 변환합니다.",["단위변환","단위 환산","길이 변환","무게 변환","온도 변환"],["area-converter","length-converter","weight-converter","temperature-converter"]),
  makeUnitTool("area-converter","평·제곱미터 면적변환","HOME","평과 ㎡를 포함한 주요 면적 단위를 빠르게 변환합니다.",["평 제곱미터","평수 계산","1평 몇 제곱미터","면적 변환"],["area-pyeong","room-area","unit-converter"]),
  makeUnitTool("length-converter","길이변환","BUY","mm·cm·m·km·인치·피트·야드·마일을 변환합니다.",["인치 cm","길이 변환","피트 미터","마일 km"],["unit-price","unit-converter"]),
  makeUnitTool("weight-converter","무게변환","BUY","mg·g·kg·톤·온스·파운드를 빠르게 변환합니다.",["파운드 kg","온스 g","무게 변환","lb kg"],["unit-price","unit-converter"]),
  makeUnitTool("temperature-converter","섭씨·화씨 온도변환","LIFE","섭씨·화씨·켈빈 온도를 서로 변환합니다.",["섭씨 화씨","화씨 섭씨","온도 변환","fahrenheit celsius"],["unit-converter"]),
  makeUnitTool("speed-converter","속도변환","CAR","km/h·m/s·mph·노트 속도를 서로 변환합니다.",["mph kmh","속도 변환","kmh mph","노트 kmh"],["annual-mileage","unit-converter"]),
  makeUnitTool("fuel-economy-converter","연비 단위변환","CAR","km/L·L/100km·미국 MPG 연비 단위를 서로 변환합니다.",["mpg km/l","연비 변환","l/100km km/l","미국 mpg"],["fuel-efficiency","fuel-cost","unit-converter"]),
];
