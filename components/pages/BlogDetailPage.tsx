import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { useBlogData, getPostById, getRelatedPosts, getNextPost, getPreviousPost, type BlogPost } from '../hooks/useBlogData';

interface BlogDetailPageProps {
  postId: string;
}

export function BlogDetailPage({ postId }: BlogDetailPageProps) {
  const { posts, loading, error } = useBlogData();
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [nextPost, setNextPost] = useState<BlogPost | null>(null);
  const [prevPost, setPrevPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (posts.length > 0) {
      const post = getPostById(posts, postId);
      setCurrentPost(post || null);

      if (post) {
        // Find related posts
        const related = getRelatedPosts(post, posts, 5);
        setRelatedPosts(related);

        // Find next and previous posts
        setNextPost(getNextPost(posts, postId));
        setPrevPost(getPreviousPost(posts, postId));
      }
    }
  }, [posts, postId]);

  const handleShare = (platform: string) => {
    if (!currentPost) return;
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(currentPost.title);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Error Loading Article</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button onClick={() => window.location.hash = 'blog'} className="btn-accent">
            ← Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => window.location.hash = 'blog'} className="btn-accent">
            ← Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section with Featured Image */}
      <section className="py-12 px-4 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
              <button 
                onClick={() => window.location.hash = 'blog'}
                className="hover:text-accent transition-colors"
              >
                Blog
              </button>
              <span>/</span>
              <span className="text-foreground">{currentPost.title}</span>
            </nav>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className="bg-accent/10 text-accent border-accent/20">
                {currentPost.category}
              </Badge>
              <span className="text-muted-foreground">{currentPost.date}</span>
              <span className="text-muted-foreground">{currentPost.readTime}</span>
              <div className="flex items-center gap-2">
                {currentPost.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-foreground leading-tight">
              {currentPost.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-4xl">
              {currentPost.excerpt}
            </p>

            {/* Author Info and Share */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage 
                    src={currentPost.authorAvatar} 
                    alt={currentPost.author}
                  />
                  <AvatarFallback>
                    {currentPost.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{currentPost.author}</p>
                  <p className="text-sm text-muted-foreground">{currentPost.authorBio}</p>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground mr-2">Share:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="w-9 h-9 p-0"
                  title="Share on Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                  className="w-9 h-9 p-0"
                  title="Share on LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                  className="w-9 h-9 p-0"
                  title="Share on Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="w-9 h-9 p-0"
                  title="Copy Link"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 mb-12">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <img
                src={currentPost.image}
                alt={currentPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <section className="px-4 mb-16">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Article Content */}
                <Card className="modern-card p-8 lg:p-12 mb-12">
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-accent prose-a:text-accent hover:prose-a:text-accent/80"
                    dangerouslySetInnerHTML={{ __html: currentPost.content }}
                  />
                </Card>

                {/* Author Section */}
                <Card className="modern-card p-8 mb-12">
                  <div className="flex items-start space-x-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage 
                        src={currentPost.authorAvatar} 
                        alt={currentPost.author}
                      />
                      <AvatarFallback className="text-xl">
                        {currentPost.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">About {currentPost.author}</h3>
                      <p className="text-muted-foreground mb-4">{currentPost.authorBio}</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Follow</Button>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-stretch gap-4 mb-12">
                  {prevPost ? (
                    <Button
                      variant="outline"
                      onClick={() => window.location.hash = `blog/${prevPost.id}`}
                      className="flex items-center justify-start space-x-3 px-6 py-6 h-auto text-left max-w-md flex-1 hover-lift"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Previous Article</p>
                        <p className="font-semibold line-clamp-2 text-sm leading-relaxed">{prevPost.title}</p>
                      </div>
                    </Button>
                  ) : (
                    <div className="flex-1"></div>
                  )}

                  {nextPost ? (
                    <Button
                      variant="outline"
                      onClick={() => window.location.hash = `blog/${nextPost.id}`}
                      className="flex items-center justify-end space-x-3 px-6 py-6 h-auto text-right max-w-md flex-1 hover-lift"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Next Article</p>
                        <p className="font-semibold line-clamp-2 text-sm leading-relaxed">{nextPost.title}</p>
                      </div>
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Button>
                  ) : (
                    <div className="flex-1"></div>
                  )}
                </div>

                {/* Comments Section Placeholder */}
                <Card className="modern-card p-8">
                  <h3 className="text-2xl font-bold mb-6">Comments</h3>
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💬</div>
                    <p className="text-muted-foreground mb-4">
                      Comments feature coming soon! We're working on building an engaging discussion platform.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      In the meantime, feel free to reach out to us on social media or through our contact form.
                    </p>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 space-y-8">
                  {/* Quick Actions */}
                  <Card className="modern-card p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => handleShare('twitter')}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Share on Twitter
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={copyToClipboard}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Link
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => window.location.hash = 'blog'}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                      </Button>
                    </div>
                  </Card>

                  {/* Related & Popular Articles */}
                  {relatedPosts.length > 0 && (
                    <Card className="modern-card p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        Related Articles
                      </h3>
                        <div className="space-y-6">
                          {relatedPosts.map((post) => (
                          <div
                            key={post.id}
                            className="group cursor-pointer border-b border-border pb-4 last:border-b-0 last:pb-0"
                            onClick={() => window.location.hash = `blog/${post.id}`}
                          >
                            <div className="aspect-video rounded-lg overflow-hidden mb-3">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex items-start justify-between mb-2">
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${post.category === currentPost.category ? 'bg-accent/10 text-accent' : ''}`}
                              >
                                {post.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{post.readTime}</span>
                            </div>
                            <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-accent transition-colors leading-relaxed mb-2">
                              {post.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{post.author}</span>
                              <span>{post.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => window.location.hash = 'blog'}
                      >
                        View All Articles
                      </Button>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}