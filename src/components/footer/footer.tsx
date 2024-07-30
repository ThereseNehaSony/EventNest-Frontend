import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6 mt-9">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h5 className="text-lg font-semibold mb-4">EVENTNEST</h5>
          <p className="text-sm">Your Gateway
          to Unforgettable Events.</p>
        </div>
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h5 className="text-lg font-semibold mb-4">Services</h5>
          <ul className="text-sm">
            <li className="mb-2"><a href="#" className="hover:text-gray-200">Event Hosting</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-200">Event Booking</a></li>
            
          </ul>
        </div>
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h5 className="text-lg font-semibold mb-4">Follow Us On</h5>
          <ul className="text-sm">
            <li className="mb-2"><a href="#" className="hover:text-gray-200">FACEBOOK</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-200">INSTAGRAM</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-200">TWITTER</a></li>
            
          </ul>
        </div>
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h5 className="text-lg font-semibold mb-4">Company</h5>
          <ul className="text-sm">
            <li className="mb-2"><a href="#" className="hover:text-gray-200">ABOUT US</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-200">Privacy Policy</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-200">CONTACT US</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-200">JOIN US</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
