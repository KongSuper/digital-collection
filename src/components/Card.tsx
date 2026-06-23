import Link from 'next/link';
import TagList from './TagList';

/**
 * 通用卡片组件 —— 用于展示收藏和文章的缩略信息
 * 整个卡片是可点击的（Link 包裹），hover 时有阴影和边框变色效果
 */
interface CardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;         // 点击跳转的目标 URL
  subtitle?: string;     // 副标题（收藏显示分类名，文章显示日期）
}

export default function Card({ title, description, tags, href, subtitle }: CardProps) {
  return (
    <Link
      href={href}
      className="block p-5 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <h3 className="font-medium text-lg">{title}</h3>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      {/* line-clamp-2：描述最多显示两行，超出用省略号 */}
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
      <div className="mt-3">
        <TagList tags={tags} />
      </div>
    </Link>
  );
}
