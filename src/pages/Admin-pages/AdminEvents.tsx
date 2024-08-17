// import React, { useState } from 'react';
// import Sidebar from '../../components/sidebar/sidebar';
// import { BsCalendar, BsCurrencyRupee } from 'react-icons/bs';

// // Mock data for events
// const mockEvents = {
//   approvalPending: [
//     { id: 1, title: 'Event 1', date: '2024-08-20', host: 'Host A', price: '$10', image: '/path/to/image1.jpg' },
//     { id: 2, title: 'Event 2', date: '2024-08-21', host: 'Host B', price: '$15', image: '/path/to/image2.jpg' },
//     { id: 3, title: 'Event 3', date: '2024-08-22', host: 'Host C', price: '$20', image: '/path/to/image3.jpg' },
//     { id: 4, title: 'Event 4', date: '2024-08-23', host: 'Host D', price: '$25', image: '/path/to/image4.jpg' },
//     { id: 5, title: 'Event 5', date: '2024-08-24', host: 'Host E', price: '$30', image: '/path/to/image5.jpg' },
//     { id: 6, title: 'Event 6', date: '2024-08-25', host: 'Host F', price: '$35', image: '/path/to/image6.jpg' },
//     { id: 7, title: 'Event 7', date: '2024-08-26', host: 'Host G', price: '$40', image: '/path/to/image7.jpg' },
//     { id: 8, title: 'Event 8', date: '2024-08-27', host: 'Host H', price: '$45', image: '/path/to/image8.jpg' },
//     { id: 9, title: 'Event 9', date: '2024-08-28', host: 'Host I', price: '$50', image: '/path/to/image9.jpg' },
//     { id: 10, title: 'Event 10', date: '2024-08-29', host: 'Host J', price: '$55', image: '/path/to/image10.jpg' },
//     { id: 11, title: 'Event 11', date: '2024-08-30', host: 'Host K', price: '$60', image: '/path/to/image11.jpg' },
//     { id: 12, title: 'Event 12', date: '2024-08-31', host: 'Host L', price: '$65', image: '/path/to/image12.jpg' },
//   ],
//   upcoming: [
//     { id: 3, title: 'Event 3', date: '2024-08-25', host: 'Host C', price: '$20', image: '/path/to/image3.jpg' },
//     { id: 4, title: 'Event 4', date: '2024-08-26', host: 'Host D', price: '$25', image: '/path/to/image4.jpg' },
//   ],
//   past: [
//     { id: 5, title: 'Event 5', date: '2024-07-15', host: 'Host E', price: '$30', image: '/path/to/image5.jpg' },
//     { id: 6, title: 'Event 6', date: '2024-07-16', host: 'Host F', price: '$35', image: '/path/to/image6.jpg' },
//   ],
//   rejected: [
//     { id: 7, title: 'Event 7', date: '2024-08-01', host: 'Host G', price: '$40', image: '/path/to/image7.jpg' },
//     { id: 8, title: 'Event 8', date: '2024-08-02', host: 'Host H', price: '$45', image: '/path/to/image8.jpg' },
//   ],
// };

// const EventCard: React.FC<{ event: { title: string; date: string; host: string; price: string; image: string } }> = ({ event }) => (
//   <div className="min-w-[300px] max-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
//     <div
//       className="h-48 bg-cover bg-center"
//       style={{ backgroundImage: `url(${event.image})` }}
//     ></div>
//     <div className="p-4">
//       <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
//       <p className="text-sm text-gray-600">Hosted By: {event.host}</p>
//       <div className="flex items-center text-sm text-gray-600 mb-2">
//         <BsCalendar className="text-xl me-1" />
//         {event.date}
//       </div>
//       <div className="flex items-center text-sm text-gray-600 mb-2">
//         <BsCurrencyRupee className="text-xl me-1" />
//         From {event.price}
//       </div>
//     </div>
//   </div>
// );

// const AdminEventsPage: React.FC = () => {
//   const [visibleEvents, setVisibleEvents] = useState<number>(4); // Number of events to show initially

//   const handleShowMore = () => {
//     setVisibleEvents(prevVisibleEvents => prevVisibleEvents + 4); // Load more events
//   };

//   const renderEvents = (events: { id: number; title: string; date: string; host: string; price: string; image: string }[]) => {
//     return events.slice(0, visibleEvents).map(event => (
//       <EventCard key={event.id} event={event} />
//     ));
//   };

//   return (
//     <div className="flex">
//       <Sidebar />

//       <main className="flex-1 p-6 bg-gray-100 ml-64">
//         <h1 className="text-2xl font-semibold mb-6">Manage Events</h1>

