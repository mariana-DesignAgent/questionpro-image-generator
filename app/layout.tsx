import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuestionPro Image Generator",
  description: "Generate on-brand images for QuestionPro",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}