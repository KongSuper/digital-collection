/**
 * 标签列表组件 —— 把一组标签字符串渲染成圆角小药丸
 * 用在卡片、详情页等多个地方，所以抽出来单独做个组件
 */
interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map(tag => (
        <span
          key={tag}
          className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
