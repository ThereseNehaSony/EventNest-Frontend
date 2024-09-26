import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import EventSidebar from '../sidebar/eventSidebar'; 
import { baseUrl } from '../../config/constants'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

interface TicketType {
  type: string;
  seats: number;
  price: number;
}
interface Location {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
  googleMapsLocation?: string;
}

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventName, setEventName] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [status,setStatus] = useState<string | null>(null )
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
    const fetchEventDetails = async () => {
      try {
        if (!eventId) {
          throw new Error('Event ID is missing');
        }
        const response = await axios.get(`${baseUrl}/event/${eventId}`);
        const data = response.data;
        setEventName(data.event.title);
        setEventType(data.event.type);
        setDescription(data.event.description);
        setImage(data.event.image);
        setLocation(data.event.location);
        setTicketTypes(data.event.ticketDetails);
        setStartDate(new Date(data.event.startDate));
        setEndDate(new Date(data.event.endDate));
        setIsApproved(data.event.isApproved);
        setIsPublished(data.event.isPublished);
        setStatus(data.event.status)

        if (data.event.location && data.event.location.lat && data.event.location.lng) {
          fetchAddress(data.event.location.lat, data.event.location.lng);
        }

        console.log(data,"dataa....")
      } catch (error) {
        setError('Error fetching event details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);


  const handleSaveChanges = async () => {
    try {
      await axios.put(`${baseUrl}/event/${eventId}`, {
        title: eventName,
        type: eventType,
        description,
        image,
        location,
        ticketDetails: ticketTypes,
        startDate,
        endDate,
        isApproved,
        isPublished,
        status
      });
      toast.success('Event details updated successfully!');
     // setIsEditMode(false);
    } catch (error) {
      toast.error('Error updating event details.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };

  const handleTicketModal = () => {
    setIsTicketModalOpen(!isTicketModalOpen);
  };

  const handleEdit = async () => {
    if (!isPublished) {
      try {
        await axios.patch(`${baseUrl}/event/${eventId}`, {
          title: eventName,
          description,
          startDate,
          endDate,
          location,
          // ticketType,
          image,
        });
        toast.success('Event updated successfully');
      } catch (error) {
        toast.error('Failed to update event');
      }
    }
  };

  const handleDelete = () => {
    console.log('Delete event');
  };

  const handlePublish = async () => {
    setIsConfirmationModalOpen(true); 
  };

  const confirmPublish = async () => {
    try {
      await axios.patch(`${baseUrl}/event/${eventId}/publish`);
      setIsPublished(true);
      toast.success('Event published successfully');
    } catch (error) {
      toast.error('Failed to publish event');
    } finally {
      setIsConfirmationModalOpen(false); 
    }
  };

  const cancelPublish = () => {
    setIsConfirmationModalOpen(false); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      {eventId && <EventSidebar eventId={eventId} />}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Event Details</h2>

          <div className="mb-6">
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input
              id="eventName"
              type="text"
              value={eventName.toUpperCase()}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the event name"
              readOnly={isPublished || status !== 'pending'}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the event"
              rows={4}
              readOnly={isPublished || status !== 'pending'}
            />
          </div>

          {eventType === 'offline' && location && (
            <div className="mb-6 bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-sm">

              <div className="space-y-2">
               
                
                 {address && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Address:</h3>
                  <p className="mt-4 text-gray-700"> {address}</p>
                </div>
              )}
              </div>
            </div>
          )}

          {/* <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Event Starts</label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="Select start date and time"
                readOnly={isPublished || status !== 'pending'}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">Event Ends</label>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="Select end date and time"
                readOnly={isPublished || status !== 'pending'}
              />
            </div>
          </div> */}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Types</label>
            {ticketTypes?.length > 0 ? (
              ticketTypes.map((ticket, index) => (
                <div key={index} className="flex items-center justify-between mb-3 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    {ticket.type.toUpperCase()} - {ticket.seats} seats @ ₹{ticket.price}
                  </p>
                  {/* {status === 'pending' && !isPublished && (
                    <button
                      onClick={() => handleTicketModal()}
                      className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Edit Ticket Type
                    </button>
                  // )} */}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No ticket types available.</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
            {image ? (
              <img
                src={image}
                alt="Event"
                className="w-full h-64 object-cover rounded-lg shadow-sm"
              />
            ) : (
              <p className="text-gray-700">No image uploaded</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-4 block w-full text-gray-700 border border-gray-300 rounded-lg py-2 px-3"
              disabled={isPublished || status !== 'pending'}
            />
          </div>

          <div className="flex justify-between items-center">
            {!isPublished && status === 'pending' && (
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Edit Event
              </button>
            )}
            {!isPublished && status === 'approved' && (
              <button
                onClick={handlePublish}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Publish Event
              </button>
            )}
            {isPublished && (
              <span className="bg-gray-500 text-white px-6 py-3 rounded-lg">
                Event Published
              </span>
            )}
          </div>
        </div>
      </main>

      {isConfirmationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Are you sure you want to publish this event?</h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={confirmPublish}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Yes, Publish
              </button>
              <button
                onClick={cancelPublish}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default EventDetailsPage;
