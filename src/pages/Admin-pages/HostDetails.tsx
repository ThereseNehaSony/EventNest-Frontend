import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import Modal from '../../components/modals/Modals';

interface HostDetailsProps {
  name: string;
  email: string;
  contact: string;
  status: string;
  address: string;
  aadhar_no: string;
  aadhar_image: string;
  onApprove: () => void;
  onReject: () => void;
}

const HostDetails: React.FC<HostDetailsProps> = ({ name, email, contact, status, aadhar_no, address, aadhar_image, onApprove, onReject }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Host Details</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <p className='mb-5 ml-10'><strong>Name:</strong> {name}</p>
        <p className='mb-5 ml-10'><strong>Email:</strong> {email}</p>
        <p className='mb-5 ml-10'><strong>Contact:</strong> {contact}</p>
        <p className='mb-5 ml-10'><strong>Address:</strong> {address}</p>
        <p className='mb-5 ml-10'><strong>Aadhar No:</strong> {aadhar_no}</p>
        <p className='mb-5 ml-10'><strong>Aadhar image:</strong> {aadhar_image}</p>
        <p className='mb-5 ml-10'><strong>Status:</strong> {status}</p>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button onClick={onReject} className="px-4 py-2 bg-red-500 text-white rounded">Reject</button>
        <button onClick={onApprove} className="px-4 py-2 bg-green-500 text-white rounded">Approve</button>
      </div>
    </div>
  );
};

const HostDetailsPage: React.FC = () => {
  const [host, setHost] = useState({
    name: 'Jane Smith',
    email: 'jane@example.com',
    contact: '9024578985',
    address: 'Karickal h, beemandy p.o',
    aadhar_no: '57862412541',
    aadhar_image: '',
    status: 'Pending',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = () => {
    setHost({ ...host, status: 'Approved' });
  };

  const handleReject = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = (inputValue: string) => {
    console.log('Reason for rejection:', inputValue);
    setHost({ ...host, status: 'Rejected' });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 ml-64">
        <HostDetails
          name={host.name}
          email={host.email}
          contact={host.contact}
          status={host.status}
          address={host.address}
          aadhar_image={host.aadhar_image}
          aadhar_no={host.aadhar_no}
          onApprove={handleApprove}
          onReject={handleReject}
        />
        <Modal
          title="Reason for Rejection"
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
        />
      </div>
    </div>
  );
};

export default HostDetailsPage;
