import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { baseUrl } from '../../config/constants';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { log } from 'console';

const EventAddDetails: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Conference');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<{ address1: string; address2: string; city: string; state: string; pincode: string; googleMapLink: string }>({
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    googleMapLink: ''
  });
  const [entryType, setEntryType] = useState<string>('Free');
  const [ticketDetails, setTicketDetails] = useState<{ type: string; seats: number; price: number }[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const eventState = useSelector((state: any) => state.admin.partialEventData);
  const host = useSelector((state: any) => state.user.user.username);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isFreeTicketModalOpen, setIsFreeTicketModalOpen] = useState<boolean>(false);
  const [isPaidTicketModalOpen, setIsPaidTicketModalOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [numberOfSeats, setNumberOfSeats] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [ticketType, setTicketType] = useState<string>('');

  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  

  const handleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };

  const handleTicketModal = (type: string) => {
    setEntryType(type);
    if (type === 'Free') {
      setIsFreeTicketModalOpen(true);
    } else if (type === 'Paid') {
      setIsPaidTicketModalOpen(true);
    }
  };

  const handleLocationSave = () => {
    setIsLocationModalOpen(false);
  };

  const handleFreeTicketSave = () => {
    setTicketDetails([...ticketDetails, { type: 'Free', seats: numberOfSeats, price: 0 }]);
    setNumberOfSeats(0);
    setIsFreeTicketModalOpen(false);
  };

  const handlePaidTicketSave = () => {
    setTicketDetails([...ticketDetails, { type: ticketType, seats: numberOfSeats, price }]);
    setNumberOfSeats(0);
    setPrice(0);
    setTicketType('');
    setIsPaidTicketModalOpen(false);
  };
 
 
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('location', JSON.stringify(location));
    formData.append('entryType', entryType);
    formData.append('ticketDetails', JSON.stringify(ticketDetails));
    formData.append('startDate', startDate ? startDate.toISOString() : '');
    formData.append('endDate', endDate ? endDate.toISOString() : '');
    formData.append('type', eventState.type);
    formData.append('host', host);
    if (image) {
      formData.append('image', image);
    }
    
    
    try {
      const response = await axios.post(`${baseUrl}/event/add-event`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      
      });
      setSuccessMessage('Event added successfully!');
      setTimeout(() => {
        navigate('/success'); // Redirect after a short delay
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Event Details</h2>

          {/* Event Name */}
          <div className="mb-4">
            <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the event title"
            />
          </div>

          {/* Event Category */}
          <div className="mb-4">
            <label htmlFor="eventCategory" className="block text-sm font-medium text-gray-700 mb-2">Event Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            />
          </div>

          {/* Event Start and End Date/Time */}
          <div className="flex mb-4 space-x-4">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Event Starts</label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="Select start date and time"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">Event Ends</label>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="Select end date and time"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          {eventState.type !== 'online' && (
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Map"
                  className="mr-2"
                />
                <button
                  type="button"
                  onClick={handleLocationModal}
                  className="text-blue-500 underline"
                >
                  Add Location
                </button>
              </div>
            </div>
          )}

          {/* Entry Type */}
          <div className="mb-4">
            <label htmlFor="entryType" className="block text-sm font-medium text-gray-700 mb-2">Entry Type</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleTicketModal('Free')}
                className={`px-4 py-2 rounded-lg ${entryType === 'Free' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Free
              </button>
              <button
                type="button"
                onClick={() => handleTicketModal('Paid')}
                className={`px-4 py-2 rounded-lg ${entryType === 'Paid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Paid
              </button>
            </div>
          </div>

          {/* Save and Submit */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save and Submit
            </button>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Add Location</h3>
            <div className="mb-4">
              <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
              <input
                id="address1"
                type="text"
                value={location.address1}
                onChange={(e) => setLocation({ ...location, address1: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
              <input
                id="address2"
                type="text"
                value={location.address2}
                onChange={(e) => setLocation({ ...location, address2: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                id="city"
                type="text"
                value={location.city}
                onChange={(e) => setLocation({ ...location, city: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input
                id="state"
                type="text"
                value={location.state}
                onChange={(e) => setLocation({ ...location, state: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
              <input
                id="pincode"
                type="text"
                value={location.pincode}
                onChange={(e) => setLocation({ ...location, pincode: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="googleMapLink" className="block text-sm font-medium text-gray-700 mb-2">Google Maps Location</label>
              <input
                id="googleMapLink"
                type="text"
                value={location.googleMapLink}
                onChange={(e) => setLocation({ ...location, googleMapLink: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleLocationSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleLocationModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Free Ticket Modal */}
      {isFreeTicketModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Add Free Ticket</h3>
            <div className="mb-4">
              <label htmlFor="numberOfSeats" className="block text-sm font-medium text-gray-700 mb-2">Number of Seats</label>
              <input
                id="numberOfSeats"
                type="number"
                value={numberOfSeats}
                onChange={(e) => setNumberOfSeats(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleFreeTicketSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsFreeTicketModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paid Ticket Modal */}
      {isPaidTicketModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Add Paid Ticket</h3>
            <div className="mb-4">
              <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700 mb-2">Ticket Type</label>
              <input
                id="ticketType"
                type="text"
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="numberOfSeats" className="block text-sm font-medium text-gray-700 mb-2">Number of Seats</label>
              <input
                id="numberOfSeats"
                type="number"
                value={numberOfSeats}
                onChange={(e) => setNumberOfSeats(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handlePaidTicketSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsPaidTicketModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-green-500 text-white text-center">
          {successMessage}
        </div>
      )}
    </section>
  );
};

export default EventAddDetails;
