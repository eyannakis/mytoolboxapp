import Link from "next/link";

interface ToolCardProps {
  href: string;
  icon: string;
  name: string;
  description: string;
}

export default function ToolCard({ href, icon, name, description }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block border border-gray-200 rounded-xl p-6 bg-white hover:border-blue-300 hover:shadow-md transition-all"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
        {name}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </Link>
  );
}
