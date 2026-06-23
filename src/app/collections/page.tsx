import Link from 'next/link';
import { getCategories, getAllTags } from '@/lib/content';
import TagList from '@/components/TagList';

/**
 * 藏馆分类总览页 (/collections)
 * 显示所有分类入口卡片 + 底部标签云
 */
export default function CollectionsPage() {
  const categories = getCategories();
  const tags = getAllTags();

  // 给不同分类配上不同的渐变色，视觉上区分
  const categoryColors: Record<string, string> = {
    css: 'from-pink-50 to-rose-50 border-pink-100',
    projects: 'from-blue-50 to-cyan-50 border-blue-100',
    'mini-apps': 'from-green-50 to-emerald-50 border-green-100',
  };
  const defaultColor = 'from-gray-50 to-slate-50 border-gray-100';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">藏馆</h1>
      <p className="text-gray-600 mb-10">按分类浏览所有收藏</p>

      {/* ===== 分类入口卡片（用文件夹名作为分类名） ===== */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-14">
        {categories.map(cat => (
          <Link
            key={cat.name}
            href={`/collections/${cat.name}`}
            className={`p-6 rounded-xl bg-gradient-to-br border hover:shadow-md transition-shadow ${categoryColors[cat.name] || defaultColor}`}
          >
            <h2 className="text-xl font-semibold capitalize">{cat.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{cat.count} 个收藏</p>
          </Link>
        ))}
      </div>

      {/* ===== 全局标签云（所有收藏和文章的标签汇总） ===== */}
      {tags.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">所有标签</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <span
                key={t.tag}
                className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600"
              >
                {t.tag} ({t.count})
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
