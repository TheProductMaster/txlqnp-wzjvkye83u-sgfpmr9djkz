import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesOverview } from './components/ServicesOverview';
import { AboutSnapshot } from './components/AboutSnapshot';
import { PortfolioHighlights } from './components/PortfolioHighlights';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ServicesPage } from './components/pages/ServicesPage';
import { PortfolioPage } from './components/pages/PortfolioPage';
import { AboutPage } from './components/pages/AboutPage';
import { BlogPage } from './components/pages/BlogPage';
import { BlogDetailPage } from './components/pages/BlogDetailPage';
import { ContactPage } from './components/pages/ContactPage';
import { ToastContainer } from './components/ui/toast';
import { PageTransition } from './components/PageTransition';
import { useAnalytics, useScrollTracking, usePerformanceTracking } from './components/hooks/useAnalytics';

type PageType = 'home' | 'services' | 'portfolio' | 'about' | 'blog' | 'blog-detail' | 'contact';

interface PageTitles {
  readonly [key: string]: string;
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [blogPostId, setBlogPostId] = useState<string | null>(null);
  
  // Initialize analytics hooks
  const analytics = useAnalytics();
  useScrollTracking();
  usePerformanceTracking();

  // Get page title for analytics
  const getPageTitle = (page: string, postId?: string | null): string => {
    const titles: PageTitles = {
      'home': 'IT Services Agency - Web Development & Digital Solutions',
      'services': 'Our Services - Web Development, UI/UX, Mobile Apps & More',
      'portfolio': 'Portfolio - Our Work & Client Success Stories',
      'about': 'About Us - Professional IT Services Team',
      'blog': 'Blog - Latest Tech Insights & Industry News',
      'blog-detail': postId ? `Blog Post: ${postId}` : 'Blog Post',
      'contact': 'Contact Us - Get Your Project Started Today'
    };
    return titles[page] || 'IT Services Agency';
  };

  // Simple routing based on hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      let newPage: PageType = 'home';
      let newBlogPostId: string | null = null;
      
      // Handle blog detail routes (blog/post-id)
      if (hash.startsWith('blog/')) {
        const postId = hash.replace('blog/', '');
        newPage = 'blog-detail';
        newBlogPostId = postId;
      } else if (['services', 'portfolio', 'about', 'blog', 'contact'].includes(hash)) {
        newPage = hash as PageType;
        newBlogPostId = null;
      } else if (hash === '' || hash === 'home') {
        newPage = 'home';
        newBlogPostId = null;
      }

      // Only update state and track if page actually changed
      if (newPage !== currentPage || newBlogPostId !== blogPostId) {
        setCurrentPage(newPage);
        setBlogPostId(newBlogPostId);

        // Track page view with analytics
        const pageTitle = getPageTitle(newPage, newBlogPostId);
        analytics.trackPageView(newPage, pageTitle);

        // Track specific page events
        switch (newPage) {
          case 'services':
            analytics.trackServiceView('Services Overview');
            break;
          case 'blog':
            analytics.trackBlogInteraction('blog_list_view');
            break;
          case 'blog-detail':
            if (newBlogPostId) {
              analytics.trackBlogInteraction('blog_post_view', newBlogPostId);
            }
            break;
          case 'contact':
            analytics.trackContactInteraction('contact_page_view');
            break;
          case 'portfolio':
            analytics.trackInteraction('Portfolio Page');
            break;
          case 'about':
            analytics.trackInteraction('About Page');
            break;
          default:
            // Home page - no additional tracking needed
            break;
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage, blogPostId, analytics]);

  const renderPage = () => {
    switch (currentPage) {
      case 'services':
        return (
          <main role="main" aria-label="Services">
            <ServicesPage />
          </main>
        );
      case 'portfolio':
        return (
          <main role="main" aria-label="Portfolio">
            <PortfolioPage />
          </main>
        );
      case 'about':
        return (
          <main role="main" aria-label="About Us">
            <AboutPage />
          </main>
        );
      case 'blog':
        return (
          <main role="main" aria-label="Blog">
            <BlogPage />
          </main>
        );
      case 'blog-detail':
        return (
          <main role="main" aria-label="Blog Post">
            {blogPostId ? <BlogDetailPage postId={blogPostId} /> : <BlogPage />}
          </main>
        );
      case 'contact':
        return (
          <main role="main" aria-label="Contact Us">
            <ContactPage />
          </main>
        );
      case 'home':
      default:
        return (
          <main role="main" aria-label="Home">
            <Hero />
            <ServicesOverview />
            <AboutSnapshot />
            <PortfolioHighlights />
            <Testimonials />
            <FinalCTA />
          </main>
        );
    }
  };

  // Determine current page for header navigation highlighting
  const getHeaderCurrentPage = (): PageType => {
    if (currentPage === 'blog-detail') {
      return 'blog';
    }
    return currentPage;
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Header currentPage={getHeaderCurrentPage()} />
      
      {/* Page content with subtle transitions */}
      <PageTransition currentPage={currentPage} className="min-h-screen">
        {renderPage()}
      </PageTransition>
      
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}