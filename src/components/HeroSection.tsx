import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Users, Trophy, Code } from 'lucide-react';
import { gsapUtils, useGSAP } from '@/hooks/useGSAP';
import JoinClubModal from './JoinClubModal';
import { ClubStatistics } from '@/types';

export default function HeroSection() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const { isLoaded } = useGSAP();

  const { data: statistics } = useQuery<ClubStatistics>({
    queryKey: ['/api/statistics'],
  });

  const { data: upcomingEvents } = useQuery({
    queryKey: ['/api/events', { type: 'upcoming' }],
  });

  useEffect(() => {
    if (isLoaded && statistics) {
      // Animate hero text reveals
      gsapUtils.revealText('.hero-title span', 0);
      gsapUtils.fadeIn('.hero-description', 0.8);
      gsapUtils.slideUp('.hero-buttons', 1.2);
      gsapUtils.slideUp('.hero-image', 0.6);
      
      // Animate floating stats
      gsapUtils.slideInLeft('.stat-left', 1.6);
      gsapUtils.slideInRight('.stat-right', 1.8);
      
      // Animate upcoming event banner
      gsapUtils.scaleIn('.event-banner', 2);
      
      // Animate statistics counters
      setTimeout(() => {
        if (statistics.totalMembers) {
          gsapUtils.animateCounter('[data-count="members"]', statistics.totalMembers, 2);
        }
        if (statistics.totalEvents) {
          gsapUtils.animateCounter('[data-count="events"]', statistics.totalEvents, 2);
        }
      }, 1600);
    }
  }, [isLoaded, statistics]);

  const nextEvent = upcomingEvents?.[0];
  const daysUntilEvent = nextEvent ? Math.ceil((new Date(nextEvent.eventDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center bg-gradient-to-br from-background via-background/50 to-primary/5 pt-20 relative overflow-hidden"
      data-testid="hero-section"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-32 right-10 w-72 h-72 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Hero Badge */}
            <Badge variant="secondary" className="w-fit">
              <Code className="h-4 w-4 mr-2" />
              #1 Competitive Programming Club
            </Badge>

            {/* Hero Title with GSAP word reveal */}
            <div className="overflow-hidden">
              <h1 className="hero-title text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block gsap-reveal text-foreground" data-testid="text-welcome">Master</span>
                <span className="block text-primary gsap-reveal" data-testid="text-csquare">Algorithms</span>
                <span className="block text-3xl lg:text-4xl font-normal text-muted-foreground gsap-reveal" data-testid="text-subtitle">
                  with CSquare Club
                </span>
              </h1>
            </div>
            
            <p className="hero-description text-xl text-muted-foreground leading-relaxed gsap-fade-in max-w-2xl" data-testid="text-description">
              Join our community of passionate programmers, algorithmic thinkers, and problem solvers. 
              We compete, we learn, and we grow together in the exciting world of competitive programming.
            </p>
            
            {/* Stats Preview */}
            {statistics && (
              <div className="flex gap-6 py-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary" data-count="members" data-testid="text-members-count">
                    {statistics.totalMembers || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary" data-count="events" data-testid="text-events-count">
                    {statistics.totalEvents || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {statistics.coreTeamMembers || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Mentors</div>
                </div>
              </div>
            )}
            
            {/* Hero Buttons with GSAP animation */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 gsap-slide-up">
              <Button 
                onClick={() => setShowJoinModal(true)}
                size="lg"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg group"
                data-testid="button-join-club"
              >
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                data-testid="button-view-events"
              >
                <Calendar className="mr-2 h-5 w-5" />
                View Events
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="hero-image rounded-2xl shadow-2xl gsap-slide-up w-full h-[500px] bg-gradient-to-br from-primary/20 to-blue-600/20 border border-border flex items-center justify-center overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-8">
                  {/* Code blocks animation */}
                  <div className="space-y-2">
                    <div className="h-3 bg-primary/30 rounded animate-pulse"></div>
                    <div className="h-3 bg-primary/20 rounded animate-pulse delay-100"></div>
                    <div className="h-3 bg-primary/40 rounded animate-pulse delay-200"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-blue-500/30 rounded animate-pulse delay-300"></div>
                    <div className="h-3 bg-blue-500/20 rounded animate-pulse delay-400"></div>
                    <div className="h-3 bg-blue-500/40 rounded animate-pulse delay-500"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-purple-500/30 rounded animate-pulse delay-600"></div>
                    <div className="h-3 bg-purple-500/20 rounded animate-pulse delay-700"></div>
                    <div className="h-3 bg-purple-500/40 rounded animate-pulse delay-800"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating Achievement Cards */}
              <div className="stat-left absolute -bottom-6 -left-6 bg-card rounded-xl p-6 shadow-xl gsap-slide-in border border-border" data-testid="card-achievement">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">Top 10</div>
                    <div className="text-sm text-muted-foreground">College Ranking</div>
                  </div>
                </div>
              </div>
              
              <div className="stat-right absolute -top-6 -right-6 bg-card rounded-xl p-6 shadow-xl gsap-slide-in border border-border" data-testid="card-active-members">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">50+</div>
                    <div className="text-sm text-muted-foreground">Active Coders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Event Banner */}
        {nextEvent && (
          <div className="event-banner mt-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-primary-foreground relative overflow-hidden gsap-scale-in border border-border" data-testid="banner-upcoming-event">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2" data-testid="text-event-title">🎯 Upcoming Event!</h3>
                <p className="text-lg opacity-90" data-testid="text-event-name">{nextEvent.title}</p>
                <p className="text-sm opacity-75" data-testid="text-event-date">
                  {new Date(nextEvent.eventDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1" data-testid="text-days-left">{Math.max(0, daysUntilEvent)}</div>
                <div className="text-sm opacity-75">Days Left</div>
                <Button 
                  variant="secondary"
                  className="mt-3 px-6 py-2 rounded-lg font-semibold"
                  onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-register-event"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <JoinClubModal 
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      />
    </section>
  );
}
