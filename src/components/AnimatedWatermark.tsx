import { useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';

export default function AnimatedWatermark() {
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      // Create floating animation for watermarks
      const watermarks = document.querySelectorAll('.watermark-logo');
      
      watermarks.forEach((watermark, index) => {
        // Random floating animation for each logo
        const randomX = Math.random() * 100 - 50; // -50 to 50
        const randomY = Math.random() * 60 - 30;  // -30 to 30
        const randomRotation = Math.random() * 360;
        const randomDuration = 8 + Math.random() * 12; // 8-20 seconds
        
        window.gsap.to(watermark, {
          x: randomX,
          y: randomY,
          rotation: randomRotation,
          duration: randomDuration,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: (Math.random() * 3) + (index * 0.1) // Random delay with slight stagger
        });

        // Additional continuous rotation
        window.gsap.to(watermark, {
          rotation: `+=${360}`,
          duration: 30 + Math.random() * 20 + (index * 2),
          ease: "none",
          repeat: -1
        });
      });
    }
  }, [theme]); // Re-run when theme changes

  const logoSrc = theme === 'dark' ? '/CWhite.png' : '/CBlack.png';

  // Generate fewer logo positions across the screen with more blur and lower opacity
  const logoPositions = [
    // Top scattered
    { top: '15%', left: '12%', size: 'w-12 h-12', opacity: 'opacity-5' },
    { top: '8%', left: '75%', size: 'w-10 h-10', opacity: 'opacity-3' },
    
    // Middle scattered  
    { top: '35%', left: '8%', size: 'w-14 h-14', opacity: 'opacity-4' },
    { top: '42%', left: '85%', size: 'w-12 h-12', opacity: 'opacity-3' },
    { top: '55%', left: '15%', size: 'w-10 h-10', opacity: 'opacity-5' },
    
    // Bottom scattered
    { top: '75%', left: '20%', size: 'w-12 h-12', opacity: 'opacity-4' },
    { top: '85%', left: '80%', size: 'w-10 h-10', opacity: 'opacity-3' },
    { top: '68%', left: '70%', size: 'w-14 h-14', opacity: 'opacity-5' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {logoPositions.map((position, index) => (
        <img 
          key={index}
          src={logoSrc}
          alt=""
          className={`watermark-logo absolute ${position.size} ${position.opacity} object-contain transform-gpu blur-sm`}
          style={{
            top: position.top,
            left: position.left,
          }}
        />
      ))}
    </div>
  );
}
