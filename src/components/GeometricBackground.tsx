import { useEffect, useRef } from 'react';

export default function GeometricBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const wrap = container.querySelector('.geometric-wrap') as HTMLElement;
    
    if (!wrap) return;
    
    // Clear existing triangles
    wrap.innerHTML = '';

    // Create 200 triangles with random properties
    for (let i = 0; i < 200; i++) {
      const triangle = document.createElement('div');
      triangle.className = 'tri';
      
      // Generate random properties
      const size = Math.random() * 25 + 10; // 10-35px
      const hue = Math.random() * 360; // 0-360 degrees
      const delay = Math.random() * -15; // 0 to -15s
      const duration = Math.random() * 10 + 8; // 8-18s
      const x = (Math.random() - 0.5) * 1000; // -500 to 500px
      const y = (Math.random() - 0.5) * 800; // -400 to 400px
      
      // Set CSS custom properties
      triangle.style.setProperty('--size', `${size}px`);
      triangle.style.setProperty('--hue', `${hue}`);
      triangle.style.setProperty('--delay', `${delay}s`);
      triangle.style.setProperty('--duration', `${duration}s`);
      triangle.style.setProperty('--x', `${x}px`);
      triangle.style.setProperty('--y', `${y}px`);
      
      wrap.appendChild(triangle);
    }

    // Performance optimization: pause animations when tab is not visible
    const handleVisibilityChange = () => {
      const triangles = wrap.querySelectorAll('.tri');
      if (document.hidden) {
        triangles.forEach(tri => {
          (tri as HTMLElement).style.animationPlayState = 'paused';
        });
      } else {
        triangles.forEach(tri => {
          (tri as HTMLElement).style.animationPlayState = 'running';
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="geometric-background">
      <div className="geometric-wrap"></div>
    </div>
  );
}
