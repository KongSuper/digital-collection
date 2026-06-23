import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "数字收藏馆",
  description: "收藏和展示各种有趣的东西",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
