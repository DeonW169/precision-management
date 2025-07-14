import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
    open: boolean;
    severity: 'success' | 'info' | 'warning' | 'error';
    message: string;
    duration: number;
    nextRoute: string | null;
}

const initialState: AlertState = {
    open: false,
    severity: 'error',
    message: '',
    duration: 3000,
    nextRoute: null,
};

interface OpenAlertPayload {
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
    duration?: number;
    nextRoute?: string;
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        openAlert: (state: any, action: PayloadAction<OpenAlertPayload>) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
            state.duration = action.payload.duration ?? initialState.duration;
            state.nextRoute = action.payload.nextRoute ?? null;
        },
        closeAlert: (state: any) => {
            state.open = false;
        },
    },
});

export const { openAlert, closeAlert } = alertSlice.actions;
export default alertSlice.reducer;
