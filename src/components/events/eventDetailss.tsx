// // EventDetailsPage.tsx
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import Sidebar from '../sidebar/eventSidebar'; // Adjust the path as necessary

// const EventDetailsPage: React.FC = () => {
//   const [eventName, setEventName] = useState<string>('Sample Event');
//   const [eventType, setEventType] = useState<string>('Conference');
//   const [description, setDescription] = useState<string>('This is a sample event description.');
//   const [image, setImage] = useState<File | null>(null);
//   const [location, setLocation] = useState<string>('Sample Location');
//   const [ticketType, setTicketType] = useState<string>('Free');
//   const [startDate, setStartDate] = useState<Date | null>(new Date());
//   const [endDate, setEndDate] = useState<Date | null>(new Date());
//   const [isApproved, setIsApproved] = useState<boolean>(true);
//   const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
//   const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleLocationModal = () => {
//     setIsLocationModalOpen(!isLocationModalOpen);
//   };

//   const handleTicketModal = () => {
//     setIsTicketModalOpen(!isTicketModalOpen);
//   };

//   const handleEdit = () => {
//     // Add your edit functionality here
//     console.log('Edit event');
//   };

//   const handleDelete = () => {
//     // Add your delete functionality here
//     console.log('Delete event');
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       {/* <Sidebar eventId={eventId}/> */}

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-gray-100">
//         <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">Event Details</h2>

//           {/* Event Name */}
//           <div className="mb-4">
//             <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
//             <input
//               id="eventName"
//               type="text"
//               value={eventName}
//               onChange={(e) => setEventName(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter the event name"
//               readOnly
//             />
//           </div>

//           {/* Event Type */}
//           <div className="mb-4">
//             <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
//             <select
//               id="eventType"
//               value={eventType}
//               onChange={(e) => setEventType(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             //   readOnly
//             >
//               <option value="Conference">Conference</option>
//               <option value="Webinar">Webinar</option>
//               <option value="Workshop">Workshop</option>
//               <option value="Meetup">Meetup</option>
//               <option value="Seminar">Seminar</option>
//             </select>
//           </div>

//           {/* Description */}
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Describe the event"
//               rows={4}
//               readOnly
//             />
//           </div>

//           {/* Event Start and End Date/Time */}
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <div className="flex-1">
//               <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Event Starts</label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date: Date | null) => setStartDate(date)}
//                 showTimeSelect
//                 dateFormat="Pp"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
//                 placeholderText="Select start date and time"
//                 readOnly
//               />
//             </div>
//             <div className="flex-1">
//               <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">Event Ends</label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date: Date | null) => setEndDate(date)}
//                 showTimeSelect
//                 dateFormat="Pp"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
//                 placeholderText="Select end date and time"
//                 readOnly
//               />
//             </div>
//           </div>

//           {/* Location */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//             <div className="flex items-center">
//               <p className="text-gray-700">{location || "No location added"}</p>
//               <button
//                 onClick={handleLocationModal}
//                 className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//               >
//                 Edit Location
//               </button>
//             </div>
//           </div>

//           {/* Ticket Type */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Type</label>
//             <p className="text-gray-700">{ticketType}</p>
//             <button
//               onClick={handleTicketModal}
//               className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//             >
//               Edit Ticket Type
//             </button>
//           </div>

//           {/* Event Image */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
//             {image ? (
//               <img
//                 src={URL.createObjectURL(image)}
//                 alt="Event"
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//             ) : (
//               <p className="text-gray-700">No image uploaded</p>
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="mt-4"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between">
//             <button
//               onClick={handleEdit}
//               className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
//             >
//               Edit
//             </button>
//             <button
//               onClick={handleDelete}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Location Modal */}
//         {isLocationModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
//               <button
//                 onClick={handleLocationModal}
//                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Location</h2>
//               {/* Location Details Form */}
//               {/* Similar form as the one used for adding location */}
//               <button
//                 onClick={handleLocationModal}
//                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//               >
//                 Save Location
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Ticket Modal */}
//         {isTicketModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
//               <button
//                 onClick={handleTicketModal}
//                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Ticket Type</h2>
//               {/* Ticket Type Details Form */}
//               {/* Similar form as the one used for adding ticket types */}
//               <button
//                 onClick={handleTicketModal}
//                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//               >
//                 Save Ticket Type
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default EventDetailsPage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { baseUrl } from '../../config/constants';
import EventSidebar from '../sidebar/eventSidebar'; // Adjust the path as necessary
// Adjust the base URL as necessary

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventName, setEventName] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string | null>(null); // Changed to string to store image URL
  const [location, setLocation] = useState<string>('');
  const [ticketType, setTicketType] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (!eventId) {
          throw new Error('Event ID is missing');
        }
        const response = await axios.get(`${baseUrl}/event/${eventId}`);
        const data = response.data;
        setEventName(data.title);
        setEventType(data.type);
        setDescription(data.description);
        setImage(data.imageUrl); // Assuming the backend provides a URL to the image
        setLocation(data.location);
        setTicketType(data.ticketType);
        setStartDate(new Date(data.startDate));
        setEndDate(new Date(data.endDate));
        setIsApproved(data.isApproved);
      } catch (error) {
        setError('Error fetching event details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };

  const handleTicketModal = () => {
    setIsTicketModalOpen(!isTicketModalOpen);
  };

  const handleEdit = () => {
    // Add your edit functionality here
    console.log('Edit event');
  };

  const handleDelete = () => {
    // Add your delete functionality here
    console.log('Delete event');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      {eventId && <EventSidebar eventId={eventId} />}

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Event Details</h2>

          {/* Event Name */}
          <div className="mb-4">
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input
              id="eventName"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the event name"
              readOnly
            />
          </div>

          {/* Event Type */}
          <div className="mb-4">
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <select
              id="eventType"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              // readOnly
            >
              <option value="Conference">Conference</option>
              <option value="Webinar">Webinar</option>
              <option value="Workshop">Workshop</option>
              <option value="Meetup">Meetup</option>
              <option value="Seminar">Seminar</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the event"
              rows={4}
              readOnly
            />
          </div>

          {/* Event Start and End Date/Time */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Event Starts</label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholderText="Select start date and time"
                readOnly
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">Event Ends</label>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholderText="Select end date and time"
                readOnly
              />
            </div>
          </div>

          {/* Location */}
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="flex items-center">
              <p className="text-gray-700">{location || "No location added"}</p>
              <button
                onClick={handleLocationModal}
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Edit Location
              </button>
            </div>
          </div> */}

          {/* Ticket Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Type</label>
            <p className="text-gray-700">{ticketType}</p>
            <button
              onClick={handleTicketModal}
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Edit Ticket Type
            </button>
          </div>

          {/* Event Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
            {image ? (
              <img
                src={image} // Assuming the backend provides a URL to the image
                alt="Event"
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-700">No image uploaded</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-4"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Location Modal */}
        {isLocationModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
              <button
                onClick={handleLocationModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Location</h2>
              {/* Location Details Form */}
              {/* Similar form as the one used for adding location */}
              <button
                onClick={handleLocationModal}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save Location
              </button>
            </div>
          </div>
        )}

        {/* Ticket Modal */}
        {isTicketModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
              <button
                onClick={handleTicketModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Ticket Type</h2>
              {/* Ticket Type Details Form */}
              {/* Similar form as the one used for adding ticket types */}
              <button
                onClick={handleTicketModal}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save Ticket Type
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EventDetailsPage;
