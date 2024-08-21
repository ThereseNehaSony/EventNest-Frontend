
import React from 'react';
import { Link } from 'react-router-dom';

interface EventSidebarProps {
  eventId: string;
}

const EventSidebar: React.FC<EventSidebarProps> = ({ eventId }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Event Management</h2>
        <ul>
          <li>
            <Link to={`/event-dashboard/${eventId}`} className="block py-2 px-4 hover:bg-gray-700">Dashboard</Link>
          </li>
          <li>
            <Link to={`/event-details/${eventId}`} className="block py-2 px-4 hover:bg-gray-700">Details</Link>
          </li>
          <li>
            <Link to={`/event/${eventId}/attendees`} className="block py-2 px-4 hover:bg-gray-700">Attendees</Link>
          </li>
          <li>
            <Link to={`/event/${eventId}/payments`} className="block py-2 px-4 hover:bg-gray-700">Payments</Link>
          </li>
          <li>
            <Link to={`/event/${eventId}/cancel`} className="block py-2 px-4 hover:bg-gray-700">Cancel Event</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default EventSidebar;

