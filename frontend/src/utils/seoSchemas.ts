/**
 * SEO Schema Utilities
 * Generate structured data for various content types
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface VideoSchema {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}

/**
 * Generate FAQ Schema (Frequently Asked Questions)
 * Helps content appear in Google's "People Also Ask" section
 */
export const generateFAQSchema = (faqs: FAQItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Generate VideoObject Schema
 * Optimizes video content for search engines
 */
export const generateVideoSchema = (video: VideoSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    ...(video.duration && { "duration": video.duration }),
    ...(video.contentUrl && { "contentUrl": video.contentUrl }),
    ...(video.embedUrl && { "embedUrl": video.embedUrl })
  };
};

/**
 * Generate HowTo Schema
 * For tutorial and step-by-step content
 */
export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export const generateHowToSchema = (name: string, description: string, steps: HowToStep[], estimatedCost?: string, totalTime?: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    ...(estimatedCost && { "estimatedCost": estimatedCost }),
    ...(totalTime && { "totalTime": totalTime }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image }),
      ...(step.url && { "url": step.url })
    }))
  };
};

/**
 * Generate Review Schema
 * For product or service reviews
 */
export interface ReviewSchema {
  itemName: string;
  ratingValue: number;
  bestRating?: number;
  author: string;
  reviewBody: string;
  datePublished: string;
}

export const generateReviewSchema = (review: ReviewSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Thing",
      "name": review.itemName
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.ratingValue,
      "bestRating": review.bestRating || 5
    },
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewBody": review.reviewBody,
    "datePublished": review.datePublished
  };
};

/**
 * Generate Product Schema
 * For e-commerce and product pages
 */
export interface ProductSchema {
  name: string;
  image: string;
  description: string;
  brand?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export const generateProductSchema = (product: ProductSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    ...(product.brand && { "brand": { "@type": "Brand", "name": product.brand } }),
    ...(product.offers && {
      "offers": {
        "@type": "Offer",
        "price": product.offers.price,
        "priceCurrency": product.offers.priceCurrency,
        "availability": product.offers.availability,
        "url": product.offers.url
      }
    }),
    ...(product.aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.aggregateRating.ratingValue,
        "reviewCount": product.aggregateRating.reviewCount
      }
    })
  };
};

/**
 * Generate Course Schema
 * For educational content and courses
 */
export interface CourseSchema {
  name: string;
  description: string;
  provider: string;
  url?: string;
}

export const generateCourseSchema = (course: CourseSchema) => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": course.provider
    },
    ...(course.url && { "url": course.url })
  };
};
