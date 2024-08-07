import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getAllCategories, addCategory, updateCategoryStatus } from '../../redux/actions/adminActions';
import { Modal, Button, TextField, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Sidebar from '../../components/sidebar/sidebar'; 

const validationSchema = yup.object({
  name: yup.string()
  .required('Category name is required')
  .matches(/^[a-zA-Z\s]+$/, 'Category name should only contain letters and spaces'),
});

const AdminCategoryManagement = () => {
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; status: boolean }>({ id: '', status: false });
  const dispatch = useDispatch<AppDispatch>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { categories, loading, error } = useSelector((state: any) => state.admin);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      try {
        await dispatch(addCategory(formData));
        handleClose();
        setErrorMessage(null); // Clear error message on successful submission
      } catch (error: any) {
        setErrorMessage(error.message); // Set error message if there's an error
      }
    }
  });



  const handleStatusChange = (id: string, isBlocked: boolean) => {
    setSelectedCategory({ id, status: !isBlocked });
    setConfirmationOpen(true);
  };

  const confirmStatusChange = async () => {
    await dispatch(updateCategoryStatus({ id: selectedCategory.id, isBlocked: selectedCategory.status }));
    setConfirmationOpen(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar /> 
      <div className="flex-1 p-4 ml-64">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Category
        </Button>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        
        <div className="mt-4">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories?.map((category: any) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    
                    <TableCell>{category.isBlocked ? 'Blocked' : 'Active'}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: category.isBlocked ? 'green' : 'red',
                          color: 'white'
                        }}
                        onClick={() => handleStatusChange(category._id, category.isBlocked)}
                      >
                        {category.isBlocked ? 'Unblock' : 'Block'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Modal open={open} onClose={handleClose}>
          <div style={{ padding: '20px', backgroundColor: 'white', margin: 'auto', marginTop: '100px', width: '50%' }}>
            <Typography variant="h6" gutterBottom>Add Category</Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Category Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                margin="normal"
              />
             
              <Button color="primary" variant="contained" type="submit" className="mt-2">
                Add Category
              </Button>
              {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            </form>
          </div>
        </Modal>
        <Modal open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
          <div style={{ padding: '20px', backgroundColor: 'white', margin: 'auto', marginTop: '100px', width: '30%' }}>
            <Typography variant="h6" gutterBottom>Confirm Action</Typography>
            <Typography gutterBottom>Are you sure you want to {selectedCategory.status ? 'block' : 'unblock'} this category?</Typography>
            <Button variant="contained" style={{
                            backgroundColor:'green', marginRight: '10px'
                            
                          }} onClick={confirmStatusChange}>
              Yes
            </Button>
            <Button variant="contained" style={{backgroundColor:'red' }} onClick={() => setConfirmationOpen(false)}>
              No
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};



export default AdminCategoryManagement;

