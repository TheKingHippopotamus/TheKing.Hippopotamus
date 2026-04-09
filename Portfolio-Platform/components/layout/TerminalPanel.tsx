"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useShellStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TerminalEmulator = dynamic(
  () =>
    import("@/components/dev/TerminalEmulator").then((m) => m.TerminalEmulator),
  { ssr: false, loading: () => <div className="p-4 font-mono text-sm text-muted-foreground">Loading terminal…</div> },
);

export function TerminalPanel() {
  const { terminalOpen, setTerminalOpen } = useShellStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.metaKey && !e.ctrlKey) {
        const t = e.target as HTMLElement;
        if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") return;
        e.preventDefault();
        useShellStore.getState().toggleTerminal();
      }
      if (e.key === "Escape") setTerminalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setTerminalOpen]);

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-[#0a0a0f]/95 backdrop-blur-md shadow-[0_-8px_40px_rgba(0,255,136,0.08)]"
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 border-b border-border/60 px-3 py-2">
            <div className="font-mono text-xs text-[var(--kh-green)]">
              hippo-term — press ` to toggle · Esc to close
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="h-8 w-8"
              onClick={() => setTerminalOpen(false)}
              aria-label="Close terminal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mx-auto h-[min(40vh,420px)] max-w-[1400px] p-2">
            <TerminalEmulator compact />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
