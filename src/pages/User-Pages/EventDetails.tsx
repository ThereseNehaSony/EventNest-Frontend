// // import React from 'react';
// // const image = '/bg-1.jpg'

// // const EventDetailPage: React.FC = () => {
// //   // Sample data for demonstration
// //   const event = {
// //     image: image, // Replace with actual image URL
// //     title: 'Event Title',
// //     description: `This is a detailed description of the event.`
                   
// //                    ,
                    
// //     host: 'John Doe',
// //     startTime: 'August 20, 2024, 10:00 AM',
// //     endTime: 'August 20, 2024, 4:00 PM',
// //     location: '123 Event Venue, City, Country',
// //   };

// //   return (
// //     <div className="container mx-auto">
// //       {/* Event Image */}
// //       <div className="w-full">
// //         <img src={event.image} alt="Event" className="w-full h-64 object-cover" />
// //       </div>

// //       {/* Event Title and Book Button */}
// //       <div className="flex justify-between items-center mt-6">
// //         <h1 className="text-3xl font-semibold text-gray-800">{event.title}</h1>
// //         <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
// //           Book Now
// //         </button>
// //       </div>

// //       {/* Event Description and Host Info */}
// //       <div className="flex mt-6">
// //         {/* Description */}
// //         <div className="w-2/3">
// //           <p className="text-gray-700 mb-6">{event.description}</p>
// //         </div>

// //         {/* Host Info, Timing, and Location */}
// //         <div className="w-1/3 ml-6 space-y-6">
// //           {/* Host Name */}
// //           <div className="bg-gray-100 p-4 rounded-lg">
// //             <h3 className="text-lg font-semibold text-gray-800">Hosted by</h3>
// //             <p className="text-gray-700">{event.host}</p>
// //           </div>

// //           {/* Timing */}
// //           <div className="bg-gray-100 p-4 rounded-lg">
// //             <h3 className="text-lg font-semibold text-gray-800">Timing</h3>
// //             <p className="text-gray-700">{event.startTime} - {event.endTime}</p>
// //           </div>

// //           {/* Location */}
// //           <div className="bg-gray-100 p-4 rounded-lg">
// //             <h3 className="text-lg font-semibold text-gray-800">Location</h3>
// //             <p className="text-gray-700">{event.location}</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* More Events from This Host */}
// //       <div className="mt-12">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-4">More Events from This Organiser</h2>
// //         <div className="grid grid-cols-3 gap-4">
// //           {/* Event Cards (Repeat for more events) */}
// //           <div className="bg-white rounded-lg shadow-md overflow-hidden">
// //             <img src="https://via.placeholder.com/300x200" alt="Event" className="w-full h-40 object-cover" />
// //             <div className="p-4">
// //               <h3 className="text-lg font-semibold text-gray-800">Event Title</h3>
// //               <p className="text-gray-600">Event Date</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* You May Also Like */}
// //       <div className="mt-12">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-4">You May Also Like</h2>
// //         <div className="grid grid-cols-3 gap-4">
// //           {/* Event Cards (Repeat for more events) */}
// //           <div className="bg-white rounded-lg shadow-md overflow-hidden">
// //             <img src="https://via.placeholder.com/300x200" alt="Event" className="w-full h-40 object-cover" />
// //             <div className="p-4">
// //               <h3 className="text-lg font-semibold text-gray-800">Event Title</h3>
// //               <p className="text-gray-600">Event Date</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EventDetailPage;

// import React, { useState, useEffect } from 'react';
// import { useParams,useNavigate } from 'react-router-dom';
// import { useDispatch  } from 'react-redux';
// import axios from 'axios';
// import { baseUrl } from '../../config/constants';
// import { fetchEventsByHost } from '../../redux/actions/hostActions';
// import { AppDispatch } from '../../redux/store';
// import EventCard from '../../components/events/eventCard';
// import { ClipLoader } from 'react-spinners';

// interface Location {
//   address1: string;
//   address2: string;
//   city: string;
//   state: string;
//   pincode: string;
//   googleMapLink: string;
// }
// interface Event {
//   _id:string;
//   image: string;
//   title: string;
//   description: string;
//   host: string;
//   startDate: string;
//   endDate: string;
//   location: Location;
//   type:string
// }

// const EventDetailPage: React.FC = () => {
//   const { eventId } = useParams<{ eventId: string }>();
//   const [event, setEvent] = useState<Event | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
//   const dispatch = useDispatch<AppDispatch>();
//   const host = event?.host
//   const navigate = useNavigate()


//   const handleBookNowClick = () => {
//     navigate('/seat-selection'); 
//   };

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await axios.get<Event>(`${baseUrl}/event/${eventId}`); 
//         setEvent(response.data);
//       } catch (err) {
//         setError('Failed to fetch event data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, []);


