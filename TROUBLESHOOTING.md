# Troubleshooting Guide

This guide helps resolve common issues with the blog system and Netlify CMS setup.

## 🔍 Common Issues & Solutions

### 1. "Error loading blog data: Failed to load blog posts"

**Symptoms:**
- Blog page shows loading error
- Console shows fetch errors

**Solutions:**

#### A. Missing Dependencies
```bash
# Install missing dependencies
npm install

# Run setup script
npm run setup
```

#### B. Missing Blog Data Files
```bash
# Build blog data manually
npm run build:blog

# Check if data files exist
ls -la public/data/
```

#### C. Development Server Issues
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### 2. "gray-matter not found" Error

**Solution:**
```bash
# Install gray-matter dependency
npm install gray-matter

# Rebuild blog data
npm run build:blog
```

### 3. Blog Posts Not Showing

**Check these items:**
1. ✅ Markdown files exist in `/content/blog/`
2. ✅ Frontmatter has required fields
3. ✅ JSON files generated in `/public/data/`
4. ✅ Build script runs without errors

**Debug steps:**
```bash
# Check content directory
ls -la content/blog/

# Run build with verbose output
node scripts/build-blog.js

# Check generated JSON
cat public/data/blog-posts.json
```

### 4. Netlify CMS Admin Not Working

**Prerequisites:**
- ✅ Site deployed to Netlify
- ✅ Netlify Identity enabled
- ✅ Git Gateway enabled
- ✅ User invited and accepted

**Common fixes:**
1. Clear browser cache
2. Check browser console for errors
3. Verify admin config at `/admin/config.yml`
4. Ensure proper DNS/domain setup

### 5. Images Not Loading in CMS

**Solutions:**
```bash
# Create uploads directory
mkdir -p public/uploads

# Check permissions
chmod 755 public/uploads
```

**In Netlify:**
1. Enable Large Media (if needed)
2. Check media folder settings in config.yml
3. Verify image upload permissions

### 6. Build Failures on Netlify

**Common causes:**
- Missing environment variables
- Node.js version mismatch
- Dependency installation issues

**Solutions:**
```bash
# Set Node.js version in netlify.toml
[build.environment]
  NODE_VERSION = "18"

# Clear Netlify cache
# Go to Site Settings → Build & Deploy → Clear cache
```

### 7. Markdown Content Not Rendering

**Check these:**
1. ✅ Proper frontmatter format
2. ✅ Valid markdown syntax
3. ✅ Required fields present

**Example valid frontmatter:**
```yaml
---
title: "Your Post Title"
excerpt: "Brief description"
author: "Author Name"
authorBio: "Author bio"
authorAvatar: "/uploads/author.jpg"
date: "2024-03-15T10:00:00Z"
readTime: "5 min read"
image: "/uploads/featured.jpg"
category: "Technology"
tags: ["tag1", "tag2"]
featured: false
slug: "your-post-slug"
---
```

## 🛠 Development Commands

```bash
# Full setup from scratch
npm run setup

# Start development server
npm run dev

# Build blog data only
npm run build:blog

# Full production build
npm run build

# Preview production build
npm run preview
```

## 📊 Debugging Tools

### Check Data Files
```bash
# View blog posts
cat public/data/blog-posts.json | jq '.'

# View categories
cat public/data/blog-categories.json

# View featured posts
cat public/data/blog-featured.json
```

### Validate Markdown Files
```bash
# Check all markdown files
find content/blog -name "*.md" -exec echo "=== {} ===" \; -exec head -20 {} \;
```

### Browser Console Checks
```javascript
// Check if data is loading
fetch('/data/blog-posts.json')
  .then(r => r.json())
  .then(data => console.log('Blog posts:', data));

// Check for console errors
console.clear();
// Navigate to blog page and check for errors
```

## 🔧 Advanced Debugging

### Enable Verbose Logging
Add to your component:
```javascript
console.log('Blog data loading state:', { posts, loading, error });
```

### Check Network Tab
1. Open Developer Tools
2. Go to Network tab
3. Reload blog page
4. Check for failed requests to `/data/` endpoints

### Validate JSON Structure
```bash
# Check JSON validity
node -e "console.log(JSON.parse(require('fs').readFileSync('public/data/blog-posts.json')))"
```

## 📞 Getting Help

### Before asking for help, provide:
1. **Error message** (exact text)
2. **Browser console logs**
3. **Network tab screenshots**
4. **Your environment** (OS, Node version, browser)
5. **Steps to reproduce**

### Useful information commands:
```bash
# Node version
node --version

# NPM version
npm --version

# Check package.json
cat package.json | grep -A5 -B5 dependencies

# Check file structure
tree -I node_modules
```

## 🎯 Quick Fixes

### Reset Everything
```bash
# Nuclear option - start fresh
rm -rf node_modules package-lock.json
rm -rf public/data
npm install
npm run setup
```

### Force Rebuild Blog Data
```bash
# Remove existing data and rebuild
rm -rf public/data
npm run build:blog
```

### Clear All Caches
```bash
# Development
rm -rf node_modules/.vite
rm -rf dist

# Browser (manual)
# Open Dev Tools → Application → Storage → Clear storage
```

---

## ✅ System Health Check

Run this checklist to verify everything is working:

1. ✅ Dependencies installed: `npm list gray-matter`
2. ✅ Content directory exists: `ls content/blog/`
3. ✅ Data files generated: `ls public/data/`
4. ✅ Blog page loads: Visit `/blog`
5. ✅ Blog detail works: Visit `/blog/[post-id]`
6. ✅ No console errors: Check browser dev tools
7. ✅ Images loading: Check all blog images display
8. ✅ Navigation works: Test all blog navigation
9. ✅ Search functional: Test blog search feature
10. ✅ Categories filter: Test category filtering

If all items check out, your blog system is working correctly! 🎉