
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { reduxRequest,api } from "../../config/api";
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
export const getAllCategories = createAsyncThunk(
  'admin/getAllCategories',
  async () => {
    const response = await axios.get(`${baseUrl}/event/get-categories`);
    return response.data.data.categories;
  }
);
export const getAllEvents = createAsyncThunk(
  'admin/getAllEvents',
  async () => {
    const response = await axios.get(`${baseUrl}/event/getAllEvents`);
    return response.data.data.events;
  }
);
export const addCategory = createAsyncThunk(
  'admin/addCategory',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/event/add-category`, formData, config);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(axiosError.response?.data.message );
    }
  }
);

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
export const updateCategoryStatus = createAsyncThunk(
  'admin/updateCategoryStatus',
  async ({ id, isBlocked }: { id: string, isBlocked: boolean }) => {
    const response = await axios.post(`${baseUrl}/event/update-category-status`, { id, isBlocked });
    return response.data;
  }
);


