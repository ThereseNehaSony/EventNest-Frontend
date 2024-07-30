// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { IUserSignupData } from "../../interface/IUserSignup";
// import { IUserLogin } from "../../interface/IUserLogin";
// import { baseUrl } from "../../config/constants";
// import { handleError,config, ApiError } from "../../config/configuration";
// import axios,{ AxiosError } from "axios";
// import { reduxRequest } from "../../config/api";


// export const userSignup = createAsyncThunk(
//   'user/userSignup',
//   async (userCredentials: IUserSignupData, { rejectWithValue }) => {
    
//     try {
//       console.log("Reached in userSignup reducer");
//       const {data} = await axios.post(`${baseUrl}/auth/signup`, userCredentials,config);
//       console.log("data go")
//       return data.user;
//     } catch (err: any) {
//       const axiosError = err as AxiosError<ApiError>;
//       return handleError(axiosError, rejectWithValue);
//     }
//   }
// );

// export const userLogin = createAsyncThunk('user/userLogin',async (userCredentials: IUserLogin, {rejectWithValue}) => {
//   try {
//       console.log("reached in userLogin reducer")
//       const {data} = await axios.post(`${baseUrl}/auth/login`,userCredentials,config)
//       return data.user
//   } catch (error: any) {
//       const axiosError = error as AxiosError<ApiError>;
//       return handleError(axiosError, rejectWithValue);
//   }
// })


import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserSignupData } from "../../interface/IUserSignup";
import { IUserLogin } from "../../interface/IUserLogin";
import { baseUrl } from "../../config/constants";
import axios, { AxiosError } from "axios";
import { handleError, config, ApiError } from "../../config/configuration";


export const userSignup = createAsyncThunk(
  'user/userSignup',
  async (userCredentials: IUserSignupData, { rejectWithValue }) => {
    try {
      console.log(userCredentials, 'userCredentials before sending');
      const { data } = await axios.post(`${baseUrl}/auth/signup`, userCredentials, config);
      
      console.log(data, 'response data'); // Log response data
      return data.user;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      console.log(axiosError,"errrrrrr");
      
      return rejectWithValue(axiosError.response?.data.message || err.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  'user/userLogin',async (userCredentials: IUserLogin, {rejectWithValue}) => {
  try {
      
      const {data} = await axios.post(`${baseUrl}/auth/login`,userCredentials,config)
      return data.user
  } catch (error: any) {
      const axiosError = error as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
  }
})

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
      const response = await axios.get(`${baseUrl}/auth/isExist`, { withCredentials: true });
      console.log(response,'=-=-==--=-=-=-==--=-=--==--=')
      if (response.data.status === "ok") {
          return response.data.data;
      } else {
          throw new Error(response.data?.message);
      }
  } catch (error:any) {
      throw new Error(error?.message);
  }
})

export const fetchAdditionalUserDetails = createAsyncThunk(
  'user/fetchAdditionalUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/user/details`, { withCredentials: true });
      return data.userDetails;
    } catch (error: any) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(axiosError.response?.data.message || error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userCredentials : any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/user/updateUser`,userCredentials,config );
      return response.data;
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return rejectWithValue(axiosError.response?.data.message || err.message);
    }
  }
);


export const logout = createAsyncThunk("user/logout", async () => {
  try {
      const response = await axios.get(`${baseUrl}/auth/logout`,{withCredentials: true});
      return response
  } catch (error: any) {
      throw new Error(error.message)
  }
})
 
export const sendOtp = createAsyncThunk('user/sendOtp',
  async (email:string,{rejectWithValue})=>{
    try {
      console.log("otp sending......")
      const {data} = await axios.post(`${baseUrl}/auth/send-otp`,{email},config);
       return data.message
    } catch (error:any) {
      const axiosError = error as AxiosError<ApiError>
      return rejectWithValue(axiosError.response?.data.message || error.message)
    }
  }
)

export const userForgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async ({ email }: { email: string }, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/forgot-password`, { email },config);
      return response.data;
    } catch (error:any) {
      const axiosError = error as AxiosError<ApiError>
      return rejectWithValue(axiosError.response?.data.message || error.message)
    }
    }
  
);

// Action to verify OTP
export const verifyOtp = createAsyncThunk(
  'user/verifyOtp',
  async ({ email, otp }: { email: string; otp: string }, {rejectWithValue}) => {
    try {
      const response = await axios.post('/auth/verify-otp', { email, otp },config);
      return response.data;
    } catch (error:any) {
      const axiosError = error as AxiosError<ApiError>
      return rejectWithValue(axiosError.response?.data.message || error.message)
    }
  }
);

// Action to reset password
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ password, token }: { password: string; token: string }, {rejectWithValue}) => {
    try {
      const response = await axios.post('/auth/reset-password', { password, token });
      return response.data;
    } catch (error:any) {
      const axiosError = error as AxiosError<ApiError>
      return rejectWithValue(axiosError.response?.data.message || error.message)
    }
  }
);
