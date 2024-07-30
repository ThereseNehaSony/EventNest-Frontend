
// import React, { useState } from 'react';
// import { baseUrl } from '../../config/constants';
// import { useNavigate } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [step, setStep] = useState(1); 
//   const navigate = useNavigate()

//   const handleRequestOtp = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setMessage('');
   
//     const response = await fetch(`${baseUrl}/auth/request-otp`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email }),
//     });
//     const data = await response.json();
//     if (data.success) {
//       setStep(2);
//       setMessage('OTP sent to your email');
//     } else {
//       setMessage(data.message);
//     }
//   };

//   const handleResetPassword = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setMessage('');
    
//     const response = await fetch(`${baseUrl}/auth/reset-password`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, otp, newPassword }),
//     });
//     const data = await response.json();
//     if (data.success) {
//       setMessage('Password reset successful');
//      navigate('/login')
//     } else {
//       setMessage(data.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">{step === 1 ? 'Forgot Password' : 'Reset Password'}</h2>
//         {message && <p className="mb-4 text-center text-green-600">{message}</p>}
//         {step === 1 ? (
//           <form onSubmit={handleRequestOtp}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//             >
//               Request OTP
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleResetPassword}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
//                 OTP
//               </label>
//               <input
//                 type="text"
//                 id="otp"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 id="newPassword"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//             >
//               Reset Password
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;





import React, { useState } from 'react';
import { baseUrl } from '../../config/constants';
import { useNavigate } from 'react-router-dom';

const RequestOtp = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRequestOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');

    const response = await fetch(`${baseUrl}/auth/request-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.success == true) {
      console.log(data,"data.........")
      navigate('/verify-otp', { state: { email } });
      setMessage('OTP sent to your email');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        {message && <p className="mb-4 text-center text-green-600">{message}</p>}
        <form onSubmit={handleRequestOtp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Request OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestOtp;






