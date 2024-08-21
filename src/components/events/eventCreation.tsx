import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { savePartialEventData } from '../../redux/reducers/admin/adminSlice';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux'; 
const EventSetup: React.FC = () => {
  const [eventType, setEventType] = useState<string>(''); 
  const [paymentStatus, setPaymentStatus] = useState<string>(''); 
  
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleEventTypeChange = (type: string) => {
    setEventType(type);
  };

  const handlePaymentStatusChange = (status: string) => {
    setPaymentStatus(status);
  };
  
  // const handleGetStartedClick =()=>{
  //   dispatch(savePartialEventData({ entryType: eventType, entryFee: paymentStatus === 'Free' ? 0 : undefined }));
  //   navigate('/event-addDetails')
  // }

  const handleSubmit = () => {
    
    console.log('Event Type:', eventType);
    console.log('Payment Status:', paymentStatus);
    navigate('/event-addDetails')
    dispatch(savePartialEventData({ type: eventType, entryType: paymentStatus === 'free' ? 'Free' : 'Paid' }));
    // navigate('/event-addDetails')
  };

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Create New Event </h2>
          <p className="text-sm text-gray-500 mb-4 text-center">
            So that we can offer a personalized setup experience, please tell us about your event
          </p>
          
         
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">How will your Event be conducted ?</h3>
            <div className="flex flex-row space-x-2">
              <button
                onClick={() => handleEventTypeChange('online')}
                className={`py-2 px-4 rounded-lg border ${eventType === 'online' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-800 border-gray-300'}`}
              >
                Virtual
              </button>
              <button
                onClick={() => handleEventTypeChange('offline')}
                className={`py-2 px-4 rounded-lg border ${eventType === 'offline' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-800 border-gray-300'}`}
              >
                In-Person
              </button>
            </div>
          </div>
          
         
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Will attendees pay to attend your event ?</h3>
            <div className="flex flex-row space-x-2">
              <button
                onClick={() => handlePaymentStatusChange('free')}
                className={`py-2 px-4 rounded-lg border ${paymentStatus === 'free' ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-800 border-gray-300'}`}
              >
                Zero Payment
              </button>
              <button
                onClick={() => handlePaymentStatusChange('paid')}
                className={`py-2 px-4 rounded-lg border ${paymentStatus === 'paid' ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-800 border-gray-300'}`}
              >
                Paid Ticket
              </button>
            </div>
          </div>

         
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSetup;
