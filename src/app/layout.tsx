import type { Metadata } from "next";
import { Outfit, PT_Serif } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Techware Lab",
  description: "A focused, animation-driven build test.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${ptSerif.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
