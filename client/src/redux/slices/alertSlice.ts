import { createSlice } from '@reduxjs/toolkit';
import { AlertState } from './alert/alertTypes';
import * as reducers from './alert/alertReducers';

const initialState: AlertState = {
    open: false,
    severity: 'error',
    message: '',
    duration: 3000,
    nextRoute: null,
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers
});

export const { openAlert, closeAlert } = alertSlice.actions;
export default alertSlice.reducer;
