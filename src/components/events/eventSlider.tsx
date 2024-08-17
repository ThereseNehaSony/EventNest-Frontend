import React, { useEffect } from 'react';
import EventCard from './eventCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../redux/actions/adminActions';
import { AppDispatch } from '../../redux/store';

interface EventData {
  title: string;
  host: string;
  image: string;
  date: string;
  price: string;
  type: 'online' | 'offline';
  isPublished: boolean;
}

const EventSlider: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: { admin: { events: EventData[] } }) => state.admin.events);

  const publishedEvents = events.filter(event => event.isPublished);


  const onlineEvents = publishedEvents.filter(event => event.type === 'online');
  const offlineEvents = publishedEvents.filter(event => event.type === 'offline');

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Online Events */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">Online Events</h2>
        {onlineEvents.length > 0 ? (
          <div className="flex overflow-x-auto space-x-6 py-4">
            {onlineEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p className="text-xl font-medium">No online events available</p>
            <p className="mt-2 text-lg">Check back later for updates!</p>
          </div>
        )}
      </div>

      {/* Offline Events */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">Offline Events</h2>
        {offlineEvents.length > 0 ? (
          <div className="flex overflow-x-auto space-x-6 py-4">
            {offlineEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p className="text-xl font-medium">No offline events available</p>
            <p className="mt-2 text-lg">Check back later for updates!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSlider;
