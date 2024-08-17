// import React from 'react';
// import {  BsCalendar, BsCurrencyRupee  } from 'react-icons/bs';

// interface Event {
//     title?: string;
//     host?: string;
//     image?: string;
//     date?: string,
//     price?:string,
// }

// interface EventCardProps {
//   event: Event;
// }

// const EventCard: React.FC<EventCardProps> = ({ event }) => {
//   return (
//     <div className="min-w-[300px] max-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
//       <div
//         className="h-48 bg-cover bg-center"
//         style={{ backgroundImage: `url(${event.image})` }}
//       ></div>
//       <div className="p-4">
//         <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
//         <p className="text-sm text-gray-600">Hosted By: {event.host}</p>
//         <br />
//         <div className="flex items-center text-sm text-gray-600 mb-2">
//           <BsCalendar className="text-xl me-1" />
//           {event.date}
//         </div>
//         <div className="flex items-center text-sm text-gray-600 mb-2">
//           <BsCurrencyRupee className="text-xl me-1" />
//           From {event.price}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;

import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { BsCalendar, BsCurrencyRupee } from 'react-icons/bs';

interface Event {
  title?: string;
  host?: string;
  image?: string;
  date?: string;
  price?: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = () => {
    // navigate(`/event/${event.title}`, { state: { event } }); // Redirect to event details page
    navigate('/event-details')
  };

  return (
    <div
      className="min-w-[300px] max-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
      onClick={handleCardClick} 
    >
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.image})` }}
      ></div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <p className="text-sm text-gray-600">Hosted By: {event.host}</p>
        <br />
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <BsCalendar className="text-xl me-1" />
          {event.date}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <BsCurrencyRupee className="text-xl me-1" />
          From {event.price}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
