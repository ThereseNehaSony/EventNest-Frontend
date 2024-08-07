import React, { useState } from 'react';
import { useFormik } from 'formik';
import { ValidationSchema } from '../../schemas/ValidationSchema';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSignup } from '../../redux/actions/userActions';
import { AppDispatch } from '../../redux/store';
import Otp from '../otp/HostOtp';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface UserValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface TempData {
  username: string;
  email: string;
  password: string;
  otp?: string;
  role: string;
}

const initialValues: UserValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const HostLoginForm: React.FC = () => {
  const [isOTP, setIsOTP] = useState<boolean>(false);
  const [tempData, setTempData] = useState<TempData>({ username: "", email: "", password: "", role: "host" });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: any) => state.user);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: async (values, action) => {
      const { confirmPassword, ...restValues } = values;
      const dataToSend = {
        ...restValues,
        role: "host"
      };

      console.log(dataToSend, "dataToSend"); 

      const response = await dispatch(userSignup(dataToSend)); 
      console.log(response, 'response ----');

      if (response && response.meta.requestStatus !== 'rejected') {
        setIsOTP(true);
        action.resetForm();
        setTempData({ ...restValues, role: "host" }); 
        if (error) {
          toast.error(error);
        }
      }
    },
  });

  return (
    <section className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {isOTP ? (
          <Otp userData={tempData} />
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.username && touched.username ? (
                  <p className="text-red-700">{errors.username}</p>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="text-red-700">{errors.email}</p>
                ) : null}
              </div>
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
                {errors.password && touched.password ? (
                  <p className="text-red-700">{errors.password}</p>
                ) : null}
              </div>
              <div className="mb-4 relative">
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Confirm your password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <p className="text-red-700">{errors.confirmPassword}</p>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Sign Up
              </button>
            </form>
            <div className="text-center text-lg-start mt-4 pt-2">
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Already have an account? <Link to="/host/login" className="text-blue-500 hover:underline">Login</Link>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HostLoginForm;
