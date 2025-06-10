import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { settings } from './data/index';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const servicesLinks = [
    { name: "Web Development", hash: "services" },
    { name: "UI/UX Design", hash: "services" }, 
    { name: "Mobile Apps", hash: "services" },
    { name: "AI Solutions", hash: "services" },
    { name: "E-commerce", hash: "services" },
    { name: "Digital Marketing", hash: "services" }
  ];

  const companyLinks = [
    { name: "About Us", hash: "about" },
    { name: "Our Team", hash: "about" },
    { name: "Careers", hash: "about" },
    { name: "Blog", hash: "blog" },
    { name: "Case Studies", hash: "portfolio" },
    { name: "Testimonials", hash: "about" }
  ];

  const resourceLinks = [
    { name: "Documentation", hash: "blog" },
    { name: "API Reference", hash: "blog" },
    { name: "Support Center", hash: "contact" },
    { name: "Community", hash: "about" },
    { name: "Partners", hash: "about" },
    { name: "Contact", hash: "contact" }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: settings.socialLinks.linkedin,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: "Twitter",
      url: settings.socialLinks.twitter,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: "GitHub",
      url: settings.socialLinks.github,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: "Dribbble",
      url: settings.socialLinks.dribbble,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="relative overflow-hidden section-muted">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape w-32 h-32 opacity-5" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
        <div className="floating-square w-16 h-16 opacity-3" style={{ bottom: '30%', right: '20%', animationDelay: '4s' }}></div>
        <div className="floating-triangle opacity-4" style={{ top: '60%', right: '70%', animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Newsletter Section */}
        <div className="text-center mb-20">
          <div className="modern-card p-8 lg:p-12 max-w-4xl mx-auto">
            <Badge className="bg-accent/10 text-accent border-accent/20 text-sm px-6 py-3 mb-6">
              Stay Updated
            </Badge>
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              <span className="text-foreground">Get the Latest</span>{' '}
              <span className="gradient-text">Insights</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for design trends, industry insights, and exclusive project showcases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
              <Button className="btn-accent px-8 py-4 rounded-xl magnetic">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-accent">
                <span className="text-primary-foreground text-xl font-bold">N</span>
              </div>
              <div>
                <span className="text-2xl font-bold gradient-text">
                  {settings.company.name}
                </span>
                <div className="text-sm text-muted-foreground -mt-1">
                  Digital Innovation Agency
                </div>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {settings.company.tagline}
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Building tomorrow's digital experiences with innovative design and cutting-edge technology.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 modern-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/20 transition-all duration-300 magnetic"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 gradient-text">Services</h4>
            <ul className="space-y-4">
              {servicesLinks.map((service) => (
                <li key={service.name}>
                  <button 
                    onClick={() => window.location.hash = service.hash}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:translate-x-1 inline-block text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 gradient-text">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => window.location.hash = item.hash}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:translate-x-1 inline-block text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6 gradient-text">Resources</h4>
            <ul className="space-y-4">
              {resourceLinks.map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => window.location.hash = item.hash}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:translate-x-1 inline-block text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="modern-card p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-accent">
                📧
              </div>
              <h5 className="font-semibold mb-2 text-foreground">Email</h5>
              <a 
                href={`mailto:${settings.contactInfo.email}`}
                className="text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                {settings.contactInfo.email}
              </a>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-accent">
                📞
              </div>
              <h5 className="font-semibold mb-2 text-foreground">Phone</h5>
              <a 
                href={`tel:${settings.contactInfo.phone}`}
                className="text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                {settings.contactInfo.phone}
              </a>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-accent">
                📍
              </div>
              <h5 className="font-semibold mb-2 text-foreground">Location</h5>
              <p className="text-muted-foreground">
                {settings.contactInfo.address}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {settings.company.name}. All rights reserved.
          </p>
          
          <div className="flex space-x-8">
            <button 
              onClick={() => window.location.hash = 'contact'}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => window.location.hash = 'contact'}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => window.location.hash = 'contact'}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
            >
              Cookie Policy
            </button>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>in California</span>
          </div>
        </div>
      </div>
    </footer>
  );
}