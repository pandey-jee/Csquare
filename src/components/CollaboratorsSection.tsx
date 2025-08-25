import { useEffect } from 'react';
import { gsapUtils, useGSAP } from '@/hooks/useGSAP';

export default function CollaboratorsSection() {
  const { isLoaded } = useGSAP();

  useEffect(() => {
    if (isLoaded && window.ScrollTrigger) {
      gsapUtils.fadeIn('.collaborators-title', 0.5);
      gsapUtils.slideUp('.collaborator-card', 0.7);
    }
  }, [isLoaded]);

  return (
    <section id="collaborators" className="py-20 bg-muted/30" data-testid="collaborators-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="collaborators-title text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our 
            <span className="text-primary"> Collaborations</span>
          </h2>
        </div>

        {/* Partner Cards */}
        <div className="flex justify-center items-center gap-12 flex-wrap">
          {/* Card 1 - Tech Organization */}
          <div className="collaborator-card bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-[280px] text-center">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-2xl">T</span>
            </div>
            <h3 className="text-white font-semibold text-lg">TechCorp</h3>
            <p className="text-gray-300 text-sm mt-2">Technology Partner</p>
          </div>

          {/* Card 2 - Coding Ninjas */}
          <div className="collaborator-card bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-[280px] text-center border border-gray-200">
            <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">CN</span>
            </div>
            <h3 className="text-gray-900 font-semibold text-lg">Coding Ninjas</h3>
            <p className="text-gray-600 text-sm mt-2">Educational Platform</p>
          </div>

          {/* Card 3 - PandoraX */}
          <div className="collaborator-card bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-[280px] text-center border border-gray-200">
            <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">PX</span>
            </div>
            <h3 className="text-gray-900 font-semibold text-lg">PandoraX</h3>
            <p className="text-gray-600 text-sm mt-2">Innovation & Revolution</p>
          </div>
        </div>
      </div>
    </section>
  );
}
