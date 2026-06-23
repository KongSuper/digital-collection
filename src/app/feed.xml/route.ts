import { Feed } from 'feed';
import { getPosts } from '@/lib/content';

/**
 * RSS 订阅源 (/feed.xml)
 * 只在构建时生成一次（静态导出模式），包含所有文章的 RSS
 * feed 库把文章数据转成标准 RSS XML 格式
 */
export async function GET() {
  // TODO: 替换为你的实际域名
  const siteUrl = 'https://example.com';

  const feed = new Feed({
    title: '数字收藏馆 - 随笔',
    description: '偶尔写写，记录想法',
    id: siteUrl,
    link: siteUrl,
    language: 'zh-CN',
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    updated: new Date(),
    // RSS 阅读器发现地址
    feedLinks: {
      rss: `${siteUrl}/feed.xml`,
    },
    author: {
      name: 'KongSuper',
      link: siteUrl,
    },
  });

  // 把所有文章添加到 RSS feed
  const posts = getPosts();
  for (const post of posts) {
    feed.addItem({
      title: post.frontmatter.title,
      id: `${siteUrl}/posts/${post.slug}`,
      link: `${siteUrl}/posts/${post.slug}`,
      description: post.frontmatter.excerpt,
      content: post.content,
      date: new Date(post.frontmatter.date),
    });
  }

  // 返回 XML 响应
  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
