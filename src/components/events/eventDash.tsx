// // EventPage.tsx
// import React, { useState } from 'react';
// import EventSidebar from '../sidebar/eventSidebar'; // Adjust the path as necessary

// const EventPage: React.FC = () => {
//   const [isApproved, setIsApproved] = useState<boolean>(false);
//   const [attendeesCount, setAttendeesCount] = useState<number>(120);
//   const [totalPayments, setTotalPayments] = useState<number>(5000);
//   const [salesData, setSalesData] = useState<{ type: string; amount: number }[]>([
//     { type: 'Free', amount: 200 },
//     { type: 'Paid', amount: 4800 },
//   ]);
//   const [recentRegistrations, setRecentRegistrations] = useState<{ name: string; email: string; date: string }[]>([
//     { name: 'John Doe', email: 'john@example.com', date: '2024-08-10' },
//     { name: 'Jane Smith', email: 'jane@example.com', date: '2024-08-09' },
//   ]);

//   return (
//     <div className="flex">
      
//       <EventSidebar />

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-gray-100">
//         {/* Dashboard */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Approval Status */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-4">Approval Status</h2>
//             <div className="flex items-center">
//               <span className={`inline-block px-3 py-1 text-sm font-semibold text-${isApproved ? 'green' : 'red'}-600 bg-${isApproved ? 'green' : 'red'}-200 rounded-full`}>
//                 {isApproved ? 'Approved' : 'Pending Approval'}
//               </span>
//               {isApproved && (
//                 <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//                   Publish
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Event Metrics */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-4">Event Metrics</h2>
//             <div className="flex justify-between">
//               <div>
//                 <p className="text-gray-600">Attendees:</p>
//                 <p className="text-xl font-bold">{attendeesCount}</p>
//               </div>
//               <div>
//                 <p className="text-gray-600">Total Payments Received:</p>
//                 <p className="text-xl font-bold">${totalPayments}</p>
//               </div>
//             </div>
//           </div>

//           {/* Sales by Type */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-4">Sales by Type</h2>
//             <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="py-2 px-4 border-b text-left">Ticket Type</th>
//                   <th className="py-2 px-4 border-b text-left">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {salesData.map((sale, index) => (
//                   <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
//                     <td className="py-2 px-4 border-b">{sale.type}</td>
//                     <td className="py-2 px-4 border-b">${sale.amount}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Recent Registrations */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-4">Recent Registrations</h2>
//             <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="py-2 px-4 border-b text-left">Name</th>
//                   <th className="py-2 px-4 border-b text-left">Email</th>
//                   <th className="py-2 px-4 border-b text-left">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentRegistrations.map((registration, index) => (
//                   <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
//                     <td className="py-2 px-4 border-b">{registration.name}</td>
//                     <td className="py-2 px-4 border-b">{registration.email}</td>
//                     <td className="py-2 px-4 border-b">{registration.date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default EventPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventSidebar from '../sidebar/eventSidebar'; // Adjust the path as necessary
import axios from 'axios'; // Ensure axios is installed
import { baseUrl } from '../../config/constants';

interface SaleData {
  type: string;
  amount: number;
}

interface Registration {
  name: string;
  email: string;
  date: string;
}

const EventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventDetails, setEventDetails] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/event/${eventId}`); 
        setEventDetails(response.data);
        console.log(eventDetails,"details,,,,,,,,")
      } catch (error) {
        setError('Error fetching event details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { status, attendeesCount, totalPayments, salesData, recentRegistrations } = eventDetails;

  return (
    <div className="flex">
        {eventId && <EventSidebar eventId={eventId} />}

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Approval Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Approval Status</h2>
            <div className="flex items-center">
            <span className={`inline-block px-3 py-1 text-sm font-semibold text-${status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'yellow'}-600 bg-${status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'yellow'}-200 rounded-full`}>
             {status === 'approved' ? 'Approved' : status === 'rejected' ? 'Rejected' : 'Pending Approval'}
            </span>

              {status=='approved' && (
                <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Publish
                </button>
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
                <p className="text-xl font-bold">${totalPayments}</p>
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
                  <th className="py-2 px-4 border-b text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {salesData?.map((sale: SaleData, index: number) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="py-2 px-4 border-b">{sale.type}</td>
                    <td className="py-2 px-4 border-b">${sale.amount}</td>
                  </tr>
                ))}
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
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRegistrations?.map((registration: Registration, index: number) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="py-2 px-4 border-b">{registration.name}</td>
                    <td className="py-2 px-4 border-b">{registration.email}</td>
                    <td className="py-2 px-4 border-b">{registration.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventPage;
