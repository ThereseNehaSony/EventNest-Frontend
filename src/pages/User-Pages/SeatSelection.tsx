// import React, { useState } from 'react';

// interface TicketType {
//   type: string;
//   price: number;
//   details: string;
// }

// const BookingPage: React.FC = () => {
//   // Dummy ticket types
//   const initialTicketTypes: TicketType[] = [
//     { type: 'General Admission', price: 20, details: 'Access to general areas' },
//     { type: 'VIP', price: 50, details: 'Access to VIP areas with free drinks' },
//     { type: 'Student', price: 15, details: 'Discounted ticket for students' },
//   ];

//   // State to track selected tickets and their quantities
//   const [ticketQuantities, setTicketQuantities] = useState<{ [key: string]: number }>({});

//   const handleAdd = (type: string) => {
//     setTicketQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [type]: (prevQuantities[type] || 0) + 1,
//     }));
//   };

//   const handleIncrement = (type: string) => {
//     setTicketQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [type]: (prevQuantities[type] || 0) + 1,
//     }));
//   };

//   const handleDecrement = (type: string) => {
//     setTicketQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [type]: Math.max((prevQuantities[type] || 0) - 1, 0),
//     }));
//   };

//   const handleNext = () => {
//     alert('Next button clicked');
//   };

  
//   const getTotalTickets = () => {
//     return Object.values(ticketQuantities).reduce((acc, qty) => acc + qty, 0);
//   };

//   const getTotalPrice = () => {
//     return initialTicketTypes.reduce((acc, ticket) => {
//       return acc + (ticket.price * (ticketQuantities[ticket.type] || 0));
//     }, 0);
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-gray-100 rounded-xl shadow-lg space-y-6">
//       <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Select Your Ticket</h1>
//       <div className="space-y-4">
//         {initialTicketTypes.map((ticket, index) => (
//           <div key={index} className="relative bg-white p-6 rounded-lg shadow-md flex items-start">
//             <div className="flex-1">
//               <h2 className="text-lg font-semibold text-gray-800">{ticket.type}</h2>
//               <p className="text-gray-600 text-lg mt-1">${ticket.price.toFixed(2)}</p>
//               <p className="text-gray-500 mt-2">{ticket.details}</p>
//             </div>
//             <button
//               onClick={() => handleAdd(ticket.type)}
//               className="absolute top-4 right-4 border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-100 transition-colors"
//             >
//               Add
//             </button>
//             {ticketQuantities[ticket.type] > 0 && (
//               <div className="absolute bottom-4 right-4 flex items-center space-x-2">
//                 <button
//                   onClick={() => handleDecrement(ticket.type)}
//                   className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
//                 >
//                   <span className="text-xl font-bold">-</span>
//                 </button>
//                 <span className="text-lg font-medium">{ticketQuantities[ticket.type]}</span>
//                 <button
//                   onClick={() => handleIncrement(ticket.type)}
//                   className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
//                 >
//                   <span className="text-xl font-bold">+</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
//         <div>
//           <h2 className="text-lg font-semibold text-gray-800">Total Tickets</h2>
//           <p className="text-gray-600 text-xl">{getTotalTickets()}</p>
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-800">Total Price</h2>
//           <p className="text-gray-600 text-xl">${getTotalPrice().toFixed(2)}</p>
//         </div>
//       </div>
//       <button
//         onClick={handleNext}
//         className="w-full bg-red-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default BookingPage;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchEventById, clearEvent } from '../../redux/reducers/event/eventSlice';
// import { AppDispatch } from '../../redux/store';

// interface TicketType {
//   type: string;
//   price: number;
//   details: string;
// }

// const BookingPage: React.FC = () => {
//   const { eventId } = useParams<{ eventId: string }>();
//   const dispatch = useDispatch<AppDispatch>();
//   const { event, loading, error } = useSelector((state: any) => state.event);

//   useEffect(() => {
//     if (eventId) {
//       dispatch(fetchEventById(eventId));
//     }
//     // return () => {
//     //   dispatch(clearEvent());
//     // };
//   }, [dispatch, eventId]);

//   const [ticketQuantities, setTicketQuantities] = useState<{ [key: string]: number }>({});

