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

纯 CSS 实现的彩虹渐变按钮，鼠标悬停时颜色会流动。

## 核心思路

用 `background: linear-gradient` 画渐变背景，把 `background-size` 设得比元素宽（300%），然后用 CSS 动画移动 `background-position` 实现流动效果。

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

## 要点

- `background-size: 300%` 让渐变比元素宽三倍，才有"流动"的空间
- 动画移动的是 `background-position`，不是元素本身
- `linear` 让动画匀速，形成无限循环的流动感
