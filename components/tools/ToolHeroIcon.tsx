import type { ToolDefinition } from "@/types/tool";

type IconType = "money"|"percent"|"calendar"|"clock"|"home"|"ruler"|"paint"|"car"|"fuel"|"battery"|"cart"|"tag"|"briefcase"|"salary"|"travel"|"check";

function pickIcon(tool: ToolDefinition): IconType {
  const s = `${tool.slug} ${tool.name} ${tool.shortDescription}`.toLowerCase();
  if (/퇴직|급여|월급|주급|연봉|시급|수당|임금/.test(s)) return "salary";
  if (/날짜|기간|나이|기념일|영업일|연차|근속/.test(s)) return "calendar";
  if (/수면|시간|근무시간/.test(s)) return "clock";
  if (/평수|면적|제곱미터|타일|바닥재|벽지/.test(s)) return "ruler";
  if (/페인트/.test(s)) return "paint";
  if (/이사|관리비|주거|집/.test(s)) return "home";
  if (/주유|연비|유류|연료/.test(s)) return "fuel";
  if (/전기차|충전/.test(s)) return "battery";
  if (/자동차|차량|주차|정비|감가/.test(s)) return "car";
  if (/할인|쿠폰|퍼센트|부가세|vat|세율|이자|금리|복리/.test(s)) return "percent";
  if (/쇼핑|단가|묶음|배송|직구|반품|환불|멤버십|구매/.test(s)) return "tag";
  if (/여행/.test(s)) return "travel";
  if (/체크|준비물/.test(s)) return "check";
  if (tool.category === "HOME") return "home";
  if (tool.category === "CAR") return "car";
  if (tool.category === "BUY") return "cart";
  if (tool.category === "WORK") return "briefcase";
  if (tool.category === "LIFE") return "calendar";
  return "money";
}

export default function ToolHeroIcon({ tool }: { tool: ToolDefinition }) {
  const type = pickIcon(tool);
  const common = { viewBox:"0 0 160 160", fill:"none", stroke:"currentColor", strokeWidth:3, strokeLinecap:"round" as const, strokeLinejoin:"round" as const };
  const icons: Record<IconType, React.ReactNode> = {
    money:<svg {...common}><rect x="31" y="45" width="98" height="70" rx="16"/><path d="M31 62h98M101 79h28"/><circle cx="104" cy="80" r="5"/><path d="M56 91c7 8 21 8 27 0 6-9-3-14-14-16-11-2-20-7-14-16 6-8 20-8 27 0M70 49v52"/></svg>,
    percent:<svg {...common}><circle cx="53" cy="53" r="17"/><circle cx="107" cy="107" r="17"/><path d="M116 38 44 122"/></svg>,
    calendar:<svg {...common}><rect x="31" y="38" width="98" height="91" rx="15"/><path d="M31 65h98M56 27v22M104 27v22"/><path d="M53 85h14M76 85h14M99 85h14M53 106h14M76 106h14"/></svg>,
    clock:<svg {...common}><circle cx="80" cy="80" r="51"/><path d="M80 49v34l24 14"/></svg>,
    home:<svg {...common}><path d="M25 76 80 31l55 45"/><path d="M38 67v61h84V67M65 128V91h30v37"/></svg>,
    ruler:<svg {...common}><path d="M35 112 103 44l22 22-68 68z"/><path d="m86 61 13 13M72 75l8 8M58 89l13 13M44 103l8 8"/></svg>,
    paint:<svg {...common}><path d="M42 39h65v42H42zM107 54h14v40H84v18"/><rect x="72" y="110" width="24" height="18" rx="4"/></svg>,
    car:<svg {...common}><path d="M31 92l9-28c3-9 10-14 20-14h42c10 0 17 5 20 14l8 28"/><path d="M25 91h110v26H25z"/><circle cx="48" cy="117" r="10"/><circle cx="112" cy="117" r="10"/><path d="M43 75h74"/></svg>,
    fuel:<svg {...common}><rect x="35" y="31" width="60" height="98" rx="8"/><path d="M45 43h40v28H45zM95 52h15l15 15v45c0 10-15 10-15 0V80"/><path d="M47 98h36"/></svg>,
    battery:<svg {...common}><rect x="29" y="54" width="96" height="55" rx="10"/><path d="M125 70h10v23h-10M74 66l-13 20h16l-9 17 27-27H79l8-10"/></svg>,
    cart:<svg {...common}><path d="M29 42h14l12 57h61l12-39H49"/><circle cx="65" cy="119" r="8"/><circle cx="108" cy="119" r="8"/></svg>,
    tag:<svg {...common}><path d="M31 70 74 31h48l7 7v48l-43 43z"/><circle cx="105" cy="55" r="7"/><path d="M55 94 99 50"/></svg>,
    briefcase:<svg {...common}><rect x="27" y="54" width="106" height="73" rx="12"/><path d="M61 54V43c0-7 5-12 12-12h14c7 0 12 5 12 12v11M27 77c31 18 75 18 106 0"/></svg>,
    salary:<svg {...common}><rect x="31" y="38" width="98" height="91" rx="13"/><path d="M48 62h64M48 82h40M48 102h29"/><circle cx="106" cy="101" r="17"/><path d="M99 101h14M106 94v14"/></svg>,
    travel:<svg {...common}><path d="M28 91h104M54 91l17-55h18l17 55M62 62h36"/><path d="m46 91-8 35M114 91l8 35"/></svg>,
    check:<svg {...common}><rect x="36" y="29" width="88" height="105" rx="13"/><path d="M58 58h42M58 82h42M58 106h28"/><path d="m48 58 5 5 9-11M48 82l5 5 9-11M48 106l5 5 9-11"/></svg>,
  };
  return <div className="tool-hero-icon" aria-hidden="true"><span className="tool-hero-icon-glow"/>{icons[type]}</div>;
}
