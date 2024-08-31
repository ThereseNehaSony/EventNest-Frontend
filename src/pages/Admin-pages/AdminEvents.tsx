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
  const navigate = useNavigate(); 
  const handleClick = () => {
    
    navigate(`/admin/event/${event._id}`);
  };

  return (
    <div className="min-w-[300px] max-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden"
    onClick={handleClick}>
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.image || 'default-image-url'})` }}
      ></div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <p className="text-sm text-gray-600">Hosted By: {event.host}</p>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <BsCalendar className="text-xl me-1" />
          {event.startDate}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <BsCurrencyRupee className="text-xl me-1" />
          {/* {event.entryType === 'Free' ? 'Free' : `From ${event.entryFee}`} */}
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
    const now = new Date(); 
  
    return {
      approvalPending: events.filter(event => event.status === 'pending'),
      upcoming: events.filter(event => {
        const eventDate = new Date(event.startDate);
        return event.status === 'approved' && eventDate >= now; 
      }),
      past: events.filter(event => {
        const eventDate = new Date(event.startDate); 
        return  eventDate < now; 
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
