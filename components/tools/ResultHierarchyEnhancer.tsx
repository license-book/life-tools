"use client";

import { useEffect } from "react";
import styles from "./ResultHierarchyEnhancer.module.css";

const numericStart = /^(.+?)\s+([-+]?\d[\d,]*(?:\.\d+)?(?:\s*[:→~\-]\s*[-+]?\d[\d,]*(?:\.\d+)?)?.*)$/;

function enhanceResultMain(element: HTMLElement) {
  if (element.querySelector(`:scope > .${styles.label}, :scope > .${styles.value}`)) return;

  const text = (element.textContent || "").trim();
  const match = text.match(numericStart);
  if (!match) return;

  const label = match[1].trim();
  const value = match[2].trim();
  if (!label || !value || label.length < 2) return;

  element.classList.add(styles.split);
  element.replaceChildren();

  const labelNode = document.createElement("span");
  labelNode.className = styles.label;
  labelNode.textContent = label;

  const valueNode = document.createElement("strong");
  valueNode.className = styles.value;
  valueNode.textContent = value;

  element.append(labelNode, valueNode);
}

function enhanceAll(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(".result-main").forEach(enhanceResultMain);
}

export default function ResultHierarchyEnhancer() {
  useEffect(() => {
    enhanceAll();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        const target = mutation.target instanceof HTMLElement ? mutation.target : mutation.target.parentElement;
        if (!target) continue;

        const resultMain = target.closest<HTMLElement>(".result-main");
        if (resultMain) enhanceResultMain(resultMain);

        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(".result-main")) enhanceResultMain(node);
          enhanceAll(node);
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
