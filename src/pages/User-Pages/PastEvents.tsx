import React from 'react';
import Sidebar from '../../components/sidebar/userSidebar'; // Adjust the import path to your actual Sidebar component
import Ticket from './Ticket'; // Adjust the import path to your actual Ticket component

const PastEventsPage: React.FC = () => {
  const pastEvents = [
    {
      eventName: 'Spring Art Exhibition',
      eventDate: 'April 15, 2024',
      eventTime: '5:00 PM',
      location: 'Art Gallery, LA',
      imageUrl: '/images/event2.jpg',
      status: 'Completed',
    },
    {
      eventName: 'Winter Gala',
      eventDate: 'December 20, 2023',
      eventTime: '8:00 PM',
      location: 'Ballroom, NY',
      imageUrl: '/images/event4.jpg',
      status: 'Completed',
    },
    // Add more past events
  ];

  return (
    <div className="flex h-screen">
      <Sidebar /> 

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Past Events</h1>
        <div className="space-y-4">
          {pastEvents.map((event, index) => (
            <Ticket
              key={index}
              eventName={event.eventName}
              eventDate={event.eventDate}
              eventTime={event.eventTime}
              location={event.location}
              imageUrl={event.imageUrl}
              status={event.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastEventsPage;