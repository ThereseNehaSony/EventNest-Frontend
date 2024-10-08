// import React, { useState } from 'react'
// //import loginImage from '../../assets/loginImage2.jpg'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch } from '../../redux/store';
// import { userLogin } from '../../redux/actions/userActions';
// import { fetchAdditionalHostDetails } from '../../redux/actions/hostActions';
// import { jwtDecode } from 'jwt-decode';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { IUserSelector } from '../../interface/IUserSlice';
// import toast from 'react-hot-toast';
// import { GoogleLogin } from '@react-oauth/google';


// //import logo from '../../assets/eventnest logo.webp'


// interface UserValues {
//   email: string;
//   password?:string;
  
// }

// const HostLoginForm: React.FC = () => {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [formData, setFormData] = useState<UserValues>({
//     email: '',
//     password: '',
//   });

//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const {  error } = useSelector((state: IUserSelector) => state.user);


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const {name, value} = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value}))
//   }
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const response = await dispatch(userLogin(formData))
//     console.log(response)
//     if(response.meta.requestStatus !== "rejected") {
//       dispatch(fetchAdditionalHostDetails());
//       navigate('/host/home')
//     }
//   }
//   return (
//     <section className="h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit}>
        
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
//             <input
//                       type="text"
//                       id="email"
//                       name='email'
//                       className="mt-2 p-2 w-full border rounded"
//                       onChange={handleChange}
//                        placeholder='Enter your email'
//                       required
//                     />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
//             <input
//                       type='password'
//                       id="password"
//                       name='password'
//                       className="mt-2 p-2 w-full border rounded"
//                       placeholder='Enter your password'
//                       onChange={handleChange}
//                       required
//                     />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
//           >
//            Login
//           </button>
//         </form>
//         <div className="text-center text-lg-start mt-4 pt-2">
//           <p className="small fw-bold mt-2 pt-1 mb-0">
//            Don't have an account? <Link to="/host/signup" className="text-blue-500 hover:underline">SignUp</Link>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };



// export default HostLoginForm;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { userLogin } from '../../redux/actions/userActions';
import { fetchAdditionalHostDetails } from '../../redux/actions/hostActions';
import { IUserSelector } from '../../interface/IUserSlice';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { GoogleLogin } from '@react-oauth/google';

interface UserValues {
  email: string;
  password?: string;
}

const HostLoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserValues>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<UserValues>({ email: '', password: '' });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: IUserSelector) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: UserValues = { email: '', password: '' };
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await dispatch(userLogin(formData));
      if (response.meta.requestStatus !== 'rejected') {
        dispatch(fetchAdditionalHostDetails());
        navigate('/host/home');
      } else {
        toast.error('Login failed. Please check your credentials and try again.');
      }
    }
  };
  

  return (
    <section className="h-screen flex justify-center items-center bg-gray-100 mt-0">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className={`mt-2 p-2 w-full border rounded ${errors.email ? 'border-red-500' : ''}`}
              onChange={handleChange}
              placeholder="Enter your email"
              
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className={`mt-2 p-2 w-full border rounded ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
              onChange={handleChange}
             
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="text-center text-lg-start mt-4 pt-2">
          <p className="small fw-bold mt-2 pt-1 mb-0">
            Don't have an account? <Link to="/host/signup" className="text-blue-500 hover:underline">SignUp</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HostLoginForm;
