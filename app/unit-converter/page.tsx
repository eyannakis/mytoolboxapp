import type { Metadata } from "next";
import UnitConverter from "@/components/tools/UnitConverter";

export const metadata: Metadata = {
  title: "Unit Converter - MyToolboxApp",
  description:
    "Convert length, weight, temperature, and volume units instantly. Supports metric and imperial units. Free online unit converter.",
  keywords: [
    "unit converter",
    "length converter",
    "weight converter",
    "temperature converter",
    "volume converter",
    "metric to imperial",
  ],
};

export default function UnitConverterPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Unit Converter</h1>
        <p className="text-gray-600 max-w-2xl">
          Instantly convert between length, weight, temperature, and volume units. Choose a
          category, select your units, and type a value to see the conversion in real time.
        </p>
      </div>
      <UnitConverter />
    </div>
  );
}
