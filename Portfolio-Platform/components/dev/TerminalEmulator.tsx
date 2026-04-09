"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

const WELCOME = `\x1b[1;32mKing Hippopotamus\x1b[0m — web terminal preview\r\nType \x1b[33mhelp\x1b[0m · \x1b[33mstatus\x1b[0m · \x1b[33mclear\x1b[0m\r\n\r\n`;

export function TerminalEmulator({ compact }: { compact?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const line = useRef("");

  useEffect(() => {
    if (!host.current) return;
    const term = new Terminal({
      cursorBlink: true,
      fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
      fontSize: compact ? 12 : 13,
      theme: {
        background: "#0a0a0f",
        foreground: "#e2e8f0",
        cursor: "#00ff88",
        green: "#00ff88",
        yellow: "#f59e0b",
      },
    });
    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(host.current);
    fit.fit();
    term.write(WELCOME);
    term.write("$ ");

    const flushLine = () => {
      const cmd = line.current.trim();
      line.current = "";
      if (cmd === "help") {
        term.writeln(
          "Commands: help, status, projects, clear — wire Hippo-CLI backend for live execution.",
        );
      } else if (cmd === "status") {
        term.writeln("BFF: OK · GitHub: /api/github/repos · Vercel-ready");
      } else if (cmd === "projects") {
        term.writeln("Open Command Center or ⌘K to jump to a project.");
      } else if (cmd === "clear") {
        term.clear();
      } else if (cmd) {
        term.writeln(`Command not wired in-browser: ${cmd}`);
      }
      term.write("$ ");
    };

    const sub = term.onData((data) => {
      if (data === "\r") {
        term.write("\r\n");
        flushLine();
        return;
      }
      if (data === "\u007f") {
        if (line.current.length > 0) {
          line.current = line.current.slice(0, -1);
          term.write("\b \b");
        }
        return;
      }
      if (data.length === 1 && data >= " " && data <= "~") {
        line.current += data;
        term.write(data);
      }
    });

    termRef.current = term;
    const ro = new ResizeObserver(() => fit.fit());
    ro.observe(host.current);
    return () => {
      ro.disconnect();
      sub.dispose();
      term.dispose();
      termRef.current = null;
    };
  }, [compact]);

  return (
    <div
      className="h-full w-full overflow-hidden rounded-md border border-border bg-[#0a0a0f] p-1"
      ref={host}
    />
  );
}
