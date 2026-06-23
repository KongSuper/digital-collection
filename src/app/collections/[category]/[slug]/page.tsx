import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollection, getCollections } from '@/lib/content';
import TagList from '@/components/TagList';
import SnippetView from '@/components/collection/SnippetView';
import ProjectView from '@/components/collection/ProjectView';
import LinkView from '@/components/collection/LinkView';

/**
 * 告诉 Next.js 构建时生成所有收藏详情页
 */
export function generateStaticParams() {
  const collections = getCollections();
  return collections.map(c => ({
    category: c.category,
    slug: c.slug,
  }));
}

/**
 * 收藏详情页 (/collections/[category]/[slug])
 * 根据 frontmatter.type 自动切换三种渲染形态：
 *   snippet → SnippetView（嵌入式代码预览）
 *   project → ProjectView（项目截图 + 外链）
 *   link    → LinkView（大号卡片 + 跳转）
 */
interface Props {
  params: { category: string; slug: string };
}

export default function CollectionDetailPage({ params }: Props) {
  const item = getCollection(params.category, params.slug);

  if (!item) {
    notFound();
  }

  const { frontmatter } = item;

  // 按 type 选择对应的展示组件
  const ViewComponent = {
    snippet: SnippetView,
    project: ProjectView,
    link: LinkView,
  }[frontmatter.type];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* 面包屑导航 */}
      <div className="mb-8">
        <Link
          href={`/collections/${params.category}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; 返回 {params.category}
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">{frontmatter.title}</h1>

      {/* 元信息：分类名 + 类型标签 */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mt-4 mb-8">
        <span className="px-2 py-0.5 rounded bg-gray-100 capitalize">
          {item.category}
        </span>
        <span>{frontmatter.type}</span>
      </div>

      {/* type 决定展示形态 */}
      <ViewComponent
        description={frontmatter.description}
        content={item.content}
        title={frontmatter.title}
        url={frontmatter.url}
        tags={frontmatter.tags}
      />
    </div>
  );
}
