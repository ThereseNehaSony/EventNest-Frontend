import React, { useState } from 'react';

const PaymentPage: React.FC = () => {
  // Sample payment data
  const [paymentType, setPaymentType] = useState<string>('Online Payment');
  const totalAmount = 5000;
  const convenienceFee = 100;
  const gst = 18;

  const calculateTotalPrice = () => {
    return totalAmount + convenienceFee + gst;
  };

  return (
    <div className="flex h-screen justify-center items-center">
      {/* Main Content */}
      <div className="container mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        
        {/* Payment Guidelines */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Payment Guidelines</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>As a host on our platform, you are required to pay a fee of 10% of your
                 estimated income from event ticket sales to the admin.</li>
            <li>This fee helps support the platform's operations, maintenance, and marketing efforts, 
                ensuring a smooth experience for both hosts and attendees.</li>
            <li>For any issues during payment, contact our support immediately.</li>
            <li>All transactions are secured with end-to-end encryption.</li>
          </ul>
        </div>

        {/* Payment Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Payment Summary</h2>
          <div className="text-gray-800">
            <p className="text-lg mb-2">Total Amount:</p>
            <p className="text-4xl font-bold text-blue-500 mb-6">₹{totalAmount.toFixed(2)}</p>

            <p className="text-lg mb-2">Select Payment Type:</p>
            <div className="mb-6 space-y-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentType"
                  value="Online Payment"
                  checked={paymentType === 'Online Payment'}
                  onChange={() => setPaymentType('Online Payment')}
                  className="form-radio h-4 w-4 text-blue-500"
                />
                <span className="ml-2 text-gray-700">Online Payment</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentType"
                  value="Wallet"
                  checked={paymentType === 'Wallet'}
                  onChange={() => setPaymentType('Wallet')}
                  className="form-radio h-4 w-4 text-blue-500"
                />
                <span className="ml-2 text-gray-700">Wallet</span>
              </label>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>Convenience Fee:</span>
                <span>₹{convenienceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>GST:</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Price:</span>
                <span>₹{calculateTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
              Proceed to Pay ₹{calculateTotalPrice().toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
