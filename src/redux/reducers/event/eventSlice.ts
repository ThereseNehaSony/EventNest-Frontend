// src/redux/slices/eventSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../config/constants';

interface Location {
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  googleMapLink: string;
}

interface Event {
  _id: string;
  image: string;
  title: string;
  description: string;
  host: string;
  startDate: string;
  endDate: string;
  location: Location;
  type: string;
}

interface EventState {
  event: Event | null;
  relatedEvents: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  event: null,
  relatedEvents: [],
  loading: false,
  error: null,
};

// Async thunk for fetching event details
export const fetchEventById = createAsyncThunk<Event, string>(
  'event/fetchEventById',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Event>(`${baseUrl}/event/${eventId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue('Failed to fetch event data');
    }
  }
);

// Async thunk for fetching related events by host
export const fetchRelatedEventsByHost = createAsyncThunk<Event[], string>(
  'event/fetchRelatedEventsByHost',
  async (host, { rejectWithValue }) => {
    try {
      const response = await axios.get<Event[]>(`${baseUrl}/events/host/${host}`);
      return response.data;
    } catch (err) {
      return rejectWithValue('Failed to fetch related events');
    }
  }
);

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    clearEvent: (state) => {
      state.event = null;
      state.relatedEvents = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRelatedEventsByHost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedEventsByHost.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedEvents = action.payload;
      })
      .addCase(fetchRelatedEventsByHost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEvent } = eventSlice.actions;
export default eventSlice.reducer;
