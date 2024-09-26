import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IUserSelector, IHostSelector } from '../../interface/IUserSlice';
import { updateHostProfile } from '../../redux/actions/hostActions';
import { AppDispatch } from '../../redux/store';
import { clearSuccess } from '../../redux/reducers/host/hostSlice';

const HostProfile: React.FC = () => {
  const user = useSelector((state: IUserSelector) => state.user?.user);
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);
  const data = useSelector((state: IHostSelector) => state.host?.userDetails);
  const success = useSelector((state: any) => state.host.success);

  const [profileDetails, setProfileDetails] = useState({
    phone: '',
    address: '',
    aadharNumber: '',
    bankAccountNumber: '',
  });

  const [errors, setErrors] = useState({
    phone: '',
    address: '',
    aadharNumber: '',
    bankAccountNumber: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (data) {
      setProfileDetails({
        phone: data.phone || '',
        address: data.address || '',
        aadharNumber: data.aadharNumber || '',
        bankAccountNumber: data.bankAccountNumber || '',
      });
    }
  }, [data]);

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

    let isValid = true;
    const newErrors = { ...errors };

    if (!profileDetails.phone.trim() || profileDetails.phone.length !== 10 || !/^\d+$/.test(profileDetails.phone) || profileDetails.phone.startsWith('0')) {
      newErrors.phone = 'Phone number must be 10 digits, not start with 0, and not be all zeros';
      isValid = false;
    }

    if (!profileDetails.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!profileDetails.aadharNumber.trim() || profileDetails.aadharNumber.length !== 12 || !/^\d+$/.test(profileDetails.aadharNumber) || /^0+$/.test(profileDetails.aadharNumber)) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits and cannot be all zeros';
      isValid = false;
    }

    if (!profileDetails.bankAccountNumber.trim() || profileDetails.bankAccountNumber.length < 9 || profileDetails.bankAccountNumber.length > 18 || !/^\d+$/.test(profileDetails.bankAccountNumber) || /^0+$/.test(profileDetails.bankAccountNumber)) {
      newErrors.bankAccountNumber = 'Bank account number must be between 9 and 18 digits, numeric only, and cannot be all zeros';
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Profile</h2>

        {showSuccessMessage && (
          <div className="bg-green-100 text-green-800 p-3 mb-6 rounded text-center">
            Profile updated successfully!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Information Card */}
          <div className="p-6 bg-white border rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Account Information</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                type="text"
                value={user?.username || ''}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                type="email"
                value={user?.email || ''}
                readOnly
              />
            </div>
          </div>

          {/* Profile Details Form */}
          <form onSubmit={handleSubmit} className="p-6 bg-white border rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Profile Details</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                id="phone"
                name="phone"
                type="tel"
                value={profileDetails.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                Address
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                id="address"
                name="address"
                type="text"
                value={profileDetails.address}
                onChange={handleChange}
              />
              {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="aadharNumber">
                Aadhar Number
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                id="aadharNumber"
                name="aadharNumber"
                type="text"
                value={profileDetails.aadharNumber}
                onChange={handleChange}
              />
              {errors.aadharNumber && <p className="text-red-600 text-sm mt-1">{errors.aadharNumber}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bankAccountNumber">
                Bank Account Number
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                id="bankAccountNumber"
                name="bankAccountNumber"
                type="text"
                value={profileDetails.bankAccountNumber}
                onChange={handleChange}
              />
              {errors.bankAccountNumber && <p className="text-red-600 text-sm mt-1">{errors.bankAccountNumber}</p>}
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
