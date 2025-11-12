// TypeScript types for Sanity blog data

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Author {
  _id: string;
  _type: 'author';
  name: string;
  slug: {
    current: string;
  };
  image?: SanityImage;
  bio?: string;
}

export interface Category {
  _id: string;
  _type: 'category';
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface BlogPost {
  _id: string;
  _type: 'post';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
  };
  author: Author;
  mainImage: SanityImage;
  categories: Category[];
  publishedAt: string;
  excerpt: string;
  body: any[]; // PortableText content
  estimatedReadingTime?: number;
  featured?: boolean;
}

export interface BlogListItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: Author;
  mainImage: SanityImage;
  categories: Category[];
  publishedAt: string;
  excerpt: string;
  estimatedReadingTime?: number;
  featured?: boolean;
}
