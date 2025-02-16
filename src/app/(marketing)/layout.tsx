import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"], // Optimized for performance
  variable: "--font-inter", // Optional: CSS variable for easier use
  display: "swap", // Ensures better rendering behavior
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify font weights needed
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OnePager",
  description: "All the one page summary in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
