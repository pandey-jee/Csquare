import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRight,
  Trophy,
  Code,
  Laptop,
  BookOpen
} from 'lucide-react';
import { gsapUtils, useGSAP } from '@/hooks/useGSAP';

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  type: 'workshop' | 'contest' | 'hackathon' | 'seminar' | 'other';
  maxParticipants?: number;
  registrationDeadline?: string;
  isPublished: boolean;
};

export default function EventsSection() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  const { isLoaded } = useGSAP();

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  // Fallback events data
  const fallbackEvents: Event[] = [
    {
      id: '1',
      title: 'Algorithm Workshop',
      description: 'Learn dynamic programming and practice problem solving.',
      date: '2024-09-15T10:00:00Z',
      venue: 'Computer Lab 101',
      type: 'workshop',
      maxParticipants: 30,
      registrationDeadline: '2024-09-14T23:59:59Z',
      isPublished: true
    },
    {
      id: '2',
      title: 'Programming Contest',
      description: 'Compete with programmers from other colleges. Prizes for winners!',
      date: '2024-09-22T09:00:00Z',
      venue: 'Main Auditorium',
      type: 'contest',
      maxParticipants: 100,
      registrationDeadline: '2024-09-20T23:59:59Z',
      isPublished: true
    },
    {
      id: '3',
      title: '48-Hour Hackathon',
      description: 'Build innovative solutions in teams over the weekend.',
      date: '2024-10-05T18:00:00Z',
      venue: 'Innovation Center',
      type: 'hackathon',
      maxParticipants: 80,
      registrationDeadline: '2024-10-03T23:59:59Z',
      isPublished: true
    },
    {
      id: '4',
      title: 'Data Structures Class',
      description: 'Master advanced data structures with hands-on practice.',
      date: '2024-10-12T14:00:00Z',
      venue: 'Online (Zoom)',
      type: 'seminar',
      maxParticipants: 50,
      registrationDeadline: '2024-10-10T23:59:59Z',
      isPublished: true
    }
  ];

  const displayEvents = events.length > 0 ? events : fallbackEvents;

  useEffect(() => {
    if (isLoaded && window.ScrollTrigger) {
      gsapUtils.fadeIn('.events-title', 0.5);
      gsapUtils.slideUp('.events-filter', 0.7);
      gsapUtils.slideUp('.event-card', 0.9);
    }
  }, [isLoaded]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'workshop': return BookOpen;
      case 'contest': return Trophy;
      case 'hackathon': return Code;
      case 'seminar': return Laptop;
      default: return Calendar;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'contest': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'hackathon': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'seminar': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const filteredEvents = displayEvents.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    
    switch (filter) {
      case 'upcoming': return eventDate >= now;
      case 'past': return eventDate < now;
      default: return true;
    }
  });

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-4"></div>
                  <div className="h-20 bg-muted rounded mb-4"></div>
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
    <section id="events" className="py-20" data-testid="events-section">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="events-title text-4xl md:text-5xl font-bold text-white mb-6">
            Upcoming Events
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Join our exciting events and boost your programming skills
          </p>
        </div>

        {/* Filter */}
        <div className="events-filter flex justify-center mb-12">
          <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-xl p-1">
            {(['all', 'upcoming', 'past'] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-6 py-2 rounded-lg capitalize font-medium transition-all ${
                  filter === filterOption
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredEvents.map((event) => {
            const Icon = getEventIcon(event.type);
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            const formattedTime = eventDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <Card key={event.id} className="event-card group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <Badge variant="outline" className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{formattedTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{event.venue}</span>
                    </div>
                    {event.maxParticipants && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>Max {event.maxParticipants} participants</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex gap-2">
                    <Button size="sm" className="flex-1">
                      Register Now
                    </Button>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary to-blue-600 border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Want to organize an event?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Have an idea for a workshop, contest, or study session? We'd love to hear from you!
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                Propose Event
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
