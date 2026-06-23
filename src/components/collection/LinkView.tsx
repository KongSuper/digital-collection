import TagList from '@/components/TagList';
import { MDXContent } from '@/lib/mdx';

/**
 * 链接型收藏详情 —— 适合推荐的工具/网站
 * 显示一个大号引用卡片 + 跳转链接 + 笔记
 */
interface LinkViewProps {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  content: string;
}

export default function LinkView({ title, description, tags, url, content }: LinkViewProps) {
  return (
    <div>
      {/* 大号引用卡片 */}
      <div className="p-6 rounded-xl border-2 border-gray-200 bg-gray-50 mb-8">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-3">
          <TagList tags={tags} />
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-4 text-sm text-blue-600 hover:underline"
          >
            打开链接 &rarr;
          </a>
        )}
      </div>
      {/* 链接笔记（Markdown）渲染 */}
      <MDXContent source={content} />
    </div>
  );
}
