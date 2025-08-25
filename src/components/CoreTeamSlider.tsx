import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Github, Linkedin, Instagram } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  position: string;
  description: string;
  image: string;
  social: {
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
  skills: string[];
  achievements: string[];
}

const CoreTeamSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate 30 team members with variety
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "President",
      position: "Full Stack Developer",
      description: "Leading the club towards excellence in competitive programming.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      social: { github: "#", linkedin: "#", instagram: "#" },
      skills: ["React", "Node.js", "Python", "Algorithm Design"],
      achievements: ["ICPC Regional Winner", "Google Summer of Code", "Lead Developer at TechCorp"]
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Vice President",
      position: "AI/ML Engineer",
      description: "Passionate about machine learning and competitive coding.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=400&h=500&fit=crop",
      social: { github: "#", linkedin: "#", instagram: "#" },
      skills: ["Python", "TensorFlow", "PyTorch", "Data Structures"],
      achievements: ["Kaggle Expert", "Published Research", "Microsoft Intern"]
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Technical Lead",
      position: "Backend Developer",
      description: "Expert in system design and scalable architecture.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
      social: { github: "#", linkedin: "#" },
      skills: ["Java", "Spring Boot", "Docker", "Microservices"],
      achievements: ["AWS Certified", "Tech Lead at StartupXYZ", "Open Source Contributor"]
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Events Coordinator",
      position: "Frontend Developer",
      description: "Creating amazing user experiences and organizing events.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
      social: { github: "#", instagram: "#", linkedin: "#" },
      skills: ["React", "TypeScript", "Design Systems", "UI/UX"],
      achievements: ["Design Award Winner", "Frontend Lead", "Community Speaker"]
    },
    {
      id: 5,
      name: "David Kim",
      role: "Treasurer",
      position: "Data Scientist",
      description: "Managing finances and analyzing competitive programming trends.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
      social: { github: "#", linkedin: "#" },
      skills: ["Python", "R", "SQL", "Machine Learning"],
      achievements: ["Data Science Certification", "Research Publication", "Analytics Expert"]
    },
    {
      id: 6,
      name: "Lisa Wang",
      role: "Secretary",
      position: "Mobile Developer",
      description: "Keeping records and developing mobile applications.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
      social: { github: "#", linkedin: "#", instagram: "#" },
      skills: ["Flutter", "React Native", "Swift", "Kotlin"],
      achievements: ["App Store Featured", "Mobile Expert", "Tech Blogger"]
    }
  ];

  // Generate additional 24 members
  const additionalMembers: TeamMember[] = Array.from({ length: 24 }, (_, index) => ({
    id: index + 7,
    name: [
      "John Smith", "Anna Brown", "Mike Wilson", "Sofia Garcia", "Ryan Taylor",
      "Maya Patel", "Chris Anderson", "Zoe Martinez", "Jake Thompson", "Nina Rodriguez",
      "Sam Lee", "Ava Johnson", "Max Chen", "Ella Davis", "Ben Miller", "Grace Kim",
      "Luke Wilson", "Chloe Zhang", "Noah Garcia", "Mia Anderson", "Owen Martinez",
      "Lily Thompson", "Ethan Brown", "Sophia Lee"
    ][index],
    role: [
      "Senior Member", "Active Member", "Core Member", "Contributing Member", 
      "Research Member", "Algorithm Specialist", "Contest Participant"
    ][index % 7],
    position: [
      "Software Engineer", "Backend Developer", "Frontend Developer", "DevOps Engineer",
      "Data Scientist", "Mobile Developer", "Full Stack Developer", "Game Developer",
      "Security Engineer", "Cloud Architect"
    ][index % 10],
    description: [
      "Passionate about algorithms and problem solving.",
      "Expert in competitive programming and system design.",
      "Dedicated to learning and sharing knowledge.",
      "Enthusiastic about open source contributions.",
      "Focused on building scalable applications."
    ][index % 5],
    image: `https://images.unsplash.com/photo-${1500000000000 + index * 100000}?w=400&h=500&fit=crop&auto=format`,
    social: { 
      github: "#", 
      linkedin: "#", 
      instagram: "#"
    },
    skills: [
      ["JavaScript", "Node.js", "MongoDB"],
      ["Python", "Django", "PostgreSQL"],
      ["Java", "Spring", "MySQL"],
      ["React", "TypeScript", "GraphQL"],
      ["Go", "Docker", "Kubernetes"]
    ][index % 5],
    achievements: [
      ["Contest Winner", "Open Source Contributor"],
      ["Hackathon Winner", "Tech Speaker"],
      ["Research Publication", "Industry Expert"],
      ["Community Leader", "Mentor"]
    ][index % 4]
  }));

  const allMembers = [...teamMembers, ...additionalMembers];
  const totalSlides = allMembers.length;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && isLoaded) {
      const ctx = window.gsap.context(() => {
        // Initial setup for slides
        window.gsap.set('.slide', { 
          rotationY: 45, 
          scale: 0.8, 
          x: 100,
          opacity: 0.6 
        });
        
        window.gsap.set('.slide[data-current]', { 
          rotationY: 0, 
          scale: 1.2, 
          x: 0,
          opacity: 1,
          zIndex: 20 
        });
        
        window.gsap.set('.slide[data-previous]', { 
          rotationY: -45, 
          scale: 0.8, 
          x: -100,
          opacity: 0.6,
          zIndex: 10 
        });

        // Floating animation for current slide
        window.gsap.to('.slide[data-current] .slide__inner', {
          y: -10,
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      return () => ctx.revert();
    }
  }, [isLoaded, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getSlideIndex = (offset: number) => {
    return (currentSlide + offset + totalSlides) % totalSlides;
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="team-loader">
          <span className="team-loader__text text-2xl font-bold">Loading Team...</span>
        </div>
      </div>
    );
  }

  return (
    <section id="team" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Our Team
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Meet Our Core Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate members driving innovation in competitive programming
          </p>
        </div>

        {/* Compact Slider */}
        <div className="relative max-w-4xl mx-auto">
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 transition-colors"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex justify-center items-center min-h-[400px]">
            {/* Previous Slide */}
            <div className="hidden md:block w-48 h-64 mx-4 opacity-50 transform scale-75 transition-all duration-300">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                <img 
                  className="w-full h-full object-cover" 
                  src={allMembers[getSlideIndex(-1)]?.image} 
                  alt={allMembers[getSlideIndex(-1)]?.name}
                />
              </div>
            </div>

            {/* Current Slide */}
            <div className="w-72 h-96 mx-4 transform scale-100 transition-all duration-300 relative">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                <img 
                  className="w-full h-full object-cover" 
                  src={allMembers[currentSlide]?.image} 
                  alt={allMembers[currentSlide]?.name}
                />
                
                {/* Name and Position Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {allMembers[currentSlide]?.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-1">
                    {allMembers[currentSlide]?.role}
                  </p>
                  <p className="text-white/80 text-sm">
                    {allMembers[currentSlide]?.position}
                  </p>
                </div>

                {/* Social Media Icons - Bottom Right */}
                <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                  {allMembers[currentSlide]?.social.github && (
                    <a 
                      href={allMembers[currentSlide].social.github} 
                      className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {allMembers[currentSlide]?.social.linkedin && (
                    <a 
                      href={allMembers[currentSlide].social.linkedin} 
                      className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {allMembers[currentSlide]?.social.instagram && (
                    <a 
                      href={allMembers[currentSlide].social.instagram} 
                      className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Next Slide */}
            <div className="hidden md:block w-48 h-64 mx-4 opacity-50 transform scale-75 transition-all duration-300">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                <img 
                  className="w-full h-full object-cover" 
                  src={allMembers[getSlideIndex(1)]?.image} 
                  alt={allMembers[getSlideIndex(1)]?.name}
                />
              </div>
            </div>
          </div>

          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 transition-colors"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="text-center mt-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            {Array.from({ length: Math.min(totalSlides, 10) }, (_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide % 10 ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-sm">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>
    </section>
  );
};

export default CoreTeamSection;
