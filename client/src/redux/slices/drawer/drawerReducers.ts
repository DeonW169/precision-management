import { PayloadAction } from '@reduxjs/toolkit';

export const openDrawer = (state: any, action: PayloadAction<string>) => {
    state.drawerType = action.payload;
    state.isOpen = true;
};
export const closeDrawer = (state: any) => {
    state.drawerType = null;
    state.isOpen = false;
};