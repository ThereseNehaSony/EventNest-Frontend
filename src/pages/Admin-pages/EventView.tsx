import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { BsCalendar, BsCurrencyRupee } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../config/constants';

const EventView: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [action, setAction] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const openModal = (actionType: string) => {
    setAction(actionType);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAction(null);
    setRejectionReason('');
  };

  const handleConfirm = () => {
    if (action && eventId) {
      const endpoint = `${baseUrl}/event/admin/${eventId}/${action.toLowerCase()}`;
      const data = action === 'Reject' ? { rejectionReason } : {};
  
      axios.post(endpoint, data)
        .then(response => {
          console.log(`${action} event confirmed. Response:`, response.data);
          
        
          setEvent((prevEvent: any) => ({
            ...prevEvent,
            event: {
              ...prevEvent.event,
              status: action === 'Approve' ? 'approved' : 'rejected',
            },
          }));
        })
        .catch(error => {
          console.error('Error updating event status:', error);
        });
    }
    closeModal();
  };
  
  useEffect(() => {
    if (eventId) {
      axios.get(`${baseUrl}/event/${eventId}`)
        .then(response => setEvent(response.data))
        .catch(error => {
          console.error('Error fetching event details:', error);
        });
    }
  }, [eventId]);

  if (!event) return <div>Loading...</div>;
  const eventDate = new Date(event.event.startDate);
  const formattedDate = eventDate.toLocaleDateString();
  const formattedTime = eventDate.toLocaleTimeString();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 ml-64">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold text-center mb-6">{event.title}</h1>

          <div className="flex justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Category:</h3>
                    <p className="text-gray-600">{event.event.category}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Description:</h3>
                    <p className="text-gray-600">{event.event.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Host:</h3>
                    <p className="text-gray-600">{event.event.host}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold"> Type:</h3>
                    <p className="text-gray-600">{event.event.type}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Ticket Types:</h3>
                    {event.event.ticketDetails && event.event.ticketDetails.length > 0 ? (
                      <ul className="list-disc pl-5 text-gray-600">
                        {event.event.ticketDetails.map((ticket: any, index: number) => (
                          <li key={index} className="mb-2">
                            <p><strong>Type:</strong> {ticket.type}</p>
                            <p><strong>Seats Available:</strong> {ticket.numberOfSeats}</p>
                            <p><strong>Price:</strong> <BsCurrencyRupee className="inline" />{ticket.price}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No ticket types available.</p>
                    )}
                  </div>
                

                  {/* <div>
                    <h3 className="text-lg font-semibold">Image:</h3>
                    <div className="flex space-x-4">
                      <img src={event.image} alt={`Event ${event.title}`} className="w-35 h-35 object-cover rounded-lg" />
                    </div>

                  </div> */}
                </div>

                <div className="flex flex-col justify-between">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Date :</h3>
                    <div className="flex flex-col space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <BsCalendar className="text-xl mr-2" />
                        {formattedDate}
                      </div>
                      <h3 className="text-lg font-semibold text-black">Time :</h3>
                      <div className="flex items-center">
                        <BsCalendar className="text-xl mr-2" />
                        {formattedTime}
                      </div>
                      <div>
                    <h3 className="text-lg font-semibold">Image:</h3>
                    <div className="flex space-x-4">
                      <img src={event.event.image} alt={`Event ${event.event.title}`} className="w-35 h-35 object-cover rounded-lg" />
                    </div>

                  </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                {!event.event.status || event.event.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => openModal('Approve')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => openModal('Reject')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <div className={`text-lg font-semibold ${event.event.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                    {event.event.status === 'approved' ? 'Event Approved' : 'Event Rejected'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {modalIsOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4">Confirm {action}</h2>
      <p>Are you sure you want to {action?.toLowerCase()} this event?</p>

      {action === 'Reject' && (
        <div className="mt-4">
          <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700">
            Rejection Reason
          </label>
          <textarea
            id="rejectionReason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={4}
            placeholder="Please provide the reason for rejection"
          />
        </div>
      )}

      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Confirm
        </button>
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      </main>
    </div>
  );
};

export default EventView;

