import type { Metadata } from "next";
import SiteHeader from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 생활도구",
  description: "생활도구의 개인정보 처리 원칙과 쿠키·광고·분석 도구 이용 기준을 안내합니다.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage(){return <><SiteHeader/><main><section className="info-hero"><div className="container"><span className="eyebrow">PRIVACY · 개인정보처리방침</span><h1>개인정보처리방침</h1><p>생활도구는 불필요한 개인정보 수집을 최소화하고, 회원가입 없이 주요 기능을 이용할 수 있도록 운영합니다.</p></div></section><section className="info-page"><div className="container info-layout"><article className="info-card"><h2>1. 기본 원칙</h2><p>생활도구의 계산기와 비교 도구는 원칙적으로 회원가입 없이 사용할 수 있으며, 사용자가 계산창에 입력한 값은 일반적인 도구 기능을 제공하기 위한 용도로만 처리됩니다.</p></article><article className="info-card"><h2>2. 자동으로 수집될 수 있는 정보</h2><p>서비스 이용 과정에서 브라우저 종류, 기기 정보, 접속 일시, 방문 페이지, 대략적인 이용 통계와 같은 비식별 또는 기술 정보가 자동으로 처리될 수 있습니다. 이는 서비스 안정성, 이용 통계, 오류 분석 및 품질 개선을 위해 사용될 수 있습니다.</p></article><article className="info-card"><h2>3. 쿠키 및 분석 도구</h2><p>서비스는 방문 통계와 사이트 개선을 위해 쿠키 또는 유사 기술을 사용할 수 있습니다. 브라우저 설정을 통해 쿠키 저장을 제한하거나 삭제할 수 있으며, 일부 기능이나 통계 수집 방식에 영향을 줄 수 있습니다.</p></article><article className="info-card"><h2>4. 광고 서비스</h2><p>향후 Google AdSense 등 제3자 광고 서비스가 사용될 수 있습니다. 광고 제공자는 관련 광고 제공과 측정을 위해 쿠키 또는 유사 기술을 사용할 수 있으며, 해당 정보의 처리는 각 광고 제공자의 정책을 따릅니다.</p></article><article className="info-card"><h2>5. 외부 링크</h2><p>생활도구에서 외부 사이트로 연결되는 경우 해당 사이트의 개인정보 처리 방식은 생활도구의 정책과 다를 수 있습니다. 외부 서비스 이용 시 해당 서비스의 개인정보처리방침을 확인해 주세요.</p></article><article className="info-card"><h2>6. 정책 변경</h2><p>서비스 기능이나 관련 법령, 운영 방식이 변경되는 경우 본 방침도 변경될 수 있습니다. 중요한 변경 사항은 본 페이지를 통해 안내합니다.</p><div className="info-note">시행일: 2026년 8월 25일</div></article></div></section></main></>}
