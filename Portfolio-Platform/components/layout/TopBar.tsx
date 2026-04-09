"use client";

import { StatusTicker } from "@/components/dashboard/StatusTicker";
import { Button } from "@/components/ui/button";
import { useShellStore } from "@/lib/store";
import { Search } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";

export function TopBar() {
  const setCommandOpen = useShellStore((s) => s.setCommandOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-12 items-center gap-3 px-3 md:px-4">
        <MobileNav />
        <Link
          href="/"
          className="hidden shrink-0 font-mono text-xs font-semibold text-[var(--kh-green)] sm:block"
        >
          KH·CC
        </Link>
        <div className="min-w-0 flex-1 overflow-hidden">
          <StatusTicker />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0 gap-2 font-mono text-xs"
          onClick={() => setCommandOpen(true)}
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] sm:inline">
            ⌘K
          </kbd>
        </Button>
      </div>
    </header>
  );
}
