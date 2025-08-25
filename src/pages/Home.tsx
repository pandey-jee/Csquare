import { useEffect } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatisticsSection from '@/components/StatisticsSection';
import CoreTeamSlider from '@/components/CoreTeamSlider';
import CollaboratorsSection from '@/components/CollaboratorsSection';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';
import AnimatedWatermark from '@/components/AnimatedWatermark';
import EventNotificationPopup from '@/components/EventNotificationPopup';

export default function Home() {
  const { isLoaded } = useGSAP();

  useEffect(() => {
    if (isLoaded && window.ScrollTrigger) {
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

      // Navbar scroll effect
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
      });

      // Global page load animations
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
          duration: 0.8,
          ease: 'power3.out',
        }, '<0.2');
    }
  }, [isLoaded]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" data-testid="home-page">
      <AnimatedWatermark />
      <EventNotificationPopup />
      <Navbar />
      <main>
        <HeroSection />
        <StatisticsSection />
        <CoreTeamSlider />
        <CollaboratorsSection />
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
}
