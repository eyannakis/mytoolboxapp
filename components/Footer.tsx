import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2025 MyToolboxApp.com. All rights reserved.</p>
          <nav className="flex items-center gap-5 text-sm text-gray-500">
            <Link href="/mortgage-calculator" className="hover:text-gray-900 transition-colors">
              Mortgage Calculator
            </Link>
            <Link href="/unit-converter" className="hover:text-gray-900 transition-colors">
              Unit Converter
            </Link>
            <Link href="/calculator" className="hover:text-gray-900 transition-colors">
              Calculator
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
