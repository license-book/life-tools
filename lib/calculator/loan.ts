export type RepaymentMethod = "equal-payment" | "equal-principal";

export type LoanInput = {
  principal: number;
  annualRate: number;
  months: number;
  method: RepaymentMethod;
};

export type LoanRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export type LoanResult = {
  monthlyFirstPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: LoanRow[];
};

const roundWon = (value: number) => Math.round(value);

export function calculateLoan(input: LoanInput): LoanResult {
  const { principal, annualRate, months, method } = input;
  if (principal <= 0 || annualRate < 0 || months <= 0) {
    return { monthlyFirstPayment: 0, totalPayment: 0, totalInterest: 0, schedule: [] };
  }

  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  const schedule: LoanRow[] = [];

  if (method === "equal-payment") {
    const payment = monthlyRate === 0
      ? principal / months
      : principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);

    for (let month = 1; month <= months; month += 1) {
      const interest = balance * monthlyRate;
      const principalPart = month === months ? balance : Math.min(payment - interest, balance);
      const actualPayment = principalPart + interest;
      balance = Math.max(0, balance - principalPart);
      schedule.push({
        month,
        payment: roundWon(actualPayment),
        principal: roundWon(principalPart),
        interest: roundWon(interest),
        balance: roundWon(balance),
      });
    }
  } else {
    const principalPartBase = principal / months;
    for (let month = 1; month <= months; month += 1) {
      const interest = balance * monthlyRate;
      const principalPart = month === months ? balance : Math.min(principalPartBase, balance);
      const actualPayment = principalPart + interest;
      balance = Math.max(0, balance - principalPart);
      schedule.push({
        month,
        payment: roundWon(actualPayment),
        principal: roundWon(principalPart),
        interest: roundWon(interest),
        balance: roundWon(balance),
      });
    }
  }

  const totalPayment = schedule.reduce((sum, row) => sum + row.payment, 0);
  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);

  return {
    monthlyFirstPayment: schedule[0]?.payment ?? 0,
    totalPayment,
    totalInterest,
    schedule,
  };
}
