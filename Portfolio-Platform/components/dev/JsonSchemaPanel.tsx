"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function inferSchema(obj: unknown): object {
  if (obj === null) return { type: "null" };
  if (Array.isArray(obj)) {
    const item = obj[0];
    return {
      type: "array",
      items: item !== undefined ? inferSchema(item) : {},
    };
  }
  const t = typeof obj;
  if (t === "object") {
    const props: Record<string, object> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      props[k] = inferSchema(v);
    }
    return { type: "object", properties: props, additionalProperties: false };
  }
  if (t === "string") return { type: "string" };
  if (t === "number") return { type: "number" };
  if (t === "boolean") return { type: "boolean" };
  return {};
}

export function JsonSchemaPanel() {
  const [text, setText] = useState(
    '{\n  "symbol": "KH",\n  "price": 42.5,\n  "tags": ["agents", "finance"]\n}',
  );
  const schema = useMemo(() => {
    try {
      const parsed = JSON.parse(text) as unknown;
      return JSON.stringify(
        { $schema: "https://json-schema.org/draft/2020-12/schema", ...inferSchema(parsed) },
        null,
        2,
      );
    } catch {
      return "// Invalid JSON";
    }
  }, [text]);

  return (
    <Card className="border-border/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-mono">
          JSON → inferred schema
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Sample JSON</p>
          <Textarea
            className="min-h-[240px] font-mono text-xs"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">Draft schema</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="font-mono text-[10px]"
              onClick={() =>
                navigator.clipboard.writeText(
                  schema.startsWith("//") ? "" : schema,
                )
              }
            >
              Copy
            </Button>
          </div>
          <pre className="max-h-[240px] overflow-auto rounded-md border border-border/60 bg-background/50 p-2 font-mono text-[11px]">
            {schema}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
