
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
import Footer from './components/footer/footer';
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
import ChangePassword from './components/passwords/ChangePassword';
import AdminLogin from './components/forms/AdminLogin';
import AdminDash from './pages/Admin-pages/Events';
import HostProfile from './pages/Host-Pages/Host-Profile';
import ResetPassword from './components/passwords/ResetPassword';
import VerifyOtp from './components/passwords/VerifyOtp'
import Category from './pages/Admin-pages/Category'

import UserProfile from './pages/User-Pages/Profile';
import EventCreationPage from './components/events/eventCreation';
import EventAddDetails from './components/events/eventAddDetails';
import EventPage from './components/events/eventDash';
import EventDetailsPage from './components/events/eventDetailss';
import CancelEventPage from './components/events/cancelEvent';

import EventDetailPage from './pages/User-Pages/EventDetails';
import WalletPage from './components/wallet/Wallet';
import PaymentPage from './pages/Host-Pages/Payment';
import PaymentSuccessPage from './pages/Host-Pages/PaymentSuccess';
import AdminEventsPage from './pages/Admin-pages/AdminEvents';
import EventView from './pages/Admin-pages/EventView';
import SuccessMessage from './components/events/successMessage';

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


  //no user
  if (user === null || role === undefined) {
   
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


          <Route path="/u-profile" element={<UserProfile />} /> 
          <Route path ='/create-ev' element={<EventCreationPage />} />
          {/* <Route path='/ev-details' element={<EventDetails />} /> */}
          <Route path='/ev-dash' element={<EventPage />} />
          <Route path='/ev-detailsss' element={<EventDetailsPage />} />
          <Route path='/ev-cancel' element={<CancelEventPage />} />

          <Route path='/event-details' element={<EventDetailPage />} />
          <Route path='/user/wallet' element={<WalletPage />} />


          <Route path='/host/payment' element={<PaymentPage />} />
          <Route path='/host/payment-success' element={<PaymentSuccessPage />} />

          <Route path="/admin/events" element={<Events />} />
          <Route path='/admin/eventss' element={<AdminEventsPage />} />
          {/* <Route path='/admin/event-view' element={<EventView />} /> */}
        </Routes>
        {/* <Footer /> */}
      </>
    );
  }

//user routes
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
      <Route path='/change-password' element={<ChangePassword />} />
    
      </Routes>
      </>
    )
  }

  //admin routes
  if(user?.role === 'admin' && user?.status === 'active'){
    return(
      <>
      <Toaster position='top-center' />
      
      <Routes>
      <Route path="/login" element={!user ? <AdminLogin /> : <Navigate to={'/admin/admindashboard'} />} />
      <Route path="/admin/admindashboard" element={<AdminDash />} />
      <Route path="/admin/users" element={<AdminUser />} />
      <Route path="/admin/hosts" element={<Hostpage />} />
      <Route path="/admin/events" element={<AdminEventsPage />} />
      <Route path="/admin/hosts/requests" element={<HostRequests />} />
      <Route path="/admin/host/details" element={<HostDetailsPage />} />
      <Route path="/admin/categories" element={<Category />} /> 
      <Route path="/event/:eventId" element={<EventView />} />

      </Routes>
      </>
    )
  } 


  //host routes
  if(user?.role === 'host' ){
    return(
      <>
      <Toaster position='top-center' />
      <Navbar />
      <Routes>
      <Route path="/host/home" element={<HostHome />} /> 
      <Route path="/profile" element={<HostProfile />} />
      <Route path='/find-events' element={<HostHome/>} />
      <Route path ='/add-event' element={<EventCreationPage />} />
      <Route path='/event-addDetails' element={<EventAddDetails />} />
      <Route path='/event-dashboard' element={<EventPage />} />
      <Route path="/event-dashboard/:eventId" element={<EventPage />} /> 
      <Route path='/event-details/:eventId' element={<EventDetailsPage />} />
      <Route path='/cancel-event' element={<CancelEventPage />} />
      <Route path='/success' element={<SuccessMessage />} />

      </Routes>
      </>
    )
  } 

  return null;
}

export default App;