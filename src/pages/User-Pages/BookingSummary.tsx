// import React, { useState } from 'react';

// interface TicketType {
//   type: string;
//   price: number;
//   details: string;
// }

// const BookingSummary: React.FC = () => {
//   // Dummy data for the event and tickets
//   const eventName = 'Music Festival 2024';
//   const eventDateTime = 'August 30, 2024 - 7:00 PM';

//   const initialTicketTypes: TicketType[] = [
//     { type: 'General Admission', price: 20, details: 'Access to general areas' },
//     { type: 'VIP', price: 50, details: 'Access to VIP areas with free drinks' },
//     { type: 'Student', price: 15, details: 'Discounted ticket for students' },
//   ];

//   const [ticketQuantities, setTicketQuantities] = useState<{ [key: string]: number }>({
//     'General Admission': 2,
//     'VIP': 1,
//     'Student': 0,
//   });

//   const bookingFee = 5; // Example booking fee

//   // Calculate total tickets, total price, and total amount with booking fee
//   const getTotalPrice = () => {
//     return initialTicketTypes.reduce((acc, ticket) => {
//       return acc + (ticket.price * (ticketQuantities[ticket.type] || 0));
//     }, 0);
//   };

//   const totalPrice = getTotalPrice();
//   const totalAmount = totalPrice + bookingFee;

//   const [paymentType, setPaymentType] = useState('');

//   const handlePaymentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPaymentType(event.target.value);
//   };

//   const handleProceed = () => {
//     alert('Proceed button clicked');
//   };

//   return (
//     <div className="p-8 max-w-6xl mx-auto bg-gray-100 rounded-xl shadow-lg flex flex-col lg:flex-row gap-8">
//       {/* Left Side: E-Ticket Information */}
//       <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">E-Ticket Information</h2>
//         <p className="text-gray-600 mb-2">Save the planet. Use your phone as a ticket.</p>
//         <p className="text-gray-600 mb-2">No physical ticket(s) are required to enter the venue.</p>
//         <p className="text-gray-600 mb-2">It is mandatory to present the ticket(s) in my profile section at the venue.</p>
//         <p className="text-gray-600">Customer(s) can access their ticket(s) from the 'My Profile' section.</p>
//       </div>

//       {/* Right Side: Booking Summary */}
//       <div className="flex-1 bg-white p-6 rounded-lg shadow-md space-y-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking Summary</h2>

//         <div className="border-b border-gray-200 pb-4">
//           <h3 className="text-lg font-semibold text-gray-800">Event Details</h3>
//           <p className="text-gray-600">{eventName}</p>
//           <p className="text-gray-500">{eventDateTime}</p>
//         </div>

//         <div className="border-b border-gray-200 pb-4">
//           {/* <h3 className="text-lg font-semibold text-gray-800">Tickets Selected</h3> */}
//           {initialTicketTypes.map((ticket) => (
//             ticketQuantities[ticket.type] > 0 && (
//               <div key={ticket.type} className="flex justify-between text-gray-600 mb-2">
//                 <span>{ticket.type}</span>
//                 <span>{ticketQuantities[ticket.type]} x ${ticket.price.toFixed(2)}</span>
//               </div>
//             )
//           ))}
//         </div>

//         <div className="border-b border-gray-200 pb-4">
//           <div className="flex justify-between mb-2">
//             <h3 className="text-m  text-gray-800">Sub-Total</h3>
//             <p className="text-gray-600">₹ {totalPrice.toFixed(2)}</p>
//           </div>
//           {/* <p className="text-gray-500 mb-4">Price before booking fee</p> */}

//           <div className="flex justify-between mb-2">
//             <h3 className="text-m text-gray-800">Booking Fee</h3>
//             <p className="text-gray-600">₹ {bookingFee.toFixed(2)}</p>
//           </div>

//           <div className="flex justify-between mb-2">
//             <h3 className="text-lg font-semibold text-gray-800">Total Amount</h3>
//             <p className="text-gray-600 text-xl font-bold">₹ {totalAmount.toFixed(2)}</p>
//           </div>
//           {/* <p className="text-gray-500 mb-4">Includes booking fee</p> */}
//         </div>

//         <div className="border-b border-gray-200 pb-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Type</h3>
//           <div className="space-y-2">
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="paymentType"
//                 value="online"
//                 checked={paymentType === 'online'}
//                 onChange={handlePaymentTypeChange}
//                 className="mr-2"
//               />
//              Online Payment
//             </label>
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="paymentType"
//                 value="wallet"
//                 checked={paymentType === 'wallet'}
//                 onChange={handlePaymentTypeChange}
//                 className="mr-2"
//               />
//               Wallet
//             </label>
//           </div>
//         </div>

