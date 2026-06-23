import SearchBox from '@/components/SearchBox';

/**
 * 全局搜索页 (/search)
 * 搜索是客户端行为，页面本身是服务端组件，
 * SearchBox 内部用 'use client' 处理交互
 */
export default function SearchPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">搜索</h1>
      <p className="text-gray-600 mb-8">搜索所有收藏和文章</p>
      <SearchBox />
    </div>
  );
}
