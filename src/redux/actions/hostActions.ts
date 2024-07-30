// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios,{AxiosError} from "axios";
// import { baseUrl } from "../../config/constants";
// import { handleError,config,ApiError } from "../../config/configuration";
// import { IHostProfile, IHostUpdateProfile } from "../../interface/IHostProfile";

// export const fetchHostProfile = createAsyncThunk(
//     'host/fetchHostprofile',
//     async(hostId:string,{rejectWithValue})=>{
//         try {
//             console.log(`'fetching user data': ${hostId}`);
//                 const {data} = await axios.get(`${baseUrl}/host/profile/${hostId}`,config)
//                 return data as IHostProfile
            
//         } catch (error:any) {
//             const axiosError = error as AxiosError<ApiError>;
//             return rejectWithValue(axiosError.response?.data.message || error.message);
//         }
//     }
// )


// export const updateHostProfile = createAsyncThunk(
//     'host/updateHostProfile',
//     async (updateData: { hostId: string; profileDetails: IHostUpdateProfile }, { rejectWithValue }) => {
//       try {
//         const { data } = await axios.put(`${baseUrl}/host/profile/${updateData.hostId}`, updateData.profileDetails, config);
//         return data as IHostProfile;
//       } catch (err: any) {
//         const axiosError = err as AxiosError<ApiError>;
//         return rejectWithValue(axiosError.response?.data.message || err.message);
//       }
//     }
//   );

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../../config/constants";
import { handleError, config, ApiError } from "../../config/configuration";
import { IHostProfile, IHostUpdateProfile } from "../../interface/IHostProfile";

export const fetchHostProfile = createAsyncThunk<IHostProfile, string>(
  'host/fetchHostProfile',
  async (hostId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/host/profile/${hostId}`, config);
      return data as IHostProfile;
    } catch (error: any) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(axiosError.response?.data.message || error.message);
    }
  }
);

export const updateHostProfile = createAsyncThunk(
  'host/updateHost',
  async (updateData:any, { rejectWithValue }) => {
    try {
      console.log(updateData,"dta......")
      const response = await axios.post(`${baseUrl}/host/updateHost`, updateData, config);
      return response.data
    } catch (err: any) {
      const axiosError = err as AxiosError<ApiError>;
      return rejectWithValue(axiosError.response?.data.message || err.message);
    }
  }
);

export const fetchAdditionalHostDetails = createAsyncThunk(
  'host/fetchAdditionalHostDetails',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/host/details`, { withCredentials: true });
      return data.userDetails;
    } catch (error: any) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue(axiosError.response?.data.message || error.message);
    }
  }
);

export const logout = createAsyncThunk("host/logout", async () => {
  try {
      const response = await axios.get(`${baseUrl}/auth/logout`,{withCredentials: true});
      return response
  } catch (error: any) {
      throw new Error(error.message)
  }
})

