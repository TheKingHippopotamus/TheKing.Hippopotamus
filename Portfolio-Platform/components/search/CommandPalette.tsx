"use client";

import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { STATIONS } from "@/lib/stations";
import { PROJECTS } from "@/lib/projects";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();

  const run = (fn: () => void) => {
    onOpenChange(false);
    fn();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Jump to station or project…" />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => run(() => router.push("/"))}
            keywords={["home", "command", "center"]}
          >
            Command Center
          </CommandItem>
          <CommandItem
            onSelect={() => run(() => router.push("/terminal"))}
            keywords={["cli", "shell"]}
          >
            Full terminal
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Stations">
          {STATIONS.map((s) => (
            <CommandItem
              key={s.slug}
              onSelect={() => run(() => router.push(`/station/${s.slug}`))}
              keywords={[s.title, s.slug]}
            >
              {s.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Projects">
          {PROJECTS.map((p) => (
            <CommandItem
              key={p.slug}
              onSelect={() =>
                run(() => router.push(`/station/${p.station}?p=${p.slug}`))
              }
              keywords={[p.name, p.githubRepo, p.slug]}
            >
              <span className="truncate">{p.name}</span>
              <span className="ml-2 text-[10px] text-muted-foreground">
                {p.station}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
