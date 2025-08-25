import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Building, Users, Award, Heart } from 'lucide-react';
import { gsapUtils, useGSAP } from '@/hooks/useGSAP';

type Collaborator = {
  id: string;
  name: string;
  organization: string;
  type: 'sponsor' | 'partner' | 'mentor' | 'speaker';
  website?: string;
  logo?: string;
  description?: string;
};

export default function CollaboratorsSection() {
  const { isLoaded } = useGSAP();

  const { data: collaborators = [], isLoading } = useQuery<Collaborator[]>({
    queryKey: ['/api/collaborators'],
  });

  // Fallback collaborators data
  const fallbackCollaborators: Collaborator[] = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      organization: 'Technology Company',
      type: 'sponsor',
      website: 'https://techcorp.com',
      description: 'Leading technology solutions provider supporting competitive programming initiatives.'
    },
    {
      id: '2',
      name: 'CodeMaster Academy',
      organization: 'Educational Institution',
      type: 'partner',
      website: 'https://codemaster.edu',
      description: 'Premier coding academy partnering with us for educational workshops and training programs.'
    },
    {
      id: '3',
      name: 'Dr. Sarah Johnson',
      organization: 'University of Technology',
      type: 'mentor',
      description: 'PhD in Computer Science, specializing in algorithms and competitive programming mentorship.'
    },
    {
      id: '4',
      name: 'Alex Chen',
      organization: 'Google',
      type: 'speaker',
      description: 'Senior Software Engineer and former ICPC World Finalist, regular guest speaker.'
    },
    {
      id: '5',
      name: 'Innovation Hub',
      organization: 'Startup Incubator',
      type: 'partner',
      website: 'https://innovationhub.com',
      description: 'Supporting student entrepreneurs and innovative project development.'
    },
    {
      id: '6',
      name: 'Microsoft',
      organization: 'Technology Giant',
      type: 'sponsor',
      website: 'https://microsoft.com',
      description: 'Providing cloud computing resources and internship opportunities for our members.'
    }
  ];

  const displayCollaborators = collaborators.length > 0 ? collaborators : fallbackCollaborators;

  useEffect(() => {
    if (isLoaded && window.ScrollTrigger) {
      gsapUtils.fadeIn('.collaborators-title', 0.5);
      gsapUtils.slideUp('.collaborator-card', 0.7);
    }
  }, [isLoaded]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sponsor': return Award;
      case 'partner': return Building;
      case 'mentor': return Users;
      case 'speaker': return Users;
      default: return Building;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sponsor': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'partner': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'mentor': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'speaker': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const groupedCollaborators = displayCollaborators.reduce((acc, collaborator) => {
    if (!acc[collaborator.type]) {
      acc[collaborator.type] = [];
    }
    acc[collaborator.type].push(collaborator);
    return acc;
  }, {} as Record<string, Collaborator[]>);

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-4"></div>
                  <div className="h-16 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="collaborators" className="py-20 bg-muted/30" data-testid="collaborators-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="collaborators-title text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Our Network
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted 
            <span className="text-primary"> Partners</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're proud to collaborate with industry leaders, educational institutions, 
            and experienced mentors who help us provide the best learning experience.
          </p>
        </div>

        {/* Collaborators by Type */}
        <div className="space-y-16">
          {Object.entries(groupedCollaborators).map(([type, typeCollaborators]) => (
            <div key={type}>
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-2 rounded-lg ${getTypeColor(type)}`}>
                  {(() => {
                    const Icon = getTypeIcon(type);
                    return <Icon className="h-5 w-5" />;
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-foreground capitalize">
                  {type}s ({typeCollaborators.length})
                </h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {typeCollaborators.map((collaborator) => (
                  <Card 
                    key={collaborator.id}
                    className="collaborator-card group hover:shadow-lg transition-all duration-300 border border-border"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                            {collaborator.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {collaborator.organization}
                          </p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`capitalize ${getTypeColor(collaborator.type)}`}
                        >
                          {collaborator.type}
                        </Badge>
                      </div>

                      {collaborator.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {collaborator.description}
                        </p>
                      )}

                      {collaborator.website && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full group/btn"
                          onClick={() => window.open(collaborator.website, '_blank')}
                        >
                          Visit Website
                          <ExternalLink className="ml-2 h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Partner With Us?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-background rounded-xl border border-border">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Large Community</h4>
              <p className="text-sm text-muted-foreground">
                Access to 500+ passionate programming students
              </p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-xl border border-border">
              <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Top Talent</h4>
              <p className="text-sm text-muted-foreground">
                Connect with highly skilled competitive programmers
              </p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-xl border border-border">
              <Building className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Brand Visibility</h4>
              <p className="text-sm text-muted-foreground">
                Showcase your brand to future tech leaders
              </p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-xl border border-border">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Social Impact</h4>
              <p className="text-sm text-muted-foreground">
                Support education and skill development
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-primary to-blue-600 border-0">
            <CardContent className="p-8 text-primary-foreground">
              <h3 className="text-2xl font-bold mb-4">Interested in Partnering?</h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Join our network of partners and help us create amazing opportunities 
                for the next generation of programmers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="font-semibold"
                  onClick={() => window.open('mailto:partnerships@cSquare.club?subject=Partnership Inquiry', '_blank')}
                >
                  Become a Partner
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="font-semibold border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  onClick={() => window.open('mailto:sponsorship@cSquare.club?subject=Sponsorship Inquiry', '_blank')}
                >
                  Sponsor Us
                  <Heart className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
