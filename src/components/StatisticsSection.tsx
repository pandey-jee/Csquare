import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Target, Star } from 'lucide-react';
import { gsapUtils, useGSAP } from '@/hooks/useGSAP';
import { ClubStatistics } from '@/types';

export default function StatisticsSection() {
  const { isLoaded } = useGSAP();

  const { data: statistics, isLoading } = useQuery<ClubStatistics>({
    queryKey: ['/api/statistics'],
  });

  useEffect(() => {
    if (isLoaded && statistics && window.ScrollTrigger) {
      // Title animations with ScrollTrigger
      window.gsap.fromTo(
        '.stats-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-title',
            start: 'top 80%',
            end: 'bottom 20%',
          },
        }
      );

      // Stagger stat cards animation
      window.gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 75%',
            end: 'bottom 25%',
            onEnter: () => {
              // Animate counters when cards are visible
              if (statistics.totalMembers) {
                gsapUtils.animateCounter('[data-stat="members"]', statistics.totalMembers, 2);
              }
              if (statistics.totalEvents) {
                gsapUtils.animateCounter('[data-stat="events"]', statistics.totalEvents, 2);
              }
              if ((statistics as any).coreTeamMembers) {
                gsapUtils.animateCounter('[data-stat="mentors"]', (statistics as any).coreTeamMembers, 2);
              }
            },
          },
        }
      );
    }
  }, [isLoaded, statistics]);

  const statsData = [
    {
      icon: Users,
      label: "Members",
      value: statistics?.totalMembers || 0,
      dataKey: "members",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Active club members"
    },
    {
      icon: Calendar,
      label: "Events",
      value: statistics?.totalEvents || 0,
      dataKey: "events",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Workshops and contests"
    },
    {
      icon: Target,
      label: "Core Team",
      value: (statistics as any)?.coreTeamMembers || 12,
      dataKey: "mentors",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Team leaders"
    },
    {
      icon: Star,
      label: "Rating",
      value: 4.8,
      dataKey: "rating",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      description: "Member satisfaction",
      suffix: "/5"
    }
  ];

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
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
    <section id="statistics" className="py-20 bg-background" data-testid="statistics-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="stats-title text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Our Impact
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            By the 
            <span className="text-primary"> Numbers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building a strong community of competitive programmers.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="stats-container grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <Card key={index} className="stat-card group hover:shadow-lg transition-all duration-300 border border-border" data-testid={`stat-card-${stat.dataKey}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-foreground" data-stat={stat.dataKey} data-testid={`stat-value-${stat.dataKey}`}>
                      {stat.value}{stat.suffix || ''}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Highlights */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Recent Achievements</h3>
            <p className="text-muted-foreground">
              Our latest successes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-background rounded-xl border border-border">
              <Star className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Top Rated</h4>
              <p className="text-sm text-muted-foreground">
                #1 programming club in university
              </p>
            </div>
            
            <div className="text-center p-6 bg-background rounded-xl border border-border">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Growing Fast</h4>
              <p className="text-sm text-muted-foreground">
                200% growth in active members
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
