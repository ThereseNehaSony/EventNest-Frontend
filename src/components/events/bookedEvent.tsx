import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BookedEventCardProps {
  eventName: string;
  eventDate: string;
  eventTime: string;
  // location: string;
  imageUrl: string;
  status: string;
  bookingId: string; 
  
}

const BookedEventCard: React.FC<BookedEventCardProps> = ({
  eventName,
  eventDate,
  eventTime,
  // location,
  imageUrl,
  status,
 
  bookingId, 
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/ticket-detail/${bookingId}`); 
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
      <img src={imageUrl} alt={eventName} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{eventName.toUpperCase()}</h2>
        <p className="text-gray-600 mt-2">{eventDate} • {eventTime}</p>
        {/* <p className="text-gray-600 mt-1">{location}</p> */}
        <div className="flex justify-between items-center mt-4">
          <span className={`px-2 py-1 text-sm rounded-full ${status === 'Booked' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {status.toUpperCase()}
          </span>
          <button
            onClick={handleViewDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookedEventCard;
