import React, { useState } from 'react'
// import loginImage from '../../assets/loginImage2.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { userLogin, fetchAdditionalUserDetails  } from '../../redux/actions/userActions';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import { IUserSelector } from '../../interface/IUserSlice';
import toast from 'react-hot-toast';

const bgImage = '/bg-1.jpg'; 

interface CustomJwtPayload{
  name: string;
  email: string;
}

interface UserValues {
  email: string;
  password?:string;
  google?:boolean;
  
}
function UserLoginForm() {
  const [formData, setFormData] = useState<UserValues>({
    email: '',
    password: '',
  });

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const {  error } = useSelector((state: IUserSelector) => state.user);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value}))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await dispatch(userLogin(formData))
    console.log(response)
    if (response.meta.requestStatus !== 'rejected') {
      dispatch(fetchAdditionalUserDetails());
      // Assuming the response payload contains user data including role
      const userRole = response.payload.role;

      if (userRole === 'admin') {
        navigate('/admin/admindashboard');
      } else {
        navigate('/');
      }
    } else {
      // Handle login failure (e.g., show an error message)
      console.error('Login failed');
    }
  }
  
  const googleSignIn = async (response: string | any, status: boolean) => {
    if (status) {
      try {
        const credentials: CustomJwtPayload = jwtDecode(response.credential);
        console.log(credentials, "value")
        const userValues: UserValues = {
          email: credentials.email,
          google: true
        }

        await dispatch(userLogin(userValues));
        navigate('/')

      } catch (error: any) {
        toast.error(error.message);
      }
    }
  }
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative h-56">
                <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
                <h2 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold bg-black bg-opacity-50">Login</h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700" htmlFor="username">Email</label>
                    <input
                      type="text"
                      id="email"
                      name='email'
                      className="mt-2 p-2 w-full border rounded"
                      onChange={handleChange}
                       placeholder='Enter your email'
                    
                    />
                  </div>
                  <div className="mb-4 relative">
                    <label className="block text-gray-700" htmlFor="password">Password</label>
                    <input
                      type='password'
                      id="password"
                      name='password'
                      className="mt-2 p-2 w-full border rounded"
                      placeholder='Enter your password'
                      onChange={handleChange}
                      
                    />
                    
                  </div>
                  <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
                    Login
                  </button>
                  <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
                </form>
                <div className='flex justify-center mt-3'>
                  <GoogleLogin
                    text='signin_with'
                    shape='circle'
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);
                      googleSignIn(credentialResponse, true);
                    }}
                    onError={() => {
                      console.log('Login Failed')
                    }}
                  />
                </div>
                <p className="text-center mt-4">
                  Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserLoginForm;
