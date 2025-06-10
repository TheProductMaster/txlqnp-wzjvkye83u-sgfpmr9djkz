import { useState, useEffect } from 'react';

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

interface BlogData {
  posts: BlogPost[];
  categories: string[];
  featuredPosts: BlogPost[];
  loading: boolean;
  error: string | null;
}

// Fallback data for development/demo purposes
const fallbackPosts: BlogPost[] = [
  {
    id: 'ai-future-web-dev',
    title: 'The Future of Web Development: How AI is Reshaping the Industry',
    excerpt: 'Explore how artificial intelligence is transforming web development practices and what it means for developers and businesses.',
    content: '<p>Artificial Intelligence is revolutionizing the web development landscape in ways we could have never imagined just a few years ago. From automated code generation to intelligent design systems, AI is becoming an integral part of the modern developer\'s toolkit.</p>',
    category: 'AI & Technology',
    author: 'Michael Chen',
    authorBio: 'Senior Full-Stack Developer with 8+ years of experience in AI integration and modern web technologies.',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    date: '2024-03-15',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
    tags: ['AI', 'Web Development', 'Future Tech', 'Automation'],
    featured: true,
    slug: 'ai-future-web-dev'
  },
  {
    id: 'responsive-design-2024',
    title: 'Responsive Design in 2024: Best Practices and New Approaches',
    excerpt: 'Learn about the latest trends and techniques in responsive web design that ensure optimal user experience across all devices.',
    content: '<p>Responsive design has evolved significantly since its inception. In 2024, we\'re seeing new approaches and technologies that make creating truly responsive experiences easier and more effective than ever before.</p>',
    category: 'Design',
    author: 'Emily Rodriguez',
    authorBio: 'UI/UX Designer and Frontend Developer specializing in responsive design and user experience optimization.',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b6c5?w=150&h=150&fit=crop&crop=face',
    date: '2024-03-10',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=1200&h=600&fit=crop',
    tags: ['Responsive Design', 'CSS', 'Mobile-First', 'UX'],
    featured: false,
    slug: 'responsive-design-2024'
  }
];

export function useBlogData(): BlogData {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogData() {
      try {
        setLoading(true);
        setError(null);

        console.warn('Loading blog data...');

        // Try to load blog posts
        let postsData: BlogPost[] = [];
        
        try {
          const postsResponse = await fetch('/data/blog-posts.json');
          if (postsResponse.ok) {
            const responseData = await postsResponse.json();
            if (Array.isArray(responseData)) {
              postsData = responseData;
              console.warn(`Loaded ${postsData.length} blog posts from CMS`);
            } else {
              throw new Error('Invalid blog posts data format');
            }
          } else {
            throw new Error(`Failed to fetch blog posts: ${postsResponse.status}`);
          }
        } catch (fetchError) {
          console.warn('⚠️  Could not load CMS data, using fallback posts:', fetchError);
          postsData = fallbackPosts;
        }

        setPosts(postsData);

        // Load categories (with fallback)
        let categoriesData: string[] = [];
        try {
          const categoriesResponse = await fetch('/data/blog-categories.json');
          if (categoriesResponse.ok) {
            const responseData = await categoriesResponse.json();
            if (Array.isArray(responseData)) {
              categoriesData = responseData;
            }
          }
        } catch (_categoryError) {
          console.warn('⚠️  Could not load categories, generating from posts');
        }
        
        // If no categories loaded, generate from posts
        if (categoriesData.length === 0) {
          categoriesData = [...new Set(postsData.map(post => post.category))].filter(Boolean);
        }
        setCategories(categoriesData);

        // Load featured posts (with fallback)
        let featuredData: BlogPost[] = [];
        try {
          const featuredResponse = await fetch('/data/blog-featured.json');
          if (featuredResponse.ok) {
            const responseData = await featuredResponse.json();
            if (Array.isArray(responseData)) {
              featuredData = responseData;
            }
          }
        } catch (_featuredError) {
          console.warn('⚠️  Could not load featured posts, filtering from posts');
        }
        
        // If no featured posts loaded, filter from posts
        if (featuredData.length === 0) {
          featuredData = postsData.filter(post => post.featured);
        }
        setFeaturedPosts(featuredData);

        console.warn('Blog data loaded successfully');

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error loading blog data';
        console.error('❌ Error loading blog data:', errorMessage);
        setError(errorMessage);
        
        // Use fallback data even on error
        console.warn('Using fallback data due to error');
        setPosts(fallbackPosts);
        setCategories(['AI & Technology', 'Design']);
        setFeaturedPosts(fallbackPosts.filter(post => post.featured));
      } finally {
        setLoading(false);
      }
    }

    loadBlogData();
  }, []);

  return {
    posts,
    categories,
    featuredPosts,
    loading,
    error
  };
}

// Utility functions for blog data
export function getPostById(posts: BlogPost[], id: string): BlogPost | undefined {
  return posts.find(post => post.id === id || post.slug === id);
}

export function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit: number = 4): BlogPost[] {
  return allPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post => 
      post.category === currentPost.category || 
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}

export function getPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
  return posts.filter(post => post.category === category);
}

export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getNextPost(posts: BlogPost[], currentPostId: string): BlogPost | null {
  const currentIndex = posts.findIndex(post => post.id === currentPostId || post.slug === currentPostId);
  if (currentIndex === -1 || currentIndex === posts.length - 1) return null;
  return posts[currentIndex + 1];
}

export function getPreviousPost(posts: BlogPost[], currentPostId: string): BlogPost | null {
  const currentIndex = posts.findIndex(post => post.id === currentPostId || post.slug === currentPostId);
  if (currentIndex <= 0) return null;
  return posts[currentIndex - 1];
}