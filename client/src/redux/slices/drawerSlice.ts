import { createSlice } from "@reduxjs/toolkit";
import { DrawerState } from "./drawer/drawerTypes";
import * as reducers from './drawer/drawerReducers';

const initialState: DrawerState = {
    drawerType: null,
    isOpen: false,
};

const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;