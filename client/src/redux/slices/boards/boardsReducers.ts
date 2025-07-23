import { PayloadAction } from '@reduxjs/toolkit';
import { Board } from './boardsTypes';

export const startFetchingBoards = (state: any) => {
    state.pending = true;
}

export const successFetchingBoards = (state: any, action: PayloadAction<{ boards: Board[] }>) => {
    state.boardsData = action.payload.boards;
    state.pending = false;
};

export const failFetchingBoards = (state: any) => {
    state.pending = false;
};

export const startCreatingBoard = (state: any) => {
    state.creating = true;
};

export const successCreatingBoard = (state: any, action: PayloadAction<Board>) => {
    if (Array.isArray(state.boardsData)) {
        state.boardsData.push(action.payload);
    }
    state.creating = false;
};

export const failCreatingBoard = (state: any) => {
    state.creating = false;
};

export const closePopover = (state: any) => {
    // state.creating = false;
};
