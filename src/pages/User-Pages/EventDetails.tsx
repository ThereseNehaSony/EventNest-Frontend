import React, { useEffect, useState } from 'react';
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
  const [address, setAddress] = useState<string | null>(null);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error('Google Maps API key is not defined in the environment variables.');
  }

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

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

    // Fetch the address if the event location is available
    if (event?.event.location) {
      fetchAddress(event.event.location.lat, event.event.location.lng);
    }
  }, [dispatch, event?.host, event?.event.location]);

  const handleBookNowClick = () => {
    navigate(`/seat-selection/${eventId}`);
  };

  // Function to check if there are any available seats
  const hasAvailableSeats = () => {
    if (!event?.event?.ticketDetails) {
      return false; // No ticket details available
    }

    console.log("Ticket Details:", event.event.ticketDetails); // Log ticket details for debugging

    return event.event.ticketDetails.some((ticket: any) => ticket.seats > 0);
  };

  const isBookNowDisabled = !hasAvailableSeats();

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
        <h1 className="text-4xl font-bold text-gray-900">{event.event.title.toUpperCase()}</h1>
        <button 
          onClick={handleBookNowClick} 
          disabled={isBookNowDisabled}  // Disable button if no available seats
          className={`bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 ${isBookNowDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Book Now
        </button>
      </div>
  
      {/* Ticket Types Section */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6 shadow-md">
        <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">🎟️ Ticket Types</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {event.event.ticketDetails.map((ticket: any, index: any) => {
            // Function to determine seat availability status
            const getSeatStatus = (seatsAvailable: number) => {
              if (seatsAvailable === 0) {
                return { status: "Sold Out", color: "text-red-600" };
              } else if (seatsAvailable < 10) {
                return { status: "Almost Full", color: "text-yellow-500" };
              } else if (seatsAvailable < 30) {
                return { status: "Filling Fast", color: "text-orange-500" };
              } else {
                return { status: "Available", color: "text-green-600" };
              }
            };

            const seatStatus = getSeatStatus(ticket.seats); // Assuming `seatsAvailable` is part of ticket data

            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-200 hover:bg-blue-50"
              >
                <h4 className="text-2xl font-semibold text-gray-800 mb-2">{ticket.type.toUpperCase()}</h4>
                <p className="text-lg font-medium text-blue-600 mb-2">Price: ₹{ticket.price}</p>
                <p className="text-gray-600 italic mb-4">{ticket.ticketDescription}</p>

                {/* Seat availability status */}
                <p className={`text-lg font-bold ${seatStatus.color}`}>{seatStatus.status}</p>
              </div>
            );
          })}
        </div>
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
            <p className="text-gray-700">
              {new Date(event.event.startDate).toLocaleString()} - {new Date(event.event.endDate).toLocaleString()}
            </p>
          </div>
  
          {event.event.type === 'offline' && event.event.location && (
            <div className="map-container">
              {address && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Address:</h3>
                  <p className="mt-4 text-gray-700"> {address}</p>
                </div>
              )}
              <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{ lat: event.event.location.lat, lng: event.event.location.lng }}
                  zoom={15}
                >
                  <Marker position={{ lat: event.event.location.lat, lng: event.event.location.lng }} />
                </GoogleMap>
              </LoadScript>
            </div>
          )}
        </div>
      </div>

      {/* Related Events Section */}
      <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">🎉 Related Events</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedEvents.map((relatedEvent: any) => (
          <EventCard key={relatedEvent._id} event={relatedEvent} />
        ))}
      </div>
    </div>
  );
};

export default EventDetailPage;
