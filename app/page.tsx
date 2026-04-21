import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";

export const metadata: Metadata = {
  title: "Free Online Tools - MyToolboxApp",
  description:
    "Free online tools for everyday calculations and conversions. Mortgage calculator, unit converter, basic calculator, and more — all in one place.",
  keywords: [
    "free online tools",
    "mortgage calculator",
    "unit converter",
    "basic calculator",
    "online calculator",
  ],
};

const tools = [
  {
    href: "/mortgage-calculator",
    icon: "🏠",
    name: "Mortgage Calculator",
    description:
      "Calculate monthly payments, total interest, and view an amortization schedule for any home loan.",
  },
  {
    href: "/unit-converter",
    icon: "📐",
    name: "Unit Converter",
    description:
      "Convert between length, weight, temperature, and volume units instantly.",
  },
  {
    href: "/calculator",
    icon: "🧮",
    name: "Calculator",
    description:
      "A clean, keyboard-friendly basic calculator for quick arithmetic.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Free Online Toolbox
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Fast, accurate, and easy-to-use tools for everyday calculations and
          conversions. No sign-up required — just open and use.
        </p>
      </section>

      {/* Tool grid */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Available Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
