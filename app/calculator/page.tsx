import type { Metadata } from "next";
import Calculator from "@/components/tools/Calculator";

export const metadata: Metadata = {
  title: "Calculator - MyToolboxApp",
  description:
    "A clean, keyboard-friendly online calculator for basic arithmetic. Add, subtract, multiply, divide — fast and free.",
  keywords: ["online calculator", "basic calculator", "free calculator", "web calculator"],
};

export default function CalculatorPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Calculator</h1>
        <p className="text-gray-600 max-w-2xl">
          A clean basic calculator with full keyboard support. Use the number keys, operators,
          Enter for equals, and Escape to clear.
        </p>
      </div>
      <Calculator />
    </div>
  );
}
