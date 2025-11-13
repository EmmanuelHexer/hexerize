// GROQ queries for fetching blog data from Sanity

// Query to fetch all blog posts with essential data
export const blogPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author->{
    name,
    slug,
    image
  },
  mainImage {
    ...,
    asset->{
      _id,
      url,
      metadata {
        lqip
      }
    }
  },
  categories[]->{
    _id,
    title,
    slug
  },
  publishedAt,
  excerpt,
  estimatedReadingTime,
  featured
}`;

// Query to fetch featured posts
export const featuredPostsQuery = `*[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  author->{
    name,
    slug,
    image
  },
  mainImage {
    ...,
    asset->{
      _id,
      url,
      metadata {
        lqip
      }
    }
  },
  categories[]->{
    _id,
    title,
    slug
  },
  publishedAt,
  excerpt,
  estimatedReadingTime,
  featured
}`;

// Query to fetch a single blog post by slug
export const blogPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  author->{
    _id,
    name,
    slug,
    image,
    bio
  },
  mainImage {
    ...,
    asset->{
      _id,
      url,
      metadata {
        lqip
      }
    }
  },
  categories[]->{
    _id,
    title,
    slug,
    description
  },
  publishedAt,
  excerpt,
  body,
  estimatedReadingTime,
  featured
}`;

// Query to fetch posts by category
export const postsByCategoryQuery = `*[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author->{
    name,
    slug,
    image
  },
  mainImage {
    ...,
    asset->{
      _id,
      url,
      metadata {
        lqip
      }
    }
  },
  categories[]->{
    _id,
    title,
    slug
  },
  publishedAt,
  excerpt,
  estimatedReadingTime
}`;

// Query to fetch all categories
export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description
}`;

// Query to fetch related posts (same categories, excluding current post)
export const relatedPostsQuery = `*[_type == "post" && _id != $postId && count((categories[]._ref)[@ in $categories]) > 0] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  author->{
    name,
    slug,
    image
  },
  mainImage {
    ...,
    asset->{
      _id,
      url,
      metadata {
        lqip
      }
    }
  },
  categories[]->{
    _id,
    title,
    slug
  },
  publishedAt,
  excerpt,
  estimatedReadingTime
}`;
