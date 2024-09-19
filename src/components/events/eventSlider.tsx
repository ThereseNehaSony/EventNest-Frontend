import React, { useEffect, useState } from 'react';
import EventCard from './eventCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../redux/actions/adminActions';
import { AppDispatch } from '../../redux/store';

interface EventData {
  _id: string;
  title: string;
  host: string;
  image: string;
  startDate: string;
  price: string;
  type: 'online' | 'offline';
  isPublished: boolean;
  entryType: 'Free' | 'Paid';
  category: string;  // Adding category field to EventData
}

const EventSlider: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: { admin: { events: EventData[] } }) => state.admin.events);

  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // Category filter

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const isThisWeekend = (date: string) => {
    const eventDate = new Date(date);
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 5)); // Start of weekend (Friday)
    const endOfWeek = new Date(now.setDate(now.getDate() + 2)); // End of weekend (Sunday)

    return eventDate >= startOfWeek && eventDate <= endOfWeek;
  };

  useEffect(() => {
    let result = events.filter(event => event.isPublished); // Show only published events

    switch (activeFilter) {
      case 'online':
        result = result.filter(event => event.type === 'online');
        break;
      case 'offline':
        result = result.filter(event => event.type === 'offline');
        break;
      case 'free':
        result = result.filter(event => event.entryType === 'Free');
        break;
      case 'paid':
        result = result.filter(event => event.entryType === 'Paid');
        break;
      case 'thisWeekend':
        result = result.filter(event => isThisWeekend(event.startDate));
        break;
      default:
        break;
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(event => event.category === selectedCategory);
      console.log(selectedCategory,"selected");
      
    }

    setFilteredEvents(result);
  }, [activeFilter, selectedCategory, events]); // Include selectedCategory

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 border rounded-lg ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveFilter('all')}
        >
          All Events
        </button>
        <button
          className={`px-4 py-2 border rounded-lg ${activeFilter === 'online' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveFilter('online')}
        >
          Online
        </button>
        <button
          className={`px-4 py-2 border rounded-lg ${activeFilter === 'offline' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveFilter('offline')}
        >
          Offline
        </button>
        <button
          className={`px-4 py-2 border rounded-lg ${activeFilter === 'free' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveFilter('free')}
        >
          Free
        </button>
        <button
          className={`px-4 py-2 border rounded-lg ${activeFilter === 'paid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveFilter('paid')}
        >
          Paid
        </button>
        <button
          className={`px-4 py-2 border rounded-lg ${activeFilter === 'thisWeekend' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveFilter('thisWeekend')}
        >
          This Weekend
        </button>
      </div>
{/* Category Filter Dropdown */}
<div className="mb-4 flex items-center space-x-4">
  <p className="font-medium">Browse by category</p>
  <select
    className="p-2 border rounded-lg"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option value="all">All Categories</option>
    <option value="music">Music</option>
    <option value="tech">Tech</option>
    <option value="sports">Sports</option>
    {/* Add more categories as needed */}
  </select>
</div>

      {/* Display Filtered Events */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p className="text-xl font-medium">No events found</p>
          <p className="mt-2 text-lg">Try adjusting your filters or search query!</p>
        </div>
      )}
    </div>
  );
};

export default EventSlider;
