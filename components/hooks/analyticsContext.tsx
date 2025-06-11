import React, { createContext } from 'react'

export interface AnalyticsContextType {
  trackPageView: (_page: string, _title?: string) => void
  trackEvent: (_event: { action: string; category: string; label?: string; value?: number }) => void
  trackInteraction: (_element: string, _action?: string) => void
  trackFormSubmission: (_formName: string, _success?: boolean) => void
  trackThemeChange: (_theme: string) => void
  trackServiceView: (_serviceName: string) => void
  trackBlogInteraction: (_action: string, _postId?: string) => void
  trackContactInteraction: (_method: string) => void
}

export const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

export const useAnalyticsContext = () => {
  const context = React.useContext(AnalyticsContext)
  if (!context) {
    return {
      trackPageView: () => {},
      trackEvent: () => {},
      trackInteraction: () => {},
      trackFormSubmission: () => {},
      trackThemeChange: () => {},
      trackServiceView: () => {},
      trackBlogInteraction: () => {},
      trackContactInteraction: () => {},
    }
  }
  return context
}

export const withAnalytics = <T extends object>(Component: React.ComponentType<T>) => {
  return function AnalyticsWrappedComponent(props: T) {
    const analytics = useAnalyticsContext()
    return <Component {...props} analytics={analytics} />
  }
}

export const useButtonTracking = () => {
  const analytics = useAnalyticsContext()

  const trackButtonClick = (buttonName: string, context?: string) => {
    analytics.trackInteraction(`${buttonName}${context ? ` - ${context}` : ''}`, 'click')
  }

  const trackLinkClick = (linkName: string, destination: string) => {
    analytics.trackEvent({
      action: 'link_click',
      category: 'Navigation',
      label: `${linkName} → ${destination}`,
    })
  }

  const trackDownload = (fileName: string, fileType: string) => {
    analytics.trackEvent({
      action: 'file_download',
      category: 'Downloads',
      label: `${fileName} (${fileType})`,
    })
  }

  return {
    trackButtonClick,
    trackLinkClick,
    trackDownload,
  }
}

export const useFormTracking = () => {
  const analytics = useAnalyticsContext()

  const trackFormStart = (formName: string) => {
    analytics.trackEvent({
      action: 'form_start',
      category: 'Form',
      label: formName,
    })
  }

  const trackFormField = (formName: string, fieldName: string, action: string = 'focus') => {
    analytics.trackEvent({
      action: `form_field_${action}`,
      category: 'Form',
      label: `${formName} - ${fieldName}`,
    })
  }

  const trackFormValidation = (formName: string, fieldName: string, isValid: boolean) => {
    analytics.trackEvent({
      action: isValid ? 'form_validation_success' : 'form_validation_error',
      category: 'Form',
      label: `${formName} - ${fieldName}`,
      value: isValid ? 1 : 0,
    })
  }

  return {
    trackFormStart,
    trackFormField,
    trackFormValidation,
    trackFormSubmission: analytics.trackFormSubmission,
  }
}
