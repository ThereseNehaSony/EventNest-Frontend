import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TicketState {
  ticketQuantities: { [key: string]: number };
  totalPrice: number;
  eventName?: string; // Optional properties
  eventDateTime?: string; // Optional properties
}

const initialState: TicketState = {
  ticketQuantities: {},
  totalPrice: 0,
  eventName: undefined,
  eventDateTime: undefined,
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    // Updated payload type to include eventName and eventDateTime
    saveTicketData(state, action: PayloadAction<{
      ticketQuantities: { [key: string]: number };
      totalPrice: number;
      eventName?: string;
      eventDateTime?: string;
    }>) {
      state.ticketQuantities = action.payload.ticketQuantities;
      state.totalPrice = action.payload.totalPrice;
      state.eventName = action.payload.eventName;
      state.eventDateTime = action.payload.eventDateTime;
    },
  },
});

export const { saveTicketData } = ticketSlice.actions;
export default ticketSlice.reducer;
