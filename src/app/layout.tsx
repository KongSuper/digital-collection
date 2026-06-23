import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "数字收藏馆",
  description: "收藏和展示各种有趣的东西",
};

/**
 * 根布局 —— 全站页面的外层框架
 * {children} 会被替换为当前页面的内容
 * flex + flex-col + min-h-screen 确保页面短的时候 footer 也在底部
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-white text-gray-900 antialiased flex flex-col">
        <Header />
        {/* flex-1 让 main 撑满剩余空间，把 footer 推到底部 */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
