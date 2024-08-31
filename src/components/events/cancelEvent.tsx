// CancelEventPage.tsx
import React, { useState } from 'react';
import Sidebar from '../sidebar/eventSidebar'; 

const CancelEventPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCancel = () => {
  
    console.log('Event cancelled');
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      
      <main className="flex-1 p-6 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Cancel Event</h2>

          


          {/* Cancellation Rules */}
          <div className="mb-6">
               <h3 className="text-xl font-semibold text-gray-800 mb-4">Cancellation Rules</h3>
               <p className="text-gray-700">
                <strong>1. Cancellation Period:</strong> Hosts can cancel their events up to 7 days before the event date without any penalty.
               </p>
               <p className="text-gray-700">
                 <strong>2. Cancellation Fee:</strong> Cancellations made less than 7 days before the event will incur a fee of 10% of the total amount paid.
               </p>
               <p className="text-gray-700">
                 <strong>3. No Refund:</strong> No amount will be refunded for cancellations made after the specified time period.
               </p>
           </div>

          {/* Cancel Button */}
          <div className="flex justify-end">
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Cancel Event
            </button>
          </div>
        </div>

        {/* Cancel Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Cancellation</h2>
              <p className="text-gray-700 mb-6">
                Are you sure you want to cancel this event? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CancelEventPage;
