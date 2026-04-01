import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PyFinance — 數金 MA 面試 Python 衝刺",
  description: "專為銀行數位金融 MA 面試設計的 Python 教學網站，1-2 週速成數據分析技能",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
