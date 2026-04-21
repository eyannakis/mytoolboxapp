import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mytoolboxapp.com"),
  title: {
    default: "Free Online Tools - MyToolboxApp",
    template: "%s | MyToolboxApp",
  },
  description:
    "Free online tools including mortgage calculator, unit converter, and basic calculator. Fast, accurate, and easy to use.",
  keywords: ["online tools", "free tools", "calculator", "unit converter", "mortgage calculator"],
  openGraph: {
    type: "website",
    siteName: "MyToolboxApp",
    url: "https://www.mytoolboxapp.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* TODO: Replace with your publisher ID to enable AdSense */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
        /> */}
      </head>
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
          {children}
          <div className="mt-10">
            <AdSlot slot="below-main" />
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
