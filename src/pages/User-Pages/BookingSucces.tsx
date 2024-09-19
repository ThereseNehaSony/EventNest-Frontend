import React from 'react';
import PaymentSuccessPage from '../../components/common/success';

const BookingSuccess: React.FC = () => {
  return (
    <PaymentSuccessPage
      imageUrl="/success.png"
      title="Booking Successful!"
      message="Thank you for your Booking. Your event has been successfully booked."
      buttonText="Go to My Profile"
      redirectPath="/profile" 
    />
  );
};

export default BookingSuccess;


