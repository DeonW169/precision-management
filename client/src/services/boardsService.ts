import axios from 'axios';
import { openAlert } from '../redux/slices/alertSlice';
import {
    startFetchingBoards,
    successFetchingBoards,
    failFetchingBoards,
    startCreatingBoard,
    successCreatingBoard,
    failCreatingBoard,
    reset,
} from '../redux/slices/boardsSlice';
// import { addNewBoard } from '../redux/slices/userSlice';
import {
    setLoading,
    successFetchingBoard,
    updateTitle,
} from '../redux/slices/boardSlice';

import { AppDispatch } from '../redux/store';
import { Routes } from '../api/routes';

interface CreateBoardProps {
    title: string;
    backgroundImageLink: string;
    [key: string]: any;
}

export const getBoards = async (
    fromDropDown: boolean,
    dispatch: AppDispatch
): Promise<void> => {
    if (!fromDropDown) dispatch(startFetchingBoards());
    try {
        const res = await axios.get(`${Routes.BOARD}/`);
        setTimeout(() => {
            dispatch(successFetchingBoards({ boards: res.data }));
        }, 1000);
    } catch (error: any) {
        dispatch(failFetchingBoards());
        dispatch(
            openAlert({
                message:
                    error?.response?.data?.message || error.message,
                severity: 'error',
            })
        );
    }
};

export const createBoard = async (
    props: CreateBoardProps,
    dispatch: AppDispatch
): Promise<void> => {
    dispatch(startCreatingBoard());

    if (!(props.title && props.backgroundImageLink)) {
        dispatch(failCreatingBoard());
        dispatch(
            openAlert({
                message: 'Please enter a title for board!',
                severity: 'warning',
            })
        );
        return;
    }

    try {
        const res = await axios.post(`${Routes.BOARD}/create`, props);
        // dispatch(addNewBoard(res.data));
        dispatch(successCreatingBoard(res.data));
        dispatch(
            openAlert({
                message: `${res.data.title} board has been successfully created`,
                severity: 'success',
            })
        );
    } catch (error: any) {
        dispatch(failCreatingBoard());
        dispatch(
            openAlert({
                message:
                    error?.response?.data?.message || error.message,
                severity: 'error',
            })
        );
    }
};

export const getBoard = async (
    boardId: string,
    dispatch: AppDispatch
): Promise<void> => {
    dispatch(setLoading(true));
    try {
        const res = await axios.get(`${Routes.BOARD}/${boardId}`);
        dispatch(successFetchingBoard(res.data));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    } catch (error: any) {
        dispatch(setLoading(false));
        dispatch(
            openAlert({
                message:
                    error?.response?.data?.message || error.message,
                severity: 'error',
            })
        );
    }
};

export const boardTitleUpdate = async (
    title: string,
    boardId: string,
    dispatch: AppDispatch
): Promise<void> => {
    try {
        dispatch(updateTitle(title));
        await axios.put(`${Routes.BOARD}/${boardId}/update-board-title`, { title });
    } catch (error: any) {
        dispatch(
            openAlert({
                message:
                    error?.response?.data?.message || error.message,
                severity: 'error',
            })
        );
    }
};
