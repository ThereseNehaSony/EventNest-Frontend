import React from 'react';

interface EventSearchFilterProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filters: { type: string; entryType: string };
  setFilters: React.Dispatch<React.SetStateAction<{ type: string; entryType: string }>>;
}

const EventSearchFilter: React.FC<EventSearchFilterProps> = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center space-x-4 mb-8">
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search events by name"
        className="px-4 py-2 border border-gray-300 rounded-lg"
      />

      {/* Filter by Event Type */}
      <select
        name="type"
        value={filters.type}
        onChange={handleFilterChange}
        className="px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="all">All Events</option>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </select>

      {/* Filter by Entry Type */}
      <select
        name="entryType"
        value={filters.entryType}
        onChange={handleFilterChange}
        className="px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="all">All Tickets</option>
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>
    </div>
  );
};

export default EventSearchFilter;
