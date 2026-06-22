# 个人数字收藏馆 — 设计文档

> 日期：2026-06-22
> 状态：设计已确认

## 项目定位

这是一个"数字收藏家"式的个人网站，核心是收藏和展示各种有趣的东西（CSS 动效、项目、小程序、链接等），辅以偶尔的随笔写作。不是传统 Blog，更像私人展馆。

## 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 14+ (App Router) | 网站框架，路由与渲染 |
| Tailwind CSS | 原子化样式 |
| MDX | Markdown 内容处理，支持嵌入组件 |
| Giscus | 评论系统，数据存 GitHub Discussions |
| Pagefind | 站内全文搜索 |
| feed (npm) | RSS 生成（仅文章） |
| PM2 + Nginx | VPS 部署与进程守护 |

## 网站结构

```
首页 (/)
├── 个人简短介绍
├── 精选收藏（pinned 置顶卡片）
└── 两大入口：藏馆 & 随笔

藏馆 (/collections)
├── 分类总览（各分类入口卡片）
├── 分类内页 (/collections/[category]) — 卡片墙浏览
└── 收藏详情 (/collections/[category]/[slug])

随笔 (/posts)
├── 文章列表 (/posts)
└── 文章详情 (/posts/[slug])

关于我 (/about)

搜索 (/search) — 全局搜索收藏 + 文章
```

## 内容存储

所有内容以 Markdown 文件存储在 `content/` 目录：

```
content/
├── collections/
│   ├── css/
│   │   └── rainbow-button.md
│   ├── projects/
│   └── mini-apps/
└── posts/
    └── 2024-06-22-hello.md
```

### 收藏文件 Frontmatter

```yaml
---
title: "标题"
type: snippet       # snippet | project | link
url: "原始链接"      # 可选
tags: [标签列表]
pinned: false       # 是否在首页精选展示
preview: embed      # embed | image | none
description: "一句话描述"
---

笔记内容（Markdown）
```

### 文章文件 Frontmatter

```yaml
---
title: "文章标题"
date: 2024-06-22
tags: [标签]
excerpt: "摘要"
---

正文内容（Markdown）
```

## 收藏四种渲染形态

根据 `type` 字段区分详情页展示：

| type | 展示方式 |
|------|---------|
| **snippet** | 内嵌可运行预览（iframe / 组件渲染）+ 笔记 |
| **project** | 配图/截图 + 简介 + 外链按钮 + 笔记 |
| **link** | 大号卡片（标题+描述+标签）+ 跳转链接 + 笔记 |

## 核心功能清单

- [x] 首页个人主页 — 介绍 + 精选收藏 + 两大入口
- [x] 藏馆分类浏览 — 分类总览 → 卡片墙 → 详情
- [x] 随笔列表与详情
- [x] 标签体系 — 全局标签筛选与关联
- [x] Giscus 评论 — 文章和收藏详情页均可评论
- [x] Pagefind 搜索 — 全文检索收藏和文章
- [x] RSS 订阅 — 仅文章
- [x] 关于我页面
- [ ] 预留 CMS 迁移接口（数据层抽象）

## 部署方式

VPS 部署：Nginx 反向代理 + PM2 进程管理。`npm run build && pm2 start` 或 `next start`。

## 架构原则

- 数据处理层抽象：所有内容通过统一的数据获取函数读取，未来切换数据源（Markdown → CMS）只需替换该层实现
- 组件按功能拆分：卡片组件、标签组件、搜索组件等各自独立
- 类型定义集中管理：共享的 TypeScript 类型放在 `types/` 目录
