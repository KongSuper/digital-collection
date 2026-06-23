# 数字收藏馆 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** 从零搭建完整的个人数字收藏馆网站，包含首页、藏馆、随笔、搜索、评论、RSS。

**Architecture:** Next.js 14 App Router 全静态站点，内容以 Markdown 文件存储在 `content/` 目录，通过统一数据抽象层读取。MDX 渲染 Markdown 内容，Giscus 提供评论，Pagefind 提供全文搜索。

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, next-mdx-remote, gray-matter, Giscus, Pagefind, feed (RSS)

## Global Constraints

- 所有内容通过 `src/lib/content.ts` 统一数据层读取，未来换 CMS 只改这一层
- 所有共享 TypeScript 类型定义在 `src/types/index.ts`
- 页面优先静态生成（`generateStaticParams`），不做 SSR/ISR
- 样式使用 Tailwind CSS，不引入第三方 UI 库
- 收藏详情页按 `type` 字段区分三种渲染形态：snippet、project、link

---

### Task 1: 项目脚手架

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx` (minimal placeholder)
- Create: `src/app/page.tsx` (minimal placeholder)
- Create: `.gitignore`

**Interfaces:**
- Produces: Next.js 14 项目基础结构，Tailwind 就绪，`npm run dev` 可启动

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "digital-collection",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-mdx-remote": "^5.0.0",
    "gray-matter": "^4.0.3",
    "@giscus/react": "^3.0.0",
    "feed": "^4.2.2"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/node": "^20.12.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "pagefind": "^1.1.0",
    "gray-matter": "^4.0.3"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: 创建 next.config.mjs**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

- [ ] **Step 4: 创建 tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 5: 创建 postcss.config.mjs**

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
export default config;
```

- [ ] **Step 6: 创建 src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 7: 创建最小 src/app/layout.tsx**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "数字收藏馆",
  description: "收藏和展示各种有趣的东西",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 8: 创建最小 src/app/page.tsx**

```tsx
export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold">数字收藏馆</h1>
      <p className="mt-4 text-gray-600">建设中...</p>
    </main>
  );
}
```

- [ ] **Step 9: 创建 .gitignore**

```
node_modules/
.next/
out/
.env
.env.local
```

- [ ] **Step 10: 安装依赖并验证**

```
npm install
```

运行: `npm run dev`
预期: http://localhost:3000 显示 "数字收藏馆 / 建设中..."

- [ ] **Step 11: 提交**

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs tailwind.config.ts postcss.config.mjs src/app/globals.css src/app/layout.tsx src/app/page.tsx .gitignore
git commit -m "scaffold: init Next.js 14 + TypeScript + Tailwind project"
```

---

### Task 2: 类型定义与内容目录

**Files:**
- Create: `src/types/index.ts`
- Create: `content/collections/css/.gitkeep`
- Create: `content/collections/projects/.gitkeep`
- Create: `content/collections/mini-apps/.gitkeep`
- Create: `content/posts/.gitkeep`

**Interfaces:**
- Produces: `CollectionFrontmatter`, `PostFrontmatter`, `Collection`, `Post`, `CategoryInfo`, `TagInfo` 类型

- [ ] **Step 1: 创建 src/types/index.ts**

```typescript
export type CollectionType = 'snippet' | 'project' | 'link';
export type PreviewMode = 'embed' | 'image' | 'none';

