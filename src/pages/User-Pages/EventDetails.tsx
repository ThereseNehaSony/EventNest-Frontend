
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchEventById, fetchRelatedEventsByHost, clearEvent } from '../../redux/reducers/event/eventSlice';
import EventCard from '../../components/events/eventCard';
import { ClipLoader } from 'react-spinners';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { event, relatedEvents, loading, error } = useSelector((state: any) => state.event);
  const testLat = 37.7749; // Latitude for San Francisco
  const testLng = -122.4194; 
  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventById(eventId));
    }

    return () => {
      dispatch(clearEvent());
    };
  }, [dispatch, eventId]);

  useEffect(() => {
    if (event?.host) {
      dispatch(fetchRelatedEventsByHost(event.host));
    }
  }, [dispatch, event?.host]);

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
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!event) {
    return <div className="text-center p-4">No event data available.</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Event Image */}
      <div className="w-full rounded-lg overflow-hidden shadow-lg mb-6">
        <img src={event.event.image} alt="Event" className="w-full h-80 object-cover" />
      </div>

      {/* Event Title and Book Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{event.event.title}</h1>
        <button onClick={handleBookNowClick} className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300">
          Book Now
        </button>
      </div>

      {/* Event Description and Host Info */}
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-2/3 px-4 mb-6 lg:mb-0">
          <p className="text-gray-700 text-lg">{event.event.description}</p>
        </div>

        <div className="w-full lg:w-1/3 px-4 space-y-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Organizer:</h3>
            <p className="text-gray-700">{event.event.host}</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Date and Time</h3>
            <p className="text-gray-700">{new Date(event.event.startDate).toLocaleString()} - {new Date(event.event.endDate).toLocaleString()}</p>
          </div>

          {event.event.type === 'offline' && (
              <div className="map-container">
               
              {event.location && (
                <LoadScript googleMapsApiKey="AIzaSyCsoVmBF71fkwMGprznArIEA6YuKsRxxsw">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={{ lat: event.location.lat, lng: event.location.lng }}
                    zoom={15}
                  >
                     <Marker position={{ lat: testLat, lng: testLng }} />
                  </GoogleMap>
                </LoadScript>
              )}
            </div>
          )}
        </div>
      </div>

      {/* More Events */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">More Events from This Organiser</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {relatedEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
