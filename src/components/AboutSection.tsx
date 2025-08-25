import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Trophy, Users, Lightbulb, Target, Zap } from 'lucide-react';
import { gsapUtils, useGSAP } from '@/hooks/useGSAP';

export default function AboutSection() {
  const { isLoaded } = useGSAP();

  useEffect(() => {
    if (isLoaded) {
      gsapUtils.fadeIn('.about-header', 0.5);
      gsapUtils.slideUp('.about-card', 0.7, 0.2);
      gsapUtils.slideInLeft('.mission-text', 1);
      gsapUtils.slideInRight('.vision-text', 1.2);
    }
  }, [isLoaded]);

  const features = [
    {
      icon: Code,
      title: "Algorithm Mastery",
      description: "Learn and master advanced algorithms and data structures through hands-on practice and expert guidance.",
      color: "text-blue-500"
    },
    {
      icon: Trophy,
      title: "Competitive Excellence",
      description: "Participate in coding contests, hackathons, and programming competitions at local and national levels.",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Work together with peers, share knowledge, and grow as a community of passionate programmers.",
      color: "text-green-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Develop creative solutions to real-world problems and build projects that make a difference.",
      color: "text-purple-500"
    },
    {
      icon: Target,
      title: "Career Focus",
      description: "Prepare for technical interviews and build skills that are highly valued in the tech industry.",
      color: "text-red-500"
    },
    {
      icon: Zap,
      title: "Skill Acceleration",
      description: "Fast-track your programming journey with structured learning paths and mentorship.",
      color: "text-orange-500"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="about-header text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            About CSquare
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Empowering the Next Generation of 
            <span className="text-primary"> Competitive Programmers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            CSquare is more than just a club—it's a community where algorithmic thinking meets creative problem-solving, 
            where students transform into skilled competitive programmers ready to tackle any challenge.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="about-card group hover:shadow-lg transition-all duration-300 border border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-background border border-border group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission and Vision */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="mission-text">
            <h3 className="text-3xl font-bold text-foreground mb-6">Our Mission</h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                To create an inclusive environment where students can develop their computational thinking, 
                problem-solving abilities, and competitive programming skills through collaborative learning 
                and practical application.
              </p>
              <p className="text-lg leading-relaxed">
                We believe that competitive programming is not just about winning contests—it's about 
                building a mindset that approaches complex problems with creativity, persistence, and 
                analytical thinking.
              </p>
            </div>
          </div>

          <div className="vision-text">
            <h3 className="text-3xl font-bold text-foreground mb-6">Our Vision</h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                To be recognized as the premier competitive programming club that produces skilled 
                software engineers, innovative thinkers, and problem solvers who contribute 
                meaningfully to the technology industry.
              </p>
              <p className="text-lg leading-relaxed">
                We envision a future where our members not only excel in programming competitions 
                but also become leaders in technology, driving innovation and positive change in 
                the digital world.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h3>
            <p className="text-lg opacity-90 mb-6">
              Take the first step towards becoming a competitive programming expert
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-background text-primary px-8 py-3 rounded-xl font-semibold hover:bg-background/90 transition-colors"
              >
                View Upcoming Events
              </button>
              <button 
                onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-background text-background px-8 py-3 rounded-xl font-semibold hover:bg-background hover:text-primary transition-all"
              >
                Meet Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
