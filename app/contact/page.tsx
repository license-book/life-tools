import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "문의 | 생활도구",
  description: "생활도구 오류 제보, 개선 의견, 콘텐츠 관련 문의 안내입니다.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage(){return <><SiteHeader/><main><section className="info-hero"><div className="container"><span className="eyebrow">CONTACT · 문의</span><h1>생활도구 이용 문의</h1><p>계산 결과 오류, 기능 개선 의견, 페이지 이용 중 발견한 문제 등에 대한 문의 안내입니다.</p></div></section><section className="info-page"><div className="container info-layout"><article className="info-card"><h2>문의 전에 확인해 주세요</h2><ul><li>계산 결과는 입력값과 일반적인 기준을 바탕으로 한 참고용 정보입니다.</li><li>세금·금융·법률·노무 등 개인 상황에 대한 전문 상담은 제공하지 않습니다.</li><li>오류를 제보할 때는 사용한 도구 이름, 입력값, 예상한 결과와 실제 결과를 함께 정리하면 확인에 도움이 됩니다.</li></ul></article><article className="info-card"><h2>문의할 수 있는 내용</h2><ul><li>계산식 또는 결과 표시 오류</li><li>모바일·PC 화면 깨짐이나 사용성 문제</li><li>새로운 생활도구 제안</li><li>콘텐츠 수정 요청</li><li>서비스 운영 및 정책 관련 문의</li></ul></article><article className="info-card"><h2>연락 안내</h2><p>현재 생활도구는 별도의 회원 계정이나 개인정보 입력형 문의 폼을 운영하지 않습니다. 공개 문의 채널은 정식 운영 환경 확정 후 이 페이지에 안내할 예정입니다.</p><p>그 전까지는 서비스 이용에 필요한 안내를 사이트 내 정책 페이지와 각 도구의 설명·FAQ를 통해 제공하고 있습니다.</p><div className="info-links"><Link href="/about">서비스 소개</Link><Link href="/privacy">개인정보처리방침</Link><Link href="/terms">이용약관</Link></div></article></div></section></main></>}
