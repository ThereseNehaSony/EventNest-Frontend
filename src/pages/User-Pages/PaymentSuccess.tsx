import React from 'react';
import PaymentSuccessPage from '../../components/common/success';

const PaymentSuccess: React.FC = () => {
  return (
    <PaymentSuccessPage
      imageUrl="/success.png"
      title="Payment Successful!"
      message="Thank you for your payment. Your event has been successfully booked."
      buttonText="Go to My Profile"
      redirectPath="/profile" 
    />
  );
};

export default PaymentSuccess;