//   useEffect(() => {
//     const fetchRelatedEvents = async () => {
//       try {
//         if (host) {
          
//           const response = await dispatch(fetchEventsByHost(host));
          
//           const data = response.payload; 
//           setRelatedEvents(data);
//         }
//       } catch (err) {
//         setError('Error fetching related events.');
//       }
//     };

//     fetchRelatedEvents();
//   }, [dispatch, host]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="flex flex-col items-center">
//           <ClipLoader size={50} color="#3490dc" />
//           <p className="mt-4 text-lg text-gray-600">Loading, please wait...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   if (!event) {
//     return <div>No event data available.</div>;
//   }

//   return (
//     <div className="container mx-auto">
//       {/* Event Image */}
//       <div className="w-full">
//         <img src={event.image} alt="Event" className="w-full h-64 object-contain" />
//       </div>

//       {/* Event Title and Book Button */}
//       <div className="flex justify-between items-center mt-6">
//         <h1 className="text-3xl font-semibold text-gray-800">{event.title}</h1>
//         <button onClick={handleBookNowClick} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
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
//             <p className="text-gray-700">{new Date(event.startDate).toLocaleString()} - {new Date(event.endDate).toLocaleString()}</p>
//           </div>

//           {/* Location */}
//           {event.type === 'offline' && (
//         <div className="bg-gray-100 p-4 rounded-lg mt-4">
//           <h3 className="text-lg font-semibold text-gray-800">Location</h3>
//           <p>{event.location?.address1}</p>
//           <p>{event.location?.address2}</p>
//           <p>{event.location?.city}, {event.location?.state} - {event.location?.pincode}</p>
//         </div>
//       )}
//     </div>
//     </div>
//       {/* More Events  */}
//       {/* <div className="mt-12">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">More Events from This Organiser</h2>
//           <div className="grid grid-cols-3 gap-4">
//             {relatedEvents.map((event) => (
//               <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <img
//                   src={event.image || 'https://via.placeholder.com/300x200'}
//                   alt="Event"
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
//                   <p className="text-gray-600">{new Date(event.startDate).toLocaleDateString()}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//         </div> */}

//            <div className="mt-12">
//        <h2 className="text-2xl font-semibold text-gray-800 mb-4">More Events from This Organiser</h2>
//       <div className="grid grid-cols-3 gap-4">
//         {relatedEvents.map((event) => (
//           <EventCard key={event._id} event={event} />
//         ))}
//       </div>
//         </div>

//       {/* You May Also Like */}
//       {/* <div className="mt-12">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">You May Also Like</h2>
//         <div className="grid grid-cols-3 gap-4">
          
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img src="https://via.placeholder.com/300x200" alt="Event" className="w-full h-40 object-cover" />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800">Event Title</h3>
//               <p className="text-gray-600">Event Date</p>
//             </div>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default EventDetailPage;


import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  AppDispatch } from '../../redux/store';
import { fetchEventById, fetchRelatedEventsByHost, clearEvent } from '../../redux/reducers/event/eventSlice';
import EventCard from '../../components/events/eventCard';
import { ClipLoader } from 'react-spinners';

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { event, relatedEvents, loading, error } = useSelector((state: any) => state.event);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventById(eventId));
    }

    // return () => {
    //   dispatch(clearEvent());
    // };
  }, [dispatch, eventId]);

  // useEffect(() => {
  //   if (event?.host) {
  //     dispatch(fetchRelatedEventsByHost(event.host));
  //   }
  // }, [dispatch, event?.host]);

  const handleBookNowClick = () => {
    navigate(`/seat-selection/${eventId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <ClipLoader size={50} color="#3490dc" />
          <p className="mt-4 text-lg text-gray-600">Loading, please wait...</p>
        </div>
      </div>
    );
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
        <img src={event.image} alt="Event" className="w-full h-64 object-contain" />
      </div>

      {/* Event Title and Book Button */}
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-3xl font-semibold text-gray-800">{event.title}</h1>
        <button onClick={handleBookNowClick} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Book Now
        </button>
      </div>

      {/* Event Description and Host Info */}
      <div className="flex mt-6">
        <div className="w-2/3">
          <p className="text-gray-700 mb-6">{event.description}</p>
        </div>

        <div className="w-1/3 ml-6 space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Hosted by</h3>
            <p className="text-gray-700">{event.host}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Timing</h3>
            <p className="text-gray-700">{new Date(event.startDate).toLocaleString()} - {new Date(event.endDate).toLocaleString()}</p>
          </div>

          {event.type === 'offline' && (
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Location</h3>
              <p>{event.location?.address1}</p>
              <p>{event.location?.address2}</p>
              <p>{event.location?.city}, {event.location?.state} - {event.location?.pincode}</p>
            </div>
          )}
        </div>
      </div>

      {/* More Events */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">More Events from This Organiser</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* {relatedEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
