import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PaymentSuccessPageProps {
  imageUrl: string;
  title: string;
  message: string;
  buttonText: string;
  redirectPath: string;
}

const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ imageUrl, title, message, buttonText, redirectPath }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(redirectPath);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg">
        <img src={imageUrl} alt="Success" className="mx-auto mb-6 h-40 w-50 object-cover" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>

        <button
          onClick={handleContinue}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
