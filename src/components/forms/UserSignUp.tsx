
import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { userSignup } from '../../redux/actions/userActions';
import { AppDispatch } from '../../redux/store';
import { ValidationSchema } from '../../schemas/ValidationSchema';
import Otp from '../otp/OtpVerification';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
const bgImage = '/bg-1.jpg';


interface CustomJwtPayload {
  name: string;
  email: string;
}


interface UserValues {
  username: string;
  email: string;
  
}


const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
}
const temporaryData = {
  username: "",
  email: "",
  password: "",
}

function UserSignupForm() {
  const [isOTP, setIsOTP] = useState<boolean>(false);
  const [tempData, setTempData] = useState(temporaryData);
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
      const response = await dispatch(userSignup(restValues));
      console.log(response, 'response ----')
    
      if (response && response.meta.requestStatus !== 'rejected') {
        setIsOTP(true); 
        action.resetForm();
        setTempData(restValues); 
      } else {
        
        if (error) {
          toast.error(error); 
         
        }
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const googleSignIn = async (response: string | any, status: boolean) => {
    if (status) {
      try {
        const credentials: CustomJwtPayload = jwtDecode(response.credential);
        console.log(credentials, "value")
        const userValues: UserValues = {
          username: credentials.name,
          email: credentials.email,
        }

        await dispatch(userSignup(userValues));
        navigate('/')

      } catch (error: any | { message?: string; }) {
        toast.error(error.message);
      }
    }
  }
  console.log(errors)

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 mt-5">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative h-56">
                <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover " />
                <h2 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold bg-black bg-opacity-50">Sign Up</h2>
              </div>
              <div className="p-6">
                {isOTP ? (
                  <Otp userData={tempData} />
                ) : (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="username">
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          className="mt-2 p-2 w-full border rounded"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          
                        />
                        {errors.username && touched.username && (
                          <p className="text-red-500 text-sm">{errors.username}</p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="mt-2 p-2 w-full border rounded"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          
                        />
                        {errors.email && touched.email && (
                          <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                      </div>
                      <div className="mb-4 relative">
                        <label className="block text-gray-700" htmlFor="password">
                          Password
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          className="mt-2 p-2 w-full border rounded"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          
                        />
                        <span
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-3 cursor-pointer"
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                        {errors.password && touched.password && (
                          <p className="text-red-500 text-sm">{errors.password}</p>
                        )}
                      </div>
                      <div className="mb-4 relative">
                        <label className="block text-gray-700" htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          className="mt-2 p-2 w-full border rounded"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                         
                        />
                        <span
                          onClick={toggleConfirmPasswordVisibility}
                          className="absolute right-3 top-3 cursor-pointer"
                        >
                          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                        {errors.confirmPassword && touched.confirmPassword && (
                          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                      >
                        Sign Up
                      </button>
                    </form>
                    <div className='flex justify-center mt-3'>
                  <GoogleLogin
                    text='signup_with'
                    shape='circle'
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);
                      googleSignIn(credentialResponse, true);
                    }}
                    onError={() => {
                      console.log('Signup Failed ')
                    }}
                  />
                </div>
                    <p className="text-center mt-4">
                      Already have an account?{' '}
                      <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                      </Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}

export default UserSignupForm;


