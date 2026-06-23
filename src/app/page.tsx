import Link from 'next/link';
import Card from '@/components/Card';
import { getPinnedCollections, getPosts } from '@/lib/content';

/**
 * 首页 —— 个人展馆的"门面"
 * 分为四个区域：个人介绍 → 两大入口 → 精选收藏 → 最近文章
 * 这个组件在服务器端运行，直接读文件系统拿数据
 */
export default function HomePage() {
  // 从本地 Markdown 文件读取数据（不需要 API 请求！）
  const pinned = getPinnedCollections();
  const recentPosts = getPosts().slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* ===== 个人介绍 ===== */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight">数字收藏馆</h1>
        <p className="mt-4 text-gray-600 max-w-xl leading-relaxed">
          这里是我的私人数字展馆，收藏各种有趣的东西——
          CSS 动效、好玩的项目、实用小程序，偶尔也写写随笔。
        </p>
      </section>

      {/* ===== 两大入口卡片 ===== */}
      <section className="grid grid-cols-2 gap-6 mb-16">
        <Link
          href="/collections"
          className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-bold">藏馆</h2>
          <p className="mt-2 text-gray-600 text-sm">浏览所有收藏</p>
        </Link>
        <Link
          href="/posts"
          className="p-8 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-bold">随笔</h2>
          <p className="mt-2 text-gray-600 text-sm">阅读文章</p>
        </Link>
      </section>

      {/* ===== 精选收藏（只有 pinned=true 的才出现在这） ===== */}
      {pinned.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">精选收藏</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pinned.map(item => (
              <Card
                key={`${item.category}/${item.slug}`}
                title={item.frontmatter.title}
                description={item.frontmatter.description}
                tags={item.frontmatter.tags}
                href={`/collections/${item.category}/${item.slug}`}
                subtitle={item.category}
              />
            ))}
          </div>
        </section>
      )}

      {/* ===== 最近文章（最多 3 篇） ===== */}
      {recentPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">最近文章</h2>
            <Link href="/posts" className="text-sm text-blue-600 hover:underline">
              查看全部 &rarr;
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map(post => (
              <Card
                key={post.slug}
                title={post.frontmatter.title}
                description={post.frontmatter.excerpt}
                tags={post.frontmatter.tags}
                href={`/posts/${post.slug}`}
                subtitle={post.frontmatter.date}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
