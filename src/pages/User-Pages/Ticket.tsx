import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TicketProps {
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  status: string;
  imageUrl: string;
}

const Ticket: React.FC<TicketProps> = ({ eventName, eventDate, eventTime, location, status, imageUrl }) => {
  const navigate = useNavigate();

  const handleViewTicket = () => {
    navigate('/ticket-detail', {
      state: { eventName, eventDate, eventTime, location, imageUrl, ticketType: 'VIP', price: '$100', status },
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center mb-4">
      <img src={imageUrl} alt={eventName} className="w-20 h-20 rounded-md mr-4 object-cover" />
      <div className="flex-1">
        <h3 className="text-xl font-bold">{eventName}</h3>
        <p className="text-gray-600">{eventDate} | {eventTime}</p>
        <p className="text-gray-600">{location}</p>
        <p className={`mt-2 font-semibold ${status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
          {status}
        </p>
      </div>
      <div className="ml-4">
        <button onClick={handleViewTicket} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          View Ticket
        </button>
      </div>
    </div>
  );
};

export default Ticket;
