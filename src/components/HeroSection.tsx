import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { advancedGSAPUtils } from '@/hooks/useAdvancedGSAP';
import { useTextAnimations } from '@/hooks/useTextAnimations';
import { gsap } from 'gsap';
import JoinClubModal from './JoinClubModal';

export default function HeroSection() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { createAnimatedText, addGlowEffect } = useTextAnimations();

  const logoSrc = theme === 'dark' ? '/CWhite.png' : '/CBlack.png';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize 3D transforms only if elements exist
      const heroLogo = document.querySelector('.hero-logo');
      const heroText = document.querySelector('.hero-text');
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const heroButton = document.querySelector('.hero-button');

      if (heroLogo) {
        advancedGSAPUtils.init3DTransforms('.hero-logo');
      }
      if (heroText) {
        advancedGSAPUtils.init3DTransforms('.hero-text');
      }

      // Advanced entrance animation with stagger
      const timeline = gsap.timeline();
      
      // Hero text reveal with 3D rotation
      if (heroTitle) {
        timeline.fromTo('.hero-title', {
          opacity: 0,
          y: 100,
          rotationX: -90,
          transformOrigin: "center bottom"
        }, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        });
      }

      if (heroSubtitle) {
        timeline.fromTo('.hero-subtitle', {
          opacity: 0,
          y: 60,
          rotationY: -45
        }, {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8");
      }

      if (heroButton) {
        timeline.fromTo('.hero-button', {
          opacity: 0,
          scale: 0.5,
          rotationZ: 180
        }, {
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        }, "-=0.5");
      }

      // Enhanced logo floating animation with 3D rotation and scaling
      if (heroLogo) {
        // Create a more sophisticated animation timeline
        const logoTimeline = gsap.timeline({ repeat: -1 });
        
        logoTimeline
          .to('.hero-logo img', {
            y: -15,
            rotationY: 180,
            scale: 1.05,
            duration: 2,
            ease: "power2.inOut"
          })
          .to('.hero-logo img', {
            y: 0,
            rotationY: 360,
            scale: 1,
            duration: 2,
            ease: "power2.inOut"
          })
          .to('.hero-logo img', {
            y: -10,
            rotationX: 15,
            rotationZ: 5,
            duration: 1.5,
            ease: "power2.inOut"
          })
          .to('.hero-logo img', {
            y: 0,
            rotationX: 0,
            rotationZ: 0,
            duration: 1.5,
            ease: "power2.inOut"
          });
      }

      // Parallax effect for decorative elements
      const floatingElements = document.querySelectorAll('.floating-element');
      if (floatingElements.length > 0) {
        advancedGSAPUtils.parallaxScroll('.floating-element', 0.3);
      }

      // Magnetic effect for the join button
      if (heroButton) {
        advancedGSAPUtils.magneticEffect('.hero-button');
      }

      // Elastic hover effect for feature cards
      const featureCards = document.querySelectorAll('.feature-card');
      if (featureCards.length > 0) {
        advancedGSAPUtils.elasticHover('.feature-card');
      }

      // Text animations
      setTimeout(() => {
        const welcomeEl = document.querySelector('.animated-welcome');
        const csquareEl = document.querySelector('.animated-csquare');
        const taglineEl = document.querySelector('.animated-tagline');
        const descEl = document.querySelector('.animated-description');

        if (welcomeEl) {
          createAnimatedText(welcomeEl as HTMLElement, {
            text: 'Welcome to',
            type: 'stagger',
            delay: 1
          });
        }

        if (csquareEl) {
          createAnimatedText(csquareEl as HTMLElement, {
            text: 'C Square',
            type: 'char-reveal',
            delay: 1.5
          });
          // Add glow effect to C Square
          setTimeout(() => {
            addGlowEffect(csquareEl as HTMLElement);
          }, 2500);
        }

        if (taglineEl) {
          createAnimatedText(taglineEl as HTMLElement, {
            text: 'Competitive Programming Club',
            type: 'slide-words',
            delay: 2.2
          });
        }

        if (descEl) {
          createAnimatedText(descEl as HTMLElement, {
            text: 'Join our community of passionate coders. Learn, compete, and excel together.',
            type: 'typewriter',
            delay: 3
          });
        }
      }, 500);

    }, heroRef.current || undefined);

    return () => ctx.revert();
  }, [theme, createAnimatedText, addGlowEffect]);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center relative overflow-hidden pt-20 md:pt-24 bg-background text-foreground"
    >
      {/* Dynamic themed background gradients */}
      <div className={`absolute inset-0 ${theme === 'dark' 
        ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}>
        <div className={`absolute inset-0 animate-pulse ${theme === 'dark'
          ? 'bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20'
          : 'bg-gradient-to-r from-blue-100/30 via-purple-100/30 to-blue-100/30'
        }`}></div>
      </div>

      {/* Floating decorative elements - theme aware */}
      <div className={`floating-element absolute top-20 left-10 w-4 h-4 rounded-full blur-sm ${theme === 'dark' ? 'bg-primary/30' : 'bg-primary/20'}`}></div>
      <div className={`floating-element absolute top-40 right-20 w-6 h-6 rounded-full blur-sm ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-500/15'}`}></div>
      <div className={`floating-element absolute bottom-32 left-1/4 w-3 h-3 rounded-full blur-sm ${theme === 'dark' ? 'bg-purple-500/30' : 'bg-purple-500/20'}`}></div>
      <div className={`floating-element absolute bottom-20 right-1/3 w-5 h-5 rounded-full blur-sm ${theme === 'dark' ? 'bg-primary/20' : 'bg-primary/15'}`}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-8rem)] max-w-7xl mx-auto">
          {/* Left Content - Text Section */}
          <div ref={textRef} className="hero-text space-y-4 sm:space-y-6 lg:space-y-8 lg:pr-8 order-2 lg:order-1 max-w-full">
            {/* Welcome Headline */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <h1 className="hero-title text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight text-foreground">
                <span className="animated-welcome block sm:inline">Welcome to</span>{' '}
                <span className="block text-primary animated-csquare">C Square</span>
              </h1>
              
              {/* Tagline */}
              <p className="hero-subtitle text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed animated-tagline text-muted-foreground">
                Competitive Programming Club
              </p>
              
              {/* Description */}
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed max-w-lg animated-description">
                Join our community of passionate coders. Learn, compete, and excel together.
              </p>
            </div>

            {/* Call-to-Action Button */}
            <div className="pt-4 lg:pt-6">
              <Button 
                onClick={() => setShowJoinModal(true)}
                size="lg"
                className="hero-button bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
                data-testid="button-become-member"
              >
                Become a Member
                <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Stats badges */}
            <div className="flex flex-wrap gap-2 lg:gap-4 pt-4 sm:pt-6 lg:pt-8">
              <Badge variant="secondary" className={`feature-card px-2 sm:px-3 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm ${theme === 'dark' ? 'bg-white/10 text-white border-white/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                100+ Members
              </Badge>
              <Badge variant="secondary" className={`feature-card px-2 sm:px-3 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm ${theme === 'dark' ? 'bg-white/10 text-white border-white/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                50+ Contests
              </Badge>
              <Badge variant="secondary" className={`feature-card px-2 sm:px-3 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm ${theme === 'dark' ? 'bg-white/10 text-white border-white/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                Top Rankings
              </Badge>
            </div>
          </div>

          {/* Right Content - Logo Section */}
          <div ref={logoRef} className="hero-logo flex justify-center order-1 lg:order-2">
            <div className="relative group w-fit">
              {/* Glowing background effect - theme aware */}
              <div className={`absolute inset-0 rounded-full blur-2xl scale-150 group-hover:scale-175 transition-transform duration-500 ${theme === 'dark' ? 'bg-gradient-to-r from-primary/30 to-blue-500/30' : 'bg-gradient-to-r from-primary/20 to-blue-500/20'}`}></div>
              
              {/* Logo container - theme aware */}
              <div className={`relative backdrop-blur-sm rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 xl:p-8 border shadow-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                <img 
                  src={logoSrc}
                  alt="C Square Logo" 
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-contain filter drop-shadow-2xl mx-auto block"
                  style={{ transformOrigin: 'center' }}
                />
                
                {/* Rotating ring - theme aware */}
                <div className={`absolute inset-0 border-2 rounded-2xl lg:rounded-3xl animate-spin ${theme === 'dark' ? 'border-primary/20' : 'border-primary/30'}`} style={{ animationDuration: '20s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Club Modal */}
      <JoinClubModal 
        isOpen={showJoinModal} 
        onClose={() => setShowJoinModal(false)} 
      />
    </section>
  );
}
