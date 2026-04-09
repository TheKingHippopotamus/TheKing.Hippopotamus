"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { StationMeta } from "@/types/project";
import { getProjectsByStation } from "@/lib/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export function StationCard({
  station,
  index,
}: {
  station: StationMeta;
  index: number;
}) {
  const count = getProjectsByStation(station.slug).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
    >
      <Link href={`/station/${station.slug}`} className="group block h-full">
        <Card className="h-full border-border/80 bg-gradient-to-br from-card/90 to-card/40 transition-all hover:border-[var(--kh-green)]/40 hover:shadow-[0_0_0_1px_rgba(0,255,136,0.15)]">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base leading-snug">
                {station.title}
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="text-xs text-muted-foreground">{station.tagline}</p>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div
              className={`h-16 rounded-md bg-gradient-to-br ${station.accent} ring-1 ring-border/40`}
            />
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-[10px]">
                {count} projects
              </Badge>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                station
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