//   const handleAdd = (type: string) => {
//     setTicketQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [type]: (prevQuantities[type] || 0) + 1,
//     }));
//   };

//   const handleIncrement = (type: string) => {
//     setTicketQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [type]: (prevQuantities[type] || 0) + 1,
//     }));
//   };

//   const handleDecrement = (type: string) => {
//     setTicketQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [type]: Math.max((prevQuantities[type] || 0) - 1, 0),
//     }));
//   };

//   const handleNext = () => {
//     alert('Next button clicked');
//   };

//   const getTotalTickets = () => {
//     return Object.values(ticketQuantities).reduce((acc, qty) => acc + qty, 0);
//   };

//   const getTotalPrice = () => {
//     return event?.ticketDetails.reduce((acc: any, ticket: any) => {
//       return acc + (ticket.price * (ticketQuantities[ticket.type] || 0));
//     }, 0) || 0;
//   };

//   if (loading) return <p>Loading tickets...</p>;
//   if (error) return <p>Error fetching tickets: {error}</p>;

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-gray-100 rounded-xl shadow-lg space-y-6">
//       <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Select Your Ticket</h1>
//       <div className="space-y-4">
//         {event?.ticketDetails.map((ticket: TicketType, index: number) => (
//           <div key={index} className="relative bg-white p-6 rounded-lg shadow-md flex items-start">
//             <div className="flex-1">
//               <h2 className="text-lg font-semibold text-gray-800">{ticket.type}</h2>
//               <p className="text-gray-600 text-lg mt-1">₹{ticket.price.toFixed(2)}</p>
//               <p className="text-gray-500 mt-2">{ticket.details}</p>
//             </div>
//             <button
//               onClick={() => handleAdd(ticket.type)}
//               className="absolute top-4 right-4 border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-100 transition-colors"
//             >
//               Add
//             </button>
//             {ticketQuantities[ticket.type] > 0 && (
//               <div className="absolute bottom-4 right-4 flex items-center space-x-2">
//                 <button
//                   onClick={() => handleDecrement(ticket.type)}
//                   className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
//                 >
//                   <span className="text-xl font-bold">-</span>
//                 </button>
//                 <span className="text-lg font-medium">{ticketQuantities[ticket.type]}</span>
//                 <button
//                   onClick={() => handleIncrement(ticket.type)}
//                   className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
//                 >
//                   <span className="text-xl font-bold">+</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
//         <div>
//           <h2 className="text-lg font-semibold text-gray-800">Total Tickets</h2>
//           <p className="text-gray-600 text-xl">{getTotalTickets()}</p>
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-800">Total Price</h2>
//           <p className="text-gray-600 text-xl">₹{getTotalPrice().toFixed(2)}</p>
//         </div>
//       </div>
//       <button
//         onClick={handleNext}
//         className="w-full bg-red-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default BookingPage;

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventById, clearEvent } from '../../redux/reducers/event/eventSlice';
import { AppDispatch } from '../../redux/store';
import { saveTicketData } from '../../redux/reducers/ticket/ticketReducer';
import axios from 'axios';
import { baseUrl } from '../../config/constants';

interface TicketType {
  type: string;
  price: number;
  details: string;
}

const BookingPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { event, loading, error } = useSelector((state: any) => state.event);
  const navigate = useNavigate();
  const {user} = useSelector((state:any)=>state.user)

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventById(eventId));
    }

    return () => {
      dispatch(clearEvent());
    };
  }, [dispatch, eventId]);

  const [ticketQuantities, setTicketQuantities] = React.useState<{ [key: string]: number }>({});

  const handleAdd = (type: string) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [type]: (prevQuantities[type] || 0) + 1,
    }));
  };

  const handleIncrement = (type: string) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [type]: (prevQuantities[type] || 0) + 1,
    }));
  };

  const handleDecrement = (type: string) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [type]: Math.max((prevQuantities[type] || 0) - 1, 0),
    }));
  };

  const handleNext = () => {
    const totalPrice = event?.event.ticketDetails.reduce((acc: number, ticket: TicketType) => {
      return acc + (ticket.price * (ticketQuantities[ticket.type] || 0));
    }, 0) || 0;

    dispatch(saveTicketData({ 
      ticketQuantities, 
      totalPrice, 
      eventName: event?.event.title, 
      eventDateTime: event?.event.startDate,
      eventId:eventId
    }));

    navigate('/booking-summary');
  };

 
