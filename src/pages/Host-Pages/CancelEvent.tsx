import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventSidebar from '../../components/sidebar/eventSidebar'; // Import Sidebar component
import { baseUrl } from '../../config/constants';
import { toast, Toaster } from 'react-hot-toast';

// interface EventData {
//   date: string; // Assuming date is returned as ISO string
//   title: string;
// }

const HostCancelEventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eventData, setEventData] = useState<any >(null);
  const [isMoreThanThreeDays, setIsMoreThanThreeDays] = useState<boolean>(true);

  // Fetch event data when the component mounts
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/event/${eventId}`);
        const event = response.data;
        setEventData(event);
  
        const eventDate = new Date(event.event.startDate);
        const today = new Date();
        const daysUntilEvent = (eventDate.getTime() - today.getTime()) / (1000 * 3600 * 24);

        if (daysUntilEvent < 3) {
          setIsMoreThanThreeDays(false);
        }
      } catch (err) {
        setError('Unable to fetch event details.');
      }
    };

    fetchEventData();
  }, [eventId]);

  // Function to cancel the event
  const handleCancelEvent = async () => {
    if (!cancellationReason) {
        toast.error('Please provide a reason for cancellation.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${baseUrl}/event/cancel-event/${eventId}`, { cancellationReason });
      alert('Event cancelled successfully.');
      navigate('/host-dashboard'); // Redirect after successful cancellation
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while canceling the event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Section */}
      {eventId && <EventSidebar eventId={eventId} />}

      {/* Main Content Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Cancel Event</h2>
        
        {/* Show event date and title */}
        {eventData && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Event Title: {eventData.event.title.toUpperCase()}</h3>
            <p>Event Date: {new Date(eventData.event.startDate).toLocaleDateString()}</p>
          </div>
        )}

        {/* Cancellation Rules Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Cancellation Rules:</h3>
          <ul className="list-disc ml-5">
            <li>Events can be canceled up to 3 days before the event date.</li>
            <li>Full refunds will be issued to all users who booked the event.</li>
            <li>Cancellation requests must include a reason.</li>
          </ul>
        </div>

        {/* Show warning if event is less than 3 days away */}
        {!isMoreThanThreeDays && (
          <p className="text-red-500 mb-4">
            You cannot cancel this event as it's less than 3 days away from the event date.
          </p>
        )}

        {/* Cancel Button */}
        <button 
          onClick={() => setIsModalOpen(true)} 
          className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${
            !isMoreThanThreeDays ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!isMoreThanThreeDays || loading}
        >
          Cancel This Event
        </button>

        {/* Error message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Inline Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <h3 className="text-lg font-semibold mb-4">Confirm Cancellation</h3>
              <p>Please provide a reason for cancellation:</p>
              <textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full h-24 mb-4"
                placeholder="Provide your reason here"
              />
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="mr-2 bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCancelEvent} 
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? 'Cancelling...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostCancelEventPage;
