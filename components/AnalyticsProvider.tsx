import { ReactNode } from 'react'
import { useAnalytics } from './hooks/useAnalytics'
import { AnalyticsContext } from './hooks/analyticsContext'


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

