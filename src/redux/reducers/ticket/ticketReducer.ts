import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TicketState {
  ticketQuantities: { [key: string]: number };
  totalPrice: number;
  eventName?: string; // Optional properties
  eventDateTime?: string; // Optional properties
  eventId?:string;
}

const initialState: TicketState = {
  ticketQuantities: {},
  totalPrice: 0,
  eventName: undefined,
  eventDateTime: undefined,
  eventId:undefined,
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
      eventId?: string;
    }>) {
      state.ticketQuantities = action.payload.ticketQuantities;
      state.totalPrice = action.payload.totalPrice;
      state.eventName = action.payload.eventName;
      state.eventDateTime = action.payload.eventDateTime;
      state.eventId = action.payload.eventId;
    },
  },
});

export const { saveTicketData } = ticketSlice.actions;
export default ticketSlice.reducer;
