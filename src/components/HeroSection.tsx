import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import JoinClubModal from './JoinClubModal';

export default function HeroSection() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const ctx = window.gsap.context(() => {
        // Logo floating animation
        window.gsap.to(logoRef.current, {
          y: -15,
          duration: 3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Text entrance animations
        window.gsap.fromTo(
          textRef.current?.children || [],
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.3,
            ease: "power3.out",
            delay: 0.5,
          }
        );

        // Logo entrance animation
        window.gsap.fromTo(
          logoRef.current,
          {
            opacity: 0,
            scale: 0.8,
            rotation: -10,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
            delay: 0.8,
          }
        );
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center bg-black relative overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background pattern for subtle texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content - Text Section */}
          <div ref={textRef} className="space-y-8 lg:pr-8">
            {/* Welcome Headline */}
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                Welcome to{' '}
                <span className="block text-primary">C Square</span>
              </h1>
              
              {/* Tagline */}
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-lg">
                Competitive Programming Club
              </p>
              
              {/* Description */}
              <p className="text-white/80 text-lg leading-relaxed max-w-xl">
                Join our community of passionate coders. Learn, compete, and excel together.
              </p>
            </div>

            {/* Call-to-Action Button */}
            <div className="pt-6">
              <Button 
                onClick={() => setShowJoinModal(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
                data-testid="button-become-member"
              >
                Join Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Content - Logo Section */}
          <div className="flex justify-center lg:justify-end">
            <div 
              ref={logoRef}
              className="relative"
            >
              {/* Large Geometric Logo */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px]">
                {/* Main Logo Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/C Square White.png" 
                    alt="C Square Logo"
                    className="w-4/5 h-4/5 object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Glowing effect behind logo */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Floating decorative elements */}
                <div className="absolute -top-6 -left-6 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute -top-2 -right-8 w-4 h-4 bg-white rounded-full animate-pulse animation-delay-1000"></div>
                <div className="absolute -bottom-6 -right-6 w-4 h-4 bg-yellow-400 rounded-full animate-pulse animation-delay-2000"></div>
                <div className="absolute -bottom-2 -left-8 w-2 h-2 bg-primary rounded-full animate-pulse animation-delay-1500"></div>
                
                {/* Orbital rings for extra visual interest */}
                <div className="absolute inset-0 border border-primary/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute inset-6 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
              </div>

              {/* Brand identity text */}
              <div className="text-center mt-6">
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 px-4 py-2">
                  Code • Compete • Excel
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-20 grid lg:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-primary rounded-sm"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Learn</h3>
            <p className="text-white/70 text-sm">
              Master algorithms, data structures, and problem-solving techniques.
            </p>
          </div>

          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-primary rounded-sm"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Compete</h3>
            <p className="text-white/70 text-sm">
              Participate in contests and challenge yourself with real problems.
            </p>
          </div>

          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-primary rounded-sm"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Excel</h3>
            <p className="text-white/70 text-sm">
              Build skills that will advance your career in technology.
            </p>
          </div>
        </div>
      </div>

      <JoinClubModal 
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      />
    </section>
  );
}
