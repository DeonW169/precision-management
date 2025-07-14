import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import alertReducer from './Slices/alertSlice';
import boardsReducer from './Slices/boardsSlice';
import boardReducer from './Slices/boardSlice';
import listReducer from './Slices/listSlice';
import cardReducer from './Slices/cardSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        boards: boardsReducer,
        board: boardReducer,
        list: listReducer,
        card: cardReducer,
    },
});

// 👇 Export RootState and AppDispatch for type-safe use in your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
