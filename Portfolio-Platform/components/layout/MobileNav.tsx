"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { STATIONS } from "@/lib/stations";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="md:hidden"
            aria-label="Open menu"
          />
        }
      >
        <Menu className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="font-mono text-sm">Navigate</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-col gap-1">
          <Link
            className="rounded-md px-3 py-2 text-sm hover:bg-muted"
            href="/"
          >
            Command Center
          </Link>
          {STATIONS.map((s) => (
            <Link
              key={s.slug}
              className="rounded-md px-3 py-2 text-sm hover:bg-muted"
              href={`/station/${s.slug}`}
            >
              {s.title}
            </Link>
          ))}
          <Link
            className="rounded-md px-3 py-2 text-sm hover:bg-muted"
            href="/terminal"
          >
            Full terminal
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
