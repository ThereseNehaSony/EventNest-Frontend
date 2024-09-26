import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { baseUrl } from '../../config/constants';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; 
import MapComponent from '../common/map';


const EventAddDetails: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
 
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [entryType, setEntryType] = useState<string>('');
  const [ticketDetails, setTicketDetails] = useState<{ type: string; seats: number; price: number ,ticketDescription:string}[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const eventState = useSelector((state: any) => state.admin.partialEventData);
  const host = useSelector((state:any)=>state.user?.user?.username)
  const {type} = useSelector((state:any)=>state.admin.partialEventData)

  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isFreeTicketModalOpen, setIsFreeTicketModalOpen] = useState<boolean>(false);
  const [isPaidTicketModalOpen, setIsPaidTicketModalOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [numberOfSeats, setNumberOfSeats] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [ticketType, setTicketType] = useState<string>(''); 
  const [ticketDescription, setTicketDescription] = useState<string>(''); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

   

  const navigate = useNavigate()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };
  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
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
    setTicketDetails([...ticketDetails, { type: 'Free', seats: numberOfSeats, price: 0 ,ticketDescription:ticketDescription}]);
    setNumberOfSeats(0);
    setIsFreeTicketModalOpen(false);
  };

  const handlePaidTicketSave = () => {
    if (ticketType && numberOfSeats > 0 && price > 0) {
      setTicketDetails([...ticketDetails, { type: ticketType, seats: numberOfSeats, price ,ticketDescription:ticketDescription}]);
      setNumberOfSeats(0);
      setPrice(0);
      setTicketType('');
      setTicketDescription('')
      setIsPaidTicketModalOpen(false);
    } else {
      setSuccessMessage('Please fill all the fields');
    }
  }
 
  const removeTicketType = (index: number) => {
    setTicketDetails((prevTicketDetails) => 
      prevTicketDetails.filter((_, i) => i !== index)
    );
  };
  const handleSubmit = async () => {
    // Validation
    if (!title || !category || !description || !startDate || !endDate || (entryType === 'Paid' && ticketDetails.length === 0)) {
      setErrorMessage('Please fill all the required fields.');
      return;
    }

    if (startDate >= endDate) {
      setErrorMessage('Start date must be less than end date.');
      return;
    }
    if (entryType === 'Paid' && ticketDetails.length === 0) {
      setErrorMessage('Please add at least one paid ticket type.');
      return;
    }

    let imageUrl = '';

    if (image) {
      const imageFormData = new FormData();
      imageFormData.append('file', image);
      imageFormData.append('upload_preset', 'wh4aph9u');
      imageFormData.append('folder', 'event-nest');

      try {
        const imageResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/dpq5c5q5u/image/upload`,
          imageFormData
        );
        imageUrl = imageResponse.data.secure_url;
      } catch (error) {
        console.error('Error uploading image:', error);
        setErrorMessage('Failed to upload image. Please try again.');
        return;
      }
    }

    const eventData = {
      title,
      category,
      description,
      host: host, 
      location: location || { lat: 0, lng: 0 },
      entryType,
      ticketDetails,
      startDate: startDate?.toISOString() || '',
      endDate: endDate?.toISOString() || '',
      image: imageUrl || '',
      type: type
    };

    try {
      const response = await axios.post(`${baseUrl}/event/add-event`, eventData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccessMessage('Event added successfully!');
      navigate('/success')
      setErrorMessage(null); 
    } catch (error) {
      console.error('Error adding event:', error);
      setErrorMessage('Failed to add event. Please try again.');
      setSuccessMessage(null); 
    }
  };
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Event Details</h2>

         
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 110-10 5 5 0 010 10z" />
              <path d="M8 10.293a1 1 0 001.415-1.415L8.707 8.707l-.707.707a1 1 0 000 1.415zM10 5a1 1 0 011 1v3a1 1 0 11-2 0V6a1 1 0 011-1z" />
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12h2v2H9v-2zm0-4h2v2H9V8zm0-3a7 7 0 100 14 7 7 0 000-14zM10 3a7 7 0 100 14 7 7 0 000-14z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}
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

          {/* Event Type */}
          <div className="mb-4">
            <label htmlFor="eventCategory" className="block text-sm font-medium text-gray-700 mb-2">Event Category</label>
            <input
              id="category"
               type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
             
            </input>
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
          <div className="mb-4">
  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
    Event Image
  </label>
  <div className="flex flex-col">
    <input
      id="image"
      type="file"
      onChange={handleImageUpload}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {image && (
      <div className="relative mt-4">
        <img
          src={URL.createObjectURL(image)}
          alt="Selected event"
          className="w-full h-48 object-cover rounded-md"
        />
        <button
          type="button"
          onClick={() => setImage(null)} // Reset the image
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 focus:outline-none hover:bg-red-600"
        >
          X
        </button>
      </div>
    )}
  </div>
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

          {/* Location */}
          {eventState.type !== 'online' && (
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Location Icon"
                  className="w-12 h-12 mr-4"
                />
                <button
                  onClick={handleLocationModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add Location
                </button>
              </div>
            </div>
          )}
            
          {/* Display Location */}
          {/* {location.address1 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Event Location</h3>
              <p>{location.address1}, {location.address2}</p>
              <p>{location.city}, {location.state}, {location.pincode}</p>
               */}
              
              {/* {location.googleMapLink && (
                 <p>
                   <a href={location.googleMapLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                     View on Google Maps
                  </a>
                 </p>
              )} */}


              {/* <button
                onClick={removeLocation}
                className="text-red-500 hover:text-red-700 mt-2"
              >
                Remove Location
              </button>
            </div>
          )} */}

          {/* Ticket Type */}
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Entry Type</label>
            <div className="flex space-x-4">
              <button
                onClick={() => handleTicketModal('Free')}
                className={`px-4 py-2 rounded-lg ${entryType === 'Free' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
              >
                Free
              </button>
              <button
                onClick={() => handleTicketModal('Paid')}
                className={`px-4 py-2 rounded-lg ${entryType === 'Paid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
              >
                Paid
              </button>
            </div>
          </div> */}

          {/* Ticket Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Entry Type</label>
            <div className="flex space-x-4">
              <button
                onClick={() => handleTicketModal('Free')}
                className={`px-4 py-2 rounded-lg ${entryType === 'Free' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
              >
                Free
              </button>
              <button
                onClick={() => handleTicketModal('Paid')}
                className={`px-4 py-2 rounded-lg ${entryType === 'Paid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
              >
                Paid
              </button>
            </div>
          </div>

          {ticketDetails.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Added Ticket Types</h3>
              <ul>
                {ticketDetails.map((ticket, index) => (
                  <li key={index} className="flex justify-between mb-2">
                    <span>{ticket.type}</span>
                    <span>{ticket.ticketDescription}</span>
                    <span>{ticket.seats} Seats - ₹{ticket.price}</span>
                    <button
                      onClick={() => removeTicketType(index)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>

      
      {isLocationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Add Location</h3>
             <MapComponent onLocationSelect={handleLocationSelect} />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleLocationSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Free Ticket Modal */}
      {isFreeTicketModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
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
                onClick={handleFreeTicketSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsFreeTicketModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paid Ticket Modal */}
      {isPaidTicketModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
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
              <label htmlFor="ticketDescription" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                id="ticketDescription"
                type="text"
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
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
                onClick={handlePaidTicketSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsPaidTicketModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


    </section>
  );
};

export default EventAddDetails;
