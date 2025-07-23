import { PayloadAction } from '@reduxjs/toolkit';
import { BoardState, Activity, Member } from './boardTypes';

export const setLoading = (state: BoardState, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
};

export const successFetchingBoard = (state: BoardState, action: PayloadAction<Partial<BoardState>>) => {
    Object.assign(state, {
        id: action.payload.id,
        title: action.payload.title,
        backgroundImageLink: action.payload.backgroundImageLink,
        isImage: action.payload.isImage,
        lists: action.payload.lists,
        members: action.payload.members,
        activity: action.payload.activity,
        description: action.payload.description,
    });
};

export const updateTitle = (state: BoardState, action: PayloadAction<string>) => {
    state.title = action.payload;
};

export const setActivityLoading = (state: BoardState, action: PayloadAction<boolean>) => {
    state.activityLoading = action.payload;
};

export const updateActivity = (state: BoardState, action: PayloadAction<Activity[]>) => {
    state.activity = action.payload;
};

export const updateDescription = (state: BoardState, action: PayloadAction<string>) => {
    state.description = action.payload;
};

export const updateBackground = (
    state: BoardState,
    action: PayloadAction<{ background: string; isImage: boolean }>
) => {
    const { background, isImage } = action.payload;
    state.backgroundImageLink = background;
    state.isImage = isImage;
};

export const addMembers = (state: BoardState, action: PayloadAction<Member[]>) => {
    state.members = action.payload;
};
