import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import ThemeProvider from "~/components/providers/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";

const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookmark - Organize your web",
  description: "A simple and elegant bookmark manager to declutter your web experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
