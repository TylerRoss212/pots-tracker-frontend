import type { Metadata } from "next";
import { Sono } from "next/font/google";
import "./globals.css";

const font = Sono({ subsets: ["latin"] });

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
            <body className={font.className}>{children}</body>
        </html>
    );
}
