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
