import axios,{AxiosError} from 'axios'
import { baseUrl } from './constants'
import {ApiError,handleError} from './configuration'


const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true
  })

  export const reduxRequest = async (
    method?: string,
    route?: string,
    config?: any,
    rejectWithValue?: any,
    body?: any,
  ) => {
    const requestConfig = {
      method,
      url: route,
      data:body,
      config,
    };
    try {
      const response = await instance(requestConfig);
      console.log("🚀 ~ file: api.ts:25 ~ response:", response)
      return response.data.data;
    } catch (error: any) {
      const axiosError = error as AxiosError<ApiError>;
      return handleError(axiosError, rejectWithValue);
    }
  }
  
  export const commonRequest = async (
    method: string,
    route: any,
    config: any,
    body?: any,
  ) => {
    const requestConfig = {
      method,
      url: route,
      headers: config,
      data:body,
    };
    try {
  
      const response = await instance({...requestConfig});
      return response;
    } catch (error: any) {
      return error
    }
  }


  
export const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true, 
  });
  
  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const { data } = await axios.post('/auth/refresh-token', {}, { withCredentials: true });
          api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  