import React, { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventSidebar from '../sidebar/eventSidebar'; 
import axios from 'axios'; 
import { baseUrl } from '../../config/constants';
import { CheckCircleIcon, XCircleIcon, ClockIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Registration {
  userName: ReactNode;
  bookingDate: string | number | Date;
  name: string;
  email: string;
  date: string;
}

interface TicketType {
  type: string;
  seatsLeft: number;
  amountReceived: number;
}

const EventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventDetails, setEventDetails] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [attendeesCount, setAttendeesCount] = useState<number>(0);
  const [totalAmountReceived, setTotalAmountReceived] = useState<number>(0);
  const [recentRegistrations, setRecentRegistrations] = useState<[]>([]);
  const [salesByType, setSalesByType] = useState<TicketType[]>([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/event/${eventId}`); 
        
        const { event, attendeesCount, totalAmountReceived, recentRegistrations, salesByType } = response.data;
        setEventDetails(event);
        setAttendeesCount(attendeesCount);
        setTotalAmountReceived(totalAmountReceived);
        setRecentRegistrations(recentRegistrations);
        setSalesByType(salesByType); 
       
      } catch (error) {
        setError('Error fetching event details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
    console.log(salesByType,"saaa");
    console.log(recentRegistrations,"re")
    
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { title, status, isPublished, rejectionReason } = eventDetails;

  return (
    <div className="flex">
      {eventId && <EventSidebar eventId={eventId} />}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">{title.toUpperCase()}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Approval Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Approval Status</h2>
            <div className="flex items-center">
              {isPublished && status !== "rejected" ? (
                <span className="inline-flex items-center px-3 py-1 text-m font-semibold text-green-600 bg-green-200 rounded-full">
                  <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                  Published
                </span>
              ) : status === 'approved' ? (
                <span className="inline-flex items-center px-3 py-1 text-m font-semibold text-green-600 bg-green-200 rounded-full">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Approved
                </span>
              ) :  status === 'rejected' ? (
                <div className="flex flex-col items-start">
                  <span className="inline-flex items-center px-3 py-1 text-m font-semibold text-red-600 bg-red-200 rounded-full">
                    <XCircleIcon className="h-5 w-5 mr-2" />
                    Rejected
                  </span>
                  {rejectionReason && (
                    <p className="mt-2 text-red-600">
                      <strong>Rejection Reason:</strong> {rejectionReason}
                    </p>
                  )}
                </div>
              ): (
                <span className="inline-flex items-center px-3 py-1 text-m font-semibold text-yellow-600 bg-yellow-200 rounded-full">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  Pending Approval
                </span>
              )}
            </div>
          </div>

          {/* Event Metrics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Event Metrics</h2>
            <div className="flex justify-between">
              <div>
                <p className="text-gray-600">Attendees:</p>
                <p className="text-xl font-bold">{attendeesCount}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Payments Received:</p>
                <p className="text-xl font-bold">₹ {totalAmountReceived}</p>
              </div>
            </div>
          </div>

          {/* Sales by Type */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Sales by Type</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Ticket Type</th>
                  <th className="py-2 px-4 border-b text-left">Seats Left</th>
                  <th className="py-2 px-4 border-b text-left">Amount Received</th>
                </tr>
              </thead>
              <tbody>
                {salesByType?.length > 0 ? (
                  salesByType.map((ticket, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{ticket.type.toUpperCase()}</td>
                      <td className="py-2 px-4">{ticket.seatsLeft}</td>
                      <td className="py-2 px-4">₹ {ticket.amountReceived}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-500">No sales data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Recent Registrations */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Registrations</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRegistrations.length > 0 ? (
                  recentRegistrations.map((registration: Registration, index: number) => {
                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(registration.bookingDate));

                    return (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <td className="py-2 px-4 border-b">{registration.userName}</td>
                        <td className="py-2 px-4 border-b">{formattedDate}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={2} className="py-4 text-center text-gray-500">No registrations available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventPage;
