import Link from 'next/link';

// 导航链接 —— 写在这一个地方，全站所有页面的顶部导航都会一致
const navItems = [
  { href: '/', label: '首页' },
  { href: '/collections', label: '藏馆' },
  { href: '/posts', label: '随笔' },
  { href: '/about', label: '关于' },
  { href: '/search', label: '搜索' },
];

/**
 * 全站顶部导航栏
 * Link 组件是 Next.js 内置的，比 <a> 标签更快（页面不需要完全刷新）
 */
export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <nav className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 左侧：网站名，点击回首页 */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          数字收藏馆
        </Link>
        {/* 右侧：导航链接列表 */}
        <ul className="flex gap-6 text-sm text-gray-600">
          {navItems.map(item => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-gray-900 transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
