import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export default function EventNotificationPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  // Sample upcoming events - in real app this would come from API
  const upcomingEvents: Event[] = [
    {
      id: '1',
      name: 'CodeForces Contest',
      date: 'January 30, 2025',
      time: '7:00 PM',
      location: 'Online',
      description: 'Weekly competitive programming contest'
    },
    {
      id: '2',
      name: 'Algorithm Workshop',
      date: 'February 5, 2025',
      time: '2:00 PM',
      location: 'Computer Lab 1',
      description: 'Learn advanced data structures and algorithms'
    },
    {
      id: '3',
      name: 'Hackathon 2025',
      date: 'February 15, 2025',
      time: '9:00 AM',
      location: 'Main Auditorium',
      description: '48-hour coding challenge with exciting prizes'
    }
  ];

  useEffect(() => {
    // Show notification after 3 seconds of page load
    const timer = setTimeout(() => {
      if (upcomingEvents.length > 0) {
        setCurrentEvent(upcomingEvents[0]);
        setIsVisible(true);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 8000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || !currentEvent) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-500">
      <Card className="w-80 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium opacity-90">Upcoming Event</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-auto p-1 text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <h3 className="font-bold text-lg mb-2">{currentEvent.name}</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{currentEvent.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{currentEvent.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{currentEvent.location}</span>
            </div>
          </div>

          <p className="text-sm opacity-90 mt-3 mb-4">
            {currentEvent.description}
          </p>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="secondary"
              className="flex-1 bg-white text-blue-600 hover:bg-gray-100"
            >
              Learn More
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
