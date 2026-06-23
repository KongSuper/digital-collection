import { MDXRemote } from 'next-mdx-remote/rsc';

/**
 * MDX 内容渲染组件
 * 接收 Markdown 源字符串，编译并渲染为 HTML
 * prose 类来自 @tailwindcss/typography，自动给标题/段落/列表等加合适样式
 */
export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-gray max-w-none">
      <MDXRemote source={source} />
    </div>
  );
}
