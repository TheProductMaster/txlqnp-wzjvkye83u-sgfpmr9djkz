import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if gray-matter is available and import it
let matter;
let hasGrayMatter = false;

try {
  const grayMatterModule = await import('gray-matter');
  matter = grayMatterModule.default;
  hasGrayMatter = true;
} catch (error) {
  console.warn('⚠️  gray-matter not found, using fallback parser');
  hasGrayMatter = false;
}

// Fallback frontmatter parser
function parseFrontmatter(content) {
  const lines = content.split('\n');
  if (lines[0] !== '---') {
    return { data: {}, content };
  }
  
  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      endIndex = i;
      break;
    }
  }
  
  if (endIndex === -1) {
    return { data: {}, content };
  }
  
  const frontmatterLines = lines.slice(1, endIndex);
  const bodyLines = lines.slice(endIndex + 1);
  
  const data = {};
  frontmatterLines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      
      // Handle arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        data[key] = value.slice(1, -1).split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
      } else if (value === 'true') {
        data[key] = true;
      } else if (value === 'false') {
        data[key] = false;
      } else {
        data[key] = value;
      }
    }
  });
  
  return { data, content: bodyLines.join('\n') };
}

// Simple markdown to HTML converter
function processMarkdownContent(content) {
  if (!content) return '';
  
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Code blocks
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]*)`/gim, '<code>$1</code>')
    // Lists
    .replace(/^\* (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/<\/li>\n?<li>/g, '</li><li>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Paragraphs
    .split('\n\n')
    .map(paragraph => {
      paragraph = paragraph.trim();
      if (!paragraph) return '';
      
      // Skip if already wrapped in HTML tags
      if (paragraph.match(/^<(h[1-6]|ul|ol|li|blockquote|pre|code)/)) {
        return paragraph;
      }
      
      return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
    })
    .filter(Boolean)
    .join('\n\n');
}

// Load and process a single markdown file
function loadMarkdownFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const filename = path.basename(filePath);
    
    // Parse frontmatter
    const parsed = hasGrayMatter ? matter(fileContent) : parseFrontmatter(fileContent);
    const { data, content } = parsed;
    
    // Generate ID from filename
    const id = filename.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    
    // Validate required fields
    if (!data.title) {
      console.warn(`⚠️  Missing title in ${filename}`);
      return null;
    }
    
    return {
      id: data.slug || id,
      title: data.title,
      excerpt: data.excerpt || content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
      content: processMarkdownContent(content),
      category: data.category || 'Technology',
      author: data.author || 'IT Services Team',
      authorBio: data.authorBio || 'Our expert team of developers and designers',
      authorAvatar: data.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      readTime: data.readTime || '5 min read',
      image: data.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
      tags: Array.isArray(data.tags) ? data.tags : (typeof data.tags === 'string' ? [data.tags] : []),
      featured: Boolean(data.featured),
      slug: data.slug || id
    };
  } catch (error) {
    console.error(`❌ Error loading markdown file ${filePath}:`, error.message);
    return null;
  }
}

// Ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

// Write JSON file safely
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`❌ Error writing file ${filePath}:`, error.message);
    return false;
  }
}

// Main build function
async function buildBlog() {
  console.log('🔨 Building blog data...');
  
  const contentDir = path.join(process.cwd(), 'content/blog');
  const outputDir = path.join(process.cwd(), 'public/data');
  
  // Ensure output directory exists
  ensureDirectoryExists(outputDir);
  
  // Check if content directory exists
  if (!fs.existsSync(contentDir)) {
    console.log('⚠️  Content directory does not exist. Creating empty blog data...');
    
    // Create empty but valid JSON structure
    const emptyPosts = [];
    const emptyCategories = [];
    const emptyFeatured = [];
    
    writeJsonFile(path.join(outputDir, 'blog-posts.json'), emptyPosts);
    writeJsonFile(path.join(outputDir, 'blog-categories.json'), emptyCategories);
    writeJsonFile(path.join(outputDir, 'blog-featured.json'), emptyFeatured);
    
    console.log('✅ Created empty blog data files');
    return;
  }
  
  try {
    const files = fs.readdirSync(contentDir);
    const markdownFiles = files.filter(file => path.extname(file) === '.md');
    
    if (markdownFiles.length === 0) {
      console.log('⚠️  No markdown files found in content directory');
      
      // Create empty data files
      writeJsonFile(path.join(outputDir, 'blog-posts.json'), []);
      writeJsonFile(path.join(outputDir, 'blog-categories.json'), []);
      writeJsonFile(path.join(outputDir, 'blog-featured.json'), []);
      
      console.log('✅ Created empty blog data files');
      return;
    }
    
    const posts = [];
    let processedCount = 0;
    let errorCount = 0;
    
    console.log(`📖 Found ${markdownFiles.length} markdown files`);
    
    for (const file of markdownFiles) {
      const filePath = path.join(contentDir, file);
      const post = loadMarkdownFile(filePath);
      if (post) {
        posts.push(post);
        processedCount++;
      } else {
        errorCount++;
      }
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Write the processed posts to JSON file
    const postsWritten = writeJsonFile(path.join(outputDir, 'blog-posts.json'), posts);
    
    if (postsWritten) {
      console.log(`✅ Successfully processed ${processedCount} blog posts`);
      if (errorCount > 0) {
        console.log(`⚠️  ${errorCount} files had errors and were skipped`);
      }
    }
    
    // Generate additional data files
    const categories = [...new Set(posts.map(post => post.category))].filter(Boolean);
    writeJsonFile(path.join(outputDir, 'blog-categories.json'), categories);
    
    const featuredPosts = posts.filter(post => post.featured);
    writeJsonFile(path.join(outputDir, 'blog-featured.json'), featuredPosts);
    
    console.log(`✅ Generated ${categories.length} categories and ${featuredPosts.length} featured posts`);
    console.log('🎉 Blog build completed successfully!');
    
  } catch (error) {
    console.error('❌ Error building blog:', error.message);
    
    // Create fallback empty files
    ensureDirectoryExists(outputDir);
    
    writeJsonFile(path.join(outputDir, 'blog-posts.json'), []);
    writeJsonFile(path.join(outputDir, 'blog-categories.json'), []);
    writeJsonFile(path.join(outputDir, 'blog-featured.json'), []);
    
    console.log('✅ Created fallback empty data files');
    throw error; // Re-throw for proper error handling
  }
}

// Run the build if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildBlog().catch(error => {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  });
}

export { buildBlog };