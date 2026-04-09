import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "King Hippopotamus — Command Center";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%)",
          color: "#e2e8f0",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#00ff88",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          King Hippopotamus
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>
          Command Center
        </div>
        <div style={{ fontSize: 24, color: "#94a3b8", marginTop: 24, maxWidth: 720 }}>
          Live portfolio · Human & AI agents · Next.js BFF on Vercel
        </div>
      </div>
    ),
    { ...size },
  );
}
