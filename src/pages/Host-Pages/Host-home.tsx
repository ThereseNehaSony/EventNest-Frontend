import React,{useEffect} from 'react';
import { useSelector,useDispatch  } from 'react-redux';
import { CiCircleCheck } from 'react-icons/ci';
import { BiCheckShield, BiErrorCircle } from 'react-icons/bi';
import { BsTag } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { BsCalendar, BsCurrencyRupee } from 'react-icons/bs';
import { fetchEventsByHost } from '../../redux/actions/hostActions';
import { AppDispatch } from '../../redux/store';
const firstimage = '/bg-11.png';



interface Event {
  _id: string; 
  title: string;
  image: string;
  startDate: string;
  entryType: string;
  ticketDetails: { price: string }[];
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/event-dashboard/${event._id}`); 
  };

  return (
    <div
      className="min-w-[300px] max-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
      onClick={handleCardClick} 
    >
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.image})` }}
      ></div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <br />
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <BsCalendar className="text-xl me-1" />
          {event.startDate}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          {event.entryType === 'Paid' ? (
            <>
              <BsCurrencyRupee className="text-xl me-1" />
              From {event.ticketDetails[0].price}
            </>
          ) : (
            <>
              <BsTag className="text-xl me-1" />
              {event.entryType}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// export default EventCard;

const HostHome = () => {
  const hostStatus = useSelector((state: any) => state.host?.userDetails?.status); 
  
  
  const hostName = useSelector((state: any) => state.host?.userDetails?.username);
  const events = useSelector((state: any) => state.host.events); 
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleVerifyAccount = () => {
    navigate('/profile');
  };

  const handleAddEventClick = () => {
    navigate('/add-event');
  };

  
  useEffect(() => {
    if (hostName) {
      dispatch(fetchEventsByHost(hostName));
    }
  }, [dispatch, hostName]);

  return (
    <div>
      <section id="hero" className="hero bg-teal-800 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                <span className='text-white ml-1'>HOST WITH EASE </span>
                <h2>
                  <span className="text-red-400 ml-6">REACH MILLIONS NOW</span>
                </h2>
                <span className="text-red-400 ml-11"> REGISTER NOW</span>
              </h2>
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
      </section>

      <section className="mt-10 p-6 bg-white shadow-lg rounded-lg text-center container mx-auto">
        {hostStatus === 'approved' ? (
          <>
            <BiCheckShield className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Your account is verified. Start adding and managing your events.</h3>
            <button
              onClick={handleAddEventClick}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Add Event
            </button>
          </>
        ) : hostStatus === 'pending' ? (
          <>
            <CiCircleCheck className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Please verify your account to start adding and managing your events.</h3>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleVerifyAccount}
            >
              Verify Account
            </button>
          </>
        ) : (
          <>
            <BiErrorCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Your account has been rejected. Please contact support for further assistance.</h3>
          </>
        )}
      </section>

      <section className="mt-10 p-6 container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events && events.length > 0 ? (
            events.map((event: any, index: number) => (
              <EventCard key={index} event={event} />
            ))
          ) : (
            <p>No events available. Start by adding a new event.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HostHome;
