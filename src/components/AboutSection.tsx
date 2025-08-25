import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Users, Trophy, Zap } from 'lucide-react';

interface AboutSectionProps {
  className?: string;
}

const AboutSection = ({ className = '' }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const ctx = window.gsap.context(() => {
        // Logo floating animation
        window.gsap.to(logoRef.current, {
          y: -20,
          duration: 3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Section entrance animation
        window.gsap.fromTo(
          sectionRef.current?.children || [],
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`py-24 bg-background relative overflow-hidden ${className}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                About C Square
              </Badge>
              
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  C Square
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your gateway to competitive coding and development.
              </p>
            </div>

            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p>
                The homepage design for C Square uses a modern, minimalistic layout to highlight 
                the club's purpose. Key elements are arranged for clarity and impact, with visually 
                striking placement and balanced spacing for both text and graphics.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Code2 className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">Competitive Programming</h4>
                    <p className="text-sm text-muted-foreground">Master algorithms</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Users className="h-8 w-8 text-accent-foreground" />
                  <div>
                    <h4 className="font-semibold">Community</h4>
                    <p className="text-sm text-muted-foreground">30+ members</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Trophy className="h-8 w-8 text-yellow-600" />
                  <div>
                    <h4 className="font-semibold">Achievements</h4>
                    <p className="text-sm text-muted-foreground">Contest wins</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Zap className="h-8 w-8 text-green-600" />
                  <div>
                    <h4 className="font-semibold">Innovation</h4>
                    <p className="text-sm text-muted-foreground">Creative solutions</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 text-lg font-semibold"
              >
                Become a Member
              </Button>
            </div>
          </div>

          {/* Right Logo */}
          <div className="flex justify-center lg:justify-end">
            <div 
              ref={logoRef}
              className="relative"
            >
              {/* Large Geometric Logo */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Main Cross Shape */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg 
                    viewBox="0 0 200 200" 
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background glow */}
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Cross arms */}
                    <rect x="75" y="25" width="50" height="50" fill="#F59E0B" rx="8" filter="url(#glow)" />
                    <rect x="25" y="75" width="50" height="50" fill="#F59E0B" rx="8" filter="url(#glow)" />
                    <rect x="125" y="75" width="50" height="50" fill="#F59E0B" rx="8" filter="url(#glow)" />
                    <rect x="75" y="125" width="50" height="50" fill="#F59E0B" rx="8" filter="url(#glow)" />
                    
                    {/* Center circle */}
                    <circle cx="100" cy="100" r="25" fill="#1E40AF" stroke="#F59E0B" strokeWidth="3" filter="url(#glow)" />
                    <circle cx="100" cy="100" r="12" fill="#F59E0B" />
                  </svg>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute -top-2 -right-6 w-6 h-6 bg-yellow-400 rounded-full animate-pulse animation-delay-1000"></div>
                <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-blue-500 rounded-full animate-pulse animation-delay-2000"></div>
                <div className="absolute -bottom-2 -left-6 w-7 h-7 bg-green-400 rounded-full animate-pulse animation-delay-1500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Design Approach Section */}
        <div className="mt-24 grid lg:grid-cols-3 gap-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Contrast & Spacing</h3>
              <p className="text-muted-foreground">
                Strong visual contrast with vibrant elements creates clarity without clutter, 
                ensuring each component stands out professionally.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-accent-foreground rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Visual Hierarchy</h3>
              <p className="text-muted-foreground">
                Element sizes and boldness guide the viewer's eyes from headline to tagline to action, 
                providing smooth information flow.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Perfect Balance</h3>
              <p className="text-muted-foreground">
                Strategic placement of text and logo creates harmony, ensuring neither section dominates 
                while maintaining professional appeal.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
