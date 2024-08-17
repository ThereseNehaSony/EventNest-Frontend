import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const imageUrl = '/success.png';

  const handleContinue = () => {
    // Redirect to another page, such as the user's dashboard or event details
    navigate('/'); // Adjust the route as needed
  };

  
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg">
        <img src={imageUrl} alt="Success" className="mx-auto mb-6 h-40 w-50 object-cover" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your payment. Your transaction has been successfully processed.</p>

        

        <button
          onClick={handleContinue}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};


export default PaymentSuccessPage;
