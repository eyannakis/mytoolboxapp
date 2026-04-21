import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          MyToolboxApp
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/mortgage-calculator" className="hover:text-gray-900 transition-colors">
            Mortgage Calc
          </Link>
          <Link href="/unit-converter" className="hover:text-gray-900 transition-colors">
            Unit Converter
          </Link>
          <Link href="/calculator" className="hover:text-gray-900 transition-colors">
            Calculator
          </Link>
        </nav>
      </div>
    </header>
  );
}
