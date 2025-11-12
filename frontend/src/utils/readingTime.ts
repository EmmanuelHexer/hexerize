/**
 * Calculate estimated reading time based on content
 * Average reading speed: 200-250 words per minute
 * We'll use 225 words per minute as the average
 */

export const calculateReadingTime = (content: any): number => {
  if (!content) return 1;

  let wordCount = 0;

  // Handle Portable Text (Sanity's rich text format)
  if (Array.isArray(content)) {
    content.forEach((block: any) => {
      if (block._type === 'block' && block.children) {
        block.children.forEach((child: any) => {
          if (child.text) {
            wordCount += child.text.split(/\s+/).filter((word: string) => word.length > 0).length;
          }
        });
      }
    });
  }
  // Handle plain text
  else if (typeof content === 'string') {
    wordCount = content.split(/\s+/).filter((word: string) => word.length > 0).length;
  }

  // Calculate reading time (225 words per minute)
  const readingTime = Math.ceil(wordCount / 225);

  // Minimum 1 minute
  return readingTime < 1 ? 1 : readingTime;
};

/**
 * Format reading time for display
 */
export const formatReadingTime = (minutes: number): string => {
  if (minutes < 1) return '1 min read';
  return `${minutes} min read`;
};