//         <button
//           onClick={handleProceed}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
//         >
//           Proceed
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingSummary;

import React from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { baseUrl } from '../../config/constants';

const stripePromise = loadStripe('pk_test_51PsiBmP7a8Dkcmab6SMs9jR9ua3Dh1HYZBEEjZwlPyk1e0hR6396zBpzBzrplG1VgZ7LbuAzHJp0FocsM4ri85OG003N8KC0jK');

const BookingSummary: React.FC = () => {
  const { eventName,eventDateTime,ticketQuantities, totalPrice } = useSelector((state: any) => state.ticket);

  // const eventName = 'Music Festival 2024';
  // const eventDateTime = 'August 30, 2024 - 7:00 PM';

  const initialTicketTypes = [
    { type: 'General Admission', price: 20, details: 'Access to general areas' },
    { type: 'VIP', price: 50, details: 'Access to VIP areas with free drinks' },
    { type: 'Student', price: 15, details: 'Discounted ticket for students' },
  ];

  const bookingFee = 50; 
  const totalAmount = totalPrice + bookingFee;

  const getTicketDetails = () => {
    return initialTicketTypes.map((ticket) => {
      const quantity = ticketQuantities[ticket.type] || 0;
      return quantity > 0 ? (
        <div key={ticket.type} className="flex justify-between text-gray-600 mb-2">
          <span>{ticket.type}</span>
          <span>{quantity} x ₹{ticket.price.toFixed(2)}</span>
        </div>
      ) : null;
    });
  };

  const [paymentType, setPaymentType] = React.useState('');

  const handlePaymentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(event.target.value);
  };
  const handleProceed = async () => {
    try {
      console.log("Proceed clicked");
      if (paymentType === 'online') {
        const stripe = await stripePromise;
        console.log("Stripe initialized", stripe);
  
        const response = await fetch(`${baseUrl}/payment/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: initialTicketTypes.map((ticket) => ({
              name: ticket.type,
              amount: ticket.price * 100,
              quantity: ticketQuantities[ticket.type] || 1,
            })),
          }),
        });
  
        if (!response.ok) {
          console.error("Failed to create session:", response.statusText);
          return;
        }
  
        const session = await response.json();
        console.log("Session created:", session);
  
        const result = await stripe?.redirectToCheckout({
          sessionId: session.id,
        });
  
        if (result?.error) {
          console.error(result.error.message);
        }
      } else {
        alert('Proceed with Wallet Payment');
      }
    } catch (error) {
      console.error("Error during proceed:", error);
    }
  };
  
  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-100 rounded-xl shadow-lg flex flex-col lg:flex-row gap-8">
      {/* Left Side: E-Ticket Information */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">E-Ticket Information</h2>
        <p className="text-gray-600 mb-2">Save the planet. Use your phone as a ticket.</p>
        <p className="text-gray-600 mb-2">No physical ticket(s) are required to enter the venue.</p>
        <p className="text-gray-600 mb-2">It is mandatory to present the ticket(s) in my profile section at the venue.</p>
        <p className="text-gray-600">Customer(s) can access their ticket(s) from the 'My Profile' section.</p>
      </div>

      {/* Right Side: Booking Summary */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking Summary</h2>

        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-800">Event Details</h3>
          <p className="text-gray-600">{eventName}</p>
          <p className="text-gray-500">{eventDateTime}</p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          {getTicketDetails()}
        </div>

        <div className="border-b border-gray-200 pb-4">
          <div className="flex justify-between mb-2">
            <h3 className="text-m text-gray-800">Sub-Total</h3>
            <p className="text-gray-600">₹{totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <h3 className="text-m text-gray-800">Booking Fee</h3>
            <p className="text-gray-600">₹{bookingFee.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Total Amount</h3>
            <p className="text-gray-600 text-xl font-bold">₹{totalAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Type</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentType"
                value="online"
                checked={paymentType === 'online'}
                onChange={handlePaymentTypeChange}
                className="mr-2"
              />
              Online Payment
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentType"
                value="wallet"
                checked={paymentType === 'wallet'}
                onChange={handlePaymentTypeChange}
                className="mr-2"
              />
              Wallet
            </label>
          </div>
        </div>

        <button
          onClick={handleProceed}
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
