import { useEffect } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { advancedGSAPUtils } from '@/hooks/useAdvancedGSAP';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatisticsSection from '@/components/StatisticsSection';
import CoreTeamSlider from '@/components/CoreTeamSlider';
import CollaboratorsSection from '@/components/CollaboratorsSection';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';
import AnimatedWatermark from '@/components/AnimatedWatermark';
import EventNotificationPopup from '@/components/EventNotificationPopup';
import GeometricBackground from '@/components/GeometricBackground';

export default function Home() {
  const { isLoaded } = useGSAP();

  useEffect(() => {
    if (isLoaded && window.ScrollTrigger) {
      // Initialize liquid cursor effect
      advancedGSAPUtils.liquidCursor();
      
      // Advanced scroll-triggered text reveals
      advancedGSAPUtils.textReveal('.section-title');
      
      // Staggered entrance for all main sections
      advancedGSAPUtils.staggeredEntrance3D('.page-section', 0.3);

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor: Element) => {
        anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href') || '');
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });

      // Enhanced navbar scroll effect with 3D transforms
      window.gsap.to('.navbar', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '100px top',
          scrub: true,
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
        rotationX: 2,
        transformPerspective: 1000
      });

      // Global page load animations with advanced effects
      const timeline = window.gsap.timeline();
      timeline
        .from('body', {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
        .from('.navbar', {
          y: -100,
          opacity: 0,
          rotationX: -90,
          duration: 0.8,
          ease: 'back.out(1.7)',
        }, '<0.2')
        .from('.page-section', {
          opacity: 0,
          y: 100,
          rotationX: -15,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out'
        }, '<0.4');
    }
  }, [isLoaded]);

  return (
    <div className="min-h-screen bg-background/95 backdrop-blur-sm overflow-x-hidden" data-testid="home-page">
      <GeometricBackground />
      <AnimatedWatermark />
      <EventNotificationPopup />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <div className="page-section bg-background/90 backdrop-blur-sm">
          <StatisticsSection />
        </div>
        <div className="page-section bg-background/95 backdrop-blur-sm">
          <CoreTeamSlider />
        </div>
        <div className="page-section bg-background/90 backdrop-blur-sm">
          <CollaboratorsSection />
        </div>
        <div className="page-section bg-background/95 backdrop-blur-sm">
          <EventsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
