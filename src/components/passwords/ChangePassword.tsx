// import React, { useState } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as yup from 'yup';
// import Sidebar from '../sidebar/sidebar';

// // Define the validation schema
// const validationSchema = yup.object().shape({
//   newPassword: yup.string()
//     .required('Password is required')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9])[A-Za-z\d@$!%*?&]{8,}$/,
//       'Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character'
//     ),
//   confirmPassword: yup.string()
//     .oneOf([yup.ref('newPassword')], 'Passwords must match')
//     .required('Confirm your password'),
// });

// const ChangePassword: React.FC = () => {
//   const [message, setMessage] = useState('');

//   const handleChangePassword = (values: { newPassword: string, confirmPassword: string }) => {
//     console.log('New Password:', values.newPassword);
//     setMessage('Your password has been successfully changed.');
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 flex items-center justify-center">
//         <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
//           {message && <p className="mb-4 text-center text-green-600">{message}</p>}
//           <Formik
//             initialValues={{ newPassword: '', confirmPassword: '' }}
//             validationSchema={validationSchema}
//             onSubmit={handleChangePassword}
//           >
//             <Form>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
//                   New Password
//                 </label>
//                 <Field
//                   type="password"
//                   id="newPassword"
//                   name="newPassword"
//                   className="w-full px-3 py-2 border rounded"
//                 />
//                 <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
//                   Confirm New Password
//                 </label>
//                 <Field
//                   type="password"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   className="w-full px-3 py-2 border rounded"
//                 />
//                 <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Change Password
//               </button>
//             </Form>
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;


import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Sidebar from '../sidebar/userSidebar';
import { changePassword } from '../../redux/actions/userActions';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const validationSchema = yup.object().shape({
  newPassword: yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm your password'),
});

const ChangePassword: React.FC = () => {
  const [message, setMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangePassword = async (values: { newPassword: string, confirmPassword: string }) => {
    try {
      await changePassword(values.newPassword);
      setMessage('Your password has been successfully changed.');
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
          {message && <p className="mb-4 text-center text-green-600">{message}</p>}
          <Formik
            initialValues={{ newPassword: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleChangePassword}
          >
            <Form>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                  New Password
                </label>
                <div className="relative">
                  <Field
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={toggleShowNewPassword}
                    className="absolute inset-y-0 right-0 top-0 mt-3 mr-2 text-gray-600 focus:outline-none"
                  >
                    {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="absolute inset-y-0 right-0 top-0 mt-3 mr-2 text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Change Password
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
