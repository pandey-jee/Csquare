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
  Filter,
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
      <section className="py-20 bg-background">
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
    <section id="events" className="py-20 bg-background" data-testid="events-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="events-title text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Events
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Join Our 
            <span className="text-primary"> Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Workshops, contests, and learning sessions to boost your programming skills.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="events-filter flex justify-center mb-12">
          <div className="inline-flex bg-muted rounded-xl p-1">
            {['all', 'upcoming', 'past'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType as any)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 capitalize ${
                  filter === filterType 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Filter className="h-4 w-4 mr-2 inline" />
                {filterType} Events
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredEvents.map((event, index) => {
            const EventIcon = getEventIcon(event.type);
            const eventDate = new Date(event.date);
            const isUpcoming = eventDate >= new Date();
            
            return (
              <Card 
                key={event.id}
                className="event-card group hover:shadow-lg transition-all duration-300 border border-border"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
                      <EventIcon className="h-5 w-5" />
                    </div>
                    <Badge 
                      variant={isUpcoming ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {event.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {eventDate.toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {eventDate.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {event.venue}
                    </div>
                    
                    {event.maxParticipants && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        Max {event.maxParticipants} participants
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <Button 
                      className="w-full group/btn"
                      variant={isUpcoming ? "default" : "outline"}
                      disabled={!isUpcoming}
                    >
                      {isUpcoming ? 'Register Now' : 'Event Completed'}
                      {isUpcoming && (
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Events Message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No {filter !== 'all' ? filter : ''} events found
            </h3>
            <p className="text-muted-foreground">
              Check back later for exciting new events and workshops!
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary to-blue-600 border-0">
            <CardContent className="p-8 text-primary-foreground">
              <h3 className="text-2xl font-bold mb-4">Want to Suggest an Event?</h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Have an idea for a workshop, competition, or learning session? 
                We'd love to hear from you and make it happen!
              </p>
              <Button 
                variant="secondary"
                size="lg"
                className="font-semibold"
                onClick={() => window.open('mailto:events@cSquare.club?subject=Event Suggestion', '_blank')}
              >
                Suggest an Event
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
