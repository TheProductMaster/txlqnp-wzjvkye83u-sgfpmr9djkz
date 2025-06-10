import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { settings } from './data/index';
import { useMediaQuery } from './hooks/useMediaQuery';

interface HeaderProps {
  currentPage: string;
}

export function Header({ currentPage }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 639px)');

  const navItems = [
    { id: 'home', label: 'Home', hash: '' },
    { id: 'services', label: 'Services', hash: 'services' },
    { id: 'portfolio', label: 'Portfolio', hash: 'portfolio' },
    { id: 'about', label: 'About', hash: 'about' },
    { id: 'blog', label: 'Blog', hash: 'blog' },
    { id: 'contact', label: 'Contact', hash: 'contact' }
  ];

  const handleNavClick = (hash: string) => {
    window.location.hash = hash;
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  // Prevent menu from closing when clicking inside it
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-bg transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300 cursor-pointer focus-ring"
            aria-label="Navigate to homepage"
          >
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-accent">
              <span className="text-primary-foreground text-lg font-bold">N</span>
            </div>
            <div>
              <span className="text-xl font-bold gradient-text">
                {settings.company.name}
              </span>
              <div className="text-xs text-muted-foreground -mt-1 hidden sm:block">
                Digital Innovation
              </div>
            </div>
          </button>

          {/* Desktop Navigation - Only show on desktop/tablet */}
          {!isMobile && (
            <nav className="flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.hash)}
                  className={`nav-link ${
                    (currentPage === 'home' && item.id === 'home') || 
                    (currentPage !== 'home' && currentPage === item.id)
                      ? 'nav-link-active' 
                      : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          {/* Right Section - Theme Toggle + CTA */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {!isMobile && (
              <Button 
                className="btn-accent"
                onClick={() => handleNavClick('contact')}
              >
                Get Started
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            )}

            {/* Mobile Menu Button - Only show on mobile */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 relative z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-5 h-5 relative">
                  <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 top-2' : 'top-1'
                  }`} />
                  <span className={`absolute h-0.5 w-5 bg-current top-2 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`} />
                  <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 top-2' : 'top-3'
                  }`} />
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Only show on mobile when menu is open */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="mobile-menu absolute top-full left-0 right-0 z-40 bg-background border-t border-border shadow-lg"
          onClick={handleMenuClick}
        >
          <div className="container mx-auto px-4">
            <nav className="py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.hash)}
                  className={`mobile-menu-item ${
                    (currentPage === 'home' && item.id === 'home') || 
                    (currentPage !== 'home' && currentPage === item.id)
                      ? 'mobile-menu-item-active' 
                      : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3">
                <Button 
                  className="btn-accent w-full"
                  onClick={() => handleNavClick('contact')}
                >
                  Get Started
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}