const handleRegister = async () => {
  try {
    // Prepare the booking data
    const bookingData = {
      userName: user?.username, // Assuming you have the user information
      // eventName: event?.title,
      eventId:event?._id,
      status: 'confirmed', // Default status
      // No need to include ticketType, quantity, or amountPaid for free events
    };
    console.log(bookingData,"booking dat");
    

    // Make the API call to save the booking in the database
    const response = await axios.post(`${baseUrl}/event/register`, bookingData);

    if (response.status === 201) {
      // If the booking is successful, dispatch to save ticket data to Redux
      dispatch(saveTicketData({ 
        ticketQuantities: {}, 
        totalPrice: 0, 
        eventName: event?.event.name, 
        eventDateTime: event?.event.dateTime 
      }));

      // Redirect to the success page
      navigate('/booking-success');
    }
  } catch (error) {
    console.error('Error registering for the event:', error);
    // Handle error (show a notification, etc.)
  }
};

  const getTotalTickets = () => {
    return Object.values(ticketQuantities).reduce((acc, qty) => acc + qty, 0);
  };

  const getTotalPrice = () => {
    return (event?.event.ticketDetails || []).reduce((acc: number, ticket: TicketType) => {
      return acc + (ticket.price * (ticketQuantities[ticket.type] || 0));
    }, 0);
  };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error fetching event: {error}</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-100 rounded-xl shadow-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">{event?.event.title}</h1>
      <img src={event.event.image} alt="Event" className="w-full h-64 object-contain" />
      {event?.event.entryType === 'Free' ? (
       <div className="space-y-6 p-8 bg-gray-50 rounded-xl shadow-lg">
       
       <div className="text-lg text-gray-700 space-y-2">
         <p className="flex items-center">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             className="h-6 w-6 text-red-500 mr-2"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
               d="M8 7V3m8 4V3m-9 18h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
             />
           </svg>
           <span>Date & Time: {event?.startDate}</span>
         </p>
         <p className="flex items-center">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             className="h-6 w-6 text-red-500 mr-2"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
               d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z"
             />
           </svg>
           <span>Location: {event?.event.location?.address}</span>
         </p>
       </div>
       <button
         onClick={handleRegister}
         className="w-full bg-red-600 text-white text-lg py-4 rounded-xl shadow-xl hover:bg-red-700 transition-colors"
       >
         Register Now
       </button>
     </div>
     
      ) : (
        <>
          <div className="space-y-4">
            {event?.event.ticketDetails?.map((ticket: TicketType, index: number) => (
              <div key={index} className="relative bg-white p-6 rounded-lg shadow-md flex items-start">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{ticket.type}</h2>
                  <p className="text-gray-600 text-lg mt-1">₹{ticket.price.toFixed(2)}</p>
                  <p className="text-gray-500 mt-2">{ticket.details}</p>
                </div>
                <button
                  onClick={() => handleAdd(ticket.type)}
                  className="absolute top-4 right-4 border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-100 transition-colors"
                >
                  Add
                </button>
                {ticketQuantities[ticket.type] > 0 && (
                  <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrement(ticket.type)}
                      className="bg-gray-200 p-1 rounded-full hover:bg-gray-300"
                    >
                      <span className="text-l font-bold">-</span>
                    </button>
                    <span className="text-lg font-medium">{ticketQuantities[ticket.type]}</span>
                    <button
                      onClick={() => handleIncrement(ticket.type)}
                      className="bg-gray-200 p-1 rounded-full hover:bg-gray-300"
                    >
                      <span className="text-l font-bold">+</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-10">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Total Tickets</h2>
              <p className="text-gray-600 text-xl">{getTotalTickets()}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Total Price</h2>
              <p className="text-gray-600 text-xl">₹{getTotalPrice().toFixed(2)}</p>
            </div>
          </div>
          <button
            onClick={handleNext}
            className="w-full bg-red-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default BookingPage;
