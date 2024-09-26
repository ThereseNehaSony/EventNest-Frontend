import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/userSidebar';
import { fetchWalletData } from '../../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const WalletPage: React.FC = () => {
  const [wallet, setWallet] = useState<{
    balance: number;
    transactions: Array<{ id: number; date: string; type: string; amount: number }>;
    currentPage: number;
    totalPages: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // Manage current page
  const [limit] = useState<number>(5); // Number of transactions per page

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.user);
  const userId = user._id;

  useEffect(() => {
    const getWalletData = async () => {
      try {
        const data = await fetchWalletData(userId, page, limit);
        setWallet(data);
      } catch (err) {
        setError('Failed to fetch wallet data');
      } finally {
        setLoading(false);
      }
    };

    getWalletData();
  }, [userId, page]);

  const handleNextPage = () => {
    if (wallet && page < wallet.totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">No wallet data available.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="container mx-auto">
          {/* Wallet Balance */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-semibold">Wallet Balance</h1>
            <p className="text-4xl font-bold mt-2">₹{wallet.balance.toFixed(2)}</p>
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 text-left text-gray-600">Date</th>
                    <th className="py-2 px-4 text-left text-gray-600">Type</th>
                    <th className="py-2 px-4 text-left text-gray-600">Description</th>
                    <th className="py-2 px-4 text-right text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {wallet.transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t">
                      <td className="py-2 px-4 text-gray-700">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 text-gray-700">
                        <span
                          className={`inline-block px-2 py-1 rounded text-white ${
                            transaction.type === 'debit' ? 'bg-red-500' : 'bg-green-500'
                          }`}
                        >
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-gray-700">
                   <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      transaction.type === 'debit' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}
                      >
                    {transaction.type === 'debit' ? (
                      <>
                      <svg
                      className="w-4 h-4 mr-1 text-red-500"
                      fill="currentColor"
                       viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg"
                       >
                     <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 00.293.707l2 2a1 1 0 001.414-1.414L11 9.586V7z"
                    clipRule="evenodd"
                   />
                     </svg>
                     Event Purchase
                       </>
                      ) : (
                     <>
                      <svg
                     className="w-4 h-4 mr-1 text-green-500"
                    fill="currentColor"
                   viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                     >
                    <path
                    fillRule="evenodd"
                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5V9a1 1 0 112 0v4a1 1 0 01-2 0z"
                      clipRule="evenodd"
                      />
                   </svg>
                   Refund
                   </>
                  )}
                </span>
                </td>

                      <td
                        className={`py-2 px-4 text-right ${
                          transaction.type === 'debit' ? 'text-red-500' : 'text-green-500'
                        }`}
                      >
                        ₹{Math.abs(transaction.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded ${
                page === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded ${
                page === wallet.totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleNextPage}
              disabled={page === wallet.totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
