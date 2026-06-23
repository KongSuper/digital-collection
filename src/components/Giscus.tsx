'use client';

import GiscusReact from '@giscus/react';

/**
 * Giscus 评论区组件
 * 必须是客户端组件：Giscus 通过 <script> 标签加载，需要浏览器环境
 *
 * 使用说明：
 * 1. 在 GitHub 仓库安装 Giscus App (https://github.com/apps/giscus)
 * 2. 开启仓库的 Discussions 功能
 * 3. 访问 https://giscus.app 获取 repoId 和 categoryId
 * 4. 将这两个值填入下方（替换 YOUR_REPO_ID / YOUR_CATEGORY_ID）
 * 5. 推荐将敏感 ID 放入 .env.local 环境变量中
 */
export default function Giscus() {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <GiscusReact
        repo="kongsuper/blog-comments"
        repoId="R_kgDOTCaEVg"
        category="General"
        categoryId="DIC_kwDOTCaEVs4C_tEj"
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
