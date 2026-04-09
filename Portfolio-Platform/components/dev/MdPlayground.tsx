"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SAMPLE = `# MD-Spawn style preview

**Bold** · *italic* · [link](https://github.com/TheKingHippopotamus)

| Col | Val |
|-----|-----|
| BFF | Next.js |
| UI  | shadcn |

\`\`\`ts
const king = "hippo";
\`\`\`
`;

export function MdPlayground() {
  const [md, setMd] = useState(SAMPLE);

  return (
    <Card className="border-border/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-mono">
          Markdown → HTML (live)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="split">
          <TabsList className="mb-2">
            <TabsTrigger value="split">Split</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="split" className="grid gap-3 md:grid-cols-2">
            <Textarea
              className="min-h-[220px] font-mono text-xs"
              value={md}
              onChange={(e) => setMd(e.target.value)}
            />
            <div className="prose prose-invert max-w-none rounded-md border border-border/60 bg-background/50 p-3 text-sm prose-headings:text-foreground prose-a:text-[var(--kh-green)]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
            </div>
          </TabsContent>
          <TabsContent value="edit">
            <Textarea
              className="min-h-[320px] font-mono text-xs"
              value={md}
              onChange={(e) => setMd(e.target.value)}
            />
          </TabsContent>
          <TabsContent value="preview">
            <div className="prose prose-invert max-w-none rounded-md border border-border/60 bg-background/50 p-4 text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
