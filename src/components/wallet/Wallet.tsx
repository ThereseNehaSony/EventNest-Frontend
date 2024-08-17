import React from 'react';
import Sidebar from '../sidebar/userSidebar'; // Import your Sidebar component

const WalletPage: React.FC = () => {
  // Sample data for demonstration
  const wallet = {
    totalAmount: 5000,
    transactions: [
      { id: 1, date: '2024-08-10', description: 'Event Booking - Event A', amount: -200 },
      { id: 2, date: '2024-08-08', description: 'Refund - Event B', amount: 100 },
      { id: 3, date: '2024-08-05', description: 'Event Booking - Event C', amount: -150 },
      { id: 4, date: '2024-08-03', description: 'Top-Up', amount: 500 },
    ],
  };

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
            <p className="text-4xl font-bold mt-2">₹{wallet.totalAmount.toFixed(2)}</p>
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
                      <td className="py-2 px-4 text-gray-700">{transaction.date}</td>
                      <td className="py-2 px-4 text-gray-700">{transaction.description}</td>
                      <td
                        className={`py-2 px-4 text-right ${
                          transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                        }`}
                      >
                        ₹{transaction.amount.toFixed(2)}
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