export interface CollectionFrontmatter {
  title: string;
  type: CollectionType;
  url?: string;
  tags: string[];
  pinned: boolean;
  preview: PreviewMode;
  description: string;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export interface Collection {
  frontmatter: CollectionFrontmatter;
  slug: string;
  category: string;
  content: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  slug: string;
  content: string;
}

export interface CategoryInfo {
  name: string;
  count: number;
}

export interface TagInfo {
  tag: string;
  count: number;
}
```

- [ ] **Step 2: 创建内容目录结构**

```bash
mkdir -p content/collections/css
mkdir -p content/collections/projects
mkdir -p content/collections/mini-apps
mkdir -p content/posts
```

验证: `ls content/collections/` 显示 `css/ projects/ mini-apps/`

- [ ] **Step 3: 提交**

```bash
git add src/types/index.ts content/
git commit -m "feat: add shared types and content directory structure"
```

---

### Task 3: 数据层

**Files:**
- Create: `src/lib/content.ts`

**Interfaces:**
- Consumes: `src/types/index.ts` 中的类型
- Produces:
  - `getCollections(): Collection[]` — 所有收藏
  - `getCollectionsByCategory(category: string): Collection[]` — 按分类筛选
  - `getCollection(category: string, slug: string): Collection | null` — 单个收藏
  - `getPosts(): Post[]` — 所有文章（按日期倒序）
  - `getPost(slug: string): Post | null` — 单篇文章
  - `getAllTags(): TagInfo[]` — 全局标签及计数（收藏 + 文章）
  - `getPinnedCollections(): Collection[]` — 置顶收藏
  - `getCategories(): CategoryInfo[]` — 分类及收藏数

- [ ] **Step 1: 编写数据层测试计划**

由于本站数据层是纯文件读取 + 解析逻辑，使用简单的验证脚本来确保正确性，不引入测试框架。在每个 Task 结束后用 `curl` 或浏览器验证页面渲染。

- [ ] **Step 2: 创建 src/lib/content.ts**

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Collection, Post, CategoryInfo, TagInfo } from '@/types';

const contentDir = path.join(process.cwd(), 'content');
const collectionsDir = path.join(contentDir, 'collections');
const postsDir = path.join(contentDir, 'posts');

function readMarkdownFile(filePath: string): { frontmatter: Record<string, any>; content: string } | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return { frontmatter: data, content };
  } catch {
    return null;
  }
}

function readAllMarkdownFiles(dir: string): { frontmatter: Record<string, any>; content: string; slug: string }[] {
  const results: { frontmatter: Record<string, any>; content: string; slug: string }[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...readAllMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      const parsed = readMarkdownFile(fullPath);
      if (parsed) {
        results.push({
          ...parsed,
          slug: entry.name.replace(/\.(md|mdx)$/, ''),
        });
      }
    }
  }
  return results;
}

export function getCollections(): Collection[] {
  const results: Collection[] = [];
  if (!fs.existsSync(collectionsDir)) return results;

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

export function getCollectionsByCategory(category: string): Collection[] {
  return getCollections().filter(c => c.category === category);
}

export function getCollection(category: string, slug: string): Collection | null {
  return getCollections().find(c => c.category === category && c.slug === slug) || null;
}

export function getPosts(): Post[] {
  const files = readAllMarkdownFiles(postsDir);
  return files
    .map(f => ({
      frontmatter: {
        title: f.frontmatter.title || f.slug,
        date: f.frontmatter.date || '',
        tags: f.frontmatter.tags || [],
        excerpt: f.frontmatter.excerpt || '',
      },
      slug: f.slug,
      content: f.content,
    }))
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.md`);
  const parsed = readMarkdownFile(filePath);
  if (!parsed) return null;

  return {
    frontmatter: {
      title: parsed.frontmatter.title || slug,
      date: parsed.frontmatter.date || '',
      tags: parsed.frontmatter.tags || [],
      excerpt: parsed.frontmatter.excerpt || '',
    },
    slug,
    content: parsed.content,
  };
}

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

export function getPinnedCollections(): Collection[] {
  return getCollections().filter(c => c.frontmatter.pinned);
}

