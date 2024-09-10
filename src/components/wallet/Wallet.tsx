// import React from 'react';
// import Sidebar from '../sidebar/userSidebar'; // Import your Sidebar component
// import { fetchWalletData } from '../../redux/actions/userActions';

// const WalletPage: React.FC = () => {
//   // Sample data for demonstration
//   const wallet = {
//     totalAmount: 5000,
//     transactions: [
//       { id: 1, date: '2024-08-10', description: 'Event Booking - Event A', amount: -200 },
//       { id: 2, date: '2024-08-08', description: 'Refund - Event B', amount: 100 },
//       { id: 3, date: '2024-08-05', description: 'Event Booking - Event C', amount: -150 },
//       { id: 4, date: '2024-08-03', description: 'Top-Up', amount: 500 },
//     ],
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <div className="container mx-auto">
//           {/* Wallet Balance */}
//           <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md mb-6">
//             <h1 className="text-2xl font-semibold">Wallet Balance</h1>
//             <p className="text-4xl font-bold mt-2">₹{wallet.totalAmount.toFixed(2)}</p>
//           </div>

//           {/* Transactions */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white">
//                 <thead>
//                   <tr>
//                     <th className="py-2 px-4 text-left text-gray-600">Date</th>
//                     <th className="py-2 px-4 text-left text-gray-600">Description</th>
//                     <th className="py-2 px-4 text-right text-gray-600">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {wallet.transactions.map((transaction) => (
//                     <tr key={transaction.id} className="border-t">
//                       <td className="py-2 px-4 text-gray-700">{transaction.date}</td>
//                       <td className="py-2 px-4 text-gray-700">{transaction.description}</td>
//                       <td
//                         className={`py-2 px-4 text-right ${
//                           transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
//                         }`}
//                       >
//                         ₹{transaction.amount.toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WalletPage;

import React ,{useState,useEffect}from 'react';
import Sidebar from '../sidebar/userSidebar'; // Import your Sidebar component
import { fetchWalletData } from '../../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const WalletPage: React.FC = () => {
  const [wallet, setWallet] = useState<{
    balance: number;
    transactions: Array<{ id: number; date: string; type: string; amount: number }>;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state:any)=>state.user)

  // Replace with actual user ID or obtain it from context or authentication service
  const userId = user._id; 
console.log(userId,"id......")
  useEffect(() => {
    const getWalletData = async () => {
      try {
        const data = await fetchWalletData(userId);
        console.log(data,"data.......");
        
        setWallet(data);
        console.log(wallet,"wallet.....")
      } catch (err) {
        setError('Failed to fetch wallet data');
      } finally {
        setLoading(false);
      }
    };

    getWalletData();
  }, [userId]);

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
                    <th className="py-2 px-4 text-left text-gray-600">Description</th>
                    <th className="py-2 px-4 text-right text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody>
                {wallet.transactions.map((transaction) => (
  <tr key={transaction.id} className="border-t">
    <td className="py-2 px-4 text-gray-700">
      {new Date(transaction.date).toLocaleDateString()} {/* Format the date as needed */}
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
    <td
      className={`py-2 px-4 text-right ${
        transaction.type === 'debit' ? 'text-red-500' : 'text-green-500'
      }`}
    >
      ₹{Math.abs(transaction.amount).toFixed(2)} {/* Use Math.abs to ensure the amount is positive */}
    </td>
  </tr>
))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;