//         <section className="mb-12">
//           <h2 className="text-xl font-semibold mb-4">Approval Pending Events</h2>
//           <div className="flex flex-wrap gap-4">
//             {renderEvents(mockEvents.approvalPending)}
//           </div>
//           {visibleEvents < mockEvents.approvalPending.length && (
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={handleShowMore}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//               >
//                 Show More
//               </button>
//             </div>
//           )}
//         </section>

//         {/* Repeat similar sections for other categories */}
        
//         <section className="mb-12">
//           <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
//           <div className="flex flex-wrap gap-4">
//             {renderEvents(mockEvents.upcoming)}
//           </div>
//           {visibleEvents < mockEvents.upcoming.length && (
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={handleShowMore}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//               >
//                 Show More
//               </button>
//             </div>
//           )}
//         </section>

//         <section className="mb-12">
//           <h2 className="text-xl font-semibold mb-4">Past Events</h2>
//           <div className="flex flex-wrap gap-4">
//             {renderEvents(mockEvents.past)}
//           </div>
//           {visibleEvents < mockEvents.past.length && (
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={handleShowMore}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//               >
//                 Show More
//               </button>
//             </div>
//           )}
//         </section>

//         <section>
//           <h2 className="text-xl font-semibold mb-4">Rejected Events</h2>
//           <div className="flex flex-wrap gap-4">
//             {renderEvents(mockEvents.rejected)}
//           </div>
//           {visibleEvents < mockEvents.rejected.length && (
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={handleShowMore}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//               >
//                 Show More
//               </button>
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminEventsPage;

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { BsCalendar, BsCurrencyRupee } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllEvents } from '../../redux/actions/adminActions';
import { AppDispatch } from '../../redux/store';
import { EventData } from '../../redux/reducers/admin/adminSlice';

interface EventCardProps {
  event: EventData;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate(); // Get the navigate function

  const handleClick = () => {
    // Navigate to the event details page
    navigate(`/event/${event._id}`);
  };

  return (
    <div className="min-w-[300px] max-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden"
    onClick={handleClick}>
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.images || 'default-image-url'})` }}
      ></div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
        <p className="text-sm text-gray-600">Hosted By: {event.host}</p>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <BsCalendar className="text-xl me-1" />
          {event.startDate}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <BsCurrencyRupee className="text-xl me-1" />
          {event.entryType === 'Free' ? 'Free' : `From ${event.entryFee}`}
        </div>
      </div>
    </div>
  );
};

const AdminEventsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: { admin: { events: EventData[] } }) => state.admin.events);
  console.log("Events from state:", events);

  const [visibleEvents, setVisibleEvents] = useState<number>(4);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const categorizeEvents = (events: EventData[]) => {
    const now = new Date(); // Get the current date
  
    return {
      approvalPending: events.filter(event => event.status === 'pending'),
      upcoming: events.filter(event => {
        const eventDate = new Date(event.startDate); // Convert event date to Date object
        return event.status === 'approved' && eventDate >= now; // Event is upcoming if the date is in the future
      }),
      past: events.filter(event => {
        const eventDate = new Date(event.startDate); // Convert event date to Date object
        return  eventDate < now; // Event is past if the date is in the past
      }),
      rejected: events.filter(event => event.status === 'rejected'),
    };
  };

  const { approvalPending, upcoming, past, rejected } = categorizeEvents(events);

  const handleShowMore = () => {
    console.log("Showing more events");
    setVisibleEvents(prevVisibleEvents => prevVisibleEvents + 4);
  };

  const renderEvents = (events: EventData[]) => {
    console.log("Rendering events:", events);
    if (!events || events.length === 0) {
      return <p>No events available.</p>;
    }
    return events.slice(0, visibleEvents).map(event => (
      <EventCard key={event._id} event={event} />
    ));
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-100 ml-64">
        <h1 className="text-2xl font-semibold mb-6">Manage Events</h1>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Approval Pending Events</h2>
          <div className="flex flex-wrap gap-4">
            {renderEvents(approvalPending)}
          </div>
          {visibleEvents < approvalPending.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleShowMore}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Show More
              </button>
            </div>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="flex flex-wrap gap-4">
            {renderEvents(upcoming)}
          </div>
          {visibleEvents < upcoming.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleShowMore}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Show More
              </button>
            </div>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Past Events</h2>
          <div className="flex flex-wrap gap-4">
            {renderEvents(past)}
          </div>
          {visibleEvents < past.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleShowMore}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Show More
              </button>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Rejected Events</h2>
          <div className="flex flex-wrap gap-4">
            {renderEvents(rejected)}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminEventsPage;
