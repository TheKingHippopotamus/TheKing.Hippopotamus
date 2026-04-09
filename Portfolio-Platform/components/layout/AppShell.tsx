"use client";

import { useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { TerminalPanel } from "@/components/layout/TerminalPanel";
import { CommandPalette } from "@/components/search/CommandPalette";
import { useShellStore } from "@/lib/store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { commandOpen, setCommandOpen } = useShellStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(!useShellStore.getState().commandOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setCommandOpen]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1">{children}</main>
      </div>
      <TerminalPanel />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
