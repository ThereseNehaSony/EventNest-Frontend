
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { updateHostProfile,fetchAdditionalHostDetails } from '../../actions/hostActions';
import { IHostProfile } from '../../../interface/IHostProfile';
import { IUserDetails } from '../../../interface/IUserDetails'; 

interface HostState {
  user:   null;
  error: string | null;
  loading: boolean;
  userDetails: IUserDetails | null;
  success: boolean;
  message: string | null;
}

const initialState: HostState = {
  user: null,
  error: null,
  loading: false,
  userDetails: null,
  success: false,
  message: null,
};


const hostSlice = createSlice({
  name: 'host',
  initialState,
  reducers: {
    clearSuccess(state) {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateHostProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateHostProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
       // state.hostDetails = action.payload;
      })
      .addCase(updateHostProfile.rejected, (state, action) => {
        state.loading = false;
        //state.error = action.payload;
      })
      .addCase(fetchAdditionalHostDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdditionalHostDetails.fulfilled, (state, action: PayloadAction<IUserDetails>) => {
        state.loading = false;
        state.userDetails = action.payload 
        state.error = null;
      })
      .addCase(fetchAdditionalHostDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSuccess } = hostSlice.actions;
export default hostSlice.reducer;
