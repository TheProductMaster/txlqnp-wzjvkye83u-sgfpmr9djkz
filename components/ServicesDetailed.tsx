import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { services } from './data/index';

export function ServicesDetailed() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  // Get all services except the main ones shown in ServicesOverview
  const additionalServices = services.services.filter(service => 
    service.id !== 'web-development' && service.id !== 'ecommerce'
  );

  return (
    <section className="py-20 px-4 relative overflow-hidden section-light">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape w-32 h-32 opacity-3" style={{ top: '15%', left: '10%', animationDelay: '2s' }}></div>
        <div className="floating-square w-16 h-16 opacity-2" style={{ bottom: '25%', right: '15%', animationDelay: '5s' }}></div>
        <div className="floating-triangle opacity-3" style={{ top: '70%', left: '60%', animationDelay: '8s' }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-sm px-6 py-3 mb-6">
            Additional Services
          </Badge>
          
          <h2 className="heading-font text-5xl lg:text-6xl xl:text-7xl mb-6">
            <span className="text-foreground">Complete</span>
            <br />
            <span className="gradient-text">Digital Ecosystem</span>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive solutions covering every aspect of your digital journey, 
              from design to deployment and beyond.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {additionalServices.map((service, index) => {
            const isHovered = hoveredService === service.id;
            
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

                    {/* Key Features */}
                    <div className="mb-6">
                      <div className="grid grid-cols-1 gap-2">
                        {service.features.slice(0, 3).map((feature) => (
                          <div key={feature} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.slice(0, 3).map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className="text-xs hover:bg-primary/10 transition-colors duration-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {service.technologies.length > 3 && (
                          <Badge 
                            variant="outline" 
                            className="text-xs hover:border-primary/40 transition-colors duration-300"
                          >
                            +{service.technologies.length - 3}
                          </Badge>
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

        {/* Process Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Our <span className="gradient-text">Proven Process</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A streamlined approach that ensures quality delivery and exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your goals, requirements, and target audience"
              },
              {
                step: "02", 
                title: "Strategy",
                description: "Creating a comprehensive plan and technical roadmap"
              },
              {
                step: "03",
                title: "Development",
                description: "Building your solution with modern technologies and best practices"
              },
              {
                step: "04",
                title: "Launch",
                description: "Deploying your solution and providing ongoing support"
              }
            ].map((phase, index) => (
              <div key={phase.step} className="text-center group">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {phase.step}
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {phase.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="accent-card p-8 lg:p-12 max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              <span className="text-foreground">Ready to Get</span>
              <br />
              <span className="gradient-text">Started?</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a custom solution that perfectly fits your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg"
                className="btn-primary px-8 py-6 rounded-2xl magnetic"
              >
                Start Your Project
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="btn-outline px-8 py-6 rounded-2xl magnetic"
              >
                Schedule Consultation
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}