import { readFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorBio: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
  slug: string;
}

export interface MarkdownData {
  content: string;
  data: {
    title: string;
    excerpt: string;
    author: string;
    authorBio: string;
    authorAvatar: string;
    date: string;
    readTime: string;
    image: string;
    category: string;
    tags: string[];
    featured?: boolean;
    slug: string;
  };
}

/**
 * Process markdown content and convert to HTML
 */
export function processMarkdownContent(content: string): string {
  // Simple markdown to HTML conversion
  // In a real implementation, you might want to use a library like 'marked' or 'remark'
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2">$1</a>')
    // Lists
    .replace(/^\s*\n\*/gm, '<ul>\n*')
    .replace(/^(\*.+)\s*\n([^*])/gm, '$1\n</ul>\n\n$2')
    .replace(/^\*(.+)/gm, '<li>$1</li>')
    // Blockquotes
    .replace(/^> (.+)/gm, '<blockquote>$1</blockquote>')
    // Paragraphs
    .replace(/^\s*(\n)?(.+)/gm, function(m) {
      return /<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>' + m + '</p>';
    })
    // Line breaks
    .replace(/\n/gim, '<br>');
}

/**
 * Load and parse a single markdown file
 */
export function loadMarkdownFile(filePath: string): BlogPost | null {
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const parsed = matter(fileContent) as matter.GrayMatterFile<string>;
    const { data, content } = parsed as unknown as MarkdownData;
    
    // Generate ID from filename
    const filename = filePath.split('/').pop() || '';
    const id = filename.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    
    return {
      id: data.slug || id,
      title: data.title,
      excerpt: data.excerpt,
      content: processMarkdownContent(content),
      category: data.category,
      author: data.author,
      authorBio: data.authorBio,
      authorAvatar: data.authorAvatar,
      date: new Date(data.date).toISOString().split('T')[0],
      readTime: data.readTime,
      image: data.image,
      tags: data.tags || [],
      featured: data.featured || false,
      slug: data.slug || id
    };
  } catch (error) {
    console.error(`Error loading markdown file ${filePath}:`, error);
    return null;
  }
}

/**
 * Load all blog posts from the content directory
 */
export function loadAllBlogPosts(contentDir: string = 'content/blog'): BlogPost[] {
  try {
    const files = readdirSync(contentDir);
    const posts: BlogPost[] = [];
    
    for (const file of files) {
      if (extname(file) === '.md') {
        const filePath = join(contentDir, file);
        const post = loadMarkdownFile(filePath);
        if (post) {
          posts.push(post);
        }
      }
    }
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

/**
 * Get related posts based on category and tags
 */
export function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit: number = 4): BlogPost[] {
  return allPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post => post.category === currentPost.category || 
      post.tags.some(tag => currentPost.tags.includes(tag)))
    .slice(0, limit);
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(allPosts: BlogPost[]): BlogPost[] {
  return allPosts.filter(post => post.featured);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(allPosts: BlogPost[], category: string): BlogPost[] {
  return allPosts.filter(post => post.category === category);
}

/**
 * Search posts by title, excerpt, or content
 */
export function searchPosts(allPosts: BlogPost[], query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}