
import { createSlice,PayloadAction  } from "@reduxjs/toolkit";
import { getAllUsers,
      getAllHosts ,
      getHostDetails,
      getAllCategories,
      addCategory,
      updateCategoryStatus,
      updateHostStatus,
      updateUserStatus,
      getAllEvents ,
      } from "../../actions/adminActions";

interface Category {
  _id: string;
  name: string;
  isBlocked: boolean;
  error: string | null;
  loading: boolean;
  
}

export interface EventData {
  _id: string; 
  title: string;
  category: string;
  startDate: string;
  time: string;
  description: string;
  host: string;
  location: string;
  entryType: string;
  entryFee: number;
  image: string;
  status?: string; // Optional, if status is part of the data
}

 interface AdminState {
  categories: Category[];
  hostDetails: any;
  users: any[];
  error: string | null;
  loading: boolean;
  events: EventData[];
  partialEventData: Partial<EventData> | null;
}
const initialState: AdminState = {
  categories: [],
  hostDetails: null,
  users: [],
  error: null,
  loading: false,
  events:[],
  partialEventData: null,
};

const adminSlice : any = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    makeErrorDisable: (state) => {
      state.error = null;
    },
    savePartialEventData: (state, action: PayloadAction<Partial<EventData>>) => {
      state.partialEventData = action.payload;
    },
    clearPartialEventData: (state) => {
      state.partialEventData = null;
    },
    
  },
  extraReducers: (builder) => {
    builder
    
    .addCase(getAllUsers.pending,(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllUsers.fulfilled,(state, action) => {
      console.log("🚀 ~ file: adminSlice.ts:81 ~ .addCase ~ action:", action)
      state.users =  action.payload.users;
      state.loading = false;
    })
    .addCase(getAllUsers.rejected,(state, action) => {
      state.error =  action.payload as string;
      state.loading = false;
    })
    .addCase(getAllHosts.pending,(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllHosts.fulfilled,(state, action) => {
      console.log("🚀 ~ file: adminSlice.ts:81 ~ .addCase ~ action:", action)
      state.users =  action.payload.users;
      state.loading = false;
    })
    .addCase(getAllHosts.rejected,(state, action) => {
      state.error =  action.payload as string;
      state.loading = false;
    })
    .addCase(getHostDetails.pending, (state) => {
      state.loading = true;
    })
    .addCase(getHostDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.hostDetails = action.payload;
    })
    .addCase(getHostDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(getAllCategories.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    })
    .addCase(getAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch categories';
    })
    .addCase(addCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(addCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories.push(action.payload);
    })
    .addCase(addCategory.rejected, (state, action) => {
      state.loading = false;
      state.error =  'Failed to add category';
    })
    .addCase(updateCategoryStatus.fulfilled, (state, action) => {
      const index = state.categories.findIndex(category => category._id === action.payload._id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    })
   
    .addCase(updateHostStatus.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateHostStatus.fulfilled, (state, action) => {
      state.loading = false;
      if (state.users) {
        const updatedUsers = state.users.map((user: any) => {
          if (user._id === action.payload._id) {
            return { ...user, status: action.payload.status };
          }
          return user;
        });
        state.users = updatedUsers;
      }
    })
    .addCase(updateHostStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Failed to update host status';
    })
    .addCase(getAllEvents.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllEvents.fulfilled, (state, action: PayloadAction<EventData[]>) => {
      state.events = action.payload;
      state.loading = false;
    })
    .addCase(getAllEvents.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to fetch events';
      state.loading = false;
    });
    
     

    
    
  }
});

export const {makeErrorDisable,savePartialEventData, clearPartialEventData} = adminSlice.actions;
export default adminSlice.reducer