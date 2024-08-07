import React from 'react';
  
import { Link,useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiAlignCenter , FiCast  } from 'react-icons/fi';
import { IoIosPeople } from "react-icons/io";
import { MdPayment,MdLogout  } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
// import logo from '../../assets/eventnest logo.webp'
import { logout } from '../../redux/actions/userActions';

const Sidebar = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <div className="bg-gray-800 text-gray-100 w-64 flex-shrink-0 h-screen fixed">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      </div>
      <nav className="p-4">
        <ul>
        <li className="my-2">
            <Link to="/admin/admindashboard" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700">
              <FiHome className="w-6 h-6 mr-2" />
              Dashboard
            </Link>
          </li>
          <li className="my-2">
            <Link to="/admin/categories" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700">
              <FiAlignCenter className="w-6 h-6 mr-2" />
              Categories
            </Link>
          </li>
          <li className="my-2">
          <Link to="/admin/users" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700">
              <FiUsers className="w-6 h-6 mr-2" />
              Users
            </Link>
          </li>
          <li className="my-2">
          <Link to="/admin/hosts" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700">
              <IoIosPeople className="w-6 h-6 mr-2" />
              Hosts
            </Link>
          </li>
          
          <li className="my-2">
            <Link to="/admin/events" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700">
              <FiCast className="w-6 h-6 mr-2" />
              Events
            </Link>
          </li>
          <li className="my-2">
          <Link to="/admin/payments" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700">
              <MdPayment className="w-6 h-6 mr-2" />
              Payments
            </Link>
          </li>
          
          <li>
            <button onClick={handleLogout} className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-700">
            <MdLogout className="w-6 h-6 mr-2" />
             Logout
           </button>
          </li>
        
         
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
