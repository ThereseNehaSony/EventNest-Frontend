import React, { useEffect,useState } from 'react';
import { Routes, Route, Navigate, useNavigate ,useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import { fetchUser, logout, fetchAdditionalUserDetails } from './redux/actions/userActions';
import { fetchAdditionalHostDetails } from './redux/actions/hostActions';
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
import AdminUser from './pages/Admin-pages/Userpage';
import Hostpage from './pages/Admin-pages/Hostpage';
import Events from './pages/Admin-pages/Events';
import Profile from './pages/User-Pages/UserProfile';
import HostRequests from './pages/Admin-pages/HostRequests';
import HostDetailsPage from './pages/Admin-pages/HostDetails';
import ForgotPassword from './components/passwords/ForgotPassword';
import ChangePassword from './components/passwords/ChangePassword';
import AdminLogin from './components/forms/AdminLogin';
import AdminDash from './pages/Admin-pages/Events';
import HostProfile from './pages/Host-Pages/Host-Profile';
import ResetPassword from './components/passwords/ResetPassword';
import VerifyOtp from './components/passwords/VerifyOtp';
import Category from './pages/Admin-pages/Category';
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
import NewPost from './pages/Host-Pages/test';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import { Loader } from './components/loader/Loader';
import SeatSelection from './pages/User-Pages/SeatSelection';
import BookingSummary from './pages/User-Pages/BookingSummary';
import PaymentSuccess from './pages/User-Pages/PaymentSuccess';
import Success from './pages/Host-Pages/Success';
import UpcomingEventsPage from './pages/User-Pages/UpcomingEvents';
import PastEventsPage from './pages/User-Pages/PastEvents';
import TicketDetail from './pages/User-Pages/ticket-detail';
import BookingSuccess from './pages/User-Pages/BookingSucces';


function App() {
  const { user, error } = useSelector((state: IUserSelector) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);
  const location = useLocation();

  const showNavbarAndFooter = !location.pathname.startsWith('/admin');
  const {  loading: userLoading } = useSelector((state: any) => state.user);
  const { host: host, loading:hostLoading } = useSelector((state: any) => state.host);
  const { admin, loading: adminLoading } = useSelector((state: any) => state.admin);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [id, dispatch]);

  useEffect(() => {
    if (user?.role === 'host') {
      dispatch(fetchAdditionalHostDetails());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user?.role === 'user' && user.status === 'active') {
      dispatch(fetchAdditionalUserDetails());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user && user.status === 'blocked') {
      dispatch(logout());
      navigate('/');
    }
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setTimeout(() => {
        dispatch(makeErrorDisable());
      }, 5000);
    }
  }, [error, dispatch]);

  if (loading || userLoading ) {
    return <div className='w-screen h-screen'>
      <Loader />
    </div>;
  }

  return (
    <>
      <Toaster position="top-center" />
      {showNavbarAndFooter && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<UserHome />} />
        <Route path="/login" element={!user ? <UserLogin /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <UserSignup /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/post" element={<NewPost />} />
        {/* <Route path="/event-details/:eventId" element={<EventDetailPage />} /> */}
        <Route path="/event-details/:eventId" element={user?.role === 'host' ? (
            <ProtectedRoute roles={['host']}>
              <EventDetailsPage />
            </ProtectedRoute>
          ) : (<EventDetailPage /> )}/>

        <Route path="/user/wallet" element={<WalletPage />} />
        <Route path="/host/payment" element={<PaymentPage />} />
        <Route path="/host/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/host/event-home" element={<EventHome />} />
        <Route path="/host/signup" element={<HostSignup />} />
        <Route path="/host/login" element={<HostLogin />} />
        
        <Route path="/seat-selection/:eventId" element={<SeatSelection />} />
        <Route path ='/booking-summary' element={<BookingSummary />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path ='/upcoming-events' element={<UpcomingEventsPage />} />
       <Route path='/past-events' element={<PastEventsPage />} />
       <Route path="/ticket-detail" element={<TicketDetail />} />
       <Route path='/booking-success' element={<BookingSuccess />} />
     
     
     
     {/* <Route path='/ticket' element={<Ticket />} />
        */}
       
        {/* user routes */}
      
        <Route path="/profile" element={<ProtectedRoute roles={['user']}><Profile /></ProtectedRoute>} />
        <Route path="/change-password" element={<ProtectedRoute roles={['user']}><ChangePassword /></ProtectedRoute>} />
        <Route path="/find-events" element={<ProtectedRoute roles={['user']}><UserHome /></ProtectedRoute>} />
 
       {/*admin routes */}
        <Route path="/admin/admindashboard" element={<ProtectedRoute roles={['admin']}><AdminDash /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><AdminUser /></ProtectedRoute>} />
        <Route path="/admin/hosts" element={<ProtectedRoute roles={['admin']}><Hostpage /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute roles={['admin']}><AdminEventsPage /></ProtectedRoute>} />
        <Route path="/admin/hosts/requests" element={<ProtectedRoute roles={['admin']}><HostRequests /></ProtectedRoute>} />
        <Route path="/admin/host/details" element={<ProtectedRoute roles={['admin']}><HostDetailsPage /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute roles={['admin']}><Category /></ProtectedRoute>} />
        <Route path="/admin/event/:eventId" element={<ProtectedRoute roles={['admin']}><EventView /></ProtectedRoute>} />
        
        {/* Host routes */}
        <Route path="/host/home" element={<HostHome/> } />
        <Route path="/host/profile" element={<ProtectedRoute roles={['host']}><HostProfile /></ProtectedRoute>} />
        <Route path="/add-event" element={<ProtectedRoute roles={['host']}><EventCreationPage /></ProtectedRoute>} />
        <Route path="/event-addDetails" element={<ProtectedRoute roles={['host']}><EventAddDetails /></ProtectedRoute>} />
        <Route path="/event-dashboard" element={<ProtectedRoute roles={['host']}><EventPage /></ProtectedRoute>} />
        <Route path="/event-dashboard/:eventId" element={<ProtectedRoute roles={['host']}><EventPage /></ProtectedRoute>} />
        <Route path="/event-details/:eventId" element={<ProtectedRoute roles={['host']}><EventDetailsPage /></ProtectedRoute>} />
        <Route path="/cancel-event" element={<ProtectedRoute roles={['host']}><CancelEventPage /></ProtectedRoute>} />
        <Route path="/success" element={<ProtectedRoute roles={['host']}><Success /></ProtectedRoute>} />

      </Routes>

      {showNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;



// import React, { useEffect,ComponentType  } from 'react';
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
// import { useDispatch, useSelector } from 'react-redux';
// import toast, { Toaster } from 'react-hot-toast';

// import './App.css';
// import { fetchUser, logout, fetchAdditionalUserDetails } from "./redux/actions/userActions";
// import{fetchAdditionalHostDetails} from './redux/actions/hostActions'
// import { makeErrorDisable } from './redux/reducers/user/userSlice';
// import { IUserSelector } from './interface/IUserSlice';
// import { AppDispatch } from './redux/store';
// // import ProtectedRoute from './components/hoc/ProtectedRoute';

// import Navbar from './components/navbar/userNavbar';
// import Footer from './components/footer/footer';
// import UserSignup from './pages/User-Pages/UserSignup';
// import UserLogin from './pages/User-Pages/UserLogin';
// import HostLogin from './pages/Host-Pages/HostLogin';
// import HostSignup from './pages/Host-Pages/HostSignup';
// import HostHome from './pages/Host-Pages/Host-home';
// import LoginPage from './pages/Admin-pages/LoginPage';
// import UserHome from './pages/User-Pages/UserHome';
// import EventHome from './pages/Host-Pages/Event-home';
// // import Footer from './components/footer/footer';
// // import Sidebar from './components/sidebar/sidebar';
// import AdminUser from './pages/Admin-pages/Userpage';
// import Hostpage from './pages/Admin-pages/Hostpage';
// import Events from './pages/Admin-pages/Events';
// import Profile from './pages/User-Pages/UserProfile'
// import HostRequests from './pages/Admin-pages/HostRequests';
// import HostDetailsPage from './pages/Admin-pages/HostDetails';
// import ForgotPassword from './components/passwords/ForgotPassword';
// // import OtpVerification from './components/otp/OtpVerification';
// import ChangePassword from './components/passwords/ChangePassword';
// import AdminLogin from './components/forms/AdminLogin';
// import AdminDash from './pages/Admin-pages/Events';
// import HostProfile from './pages/Host-Pages/Host-Profile';
// import ResetPassword from './components/passwords/ResetPassword';
// import VerifyOtp from './components/passwords/VerifyOtp'
// import Category from './pages/Admin-pages/Category'

// import UserProfile from './pages/User-Pages/Profile';
// import EventCreationPage from './components/events/eventCreation';
// import EventAddDetails from './components/events/eventAddDetails';
// import EventPage from './components/events/eventDash';
// import EventDetailsPage from './components/events/eventDetailss';
// import CancelEventPage from './components/events/cancelEvent';

// import EventDetailPage from './pages/User-Pages/EventDetails';
// import WalletPage from './components/wallet/Wallet';
// import PaymentPage from './pages/Host-Pages/Payment';
// import PaymentSuccessPage from './pages/Host-Pages/PaymentSuccess';
// import AdminEventsPage from './pages/Admin-pages/AdminEvents';
// import EventView from './pages/Admin-pages/EventView';
// import SuccessMessage from './components/events/successMessage';
// import NewPost from './pages/Host-Pages/test';






// function App() {
//   const { user, error, } = useSelector((state: IUserSelector) => state.user);
//   const role = useSelector((state: IUserSelector) => state.user?.user?.role);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate()
//   const id = useSelector((state: IUserSelector) => state.user?.user?._id);


//   useEffect(() => {
    
//     dispatch(fetchUser());
//     // dispatch(fetchAdditionalUserDetails())
//   }, [id]);
//   useEffect(() => {
//     if (user?.role === 'host' ) {
//       dispatch(fetchAdditionalHostDetails());
//     }
//   }, [user, dispatch]);

//   useEffect(() => {
//     if (user?.role === 'user' && user.status === 'active') {
//       dispatch(fetchAdditionalUserDetails());
//     }
//   }, [user, dispatch]);

//   useEffect(() => {
//     if (user && user.status === "blocked") {
//       dispatch(logout())
//       navigate('/')
//     }
//   }, [user, dispatch])

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       setTimeout(() => {
//         dispatch(makeErrorDisable());
//       }, 5000);
//     }
//   }, [error, dispatch]);



//   //no user
//   if (user === null || role === undefined) {
   
//     return (
//       <>
//         <Toaster position="top-center" />
//         <Navbar />
//         <Routes>
//           <Route path ='/post' element={<NewPost />} />
//           <Route path="/login" element={<UserLogin />} />
//           <Route path="/signup" element={<UserSignup />} />
//           <Route path="/host/signup" element={<HostSignup />} />
//           <Route path="/host/login" element={<HostLogin />} />
//           <Route path="/" element={<UserHome />} />
//           <Route path='/find-events' element={<UserHome/>} />
//           {/* <Route path="/profile" element={<Profile />} /> */}
//           <Route path="/admin" element={<LoginPage />} />
//           <Route path="/host/event-home" element={<EventHome />} />
//           <Route path='/forgot-password' element={<ForgotPassword />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/verify-otp" element={<VerifyOtp />} />
//           <Route path="/reset-password" element={<ResetPassword />} /> 

         

//  {/* <Route path='/ev-details' element={<EventDetails />} /> */}
//           {/* <Route path="/u-profile" element={<UserProfile />} /> 
//           <Route path ='/create-ev' element={<EventCreationPage />} />
         
//           <Route path='/ev-dash' element={<EventPage />} />
//           <Route path='/ev-detailsss' element={<EventDetailsPage />} />
//           <Route path='/ev-cancel' element={<CancelEventPage />} />

//           <Route path='/event-details/:eventId' element={<EventDetailPage />} />
//           <Route path='/user/wallet' element={<WalletPage />} />


//           <Route path='/host/payment' element={<PaymentPage />} />
//           <Route path='/host/payment-success' element={<PaymentSuccessPage />} />

//           <Route path="/admin/events" element={<Events />} />
//           <Route path='/admin/eventss' element={<AdminEventsPage />} /> */}
//           {/* <Route path='/admin/event-view' element={<EventView />} /> */}
//         </Routes>
//         {/* <Footer /> */}
//       </>
//     );
//   }

// //user routes
//   if(user?.role === 'user' && user?.status === 'active'){
    
//     return(
//       <>
//       <Toaster position='top-center' />
//       <Navbar />
//       <Routes>
//       <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
//       <Route path="/signup" element={!user ? <UserSignup /> : <Navigate to={'/'} />} />
//       <Route path='/find-events' element={<UserHome/>} />
//       <Route path="/" element={<UserHome />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path='/change-password' element={<ChangePassword />} />
    
//       </Routes>
//       </>
//     )
//   }

//   //admin routes
//   if(user?.role === 'admin' && user?.status === 'active'){
//     return(
//       <>
//       <Toaster position='top-center' />
      
//       <Routes>
//       <Route path="/login" element={!user ? <AdminLogin /> : <Navigate to={'/admin/admindashboard'} />} />
//       <Route path="/admin/admindashboard" element={<AdminDash />} />
//       <Route path="/admin/users" element={<AdminUser />} />
//       <Route path="/admin/hosts" element={<Hostpage />} />
//       <Route path="/admin/events" element={<AdminEventsPage />} />
//       <Route path="/admin/hosts/requests" element={<HostRequests />} />
//       <Route path="/admin/host/details" element={<HostDetailsPage />} />
//       <Route path="/admin/categories" element={<Category />} /> 
//       <Route path="/event/:eventId" element={<EventView />} />

//       </Routes>
//       </>
//     )
//   } 


//   //host routes
//   if(user?.role === 'host' ){
//     return(
//       <>
//       <Toaster position='top-center' />
//       <Navbar />
//       <Routes>
//       <Route path="/host/home" element={<HostHome />} /> 
//       <Route path="/host/profile" element={<HostProfile />} />
//       <Route path='/find-events' element={<HostHome/>} />
//       <Route path ='/add-event' element={<EventCreationPage />} />
//       <Route path='/event-addDetails' element={<EventAddDetails />} />
//       <Route path='/event-dashboard' element={<EventPage />} />
//       <Route path="/event-dashboard/:eventId" element={<EventPage />} /> 
//       <Route path='/event-details/:eventId' element={<EventDetailsPage />} />
//       <Route path='/cancel-event' element={<CancelEventPage />} />
//       <Route path='/success' element={<SuccessMessage />} />

//       </Routes>
//       </>
//     )
//   } 

//   return null;
// }



// export default App;








// import React, { useEffect ,useState} from 'react';
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import toast, { Toaster } from 'react-hot-toast';

// import './App.css';
// import { fetchUser, logout, fetchAdditionalUserDetails } from "./redux/actions/userActions";
// import { fetchAdditionalHostDetails } from './redux/actions/hostActions';
// import { makeErrorDisable } from './redux/reducers/user/userSlice';
// import { IUserSelector } from './interface/IUserSlice';
// import { AppDispatch } from './redux/store';

// import Navbar from './components/navbar/userNavbar';
// import Footer from './components/footer/footer';

// //User pages
// import UserSignup from './pages/User-Pages/UserSignup';
// import UserLogin from './pages/User-Pages/UserLogin';
// import UserHome from './pages/User-Pages/UserHome';
// import Profile from './pages/User-Pages/UserProfile';
// import UserProfile from './pages/User-Pages/Profile';
// import EventDetailPage from './pages/User-Pages/EventDetails';
// import ChangePassword from './components/passwords/ChangePassword';
// import WalletPage from './components/wallet/Wallet';

// //Host pages
// import HostLogin from './pages/Host-Pages/HostLogin';
// import HostSignup from './pages/Host-Pages/HostSignup';
// import HostHome from './pages/Host-Pages/Host-home';
// import HostProfile from './pages/Host-Pages/Host-Profile';
// import EventCreationPage from './components/events/eventCreation';
// import EventAddDetails from './components/events/eventAddDetails';
// import EventPage from './components/events/eventDash';
// import EventDetailsPage from './components/events/eventDetailss';
// import CancelEventPage from './components/events/cancelEvent';
// import PaymentPage from './pages/Host-Pages/Payment';
// import PaymentSuccessPage from './pages/Host-Pages/PaymentSuccess';

// //Admin pages
// import LoginPage from './pages/Admin-pages/LoginPage';
// import AdminDash from './pages/Admin-pages/Events';
// import AdminUser from './pages/Admin-pages/Userpage';
// import Hostpage from './pages/Admin-pages/Hostpage';
// import Events from './pages/Admin-pages/Events';
// import HostRequests from './pages/Admin-pages/HostRequests';
// import HostDetailsPage from './pages/Admin-pages/HostDetails';
// import Category from './pages/Admin-pages/Category';
// import AdminEventsPage from './pages/Admin-pages/AdminEvents';
// import EventView from './pages/Admin-pages/EventView';

// //Common pages
// import ForgotPassword from './components/passwords/ForgotPassword';
// import ResetPassword from './components/passwords/ResetPassword';
// import VerifyOtp from './components/passwords/VerifyOtp';
// import SuccessMessage from './components/events/successMessage';
// import { Loader } from './components/loader/Loader';
// import EventHome from './components/Home/EventHome';
// import useAuthCheck from './hooks/useAuthCheck';



// function App() {
//   const { user, error } = useSelector((state: IUserSelector) => state.user);
//   const role = useSelector((state: IUserSelector) => state.user?.user?.role);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const id = useSelector((state: IUserSelector) => state.user?.user?._id);
//   //const {loading:userLoading}= useSelector((state: any) => state.user.user);
 
  
//   // const { user, loading: userLoading } = useSelector((state: RootState) => state.user);
//   // const { data: company, loading: companyLoading } = useSelector((state: RootState) => state.company);
//   // const { admin, loading: adminLoading } = useSelector((state: RootState) => state.admin);

//   // const [loading, setLoading] = useState(true);

  
  


//   useAuthCheck(); 

//   useEffect(() => {
//     dispatch(fetchUser());
//   }, [id]);

//   useEffect(() => {
//     if (user?.role === 'host') {
//       dispatch(fetchAdditionalHostDetails());
//     }
//   }, [user, dispatch]);

//   useEffect(() => {
//     if (user?.role === 'user' && user.status === 'active') {
//       dispatch(fetchAdditionalUserDetails());
//     }
//   }, [user, dispatch]);

//   useEffect(() => {
//     if (user && user.status === "blocked") {
//       dispatch(logout());
//       navigate('/');
//     }
//   }, [user, dispatch]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       setTimeout(() => {
//         dispatch(makeErrorDisable());
//       }, 5000);
//     }
//   }, [error, dispatch]);

//   // if (loading || userLoading ) {
//   //   return <div className='w-screen h-screen'>
//   //     <Loader />
//   //   </div>;
//   // }

//   return (
//     <>
//       <Toaster position="top-center" />
//       <Navbar />
//       <Routes>

//         {/* User Routes */}
       
//         <Route path="/" element={<UserHome />} />
  
//         <Route path="/find-events" element={user?.role === 'host' ? (<EventHome />) : (<UserHome />)}/>

//         <Route path="/login" element={!user ? <UserLogin /> : <Navigate to="/" />} />
//         <Route path="/signup" element={!user ? <UserSignup /> : <Navigate to="/" />} />
//         <Route path="/profile" element={user?.role === 'user' ? (<Profile /> ):user?.role === 'host' ?(<HostProfile />): (<Navigate to="/" />)} />
//         <Route path="/change-password" element={user?.role === 'user' ? <ChangePassword /> : <Navigate to="/" />} />
//         {/* <Route path="/u-profile" element={user?.role === 'user' ? <UserProfile /> : <Navigate to="/" />} /> */}
//         <Route path='/event-details/:eventId' element={user?.role === 'host' ? <EventDetailsPage /> : <EventDetailPage />} />
//         <Route path="/event-details/:eventId" element={<EventDetailPage />} />
//         <Route path="/user/wallet" element={user?.role === 'user' ? <WalletPage /> : <Navigate to="/" />} />

//         {/* Host Routes */}
//         <Route path="/host/event-home" element={<EventHome/>} />
//         <Route path="/host/home" element={<HostHome />} />
//         <Route path="/host/signup" element={<HostSignup />} />
//         <Route path="/host/login" element={user?.role === 'host' ?<EventCreationPage />:<HostLogin/>} />
//         <Route path="/profile" element={user?.role === 'host' ? <HostProfile /> : <Navigate to="/login" />} />
//         {/* <Route path="/create-ev" element={user?.role === 'host' ? <EventCreationPage /> : <Navigate to="/" />} />
//         <Route path="/event-addDetails" element={user?.role === 'host' ? <EventAddDetails /> : <Navigate to="/" />} />
//         <Route path="/ev-dash" element={user?.role === 'host' ? <EventPage /> : <Navigate to="/" />} />
//         <Route path="/ev-detailsss" element={user?.role === 'host' ? <EventDetailsPage /> : <Navigate to="/" />} />
//         <Route path="/ev-cancel" element={user?.role === 'host' ? <CancelEventPage /> : <Navigate to="/" />} />
//         <Route path="/host/payment" element={user?.role === 'host' ? <PaymentPage /> : <Navigate to="/" />} />
//         <Route path="/host/payment-success" element={user?.role === 'host' ? <PaymentSuccessPage /> : <Navigate to="/" />} /> */}
//         <Route path ='/add-event' element={user?.role === 'host' ? <EventCreationPage /> : <Navigate to="/" />} /> 

//         <Route path='/event-addDetails' element={ user?.role === 'host' ? <EventAddDetails /> : <Navigate to='/' />} />
//         <Route path='/event-dashboard' element={user?.role === 'host' ? <EventPage /> : <Navigate to='/' />} />
//         <Route path="/event-dashboard/:eventId" element={user?.role === 'host' ? <EventPage /> : <Navigate to='/' />} /> 
//         <Route path='/event-details/:eventId' element={user?.role === 'host' ? <EventDetailsPage /> : <Navigate to='/' />} />
//         <Route path='/cancel-event' element={<CancelEventPage />} />
//         <Route path='/success' element={user?.role === 'host' ? <SuccessMessage />: <Navigate to='/' />} />

//         {/* Admin Routes */}
//         <Route path="/admin" element={<LoginPage />} />
//         <Route path="/admin/admindashboard" element={user?.role === 'admin' ? <AdminDash /> : <Navigate to="/login" />} />
//         <Route path="/admin/users" element={user?.role === 'admin' ? <AdminUser /> : <Navigate to="/login" />} />
//         <Route path="/admin/hosts" element={user?.role === 'admin' ? <Hostpage /> : <Navigate to="/login" />} />
//         <Route path="/admin/events" element={user?.role === 'admin' ? <AdminEventsPage /> : <Navigate to="/login" />} />
//         <Route path="/admin/hosts/requests" element={user?.role === 'admin' ? <HostRequests /> : <Navigate to="/login" />} />
//         <Route path="/admin/host/details" element={user?.role === 'admin' ? <HostDetailsPage /> : <Navigate to="/login" />} />
//         <Route path="/admin/categories" element={user?.role === 'admin' ? <Category /> : <Navigate to="/login" />} />
//         <Route path="/event/:eventId" element={user?.role === 'admin' ? <EventView /> : <Navigate to="/login" />} />

//         {/* Common Routes */}
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/success-message" element={<SuccessMessage />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App;
