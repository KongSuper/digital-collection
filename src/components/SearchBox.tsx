'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

/**
 * SearchBox —— 客户端搜索组件
 * Pagefind 通过动态插入 <script> 标签加载，加载后通过全局 pagefind 对象调用
 * 必须是客户端组件：用了 useState、useEffect、DOM 操作
 */

interface SearchResult {
  url: string;
  excerpt: string;
  meta: {
    title: string;
    image?: string;
  };
}

// 缓存 Pagefind 是否已加载，避免重复插入 script 标签
let pagefindLoaded = false;
let pagefindLoading = false;
let pagefindPromise: Promise<any> | null = null;

/** 通过动态插入 <script> 标签加载 Pagefind JS */
function loadPagefind(): Promise<any> {
  if ((window as any).pagefind) {
    return Promise.resolve((window as any).pagefind);
  }
  if (pagefindLoading && pagefindPromise) {
    return pagefindPromise;
  }
  pagefindLoading = true;
  pagefindPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '/pagefind/pagefind.js';
    script.onload = () => {
      pagefindLoaded = true;
      resolve((window as any).pagefind);
    };
    script.onerror = () => {
      pagefindLoading = false;
      pagefindPromise = null;
      reject(new Error('Pagefind script failed to load'));
    };
    document.head.appendChild(script);
  });
  return pagefindPromise;
}

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      // 先确保 Pagefind JS 已加载（插入 script 标签）
      const pagefind = await loadPagefind();
      const search = await pagefind.search(q);
      const items = await Promise.all(
        search.results.slice(0, 20).map(async (r: any) => {
          const data = await r.data();
          // 去掉 Pagefind 加的高亮 <mark> 标签
          const excerpt = data.excerpt.replace(/<\/?mark>/g, '');
          return { url: data.url, excerpt, meta: data.meta };
        })
      );
      setResults(items);
    } catch {
      // Pagefind 不可用时静默失败（开发模式或索引不存在）
      setResults([]);
    }
    setLoading(false);
  }, []);

  // 防抖：用户停止输入 300ms 后才发起搜索
  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="搜索收藏和文章..."
        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        autoFocus
      />

      {loading && <p className="text-gray-400 text-center py-8 mt-4">搜索中...</p>}

      {!loading && query.length >= 2 && results.length === 0 && (
        <p className="text-gray-400 text-center py-8 mt-4">没有找到结果</p>
      )}

      {results.length > 0 && (
        <ul className="mt-6 space-y-4">
          {results.map((r, i) => (
            <li key={i}>
              <Link
                href={r.url}
                className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <h3 className="font-medium">{r.meta.title || r.url}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{r.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
