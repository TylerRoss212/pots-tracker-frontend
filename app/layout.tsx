import type { Metadata } from "next";
import { Sono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const font = Sono({ subsets: ["latin"], display: 'swap', adjustFontFallback: false });

export const metadata: Metadata = {
  title: "POTS Tracker",
  description: "Track POTS fainting episodes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <SessionProvider>
                <body className={font.className}>{children}</body>
            </SessionProvider>
        </html>
    );
}