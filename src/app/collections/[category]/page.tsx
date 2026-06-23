import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollectionsByCategory, getCategories } from '@/lib/content';
import Card from '@/components/Card';

/**
 * 告诉 Next.js 构建时生成哪些 category 页面
 * 没有这个函数，动态路由 [category] 不会预渲染
 */
export function generateStaticParams() {
  const categories = getCategories();
  return categories.map(cat => ({ category: cat.name }));
}

/**
 * 分类卡片墙页 (/collections/[category])
 * 显示某个分类下所有收藏的卡片
 */
interface Props {
  params: { category: string };
}

export default function CategoryPage({ params }: Props) {
  const items = getCollectionsByCategory(params.category);

  // 如果 URL 里的分类名没有对应的收藏，显示 404
  if (items.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <Link href="/collections" className="text-sm text-gray-500 hover:text-gray-700">
          &larr; 返回藏馆
        </Link>
        <h1 className="text-3xl font-bold mt-2 capitalize">{params.category}</h1>
        <p className="text-gray-600 mt-1">{items.length} 个收藏</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <Card
            key={item.slug}
            title={item.frontmatter.title}
            description={item.frontmatter.description}
            tags={item.frontmatter.tags}
            href={`/collections/${params.category}/${item.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
