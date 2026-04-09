import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AppShell } from "@/components/layout/AppShell";
import { getSiteUrl } from "@/lib/site-url";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "King Hippopotamus — Command Center",
    template: "%s · King Hippopotamus",
  },
  description:
    "Live portfolio command center: run projects, agents, and research tools in one surface. Next.js BFF on Vercel.",
  openGraph: {
    title: "King Hippopotamus — Command Center",
    description:
      "Live portfolio command center for Human & AI Agent operations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "King Hippopotamus — Command Center",
    description:
      "Live portfolio command center for Human & AI Agent operations.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} font-sans h-full antialiased`}
      >
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
