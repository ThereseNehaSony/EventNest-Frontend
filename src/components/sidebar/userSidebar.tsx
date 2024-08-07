import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <nav className="bg-cyan-900 text-white w-64 h-full p-4">
      <div className="sticky top-0">
        <div className="ml-12 mt-8">
          <a href="#" className="block py-2 px-4 font-bold"> My Account</a>
          <ul className="pl-4">
            <li>
              <Link to="/profile" className="block py-2 px-4 hover:text-gray-400">Profile</Link>
            </li>
            
            <li>
              <Link to="/change-password" className="block py-2 px-4 hover:text-gray-400">Change Password</Link>
            </li>
            <li>
              <Link to="/wallet" className="block py-2 px-4 hover:text-gray-400">Wallet</Link>
            </li>
           
          </ul>
          <a href="#" className="block py-2 px-4 font-bold mt-4">My Bookings</a>
          <ul className="pl-4">
            <li>
              <Link to="/upcoming-events" className="block py-2 px-4 hover:text-gray-400">Upcoming Events</Link>
            </li>
            <li>
              <Link to="/past-events" className="block py-2 px-4 hover:text-gray-400">Past Events</Link>
            </li>
            {/* <li>
              <Link to="/cancellations" className="block py-2 px-4 hover:text-gray-400">Cancellations</Link>
            </li> */}
          </ul>
          
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
