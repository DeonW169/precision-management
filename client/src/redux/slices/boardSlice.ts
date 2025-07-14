import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Member {
    _id?: string;
    name?: string;
    color?: string;
    [key: string]: any;
}

interface List {
    _id: string;
    title: string;
    cards: any[];
    [key: string]: any;
}

interface Activity {
    _id?: string;
    text?: string;
    createdAt?: string;
    [key: string]: any;
}

interface BoardState {
    id: string;
    title: string;
    backgroundImageLink: string;
    isImage: boolean;
    lists: List[];
    members: Member[];
    activity: Activity[];
    loading: boolean;
    description: string;
    activityLoading: boolean;
}

const initialState: BoardState = {
    id: '',
    title: '',
    backgroundImageLink: '',
    isImage: true,
    lists: [],
    members: [],
    activity: [],
    loading: true,
    description: '',
    activityLoading: false,
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setLoading: (state: any, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        successFetchingBoard: (state: any, action: PayloadAction<any>) => {
            state.id = action.payload._id;
            state.title = action.payload.title;
            state.backgroundImageLink = action.payload.backgroundImageLink;
            state.isImage = action.payload.isImage;
            state.lists = action.payload.lists;
            state.members = action.payload.members;
            state.activity = action.payload.activity;
            state.description = action.payload.description;
        },
        updateTitle: (state: any, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setActivityLoading: (state: any, action: PayloadAction<boolean>) => {
            state.activityLoading = action.payload;
        },
        updateActivity: (state: any, action: PayloadAction<Activity[]>) => {
            state.activity = action.payload;
        },
        updateDescription: (state: any, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        updateBackground: (
            state: any,
            action: PayloadAction<{ background: string; isImage: boolean }>
        ) => {
            const { background, isImage } = action.payload;
            state.backgroundImageLink = background;
            state.isImage = isImage;
        },
        addMembers: (state: any, action: PayloadAction<Member[]>) => {
            state.members = action.payload;
        },
    },
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
