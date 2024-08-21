// import React from 'react';
// const image = '/bg-1.jpg'

// const EventDetailPage: React.FC = () => {
//   // Sample data for demonstration
//   const event = {
//     image: image, // Replace with actual image URL
//     title: 'Event Title',
//     description: `This is a detailed description of the event.`
                   
//                    ,
                    
//     host: 'John Doe',
//     startTime: 'August 20, 2024, 10:00 AM',
//     endTime: 'August 20, 2024, 4:00 PM',
//     location: '123 Event Venue, City, Country',
//   };

//   return (
//     <div className="container mx-auto">
//       {/* Event Image */}
//       <div className="w-full">
//         <img src={event.image} alt="Event" className="w-full h-64 object-cover" />
//       </div>

//       {/* Event Title and Book Button */}
//       <div className="flex justify-between items-center mt-6">
//         <h1 className="text-3xl font-semibold text-gray-800">{event.title}</h1>
//         <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
//           Book Now
//         </button>
//       </div>

//       {/* Event Description and Host Info */}
//       <div className="flex mt-6">
//         {/* Description */}
//         <div className="w-2/3">
//           <p className="text-gray-700 mb-6">{event.description}</p>
//         </div>

//         {/* Host Info, Timing, and Location */}
//         <div className="w-1/3 ml-6 space-y-6">
//           {/* Host Name */}
//           <div className="bg-gray-100 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-800">Hosted by</h3>
//             <p className="text-gray-700">{event.host}</p>
//           </div>

//           {/* Timing */}
//           <div className="bg-gray-100 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-800">Timing</h3>
//             <p className="text-gray-700">{event.startTime} - {event.endTime}</p>
//           </div>

//           {/* Location */}
//           <div className="bg-gray-100 p-4 rounded-lg">
//             <h3 className="text-lg font-semibold text-gray-800">Location</h3>
//             <p className="text-gray-700">{event.location}</p>
//           </div>
//         </div>
//       </div>

//       {/* More Events from This Host */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">More Events from This Organiser</h2>
//         <div className="grid grid-cols-3 gap-4">
//           {/* Event Cards (Repeat for more events) */}
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img src="https://via.placeholder.com/300x200" alt="Event" className="w-full h-40 object-cover" />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800">Event Title</h3>
//               <p className="text-gray-600">Event Date</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* You May Also Like */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">You May Also Like</h2>
//         <div className="grid grid-cols-3 gap-4">
//           {/* Event Cards (Repeat for more events) */}
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img src="https://via.placeholder.com/300x200" alt="Event" className="w-full h-40 object-cover" />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800">Event Title</h3>
//               <p className="text-gray-600">Event Date</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetailPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../config/constants';

interface Event {
  image: string;
  title: string;
  description: string;
  host: string;
  startDate: string;
  endDate: string;
 // location: string;
}

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get<Event>(`${baseUrl}/event/${eventId}`); 
        setEvent(response.data);
      } catch (err) {
        setError('Failed to fetch event data');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!event) {
    return <div>No event data available.</div>;
  }

  return (
    <div className="container mx-auto">
      {/* Event Image */}
      <div className="w-full">
        <img src={event.image} alt="Event" className="w-full h-auto object-contain" />
      </div>

      {/* Event Title and Book Button */}
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-3xl font-semibold text-gray-800">{event.title}</h1>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Book Now
        </button>
      </div>

      {/* Event Description and Host Info */}
      <div className="flex mt-6">
        {/* Description */}
        <div className="w-2/3">
          <p className="text-gray-700 mb-6">{event.description}</p>
        </div>

        {/* Host Info, Timing, and Location */}
        <div className="w-1/3 ml-6 space-y-6">
          {/* Host Name */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Hosted by</h3>
            <p className="text-gray-700">{event.host}</p>
          </div>

          {/* Timing */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Timing</h3>
            <p className="text-gray-700">{new Date(event.startDate).toLocaleString()} - {new Date(event.endDate).toLocaleString()}</p>
          </div>

          {/* Location */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Location</h3>
            {/* <p className="text-gray-700">{event.location}</p> */}
          </div>
        </div>
      </div>

      {/* More Events from This Host */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">More Events from This Organiser</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Event Cards (Repeat for more events) */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/300x200" alt="Event" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Event Title</h3>
              <p className="text-gray-600">Event Date</p>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">You May Also Like</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Event Cards (Repeat for more events) */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/300x200" alt="Event" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Event Title</h3>
              <p className="text-gray-600">Event Date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
