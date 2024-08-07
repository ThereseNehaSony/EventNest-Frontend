import React from 'react';
import { useSelector } from 'react-redux';
import { CiCircleCheck } from 'react-icons/ci';
import { BiCheckShield, BiErrorCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const firstimage = '/bg-1.jpg';

const HostHome = () => {
  const hostStatus = useSelector((state: any) => state.user.user.status); // Adjust the path according to your state structure
  const navigate = useNavigate();

  const handleVerifyAccount = () => {
    // Redirect to the profile page
    navigate('/profile');
  };

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
        {hostStatus === 'verified' ? (
          <>
            <BiCheckShield className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Your account is verified. Start adding and managing your events.</h3>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
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
    </div>
  );
}

export default HostHome;
