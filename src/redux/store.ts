import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user/userSlice'
import adminReducer from './reducers/admin/adminSlice'
import hostReducer from './reducers/host/hostSlice'
import eventSlice from "./reducers/event/eventSlice";
import ticketReducer from "./reducers/ticket/ticketReducer";
import { useDispatch } from "react-redux";


export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppDispatch = typeof store.dispatch;

const reducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
    host: hostReducer,
    event: eventSlice,
    ticket:ticketReducer
})

export const store = configureStore({
    reducer: reducer
})