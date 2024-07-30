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
  // image: yup.mixed().required('Category image is required')
});

const AdminCategoryManagement = () => {
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; status: boolean }>({ id: '', status: false });
  // const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector((state: any) => state.admin);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      // image: null
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      // if (values.image) {
      //   formData.append('image', values.image);
      // }
      await dispatch(addCategory(formData));
      handleClose();
    }
  });

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.currentTarget.files) {
  //     const file = event.currentTarget.files[0];
  //     formik.setFieldValue('image', file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

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
      <Sidebar /> {/* Include your sidebar component here */}
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
                  {/* <TableCell>Image</TableCell> */}
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category: any) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    {/* <TableCell>
                      {category.image && (
                        <img
                          src={category.image}
                          alt={category.name}
                          style={{ width: '100px', height: '100px', borderRadius: '8px' }}
                        />
                      )}
                    </TableCell> */}
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
              {/* <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && <img src={imagePreview as string} alt="Preview" style={{ width: '100px', height: '100px' }} />} */}
              <Button color="primary" variant="contained" type="submit" className="mt-2">
                Add Category
              </Button>
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
