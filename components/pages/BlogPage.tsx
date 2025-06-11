import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useBlogData, searchPosts, getPostsByCategory, type BlogPost } from '../hooks/useBlogData';

export function BlogPage() {
  const { posts, categories, featuredPosts, loading, error } = useBlogData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = posts;

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = getPostsByCategory(filtered, selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchPosts(filtered, searchQuery);
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Error Loading Blog</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button onClick={() => window.location.reload()} className="btn-accent">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 px-4 gradient-mesh">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 hero-text">
            Our <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Insights, tutorials, and industry trends from our team of experts
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-border bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('All')}
              className={selectedCategory === 'All' ? 'btn-accent' : ''}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'btn-accent' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <Card
                  key={post.id}
                  className="modern-card hover-lift cursor-pointer overflow-hidden"
                  onClick={() => window.location.hash = `blog/${post.id}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-accent/10 text-accent border-accent/20">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 px-4 section-muted">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">
              {searchQuery ? `Search Results (${filteredPosts.length})` : 
               selectedCategory === 'All' ? 'Latest Articles' : selectedCategory}
            </h2>
            <p className="text-muted-foreground">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-4">No Articles Found</h3>
              <p className="text-muted-foreground mb-8">
                {searchQuery 
                  ? `No articles match "${searchQuery}". Try a different search term.`
                  : 'No articles available in this category yet.'
                }
              </p>
              {(searchQuery || selectedCategory !== 'All') && (
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="btn-accent"
                >
                  View All Articles
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="modern-card hover-lift cursor-pointer overflow-hidden"
                  onClick={() => window.location.hash = `blog/${post.id}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get the latest insights and tutorials delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <Button className="btn-accent px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}