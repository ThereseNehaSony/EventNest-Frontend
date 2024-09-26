
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventById, clearEvent } from '../../redux/reducers/event/eventSlice';
import { AppDispatch } from '../../redux/store';
import { saveTicketData } from '../../redux/reducers/ticket/ticketReducer';
import axios from 'axios';
import { baseUrl } from '../../config/constants';
import { toast } from 'react-hot-toast';


interface TicketType {
  type: string;
  price: number;
  details: string;
  seats:number;
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
    const selectedTicketTypes = Object.keys(ticketQuantities).filter(
      (key) => ticketQuantities[key] > 0
    );
  
    if (selectedTicketTypes.length > 0 && !selectedTicketTypes.includes(type)) {
      toast.error('You can only select one type of ticket.');
      return;
    }
  
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [type]: (prevQuantities[type] || 0) + 1,
    }));
  };
  
  const handleIncrement = (type: string) => {
    const selectedTicketTypes = Object.keys(ticketQuantities).filter(
      (key) => ticketQuantities[key] > 0
    );
  
    if (selectedTicketTypes.length > 0 && !selectedTicketTypes.includes(type)) {
      toast.error('You can only select one type of ticket.');
      return;
    }
  
    const selectedTicket = event?.event.ticketDetails.find(
      (ticket: TicketType) => ticket.type === type
    );
  
    if (selectedTicket) {
      const currentQuantity = ticketQuantities[type] || 0;
  
 
      if (currentQuantity < selectedTicket.availableSeats) {
        setTicketQuantities((prevQuantities) => ({
          ...prevQuantities,
          [type]: currentQuantity + 1,
        }));
      } else {
        toast.error(`Maximum available quantity for ${type} reached.`);
      }
    }
  };
  
  const handleDecrement = (type: string) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [type]: Math.max((prevQuantities[type] || 0) - 1, 0),
    }));
  };
  
  const handleNext = () => {
    
    const selectedTicketType = Object.values(ticketQuantities).some(quantity => quantity > 0);

    if (!selectedTicketType) {
      toast.error('Please select at least one ticket before proceeding.');
      return;
    }
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
   
    const bookingData = {
      userName: user?.username,
    
      eventId:eventId,
      status: 'confirmed', 
      
    };
    console.log(bookingData,"booking data");
    

   
    const response = await axios.post(`${baseUrl}/event/register`, bookingData);

    if (response.status === 201) {
      
      dispatch(saveTicketData({ 
        ticketQuantities: {}, 
        totalPrice: 0, 
        eventName: event?.event.name, 
        eventDateTime: event?.event.dateTime 
      }));


      navigate('/booking-success');
    }
  } catch (error) {
    console.error('Error registering for the event:', error);
   
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
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">{event?.event.title.toUpperCase()}</h1>
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
           <span>Date & Time: {event?.event.startDate}</span>
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
           <span>The event link will be available 10 minutes before the start time."</span>
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
                  <h2 className="text-lg font-semibold text-gray-800">{ticket.type.toUpperCase()}</h2>
                  <p className="text-gray-600 text-lg mt-1">₹{ticket.price.toFixed(2)}</p>
                  <p className="text-gray-500 mt-2">{ticket.details}</p>
                </div>
                <button
                  onClick={() => handleAdd(ticket.type)}
                   className={`absolute top-4 right-4 px-4 py-2 rounded-lg shadow-md transition-colors ${
                    ticket.seats <= 0
                    ? 'border-2 border-gray-500 text-gray-500 bg-gray-200 cursor-not-allowed' 
                     : 'border-2 border-red-500 text-red-500 hover:bg-red-100' 
                   }`}
                   disabled={ticket.seats <= 0} 
                    >
                     {ticket.seats <= 0 ? 'Sold Out' : 'Add'}
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
