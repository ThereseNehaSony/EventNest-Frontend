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

  const [phoneNumber, setPhoneNumber] = useState(data?.phone || '');
  const dispatch = useDispatch<AppDispatch>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
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
    dispatch(updateUser({ id, phone: phoneNumber }));
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
