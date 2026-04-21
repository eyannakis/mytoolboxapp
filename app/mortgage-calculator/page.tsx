import type { Metadata } from "next";
import MortgageCalculator from "@/components/tools/MortgageCalculator";

export const metadata: Metadata = {
  title: "Mortgage Calculator - MyToolboxApp",
  description:
    "Calculate monthly mortgage payments, total interest paid, and view an amortization schedule. Free online mortgage calculator — no sign-up required.",
  keywords: [
    "mortgage calculator",
    "monthly payment calculator",
    "home loan calculator",
    "amortization schedule",
    "mortgage payment",
  ],
};

export default function MortgageCalculatorPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Mortgage Calculator</h1>
        <p className="text-gray-600 max-w-2xl">
          Enter your home price, down payment, interest rate, and loan term to calculate your
          estimated monthly mortgage payment, total interest paid, and a 12-month amortization
          schedule. All calculations are performed locally in your browser.
        </p>
      </div>
      <MortgageCalculator />
    </div>
  );
}
