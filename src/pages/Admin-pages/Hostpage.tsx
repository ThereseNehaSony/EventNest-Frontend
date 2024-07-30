
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getAllHosts, getHostDetails, updateHostStatus } from '../../redux/actions/adminActions';
import Sidebar from '../../components/sidebar/sidebar';
import StatsBox from '../../components/boxes/boxes';

const AdminHostsList = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState(1);
  const [newStatus, setNewStatus] = useState('');
  const [hostId, setHostId] = useState('');
  const [hostDetails, setHostDetails] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const { users, totalHosts } = useSelector((state: any) => state.admin);

  const dispatch = useDispatch<AppDispatch>();
  console.log("🚀 ~ file: AdminHostsList.tsx:8 ~ AdminHostsList ~ hosts:", users);

  useEffect(() => {
    dispatch(getAllHosts({
      page: activePage,
      limit: 10
    })).then((response) => {
      console.log("🚀 ~ file: AdminHostsList.tsx:22 ~ useEffect ~ response:", response);
      if (response.payload?.totalPage) {
        setTotalPage(response.payload?.totalPage);
      }
    });
  }, [activePage, status, open]);

  const tableHead = ['Customer name', 'Email',  'Status'];

  // Function to fetch host details and toggle status
  const toggleHostStatus = async (hostId: string, currentStatus: string) => {
    setStatus((prevState) => prevState + 1);
    currentStatus === 'pending' ? setNewStatus('approved') : setNewStatus('pending');
    setHostId(hostId);

    const response = await dispatch(getHostDetails(hostId));
    if (response.payload) {
      setHostDetails(response.payload);
      console.log(response.payload,"logging payload")
      console.log(hostDetails,"dtails....")
      setOpen(true);
    }
  };

  const positiveAction = () => {
    dispatch(updateHostStatus({ newStatus, hostId }));
    setOpen(false);
  };

  const negativeAction = () => {
    setOpen(false);
  };

  const columns = tableHead;
  const data = users?.map((row: any) => ({
    Name: row.username,
    Email: row.email,
    Status: row.status,
    Action: row.status === 'pending' ? (
      <button
        className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-6 text-white p-3'
        onClick={() => toggleHostStatus(row._id, row.status)}
      >
        Verify
      </button>
    ) : (
      <button
        className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-6 text-white p-3'
        onClick={() => toggleHostStatus(row._id, row.status)}
      >
        Pending
      </button>
    ),
  }));

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 ml-64">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatsBox title="Total Hosts" value={totalHosts} bgColor="bg-blue-400" />
          <StatsBox title="Blocked Hosts" value={blockedHosts} bgColor="bg-red-500" />
          <StatsBox title="Active Hosts" value={activeHosts} bgColor="bg-green-500" />
        </div> */}
        <div className="mt-20">
        {open && (
            <div className='absolute inset-0 bg-black/60 w-full h-full flex items-center z-10 justify-center'>
              <div className='flex flex-col gap-4 items-center align-middle bg-white w-1/3 p-6 relative'>
                <div className='relative w-full text-center'>
                  <h1 className='text-xl'>Host Details</h1>
                  <button
                    className='absolute top-0 right-0 text-2xl'
                    onClick={() => setOpen(false)}
                  >
                    &times;
                  </button>
                </div>
                {hostDetails && (
                  <div className='text-left'>
                    <p><strong>Username:</strong> {hostDetails.data.username}</p>
                    <p><strong>Email:</strong> {hostDetails.data.email}</p>
                    <p><strong>Phone:</strong> {hostDetails.data.phone}</p>
                    <p><strong>Address:</strong> {hostDetails.data.address}</p>
                    <p><strong>Aadhar Number:</strong> {hostDetails.data.aadharNumber}</p>
                    <p><strong>Bank Account Number:</strong> {hostDetails.data.bankAccountNumber}</p>
                  </div>
                )}
                <div className='flex gap-6 text-2xl'>
                  <button onClick={positiveAction} className='bg-green-600 px-3 py-2 rounded-md'>Verify</button>
                  <button onClick={negativeAction} className='bg-red-600 px-3 py-2 rounded-md'>Reject</button>
                </div>
              </div>
            </div>
          )}
          <TableContainer className='flex justify-center ms-8 mt-8' component={Paper} style={{ width: '95%' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className='bg-gradient-to-l from-gray-700 to-gray-950 shadow-black'>
                  {tableHead.map((header: string, index: number) => (
                    <TableCell key={index} className='text-white font-roboto font-bold'>
                      <div className='text-white'>{header}</div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((row: any, index: number) => (
                  <TableRow
                    key={index}
                    className={clsx(index % 2 === 0 ? '' : 'bg-violet-200', 'text-white')}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {Object.entries(row).filter(([key, value]) => key !== '_id').map(([key, value]: [string, any], subIndex: number) => (
                      <TableCell key={subIndex}>
                        {key !== 'status' && value}
                        {key === 'status' && (
                          value === 'pending' ? (
                            <button
                              className='bg-green-600 hover:bg-green-700 text-white rounded-md px-6 py-2'
                              onClick={() => toggleHostStatus(row._id, value)}
                            >
                              Verify
                            </button>
                          ) : (
                            <button
                              className='bg-red-600 hover:bg-red-700 text-white rounded-md px-6 py-2'
                              onClick={() => toggleHostStatus(row._id, value)}
                            >
                              Pending
                            </button>
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Stack alignItems={'center'} spacing={2}>
          <Pagination onChange={(_, page) => setActivePage(page)} count={totalPage} variant="outlined" color="primary" />
        </Stack>
      </div>
    </div>
  );
};

export default AdminHostsList;






