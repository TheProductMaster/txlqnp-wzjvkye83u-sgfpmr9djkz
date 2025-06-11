import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { services } from '../data/index';

export function ServicesPage() {
  const [selectedService, setSelectedService] = useState(services.services[0]);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden section-muted">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-shape w-32 h-32 opacity-5" style={{ top: '20%', right: '10%', animationDelay: '0s' }}></div>
          <div className="floating-square w-16 h-16 opacity-3" style={{ bottom: '30%', left: '15%', animationDelay: '2s' }}></div>
          <div className="floating-triangle opacity-4" style={{ top: '70%', right: '80%', animationDelay: '4s' }}></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <Badge className="bg-accent/10 text-accent border-accent/20 text-sm px-6 py-3 mb-8">
            Our Services
          </Badge>
          
          <h1 className="heading-font text-6xl lg:text-7xl xl:text-8xl mb-8">
            <span className="gradient-text">Digital Solutions</span>
            <br />
            <span className="text-foreground">That Transform</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From cutting-edge web development to AI-powered solutions, we deliver 
            comprehensive digital services that drive growth and innovation.
          </p>
        </div>
      </section>

      {/* Interactive Services Explorer */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service Navigation */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold mb-8 text-foreground">Explore Our Services</h2>
              <div className="space-y-3">
                {services.services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      selectedService.id === service.id
                        ? 'bg-accent text-accent-foreground shadow-accent'
                        : 'bg-card hover:bg-muted border border-border'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <h3 className="font-semibold">{service.title}</h3>
                        <p className="text-sm opacity-80">{service.startingPrice}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Details */}
            <div className="lg:col-span-2">
              <Card className="modern-card p-8 h-full">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-accent text-accent-foreground rounded-xl flex items-center justify-center text-3xl">
                      {selectedService.icon}
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-foreground">{selectedService.title}</h2>
                      <p className="text-muted-foreground">{selectedService.deliveryTime}</p>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {selectedService.description}
                  </p>

                  {/* Features Grid */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedService.features.map((feature, index) => (
                        <div
                          key={feature}
                          className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                            hoveredFeature === feature
                              ? 'bg-accent/10 border-accent/30'
                              : 'bg-muted/50 border-border hover:bg-muted'
                          }`}
                          onMouseEnter={() => setHoveredFeature(feature)}
                          onMouseLeave={() => setHoveredFeature(null)}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                            <span className="font-medium">{feature}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Technologies We Use</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="hover:bg-accent/10 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div>
                      <span className="text-sm text-muted-foreground">Starting at</span>
                      <div className="text-3xl font-bold gradient-text">
                        {selectedService.startingPrice}
                      </div>
                    </div>
                    <Button className="btn-accent">
                      Get Started
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 section-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We follow a proven methodology to ensure your project success from concept to deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'We understand your goals, requirements, and challenges' },
              { step: '02', title: 'Strategy', description: 'Create a detailed roadmap and technical architecture' },
              { step: '03', title: 'Development', description: 'Build your solution with regular updates and feedback' },
              { step: '04', title: 'Launch', description: 'Deploy and provide ongoing support and optimization' }
            ].map((process, index) => (
              <Card key={process.step} className="modern-card p-6 hover-lift" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-0 text-center">
                  <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                  <p className="text-muted-foreground">{process.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="modern-card p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your requirements and create a solution that exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-accent" onClick={() => window.location.hash = 'contact'}>
                Get Free Consultation
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button variant="outline" className="btn-outline" onClick={() => window.location.hash = 'portfolio'}>
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}