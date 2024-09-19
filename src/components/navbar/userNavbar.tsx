// import React, { useState } from 'react';
// import { Link, useNavigate  } from 'react-router-dom';
// import { BiChevronDown } from 'react-icons/bi';
// import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
// import './Navbar.css';
// import { AppDispatch } from '../../redux/store';
// import { useSelector, useDispatch } from 'react-redux';
// // import logo from '../../assets/eventnest logo.webp'
// import { logout,fetchAdditionalUserDetails } from '../../redux/actions/userActions';

// const logo ='/bg-1.jpg'; 
// const Navbar: React.FC = () => {

//   const user = useSelector((state: any) => state.user.user);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   return (
//     <div className="bg-gray-800 text-white">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         <Link to='/' className="flex items-center">
//           <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
//           <h1 className="text-2xl font-bold">Event Nest</h1>
//         </Link>

//         <nav className={`md:flex md:items-center ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
//           <ul className="md:flex md:space-x-4">
//             <li>
//               <Link to="/find-events" className="block py-2 px-4 hover:text-gray-400">Find Events</Link>
//             </li>
//             {!user ? (
//               <>
//               <li>
//                   <Link to="/host/event-home" className="block py-2 px-4 hover:text-gray-400">Create Events</Link>
//                 </li>
//                 <li>
//                   <Link to="/login" className="block py-2 px-4 hover:text-gray-400">Login</Link>
//                 </li>
//                 <li>
//                   <Link to="/signup" className="block py-2 px-4 hover:text-gray-400">Sign Up</Link>
//                 </li>
//               </>
//             ) : (
//               <>
               
//                 <li>
//                   <Link to="/profile" className="block py-2 px-4 hover:text-gray-400">{user.username}</Link>
//                 </li>
//                 <li>
//                   <button  onClick={handleLogout} className="block py-2 px-4 hover:text-gray-400">Logout</button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>

//         <div className="md:hidden">
//           <button onClick={toggleMobileMenu} className="text-2xl">
//             {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

// };

// export default Navbar;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { BiChevronDown } from 'react-icons/bi';
// import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
// import './Navbar.css';
// import { AppDispatch } from '../../redux/store';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../redux/actions/userActions';

// const logo = '/bg-1.jpg'; 

// const Navbar: React.FC = () => {
//   const user = useSelector((state: any) => state.user.user);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   const handleProfileNavigation = () => {
//     if (user?.role === 'host') {
//       navigate('/host/profile');
//     } else {
//       navigate('/profile');
//     }
//   };

  
//   return (
//     <div className="bg-gray-800 text-white">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         <Link to='/' className="flex items-center">
//           <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
//           <h1 className="text-2xl font-bold">Event Nest</h1>
//         </Link>

//         <nav className={`md:flex md:items-center ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
//           <ul className="md:flex md:space-x-4">
//             <li>
//               <Link to="/find-events" className="block py-2 px-4 hover:text-gray-400">Find Events</Link>
//             </li>
            
//             {!user ? (
//               <>
//                 <li>
//                   <Link to="/host/event-home" className="block py-2 px-4 hover:text-gray-400">Create Events</Link>
//                 </li>
//                 <li>
//                   <Link to="/signup" className="block py-2 px-4 hover:text-gray-400">Sign Up</Link>
//                 </li>
//                 <li>
//                   <Link to="/login" className="block py-2 px-4 hover:text-gray-400">Login</Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 {user.role === 'host' && (
//                   <li>
//                     <Link to="/host/home" className="block py-2 px-4 hover:text-gray-400">Create Events</Link>
//                   </li>
//                 )}
//                 <li>
//                   <button 
//                     onClick={handleProfileNavigation}
//                     className="block py-2 px-4 hover:text-gray-400"
//                   >
//                     {user.username}
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={handleLogout} className="block py-2 px-4 hover:text-gray-400">Logout</button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>

//         <div className="md:hidden">
//           <button onClick={toggleMobileMenu} className="text-2xl">
//             {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import './Navbar.css';
import { AppDispatch } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';

const logo = '/bg-1.jpg';

const Navbar: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleProfileNavigation = () => {
    if (user?.role === 'host') {
      navigate('/host/profile');
    } else {
      navigate('/profile');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("serched...")
      navigate(`/results?query=${searchQuery}`);
    }
  };

  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Event Nest</h1>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 mx-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search events..."
            className="w-full p-2 rounded-lg text-black"
          />
        </form>

        <nav className={`md:flex md:items-center ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="md:flex md:space-x-4">
            <li>
              <Link to="/find-events" className="block py-2 px-4 hover:text-gray-400">
                Find Events
              </Link>
            </li>

            {!user ? (
              <>
                <li>
                  <Link to="/host/event-home" className="block py-2 px-4 hover:text-gray-400">
                    Create Events
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="block py-2 px-4 hover:text-gray-400">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="block py-2 px-4 hover:text-gray-400">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                {user.role === 'host' && (
                  <li>
                    <Link to="/host/home" className="block py-2 px-4 hover:text-gray-400">
                      Create Events
                    </Link>
                  </li>
                )}
                <li>
                  <button onClick={handleProfileNavigation} className="block py-2 px-4 hover:text-gray-400">
                    {user.username}
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="block py-2 px-4 hover:text-gray-400">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-2xl">
            {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
