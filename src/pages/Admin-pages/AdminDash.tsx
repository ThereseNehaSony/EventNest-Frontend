import React from 'react';
import Table from '../../components/table/table';
import Sidebar from '../../components/sidebar/sidebar';
import StatsBox from '../../components/boxes/boxes'

function AdminDash() {
  const columns = ['Name', 'Email', 'Contact','Status','Action'];
  const data = [
    { Name: 'John Doe', Email: 'john@example.com', Contact:'9024578985',Status:'Active',Action:'' },
    { Name: 'Jane Smith',  Email: 'jane@example.com',Contact:'9024578985',Status:'Active',Action:'' },
  ];
  const totalUsers = 100;
  const blockedUsers = 10;
  const activeUsers = 90;

 
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatsBox title="Total Users" value={totalUsers} bgColor="bg-blue-400" />
          <StatsBox title="Blocked Users" value={blockedUsers} bgColor="bg-red-500" />
          <StatsBox title="Active Users" value={activeUsers} bgColor="bg-green-500" />
        </div>
        <div className="mt-20"> 
          {/* <Table columns={columns} data={data}  /> */}
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
