"use client";

import { useEffect } from "react";
import { formatKoreanMoneyCompact } from "@/lib/tools/koreanMoney";

const MONEY_LABEL = /(금액|가격|비용|급여|임금|상여|보증금|월세|전세|매매가|대출|원금|예산|보험료|세금|요금|단가|유가|연봉|시급|주급|수당|매출|소득|지출|자산|부채|공과금|관리비|할인액|상품가|정비|주차비|통행료|유류비|청소비|설치비|원\s*\/|원\)|원$)/;

function labelText(input: HTMLInputElement) {
  const field = input.closest(".field");
  if (!field) return "";

  const label = field.querySelector("label");
  if (label?.textContent) return label.textContent.trim();

  if (input.id) {
    const linked = document.querySelector(`label[for="${CSS.escape(input.id)}"]`);
    if (linked?.textContent) return linked.textContent.trim();
  }

  return (input.getAttribute("aria-label") || input.name || "").trim();
}

function hasExistingMoneyHint(field: Element) {
  return Array.from(field.querySelectorAll(".field-help")).some((el) =>
    (el.textContent || "").trim().startsWith("한글 금액:")
  );
}

function ensureHint(input: HTMLInputElement) {
  if (input.type !== "number") return;
  const field = input.closest(".field");
  if (!field) return;

  const text = labelText(input);
  const shouldShow = MONEY_LABEL.test(text);
  const existing = field.querySelector<HTMLElement>("[data-auto-korean-money-hint]");

  if (!shouldShow) {
    existing?.remove();
    return;
  }

  if (hasExistingMoneyHint(field) && !existing) return;

  const value = Number(input.value);
  const display = `한글 금액: ${formatKoreanMoneyCompact(Number.isFinite(value) ? value : 0)}`;

  if (existing) {
    existing.textContent = display;
    return;
  }

  const hint = document.createElement("small");
  hint.className = "field-help auto-korean-money-hint";
  hint.dataset.autoKoreanMoneyHint = "true";
  hint.setAttribute("aria-live", "polite");
  hint.textContent = display;
  input.insertAdjacentElement("afterend", hint);
}

function scan(root: ParentNode = document) {
  root.querySelectorAll<HTMLInputElement>(".tool-layout .field input[type='number']").forEach(ensureHint);
}

export default function AutoKoreanMoneyHints() {
  useEffect(() => {
    scan();

    const onInput = (event: Event) => {
      if (event.target instanceof HTMLInputElement) ensureHint(event.target);
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches(".tool-layout, .field, input[type='number']")) scan(node.parentElement || node);
          else if (node.querySelector(".tool-layout, .field, input[type='number']")) scan(node);
        }
      }
    });

    document.addEventListener("input", onInput, true);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("input", onInput, true);
      observer.disconnect();
    };
  }, []);

  return null;
}
