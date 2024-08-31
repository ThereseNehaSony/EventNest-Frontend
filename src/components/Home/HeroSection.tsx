import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../config/constants';
import { ClipLoader } from 'react-spinners';

const firstimage = '/bg-8.png';

interface Category {
  _id: string;
  name: string;
}

const HeroSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/event/show-categories`);
        setCategories(response.data);
      } catch (error) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Determine the number of columns based on the number of categories
  const getGridTemplateColumns = () => {
    if (categories.length === 1) return 'repeat(1, minmax(0, 1fr))';
    if (categories.length === 2) return 'repeat(2, minmax(0, 1fr))';
    if (categories.length === 3) return 'repeat(3, minmax(0, 1fr))';
    return 'repeat(4, minmax(0, 1fr))'; // Default to 4 columns
  };

  return (
    <section id="hero" className="hero bg-teal-800 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className='text-white ml-1'>JOIN </span>
              <h2>
                <span className="text-red-400 ml-6">HOST</span></h2>
              <span className="text-red-400 ml-11"> CELEBRATE</span>
            </h2>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src={firstimage}
              alt="Hero Image"
              className="lg:max-w-full md:max-w-3/4 max-w-md mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="icon-boxes py-16">
  <div className="container mx-auto px-4">
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : (
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: getGridTemplateColumns() }}
      >
        {categories.map((category) => (
          <div key={category._id} className="icon-box bg-white p-6 rounded-lg shadow-lg text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7 5a1 1 0 011-1h4a1 1 0 011 1v1h3a1 1 0 110 2h-1v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8H4a1 1 0 110-2h3V5zm5-2H8a3 3 0 00-3 3v1h10V6a3 3 0 00-3-3zm-1 11h-2v2a1 1 0 112 0v-2z"
                clipRule="evenodd"
              />
            </svg>
            <h4 className="text-lg font-bold mb-2">{category.name.toUpperCase()}</h4>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

    </section>
  );
};

export default HeroSection;


