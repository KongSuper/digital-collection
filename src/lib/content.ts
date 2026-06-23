import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Collection, Post, CategoryInfo, TagInfo } from '@/types';

// content/ 目录的绝对路径（process.cwd() 是项目根目录）
const contentDir = path.join(process.cwd(), 'content');
const collectionsDir = path.join(contentDir, 'collections');
const postsDir = path.join(contentDir, 'posts');

/**
 * 读取单个 Markdown 文件，拆出 frontmatter 元数据和正文
 * gray-matter 把 --- 包起来的 YAML 解析成对象，其余部分作为 content 字符串
 */
function readMarkdownFile(filePath: string): { frontmatter: Record<string, any>; content: string } | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return { frontmatter: data, content };
  } catch {
    // 文件不存在或格式损坏时返回 null，不中断整个读取流程
    return null;
  }
}

/**
 * 递归读取目录下所有 .md / .mdx 文件
 * 子目录会被递归进入，文件名（去掉后缀）作为 slug
 */
function readAllMarkdownFiles(dir: string): { frontmatter: Record<string, any>; content: string; slug: string }[] {
  const results: { frontmatter: Record<string, any>; content: string; slug: string }[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // 递归处理子目录（如 collections/css/）
      results.push(...readAllMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      const parsed = readMarkdownFile(fullPath);
      if (parsed) {
        results.push({
          ...parsed,
          slug: entry.name.replace(/\.(md|mdx)$/, ''), // rainbow-button.md → rainbow-button
        });
      }
    }
  }
  return results;
}

// ========== 收藏相关 API ==========

/** 获取所有收藏，按分类遍历 */
export function getCollections(): Collection[] {
  const results: Collection[] = [];
  if (!fs.existsSync(collectionsDir)) return results;

  // collections/ 下每个子目录是一个分类（css, projects, mini-apps...）
  const categories = fs.readdirSync(collectionsDir, { withFileTypes: true })
    .filter(e => e.isDirectory());

  for (const cat of categories) {
    const catDir = path.join(collectionsDir, cat.name);
    const files = readAllMarkdownFiles(catDir);
    for (const file of files) {
      results.push({
        frontmatter: {
          title: file.frontmatter.title || file.slug,
          type: file.frontmatter.type || 'link',
          url: file.frontmatter.url,
          tags: file.frontmatter.tags || [],
          pinned: file.frontmatter.pinned || false,
          preview: file.frontmatter.preview || 'none',
          description: file.frontmatter.description || '',
        },
        slug: file.slug,
        category: cat.name,
        content: file.content,
      });
    }
  }
  return results;
}

/** 按分类名筛选收藏 */
export function getCollectionsByCategory(category: string): Collection[] {
  return getCollections().filter(c => c.category === category);
}

/** 获取单个收藏详情，按分类 + slug 定位 */
export function getCollection(category: string, slug: string): Collection | null {
  return getCollections().find(c => c.category === category && c.slug === slug) || null;
}

/**
 * 把 YAML 可能解析为 Date 对象的日期转为字符串
 * gray-matter 底层用 js-yaml，会把 2024-06-22 自动转成 Date 对象，
 * React 只能渲染字符串/数字，不能渲染 Date，需提前转换
 */
function normalizeDate(value: any): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10); // Date → "2024-06-22"
  }
  return String(value || '');
}

// ========== 文章相关 API ==========

/** 获取所有文章，按日期倒序排列（最新的在前） */
export function getPosts(): Post[] {
  const files = readAllMarkdownFiles(postsDir);
  return files
    .map(f => ({
      frontmatter: {
        title: f.frontmatter.title || f.slug,
        date: normalizeDate(f.frontmatter.date),
        tags: f.frontmatter.tags || [],
        excerpt: f.frontmatter.excerpt || '',
      },
      slug: f.slug,
      content: f.content,
    }))
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

/** 获取单篇文章（按 slug 直接读文件，避免遍历所有） */
export function getPost(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.md`);
  const parsed = readMarkdownFile(filePath);
  if (!parsed) return null;

  return {
    frontmatter: {
      title: parsed.frontmatter.title || slug,
      date: normalizeDate(parsed.frontmatter.date),
      tags: parsed.frontmatter.tags || [],
      excerpt: parsed.frontmatter.excerpt || '',
    },
    slug,
    content: parsed.content,
  };
}

// ========== 标签、精选、分类统计 ==========

/** 全局标签及出现次数（收藏 + 文章合并统计），按数量降序 */
export function getAllTags(): TagInfo[] {
  const tagCounts = new Map<string, number>();

  for (const c of getCollections()) {
    for (const tag of c.frontmatter.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }
  for (const p of getPosts()) {
    for (const tag of p.frontmatter.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/** 获取所有 pinned=true 的收藏，用于首页精选展示 */
export function getPinnedCollections(): Collection[] {
  return getCollections().filter(c => c.frontmatter.pinned);
}

/** 分类列表及各分类下的收藏数量 */
export function getCategories(): CategoryInfo[] {
  const collections = getCollections();
  const catMap = new Map<string, number>();
  for (const c of collections) {
    catMap.set(c.category, (catMap.get(c.category) || 0) + 1);
  }
  return Array.from(catMap.entries()).map(([name, count]) => ({ name, count }));
}
