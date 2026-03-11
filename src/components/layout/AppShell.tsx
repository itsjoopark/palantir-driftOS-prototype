"use client";

import { usePathname } from "next/navigation";
import TabBar from "./TabBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullscreen =
    pathname?.startsWith("/tonight/sleep") ||
    pathname?.startsWith("/onboarding");

  return (
    <>
      <TabBar />
      <main
        className={
          isFullscreen
            ? ""
            : "pb-20 lg:pb-0 lg:pl-64"
        }
      >
        <div className={isFullscreen ? "" : "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6"}>
          {children}
        </div>
      </main>
    </>
  );
}
