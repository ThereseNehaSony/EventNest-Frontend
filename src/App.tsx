// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes,Navigate, useNavigate  } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import toast, { Toaster } from 'react-hot-toast';

// import './App.css';
// import { makeErrorDisable } from './redux/reducers/user/userSlice';
// import { IUserSelector } from "./interface/IUserSlice";
// import { AppDispatch } from "./redux/store";

// import Navbar from "./components/navbar/userNavbar";
// import UserSignup from './pages/User-Pages/UserSignup';
// import UserLogin from './pages/User-Pages/UserLogin';
// import HostLogin from './pages/Host-Pages/HostLogin';
// import HostSignup from './pages/Host-Pages/HostSignup';
// import LoginPage from './pages/Admin-pages/LoginPage';
// import UserHome from './pages/User-Pages/UserHome';
// import EventHome from './pages/Host-Pages/Event-home';
// import Footer from './components/footer/footer';
// import Sidebar from './components/sidebar/sidebar';
// import AdminUser from './pages/Admin-pages/Userpage';
// import Hostpage from './pages/Admin-pages/Hostpage';
// import Events from './pages/Admin-pages/Events';
// import HostRequests from './pages/Admin-pages/HostRequests';
// import HostDetailsPage from './pages/Admin-pages/HostDetails';
// import ForgotPassword from './components/passwords/ForgotPassword';
// import OtpVerification from './components/otp/OtpVerification';
// import ChangePassword from './components/passwords/ChangePassword';

// function App() {
//   const { user, error } = useSelector((state: IUserSelector) => state.user);
//   const dispatch = useDispatch<AppDispatch>();


//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       setTimeout(() => {
//         dispatch(makeErrorDisable());
//       }, 5000);
//     }
//   }, [error, dispatch]);

//   return (
    
//     <Router>
//       <Toaster />
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<UserHome />} />
//         <Route path="/signup" element={<UserSignup />} />
//         <Route path="/login" element={<UserLogin />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path='/change-password' element={<ChangePassword />} />
//         <Route path="/host/signup" element={<HostSignup />} />
//         <Route path="/host/login" element={<HostLogin />} />
//         <Route path='/host/event-home' element={<EventHome />} />
//         <Route path='/admin' element={<HostLogin />} />
//         <Route path='/admin/dashboard' element={<Sidebar />} />
//         <Route path='/admin/users' element={<AdminUser />} />
//         <Route path='/admin/hosts' element={<Hostpage />} />
//         <Route path='/admin/events' element={<Events />} />
//         <Route path='/admin/hosts/requests' element={<HostRequests />} />
//         <Route path='/admin/host/details' element={<HostDetailsPage />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;



import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import './App.css';
import { fetchUser, logout, fetchAdditionalUserDetails } from "./redux/actions/userActions";
import{fetchAdditionalHostDetails} from './redux/actions/hostActions'
import { makeErrorDisable } from './redux/reducers/user/userSlice';
import { IUserSelector } from './interface/IUserSlice';
import { AppDispatch } from './redux/store';

import Navbar from './components/navbar/userNavbar';
import UserSignup from './pages/User-Pages/UserSignup';
import UserLogin from './pages/User-Pages/UserLogin';
import HostLogin from './pages/Host-Pages/HostLogin';
import HostSignup from './pages/Host-Pages/HostSignup';
import HostHome from './pages/Host-Pages/Host-home';
import LoginPage from './pages/Admin-pages/LoginPage';
import UserHome from './pages/User-Pages/UserHome';
import EventHome from './pages/Host-Pages/Event-home';
// import Footer from './components/footer/footer';
// import Sidebar from './components/sidebar/sidebar';
import AdminUser from './pages/Admin-pages/Userpage';
import Hostpage from './pages/Admin-pages/Hostpage';
import Events from './pages/Admin-pages/Events';
import Profile from './pages/User-Pages/UserProfile'
import HostRequests from './pages/Admin-pages/HostRequests';
import HostDetailsPage from './pages/Admin-pages/HostDetails';
import ForgotPassword from './components/passwords/ForgotPassword';
// import OtpVerification from './components/otp/OtpVerification';
// import ChangePassword from './components/passwords/ChangePassword';
import AdminLogin from './components/forms/AdminLogin';
import AdminDash from './pages/Admin-pages/Userpage';
import HostProfile from './pages/Host-Pages/Host-Profile';
import ResetPassword from './components/passwords/ResetPassword';
import VerifyOtp from './components/passwords/VerifyOtp'
import Category from './pages/Admin-pages/Category'




function App() {
  const { user, error, } = useSelector((state: IUserSelector) => state.user);
  const role = useSelector((state: IUserSelector) => state.user?.user?.role);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);


  useEffect(() => {
    
    dispatch(fetchUser());
    // dispatch(fetchAdditionalUserDetails())
  }, [id]);
  useEffect(() => {
    if (user?.role === 'host' ) {
      dispatch(fetchAdditionalHostDetails());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user?.role === 'user' && user.status === 'active') {
      dispatch(fetchAdditionalUserDetails());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user && user.status === "blocked") {
      dispatch(logout())
      navigate('/')
    }
  }, [user, dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error);
      setTimeout(() => {
        dispatch(makeErrorDisable());
      }, 5000);
    }
  }, [error, dispatch]);

  if (user === null || role === undefined) {
    // User is not authenticated
    return (
      <>
        <Toaster position="top-center" />
        <Navbar />
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/host/signup" element={<HostSignup />} />
          <Route path="/host/login" element={<HostLogin />} />
          <Route path="/" element={<UserHome />} />
          <Route path='/find-events' element={<UserHome/>} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/admin" element={<LoginPage />} />
          <Route path="/host/event-home" element={<EventHome />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} /> 
          
        </Routes>
      </>
    );
  }


  if(user?.role === 'user' && user?.status === 'active'){
    
    return(
      <>
      <Toaster position='top-center' />
      <Navbar />
      <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
      <Route path="/signup" element={!user ? <UserSignup /> : <Navigate to={'/'} />} />
      <Route path='/find-events' element={<UserHome/>} />
      <Route path="/" element={<UserHome />} />
      <Route path="/profile" element={<Profile />} />
    
      </Routes>
      </>
    )
  }

  if(user?.role === 'admin' && user?.status === 'active'){
    return(
      <>
      <Toaster position='top-center' />
      
      <Routes>
      <Route path="/login" element={!user ? <AdminLogin /> : <Navigate to={'/admin/admindashboard'} />} />
      <Route path="/admin/admindashboard" element={<AdminDash />} />
      <Route path="/admin/users" element={<AdminUser />} />
      <Route path="/admin/hosts" element={<Hostpage />} />
      <Route path="/admin/events" element={<Events />} />
      <Route path="/admin/hosts/requests" element={<HostRequests />} />
      <Route path="/admin/host/details" element={<HostDetailsPage />} />
      <Route path="/admin/categories" element={<Category />} /> 
      

      </Routes>
      </>
    )
  } 

  if(user?.role === 'host' ){
    return(
      <>
      <Toaster position='top-center' />
      <Navbar />
      <Routes>
      <Route path="/host/home" element={<HostHome />} /> 
      <Route path="/profile" element={<HostProfile />} />
      <Route path='/find-events' element={<HostHome/>} />
      </Routes>
      </>
    )
  } 

  return null;
}

export default App;