"use client";

import { useEffect, useRef, useState, type InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> & {
  value: number;
  onValueChange: (value: number) => void;
};

export default function DraftNumberInput({ value, onValueChange, onFocus, onBlur, ...props }: Props) {
  const [draft, setDraft] = useState(String(value));
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setDraft(String(value));
  }, [value]);

  return (
    <input
      {...props}
      type="number"
      value={draft}
      onFocus={(event) => {
        focused.current = true;
        onFocus?.(event);
      }}
      onBlur={(event) => {
        focused.current = false;
        onBlur?.(event);
      }}
      onChange={(event) => {
        const next = event.target.value;
        setDraft(next);
        onValueChange(next === "" ? 0 : Number(next));
      }}
    />
  );
}
