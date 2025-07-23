import { PayloadAction } from '@reduxjs/toolkit';
import { OpenAlertPayload } from './alertTypes';

export const openAlert = (state: any, action: PayloadAction<OpenAlertPayload>) => {
    state.open = true;
    state.message = action.payload.message;
    state.severity = action.payload.severity;
    state.duration = action.payload.duration;
    state.nextRoute = action.payload.nextRoute ?? null;
};

export const closeAlert = (state: any) => {
    state.open = false;
};
