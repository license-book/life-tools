"use client";

import { useEffect } from "react";

const clearedInputs = new WeakSet<HTMLInputElement>();

function restoreBlank(input: HTMLInputElement) {
  if (!clearedInputs.has(input)) return;
  if (input.value === "0") input.value = "";
}

export default function ClearableNumberInputs() {
  useEffect(() => {
    const onInput = (event: Event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.type !== "number") return;

      if (input.value === "") {
        clearedInputs.add(input);
        queueMicrotask(() => restoreBlank(input));
        requestAnimationFrame(() => restoreBlank(input));
        window.setTimeout(() => restoreBlank(input), 0);
      } else {
        clearedInputs.delete(input);
      }
    };

    const onFocusOut = (event: FocusEvent) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.type !== "number") return;
      if (clearedInputs.has(input)) requestAnimationFrame(() => restoreBlank(input));
    };

    document.addEventListener("input", onInput, true);
    document.addEventListener("focusout", onFocusOut, true);

    return () => {
      document.removeEventListener("input", onInput, true);
      document.removeEventListener("focusout", onFocusOut, true);
    };
  }, []);

  return null;
}
