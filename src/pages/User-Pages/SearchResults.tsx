// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { baseUrl } from '../../config/constants';
// import EventCard from '../../components/events/eventCard';

// interface Event {
//     _id: string;
//     title?: string;
//     category?: string;
//     host?: string;
//     image?: string;
//     startDate?: string;
//     price?: string;
//   }

// const EventSearchResults = () => {
//   const location = useLocation();
//   const [events, setEvents] = useState<Event[]>([]);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const query = params.get('query');

//     if (query) {
//       axios.get(`${baseUrl}/event/search/event?query=${query}`)
//         .then(response => {
//           setEvents(response.data.events);
//         })
//         .catch(error => {
//           console.error('Error fetching events', error);
//         });
//     }
//   }, [location.search]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      
//       {events.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {events.map((event) => (
//             <EventCard key={event._id} event={event} />
//           ))}
//         </div>
//       ) : (
//         <p>No events found for your search.</p>
//       )}
//     </div>
//   );
// };

// export default EventSearchResults;
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import EventCard from '../../components/events/eventCard';

import { baseUrl } from '../../config/constants';
import { BsChevronDown } from 'react-icons/bs';

// Event interface to match the event structure
interface Event {
  _id: string;
  title?: string;
  category?: string;
  host?: string;
  image?: string;
  startDate?: string;
  price?: string;
}

const EventSearchResults: React.FC = () => {
  const location = useLocation();
  const [events, setEvents] = useState<Event[]>([]); // Explicitly typing events as an array of Event
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    priceRange: '',
  });
  const [isAccordionOpen, setIsAccordionOpen] = useState({
    category: true,
    startDate: true,
    priceRange: true,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    if (query) {
      axios.get<{ events: Event[] }>(`${baseUrl}/event/search/event?query=${query}`)
        .then(response => {
          setEvents(response.data.events);
        })
        .catch(error => {
          console.error('Error fetching events', error);
        });
    }
  }, [location.search]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const toggleAccordion = (section: 'category' | 'startDate' | 'priceRange') => {
    setIsAccordionOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section], // TypeScript now knows this is a valid key
    }));
  };
  

  const filteredEvents = events.filter(event => {
    return (
      (filters.category === '' || event.category === filters.category) &&
      (filters.startDate === '' || new Date(event.startDate!) >= new Date(filters.startDate)) &&
      (filters.priceRange === '' || (event.price && parseFloat(event.price) <= parseFloat(filters.priceRange)))
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Event Search Results</h1>
      <div className="flex">
        {/* Filters Section */}
        <aside className="w-1/4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Filters</h2>

          {/* Category Filter */}
          <div className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion('category')}
            >
              <h3 className="font-medium text-gray-600">Category</h3>
              <BsChevronDown
                className={`transition-transform ${
                  isAccordionOpen.category ? 'rotate-180' : ''
                }`}
              />
            </div>
            {isAccordionOpen.category && (
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full mt-2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Music">Music</option>
                <option value="Technology">Technology</option>
                <option value="Art">Art</option>
                <option value="Sports">Sports</option>
                <option value="Education">Education</option>
              </select>
            )}
          </div>

          {/* Start Date Filter */}
          <div className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion('startDate')}
            >
              <h3 className="font-medium text-gray-600">Start Date</h3>
              <BsChevronDown
                className={`transition-transform ${
                  isAccordionOpen.startDate ? 'rotate-180' : ''
                }`}
              />
            </div>
            {isAccordionOpen.startDate && (
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full mt-2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          {/* Price Range Filter */}
          <div className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion('priceRange')}
            >
              <h3 className="font-medium text-gray-600">Price Range (Max)</h3>
              <BsChevronDown
                className={`transition-transform ${
                  isAccordionOpen.priceRange ? 'rotate-180' : ''
                }`}
              />
            </div>
            {isAccordionOpen.priceRange && (
              <input
                type="number"
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                placeholder="Enter max price"
                className="w-full mt-2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>

          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors mt-4"
            onClick={() => console.log('Apply Filters clicked')}
          >
            Apply Filters
          </button>
        </aside>

        {/* Results Section */}
        <div className="w-3/4 pl-8">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-8">No events found for your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSearchResults;
