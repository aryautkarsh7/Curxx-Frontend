import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EmergencyProvider } from "@/components/EmergencyModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Curxx Healthcare | Clinical Precision & Warm Trust",
  description: "Consult India's Top Doctors Online, in 60 Seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface-container-lowest text-on-surface font-body-default text-body-default selection:bg-surface-variant selection:text-primary min-h-screen flex flex-col">
        <EmergencyProvider>{children}</EmergencyProvider>
      </body>
    </html>
  );
}
