import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessMessage: React.FC = () => {
  const navigate = useNavigate();

  const handleViewEvents = () => {
    navigate('/host/home');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Event Successfully Created!</h2>
        <p className="text-gray-700 mb-6">Your event has been created successfully.</p>
        <button
          onClick={handleViewEvents}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          See Your Events
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
