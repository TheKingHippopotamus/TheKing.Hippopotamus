"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PdfToMarkdownPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState<string | null>(null);

  return (
    <Card className="border-border/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-mono">PDF → Markdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Client-side UI shell. Point{" "}
          <code className="rounded bg-muted px-1">PROJECT_API_PDF2MARKDOWN</code>{" "}
          or a dedicated route action at your converter service.
        </p>
        <Input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            setNote(null);
            setFile(e.target.files?.[0] ?? null);
          }}
        />
        <Button
          type="button"
          disabled={!file}
          onClick={() =>
            setNote(
              file
                ? `Queued locally: ${file.name} (${Math.round(file.size / 1024)} KB) — connect BFF to PDF2Markdown_Converter.`
                : null,
            )
          }
        >
          Simulate convert
        </Button>
        {note && (
          <pre className="whitespace-pre-wrap rounded-md border border-border/60 bg-muted/30 p-2 font-mono text-[11px] text-[var(--kh-amber)]">
            {note}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}
