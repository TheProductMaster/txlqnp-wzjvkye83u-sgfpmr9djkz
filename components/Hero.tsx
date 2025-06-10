import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { settings } from './data/index';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const achievements = [
    {
      label: "Projects Delivered",
      value: settings.company.projectsCompleted,
      icon: "🚀",
    },
    {
      label: "Happy Clients", 
      value: settings.company.clientsSatisfied,
      icon: "💫",
    },
    {
      label: "Team Experts",
      value: settings.company.teamMembers,
      icon: "⭐",
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden geometric-bg pt-24">
      {/* Animated Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div 
          className="floating-shape w-32 h-32"
          style={{
            top: `${20 + mousePosition.y * 0.05}%`,
            left: `${10 + mousePosition.x * 0.05}%`,
            animationDelay: '0s'
          }}
        ></div>
        <div 
          className="floating-square w-16 h-16"
          style={{
            top: `${60 + mousePosition.y * 0.03}%`,
            right: `${10 + mousePosition.x * 0.03}%`,
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="floating-triangle"
          style={{
            bottom: `${20 + mousePosition.y * 0.04}%`,
            left: `${40 + mousePosition.x * 0.04}%`,
            animationDelay: '4s'
          }}
        ></div>
        <div 
          className="floating-shape w-24 h-24"
          style={{
            top: `${80}%`,
            right: `${20}%`,
            animationDelay: '3s'
          }}
        ></div>
        <div 
          className="floating-square w-12 h-12"
          style={{
            top: `${10}%`,
            right: `${60}%`,
            animationDelay: '5s'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Badge */}
          <div className="text-center mb-8 animate-fade-in-up">
            <Badge className="bg-accent/10 text-accent border-accent/20 text-sm px-6 py-3 hover:scale-105 transition-transform duration-300">
              ✨ Building Tomorrow's Digital Experiences
            </Badge>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 animate-slide-in-left">
              <h1 className="display-font text-6xl sm:text-7xl lg:text-8xl xl:text-9xl">
                <span className="block gradient-text">Design</span>
                <span className="block hero-text">Meets</span>
                <span className="block gradient-text">Innovation</span>
              </h1>
              
              <div className="modern-card p-8">
                <p className="text-xl lg:text-2xl text-foreground leading-relaxed max-w-xl">
                  We transform ambitious ideas into{' '}
                  <span className="text-primary font-semibold">stunning digital experiences</span>
                  {' '}that drive growth and create lasting impact.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button 
                  size="lg" 
                  className="btn-primary px-8 py-6 text-lg rounded-2xl magnetic"
                  onClick={() => window.location.hash = 'contact'}
                >
                  Start Your Project
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="btn-outline px-8 py-6 text-lg rounded-2xl group magnetic"
                  onClick={() => window.location.hash = 'portfolio'}
                >
                  View Case Studies
                  <svg className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Right Column - Stats Cards */}
            <div className="space-y-6 animate-slide-in-right">
              <div className="grid gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.label}
                    className="group modern-card p-6 hover-lift"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center text-2xl shadow-accent group-hover:scale-110 transition-transform duration-300">
                        {achievement.icon}
                      </div>
                      <div>
                        <div className="text-3xl font-bold gradient-text">
                          {achievement.value}
                        </div>
                        <div className="text-foreground font-semibold">
                          {achievement.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating Service Preview */}
              <div className="accent-card p-6 animate-gentle-float">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg"></div>
                  <span className="text-sm text-foreground font-semibold">Latest Project</span>
                </div>
                <h3 className="font-bold mb-2 text-foreground">TechCorp Enterprise Platform</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  AI-powered analytics dashboard with 40% efficiency improvement
                </p>
                <div className="flex items-center text-xs text-green-600 font-semibold">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Just Delivered
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}