import { useEffect } from 'react';

// Google Analytics configuration
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID

// Declare gtag function for TypeScript
  declare global {
    interface Window {
      gtag: (...args: unknown[]) => void;
      dataLayer: unknown[];
    }
  }

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function useAnalytics() {
  useEffect(() => {
    // Initialize Google Analytics 4
    const initializeGA = () => {
      // Create script tag for gtag
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      // Initialize dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };

      // Configure GA4
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
      });

      console.warn('Google Analytics 4 initialized');
    };

    // Only initialize in production or when GA_MEASUREMENT_ID is properly set
    if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      initializeGA();
    } else {
      console.warn('Analytics in development mode - tracking disabled');
    }
  }, []);

  // Track page views
  const trackPageView = (page: string, title?: string) => {
    if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: title || document.title,
        page_location: window.location.href,
        page_path: `#${page}`,
      });

      console.warn(`Page view tracked: ${page}`);
    }
  };

  // Track custom events
  const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });

      console.warn(`Event tracked: ${category} - ${action}`);
    }
  };

  // Track user interactions
  const trackInteraction = (element: string, action: string = 'click') => {
    trackEvent({
      action,
      category: 'User Interaction',
      label: element,
    });
  };

  // Track form submissions
  const trackFormSubmission = (formName: string, success: boolean = true) => {
    trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'Form',
      label: formName,
      value: success ? 1 : 0,
    });
  };

  // Track theme changes
  const trackThemeChange = (theme: string) => {
    trackEvent({
      action: 'theme_change',
      category: 'User Preference',
      label: theme,
    });
  };

  // Track service page visits
  const trackServiceView = (serviceName: string) => {
    trackEvent({
      action: 'service_view',
      category: 'Services',
      label: serviceName,
    });
  };

  // Track blog interactions
  const trackBlogInteraction = (action: string, postId?: string) => {
    trackEvent({
      action,
      category: 'Blog',
      label: postId || 'general',
    });
  };

  // Track contact interactions
  const trackContactInteraction = (method: string) => {
    trackEvent({
      action: 'contact_attempt',
      category: 'Contact',
      label: method,
    });
  };

  return {
    trackPageView,
    trackEvent,
    trackInteraction,
    trackFormSubmission,
    trackThemeChange,
    trackServiceView,
    trackBlogInteraction,
    trackContactInteraction,
  };
}

// Utility function to track scroll depth
export function useScrollTracking() {
  useEffect(() => {
    if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;

    let scrollDepthTracked = false;
    const scrollDepthThresholds = [25, 50, 75, 90];
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      scrollDepthThresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);
          
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'User Engagement',
              event_label: `${threshold}%`,
              value: threshold,
            });
          }
        }
      });

      // Track if user reached bottom
      if (scrollPercent >= 95 && !scrollDepthTracked) {
        scrollDepthTracked = true;
        if (window.gtag) {
          window.gtag('event', 'page_scroll_complete', {
            event_category: 'User Engagement',
            event_label: 'Reached Bottom',
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

// Performance tracking utility
export function usePerformanceTracking() {
  useEffect(() => {
    if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;

    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          for (const entry of entries) {
            if (entry.entryType === 'largest-contentful-paint') {
              const lcp = Math.round(entry.startTime);
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  event_category: 'Performance',
                  event_label: 'LCP',
                  value: lcp,
                });
              }
            }
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }

      // First Input Delay (FID) - tracked automatically by GA4
      // Cumulative Layout Shift (CLS) - tracked automatically by GA4
    };

    // Track page load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData && window.gtag) {
          const loadTime = Math.round(perfData.loadEventEnd - perfData.loadEventStart);
          window.gtag('event', 'page_load_time', {
            event_category: 'Performance',
            value: loadTime,
          });
        }
        trackWebVitals();
      }, 1000);
    });
  }, []);
}