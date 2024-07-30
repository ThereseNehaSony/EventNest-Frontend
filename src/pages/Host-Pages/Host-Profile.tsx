

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IUserSelector,IHostSelector } from '../../interface/IUserSlice';
import { updateHostProfile } from '../../redux/actions/hostActions';

import { AppDispatch } from '../../redux/store';
import { clearSuccess } from '../../redux/reducers/host/hostSlice';

const HostProfile: React.FC = () => {
  const user = useSelector((state: IUserSelector) => state.user?.user);
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);
  const data = useSelector((state: IHostSelector) => state.host?.userDetails);
  const success = useSelector((state: any) => state.user.success); 

  const [profileDetails, setProfileDetails] = useState({
    phone: data?.phone || '',
    address: data?.address || '',
    aadharNumber: data?.aadharNumber || '',
    bankAccountNumber: data?.bankAccountNumber || '',
  });
  
  //validation errors
  const [errors, setErrors] = useState({
    phone: '',
    address: '',
    aadharNumber: '',
    bankAccountNumber: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '', 
    });
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form inputs
    let isValid = true;
    const newErrors = { ...errors };

    if (!profileDetails.phone.trim() || profileDetails.phone.length !== 10 || /^0+$/.test(profileDetails.phone)) {
      newErrors.phone = 'Phone number must be 10 digits and cannot be all zeros';
      isValid = false;
    }

    if (!profileDetails.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!profileDetails.aadharNumber.trim() || profileDetails.aadharNumber.length !== 12) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits';
      isValid = false;
    }

    if (!profileDetails.bankAccountNumber.trim() || profileDetails.bankAccountNumber.length !== 16) {
      newErrors.bankAccountNumber = 'Bank account number must be 16 digits';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      dispatch(updateHostProfile({ id, ...profileDetails }));
    }
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
     

      <main className="flex-1 p-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="bg-white shadow rounded-lg p-4 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
            {showSuccessMessage && (
              <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
                Profile updated successfully!
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                  User Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="name"
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
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profileDetails.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="address"
                  name="address"
                  type="text"
                  value={profileDetails.address}
                  onChange={handleChange}
                />
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="aadharNumber">
                  Aadhar Number
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="aadharNumber"
                  name="aadharNumber"
                  type="text"
                  value={profileDetails.aadharNumber}
                  onChange={handleChange}
                />
                {errors.aadharNumber && <p className="text-red-600 text-sm mt-1">{errors.aadharNumber}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="bankAccountNumber">
                  Bank Account Number
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  type="text"
                  value={profileDetails.bankAccountNumber}
                  onChange={handleChange}
                />
                {errors.bankAccountNumber && <p className="text-red-600 text-sm mt-1">{errors.bankAccountNumber}</p>}
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

export default HostProfile;
