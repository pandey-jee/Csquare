import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Advanced GSAP Animation Utilities
export const advancedGSAPUtils = {
  // 3D Transformations with perspective
  init3DTransforms: (selector: string) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      gsap.set(selector, {
        transformPerspective: 1000,
        transformStyle: "preserve-3d"
      });
    }
  },

  // Magnetic cursor effect for interactive elements
  magneticEffect: (selector: string) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      element.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (element as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  },

  // 3D staggered entrance animation
  staggeredEntrance3D: (selector: string, delayAmount = 0.1) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      gsap.fromTo(selector, 
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
          transformOrigin: "center bottom"
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: delayAmount,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: selector,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  },

  // Physics-based elastic animation
  elasticHover: (selector: string) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          rotation: 2,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });
  },

  // Parallax scrolling effect
  parallaxScroll: (selector: string, speed = 0.5) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      gsap.to(selector, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: selector,
          start: "top bottom",
          end: "bottom top",
          scrub: speed
        }
      });
    }
  }
};

// Hook for managing GSAP animations
export const useAdvancedGSAP = () => {
  const ctx = useRef<any>(null);

  useEffect(() => {
    // Create GSAP context for cleanup
    ctx.current = gsap.context(() => {});
    
    return () => {
      if (ctx.current) {
        ctx.current.revert();
      }
    };
  }, []);

  return {
    ctx: ctx.current,
    utils: advancedGSAPUtils
  };
};