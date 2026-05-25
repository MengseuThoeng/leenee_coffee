import type { Metadata } from "next";
import { Geist, Geist_Mono, Moul, Noto_Sans_Khmer } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { GoeyToaster } from "@/components/ui/goey-toaster";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const moul = Moul({
  weight: "400",
  variable: "--font-moul",
  subsets: ["khmer"],
});

const notoSansKhmer = Noto_Sans_Khmer({
  variable: "--font-noto-sans-khmer",
  subsets: ["khmer"],
});

export const metadata: Metadata = {
  title: "Leenee Coffee - Menu",
  description: "Discover our premium coffee, tea, and pastries menu. Crafted with passion, served with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${moul.variable} ${notoSansKhmer.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          {children}
          <GoeyToaster />
        </LanguageProvider>
      </body>
    </html>
  );
}

