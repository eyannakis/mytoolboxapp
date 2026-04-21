"use client";

import { useState, useEffect } from "react";

type Category = "Length" | "Weight" | "Temperature" | "Volume";

interface UnitDef {
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const units: Record<Category, Record<string, UnitDef>> = {
  Length: {
    mm: { label: "Millimeters (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    cm: { label: "Centimeters (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    m: { label: "Meters (m)", toBase: (v) => v, fromBase: (v) => v },
    km: { label: "Kilometers (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    in: { label: "Inches (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ft: { label: "Feet (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    yd: { label: "Yards (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    mi: { label: "Miles (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  },
  Weight: {
    mg: { label: "Milligrams (mg)", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    g: { label: "Grams (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    kg: { label: "Kilograms (kg)", toBase: (v) => v, fromBase: (v) => v },
    t: { label: "Metric Tons (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    oz: { label: "Ounces (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    lb: { label: "Pounds (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    st: { label: "Stone (st)", toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
  },
  Temperature: {
    C: {
      label: "Celsius (°C)",
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    F: {
      label: "Fahrenheit (°F)",
      toBase: (v) => ((v - 32) * 5) / 9,
      fromBase: (v) => (v * 9) / 5 + 32,
    },
    K: {
      label: "Kelvin (K)",
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  },
  Volume: {
    ml: { label: "Milliliters (ml)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    l: { label: "Liters (L)", toBase: (v) => v, fromBase: (v) => v },
    m3: { label: "Cubic Meters (m³)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    tsp: { label: "Teaspoons (tsp)", toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
    tbsp: { label: "Tablespoons (tbsp)", toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
    floz: { label: "Fl. Ounces (fl oz)", toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
    cup: { label: "Cups (cup)", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    pt: { label: "Pints (pt)", toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
    qt: { label: "Quarts (qt)", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
    gal: { label: "Gallons (gal)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
  },
};

const defaultFromUnits: Record<Category, string> = {
  Length: "ft",
  Weight: "lb",
  Temperature: "F",
  Volume: "cup",
};

const defaultToUnits: Record<Category, string> = {
  Length: "m",
  Weight: "kg",
  Temperature: "C",
  Volume: "l",
};

function formatResult(n: number): string {
  if (Math.abs(n) >= 1e10 || (Math.abs(n) < 1e-4 && n !== 0)) {
    return n.toExponential(6);
  }
  // Up to 8 significant digits, trim trailing zeros
  const s = parseFloat(n.toPrecision(8)).toString();
  return s;
}

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("Length");
  const [fromUnit, setFromUnit] = useState(defaultFromUnits["Length"]);
  const [toUnit, setToUnit] = useState(defaultToUnits["Length"]);
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult("");
      return;
    }
    const from = units[category][fromUnit];
    const to = units[category][toUnit];
    if (!from || !to) {
      setResult("");
      return;
    }
    const base = from.toBase(val);
    const converted = to.fromBase(base);
    setResult(formatResult(converted));
  }, [inputValue, category, fromUnit, toUnit]);

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setFromUnit(defaultFromUnits[cat]);
    setToUnit(defaultToUnits[cat]);
    setInputValue("1");
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const categoryUnits = Object.entries(units[category]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        {/* Category selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(units) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* From */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categoryUnits.map(([key, def]) => (
                <option key={key} value={key}>
                  {def.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleSwap}
            className="text-gray-400 hover:text-blue-600 transition-colors text-xl"
            title="Swap units"
          >
            ⇅
          </button>
        </div>

        {/* To */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="flex gap-2">
            <div className="flex-1 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 font-semibold text-lg min-h-[42px]">
              {result !== "" ? result : "—"}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categoryUnits.map(([key, def]) => (
                <option key={key} value={key}>
                  {def.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary */}
        {result !== "" && inputValue !== "" && (
          <p className="text-sm text-gray-500 text-center">
            {inputValue} {units[category][fromUnit]?.label} ={" "}
            <span className="font-semibold text-gray-800">{result}</span>{" "}
            {units[category][toUnit]?.label}
          </p>
        )}
      </div>
    </div>
  );
}
