import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Board {
    _id?: string;
    title?: string;
    backgroundImageLink?: string;
    [key: string]: any;
}

interface BoardsState {
    boardsData: Board[] | Record<string, any>; // depends on actual usage
    pending: boolean;
    backgroundImages: string[];
    smallPostfix: string;
    creating: boolean;
}

const initialState: BoardsState = {
    boardsData: {},
    pending: true,
    backgroundImages: [
        'https://images.unsplash.com/photo-1636471815144-616b00e21f24',
        'https://images.unsplash.com/photo-1636467455675-46b5552af493',
        'https://images.unsplash.com/photo-1636412911203-4065623b94fc',
        'https://images.unsplash.com/photo-1636408807362-a6195d3dd4de',
        'https://images.unsplash.com/photo-1603932743786-9a069a74e632',
        'https://images.unsplash.com/photo-1636207608470-dfedb46c2380',
        'https://images.unsplash.com/photo-1603932978744-e09fcf98ac00',
        'https://images.unsplash.com/photo-1636207543865-acf3ad382295',
        'https://images.unsplash.com/photo-1597244211919-8a52ab2e40ea',
    ],
    smallPostfix:
        '?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjM2NjUzNDgz&ixlib=rb-1.2.1&q=80&w=400',
    creating: false,
};

export const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        startFetchingBoards: (state: any) => {
            state.pending = true;
        },
        successFetchingBoards: (state: any, action: PayloadAction<{ boards: Board[] }>) => {
            state.boardsData = action.payload.boards;
            state.pending = false;
        },
        failFetchingBoards: (state: any) => {
            state.pending = false;
        },
        startCreatingBoard: (state: any) => {
            state.creating = true;
        },
        successCreatingBoard: (state: any, action: PayloadAction<Board>) => {
            if (Array.isArray(state.boardsData)) {
                state.boardsData.push(action.payload);
            }
            state.creating = false;
        },
        failCreatingBoard: (state: any) => {
            state.creating = false;
        },
        reset: () => initialState,
    },
});

export const {
    startFetchingBoards,
    successFetchingBoards,
    failFetchingBoards,
    startCreatingBoard,
    successCreatingBoard,
    failCreatingBoard,
    reset,
} = boardsSlice.actions;

export default boardsSlice.reducer;
