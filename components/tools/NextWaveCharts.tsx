"use client";

import ToolChart from "@/components/tools/ToolChart";

type Props={type:string;values:Record<string,number>};
const won=(v:number)=>`${Math.round(Number.isFinite(v)?v:0).toLocaleString("ko-KR")}원`;
const pct=(v:number)=>`${(Number.isFinite(v)?v:0).toLocaleString("ko-KR",{maximumFractionDigits:1})}%`;

export default function NextWaveCharts({type,values:v}:Props){
  if(type==="loan-payment-compare"){
    const r=v.rate/1200,n=Math.max(1,v.months),p=v.principal;
    const equalPay=r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
    const equalPayInterest=equalPay*n-p;
    const equalPrincipalInterest=r===0?0:(p*r*(n+1))/2;
    return <ToolChart type="bar" title="상환방식별 총이자 비교" description="같은 대출조건에서 두 방식의 총이자 차이를 비교합니다." data={[{label:"원리금균등",value:equalPayInterest},{label:"원금균등",value:equalPrincipalInterest}]} valueFormatter={won}/>;
  }
  if(type==="early-repayment-fee"){
    const fee=v.balance*v.feeRate/100*v.remainingRatio/100;
    return <ToolChart type="donut" title="중도상환 금액 구성" description="상환원금과 예상 수수료가 전체 납부액에서 차지하는 비중입니다." data={[{label:"상환원금",value:v.balance},{label:"중도상환수수료",value:fee}]} centerLabel={won(v.balance+fee)} valueFormatter={won}/>;
  }
  if(type==="inflation-future-value"){
    const years=Math.max(1,Math.round(v.years));
    const step=Math.max(1,Math.ceil(years/8));
    const data=[] as {label:string;value:number}[];
    for(let y=0;y<=years;y+=step)data.push({label:`${y}년`,value:v.today*Math.pow(1+v.inflation/100,y)});
    if(data[data.length-1]?.label!==`${years}년`)data.push({label:`${years}년`,value:v.today*Math.pow(1+v.inflation/100,years)});
    return <ToolChart type="line" title="물가상승 반영 금액 변화" description="현재 구매력을 유지하려면 시간이 지날수록 필요한 금액이 얼마나 늘어나는지 보여줍니다." data={data} valueFormatter={won}/>;
  }
  if(type==="break-even"){
    const margin=Math.max(0,v.price-v.variable),qty=margin>0?Math.ceil(v.fixed/margin):0;
    return <ToolChart type="bar" title="판매가와 단위비용 비교" description={`손익분기 판매량은 약 ${qty.toLocaleString("ko-KR")}개입니다.`} data={[{label:"단위 판매가",value:v.price},{label:"단위 변동비",value:v.variable},{label:"단위 공헌이익",value:margin}]} valueFormatter={won}/>;
  }
  if(type==="tile-installation-cost"){
    const materialArea=v.area*(1+v.waste/100),material=materialArea*v.material,labor=v.area*v.labor;
    return <ToolChart type="donut" title="타일 시공비 구성" description="자재비와 시공 인건비 비중을 비교합니다." data={[{label:"자재비",value:material},{label:"시공비",value:labor}]} centerLabel={won(material+labor)} valueFormatter={won}/>;
  }
  if(type==="heating-share"){
    const ratio=v.totalArea>0?Math.max(0,Math.min(1,v.myArea/v.totalArea)):0;
    return <ToolChart type="donut" title="난방비 분담 비율" description="전체 사용면적 중 내 면적 비중을 시각화합니다." data={[{label:"내 분담",value:ratio*100},{label:"나머지",value:(1-ratio)*100}]} centerLabel={pct(ratio*100)} valueFormatter={pct}/>;
  }
  if(type==="ice-vs-ev-cost"){
    const ice=v.fuelEff>0?v.km/v.fuelEff*v.fuelPrice:0,ev=v.evEff>0?v.km/v.evEff*v.elecPrice:0;
    return <ToolChart type="bar" title="월 에너지비 비교" description="같은 주행거리에서 내연기관과 전기차의 월 에너지비를 비교합니다." data={[{label:"내연기관",value:ice},{label:"전기차",value:ev}]} valueFormatter={won}/>;
  }
  if(type==="annual-car-total"){
    const fuel=v.fuel*12,parking=v.parking*12;
    return <ToolChart type="donut" title="자동차 연간 유지비 구성" description="연간 총 유지비에서 각 항목이 차지하는 비중입니다." data={[{label:"연료·충전",value:fuel},{label:"보험",value:v.insurance},{label:"자동차세",value:v.tax},{label:"주차·통행",value:parking},{label:"정비",value:v.maintenance}]} centerLabel={won(fuel+v.insurance+v.tax+parking+v.maintenance)} valueFormatter={won}/>;
  }
  if(type==="toll-fuel-trip"){
    const fuel=v.eff>0?v.distance/v.eff*v.fuel:0;
    return <ToolChart type="donut" title="자동차 여행 교통비 구성" description="유류비와 통행료가 전체 교통비에서 차지하는 비중입니다." data={[{label:"유류비",value:fuel},{label:"통행료",value:v.toll}]} centerLabel={won(fuel+v.toll)} valueFormatter={won}/>;
  }
  if(type==="n-plus-one-discount"){
    const totalQty=v.buy+v.free,total=v.price*v.buy,normal=v.price*totalQty;
    return <ToolChart type="bar" title="정상가와 행사 결제액 비교" description="증정분을 포함한 정상 구매가와 실제 결제액 차이를 보여줍니다." data={[{label:"정상 구매가",value:normal},{label:"실제 결제액",value:total}]} valueFormatter={won}/>;
  }
  if(type==="point-effective-price"){
    const benefit=v.price*v.rate/100*v.pointValue;
    return <ToolChart type="donut" title="실질 구매가 구성" description="결제금액 중 포인트 혜택과 실질 부담액을 구분합니다." data={[{label:"실질 부담액",value:Math.max(0,v.price-benefit)},{label:"포인트 혜택",value:Math.max(0,benefit)}]} centerLabel={won(v.price)} valueFormatter={won}/>;
  }
  if(type==="landed-cost"){
    return <ToolChart type="donut" title="해외구매 총원가 구성" description="상품가격과 배송·세금·수수료 비중을 한눈에 비교합니다." data={[{label:"상품가격",value:v.item},{label:"배송비",value:v.shipping},{label:"세금",value:v.tax},{label:"수수료",value:v.fee}]} centerLabel={won(v.item+v.shipping+v.tax+v.fee)} valueFormatter={won}/>;
  }
  if(type==="night-work-pay"||type==="holiday-work-pay"){
    const base=v.hourly*v.hours,extra=base*Math.max(0,v.multiplier-1);
    return <ToolChart type="donut" title={type==="night-work-pay"?"야간근로 수당 구성":"휴일근로 수당 구성"} description="기본 시급분과 가산분을 구분해 보여줍니다." data={[{label:"기본 시급분",value:base},{label:"가산분",value:extra}]} centerLabel={won(base+extra)} valueFormatter={won}/>;
  }
  if(type==="project-quote"){
    const labor=v.hours*v.rate,base=labor+v.expenses,buffer=base*v.buffer/100;
    return <ToolChart type="donut" title="프로젝트 견적 구성" description="작업비·직접비·여유비가 권장 견적에서 차지하는 비중입니다." data={[{label:"작업비",value:labor},{label:"직접비·외주비",value:v.expenses},{label:"여유비",value:buffer}]} centerLabel={won(base+buffer)} valueFormatter={won}/>;
  }
  if(type==="trip-expense-split"){
    return <ToolChart type="donut" title="여행 공동경비 구성" description="숙박·교통·식비 비중을 비교합니다." data={[{label:"숙박비",value:v.lodging},{label:"교통비",value:v.transport},{label:"식비·공동경비",value:v.food}]} centerLabel={won(v.lodging+v.transport+v.food)} valueFormatter={won}/>;
  }
  if(type==="group-dues"){
    const reserve=v.target*v.reserve/100;
    return <ToolChart type="donut" title="회비 목표액 구성" description="기본 필요예산과 예비비를 구분해 보여줍니다." data={[{label:"기본 예산",value:v.target},{label:"예비비",value:reserve}]} centerLabel={won(v.target+reserve)} valueFormatter={won}/>;
  }
  if(type==="time-goal"){
    const goal=Math.max(0,v.goal),done=Math.max(0,Math.min(goal,v.done)),remain=Math.max(0,goal-done);
    return <ToolChart type="donut" title="목표시간 달성 현황" description="현재까지 누적한 시간과 남은 시간을 보여줍니다." data={[{label:"완료",value:done},{label:"남음",value:remain}]} centerLabel={pct(goal>0?done/goal*100:0)} valueFormatter={(x)=>`${x.toLocaleString("ko-KR",{maximumFractionDigits:1})}시간`}/>;
  }
  return null;
}
