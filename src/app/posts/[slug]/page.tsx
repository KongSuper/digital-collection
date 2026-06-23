import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/content';
import { MDXContent } from '@/lib/mdx';
import TagList from '@/components/TagList';

/**
 * 告诉 Next.js 构建时生成所有文章详情页
 */
export function generateStaticParams() {
  const posts = getPosts();
  return posts.map(p => ({ slug: p.slug }));
}

/**
 * 文章详情页 (/posts/[slug])
 * 显示文章标题、日期、标签 + MDX 渲染的正文
 */
interface Props {
  params: { slug: string };
}

export default function PostDetailPage({ params }: Props) {
  const post = getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* 面包屑 */}
      <div className="mb-8">
        <Link href="/posts" className="text-sm text-gray-500 hover:text-gray-700">
          &larr; 返回随笔
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">{post.frontmatter.title}</h1>

      {/* 文章元信息：日期 + 标签 */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
        <time>{post.frontmatter.date}</time>
        <TagList tags={post.frontmatter.tags} />
      </div>

      {/* Markdown 正文渲染 */}
      <div className="mt-8">
        <MDXContent source={post.content} />
      </div>
    </div>
  );
}
