import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../config/constants';

const PaymentSuccess: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');
  console.log("Session ID:", sessionId);

 
  const bookingDataString = sessionStorage.getItem('bookingData');
  const bookingData = bookingDataString ? JSON.parse(bookingDataString) : null;
  console.log("Booking data:", bookingData);

  useEffect(() => {
    const verifyPayment = async () => {
      console.log("Verifying payment...");
      try {
      
        const verifyResponse = await axios.get(`${baseUrl}/payment/verify-payment/${sessionId}`);
        if (verifyResponse.data.success) {
          
          if (bookingData) {
            
            if (!sessionStorage.getItem('bookingSaved')) {
              const bookingResponse = await axios.post(`${baseUrl}/event/booking/save-online`, bookingData);
              console.log("Booking response:", bookingResponse.data);

              if (bookingResponse.data.success) {
           
                sessionStorage.setItem('bookingSaved', 'true');
                setPaymentStatus('success');
                setTimeout(() => {
                  navigate('/booking-success');
                }, 1000); 
              } else {
                setPaymentStatus('failed');
              }
            } else {
              console.log("Booking already saved.");
              setPaymentStatus('success');
              setTimeout(() => {
                navigate('/booking-success');
              }, 1000); 
            }
          } else {
            setPaymentStatus('failed');
          }
        } else {
          setPaymentStatus('failed');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setError('An error occurred while verifying the payment.');
        setPaymentStatus('failed');
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      setError('No session ID found.');
      setLoading(false);
    }
  }, [sessionId, navigate, bookingData]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>Error: {error}</p>}
      {!loading && !error && paymentStatus === 'success' && <p>Payment successful! Redirecting...</p>}
      {!loading && paymentStatus === 'failed' && <p>Payment failed. Please try again.</p>}
    </div>
  );
};

export default PaymentSuccess;
