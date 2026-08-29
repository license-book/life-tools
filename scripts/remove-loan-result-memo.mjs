import fs from 'node:fs';
const path='components/tools/LoanCalculator.tsx';
let s=fs.readFileSync(path,'utf8');
const from=`  const equalPayment = useMemo(
    () => calculateLoan({ principal: applied.principal, annualRate: applied.annualRate, months, method: "equal-payment" }),
    [applied.principal, applied.annualRate, months],
  );
  const equalPrincipal = useMemo(
    () => calculateLoan({ principal: applied.principal, annualRate: applied.annualRate, months, method: "equal-principal" }),
    [applied.principal, applied.annualRate, months],
  );
`;
const to=`  const equalPayment = calculateLoan({ principal: applied.principal, annualRate: applied.annualRate, months, method: "equal-payment" });
  const equalPrincipal = calculateLoan({ principal: applied.principal, annualRate: applied.annualRate, months, method: "equal-principal" });
`;
if(!s.includes(from)) throw new Error('memo result block not found');
s=s.replace(from,to);
fs.writeFileSync(path,s);
console.log('Removed memoization from loan result calculation.');
