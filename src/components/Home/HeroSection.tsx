import React from 'react';
// import firstimage from '../../assets/Screenshot_2024-06-20_120710-removebg-preview.png'

const firstimage = '/bg-1.jpg'; 

const HeroSection: React.FC = () => {
    return (
        <section id="hero" className="hero bg-teal-800 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column */}
              <div className="order-2 lg:order-1 flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  <span className='text-white ml-1'>JOIN </span>
                  <h2>
                  <span className="text-red-400 ml-6">HOST</span></h2>
                  <span className="text-red-400 ml-11"> CELEBRATE</span>
                </h2>
               
                <div className="flex">
                  
                 
                 
                </div>
              </div>
    
              {/* Right Column */}
              <div className="order-1 lg:order-2">
                <img
                  src={firstimage}
                  alt="Hero Image"
                  className="lg:max-w-full md:max-w-3/4 max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
    
          {/* Icon Boxes */}
          <div className="icon-boxes py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Icon Box 1 */}
                <div className="icon-box bg-white p-6 rounded-lg shadow-lg text-center">
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
                  <h4 className="text-lg font-bold mb-2">EVENTS</h4>
                 
                </div>
    
                {/* Icon Box 2 */}
                <div className="icon-box bg-white p-6 rounded-lg shadow-lg text-center">
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
                  <h4 className="text-lg font-bold mb-2">SPORTS</h4>
                  
                </div>
    
                {/* Icon Box 3 */}
                <div className="icon-box bg-white p-6 rounded-lg shadow-lg text-center">
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
                  <h4 className="text-lg font-bold mb-2">TALKS</h4>
                  
                </div>
    
                {/* Icon Box 4 */}
                <div className="icon-box bg-white p-6 rounded-lg shadow-lg text-center">
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
                  <h4 className="text-lg font-bold mb-2">ACTIVITIES</h4>
                 
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    };

export default HeroSection;
