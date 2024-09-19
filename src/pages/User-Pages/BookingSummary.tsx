
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../config/constants';
import { toast } from 'react-hot-toast';
const stripePromise = loadStripe('pk_test_51PsiBmP7a8Dkcmab6SMs9jR9ua3Dh1HYZBEEjZwlPyk1e0hR6396zBpzBzrplG1VgZ7LbuAzHJp0FocsM4ri85OG003N8KC0jK');

type TicketQuantities = {
  [ticketType: string]: number;
};

const BookingSummary: React.FC = () => {
  const { eventId, eventName, eventDateTime, ticketQuantities = {}, totalPrice } = useSelector(
    (state: any) => state.ticket as { 
      eventName: string; 
      eventId: string;
      eventDateTime: string; 
      ticketQuantities: TicketQuantities; 
      totalPrice: number;
    }
  );
  const { username, _id } = useSelector((state: any) => state.user.user);

  const [paymentType, setPaymentType] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const bookingFee = 50; 
  const totalAmount = totalPrice + bookingFee;
  const navigate = useNavigate();

  const getTicketDetails = () => {
    if (!ticketQuantities || Object.keys(ticketQuantities).length === 0) return null;

    return Object.entries(ticketQuantities).map(([ticketType, quantity]) => {
      return quantity > 0 ? (
        <div key={ticketType} className="flex justify-between text-gray-600 mb-2">
          <span>{ticketType}</span>
          <span>{quantity} x ₹{(totalPrice / quantity).toFixed(2)}</span>
        </div>
      ) : null;
    });
  };

  const handlePaymentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(event.target.value);
  };
  
  const [ticketType, quantity] = Object.entries(ticketQuantities).find(([_, qty]) => qty > 0) || [null, null];
console.log(ticketType,quantity)
  
  if (ticketType && quantity) {
    const bookingPayload = {
      userName: username,
      userId:_id,
      eventId,
      ticketType,           
      quantity,             
      amountPaid: totalAmount, 
      paymentType,
      bookingDate: new Date(),
    };
  
  
    sessionStorage.setItem('bookingData', JSON.stringify(bookingPayload));
  }

  const handleProceed = async () => {
    try {
      let paymentSuccess = false;
  
      if (paymentType === 'online') {
        const stripe = await stripePromise;

        const response = await axios.post(`${baseUrl}/payment/create-checkout-session`, {
          items: Object.keys(ticketQuantities).map((ticketType) => ({
            name: ticketType,
            amount: (totalPrice / ticketQuantities[ticketType]),
            quantity: ticketQuantities[ticketType],
          })),
        });

        const session = response.data;
        console.log('Stripe session:', session);
        const result = await stripe?.redirectToCheckout({ sessionId: session.id });
        // paymentSuccess = true;
        
        if (result?.error) {
          console.error(result.error.message);
          setPaymentStatus('failed');
        } else {
         
          // paymentSuccess = true;
        }
      } else if (paymentType === 'wallet') {
        const response = await axios.post(`${baseUrl}/user/wallet/payment`, {
          userName: username,
          totalAmount,
          userId: _id,
         
          eventId,
          
          ticketType,
            quantity,
            
         
          paymentType,
          bookingDate: new Date(),

        });

        const paymentResult = response.data;

        if (paymentResult.success) {
          paymentSuccess = true;
          navigate('/booking-success'); 
          
        } else {
          setPaymentStatus('failed');
        }
      } else {
       
        toast.error('Please select a valid payment method');
      }

      if (paymentSuccess) {
        const bookingPayload = {
          userName: username,
          eventId,
          userId:_id,
            ticketType,
            quantity,
            
          totalAmountPaid: totalAmount,
          paymentType,
          bookingDate: new Date(),
        };
        console.log("paid.....",bookingPayload)
        console.log(paymentSuccess,"succes....")
      
       // const saveBookingResponse = await axios.post(`${baseUrl}/event/booking/save-booking`, bookingPayload);
       // const bookingResult = saveBookingResponse.data;
// console.log(bookingResult,"res...")
        // if (bookingResult.success) {
        //   setPaymentStatus('success');
        //   navigate('/booking-success'); 
        // } else {
        //   setPaymentStatus('failed');
        // }
      }
    } catch (error) {
      console.error('Error during proceed:', error);
      setPaymentStatus('failed');
    }
  };
  
  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-100 rounded-xl shadow-lg flex flex-col lg:flex-row gap-8">
    
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">E-Ticket Information</h2>
        <p className="text-gray-600 mb-2">Save the planet. Use your phone as a ticket.</p>
        <p className="text-gray-600 mb-2">No physical ticket(s) are required to enter the venue.</p>
        <p className="text-gray-600 mb-2">It is mandatory to present the ticket(s) in my profile section at the venue.</p>
        <p className="text-gray-600">Customer(s) can access their ticket(s) from the 'My Profile' section.</p>
      </div>

      
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