export function getCategories(): CategoryInfo[] {
  const collections = getCollections();
  const catMap = new Map<string, number>();
  for (const c of collections) {
    catMap.set(c.category, (catMap.get(c.category) || 0) + 1);
  }
  return Array.from(catMap.entries()).map(([name, count]) => ({ name, count }));
}
```

- [ ] **Step 3: 提交**

```bash
git add src/lib/content.ts
git commit -m "feat: add content data layer with gray-matter parsing"
```

---

### Task 4: 布局与导航

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: 无（纯展示组件）
- Produces: `Header` 组件（导航栏）、`Footer` 组件、根布局集成

- [ ] **Step 1: 创建 src/components/Header.tsx**

```tsx
import Link from 'next/link';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/collections', label: '藏馆' },
  { href: '/posts', label: '随笔' },
  { href: '/about', label: '关于' },
  { href: '/search', label: '搜索' },
];

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <nav className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          数字收藏馆
        </Link>
        <ul className="flex gap-6 text-sm text-gray-600">
          {navItems.map(item => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-gray-900 transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: 创建 src/components/Footer.tsx**

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-20">
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-sm text-gray-400">
        <p>数字收藏馆 &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: 更新 src/app/layout.tsx**

```tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "数字收藏馆",
  description: "收藏和展示各种有趣的东西",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-white text-gray-900 antialiased flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: 验证**

运行 `npm run dev`，浏览器打开 http://localhost:3000，确认顶部导航和底部页脚显示正常。

- [ ] **Step 5: 提交**

```bash
git add src/components/Header.tsx src/components/Footer.tsx src/app/layout.tsx
git commit -m "feat: add header navigation and footer layout"
```

---

### Task 5: 首页

**Files:**
- Create: `src/components/Card.tsx`
- Create: `src/components/TagList.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `getPinnedCollections()`, `getPosts()` 从 `@/lib/content`
- Produces: 首页完整布局（个人介绍 + 精选收藏 + 入口卡片 + 最近文章）

- [ ] **Step 1: 创建 src/components/TagList.tsx**

```tsx
import Link from 'next/link';

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
```

- [ ] **Step 2: 创建 src/components/Card.tsx**

```tsx
import Link from 'next/link';
import TagList from './TagList';

interface CardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
  subtitle?: string;
}

export default function Card({ title, description, tags, href, subtitle }: CardProps) {
  return (
    <Link
      href={href}
      className="block p-5 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <h3 className="font-medium text-lg">{title}</h3>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
      <div className="mt-3">
        <TagList tags={tags} />
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: 更新 src/app/page.tsx**

```tsx
import Link from 'next/link';
import Card from '@/components/Card';
import { getPinnedCollections, getPosts } from '@/lib/content';

export default function HomePage() {
  const pinned = getPinnedCollections();
  const recentPosts = getPosts().slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 个人介绍 */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight">数字收藏馆</h1>
        <p className="mt-4 text-gray-600 max-w-xl leading-relaxed">
          这里是我的私人数字展馆，收藏各种有趣的东西——
          CSS 动效、好玩的项目、实用小程序，偶尔也写写随笔。
        </p>
      </section>

      {/* 两大入口 */}
      <section className="grid grid-cols-2 gap-6 mb-16">
        <Link
          href="/collections"
          className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-bold">藏馆</h2>
          <p className="mt-2 text-gray-600 text-sm">浏览所有收藏</p>
        </Link>
        <Link
          href="/posts"
          className="p-8 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl font-bold">随笔</h2>
          <p className="mt-2 text-gray-600 text-sm">阅读文章</p>
        </Link>
      </section>

      {/* 精选收藏 */}
      {pinned.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">精选收藏</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pinned.map(item => (
              <Card
                key={`${item.category}/${item.slug}`}
                title={item.frontmatter.title}
                description={item.frontmatter.description}
                tags={item.frontmatter.tags}
                href={`/collections/${item.category}/${item.slug}`}
                subtitle={item.category}
              />
            ))}
          </div>
        </section>
      )}

      {/* 最近文章 */}
      {recentPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">最近文章</h2>
            <Link href="/posts" className="text-sm text-blue-600 hover:underline">
              查看全部
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map(post => (
              <Card
                key={post.slug}
                title={post.frontmatter.title}
                description={post.frontmatter.excerpt}
                tags={post.frontmatter.tags}
                href={`/posts/${post.slug}`}
                subtitle={post.frontmatter.date}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
```

- [ ] **Step 4: 验证**

运行 `npm run dev`，打开 http://localhost:3000 确认：
- 个人介绍区域显示
- 藏馆/随笔两个入口卡片可点
- 由于暂无内容，精选收藏和最近文章区域不显示（不会报错）

- [ ] **Step 5: 提交**

```bash
git add src/components/TagList.tsx src/components/Card.tsx src/app/page.tsx
git commit -m "feat: implement homepage with intro, entry cards, pinned items, and recent posts"
```

---

### Task 6: 藏馆页面（分类总览 + 分类卡片墙）

**Files:**
- Create: `src/app/collections/page.tsx`
- Create: `src/app/collections/[category]/page.tsx`

**Interfaces:**
- Consumes: `getCategories()`, `getCollectionsByCategory()`, `getAllTags()` 从 `@/lib/content`
- Produces: `/collections` 分类总览页, `/collections/[category]` 分类卡片墙

- [ ] **Step 1: 创建 src/app/collections/page.tsx**

```tsx
import Link from 'next/link';
import { getCategories, getAllTags } from '@/lib/content';
import TagList from '@/components/TagList';

export default function CollectionsPage() {
  const categories = getCategories();
  const tags = getAllTags();

  const categoryColors: Record<string, string> = {
    css: 'from-pink-50 to-rose-50 border-pink-100',
    projects: 'from-blue-50 to-cyan-50 border-blue-100',
    'mini-apps': 'from-green-50 to-emerald-50 border-green-100',
  };
  const defaultColor = 'from-gray-50 to-slate-50 border-gray-100';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">藏馆</h1>
      <p className="text-gray-600 mb-10">按分类浏览所有收藏</p>

      {/* 分类入口 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-14">
        {categories.map(cat => (
          <Link
            key={cat.name}
            href={`/collections/${cat.name}`}
            className={`p-6 rounded-xl bg-gradient-to-br border hover:shadow-md transition-shadow ${categoryColors[cat.name] || defaultColor}`}
          >
            <h2 className="text-xl font-semibold capitalize">{cat.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{cat.count} 个收藏</p>
          </Link>
        ))}
      </div>

      {/* 标签云 */}
      {tags.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">所有标签</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <span
                key={t.tag}
                className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                {t.tag} ({t.count})
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
```

- [ ] **Step 2: 创建 src/app/collections/[category]/page.tsx**

```tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollectionsByCategory, getCategories } from '@/lib/content';
import Card from '@/components/Card';

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map(cat => ({ category: cat.name }));
}

interface Props {
  params: { category: string };
}

export default function CategoryPage({ params }: Props) {
  const items = getCollectionsByCategory(params.category);

  if (items.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <Link href="/collections" className="text-sm text-gray-500 hover:text-gray-700">
          &larr; 返回藏馆
        </Link>
        <h1 className="text-3xl font-bold mt-2 capitalize">{params.category}</h1>
        <p className="text-gray-600 mt-1">{items.length} 个收藏</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <Card
            key={item.slug}
            title={item.frontmatter.title}
            description={item.frontmatter.description}
            tags={item.frontmatter.tags}
            href={`/collections/${params.category}/${item.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add src/app/collections/
git commit -m "feat: add collections overview and category card wall pages"
```

---

### Task 7: 收藏详情页（三种渲染形态）

**Files:**
- Create: `src/app/collections/[category]/[slug]/page.tsx`
- Create: `src/components/collection/SnippetView.tsx`
- Create: `src/components/collection/ProjectView.tsx`
- Create: `src/components/collection/LinkView.tsx`
- Create: `src/lib/mdx.tsx`

**Interfaces:**
- Consumes: `getCollection()`, `getCollections()` 从 `@/lib/content`
- Produces: `/collections/[category]/[slug]` 详情页，按 type 切换渲染

- [ ] **Step 1: 创建 src/lib/mdx.tsx**

```tsx
import { MDXRemote } from 'next-mdx-remote/rsc';

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-gray max-w-none">
      <MDXRemote source={source} />
    </div>
  );
}
```

注意：需要安装 `@tailwindcss/typography` 并加入 tailwind.config.ts plugins：
```bash
npm install @tailwindcss/typography
```

更新 `tailwind.config.ts` 的 plugins：
```typescript
plugins: [require('@tailwindcss/typography')],
```

- [ ] **Step 2: 创建 src/components/collection/SnippetView.tsx**

```tsx
import { MDXContent } from '@/lib/mdx';

interface SnippetViewProps {
  description: string;
  content: string;
}

export default function SnippetView({ description, content }: SnippetViewProps) {
  return (
    <div>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 mb-8">
        <MDXContent source={content} />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 创建 src/components/collection/ProjectView.tsx**

```tsx
import { MDXContent } from '@/lib/mdx';

interface ProjectViewProps {
  description: string;
  url?: string;
  content: string;
}

export default function ProjectView({ description, url, content }: ProjectViewProps) {
  return (
    <div>
      <p className="text-gray-600 mb-4">{description}</p>
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
        <MDXContent source={content} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 创建 src/components/collection/LinkView.tsx**

```tsx
import TagList from '@/components/TagList';
import { MDXContent } from '@/lib/mdx';

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
      <MDXContent source={content} />
    </div>
  );
}
```

- [ ] **Step 5: 创建 src/app/collections/[category]/[slug]/page.tsx**

```tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollection, getCollections } from '@/lib/content';
import TagList from '@/components/TagList';
import SnippetView from '@/components/collection/SnippetView';
import ProjectView from '@/components/collection/ProjectView';
import LinkView from '@/components/collection/LinkView';

export function generateStaticParams() {
  const collections = getCollections();
  return collections.map(c => ({
    category: c.category,
    slug: c.slug,
  }));
}

interface Props {
  params: { category: string; slug: string };
}

export default function CollectionDetailPage({ params }: Props) {
  const item = getCollection(params.category, params.slug);

  if (!item) {
    notFound();
  }

  const { frontmatter } = item;

  const ViewComponent = {
    snippet: SnippetView,
    project: ProjectView,
    link: LinkView,
  }[frontmatter.type];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href={`/collections/${params.category}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; 返回 {params.category}
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">{frontmatter.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mt-4 mb-8">
        <span className="px-2 py-0.5 rounded bg-gray-100 capitalize">
          {item.category}
        </span>
        <span>{frontmatter.type}</span>
      </div>

      <ViewComponent
        description={frontmatter.description}
        content={item.content}
        title={frontmatter.title}
        url={frontmatter.url}
        tags={frontmatter.tags}
      />
    </div>
  );
}
```

- [ ] **Step 6: 提交**

```bash
git add src/lib/mdx.tsx src/components/collection/ src/app/collections/
git commit -m "feat: add collection detail pages with snippet/project/link views"
```

---

### Task 8: 随笔页面

**Files:**
- Create: `src/app/posts/page.tsx`
- Create: `src/app/posts/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getPosts()`, `getPost()` 从 `@/lib/content`, `MDXContent` 从 `@/lib/mdx`
- Produces: `/posts` 文章列表, `/posts/[slug]` 文章详情

- [ ] **Step 1: 创建 src/app/posts/page.tsx**

```tsx
import { getPosts } from '@/lib/content';
import Card from '@/components/Card';

export default function PostsPage() {
  const posts = getPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">随笔</h1>
      <p className="text-gray-600 mb-10">偶尔写写，记录想法</p>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-center py-20">还没有文章</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <Card
              key={post.slug}
              title={post.frontmatter.title}
              description={post.frontmatter.excerpt}
              tags={post.frontmatter.tags}
              href={`/posts/${post.slug}`}
              subtitle={post.frontmatter.date}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: 创建 src/app/posts/[slug]/page.tsx**

```tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/content';
import { MDXContent } from '@/lib/mdx';
import TagList from '@/components/TagList';

export function generateStaticParams() {
  const posts = getPosts();
  return posts.map(p => ({ slug: p.slug }));
}

interface Props {
  params: { slug: string };
}

export default function PostDetailPage({ params }: Props) {
  const post = getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/posts" className="text-sm text-gray-500 hover:text-gray-700">
          &larr; 返回随笔
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">{post.frontmatter.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
        <time>{post.frontmatter.date}</time>
        <TagList tags={post.frontmatter.tags} />
      </div>

      <div className="mt-8">
        <MDXContent source={post.content} />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add src/app/posts/
git commit -m "feat: add posts list and detail pages with MDX rendering"
```

---

### Task 9: 关于页面

**Files:**
- Create: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: 无（纯静态内容）
- Produces: `/about` 页面

- [ ] **Step 1: 创建 src/app/about/page.tsx**

```tsx
export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">关于</h1>
      <p className="text-gray-600 mb-10">关于我和这个网站</p>

      <div className="prose prose-gray max-w-none">
        <p>
          你好，我是 KongSuper，一名热爱前端的开发者。
        </p>
        <p>
          这个网站是我的私人数字展馆，用来收藏和展示各种有趣的东西——
          CSS 动效、好玩的项目、实用的小程序，也有一些随手写的文章。
        </p>
        <p>
          不是传统博客，更像一个不断丰富的私人收藏架。
        </p>

        <h2>联系方式</h2>
        <ul>
          <li>GitHub: <a href="https://github.com/kongsuper">@kongsuper</a></li>
        </ul>

        <h2>技术栈</h2>
        <p>
          本站使用 Next.js 14 + TypeScript + Tailwind CSS 构建，
          内容以 Markdown 编写，通过 MDX 渲染。
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add src/app/about/
git commit -m "feat: add about page"
```

---

### Task 10: Pagefind 站内搜索

**Files:**
- Create: `src/app/search/page.tsx`
- Create: `src/components/SearchBox.tsx`
- Modify: `package.json` (添加 build 脚本)

**Interfaces:**
- Consumes: 无（客户端纯前端搜索）
- Produces: `/search` 搜索页面，Pagefind 驱动的全文检索

- [ ] **Step 1: 更新 package.json 的 build 脚本**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build && pagefind --site .next/server/app --output-path .next/static/pagefind",
    "start": "next start"
  }
}
```

注意：Pagefind 需要索引静态 HTML 输出。由于 Next.js 14 App Router 输出结构，pagefind 的 `--site` 参数需要指向实际包含 HTML 的目录。命令可能需要调整——首次构建后验证。

- [ ] **Step 2: 创建 src/components/SearchBox.tsx**

```tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface SearchResult {
  url: string;
  excerpt: string;
  meta: {
    title: string;
    image?: string;
  };
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
      const pagefind = await import(
        /* webpackIgnore: true */
        '/pagefind/pagefind.js'
      );
      // @ts-ignore
      const search = await pagefind.search(q);
      const items = await Promise.all(
        search.results.slice(0, 20).map(async (r: any) => {
          const data = await r.data();
          const excerpt = data.excerpt.replace(/<\/?mark>/g, '');
          return { url: data.url, excerpt, meta: data.meta };
        })
      );
      setResults(items);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

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
```

- [ ] **Step 3: 创建 src/app/search/page.tsx**

```tsx
import SearchBox from '@/components/SearchBox';

export default function SearchPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">搜索</h1>
      <p className="text-gray-600 mb-8">搜索所有收藏和文章</p>
      <SearchBox />
    </div>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add src/app/search/ src/components/SearchBox.tsx package.json
git commit -m "feat: add Pagefind-powered full-text search page"
```

---

### Task 11: Giscus 评论系统

**Files:**
- Create: `src/components/Giscus.tsx`
- Modify: `src/app/collections/[category]/[slug]/page.tsx`
- Modify: `src/app/posts/[slug]/page.tsx`

**Interfaces:**
- Consumes: `@giscus/react` 组件
- Produces: 收藏和文章详情页底部出现评论区

- [ ] **Step 1: 创建 src/components/Giscus.tsx**

```tsx
'use client';

import GiscusReact from '@giscus/react';

export default function Giscus() {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <GiscusReact
        repo="kongsuper/blog-comments"
        repoId="YOUR_REPO_ID"
        category="General"
        categoryId="YOUR_CATEGORY_ID"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
```

注意：`repoId` 和 `categoryId` 需要在启用 Giscus 后从 https://giscus.app 获取。如果还没有配置，先使用占位值，后续替换为环境变量。

- [ ] **Step 2: 在收藏详情页添加评论区**

在 `src/app/collections/[category]/[slug]/page.tsx` 底部（`</div>` 闭合标签前）加入：

```tsx
import Giscus from '@/components/Giscus';
// ... 在 ViewComponent 之后添加：
<Giscus />
```

完整修改：在文件的 import 区添加 `import Giscus from '@/components/Giscus';`，在 `</div>` 末尾闭合标签前插入 `<Giscus />`。

- [ ] **Step 3: 在文章详情页添加评论区**

同样，在 `src/app/posts/[slug]/page.tsx` 的 import 区添加 `import Giscus from '@/components/Giscus';`，在 MDXContent 组件后、`</div>` 前添加 `<Giscus />`。

- [ ] **Step 4: 提交**

```bash
git add src/components/Giscus.tsx src/app/collections/ src/app/posts/
git commit -m "feat: add Giscus comment widget to detail pages"
```

---

### Task 12: RSS 订阅

**Files:**
- Create: `src/app/feed.xml/route.ts`

**Interfaces:**
- Consumes: `getPosts()` 从 `@/lib/content`, `feed` npm 包
- Produces: `/feed.xml` 端点，返回 RSS XML

- [ ] **Step 1: 创建 src/app/feed.xml/route.ts**

```typescript
import { Feed } from 'feed';
import { getPosts } from '@/lib/content';

export async function GET() {
  const siteUrl = 'https://example.com'; // 替换为实际域名

  const feed = new Feed({
    title: '数字收藏馆 - 随笔',
    description: '偶尔写写，记录想法',
    id: siteUrl,
    link: siteUrl,
    language: 'zh-CN',
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    updated: new Date(),
    feedLinks: {
      rss: `${siteUrl}/feed.xml`,
    },
    author: {
      name: 'KongSuper',
      link: siteUrl,
    },
  });

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

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
```

- [ ] **Step 2: 提交**

```bash
git add src/app/feed.xml/
git commit -m "feat: add RSS feed for posts at /feed.xml"
```

---

### Task 13: 示例内容

**Files:**
- Create: `content/collections/css/rainbow-button.md`
- Create: `content/posts/hello-world.md`

**Interfaces:**
- 无代码接口，纯内容文件

- [ ] **Step 1: 创建 content/collections/css/rainbow-button.md**

```markdown
---
title: "彩虹按钮"
type: snippet
url: "https://codepen.io/example/rainbow"
tags: [css, animation, button]
pinned: true
preview: embed
description: "一个纯 CSS 实现的彩虹渐变按钮，hover 时有流动动画效果。"
---

## 效果演示

以下是一个纯 CSS 实现的彩虹渐变按钮。

## 核心思路

使用 `background: linear-gradient` 配合 `background-size` 放大，再用 `animation` 移动 `background-position` 实现流动效果。

```css
.rainbow-btn {
  background: linear-gradient(
    90deg,
    red, orange, yellow, green, blue, indigo, violet
  );
  background-size: 300% 100%;
  animation: flow 3s linear infinite;
}

@keyframes flow {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
```
```

- [ ] **Step 2: 创建 content/posts/hello-world.md**

```markdown
---
title: "你好，世界"
date: 2024-06-22
tags: [随笔]
excerpt: "第一篇随笔，聊聊为什么要做这个数字收藏馆。"
---

## 为什么做这个网站

一直以来，我收藏了很多有趣的东西——CodePen 上惊艳的 CSS 动效、GitHub 上精巧的小项目、各种实用的在线工具。它们散落在浏览器的书签栏、笔记软件的剪藏里，从来没有被好好整理过。

于是就想到做一个"数字收藏馆"，把这些宝贝分门别类地展示出来，顺便写写文章。

不是传统博客，更像一个私人展馆。欢迎随便逛逛。
```

- [ ] **Step 3: 构建验证**

```bash
npm run build
```

确认构建无错误，静态页面正确生成。

- [ ] **Step 4: 提交**

```bash
git add content/
git commit -m "content: add sample collection and first post"
```

---

### Task 14: 部署配置

**Files:**
- Create: `ecosystem.config.js` (PM2 配置)
- Create: `nginx.conf` (Nginx 配置参考)

**Interfaces:**
- 无代码接口，部署配置文件

- [ ] **Step 1: 创建 ecosystem.config.js**

```javascript
module.exports = {
  apps: [
    {
      name: 'digital-collection',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/digital-collection',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
```

- [ ] **Step 2: 创建 nginx.conf（参考）**

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

- [ ] **Step 3: 提交**

```bash
git add ecosystem.config.js nginx.conf
git commit -m "chore: add PM2 and Nginx deployment configs"
```

---

## 自审清单

### 1. Spec 覆盖检查
- [x] 首页（个人介绍 + 精选收藏 + 两大入口） — Task 5
- [x] 藏馆分类浏览（分类总览 → 卡片墙 → 详情） — Task 6 + Task 7
- [x] 随笔列表与详情 — Task 8
- [x] 标签体系 — TagList 组件 + getAllTags 数据函数
- [x] Giscus 评论 — Task 11
- [x] Pagefind 搜索 — Task 10
- [x] RSS 订阅 — Task 12
- [x] 关于我页面 — Task 9
- [x] 数据层抽象（预留 CMS 迁移接口） — Task 3
- [x] 四种渲染形态（snippet/project/link） — Task 7

### 2. 占位符扫描
- 无 TBD/TODO/placeholder
- Giscus 中的 repoId/categoryId 需要用户实际配置，已加注释说明
- RSS feed 中的 siteUrl 需要用户替换实际域名，已加注释说明

### 3. 类型一致性
- `CollectionFrontmatter` 在所有组件中一致使用（title, type, url, tags, pinned, preview, description）
- `PostFrontmatter` 一致使用（title, date, tags, excerpt）
- 所有数据层函数签名在不同 Task 中一致
- MDXContent 组件签名一致（source: string）
