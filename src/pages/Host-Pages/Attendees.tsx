import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/userSidebar'; // Assuming Sidebar component is already created
import { baseUrl } from '../../config/constants';

const AttendeesPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAttendees = async () => {
//       try {
//         const response = await axios.get(`${baseUrl}/event/${eventId}/attendees`);
//         setAttendees(response.data.attendees);
//       } catch (error) {
//         setError('Error fetching attendees.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttendees();
//   }, [eventId]);

//   if (loading) {
//     return <div className="text-center mt-12">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-600 mt-12">{error}</div>;
//   }

return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Attendees List</h1>

        {/* Attendees table */}
        {attendees.length == 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-right">Amount Paid</th>
                  <th className="py-3 px-6 text-right">Booking Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {attendees.map((attendee, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 hover:bg-gray-100 transition duration-300 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="py-4 px-6 text-left">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-800">{attendee.userName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-left text-gray-600">{attendee.email}</td>
                    <td className="py-4 px-6 text-right text-green-500 font-semibold">
                      ${attendee.amountPaid.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-right text-gray-500">
                      {new Date(attendee.bookingDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-12 text-center text-gray-500">No attendees found for this event.</div>
        )}
      </div>
    </div>
  );
};
export default AttendeesPage;
