"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/insights/debrief", label: "Debrief" },
  { href: "/insights/weekly", label: "Weekly" },
  { href: "/insights/brain-drain", label: "Brain Drain" },
];

export default function InsightsNav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-1 bg-surface rounded-xl p-1 mb-6">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex-1 text-center py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              isActive
                ? "bg-card text-foreground shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
