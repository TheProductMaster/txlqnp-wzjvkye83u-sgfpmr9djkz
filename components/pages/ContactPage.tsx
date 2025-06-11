import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/use-toast';
import { emailService, type ContactFormData } from '../services/emailService';
import { settings } from '../data/index';

export function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const { success, error: showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Send email using EmailJS
      const response = await emailService.sendContactEmail(formData);
      
      if (response.success) {
        // Show success message
        success(response.message, 'Message Sent Successfully!');
        
        // Reset form
        setFormData({ 
          name: '', 
          email: '', 
          company: '', 
          service: '', 
          budget: '', 
          message: '' 
        });
      } else {
        // Show error message
        showError(response.message, 'Failed to Send Message');
        
        // Log error for debugging (remove in production)
        if (response.error) {
          console.error('Email send error:', response.error);
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      showError(
        'An unexpected error occurred. Please try again or contact us directly.',
        'Something Went Wrong'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const contactMethods = [
    {
      title: 'Email Us',
      description: 'Drop us a line anytime',
      value: settings.contactInfo.email,
      icon: '📧',
      action: () => window.open(`mailto:${settings.contactInfo.email}`)
    },
    {
      title: 'Call Us',
      description: 'Speak with our team',
      value: settings.contactInfo.phone,
      icon: '📞',
      action: () => window.open(`tel:${settings.contactInfo.phone}`)
    },
    {
      title: 'Visit Us',
      description: 'Come say hello',
      value: settings.contactInfo.address,
      icon: '📍',
      action: () => window.open('https://maps.google.com')
    },
    {
      title: 'Business Hours',
      description: 'When we\'re available',
      value: settings.contactInfo.businessHours,
      icon: '🕒',
      action: () => {}
    }
  ];

  const services = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'E-commerce Solutions',
    'AI & Machine Learning',
    'Digital Marketing',
    'Other'
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000 - $100,000',
    'Over $100,000'
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-shape w-32 h-32 opacity-5" style={{ top: '20%', right: '10%', animationDelay: '0s' }}></div>
          <div className="floating-square w-20 h-20 opacity-3" style={{ bottom: '30%', left: '15%', animationDelay: '2s' }}></div>
          <div className="floating-triangle opacity-4" style={{ top: '70%', right: '75%', animationDelay: '4s' }}></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <Badge className="bg-accent/10 text-accent border-accent/20 text-sm px-6 py-3 mb-8">
            Get In Touch
          </Badge>
          
          <h1 className="heading-font text-6xl lg:text-7xl xl:text-8xl mb-8">
            Let's Build Something
            <br />
            <span className="gradient-text">Amazing Together</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? We'd love to hear about your project 
            and discuss how we can help you achieve your goals.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 section-muted">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card
                key={method.title}
                className="modern-card p-6 text-center hover-lift cursor-pointer"
                onClick={method.action}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0">
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                  <p className="text-sm font-medium text-accent">{method.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold mb-8">Start Your Project</h2>
              <Card className="modern-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                          errors.name ? 'border-red-500' : 'border-border'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                          errors.email ? 'border-red-500' : 'border-border'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Service Needed</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                      >
                        <option value="">Select a service</option>
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Project Details *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none transition-colors ${
                        errors.message ? 'border-red-500' : 'border-border'
                      }`}
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.message.length}/2000 characters
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-accent"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </Button>

                  {/* EmailJS Notice */}
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      🔒 Your message is sent securely using EmailJS. We typically respond within 24 hours.
                    </p>
                  </div>
                </form>
              </Card>
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-4xl font-bold mb-8">Why Work With Us?</h2>
              
              <div className="space-y-6 mb-12">
                {[
                  {
                    title: 'Free Consultation',
                    description: 'We start every project with a comprehensive consultation to understand your needs and goals.',
                    icon: '💡'
                  },
                  {
                    title: 'Transparent Process',
                    description: 'Stay informed with regular updates and clear communication throughout the project.',
                    icon: '🔍'
                  },
                  {
                    title: 'Expert Team',
                    description: 'Work with experienced professionals who are passionate about delivering excellence.',
                    icon: '👥'
                  },
                  {
                    title: 'Ongoing Support',
                    description: 'We provide continued support and maintenance to ensure your success.',
                    icon: '🛠️'
                  }
                ].map((benefit, index) => (
                  <Card key={benefit.title} className="modern-card p-6" style={{ animationDelay: `${index * 150}ms` }}>
                    <CardContent className="p-0 flex items-start space-x-4">
                      <div className="text-3xl">{benefit.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              <div className="modern-card p-6">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {Object.entries(settings.socialLinks).map(([platform, url]) => {
                    const getSocialIcon = (platform: string) => {
                      switch (platform.toLowerCase()) {
                        case 'linkedin':
                          return (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          );
                        case 'twitter':
                          return (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          );
                        case 'github':
                          return (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          );
                        case 'dribbble':
                          return (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
                            </svg>
                          );
                        default:
                          return platform[0].toUpperCase();
                      }
                    };

                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-muted hover:bg-accent hover:text-accent-foreground rounded-xl flex items-center justify-center transition-all duration-300 capitalize"
                      >
                        {getSocialIcon(platform)}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 section-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: 'What is your typical project timeline?',
                answer: 'Project timelines vary based on complexity, but most projects range from 4-16 weeks. We\'ll provide a detailed timeline during our initial consultation.'
              },
              {
                question: 'Do you provide ongoing support?',
                answer: 'Yes! We offer various support packages including maintenance, updates, and technical support to ensure your project continues to perform optimally.'
              },
              {
                question: 'Can you work with existing systems?',
                answer: 'Absolutely. We specialize in integrating with existing systems and can work with your current technology stack or help migrate to new solutions.'
              },
              {
                question: 'What industries do you serve?',
                answer: 'We work with businesses across all industries, from startups to enterprises. Our solutions are tailored to meet the specific needs of your industry.'
              }
            ].map((faq, index) => (
              <Card key={faq.question} className="modern-card p-6" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-0">
                  <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}