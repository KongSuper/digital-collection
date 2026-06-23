/**
 * 全站底部
 * 当前年份通过 new Date() 动态获取，不用手动更新
 */
export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-20">
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-sm text-gray-400">
        <p>数字收藏馆 &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
