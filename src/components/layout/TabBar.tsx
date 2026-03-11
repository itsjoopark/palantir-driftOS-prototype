"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, BarChart3, Settings } from "lucide-react";

const tabs = [
  { href: "/tonight", label: "Tonight", icon: Moon },
  { href: "/insights", label: "Insights", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export default function TabBar() {
  const pathname = usePathname();

  if (pathname?.startsWith("/tonight/sleep") || pathname?.startsWith("/onboarding")) {
    return null;
  }

  return (
    <>
      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-surface/80 backdrop-blur-xl border-t border-border">
          <div className="flex items-center justify-around h-16 px-4 max-w-lg mx-auto">
            {tabs.map((tab) => {
              const isActive =
                pathname === tab.href || pathname?.startsWith(tab.href + "/");
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 min-w-[64px] ${
                    isActive
                      ? "text-amber"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.2 : 1.5} />
                  <span className="text-[10px] font-medium tracking-wide">
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-surface/60 backdrop-blur-xl border-r border-border z-50">
        <div className="p-6 pb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center">
              <Moon size={16} className="text-amber" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              drift<span className="text-amber">OS</span>
            </span>
          </div>
        </div>
        <nav className="flex-1 p-4 pt-6 space-y-1">
          {tabs.map((tab) => {
            const isActive =
              pathname === tab.href || pathname?.startsWith(tab.href + "/");
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-amber-dim text-amber"
                    : "text-muted hover:text-foreground hover:bg-white/[0.03]"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.5} />
                <span className="text-sm font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-elevated flex items-center justify-center text-xs font-medium text-muted">
              JP
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Jules Park</p>
              <p className="text-xs text-muted truncate">Sleep profile active</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
