import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { testimonials } from './data/index';

export function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const sortedTestimonials = testimonials.testimonials
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    })
    .slice(0, 6);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % sortedTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, sortedTestimonials.length]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-400'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden section-dark">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape w-40 h-40 opacity-10" style={{ top: '10%', right: '20%', animationDelay: '0s' }}></div>
        <div className="floating-square w-20 h-20 opacity-5" style={{ bottom: '20%', left: '10%', animationDelay: '3s' }}></div>
        <div className="floating-triangle opacity-8" style={{ top: '60%', right: '60%', animationDelay: '6s' }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <Badge className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 text-sm px-6 py-3 mb-6">
            Client Success Stories
          </Badge>
          
          <h2 className="heading-font text-5xl lg:text-6xl xl:text-7xl mb-6 text-primary-foreground">
            <span className="text-primary-foreground">What Our</span>
            <br />
            <span className="gradient-text">Clients Say</span>
          </h2>
          
          <div className="dark-section-card p-8">
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about 
              working with us and the results we've achieved together.
            </p>
          </div>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="dark-section-card p-8 lg:p-12 text-center hover-lift">
            <CardContent className="p-0">
              {/* Stars */}
              <div className="flex justify-center mb-8">
                {renderStars(sortedTestimonials[activeTestimonial].rating)}
              </div>
              
              {/* Quote */}
              <blockquote className="text-2xl lg:text-3xl text-primary-foreground leading-relaxed mb-8 font-light italic">
                "{sortedTestimonials[activeTestimonial].quote}"
              </blockquote>
              
              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={sortedTestimonials[activeTestimonial].avatar}
                  alt={sortedTestimonials[activeTestimonial].clientName}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-accent/20"
                />
                <div className="text-left">
                  <div className="font-semibold text-lg text-primary-foreground">
                    {sortedTestimonials[activeTestimonial].clientName}
                  </div>
                  <div className="text-primary-foreground/70">
                    {sortedTestimonials[activeTestimonial].clientTitle}
                  </div>
                  <div className="text-sm text-primary-foreground/60">
                    {sortedTestimonials[activeTestimonial].company}
                  </div>
                </div>
                {sortedTestimonials[activeTestimonial].featured && (
                  <Badge className="btn-accent">
                    Featured
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center space-x-4 mb-16">
          {sortedTestimonials.map((_, index) => (
            <button
              key={index}
              className={`w-12 h-12 rounded-full transition-all duration-300 border-2 overflow-hidden ${
                index === activeTestimonial
                  ? 'border-accent scale-110 shadow-accent'
                  : 'border-primary-foreground/20 hover:border-primary-foreground/40 hover:scale-105'
              }`}
              onClick={() => {
                setActiveTestimonial(index);
                setIsAutoPlaying(false);
              }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <img
                src={sortedTestimonials[index].avatar}
                alt={sortedTestimonials[index].clientName}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sortedTestimonials.slice(0, 3).map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="dark-section-card p-6 hover-lift group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.clientName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-foreground/20"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold truncate text-primary-foreground">
                      {testimonial.clientName}
                    </h4>
                    <p className="text-xs text-primary-foreground/70 truncate">
                      {testimonial.clientTitle} • {testimonial.company}
                    </p>
                  </div>
                  {testimonial.featured && (
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  )}
                </div>

                {/* Rating */}
                <div className="mb-4 scale-75 origin-left">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-primary-foreground/90 leading-relaxed">
                  "{testimonial.quote.slice(0, 120)}..."
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="dark-section-card p-8 lg:p-12 max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-primary-foreground">
              <span className="text-primary-foreground">Ready to Join Our</span>
              <br />
              <span className="gradient-text">Success Stories?</span>
            </h3>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Let's work together to create your own testimonial story of digital transformation and business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg"
                className="btn-accent px-8 py-6 rounded-xl magnetic"
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
                className="btn-outline px-8 py-6 rounded-xl magnetic"
                onClick={() => window.location.hash = 'about'}
              >
                Read All Reviews
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}