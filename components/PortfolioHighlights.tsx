import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { projects } from './data/index';

export function PortfolioHighlights() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  
  const featuredProjects = projects.projects.filter(project => project.featured);
  const categories = ['all', ...new Set(projects.projects.map(p => p.category))];

  const filteredProjects = filter === 'all' 
    ? featuredProjects 
    : featuredProjects.filter(project => project.category === filter);

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 dot-pattern"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-gradient-end/10 to-gradient-accent/10 rounded-full blur-3xl animate-float"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <Badge className="glass-card border-white/20 text-sm px-6 py-2 mb-6">
            Featured Work
          </Badge>
          
          <h2 className="heading-font text-5xl lg:text-6xl xl:text-7xl mb-6">
            <span className="gradient-text">Projects</span> That
            <br />
            <span className="text-foreground">Define Excellence</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our most successful projects that have helped businesses 
            transform their digital presence and achieve remarkable results.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className={`
                magnetic rounded-full px-6 py-3 transition-all duration-300
                ${filter === category 
                  ? 'bg-gradient-to-r from-gradient-start to-gradient-end shadow-glow' 
                  : 'glass-card border-white/20 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              {category === 'all' ? 'All Projects' : category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => {
            const isActive = activeProject === project.id;
            const isLarge = index === 0;
            
            return (
              <Card
                key={project.id}
                className={`
                  ${isLarge ? 'lg:col-span-2 lg:row-span-2' : ''}
                  group overflow-hidden glass-card border-white/20 hover:border-white/40
                  hover-lift cursor-pointer relative
                  ${isLarge ? 'min-h-[600px]' : 'min-h-[400px]'}
                `}
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                {/* Project Image */}
                <div className="relative h-2/3 overflow-hidden">
                  <img
                    src={project.thumbnailImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <Badge className="absolute top-4 left-4 glass-card border-white/20 text-white">
                    {project.category}
                  </Badge>
                  
                  {/* Project Link */}
                  <Button
                    size="sm"
                    className={`
                      absolute top-4 right-4 bg-white/10 border-white/20 backdrop-blur-md
                      transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                    `}
                    onClick={() => window.location.hash = 'portfolio'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Button>
                </div>

                <CardContent className="p-6 lg:p-8 h-1/3 flex flex-col justify-between">
                  {/* Project Info */}
                  <div>
                    <h3 className={`
                      font-bold mb-2 group-hover:gradient-text transition-all duration-300
                      ${isLarge ? 'text-2xl lg:text-3xl' : 'text-xl'}
                    `}>
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {project.clientName}
                    </p>
                    
                    <p className={`
                      text-muted-foreground leading-relaxed mb-4
                      ${isLarge ? 'text-base' : 'text-sm'}
                    `}>
                      {project.shortDescription}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, isLarge ? 4 : 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs bg-white/10 border-white/20 hover:bg-white/20 transition-colors duration-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    {Object.entries(project.results).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold gradient-text">
                          {value}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hover Indicator */}
                  <div className={`
                    absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end
                    transition-all duration-300 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                  `}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass-card rounded-3xl p-8 lg:p-12 border border-white/20 max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              <span className="text-foreground">Ready to Create Your</span>
              <br />
              <span className="gradient-text">Success Story?</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our portfolio of successful projects and let's build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg"
                className="magnetic bg-gradient-to-r from-gradient-start to-gradient-end shadow-glow px-8 py-6 rounded-xl"
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
                className="magnetic glass-card border-white/20 hover:border-white/40 px-8 py-6 rounded-xl"
                onClick={() => window.location.hash = 'portfolio'}
              >
                View All Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}