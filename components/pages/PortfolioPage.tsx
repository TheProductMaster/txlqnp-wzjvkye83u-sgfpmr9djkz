import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { projects } from '../data/index';

export function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<(typeof projects.projects[number]) | null>(null);

  const categories = ['All', 'Web Development', 'Mobile Development', 'E-commerce', 'AI/ML', 'Healthcare'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects.projects 
    : projects.projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden section-dark">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-shape w-40 h-40 opacity-5" style={{ top: '15%', right: '20%', animationDelay: '0s' }}></div>
          <div className="floating-square w-24 h-24 opacity-3" style={{ bottom: '25%', left: '10%', animationDelay: '3s' }}></div>
          <div className="floating-triangle opacity-4" style={{ top: '60%', right: '70%', animationDelay: '6s' }}></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <Badge className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 text-sm px-6 py-3 mb-8">
            Our Portfolio
          </Badge>
          
          <h1 className="heading-font text-6xl lg:text-7xl xl:text-8xl mb-8 text-primary-foreground">
            Projects That
            <br />
            <span className="gradient-text">Make Impact</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-primary-foreground/80 max-w-4xl mx-auto leading-relaxed">
            Explore our portfolio of successful projects that have transformed businesses 
            and delivered exceptional results for our clients.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent text-accent-foreground shadow-accent'
                    : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="modern-card hover-lift cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.thumbnailImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{project.category}</Badge>
                    <span className="text-sm text-muted-foreground">{project.completedDate}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-accent">{project.clientName}</span>
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          <div className="bg-card text-card-foreground rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-card-foreground">{selectedProject.title}</h2>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <img
                  src={selectedProject.thumbnailImage}
                  alt={selectedProject.title}
                  className="w-full rounded-xl"
                />
              </div>
              <div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">CLIENT</h4>
                    <p className="text-lg text-card-foreground">{selectedProject.clientName}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">CATEGORY</h4>
                    <Badge>{selectedProject.category}</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">DURATION</h4>
                    <p className="text-card-foreground">{selectedProject.projectDuration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">TEAM SIZE</h4>
                    <p className="text-card-foreground">{selectedProject.teamSize}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Project Overview</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedProject.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-4 text-card-foreground">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech: string) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-card-foreground">Results Achieved</h4>
                <div className="space-y-2">
                  {Object.entries(selectedProject.results).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">{key}:</span>
                      <span className="font-semibold text-accent">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="btn-accent">
                View Live Site
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
              <Button variant="outline" className="btn-outline" onClick={() => window.location.hash = 'contact'}>
                Start Similar Project
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-20 px-4 section-muted">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '150+', label: 'Projects Completed' },
              { number: '100+', label: 'Happy Clients' },
              { number: '25+', label: 'Team Members' },
              { number: '6+', label: 'Years Experience' }
            ].map((stat, index) => (
              <div key={stat.label} className="animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="modern-card p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-card-foreground">Let's Create Something Amazing Together</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to join our portfolio of successful projects? Let's discuss your vision.
            </p>
            <Button className="btn-accent" onClick={() => window.location.hash = 'contact'}>
              Start Your Project
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}