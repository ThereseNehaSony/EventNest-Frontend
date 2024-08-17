
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserSignupData } from '../../../interface/IUserSignup';
import { userSignup, userLogin, logout, updateUser, fetchUser, sendOtp, userForgotPassword, verifyOtp, resetPassword, fetchAdditionalUserDetails } from '../../actions/userActions';
import { IUserLogin } from "../../../interface/IUserLogin";
import { IUserDetails } from '../../../interface/IUserDetails';

interface UserState {
  user: IUserSignupData | null;
  error: string | null;
  loading: boolean;
  userDetails: IUserDetails | null;
  success: boolean;
  message: string | null;
}

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
  userDetails: null,
  success: false,
  message: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserSuccess: (state, action: PayloadAction<{ user: UserState['user'] }>) => {
      state.user = action.payload.user;
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    makeErrorDisable: (state) => {
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
    clearSuccess(state) { 
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, action: PayloadAction<IUserSignupData>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(userSignup.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearError, (state) => {
        state.error = null; 
      })
      .addCase(userLogin.fulfilled, (state, action: any) => {
        state.loading = false;
        state.user = action.payload as IUserLogin;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as IUserLogin;
        state.error = null;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state, action: any) => {
        state.loading = false;
       // state.userDetails = action.payload as IUserLogin;
        state.error = null;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAdditionalUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdditionalUserDetails.fulfilled, (state, action: PayloadAction<IUserDetails>) => {
        state.loading = false;
        state.userDetails = action.payload 
        state.error = null;
      })
      .addCase(fetchAdditionalUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { makeErrorDisable, clearSuccess, updateUserSuccess, updateUserFailure,clearError } = userSlice.actions;
export default userSlice.reducer;
