import fs from 'node:fs';

const path = 'components/tools/LoanCalculator.tsx';
let s = fs.readFileSync(path, 'utf8');

function replaceExact(from, to, label) {
  if (!s.includes(from)) throw new Error(`missing source block: ${label}`);
  s = s.replace(from, to);
}

replaceExact(
`const initialMonths = initialForm.years * 12;
const initialEqualPayment = calculateLoan({ principal: initialForm.principal, annualRate: initialForm.annualRate, months: initialMonths, method: "equal-payment" });
const initialEqualPrincipal = calculateLoan({ principal: initialForm.principal, annualRate: initialForm.annualRate, months: initialMonths, method: "equal-principal" });

`,
'',
'initial stored results',
);

replaceExact(
`  const [calculation, setCalculation] = useState({
    inputs: initialForm,
    equalPayment: initialEqualPayment,
    equalPrincipal: initialEqualPrincipal,
  });
  const applied = calculation.inputs;
`,
`  const [applied, setApplied] = useState<LoanFormState>(initialForm);
`,
'calculation state',
);

replaceExact(
`  const { equalPayment, equalPrincipal } = calculation;
`,
`  const equalPayment = useMemo(
    () => calculateLoan({ principal: applied.principal, annualRate: applied.annualRate, months, method: "equal-payment" }),
    [applied.principal, applied.annualRate, months],
  );
  const equalPrincipal = useMemo(
    () => calculateLoan({ principal: applied.principal, annualRate: applied.annualRate, months, method: "equal-principal" }),
    [applied.principal, applied.annualRate, months],
  );
`,
'result derivation',
);

replaceExact(
`    const nextMonths = Math.max(1, Math.round(next.years * 12));
    const nextEqualPayment = calculateLoan({ principal: next.principal, annualRate: next.annualRate, months: nextMonths, method: "equal-payment" });
    const nextEqualPrincipal = calculateLoan({ principal: next.principal, annualRate: next.annualRate, months: nextMonths, method: "equal-principal" });
    setCalculation({ inputs: next, equalPayment: nextEqualPayment, equalPrincipal: nextEqualPrincipal });
    setDraft(next);
`,
`    setApplied(next);
    setDraft(next);
`,
'calculate handler',
);

replaceExact(
`    setCalculation((current) => ({ ...current, inputs: { ...current.inputs, method: nextMethod } }));
`,
`    setApplied((current) => ({ ...current, method: nextMethod }));
`,
'method selection',
);

if (s.includes('setCalculation(') || s.includes('calculation.inputs') || s.includes('initialEqualPayment')) {
  throw new Error('loan stale-result state cleanup incomplete');
}
fs.writeFileSync(path, s);
console.log('Patched loan calculator: results are derived only from applied input state.');
