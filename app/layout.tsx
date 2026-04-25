import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/src/helpers/providers/Providers";

export const metadata: Metadata = {
  title: "Shohoj Path | Evabe Jan",
  description:
    "AI-powered, community-driven task navigation for real-world services in Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        suppressHydrationWarning={true}
        data-lt-installed={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
