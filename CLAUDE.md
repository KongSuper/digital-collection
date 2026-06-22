# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目定位

这是一个"数字收藏馆"个人网站，核心是收藏和展示各种有趣的东西（CSS 动效、项目、小程序、链接等），辅以偶尔的随笔写作。不是传统 Blog，更像私人展馆。

## 技术栈

- Next.js 14+ App Router + TypeScript
- Tailwind CSS
- MDX（Markdown 内容处理，支持嵌入组件）
- Giscus 评论、Pagefind 搜索
- VPS 部署：PM2 + Nginx

## 设计文档

完整设计 spec 见 `docs/superpowers/specs/2026-06-22-blog-design.md`。所有技术决策、网站结构、内容模型定义以该文档为准。

## 当前进度

设计阶段已完成并确认，下一步是调用 `writing-plans` 技能制定实施计划，然后进入开发。

## 内容存储

所有内容以 Markdown 文件存放在 `content/` 目录，分为两个子目录：
- `content/collections/` — 收藏（按分类建子目录）
- `content/posts/` — 随笔/文章

每个文件顶部用 YAML frontmatter 定义元数据（标题、标签、类型等）。

## 网站结构

```
首页 (/)        — 个人介绍 + 精选收藏 + 入口卡片
藏馆 (/collections) — 分类总览 → 卡片墙 → 详情
随笔 (/posts)       — 文章列表 → 文章详情
搜索 (/search)      — 全局搜索
关于 (/about)
```

收藏按 type 区分四种渲染形态：snippet（嵌入预览）、project（截图+外链）、link（卡片+跳转）。
