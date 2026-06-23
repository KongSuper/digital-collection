/**
 * 关于页面 (/about)
 * 纯静态内容，不需要读数据层
 */
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
