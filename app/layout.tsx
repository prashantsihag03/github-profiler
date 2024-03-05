import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s | Github Profiler", default: "Github Profiler" },
  description:
    "The Github Profile for creating a visually appealing view of your Github profile with added stats and charts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "black" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
