import { MDXContent } from '@/lib/mdx';

/**
 * 代码片段型收藏详情 —— 适合 CSS 动效等可嵌入预览的内容
 * 把笔记正文中嵌入的代码示例直接渲染出来
 */
interface SnippetViewProps {
  description: string;
  content: string;
}

export default function SnippetView({ description, content }: SnippetViewProps) {
  return (
    <div>
      <p className="text-gray-600 mb-6">{description}</p>
      {/* 预览区域：带背景的容器，把 Markdown 正文（含代码示例）渲染出来 */}
      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 mb-8">
        <MDXContent source={content} />
      </div>
    </div>
  );
}
