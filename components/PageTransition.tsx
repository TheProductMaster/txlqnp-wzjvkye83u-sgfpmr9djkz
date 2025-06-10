import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  currentPage: string;
  className?: string;
}

export function PageTransition({ children, currentPage, className = '' }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [previousPage, setPreviousPage] = useState(currentPage);

  useEffect(() => {
    if (currentPage !== previousPage) {
      // Start fade out
      setIsVisible(false);
      
      // After fade out completes, update content and fade in
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setPreviousPage(currentPage);
        setIsVisible(true);
      }, 150); // Half of transition duration

      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
      setIsVisible(true);
    }
  }, [children, currentPage, previousPage]);

  return (
    <div 
      className={`transition-all duration-300 ease-in-out ${
        isVisible 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-2'
      } ${className}`}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: '300ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {displayChildren}
    </div>
  );
}

// Alternative transition component with slide effect
export function SlidePageTransition({ children, currentPage, className = '' }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [previousPage, setPreviousPage] = useState(currentPage);

  useEffect(() => {
    if (currentPage !== previousPage) {
      // Start slide out
      setIsVisible(false);
      
      // After slide out completes, update content and slide in
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setPreviousPage(currentPage);
        setIsVisible(true);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
      setIsVisible(true);
    }
  }, [children, currentPage, previousPage]);

  return (
    <div 
      className={`transition-all duration-400 ease-out ${
        isVisible 
          ? 'opacity-100 transform translate-x-0' 
          : 'opacity-0 transform translate-x-4'
      } ${className}`}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: '400ms',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {displayChildren}
    </div>
  );
}

// Subtle scale transition
export function ScalePageTransition({ children, currentPage, className = '' }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [previousPage, setPreviousPage] = useState(currentPage);

  useEffect(() => {
    if (currentPage !== previousPage) {
      setIsVisible(false);
      
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setPreviousPage(currentPage);
        setIsVisible(true);
      }, 175);

      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
      setIsVisible(true);
    }
  }, [children, currentPage, previousPage]);

  return (
    <div 
      className={`transition-all duration-350 ease-out ${
        isVisible 
          ? 'opacity-100 transform scale-100' 
          : 'opacity-0 transform scale-98'
      } ${className}`}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: '350ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {displayChildren}
    </div>
  );
}

// Enhanced transition with blur effect (more subtle)
export function BlurPageTransition({ children, currentPage, className = '' }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [previousPage, setPreviousPage] = useState(currentPage);

  useEffect(() => {
    if (currentPage !== previousPage) {
      setIsVisible(false);
      
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setPreviousPage(currentPage);
        setIsVisible(true);
      }, 150);

      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
      setIsVisible(true);
    }
  }, [children, currentPage, previousPage]);

  return (
    <div 
      className={`transition-all duration-300 ease-in-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(2px)',
        transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(8px) scale(0.99)',
        transitionProperty: 'opacity, filter, transform',
        transitionDuration: '300ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {displayChildren}
    </div>
  );
}