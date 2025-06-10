import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { settings } from '../data/index';

export function AboutPage() {
  const [activeValue, setActiveValue] = useState(0);

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b586?w=400&h=400&fit=crop&crop=face',
      bio: 'Visionary leader with 10+ years in digital transformation and startup growth.',
      expertise: ['Strategy', 'Leadership', 'Innovation']
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Technical architect specializing in scalable systems and emerging technologies.',
      expertise: ['Architecture', 'AI/ML', 'Cloud']
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Creative director with a passion for user-centered design and innovation.',
      expertise: ['UI/UX', 'Branding', 'Research']
    },
    {
      name: 'David Park',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      bio: 'Full-stack developer expert in modern frameworks and development practices.',
      expertise: ['React', 'Node.js', 'DevOps']
    }
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We embrace cutting-edge technologies and creative solutions to solve complex challenges.',
      icon: '🚀'
    },
    {
      title: 'Client Success',
      description: 'Your success is our success. We\'re committed to delivering results that exceed expectations.',
      icon: '🎯'
    },
    {
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in code quality, design, and user experience.',
      icon: '⭐'
    },
    {
      title: 'Collaborative Spirit',
      description: 'We work as partners with our clients, fostering open communication and transparency.',
      icon: '🤝'
    }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-shape w-32 h-32 opacity-5" style={{ top: '20%', right: '15%', animationDelay: '0s' }}></div>
          <div className="floating-square w-20 h-20 opacity-3" style={{ bottom: '30%', left: '10%', animationDelay: '2s' }}></div>
          <div className="floating-triangle opacity-4" style={{ top: '70%', right: '75%', animationDelay: '4s' }}></div>
        </div>
        
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-accent/10 text-accent border-accent/20 text-sm px-6 py-3 mb-8">
                About Us
              </Badge>
              
              <h1 className="heading-font text-5xl lg:text-6xl xl:text-7xl mb-8">
                Building Tomorrow's
                <br />
                <span className="gradient-text">Digital Future</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {settings.company.mission}
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">{settings.company.projectsCompleted}</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">{settings.company.clientsSatisfied}</div>
                  <div className="text-sm text-muted-foreground">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">{settings.company.teamMembers}</div>
                  <div className="text-sm text-muted-foreground">Team</div>
                </div>
              </div>

              <Button className="btn-accent" onClick={() => window.location.hash = 'contact'}>
                Join Our Journey
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </div>
            
            <div className="relative">
              <div className="modern-card p-8">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 section-muted">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded in {settings.company.founded}, NexTech Agency began with a simple yet ambitious vision: 
                to bridge the gap between innovative technology and real-world business challenges. 
                What started as a small team of passionate developers has grown into a full-service 
                digital agency serving clients worldwide.
              </p>
              <p>
                Our journey has been marked by continuous learning, adaptation, and an unwavering 
                commitment to excellence. We've witnessed the digital landscape evolve dramatically, 
                and we've evolved with it, always staying ahead of the curve to provide our clients 
                with cutting-edge solutions.
              </p>
              <p>
                Today, we're proud to be a trusted partner for businesses ranging from innovative 
                startups to established enterprises, helping them navigate the digital transformation 
                and achieve their goals through technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and shape our company culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={value.title} 
                className={`modern-card p-6 text-center hover-lift cursor-pointer transition-all duration-500 ${
                  activeValue === index ? 'bg-accent/10 border-accent/30' : ''
                }`}
                onClick={() => setActiveValue(index)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 section-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The talented individuals who bring passion, expertise, and innovation to every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={member.name} className="modern-card hover-lift text-center" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-accent font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="modern-card p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Team</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation 
              and excellence. Join us in building the future of digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-accent">
                View Open Positions
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </Button>
              <Button variant="outline" className="btn-outline" onClick={() => window.location.hash = 'contact'}>
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}