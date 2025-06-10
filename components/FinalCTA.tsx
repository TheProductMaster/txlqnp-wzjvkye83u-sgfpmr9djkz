import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { settings } from './data/index';

export function FinalCTA() {
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  const benefits = [
    {
      icon: "⚡",
      title: "Fast Turnaround",
      description: "Quick project delivery without compromising quality",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: "🛡️",
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all our services",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      icon: "🤝",
      title: "Ongoing Support",
      description: "Continuous support and maintenance after launch",
      gradient: "from-green-400 to-blue-500"
    }
  ];

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      subtitle: "Get a detailed proposal within 24 hours",
      action: `mailto:${settings.contactInfo.email}`,
      label: settings.contactInfo.email,
      gradient: "from-gradient-start to-gradient-accent"
    },
    {
      icon: "📞",
      title: "Call Us",
      subtitle: "Speak directly with our experts",
      action: `tel:${settings.contactInfo.phone}`,
      label: settings.contactInfo.phone,
      gradient: "from-gradient-accent to-gradient-end"
    }
  ];

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-mesh"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full max-w-6xl">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-gradient-start/30 to-gradient-end/30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-gradient-end/30 to-gradient-accent/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-gradient-accent/30 to-gradient-start/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Main CTA Card */}
        <Card className="glass-card border-white/20 rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-modern max-w-6xl mx-auto">
          <CardContent className="p-8 lg:p-16 text-center">
            {/* Header */}
            <Badge className="glass-card border-white/20 text-sm px-6 py-2 mb-8">
              Ready to Get Started?
            </Badge>
            
            <h2 className="heading-font text-5xl lg:text-6xl xl:text-7xl mb-8">
              <span className="text-foreground">Transform Your</span>
              <br />
              <span className="gradient-text">Digital Presence</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Let's discuss your project and discover how we can help you achieve your business goals 
              with innovative design and cutting-edge technology solutions.
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg"
                className="magnetic bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/90 hover:to-gradient-end/90 shadow-glow hover:shadow-glow px-12 py-6 text-xl rounded-2xl group"
                onClick={() => window.location.hash = 'contact'}
              >
                Start Your Project
                <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="magnetic glass-card border-white/20 hover:border-white/40 hover:bg-white/10 px-12 py-6 text-xl rounded-2xl group"
                onClick={() => window.location.hash = 'contact'}
              >
                Schedule a Call
                <svg className="ml-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Button>
            </div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              {contactMethods.map((method, index) => (
                <Card
                  key={method.title}
                  className="glass-card border-white/20 hover:border-white/40 p-8 hover-lift group text-center"
                >
                  <CardContent className="p-0">
                    <div className={`w-20 h-20 bg-gradient-to-br ${method.gradient} rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-glow group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {method.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                      {method.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {method.subtitle}
                    </p>
                    <a 
                      href={method.action}
                      className="text-lg font-semibold gradient-text hover:opacity-80 transition-opacity duration-300"
                    >
                      {method.label}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits */}
            <div className="max-w-5xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-bold mb-12">
                <span className="text-foreground">Why Choose</span>{' '}
                <span className="gradient-text">NexTech?</span>
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <Card
                    key={benefit.title}
                    className="glass-card border-white/20 hover:border-white/40 p-6 hover-lift group text-center cursor-pointer"
                    onMouseEnter={() => setHoveredBenefit(index)}
                    onMouseLeave={() => setHoveredBenefit(null)}
                  >
                    <CardContent className="p-0">
                      <div className={`
                        w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-2xl 
                        flex items-center justify-center text-3xl mx-auto mb-4 shadow-glow
                        transition-all duration-500
                        ${hoveredBenefit === index ? 'scale-125 rotate-12' : 'group-hover:scale-110'}
                      `}>
                        {benefit.icon}
                      </div>
                      <h4 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Final Message */}
            <div className="mt-16 pt-16 border-t border-white/10">
              <p className="text-lg text-muted-foreground mb-6">
                <span className="text-foreground font-semibold">Join 100+ satisfied clients</span> who have transformed their business with our digital solutions.
              </p>
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Rated 5.0/5 based on 50+ client reviews
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}