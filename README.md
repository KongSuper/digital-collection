# 数字收藏馆

个人数字展馆——收藏 CSS 动效、趣味项目和实用链接，偶尔写写随笔。从零到上线全程 **vibe coding**，由自然语言驱动 AI 完成所有代码。

## 技术栈

- **Next.js 14** (App Router) — 全栈框架，静态导出模式
- **TypeScript** — 类型安全
- **Tailwind CSS** — 原子化样式
- **MDX** — Markdown 内容渲染，支持嵌入组件
- **Pagefind** — 离线全文搜索
- **Giscus** — 基于 GitHub Discussions 的评论系统

## 本地运行

```bash
npm install
npm run dev       # 开发模式 → http://localhost:3000
npm run build     # 构建 + Pagefind 索引
```

## 内容管理

所有内容以 Markdown 文件存放在 `content/` 下，支持 YAML frontmatter：

```
content/
├── collections/         # 收藏
│   ├── css/             # CSS 动效
│   ├── projects/        # 项目
│   └── mini-apps/       # 小程序
└── posts/               # 随笔
```

添加新收藏只需新建一个 `.md` 文件：

```yaml
---
title: "标题"
type: snippet       # snippet | project | link
tags: [css, button]
pinned: true        # 是否首页精选
description: "简介"
---
笔记内容（Markdown）
```

## 项目结构

```
src/
├── app/              # 页面路由（App Router）
├── components/       # 可复用组件
├── lib/              # 数据层、MDX 渲染
└── types/            # TypeScript 类型定义
```

## 部署

VPS 部署：PM2 守护 + Nginx 反向代理，配置文件见项目根目录。

```
npm run build
pm2 start ecosystem.config.js
```
