import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { services } from './data/index';

export function ServicesOverview() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [expandedTech, setExpandedTech] = useState<string[]>([]);

  // Get all services
  const allServices = services.services;
  
  // Split into main services (first 2) and additional services (rest)
  const mainServices = allServices.slice(0, 2);
  const additionalServices = allServices.slice(2);

  const toggleTechExpansion = (serviceId: string) => {
    setExpandedTech(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden section-muted">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape w-40 h-40 opacity-5" style={{ top: '10%', right: '15%', animationDelay: '0s' }}></div>
        <div className="floating-square w-20 h-20 opacity-3" style={{ bottom: '20%', left: '10%', animationDelay: '3s' }}></div>
        <div className="floating-triangle opacity-4" style={{ top: '60%', right: '70%', animationDelay: '6s' }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge className="bg-accent/10 text-accent border-accent/20 text-sm px-6 py-3 mb-6">
            Our Expertise
          </Badge>
          
          <h2 className="heading-font text-5xl lg:text-6xl xl:text-7xl mb-6">
            <span className="gradient-text">Services</span> That
            <br />
            <span className="text-foreground">Scale Business</span>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed">
              From concept to deployment, we provide comprehensive digital solutions 
              that transform ideas into market-leading products.
            </p>
          </div>
        </div>

        {/* Main Services Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {mainServices.map((service) => {
            const isHovered = hoveredService === service.id;
            const isExpanded = expandedTech.includes(service.id);
            const displayTech = isExpanded ? service.technologies : service.technologies.slice(0, 4);
            
            return (
              <Card
                key={service.id}
                className="modern-card hover-lift group cursor-pointer overflow-hidden relative p-8 lg:p-10"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-0 h-full flex flex-col relative z-10">
                  {/* Service Icon */}
                  <div className="w-20 h-20 text-5xl mb-8 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center shadow-accent group-hover:scale-110 transition-transform duration-500">
                    <span>{service.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 mb-6">
                      {service.title}
                    </h3>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      {service.shortDescription}
                    </p>

                    {/* Key Features */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {service.features.slice(0, 4).map((feature) => (
                          <div key={feature} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {displayTech.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className="text-xs hover:bg-accent/10 transition-colors duration-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {service.technologies.length > 4 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTechExpansion(service.id);
                            }}
                            className="text-xs px-2 py-1 border border-accent/40 rounded-md hover:bg-accent/10 transition-colors duration-300 cursor-pointer text-accent hover:border-accent/60"
                          >
                            {isExpanded 
                              ? 'Show less' 
                              : `+${service.technologies.length - 4} more`
                            }
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div>
                      <span className="text-sm text-muted-foreground">Starting at</span>
                      <div className="text-2xl font-bold gradient-text">
                        {service.startingPrice}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {service.deliveryTime}
                      </span>
                    </div>
                    
                    <Button
                      className="btn-accent opacity-0 group-hover:opacity-100 transition-all duration-300"
                      onClick={() => window.location.hash = 'contact'}
                    >
                      Get Started
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Button>
                  </div>

                  {/* Hover Indicator */}
                  <div className={`
                    absolute top-6 right-6 w-3 h-3 rounded-full bg-accent
                    transition-all duration-300 ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                  `}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {additionalServices.map((service, index) => {
            const isHovered = hoveredService === service.id;
            const isExpanded = expandedTech.includes(service.id);
            const displayTech = isExpanded ? service.technologies : service.technologies.slice(0, 3);
            
            return (
              <Card
                key={service.id}
                className="modern-card hover-lift group cursor-pointer overflow-hidden relative p-6"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardContent className="p-0 h-full flex flex-col relative z-10">
                  {/* Service Icon */}
                  <div className="w-16 h-16 text-3xl mb-6 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-modern group-hover:scale-110 transition-transform duration-500">
                    <span>{service.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-base text-muted-foreground leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {displayTech.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className="text-xs hover:bg-primary/10 transition-colors duration-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {service.technologies.length > 3 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTechExpansion(service.id);
                            }}
                            className="text-xs px-2 py-1 border border-primary/40 rounded-md hover:bg-primary/10 transition-colors duration-300 cursor-pointer text-primary hover:border-primary/60"
                          >
                            {isExpanded 
                              ? 'Less' 
                              : `+${service.technologies.length - 3}`
                            }
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-sm text-muted-foreground">From</span>
                      <div className="text-lg font-bold gradient-text">
                        {service.startingPrice}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10"
                      onClick={() => window.location.hash = 'services'}
                    >
                      Learn More
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>

                  {/* Hover Indicator */}
                  <div className={`
                    absolute top-4 right-4 w-2 h-2 rounded-full bg-primary
                    transition-all duration-300 ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                  `}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="modern-card p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ready to Transform Your Business?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss your project requirements and create a solution that drives results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-accent magnetic"
                onClick={() => window.location.hash = 'contact'}
              >
                Get Free Consultation
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button 
                variant="outline" 
                className="btn-outline magnetic"
                onClick={() => window.location.hash = 'services'}
              >
                View All Services
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}