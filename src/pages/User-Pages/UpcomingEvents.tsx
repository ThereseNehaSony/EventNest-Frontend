import React, { useState, useEffect } from 'react';
import BookedEventCard from '../../components/events/bookedEvent';
import Sidebar from '../../components/sidebar/userSidebar';
import axios from 'axios';
import { baseUrl } from '../../config/constants';


interface Event {
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  imageUrl: string;
  status: string;
}


const UpcomingEventsPage: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
 const username="neha1"
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        
        const response = await axios.get(`${baseUrl}/event/get-upcoming-events/${username}`);


        setUpcomingEvents(response.data);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      }
    };

    fetchUpcomingEvents();
  }, [username]);

 
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Include the sidebar component */}

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {upcomingEvents?.map((event, index) => (
            <BookedEventCard
              key={index}
              eventName={event.eventName}
              eventDate={event.eventDate}
              eventTime={event.eventTime}
              location={event.location}
              imageUrl={event.imageUrl}
              status={event.status}
              onViewDetails={() => console.log(`View details for ${event.eventName}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventsPage;
