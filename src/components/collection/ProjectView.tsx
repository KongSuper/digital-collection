import { MDXContent } from '@/lib/mdx';

/**
 * 项目型收藏详情 —— 适合有外部链接的项目（GitHub、网站等）
 * 显示描述 + 外链按钮 + 笔记正文
 */
interface ProjectViewProps {
  description: string;
  url?: string;
  content: string;
}

export default function ProjectView({ description, url, content }: ProjectViewProps) {
  return (
    <div>
      <p className="text-gray-600 mb-4">{description}</p>
      {/* 如果有项目链接，显示一个「访问项目」按钮 */}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors mb-8"
        >
          访问项目 &rarr;
        </a>
      )}
      <div className="mt-8">
        {/* 项目笔记（Markdown）渲染 */}
        <MDXContent source={content} />
      </div>
    </div>
  );
}
