import { useState } from 'react';
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

export default function EventsSection() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  // Fallback events data
  const fallbackEvents = [
    {
      id: '1',
      title: 'Algorithm Workshop',
      description: 'Learn dynamic programming and practice problem solving.',
      date: '2024-09-15T10:00:00Z',
      venue: 'Computer Lab 101',
      type: 'workshop' as const,
      maxParticipants: 30,
      isPublished: true
    },
    {
      id: '2',
      title: 'Code Championship',
      description: 'Monthly programming contest with exciting prizes.',
      date: '2024-09-22T14:00:00Z',
      venue: 'Main Auditorium',
      type: 'contest' as const,
      maxParticipants: 100,
      isPublished: true
    }
  ];

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

  return (
    <section id="events" className="py-20" data-testid="events-section">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Upcoming Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our exciting events and boost your programming skills
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-card/80 backdrop-blur-sm rounded-xl p-1 border border-border">
            {(['all', 'upcoming', 'past'] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-6 py-2 rounded-lg capitalize font-medium transition-all ${
                  filter === filterOption
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {fallbackEvents.map((event) => {
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
              <Card key={event.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors mt-3 text-foreground">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{formattedTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.venue}</span>
                    </div>
                    {event.maxParticipants && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>Max {event.maxParticipants} participants</span>
                      </div>
                    )}
                  </div>

                  <Button className="w-full group-hover:shadow-lg transition-all">
                    Register Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Show All Events */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="bg-card/80 backdrop-blur-sm border-border hover:bg-card/90"
          >
            View All Events
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}