import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './slices/userSlice';
import alertReducer from './slices/alertSlice';
import boardsReducer from './slices/boardsSlice';
import boardReducer from './slices/boardSlice';
import listReducer from './slices/listSlice';
import cardReducer from './slices/cardSlice';
import drawerReducer from './slices/drawerSlice';

export const store = configureStore({
    reducer: {
        // user: userReducer,
        alert: alertReducer,
        boards: boardsReducer,
        board: boardReducer,
        list: listReducer,
        card: cardReducer,
        drawer: drawerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
