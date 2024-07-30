

import React, { useState } from 'react'
//import loginImage from '../../assets/loginImage2.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { userLogin } from '../../redux/actions/userActions';
import { jwtDecode } from 'jwt-decode';

import { IUserSelector } from '../../interface/IUserSlice';
import toast from 'react-hot-toast';

interface UserValues {
  email: string;
  password?:string;
  
}

const AdminLogin = () => {
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
    if(response.meta.requestStatus !== "rejected") {
      navigate('/admin/admindashboard')
    }
  }

//   return (
//     <section className="vh-100 gradient-custom">
//       <div className="container py-5 h-100">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//             <div className="card bg-dark text-black rounded-4">
//               <div className="card-body p-5 text-center">
//                 <div className="mb-md-5 mt-md-4 pb-5">
//                   <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
//                   <p className="text-white-50 mb-5">Please enter your login and password!</p>

//                   <div className="form-outline form-white mb-4">
//                     <input type="email" id="typeEmailX" className="form-control form-control-lg" />
//                     <label className="form-label" htmlFor="typeEmailX">Email</label>
//                   </div>

//                   <div className="form-outline form-white mb-4">
//                     <input type="password" id="typePasswordX" className="form-control form-control-lg" />
//                     <label className="form-label" htmlFor="typePasswordX">Password</label>
//                   </div>

//                   <p className="small mb-5 pb-lg-2">
//                     <a className="text-white-50" href="#!">Forgot password?</a>
//                   </p>

//                   <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

//                   <div className="d-flex justify-content-center text-center mt-4 pt-1">
//                     <a href="#!" className="text-white">
//                       <i className="fab fa-facebook-f fa-lg"></i>
//                     </a>
//                     <a href="#!" className="text-white mx-4 px-2">
//                       <i className="fab fa-twitter fa-lg"></i>
//                     </a>
//                     <a href="#!" className="text-white">
//                       <i className="fab fa-google fa-lg"></i>
//                     </a>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="mb-0">
//                     Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

return (
  <section className="h-screen flex justify-center items-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
      
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
                    type="text"
                    id="email"
                    name='email'
                    className="mt-2 p-2 w-full border rounded"
                    onChange={handleChange}
                     placeholder='Enter your email'
                    required
                  />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
                    type='password'
                    id="password"
                    name='password'
                    className="mt-2 p-2 w-full border rounded"
                    placeholder='Enter your password'
                    onChange={handleChange}
                    required
                  />
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



export default AdminLogin;
