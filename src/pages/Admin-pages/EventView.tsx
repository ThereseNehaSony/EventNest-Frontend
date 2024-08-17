// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../components/sidebar/sidebar';
// import { BsCalendar, BsCurrencyRupee } from 'react-icons/bs';
// import { MdLocationOn } from 'react-icons/md';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { baseUrl } from '../../config/constants';

// const EventView: React.FC = () => {
//   const { eventId } = useParams<{ eventId: string }>();
//   console.log(eventId,"iddddddddddd")
//   const [event, setEvent] = useState<any>(null);
//   const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
//   const [action, setAction] = useState<string | null>(null);
//   const [reason, setReason] = useState<string>('');

//   const openModal = (actionType: string) => {
//     setAction(actionType);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setAction(null);
//     setReason('');
//   };

//   // const handleConfirm = () => {
//   //   if (action && eventId) {
//   //     axios.post(`/api/event/${eventId}/${action.toLowerCase()}`, { reason })
//   //       .then(response => {
//   //         console.log(`${action} event confirmed. Response:`, response.data);
//   //         // Optionally, redirect or update state
//   //       })
//   //       .catch(error => {
//   //         console.error('Error updating event status:', error);
//   //         // Optionally, set an error state to display an error message
//   //       });
//   //   }
//   //   closeModal();
//   // };

//   const handleConfirm = () => {
//     if (action && eventId) {
//       axios.post(`${baseUrl}/event/${eventId}/${action.toLowerCase()}`)
//         .then(response => {
//           console.log(`${action} event confirmed. Response:`, response.data);
//           // Optionally, redirect or update state after approval/rejection
//           setEvent((prevEvent: any) => ({
//             ...prevEvent,
//             status: action === 'Approve' ? 'Approved' : 'Rejected',
//           }));
//         })
//         .catch(error => {
//           console.error('Error updating event status:', error);
//         });
//     }
//     closeModal();
//   };


//   useEffect(() => {
//     console.log("useeffect,,,,,,,,,,,,,,,,,,,")
//     if (eventId) {
//       console.log("useeffect22222222222,,,,,,,,,,,,,,,,,,,")
//       axios.get(`${baseUrl}/event/${eventId}`)
//         .then(response => setEvent(response.data))
//         .catch(error => {
//           console.error('Error fetching event details:', error);
//           // Optionally, set an error state to display an error message
//         });
//     }
//   }, [eventId]);

//   if (!event) return <div>Loading...</div>;
//   const eventDate = new Date(event.startDate);
//   const formattedDate = eventDate.toLocaleDateString(); // e.g., "8/17/2024"
//   const formattedTime = eventDate.toLocaleTimeString();

//   return (
//     <div className="flex h-screen">
//       <Sidebar />

//       <main className="flex-1 p-6 bg-gray-100 ml-64">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-3xl font-semibold text-center mb-6">{event.title}</h1>

//           <div className="flex justify-center">
//             <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div>
//                     <h3 className="text-lg font-semibold">Category:</h3>
//                     <p className="text-gray-600">{event.category}</p>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold">Description:</h3>
//                     <p className="text-gray-600">{event.description}</p>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold">Host:</h3>
//                     <p className="text-gray-600">{event.host}</p>
//                   </div>

//                   {/* <div>
//                     <h3 className="text-lg font-semibold">Location:</h3>
//                     <p className="text-gray-600 flex items-center"><MdLocationOn className="mr-2" />{event.location}</p>
//                   </div> */}

//                   <div>
//                     <h3 className="text-lg font-semibold">Entry Type:</h3>
//                     <p className="text-gray-600">{event.entryType}</p>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold">Entry Fee:</h3>
//                     <p className="text-gray-600 flex items-center"><BsCurrencyRupee className="mr-2" />{event.entryFee}</p>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold">Images:</h3>
//                     <div className="flex space-x-4">
//                       {event.images.map((img: string, index: number) => (
//                         <img key={index} src={img} alt={`Event ${index + 1}`} className="w-24 h-24 object-cover rounded-lg" />
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col justify-between">
//                   <div className="mb-4">
//                     <h3 className="text-lg font-semibold">Date :</h3>
//                     <div className="flex flex-col space-y-2 text-gray-600">
//                       <div className="flex items-center">
//                         <BsCalendar className="text-xl mr-2" />
//                         {formattedDate}
//                       </div>
//                       <h3 className="text-lg font-semibold text-black">Time :</h3>
//                       <div className="flex items-center">
//                         <BsCalendar className="text-xl mr-2" />
//                         {formattedTime}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-4 mt-6">
//               <button
//                   onClick={() => openModal('Approve')}
//                   className="px-4 py-2 bg-green-500 text-white rounded-lg"
//                   disabled={event.status !== 'Pending'}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => openModal('Reject')}
//                   className="px-4 py-2 bg-red-500 text-white rounded-lg"
//                   disabled={event.status !== 'Pending'}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Inline Modal
//         {modalIsOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
//               <h2 className="text-xl font-semibold mb-4">Confirm {action}</h2>
//               {action === 'Reject' && (
//                 <div className="mb-4">
//                   <label htmlFor="reason" className="block text-sm font-semibold mb-2">
//                     Reason for Rejection:
//                   </label>
//                   <textarea
//                     id="reason"
//                     value={reason}
//                     onChange={(e) => setReason(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg p-2"
//                     rows={4}
//                     placeholder="Enter reason for rejection"
//                   />
//                 </div>
//               )}
//               <p>Are you sure you want to {action?.toLowerCase()} this event?</p>
//               <div className="flex justify-end space-x-4 mt-4">
//                 <button
//                   onClick={handleConfirm}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   onClick={closeModal}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-lg"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )} */}

//           {/* Inline Modal */}
//           {modalIsOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
//               <h2 className="text-xl font-semibold mb-4">Confirm {action}</h2>
//               <p>Are you sure you want to {action?.toLowerCase()} this event?</p>
//               <div className="flex justify-end space-x-4 mt-4">
//                 <button
//                   onClick={handleConfirm}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   onClick={closeModal}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-lg"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default EventView;


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

  const openModal = (actionType: string) => {
    setAction(actionType);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAction(null);
  };

  const handleConfirm = () => {
    if (action && eventId) {
      axios.post(`${baseUrl}/event/${eventId}/${action.toLowerCase()}`)
        .then(response => {
          console.log(`${action} event confirmed. Response:`, response.data);
          setEvent((prevEvent: any) => ({
            ...prevEvent,
            status: action === 'Approve' ? 'approved' : 'rejected',
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
  const eventDate = new Date(event.startDate);
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
                    <p className="text-gray-600">{event.category}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Description:</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Host:</h3>
                    <p className="text-gray-600">{event.host}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Entry Type:</h3>
                    <p className="text-gray-600">{event.entryType}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Entry Fee:</h3>
                    <p className="text-gray-600 flex items-center"><BsCurrencyRupee className="mr-2" />{event.entryFee}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Images:</h3>
                    <div className="flex space-x-4">
                      {event.images.map((img: string, index: number) => (
                        <img key={index} src={img} alt={`Event ${index + 1}`} className="w-24 h-24 object-cover rounded-lg" />
                      ))}
                    </div>
                  </div>
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                {!event.status || event.status === 'pending' ? (
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
                  <div className={`text-lg font-semibold ${event.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                    {event.status === 'approved' ? 'Event Approved' : 'Event Rejected'}
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

