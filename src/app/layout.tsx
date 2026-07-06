import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "カードアプリ",
  description: "E2Eリグレッションテスト ハンズオン用ダミーアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
