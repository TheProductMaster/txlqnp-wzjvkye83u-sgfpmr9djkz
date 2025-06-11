import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { settings } from './data/index';

export function AboutSnapshot() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const achievements = [
    {
      label: "Founded",
      value: settings.company.founded,
      icon: "🏢",
      description: "Years of innovation",
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "Projects",
      value: settings.company.projectsCompleted,
      icon: "🚀",
      description: "Successfully delivered",
      color: "from-purple-500 to-pink-500"
    },
    {
      label: "Clients",
      value: settings.company.clientsSatisfied,
      icon: "💫",
      description: "Happy partnerships",
      color: "from-orange-500 to-red-500"
    },
    {
      label: "Team",
      value: settings.company.teamMembers,
      icon: "⭐",
      description: "Creative experts",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Innovation First",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions that give you a competitive advantage.",
      gradient: "from-gradient-start to-gradient-accent"
    },
    {
      icon: "🤝",
      title: "Client Partnership",
      description: "We believe in building long-term partnerships with our clients, understanding their goals and growing together.",
      gradient: "from-gradient-accent to-gradient-end"
    },
    {
      icon: "✨",
      title: "Quality Excellence",
      description: "Every project receives meticulous attention to detail, ensuring exceptional quality in design and development.",
      gradient: "from-gradient-end to-gradient-start"
    }
  ];

  return (
    <section id="about-section" className="py-32 px-4 relative overflow-hidden">
      {/* Improved Background with Better Readability */}
      <div className="absolute inset-0 gradient-mesh-subtle"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-gradient-start/8 to-gradient-end/8 rounded-full blur-3xl animate-float"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          {/* Left Column - Content with Enhanced Readability */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <Badge className="glass-strong border-white/30 text-sm px-6 py-2 glass-text">
              About {settings.company.name}
            </Badge>
            
            <h2 className="heading-font text-5xl lg:text-6xl">
              <span className="glass-text font-bold">Crafting Digital</span>
              <br />
              <span className="gradient-text">Experiences</span>
            </h2>
            
            <div className="readable-content space-y-6">
              <p className="text-lg glass-text leading-relaxed">
                {settings.company.mission}
              </p>
              <p className="text-lg glass-text-muted leading-relaxed">
                Since our founding in <span className="glass-text font-semibold">{settings.company.founded}</span>, 
                we've been at the forefront of digital innovation. Our team of passionate designers, developers, 
                and strategists work together to create solutions that not only meet today's needs but anticipate 
                tomorrow's opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button 
                size="lg"
                className="magnetic bg-gradient-to-r from-gradient-start to-gradient-end shadow-glow px-8 py-6 rounded-xl text-white font-semibold"
                onClick={() => window.location.hash = 'about'}
              >
                Our Story
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="magnetic glass-strong border-white/30 hover:border-white/50 px-8 py-6 rounded-xl glass-text font-semibold glass-interactive"
                onClick={() => window.location.hash = 'about'}
              >
                Meet the Team
              </Button>
            </div>
          </div>

          {/* Right Column - Interactive Stats with Better Contrast */}
          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={achievement.label}
                  className="glass-strong border-white/30 hover:border-white/50 p-6 hover-lift group cursor-pointer glass-interactive"
                  onMouseEnter={() => setActiveValue(index)}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-0 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                      {achievement.icon}
                    </div>
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {achievement.value}
                    </div>
                    <div className="text-sm glass-text mb-1 font-semibold">
                      {achievement.label}
                    </div>
                    <div className="text-xs glass-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {achievement.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dynamic Achievement Detail with Better Readability */}
            <div className="mt-8 glass-strong rounded-xl p-6 border border-white/30">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${achievements[activeValue].color} rounded-xl flex items-center justify-center text-xl`}>
                  {achievements[activeValue].icon}
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">
                    {achievements[activeValue].value}
                  </div>
                  <div className="text-sm glass-text font-semibold">
                    {achievements[activeValue].description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section with Enhanced Readability */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="heading-font text-4xl lg:text-5xl mb-6">
              <span className="glass-text font-bold">Our</span>{' '}
              <span className="gradient-text">Values</span>
            </h3>
            <div className="readable-content max-w-2xl mx-auto">
              <p className="text-xl glass-text">
                The principles that guide everything we do and drive our commitment to excellence.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="glass-strong border-white/30 hover:border-white/50 p-8 hover-lift group text-center glass-interactive"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-0">
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-glow group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300 glass-text">
                    {value.title}
                  </h4>
                  <p className="glass-text-muted leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}