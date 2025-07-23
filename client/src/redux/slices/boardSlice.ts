import { createSlice } from '@reduxjs/toolkit';
import { BoardState } from './board/boardTypes';
import * as reducers from './board/boardReducers';

const initialState: BoardState = {
    id: '',
    title: '',
    backgroundImageLink: '',
    isImage: true,
    lists: [],
    members: [],
    activity: [],
    isLoading: true,
    description: '',
    activityLoading: false,
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers
});

export const {
    setLoading,
    successFetchingBoard,
    updateTitle,
    setActivityLoading,
    updateActivity,
    updateDescription,
    updateBackground,
    addMembers,
} = boardSlice.actions;

export default boardSlice.reducer;
