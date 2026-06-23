import { getPosts } from '@/lib/content';
import Card from '@/components/Card';

/**
 * 随笔列表页 (/posts)
 * 按日期倒序展示所有文章卡片
 */
export default function PostsPage() {
  const posts = getPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">随笔</h1>
      <p className="text-gray-600 mb-10">偶尔写写，记录想法</p>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-center py-20">还没有文章</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
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
      )}
    </div>
  );
}
