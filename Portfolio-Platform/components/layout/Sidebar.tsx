"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STATIONS } from "@/lib/stations";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Radio, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShellStore } from "@/lib/store";

const links = [
  { href: "/", label: "Command Center", icon: LayoutDashboard },
  ...STATIONS.map((s) => ({
    href: `/station/${s.slug}`,
    label: s.title,
    icon: Radio,
  })),
  { href: "/terminal", label: "Full Terminal", icon: Terminal },
];

export function Sidebar() {
  const pathname = usePathname();
  const setTerminalOpen = useShellStore((s) => s.setTerminalOpen);

  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-card/40 md:flex">
      <div className="p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        King Hippopotamus
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-2 pb-4">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);
          return (
            <Link key={href} href={href}>
              <span
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-[var(--kh-green)]/15 text-[var(--kh-green)]"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0 opacity-80" />
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full font-mono text-xs"
          onClick={() => setTerminalOpen(true)}
        >
          Open terminal (`)
        </Button>
      </div>
    </aside>
  );
}
