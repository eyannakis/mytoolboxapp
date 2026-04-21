"use client";

import { useState, useCallback } from "react";

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

function calculateMortgage(
  homePrice: number,
  downPayment: number,
  annualRate: number,
  termYears: number
) {
  const principal = homePrice - downPayment;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = termYears * 12;

  if (principal <= 0 || annualRate <= 0 || termYears <= 0) return null;

  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;

  // Build first 12 months of amortization
  const schedule: AmortizationRow[] = [];
  let balance = principal;
  for (let month = 1; month <= Math.min(12, numPayments); month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance),
    });
  }

  return { monthlyPayment, totalPayment, totalInterest, principal, schedule };
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 2 }).format(n);

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("500000");
  const [downPayment, setDownPayment] = useState("100000");
  const [interestRate, setInterestRate] = useState("5.0");
  const [termYears, setTermYears] = useState("25");
  const [showAmortization, setShowAmortization] = useState(false);

  const result = useCallback(() => {
    return calculateMortgage(
      parseFloat(homePrice) || 0,
      parseFloat(downPayment) || 0,
      parseFloat(interestRate) || 0,
      parseInt(termYears) || 0
    );
  }, [homePrice, downPayment, interestRate, termYears])();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Price ($)
            </label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Down Payment ($)
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Term (Years)
            </label>
            <select
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[5, 10, 15, 20, 25, 30].map((y) => (
                <option key={y} value={y}>
                  {y} years
                </option>
              ))}
            </select>
          </div>
        </div>

        {result ? (
          <div className="border-t border-gray-100 pt-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
                  Monthly Payment
                </p>
                <p className="text-2xl font-bold text-blue-700">
                  {fmt(result.monthlyPayment)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                  Total Payment
                </p>
                <p className="text-xl font-semibold text-gray-800">
                  {fmt(result.totalPayment)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                  Total Interest
                </p>
                <p className="text-xl font-semibold text-gray-800">
                  {fmt(result.totalInterest)}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAmortization((v) => !v)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              {showAmortization ? "Hide" : "Show"} amortization schedule (first 12 months)
            </button>

            {showAmortization && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-200">
                      <th className="pb-2 pr-4 font-medium">Month</th>
                      <th className="pb-2 pr-4 font-medium">Payment</th>
                      <th className="pb-2 pr-4 font-medium">Principal</th>
                      <th className="pb-2 pr-4 font-medium">Interest</th>
                      <th className="pb-2 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row) => (
                      <tr key={row.month} className="border-b border-gray-100 text-gray-700">
                        <td className="py-1.5 pr-4">{row.month}</td>
                        <td className="py-1.5 pr-4">{fmt(row.payment)}</td>
                        <td className="py-1.5 pr-4">{fmt(row.principal)}</td>
                        <td className="py-1.5 pr-4">{fmt(row.interest)}</td>
                        <td className="py-1.5">{fmt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            Enter valid values above to see results.
          </p>
        )}
      </div>
    </div>
  );
}
