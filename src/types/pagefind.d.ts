// Pagefind 的类型声明 —— 构建后才有这个 JS 文件，开发期 TS 检查需要这个声明
declare module '/pagefind/pagefind.js' {
  export function search(query: string): Promise<{
    results: Array<{
      data(): Promise<{
        url: string;
        excerpt: string;
        meta: { title: string; image?: string };
      }>;
    }>;
  }>;
}
