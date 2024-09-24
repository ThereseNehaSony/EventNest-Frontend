import React, { useState, useEffect } from 'react';
import BookedEventCard from '../../components/events/bookedEvent';
import Sidebar from '../../components/sidebar/userSidebar';
import axios from 'axios';
import { baseUrl } from '../../config/constants';
import { useSelector } from 'react-redux';
import { Calendar, momentLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

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
  ticketType: string;
}

interface CalendarEvent extends BigCalendarEvent {
  _id: string;
  description: string;
  location: string;
}

const UpcomingEventsPage: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const { username } = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/event/get-upcoming-events/${username}`);
        setUpcomingEvents(response.data);

        // Prepare data for the calendar
        const eventsForCalendar: CalendarEvent[] = response.data.map((event: Event) => ({
          _id: event._id,
          title: event.eventId.title,
          start: new Date(event.eventId.startDate),
          end: new Date(event.eventId.startDate), 
          description: event.eventId.description,
          location: `${event.eventId.location.address1}, ${event.eventId.location.city}`,
        }));

        setCalendarEvents(eventsForCalendar);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      }
    };

    fetchUpcomingEvents();
  }, [username]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

        {/* Calendar Section */}
        <div className="mb-8">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            titleAccessor="title"
            style={{ height: 500, backgroundColor: '#f4f4f4', borderRadius: '10px' }}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: '#4a90e2',
                color: '#fff',
                borderRadius: '5px',
                padding: '5px',
              },
            })}
          />
        </div>

        {/* Upcoming Events List Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <BookedEventCard
                key={event._id}
                eventName={event.eventId.title}
                eventDate={new Date(event.eventId.startDate).toLocaleDateString()}
                eventTime={new Date(event.eventId.startDate).toLocaleTimeString()}
                imageUrl={event.eventId.image}
                status={event.status}
                bookingId={event._id}
              />
            ))
          ) : (
            <div className="text-center text-gray-600 col-span-3">
              <p>No upcoming events found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventsPage;
