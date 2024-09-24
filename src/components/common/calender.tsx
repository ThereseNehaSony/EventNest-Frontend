import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { baseUrl } from '../../config/constants';
import { useSelector } from 'react-redux';


const localizer = momentLocalizer(moment);

// Extend the BigCalendarEvent type for more customization
interface CalendarEvent extends BigCalendarEvent {
  _id: string;
  description: string;
  location: string;
}

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

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Use the appropriate type for your Redux state
  const { username } = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/event/get-upcoming-events/neha1`);

        // Filter and map the events to match the format expected by react-big-calendar
        const calendarEvents: CalendarEvent[] = response.data
          .filter((event: Event) => new Date(event.eventId.startDate) >= new Date()) // Filter events based on start date (upcoming)
          .map((event: Event) => ({
            _id: event.eventId._id,
            title: event.eventId.title,
            start: new Date(event.eventId.startDate),
            end: new Date(event.eventId.startDate),
            description: event.eventId.description,
            location: `${event.eventId.location.address1}, ${event.eventId.location.city}, ${event.eventId.location.state}`,
          }));

        setEvents(calendarEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [username]);

  
  return (
    <div className="calendar-container">
      <h1 className="text-2xl font-bold text-center mb-5">My Event Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 600, padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '10px' }} // Apply basic inline styling for now
        tooltipAccessor="description"
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: '#4a90e2', // Customize the event color
            color: '#fff', // Change text color for better contrast
            borderRadius: '5px',
            padding: '5px',
          },
        })}
      />
    </div>
  );
};

export default CalendarPage;
