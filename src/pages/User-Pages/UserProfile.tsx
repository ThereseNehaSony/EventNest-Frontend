import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IUserSelector } from '../../interface/IUserSlice';
import { updateUser } from '../../redux/actions/userActions';
import Sidebar from '../../components/sidebar/userSidebar';
import { AppDispatch } from '../../redux/store';
import { clearSuccess } from '../../redux/reducers/user/userSlice';

const Profile: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);
  const data = useSelector((state: IUserSelector) => state.user?.userDetails);
  const success = useSelector((state: any) => state.user.success);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState(data?.phone || '');
  const [address, setAddress] = useState(data?.address || '');
  
  const dispatch = useDispatch<AppDispatch>();


  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }; 

  const validatePhoneNumber = (number: string): boolean => {
    
    const regex = /^[1-9][0-9]{9}$/;
    return regex.test(number) && number !== '0'.repeat(number.length);
  };

  const handleUpdatePhoneNumber = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Invalid Number');
      return;
    }

    setError(null);
    dispatch(updateUser({ id, phone: phoneNumber,address  }));
  };
  

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(clearSuccess());
      }, 3000);
    }
  }, [success, dispatch]);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="bg-white shadow rounded-lg p-4 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
            {showSuccessMessage && (
              <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
                Phone number updated successfully!
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleUpdatePhoneNumber}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="firstName">
                  User Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="firstName"
                  type="text"
                  value={user?.username || ''}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber || data?.phone}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="address"
                  type="text"
                  value={address || data?.address}
                  onChange={handleAddressChange}
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { IUserSelector } from '../../interface/IUserSlice';
// import { updateUser } from '../../redux/actions/userActions';
// import Sidebar from '../../components/sidebar/userSidebar';
// import { AppDispatch } from '../../redux/store';
// import { clearSuccess } from '../../redux/reducers/user/userSlice';

// const Profile: React.FC = () => {
//   const user = useSelector((state: any) => state.user.user);
//   const id = useSelector((state: IUserSelector) => state.user?.user?._id);
//   const data = useSelector((state: IUserSelector) => state.user?.userDetails);
//   const success = useSelector((state: any) => state.user.success);

//   const [phoneNumber, setPhoneNumber] = useState(data?.phone || '');
//   const [address, setAddress] = useState(data?.address || '');
//   const [showModal, setShowModal] = useState(false);
//   const dispatch = useDispatch<AppDispatch>();
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPhoneNumber(e.target.value);
//   };

//   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAddress(e.target.value);
//   };

//   const validatePhoneNumber = (number: string): boolean => {
//     const regex = /^[1-9][0-9]{9}$/;
//     return regex.test(number) && number !== '0'.repeat(number.length);
//   };

//   const handleUpdateProfile = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validatePhoneNumber(phoneNumber)) {
//       setError('Invalid Number');
//       return;
//     }

//     setError(null);
//     dispatch(updateUser({ id, phone: phoneNumber, address }));
//     setShowModal(false); // Close modal after saving
//   };

//   useEffect(() => {
//     if (success) {
//       setShowSuccessMessage(true);
//       setTimeout(() => {
//         setShowSuccessMessage(false);
//         dispatch(clearSuccess());
//       }, 3000);
//     }
//   }, [success, dispatch]);

//   return (
//     <div className="flex h-screen">
//       <Sidebar />

//       <main className="flex-1 p-6 bg-gray-100">
//         <div className="container mx-auto">
//           <div className="bg-white shadow rounded-lg p-4 md:p-8">
//             <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
//             {showSuccessMessage && (
//               <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
//                 Profile updated successfully!
//               </div>
//             )}
//             {error && (
//               <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
//                 {error}
//               </div>
//             )}
//             <form onSubmit={handleUpdateProfile}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="firstName">
//                   User Name
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   id="firstName"
//                   type="text"
//                   value={user?.username || ''}
//                   readOnly
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
//                   Email Address
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   id="email"
//                   type="email"
//                   value={user?.email || ''}
//                   readOnly
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phoneNumber">
//                   Phone Number
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   id="phoneNumber"
//                   type="tel"
//                   value={phoneNumber}
//                   onChange={handlePhoneNumberChange}
//                 />
//               </div>
//               <button
//                 type="button"
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                 onClick={() => setShowModal(true)}
//               >
//                 Add Address
//               </button>
//             </form>
//           </div>
//         </div>
//       </main>

//       {showModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Enter Address</h2>
//             <form onSubmit={handleUpdateProfile}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="addressLine1">
//                   Address Line 1
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   id="addressLine1"
//                   type="text"
//                   value={address}
//                   onChange={handleAddressChange}
//                   placeholder="Enter address line 1"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="addressLine2">
//                   Address Line 2
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   id="addressLine2"
//                   type="text"
//                   value={address}
//                   onChange={handleAddressChange}
//                   placeholder="Enter address line 2"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="city">
//                   City
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   id="city"
//                   type="text"
//                   value={address}
//                   onChange={handleAddressChange}
//                   placeholder="Enter city"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="state">
//                   State
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   id="state"
//                   type="text"
//                   value={address}
//                   onChange={handleAddressChange}
//                   placeholder="Enter state"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="pincode">
//                   Pincode
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   id="pincode"
//                   type="text"
//                   value={address}
//                   onChange={handleAddressChange}
//                   placeholder="Enter pincode"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="googleMapsLocation">
//                   Google Maps Location
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   id="googleMapsLocation"
//                   type="text"
//                   value={address}
//                   onChange={handleAddressChange}
//                   placeholder="Enter Google Maps location"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;
