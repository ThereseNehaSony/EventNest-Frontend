// import React, { useState } from 'react';
// import { baseUrl } from '../../config/constants';
// import { useLocation, useNavigate } from 'react-router-dom';

// const VerifyOtp = () => {
//   const [otp, setOtp] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { email } = location.state || {};

//   const handleVerifyOtp = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setMessage('');

//     const response = await fetch(`${baseUrl}/auth/verify-otp`, {
      
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, otp }),
//     });

//     const data = await response.json();
//     console.log(data,"data......")
//     if (data.success) {
//       navigate('/reset-password', { state: { email } });
//       setMessage('OTP verified successfully');
//     } else {
//       setMessage(data.message);
//       console.log(data.message)
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
//         {message && <p className="mb-4 text-center text-green-600">{message}</p>}
//         <form onSubmit={handleVerifyOtp}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
//               OTP
//             </label>
//             <input
//               type="text"
//               id="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//           >
//             Verify OTP
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;


import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../config/constants';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(60); // 60 seconds countdown
  const [canResend, setCanResend] = useState(false); // To enable resend button
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  // Start timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      // Clear interval when timer reaches 0 or component unmounts
      return () => clearInterval(interval);
    } else {
      setCanResend(true); // Enable resend button when timer is done
    }
  }, [timer]);

  const handleVerifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');

    const response = await fetch(`${baseUrl}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    console.log(data, "data......")
    if (data.success) {
      navigate('/reset-password', { state: { email } });
      setMessage('OTP verified successfully');
    } else {
      setMessage(data.message);
      console.log(data.message)
    }
  };

  const handleResendOtp = async () => {
    // Reset timer and disable resend button
    setTimer(60);
    setCanResend(false);
    setMessage('');

    const response = await fetch(`${baseUrl}/auth/request-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (data.success) {
      setMessage('OTP sent successfully');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
        {message && <p className="mb-4 text-center text-green-600">{message}</p>}
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Verify OTP
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            {canResend ? (
              <button
                onClick={handleResendOtp}
                className="text-blue-500 hover:text-blue-700"
              >
                Resend OTP
              </button>
            ) : (
              <span>Resend OTP in {timer} seconds</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
