import React from 'react';
import Sidebar from '../../components/sidebar/userSidebar'; 

interface TicketDetailProps {
  eventImage: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  ticketType: string;
  amountPaid: string;
  cancellationPolicy: string;
}

const TicketDetail: React.FC<TicketDetailProps> = ({
  eventImage,
  eventName,
  eventDate,
  eventTime,
  location,
  ticketType,
  amountPaid,
  cancellationPolicy,
}) => {
  return (
    <div className="flex">
      <Sidebar /> 
      <div className="flex-1 p-8 ">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex">
            
            <img
              src={eventImage}
              alt={eventName}
              className="w-1/3 object-cover"
            />
            <div className="flex-1 p-4">
              
              <p className="text-sm text-gray-500">
                Use this ticket to enter the event.
              </p>
              
              <h2 className="text-2xl font-bold mt-2">{eventName}</h2>
              <p className="text-gray-700 mt-1">
                Location: {location}
              </p>
              <p className="text-gray-700">
                Date: {eventDate} | Time: {eventTime}
              </p>
              <p className="text-gray-700">Ticket Type: {ticketType}</p>
            </div>
            
            <div className="flex flex-col justify-center items-end p-4">
              <p className="text-lg font-semibold">Amount Paid</p>
              <p className="text-2xl font-bold text-green-600">{amountPaid}</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4">
            <p className="text-gray-700">{cancellationPolicy}</p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Cancel Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
