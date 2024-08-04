type Request = {
  interestRate: number;
  installmentAmount: number;
  loanAmount: number;
};

export function calculateInstallmentAmount({
  interestRate,
  installmentAmount,
  loanAmount,
}: Request) {
  const installment =
    Math.log(
      installmentAmount / (installmentAmount - loanAmount * interestRate),
    ) / Math.log(1 + interestRate);

  return Math.ceil(installment);
}
