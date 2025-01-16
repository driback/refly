import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Geist_Mono } from "next/font/google";
import ThemeProvider from "~/components/providers/theme-provider";
import { Toaster } from "~/components/ui/sonner";

const geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 2,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(0, 0%, 100%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(240, 10%, 3.9%)" },
  ],
};

export const metadata: Metadata = {
  title: "Refly - Organize your bookmark",
  description: "A simple and elegant bookmark manager to declutter your web experience.",
  authors: [{ name: "driback", url: "https://github.com/driback" }],
  keywords: ["bookmark manager", "productivity", "organization", "web tools"],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster position="top-center" theme="dark" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
