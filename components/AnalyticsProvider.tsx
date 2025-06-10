import { createContext, useContext, ReactNode } from 'react';
import { useAnalytics } from './hooks/useAnalytics';

interface AnalyticsContextType {
  trackPageView: (page: string, title?: string) => void;
  trackEvent: (event: { action: string; category: string; label?: string; value?: number }) => void;
  trackInteraction: (element: string, action?: string) => void;
  trackFormSubmission: (formName: string, success?: boolean) => void;
  trackThemeChange: (theme: string) => void;
  trackServiceView: (serviceName: string) => void;
  trackBlogInteraction: (action: string, postId?: string) => void;
  trackContactInteraction: (method: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const analytics = useAnalytics();

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    // Return mock functions if provider is not available
    return {
      trackPageView: () => {},
      trackEvent: () => {},
      trackInteraction: () => {},
      trackFormSubmission: () => {},
      trackThemeChange: () => {},
      trackServiceView: () => {},
      trackBlogInteraction: () => {},
      trackContactInteraction: () => {},
    };
  }
  return context;
}

// Higher-order component to inject analytics
export function withAnalytics<T extends object>(Component: React.ComponentType<T>) {
  return function AnalyticsWrappedComponent(props: T) {
    const analytics = useAnalyticsContext();
    return <Component {...props} analytics={analytics} />;
  };
}

// Hook for tracking button clicks
export function useButtonTracking() {
  const analytics = useAnalyticsContext();

  const trackButtonClick = (buttonName: string, context?: string) => {
    analytics.trackInteraction(`${buttonName}${context ? ` - ${context}` : ''}`, 'click');
  };

  const trackLinkClick = (linkName: string, destination: string) => {
    analytics.trackEvent({
      action: 'link_click',
      category: 'Navigation',
      label: `${linkName} → ${destination}`,
    });
  };

  const trackDownload = (fileName: string, fileType: string) => {
    analytics.trackEvent({
      action: 'file_download',
      category: 'Downloads',
      label: `${fileName} (${fileType})`,
    });
  };

  return {
    trackButtonClick,
    trackLinkClick,
    trackDownload,
  };
}

// Hook for tracking form interactions
export function useFormTracking() {
  const analytics = useAnalyticsContext();

  const trackFormStart = (formName: string) => {
    analytics.trackEvent({
      action: 'form_start',
      category: 'Form',
      label: formName,
    });
  };

  const trackFormField = (formName: string, fieldName: string, action: string = 'focus') => {
    analytics.trackEvent({
      action: `form_field_${action}`,
      category: 'Form',
      label: `${formName} - ${fieldName}`,
    });
  };

  const trackFormValidation = (formName: string, fieldName: string, isValid: boolean) => {
    analytics.trackEvent({
      action: isValid ? 'form_validation_success' : 'form_validation_error',
      category: 'Form',
      label: `${formName} - ${fieldName}`,
      value: isValid ? 1 : 0,
    });
  };

  return {
    trackFormStart,
    trackFormField,
    trackFormValidation,
    trackFormSubmission: analytics.trackFormSubmission,
  };
}