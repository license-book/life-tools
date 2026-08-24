import type { Metadata } from "next";
import SiteHeader from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "이용약관 | 생활도구",
  description: "생활도구 서비스 이용 조건과 책임 범위를 안내합니다.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage(){return <><SiteHeader/><main><section className="info-hero"><div className="container"><span className="eyebrow">TERMS · 이용약관</span><h1>이용약관</h1><p>생활도구를 이용할 때 적용되는 기본적인 이용 조건과 서비스 책임 범위를 안내합니다.</p></div></section><section className="info-page"><div className="container info-layout"><article className="info-card"><h2>1. 서비스 목적</h2><p>생활도구는 일상에서 자주 필요한 계산, 비교, 체크 및 참고 정보를 무료로 제공하는 웹 서비스입니다.</p></article><article className="info-card"><h2>2. 이용 방법</h2><p>대부분의 기능은 회원가입 없이 이용할 수 있습니다. 사용자는 서비스의 정상적인 운영을 방해하거나 자동화된 방식으로 과도한 요청을 발생시키는 등 비정상적인 이용을 해서는 안 됩니다.</p></article><article className="info-card"><h2>3. 계산 결과의 성격</h2><p>서비스에서 제공하는 계산 결과와 설명은 사용자가 입력한 값과 일반적인 기준을 바탕으로 한 참고용 정보입니다. 실제 계약, 세금, 금융상품, 법률·노무 판단 등에서는 관련 기관의 최신 기준이나 전문가의 확인이 필요할 수 있습니다.</p></article><article className="info-card"><h2>4. 서비스 변경 및 중단</h2><p>서비스 품질 개선, 기능 개편, 시스템 점검 또는 외부 서비스 변경 등의 사유로 일부 기능이 변경되거나 일시적으로 중단될 수 있습니다.</p></article><article className="info-card"><h2>5. 콘텐츠와 이용 제한</h2><p>생활도구의 구성, 문구, 디자인 및 자체 제작 콘텐츠는 관련 법령이 허용하는 범위에서 보호됩니다. 서비스 내용을 무단으로 대량 복제하거나 재배포하는 행위는 제한될 수 있습니다.</p></article><article className="info-card"><h2>6. 책임의 범위</h2><p>생활도구는 합리적인 수준에서 정확한 계산과 설명을 제공하기 위해 노력하지만, 입력 오류, 제도 변경, 외부 데이터 변경 또는 개별 상황 차이로 인해 결과가 실제와 다를 수 있습니다. 중요한 의사결정에는 공식 자료를 함께 확인해 주세요.</p></article><article className="info-card"><h2>7. 약관 변경</h2><p>서비스 기능이나 운영 기준이 변경되는 경우 본 약관이 변경될 수 있으며, 변경된 내용은 본 페이지에 반영합니다.</p><div className="info-note">시행일: 2026년 8월 25일</div></article></div></section></main></>}
