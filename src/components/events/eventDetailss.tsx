import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import EventSidebar from '../sidebar/eventSidebar'; 
import { baseUrl } from '../../config/constants'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventName, setEventName] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [ticketType, setTicketType] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (!eventId) {
          throw new Error('Event ID is missing');
        }
        const response = await axios.get(`${baseUrl}/event/${eventId}`);
        const data = response.data;
        setEventName(data.title);
        setEventType(data.type);
        setDescription(data.description);
        setImage(data.image);
        setLocation(data.location);
        setTicketType(data.ticketType);
        setStartDate(new Date(data.startDate));
        setEndDate(new Date(data.endDate));
        setIsApproved(data.isApproved);
        setIsPublished(data.isPublished);
      } catch (error) {
        setError('Error fetching event details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

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
          ticketType,
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
      <main className="flex-1 p-6 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Event Details</h2>

          <div className="mb-4">
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input
              id="eventName"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the event name"
              readOnly={isPublished}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the event"
              rows={4}
              readOnly={isPublished}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Event Starts</label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholderText="Select start date and time"
                readOnly={isPublished}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">Event Ends</label>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholderText="Select end date and time"
                readOnly={isPublished}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Type</label>
            <p className="text-gray-700">{ticketType}</p>
            <button
              onClick={handleTicketModal}
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              disabled={isPublished}
            >
              Edit Ticket Type
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
            {image ? (
              <img
                src={image}
                alt="Event"
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-700">No image uploaded</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-4"
              disabled={isPublished}
            />
          </div>

          <div className="flex justify-between">
            {!isPublished && (
              <>
                <button
                  onClick={handleEdit}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit Event
                </button>
                <button
                  onClick={handlePublish}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Publish Event
                </button>
              </>
            )}
            {isPublished && (
              <span className="bg-gray-500 text-white px-6 py-3 rounded-lg">
                Event Published
              </span>
            )}
            {/* Uncomment this if you want to allow deletion */}
            {/* <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete Event
            </button> */}
          </div>
        </div>
      </main>

      {isConfirmationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Are you sure you want to publish this event?</h3>
            <div className="flex justify-end">
              <button
                onClick={confirmPublish}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-4"
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
