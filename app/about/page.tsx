import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "서비스 소개 | 생활도구",
  description: "생활도구 서비스의 목적, 운영 원칙, 제공 기능과 이용 기준을 안내합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage(){return <><SiteHeader/><main><section className="info-hero"><div className="container"><span className="eyebrow">ABOUT · 서비스 소개</span><h1>생활에 필요한 계산과 비교를 더 간단하게</h1><p>생활도구는 회원가입 없이 바로 사용할 수 있는 계산·비교·체크 도구를 한곳에 모아 제공하는 무료 생활도구 서비스입니다.</p></div></section><section className="info-page"><div className="container info-layout"><article className="info-card"><h2>생활도구가 제공하는 것</h2><p>돈과 금융, 집과 주거, 자동차, 쇼핑, 직장·업무, 일상생활에서 반복적으로 필요한 계산을 빠르게 처리할 수 있도록 도구를 제공합니다.</p><ul><li>대출, 이자, 예적금, 세금 등 금융 계산</li><li>면적, 인테리어 자재, 이사·생활비 계산</li><li>주유비, 연비, 할부, 유지비 등 자동차 계산</li><li>할인, 단가, 배송비, 직구 등 쇼핑 비교</li><li>급여, 수당, 연차, 근무시간 등 직장 도구</li><li>날짜, 나이, 수면, 여행 준비 등 생활 도구</li></ul></article><article className="info-card"><h2>운영 원칙</h2><p>가능한 한 입력값과 계산 기준을 함께 보여주고, 결과만 제시하기보다 사용자가 계산 과정을 이해할 수 있도록 설명합니다.</p><p>회원가입이나 불필요한 개인정보 입력 없이 바로 사용할 수 있도록 설계하며, 결과를 인쇄하거나 저장할 수 있는 기능도 도구 성격에 맞게 제공합니다.</p></article><article className="info-card"><h2>계산 결과 이용 시 참고사항</h2><p>생활도구의 계산 결과는 사용자가 입력한 값과 일반적인 계산 기준을 바탕으로 제공되는 참고용 정보입니다. 법률·세무·금융·노무 등 전문적인 판단이 필요한 경우에는 관련 기관이나 전문가의 최신 기준을 함께 확인해 주세요.</p><div className="info-links"><Link href="/privacy">개인정보처리방침</Link><Link href="/terms">이용약관</Link><Link href="/contact">문의 안내</Link></div></article></div></section></main></>}
