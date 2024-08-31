import React from 'react';
import PaymentSuccessPage from '../../components/common/success';

const Success: React.FC = () => {
  return (
    <PaymentSuccessPage
      imageUrl="/success.png"
      title="Event Successfully created!"
      message="Your event has been created successfully."
      buttonText="See Your Events"
      redirectPath="/host/home" 
    />
  );
};

export default Success;
