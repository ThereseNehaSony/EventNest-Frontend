import React from 'react';
import EventCard from './eventCard';

interface Event {
  title: string;
  host: string;
  image: string;
  date: string,
  price:string,
  type: 'online' | 'offline';
}

const events: Event[] = [
  {
    title: 'Philodendron',
    host: 'YUVADHARA',
    image: '/assets/event1.jpeg',
    date: 'SAT 30 JUNE 6:00 PM',
    type: 'online',
    price:'₹ 1499'
  },
  {
    title: 'Philodendron',
    host: 'YUVADHARA',
    image: '/assets/event1.jpeg',
    date: 'SAT 30 JUNE 6:00 PM',
    type: 'online',
    price:'₹ 1499'
  },
  {
    title: 'Philodendron',
    host: 'YUVADHARA',
    image: '/assets/event1.jpeg',
    date: 'SAT 30 JUNE 6:00 PM',
    type: 'online',
    price:'₹ 1499'
  },
  {
    title: 'JOB KURIAN LIVE IN CONCERT',
    host: 'YUVADHARA',
    image: '/assets/event1.jpeg',
    date: 'SAT 30 JUNE 6:00 PM',
    type: 'offline',
    price:'₹ 1499'
  },
  {
    title: 'JOB KURIAN LIVE IN CONCERT',
    host: 'YUVADHARA',
    image: '/assets/event1.jpeg',
    date: 'SAT 30 JUNE 6:00 PM',
    type: 'offline',
    price:'₹ 1499'
  },
  {
    title: 'JOB KURIAN LIVE IN CONCERT',
    host: 'YUVADHARA',
    image: '/assets/event1.jpeg',
    date: 'SAT 30 JUNE 6:00 PM',
    type: 'offline',
    price:'₹ 1499'
  },
  
 

];

const EventSlider: React.FC = () => {
  const onlineEvents = events.filter(event => event.type === 'online');
  const offlineEvents = events.filter(event => event.type === 'offline');

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Online Events</h2>
      <div className="flex overflow-x-scroll space-x-4">
        {onlineEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-8">Offline Events</h2>
      <div className="flex overflow-x-scroll space-x-4">
        {offlineEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventSlider;
