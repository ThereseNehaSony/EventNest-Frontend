import React, { useState, useEffect } from 'react';
import BookedEventCard from '../../components/events/bookedEvent';
import Sidebar from '../../components/sidebar/userSidebar';
import axios from 'axios';
import { baseUrl } from '../../config/constants';
import { useSelector } from 'react-redux';

interface Event {
  _id: string;
  userName: string;
  eventId: {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    image: string;
    location: {
      address1: string;
      address2: string;
      city: string;
      state: string;
      pincode: string;
    };
    description: string;
    category: string;
    type: string;
    status: string;
  };
  status: string;
  bookingDate: string;
}

const UpcomingEventsPage: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const {username} = useSelector((state:any)=>state.user.user)

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/event/get-past-events/${username}`);
        setUpcomingEvents(response.data);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      }
    };

    fetchUpcomingEvents();
  }, [username]);


  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Past Events</h1>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <BookedEventCard
                  key={event._id}
                  eventName={event.eventId.title}
                  eventDate={new Date(event.eventId.startDate).toLocaleDateString()} 
                  eventTime={new Date(event.eventId.startDate).toLocaleTimeString()} 
                  imageUrl={event.eventId.image}
                  status={event.status}
                  bookingId={event._id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>No past events found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UpcomingEventsPage;
