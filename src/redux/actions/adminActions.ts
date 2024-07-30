// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { reduxRequest } from "../../config/api";
// import { config } from "../../config/configuration";

// export const getAllUsers = createAsyncThunk('user/listUsers', async({page, limit}: any, {rejectWithValue}) => {
//   return reduxRequest(
//     "get",
//     `/user/listUsers?page=${page}&limit=${limit}`,
//     config,
//     rejectWithValue
//   )
// })



// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { reduxRequest } from '../../config/api';
// import { config, handleError } from '../../config/configuration';

// export const getAllUsers = createAsyncThunk(
//   'admin/getAllUsers',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await reduxRequest(
//         'get',
//         '/admin/listUsers',
//         config,
//         rejectWithValue
//       );
//       return response; // Assuming your API response contains users data directly
//     } catch (error) {
//       return rejectWithValue('Failed to fetch users');
//     }
//   }
// );

// export const updateUserStatus = createAsyncThunk('user/updateStatus', async (status: any | null , {rejectWithValue}) => {
//     return reduxRequest(
//       "post",
//       `/admin/updateStatus`,
//       config,
//       rejectWithValue,
//       status
//     )
//   })



import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { reduxRequest } from "../../config/api";
import { config, ApiError } from "../../config/configuration";
import { baseUrl } from "../../config/constants";

export const getAllUsers = createAsyncThunk('user/listUsers', async({page, limit}: any, {rejectWithValue}) => {
  return reduxRequest(
    "get",
    `/user/listUsers?page=${page}&limit=${limit}`,
    config,
    rejectWithValue
  )
})
export const getAllHosts = createAsyncThunk(
  'user/listHosts', async({page, limit}: any, {rejectWithValue}) => {
  return reduxRequest(
    "get",
    `/user/listHosts?page=${page}&limit=${limit}`,
    config,
    rejectWithValue
  )
})
export const updateUserStatus = createAsyncThunk('user/updateStatus', async (status: any | null , {rejectWithValue}) => {
  return reduxRequest(
    "post",
    `/user/updateStatus`,
    config,
    rejectWithValue,
    status
  )
})

export const getHostDetails = createAsyncThunk(
  'admin/getHostDetails',
   async (hostId: string, {rejectWithValue}) => {
  try {
    const response = await axios.get(`${baseUrl}/host/hostDetails/${hostId}`,config);
    return response.data;
  } catch (error:any) {
    const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(axiosError.response?.data.message || error.message);
  }
});

export const updateHostStatus = createAsyncThunk(
  'admin/updateHostStatus', 
  async (data: { newStatus: string, hostId: string }, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${baseUrl}/host/updateStatus`, data);
    return response.data;
  } catch (error:any) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(axiosError.response?.data.message || error.message);
  }
});



// export const getAllCategories = createAsyncThunk('admin/getAllCategories',
//    async ({ page, limit }: { page: number, limit: number }, {rejectWithValue}) => {
//   try{
//   const response = await axios.post(`${baseUrl}/event/get-categories?page=${page}&limit=${limit}`);
//   return response.data;
//    }catch (error:any) {
//     const axiosError = error as AxiosError<ApiError>;
//     return rejectWithValue(axiosError.response?.data.message || error.message);
//   }
// });

export const getAllCategories = createAsyncThunk(
  'admin/getAllCategories',
  async () => {
    const response = await axios.get(`${baseUrl}/event/get-categories`);
    return response.data;
  }
);

// export const addCategory = createAsyncThunk('admin/addCategory', async ({ name }: { name: string }) => {
//   const response = await axios.post(`${baseUrl}/event/add-category`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ name }),
//   });
//   return response.data
// });
export const addCategory = createAsyncThunk(
  'admin/addCategory',
  async (formData: FormData,{rejectWithValue}) => {
    try {
    const response = await axios.post(`${baseUrl}/event/add-category`, formData,config );
      return response.data;
    } catch (error:any) {
      const axiosError = error as AxiosError<ApiError>;
        return rejectWithValue(axiosError.response?.data.message || error.message);
    }
      
    });
  
 



export const editCategory = createAsyncThunk('admin/editCategory', async ({ id, name }: { id: string, name: string }) => {
  const response = await fetch(`${baseUrl}/event/edit-category`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  });
  return response.json();
});

export const updateCategoryStatus = createAsyncThunk(
  'admin/updateCategoryStatus',
  async ({ id, isBlocked }: { id: string, isBlocked: boolean }) => {
    const response = await axios.put(`${baseUrl}/event/update-category-status`, { id, isBlocked });
    return response.data;
  }
);


