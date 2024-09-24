import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../config/constants';
import Sidebar from '../../components/sidebar/userSidebar'; 

const TicketDetail: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [ticketData, setTicketData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false); 
  const [isCanceling, setIsCanceling] = useState(false); 
  const [cancelStatus, setCancelStatus] = useState({
    canCancel: false,
    cancelMessage: '',
  });
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
    const fetchTicketDetails = async () => {
      try {
        // Fetching ticket details
        const response = await axios.get(`${baseUrl}/event/booking/${bookingId}`);
        const eventData = response.data.data;
      
        setTicketData(eventData);

        // Checking cancellation eligibility (as per your function)
        checkCancellationEligibility(eventData.eventDate, eventData.status);

        // Fetch address based on latitude and longitude
        if (eventData.location) {
         
          const { lat, lng } = eventData.location;
        
          fetchAddress(lat, lng);
        }
      } catch (error) {
        console.error('Error fetching ticket details:', error);
      }
    };

    fetchTicketDetails();
  }, [bookingId]);

  const checkCancellationEligibility = (eventDate: string, ticketStatus: string) => {
    const eventDateTime = new Date(eventDate); 
    const currentTime = new Date();
    const timeDifference = eventDateTime.getTime() - currentTime.getTime();

  
    const hoursDifference = timeDifference / (1000 * 60 * 60);

  
    if (ticketStatus === 'cancelled') {
      setCancelStatus({
        canCancel: false,
        cancelMessage: 'This ticket has already been cancelled.',
      });
    } else if (ticketStatus === 'confirmed' && hoursDifference >= 24) {
      setCancelStatus({
        canCancel: true,
        cancelMessage: '',
      });
    } else if (ticketStatus === 'confirmed' && hoursDifference < 24) {
      setCancelStatus({
        canCancel: false,
        cancelMessage: 'You can no longer cancel this ticket as the event is less than 24 hours away.',
      });
    }
  };

  const handleCancelTicket = async () => {
    setIsCanceling(true);
    try {
      await axios.post(`${baseUrl}/event/cancel/${bookingId}`);
      setShowModal(false);

      
      setTicketData((prevState: any) => ({
        ...prevState,
        ticketType: 'cancelled',
      }));

      setCancelStatus({
        canCancel: false,
        cancelMessage: 'This ticket has been successfully cancelled.',
      });
    } catch (error) {
      console.error('Error canceling ticket:', error);
    } finally {
      setIsCanceling(false);
    }
  };

  if (!ticketData) return <div>Loading...</div>;

  const {
    eventImage,
    eventName,
    eventDate,
    eventTime,
    location,
    ticketType,
    amountPaid,
    quantity,
    cancellationPolicy,
    status,
    qrCodeValue,
    type,
  } = ticketData;

  const parsedEventDate = new Date(eventDate);
  const formattedEventDate = parsedEventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedEventTime = parsedEventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return (
    <div className="flex">
      <Sidebar /> 
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex">
            <img
              src={eventImage}
              alt={eventName}
              className="w-1/3 object-cover"
            />
            <div className="flex-1 p-4">
              <h2 className="text-2xl font-bold mt-2">{eventName.toUpperCase()}</h2>
              <p className="text-gray-700">
              <strong>Location:</strong> {type === 'offline' ? address : 'Online'}
              </p>
              <p className="text-gray-700 mt-2">
              <strong>Date:</strong> {formattedEventDate} | <strong>Time:</strong> {formattedEventTime}
              </p>
              <p className="text-gray-700 mt-2">
              <strong>Ticket Status:</strong> <span className={status === 'cancelled' ? 'text-red-500' : 'text-green-500'}>{status}</span>
              </p>
            </div>
            {type === 'offline' && (
              <div className="flex flex-col justify-center items-end p-4">
                <p className="text-lg font-semibold">Quantity</p>
                <p className="text-2xl font-bold text-green-600">{ticketType.toUpperCase()} : {quantity} X {amountPaid}</p>
              </div>
            )}
          
          </div>

         
          {type === 'online' && status !=="cancelled" && (
            <div className="bg-blue-100 p-4">
              <p className="text-gray-700 font-semibold">This is an online event.</p>
              <p className="text-gray-600">The event link will be available 10 minutes before the start time.</p>
              <p className="text-gray-600">You can access the event link from your profile or email confirmation.</p>
            </div>
          )}

       
          {type === 'offline' && status !=="cancelled" && (
            <div className="bg-gray-100 p-4">
              <p className="text-gray-700 font-semibold">This is an offline event.</p>
              <p className="text-gray-600">Please bring your ticket to the venue for entry.</p>
            </div>
          )}

          <div className="flex justify-center p-4">
            {/* <QRCode value={qrCodeValue} size={128} /> */}
          </div>
          <div className="bg-gray-100 p-4">
            <p className="text-gray-700">{cancellationPolicy}</p>
            {cancelStatus.canCancel ? (
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => setShowModal(true)} 
              >
                Cancel Ticket
              </button>
            ) : (
              <p className="mt-4 text-red-600">{cancelStatus.cancelMessage}</p>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Ticket Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Cancel Ticket</h2>
            <p className="mb-6">Are you sure you want to cancel this ticket? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)} 
              >
                No, Keep Ticket
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleCancelTicket}
                disabled={isCanceling}
              >
                {isCanceling ? 'Canceling...' : 'Yes, Cancel Ticket'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default TicketDetail;
