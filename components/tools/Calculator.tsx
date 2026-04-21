"use client";

import { useState, useEffect, useCallback } from "react";

type ButtonDef = {
  label: string;
  value: string;
  className?: string;
};

const buttons: ButtonDef[][] = [
  [
    { label: "AC", value: "AC", className: "bg-gray-400 text-white hover:bg-gray-500" },
    { label: "+/-", value: "NEG", className: "bg-gray-400 text-white hover:bg-gray-500" },
    { label: "%", value: "%", className: "bg-gray-400 text-white hover:bg-gray-500" },
    { label: "÷", value: "/", className: "bg-orange-400 text-white hover:bg-orange-500" },
  ],
  [
    { label: "7", value: "7", className: "bg-gray-700 text-white hover:bg-gray-600" },
    { label: "8", value: "8", className: "bg-gray-700 text-white hover:bg-gray-600" },
    { label: "9", value: "9", className: "bg-gray-700 text-white hover:bg-gray-600" },
    { label: "×", value: "*", className: "bg-orange-400 text-white hover:bg-orange-500" },
  ],
  [
    { label: "4", value: "4", className: "bg-gray-700 text-white hover:bg-gray-600" },
    { label: "5", value: "5", className: "bg-gray-700 text-white hover:bg-gray-600" },
    { label: "6", value: "6", className: "bg-gray-700 text-white hover:bg-gray-600" },
    { label: "−", value: "-", className: "bg-orange-400 text-white hover:bg-orange-500" },
  ],
  [
    { label: "1", value: "1", className: "bg-gray-700 text-white hover:bg-gray-600" },
    { label: "2", value: "2", className: "bg-gray-700 text-white hover:bg-gray-600" },
    { label: "3", value: "3", className: "bg-gray-700 text-white hover:bg-gray-600" },
    { label: "+", value: "+", className: "bg-orange-400 text-white hover:bg-orange-500" },
  ],
  [
    { label: "0", value: "0", className: "col-span-2 bg-gray-700 text-white hover:bg-gray-600" },
    { label: ".", value: ".", className: "bg-gray-700 text-white hover:bg-gray-600" },
    { label: "=", value: "=", className: "bg-orange-400 text-white hover:bg-orange-500" },
  ],
];

const MAX_DISPLAY_LEN = 15;

function safeEval(expr: string): string {
  try {
    // Replace display operators with JS operators
    const sanitized = expr.replace(/[^0-9+\-*/.%()]/g, "");
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${sanitized})`)();
    if (!isFinite(result)) return "Error";
    // Trim floating point noise
    const rounded = parseFloat(result.toPrecision(12));
    return String(rounded);
  } catch {
    return "Error";
  }
}

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [justEvaluated, setJustEvaluated] = useState(false);

  const handleInput = useCallback(
    (value: string) => {
      if (value === "AC") {
        setDisplay("0");
        setExpression("");
        setJustEvaluated(false);
        return;
      }

      if (value === "=") {
        if (expression === "") return;
        const fullExpr = expression + display;
        const result = safeEval(fullExpr);
        setExpression(fullExpr + " =");
        setDisplay(result);
        setJustEvaluated(true);
        return;
      }

      if (value === "NEG") {
        if (display === "0" || display === "Error") return;
        setDisplay((d) => (d.startsWith("-") ? d.slice(1) : "-" + d));
        return;
      }

      if (value === "%") {
        if (display === "Error") return;
        const val = parseFloat(display) / 100;
        setDisplay(String(val));
        return;
      }

      const isOperator = ["+", "-", "*", "/"].includes(value);

      if (isOperator) {
        if (display === "Error") return;
        if (justEvaluated) {
          // Chain from result
          setExpression(display + " " + value + " ");
          setDisplay("0");
          setJustEvaluated(false);
          return;
        }
        setExpression((expr) => {
          const base = expr + display + " " + value + " ";
          return base;
        });
        setDisplay("0");
        setJustEvaluated(false);
        return;
      }

      // Digit or decimal
      if (justEvaluated) {
        setExpression("");
        setDisplay(value === "." ? "0." : value);
        setJustEvaluated(false);
        return;
      }

      setDisplay((d) => {
        if (value === "." && d.includes(".")) return d;
        if (d === "0" && value !== ".") return value;
        if (d.replace("-", "").length >= MAX_DISPLAY_LEN) return d;
        return d + value;
      });
    },
    [display, expression, justEvaluated]
  );

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, string> = {
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "+": "+",
        "-": "-",
        "*": "*",
        "/": "/",
        ".": ".",
        "%": "%",
        Enter: "=",
        "=": "=",
        Backspace: "BACK",
        Escape: "AC",
      };
      const val = map[e.key];
      if (!val) return;
      if (val === "BACK") {
        setDisplay((d) => {
          if (d === "Error" || d.length <= 1) return "0";
          return d.slice(0, -1) || "0";
        });
        return;
      }
      handleInput(val);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleInput]);

  return (
    <div className="max-w-xs mx-auto">
      <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
        {/* Display */}
        <div className="px-5 pt-6 pb-4 text-right">
          <div className="text-gray-400 text-sm h-5 truncate">{expression}</div>
          <div
            className={`text-white font-light mt-1 truncate ${
              display.length > 10 ? "text-3xl" : "text-5xl"
            }`}
          >
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-px bg-gray-700 border-t border-gray-700">
          {buttons.map((row, ri) =>
            row.map((btn) => (
              <button
                key={`${ri}-${btn.value}`}
                onClick={() => handleInput(btn.value)}
                className={`${btn.className ?? ""} ${
                  btn.className?.includes("col-span-2") ? "col-span-2" : ""
                } py-5 text-xl font-medium transition-colors active:brightness-90`}
              >
                {btn.label}
              </button>
            ))
          )}
        </div>
      </div>
      <p className="text-center text-xs text-gray-400 mt-3">Keyboard shortcuts supported</p>
    </div>
  );
}
