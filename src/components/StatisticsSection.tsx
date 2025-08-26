import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Trophy, Calendar } from 'lucide-react';
import { gsapUtils, useGSAP } from '@/hooks/useGSAP';

type ClubStatistics = {
  totalMembers: number;
  activeContests: number;
  problemsSolved: number;
  achievements: number;
};

export default function StatisticsSection() {
  const { isLoaded } = useGSAP();

  const { data: statistics, isLoading } = useQuery<ClubStatistics>({
    queryKey: ['/api/statistics'],
  });

  useEffect(() => {
    if (isLoaded && statistics && window.ScrollTrigger) {
      // Animate the section title
      gsapUtils.fadeIn('.stats-title', 0.5);
      
      // Animate statistics cards with stagger
      window.gsap.fromTo('.stats-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              // Animate counters when section comes into view
              if (statistics.totalMembers) {
                gsapUtils.animateCounter('[data-stat="members"]', statistics.totalMembers, 2);
              }
              if (statistics.activeContests) {
                gsapUtils.animateCounter('[data-stat="contests"]', statistics.activeContests, 1.5);
              }
              if (statistics.problemsSolved) {
                gsapUtils.animateCounter('[data-stat="problems"]', statistics.problemsSolved, 2.5);
              }
              if (statistics.achievements) {
                gsapUtils.animateCounter('[data-stat="achievements"]', statistics.achievements, 1.8);
              }
            }
          }
        }
      );

      // Add hover effects to cards
      window.gsap.set('.stats-card', { transformPerspective: 1000 });
      
      document.querySelectorAll('.stats-card').forEach((card) => {
        card.addEventListener('mouseenter', () => {
          window.gsap.to(card, {
            rotationY: 10,
            rotationX: 5,
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          window.gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }
  }, [isLoaded, statistics]);

  // Fallback data for display
  const fallbackStats: ClubStatistics = {
    totalMembers: 150,
    activeContests: 12,
    problemsSolved: 2500,
    achievements: 45
  };

  const displayStats = statistics || fallbackStats;

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-muted rounded-lg mb-4"></div>
                  <div className="h-8 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="statistics" className="py-20" data-testid="statistics-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="stats-title text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Numbers that reflect our community's dedication and growth
          </p>
        </div>

        <div className="stats-container grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="stats-card bg-card/80 backdrop-blur-sm border-border hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Members
              </CardTitle>
              <Users className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-1">
                <span data-stat="members">{displayStats.totalMembers}</span>+
              </div>
              <p className="text-xs text-muted-foreground">
                Active programmers in our community
              </p>
            </CardContent>
          </Card>

          <Card className="stats-card bg-card/80 backdrop-blur-sm border-border hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Contests
              </CardTitle>
              <Calendar className="h-6 w-6 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                <span data-stat="contests">{displayStats.activeContests}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Monthly programming challenges
              </p>
            </CardContent>
          </Card>

          <Card className="stats-card bg-card/80 backdrop-blur-sm border-border hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Problems Solved
              </CardTitle>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-1">
                <span data-stat="problems">{displayStats.problemsSolved}</span>+
              </div>
              <p className="text-xs text-muted-foreground">
                Collective problem-solving achievements
              </p>
            </CardContent>
          </Card>

          <Card className="stats-card bg-card/80 backdrop-blur-sm border-border hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Achievements
              </CardTitle>
              <Trophy className="h-6 w-6 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                <span data-stat="achievements">{displayStats.achievements}</span>+
              </div>
              <p className="text-xs text-muted-foreground">
                Awards and recognitions earned
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="mt-16 bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-card/40 backdrop-blur-sm rounded-xl border border-border">
              <h3 className="text-2xl font-bold text-primary mb-2">Weekly</h3>
              <p className="text-muted-foreground">Regular coding sessions and workshops</p>
            </div>
            <div className="text-center p-6 bg-card/40 backdrop-blur-sm rounded-xl border border-border">
              <h3 className="text-2xl font-bold text-primary mb-2">Open Source</h3>
              <p className="text-muted-foreground">Contributing to community projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
