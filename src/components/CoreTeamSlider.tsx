import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
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
    twitter?: string;
    email?: string;
  };
  skills: string[];
  achievements: string[];
}

const CoreTeamSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
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
      social: { github: "#", linkedin: "#", email: "alex@csquare.com" },
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
      social: { github: "#", linkedin: "#", twitter: "#" },
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
      social: { github: "#", twitter: "#", email: "emily@csquare.com" },
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
      social: { github: "#", linkedin: "#", twitter: "#" },
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
      ...(index % 3 === 0 ? { twitter: "#" } : {}),
      ...(index % 4 === 0 ? { email: `member${index + 7}@csquare.com` } : {})
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
    <section id="team" className="min-h-screen bg-background relative overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-black/80"></div>
      
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-800 ease-in-out"
        style={{
          backgroundImage: `url(${allMembers[currentSlide]?.image})`,
          filter: 'blur(8px) brightness(0.3)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-white border-white/20 bg-white/5 mb-4">
            Our Team
          </Badge>
          <h2 className="text-5xl font-bold text-white mb-4">Meet Our Core Team</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            30 passionate members driving innovation in competitive programming
          </p>
        </div>

        {/* Slider */}
        <div className="slider" ref={sliderRef}>
          <button 
            className="slider--btn slider--btn__prev"
            onClick={prevSlide}
          >
            <ChevronLeft size={40} />
          </button>

          <div className="slides__wrapper">
            <div className="slides">
              {/* Previous Slide */}
              <div 
                className="slide" 
                data-previous
                style={{ '--slide-width': 'min(25vw, 300px)' } as any}
              >
                <div className="slide__inner">
                  <div className="slide--image__wrapper">
                    <img 
                      className="slide--image" 
                      src={allMembers[getSlideIndex(-1)]?.image} 
                      alt={allMembers[getSlideIndex(-1)]?.name}
                    />
                  </div>
                </div>
              </div>

              {/* Current Slide */}
              <div 
                className="slide" 
                data-current
                style={{ '--slide-width': 'min(25vw, 300px)' } as any}
              >
                <div className="slide__inner">
                  <div className="slide--image__wrapper">
                    <img 
                      className="slide--image" 
                      src={allMembers[currentSlide]?.image} 
                      alt={allMembers[currentSlide]?.name}
                    />
                  </div>
                </div>
              </div>

              {/* Next Slide */}
              <div 
                className="slide" 
                data-next
                style={{ '--slide-width': 'min(25vw, 300px)' } as any}
              >
                <div className="slide__inner">
                  <div className="slide--image__wrapper">
                    <img 
                      className="slide--image" 
                      src={allMembers[getSlideIndex(1)]?.image} 
                      alt={allMembers[getSlideIndex(1)]?.name}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Info */}
            <div className="slides--infos">
              <div className="slide-info" data-current>
                <div className="slide-info__inner">
                  <div className="slide-info--text__wrapper">
                    <div data-title className="slide-info--text">
                      <span>{allMembers[currentSlide]?.name}</span>
                    </div>
                    <div data-subtitle className="slide-info--text">
                      <span>{allMembers[currentSlide]?.role}</span>
                    </div>
                    <div data-description className="slide-info--text">
                      <span>{allMembers[currentSlide]?.position}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            className="slider--btn slider--btn__next"
            onClick={nextSlide}
          >
            <ChevronRight size={40} />
          </button>
        </div>

        {/* Member Details */}
        <div className="mt-16 bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{allMembers[currentSlide]?.name}</h3>
              <p className="text-white/80 mb-6">{allMembers[currentSlide]?.description}</p>
              
              {/* Skills */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {allMembers[currentSlide]?.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/10 text-white border-white/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {allMembers[currentSlide]?.social.github && (
                  <a href={allMembers[currentSlide].social.github} className="text-white/60 hover:text-white transition-colors">
                    <Github size={24} />
                  </a>
                )}
                {allMembers[currentSlide]?.social.linkedin && (
                  <a href={allMembers[currentSlide].social.linkedin} className="text-white/60 hover:text-white transition-colors">
                    <Linkedin size={24} />
                  </a>
                )}
                {allMembers[currentSlide]?.social.twitter && (
                  <a href={allMembers[currentSlide].social.twitter} className="text-white/60 hover:text-white transition-colors">
                    <Twitter size={24} />
                  </a>
                )}
                {allMembers[currentSlide]?.social.email && (
                  <a href={`mailto:${allMembers[currentSlide].social.email}`} className="text-white/60 hover:text-white transition-colors">
                    <Mail size={24} />
                  </a>
                )}
              </div>
            </div>

            <div>
              {/* Achievements */}
              <h4 className="text-lg font-semibold text-white mb-3">Achievements</h4>
              <ul className="space-y-2">
                {allMembers[currentSlide]?.achievements.map((achievement, index) => (
                  <li key={index} className="text-white/80 flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <span className="text-white/60">
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>
    </section>
  );
};

export default CoreTeamSection;
