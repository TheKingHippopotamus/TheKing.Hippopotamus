"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TerminalEmulator } from "@/components/dev/TerminalEmulator";

export default function TerminalPage() {
  return (
    <div className="mx-auto flex max-w-[1000px] flex-col gap-3 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "font-mono text-xs",
          )}
        >
          ← Command Center
        </Link>
        <h1 className="font-mono text-sm text-muted-foreground">
          Full terminal · also press ` from anywhere
        </h1>
      </div>
      <div className="h-[min(80vh,640px)] w-full">
        <TerminalEmulator />
      </div>
    </div>
  );
}
